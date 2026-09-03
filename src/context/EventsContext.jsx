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

/** Fire-and-forget email notification for Future event changes (see
 * netlify/functions/notify-future-event.js). Never blocks or fails the
 * save itself — a missing/broken email setup shouldn't stop the site from
 * working. */
async function notifyFutureEvent(action, event) {
  try {
    await fetch("/.netlify/functions/notify-future-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action,
        title: event.title,
        date: event.date,
        location: event.location,
        venue: event.venue,
      }),
    });
  } catch {
    // Notification is best-effort only.
  }
}

/** Today as a "YYYY-MM-DD" string (local time), comparable directly
 * against the event.date strings the app stores. */
function todayIso() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
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
      if (category === "future") notifyFutureEvent("added", event);
    } else {
      setEvents((prev) => [...prev, event]);
    }
    return event;
  }, []);

  const updateEvent = useCallback(
    async (id, patch) => {
      if (isSupabaseConfigured) {
        const remote = await import("../lib/supabaseEvents");
        await remote.updateEventRemote(id, patch);
        const existing = events.find((e) => e.id === id);
        const staysFuture = existing?.category === "future" && patch.category !== "past";
        if (staysFuture) {
          notifyFutureEvent("updated", { ...existing, ...patch });
        }
      } else {
        setEvents((prev) =>
          prev.map((e) => (e.id === id ? { ...e, ...patch } : e)),
        );
      }
    },
    [events],
  );

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

  // ---- Auto-archive: once a Future event's date has passed, move it into
  // Past Events. Runs whenever the event list changes (e.g. on load, or
  // after a live Supabase update); each qualifying event only matches once,
  // since moving it to "past" takes it out of the "future" filter below.
  useEffect(() => {
    const today = todayIso();
    const overdue = events.filter(
      (e) => e.category === "future" && e.date && e.date < today,
    );
    overdue.forEach((e) => updateEvent(e.id, { category: "past" }));
  }, [events, updateEvent]);

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
