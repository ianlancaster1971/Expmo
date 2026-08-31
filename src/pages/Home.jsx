import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { LogoHero } from "../components/Logo";
import LogoMark from "../components/LogoMark";
import EventCard from "../components/EventCard";
import ScrollReveal from "../components/ScrollReveal";
import EmptyState from "../components/EmptyState";
import { useEvents } from "../context/EventsContext";

const RING_STYLES = {
  plan: "bg-plan/10 text-plan",
  manage: "bg-manage/10 text-manage",
  deliver: "bg-deliver/10 text-deliver",
  succeed: "bg-succeed/10 text-succeed",
};

const QUICK_LINKS = [
  {
    to: "/future-events",
    title: "Future Events",
    tagline: "What's coming up",
    accent: "from-plan to-plan-light",
    icon: "📅",
  },
  {
    to: "/potential-events",
    title: "Potential Events",
    tagline: "Vote on what's next",
    accent: "from-succeed to-succeed-light",
    icon: "🗳️",
  },
  {
    to: "/past-events",
    title: "Past Events",
    tagline: "Relive the highlights",
    accent: "from-deliver to-deliver-light",
    icon: "📸",
  },
];

export default function Home() {
  const { siteContent, byCategory, voteEvent, loading } = useEvents();
  const nextEvent = byCategory("future")[0];

  return (
    <>
      <SEO
        title="Home"
        description="Ex-Ford PMO Meet Up — find upcoming meet-ups, vote on potential future events, and browse the archive of past get-togethers."
        path="/"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-paper py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-br from-plan/20 via-succeed/20 to-deliver/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LogoHero />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 text-center font-hand text-xl text-succeed sm:text-2xl"
          >
            {siteContent.heroEyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-center text-2xl font-extrabold text-navy sm:text-3xl"
          >
            {siteContent.heroTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mx-auto mt-4 max-w-xl text-center text-base text-slate-600"
          >
            {siteContent.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/future-events"
              className="rounded-full bg-navy px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
            >
              See what's coming up
            </Link>
            <Link
              to="/potential-events"
              className="rounded-full border-2 border-navy/10 bg-white px-6 py-3 text-sm font-bold text-navy transition-transform hover:scale-105 hover:border-succeed/40"
            >
              Vote on the next one
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Plan / Manage / Deliver / Succeed ring */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {siteContent.ringLabels?.map((item, i) => (
            <ScrollReveal key={item.key} delay={i * 0.08}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl ${RING_STYLES[item.key]}`}
                  aria-hidden="true"
                >
                  {{ plan: "📋", manage: "👥", deliver: "📈", succeed: "🎯" }[item.key]}
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{item.caption}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Next event highlight */}
      <section className="bg-navy py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ScrollReveal className="text-center">
            <p className="font-hand text-2xl text-white/70">Next Event</p>
            <h2 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
              {nextEvent ? nextEvent.title : "Nothing on the calendar yet"}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mt-8">
            {loading ? null : nextEvent ? (
              <div className="mx-auto max-w-md">
                <EventCard event={nextEvent} onVote={voteEvent} />
              </div>
            ) : (
              <EmptyState
                icon="🗓️"
                title="No upcoming events yet"
                description="Head to the Dashboard to add the next meet-up."
              />
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Quick links */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ScrollReveal className="text-center">
          <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
            Explore the meet-up history
          </h2>
        </ScrollReveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {QUICK_LINKS.map((link, i) => (
            <ScrollReveal key={link.to} delay={i * 0.1}>
              <Link
                to={link.to}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-xl text-white ${link.accent}`}
                  aria-hidden="true"
                >
                  {link.icon}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">
                  {link.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{link.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-plan group-hover:gap-2 transition-all">
                  Take a look →
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-3xl px-4 pb-20 text-center sm:px-6">
        <ScrollReveal>
          <LogoMark size={56} className="mx-auto" />
          <h2 className="mt-4 text-xl font-extrabold text-navy sm:text-2xl">
            {siteContent.aboutTitle}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {siteContent.aboutText}
          </p>
        </ScrollReveal>
      </section>
    </>
  );
}
