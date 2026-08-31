import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import EventsGrid from "../components/EventsGrid";
import { useEvents } from "../context/EventsContext";

export default function FutureEvents() {
  const { byCategory, loading } = useEvents();
  const events = byCategory("future");

  const jsonLd = events.length
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: events.map((e, i) => ({
          "@type": "Event",
          position: i + 1,
          name: e.title,
          startDate: e.date,
          location: {
            "@type": "Place",
            name: e.venue,
            address: e.location,
          },
          description: e.description,
        })),
      }
    : undefined;

  return (
    <>
      <SEO
        title="Future Events"
        description="Upcoming Ex-Ford PMO meet-ups — dates, venues, and everything you need to know."
        path="/future-events"
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow="What's coming up"
        title="Future Events"
        subtitle="Confirmed dates in the diary. Turn up, say hello, pretend you remember everyone's name."
        accent="plan"
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <EventsGrid
          events={events}
          loading={loading}
          empty={{
            icon: "📅",
            title: "Nothing confirmed yet",
            description:
              "Check Potential Events to see what's being discussed, or add one from the Dashboard.",
          }}
        />
      </section>
    </>
  );
}
