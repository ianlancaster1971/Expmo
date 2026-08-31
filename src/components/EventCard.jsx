import { motion } from "framer-motion";
import InterestButton from "./InterestButton";

const ACCENT = {
  future: { bar: "from-plan to-plan-light", chip: "bg-plan/10 text-plan" },
  potential: {
    bar: "from-succeed to-succeed-light",
    chip: "bg-succeed/10 text-succeed",
  },
  past: {
    bar: "from-deliver to-deliver-light",
    chip: "bg-deliver/10 text-deliver",
  },
};

function formatDate(iso) {
  if (!iso) return { day: "TBC", month: "", full: "Date to be confirmed" };
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return { day: "TBC", month: "", full: iso };
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    month: d.toLocaleDateString("en-GB", { month: "short" }),
    full: d.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

export default function EventCard({ event, onVote }) {
  const accent = ACCENT[event.category] || ACCENT.future;
  const date = formatDate(event.date);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${accent.bar}`} aria-hidden="true" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex w-14 shrink-0 flex-col items-center rounded-xl bg-slate-50 py-2 text-center">
              <span className="font-display text-xl font-extrabold leading-none text-navy">
                {date.day}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {date.month}
              </span>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold leading-tight text-navy">
                {event.title}
              </h3>
              <p className="text-sm text-slate-500">{event.location}</p>
            </div>
          </div>
          {event.time && (
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${accent.chip}`}>
              {event.time}
            </span>
          )}
        </div>

        {event.description && (
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            {event.description}
          </p>
        )}

        <dl className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
          {event.venue && (
            <div className="flex gap-2">
              <dt className="font-hand text-base text-succeed">Where?</dt>
              <dd className="text-slate-600">{event.venue}</dd>
            </div>
          )}
          {event.eats && (
            <div className="flex gap-2">
              <dt className="font-hand text-base text-deliver">Eats</dt>
              <dd className="text-slate-600">{event.eats}</dd>
            </div>
          )}
        </dl>

        {event.category === "past" && event.recap && (
          <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm italic text-slate-600">
            “{event.recap}”
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {event.website && (
            <a
              href={event.website}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-plan hover:text-plan"
            >
              Website
            </a>
          )}
          {event.directions && (
            <a
              href={event.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-plan hover:text-plan"
            >
              Directions
            </a>
          )}

          {event.category === "potential" && onVote && (
            <InterestButton
              count={event.votes || 0}
              onClick={() => onVote(event.id)}
              className="ml-auto"
            />
          )}
        </div>

        <p className="mt-3 text-xs text-slate-400">{date.full}</p>
      </div>
    </motion.article>
  );
}
