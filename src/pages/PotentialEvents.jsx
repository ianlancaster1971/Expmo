import { useMemo } from "react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import EventsGrid from "../components/EventsGrid";
import { useEvents } from "../context/EventsContext";

export default function PotentialEvents() {
  const { byCategory, loading, voteEvent } = useEvents();
  const events = useMemo(
    () => [...byCategory("potential")].sort((a, b) => (b.votes || 0) - (a.votes || 0)),
    [byCategory],
  );

  return (
    <>
      <SEO
        title="Potential Events"
        description="Proposed Ex-Ford PMO meet-ups — vote for the ones you'd actually show up to."
        path="/potential-events"
      />
      <PageHero
        eyebrow="Vote it into existence"
        title="Potential Events"
        subtitle="Ideas on the table but not yet locked in. Hit “I'm interested” on the ones you'd turn up for — the popular ones get booked."
        accent="succeed"
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <EventsGrid
          events={events}
          loading={loading}
          onVote={voteEvent}
          empty={{
            icon: "🗳️",
            title: "No proposals right now",
            description: "Got an idea for the next meet-up? Add it from the Dashboard.",
          }}
        />
      </section>
    </>
  );
}
