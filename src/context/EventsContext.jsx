import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isSupabaseConfigured } from "../lib/supabase";
import { seedEvents, seedSiteContent } from "../data/seedData";

const EventsContext = createContext(null);

const LOCAL_EVENTS_KEY = "pmo-meetup-events";
const LOCAL_CONTENT_KEY = "pmo-meetup-site-content";

function loadLocal(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveLocal(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable (private browsing) — fail silently, the
    // app still works for the rest of the session.
  }
}

function slugify(text) {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `event-${Date.now()}`
  );
}

export function EventsProvider({ children }) {
  const [events, setEvents] = useState(() =>
    isSupabaseConfigured ? [] : loadLocal(LOCAL_EVENTS_KEY, seedEvents),
  );
  const [siteContent, setSiteContent] = useState(() =>
    isSupabaseConfigured
      ? seedSiteContent
      : loadLocal(LOCAL_CONTENT_KEY, seedSiteContent),
  );
  const [loading, setLoading] = useState(isSupabaseConfigured);

  // ---- Live Supabase mode (client library is loaded lazily) ------------
  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    let cancelled = false;
    let unsubEvents;
    let unsubContent;

    import("../lib/supabaseEvents").then(async (remote) => {
      if (cancelled) return;
      await remote.seedIfEmpty();
      if (cancelled) return;

      unsubEvents = await remote.subscribeEvents((list) => {
        setEvents(list);
        setLoading(false);
      });
      unsubContent = await remote.subscribeContent(setSiteContent);
    });

    return () => {
      cancelled = true;
      unsubEvents?.();
      unsubContent?.();
    };
  }, []);

  // ---- Local demo mode: persist to localStorage --------------------------
  useEffect(() => {
    if (!isSupabaseConfigured) saveLocal(LOCAL_EVENTS_KEY, events);
  }, [events]);

  useEffect(() => {
    if (!isSupabaseConfigured) saveLocal(LOCAL_CONTENT_KEY, siteContent);
  }, [siteContent]);

  // ---- CRUD ---------------------------------------------------------------
  const addEvent = useCallback(async (category, data) => {
    const id = `${slugify(data.title || "event")}-${Date.now().toString(36)}`;
    const event = { id, category, votes: 0, ...data };

    if (isSupabaseConfigured) {
      const remote = await import("../lib/supabaseEvents");
      await remote.addEventRemote(id, event);
    } else {
      setEvents((prev) => [...prev, event]);
    }
    return event;
  }, []);

  const updateEvent = useCallback(async (id, patch) => {
    if (isSupabaseConfigured) {
      const remote = await import("../lib/supabaseEvents");
      await remote.updateEventRemote(id, patch);
    } else {
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...patch } : e)),
      );
    }
  }, []);

  const deleteEvent = useCallback(async (id) => {
    if (isSupabaseConfigured) {
      const remote = await import("../lib/supabaseEvents");
      await remote.deleteEventRemote(id);
    } else {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  }, []);

  const voteEvent = useCallback(async (id) => {
    if (isSupabaseConfigured) {
      const remote = await import("../lib/supabaseEvents");
      await remote.voteEventRemote(id);
    } else {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, votes: (e.votes || 0) + 1 } : e,
        ),
      );
    }
  }, []);

  const updateSiteContent = useCallback(
    async (patch) => {
      const next = { ...siteContent, ...patch };
      if (isSupabaseConfigured) {
        const remote = await import("../lib/supabaseEvents");
        await remote.updateContentRemote(next);
      } else {
        setSiteContent(next);
      }
    },
    [siteContent],
  );

  const value = useMemo(
    () => ({
      events,
      siteContent,
      loading,
      isLive: isSupabaseConfigured,
      addEvent,
      updateEvent,
      deleteEvent,
      voteEvent,
      updateSiteContent,
      byCategory: (category) =>
        events
          .filter((e) => e.category === category)
          .sort((a, b) => (a.date || "").localeCompare(b.date || "")),
    }),
    [
      events,
      siteContent,
      loading,
      addEvent,
      updateEvent,
      deleteEvent,
      voteEvent,
      updateSiteContent,
    ],
  );

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
}

export function useEvents() {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error("useEvents must be used within EventsProvider");
  return ctx;
}
