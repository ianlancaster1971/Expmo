import EventCard from "./EventCard";
import EmptyState from "./EmptyState";
import Loading from "./Loading";

export default function EventsGrid({ events, loading, onVote, empty }) {
  if (loading) return <Loading label="Fetching events…" />;

  if (!events.length) {
    return <EmptyState {...empty} />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onVote={onVote} />
      ))}
    </div>
  );
}
