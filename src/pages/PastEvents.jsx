import { useMemo } from "react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import EventsGrid from "../components/EventsGrid";
import { useEvents } from "../context/EventsContext";

export default function PastEvents() {
  const { byCategory, loading } = useEvents();
  const events = useMemo(
    () => [...byCategory("past")].reverse(),
    [byCategory],
  );

  return (
    <>
      <SEO
        title="Past Events"
        description="A look back at previous Ex-Ford PMO meet-ups — where we went and how it went."
        path="/past-events"
      />
      <PageHero
        eyebrow="The archive"
        title="Past Events"
        subtitle="Every meet-up so far, for anyone doing the ‘didn't I see you there’ maths."
        accent="deliver"
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <EventsGrid
          events={events}
          loading={loading}
          empty={{
            icon: "📸",
            title: "No history yet",
            description: "Once a meet-up has happened, add a recap from the Dashboard.",
          }}
        />
      </section>
    </>
  );
}
