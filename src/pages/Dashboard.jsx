import { useState } from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import ConfigBanner from "../components/ConfigBanner";
import EventForm from "../components/EventForm";
import { useEvents } from "../context/EventsContext";

const TABS = [
  { key: "home", label: "Home Page" },
  { key: "future", label: "Future Events" },
  { key: "potential", label: "Potential Events" },
  { key: "past", label: "Past Events" },
];

function DeleteButton({ onConfirm }) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="text-xs text-slate-500">Delete?</span>
        <button
          type="button"
          onClick={() => onConfirm()}
          className="rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="rounded-full border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-600"
        >
          No
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
    >
      Delete
    </button>
  );
}

function EventManager({ category }) {
  const { byCategory, addEvent, updateEvent, deleteEvent } = useEvents();
  const events = byCategory(category);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="space-y-4">
      {!adding ? (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="rounded-full bg-gradient-to-r from-plan to-succeed px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          + Add {TABS.find((t) => t.key === category)?.label.replace(" Events", " event")}
        </button>
      ) : (
        <EventForm
          category={category}
          initialValues={{}}
          submitLabel="Add event"
          onCancel={() => setAdding(false)}
          onSubmit={async (values) => {
            await addEvent(category, values);
            setAdding(false);
          }}
        />
      )}

      {events.length === 0 && !adding && (
        <p className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-400">
          Nothing here yet.
        </p>
      )}

      <ul className="space-y-3">
        {events.map((event) => (
          <motion.li
            layout
            key={event.id}
            className="rounded-2xl border border-slate-200 bg-white p-4"
          >
            {editingId === event.id ? (
              <EventForm
                category={category}
                initialValues={event}
                submitLabel="Save changes"
                onCancel={() => setEditingId(null)}
                onSubmit={async (values) => {
                  await updateEvent(event.id, values);
                  setEditingId(null);
                }}
              />
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display font-bold text-navy">{event.title}</p>
                  <p className="text-sm text-slate-500">
                    {event.date || "No date set"}
                    {event.location ? ` · ${event.location}` : ""}
                    {category === "potential" ? ` · ${event.votes || 0} interested` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingId(event.id)}
                    className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-plan hover:text-plan"
                  >
                    Edit
                  </button>
                  <DeleteButton onConfirm={() => deleteEvent(event.id)} />
                </div>
              </div>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function HomeContentManager() {
  const { siteContent, updateSiteContent } = useEvents();
  const [values, setValues] = useState(siteContent);
  const [saved, setSaved] = useState(false);

  const update = (field) => (e) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const updateRing = (key, field) => (e) =>
    setValues((v) => ({
      ...v,
      ringLabels: v.ringLabels.map((r) =>
        r.key === key ? { ...r, [field]: e.target.value } : r,
      ),
    }));

  const handleSave = async (e) => {
    e.preventDefault();
    await updateSiteContent(values);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-navy focus:border-plan focus:outline-none focus:ring-2 focus:ring-plan/20";

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="font-display text-lg font-bold text-navy">Hero section</h3>
        <div>
          <label className="text-sm font-semibold text-navy">Eyebrow</label>
          <input className={inputClass} value={values.heroEyebrow} onChange={update("heroEyebrow")} />
        </div>
        <div>
          <label className="text-sm font-semibold text-navy">Headline</label>
          <input className={inputClass} value={values.heroTitle} onChange={update("heroTitle")} />
        </div>
        <div>
          <label className="text-sm font-semibold text-navy">Subtitle</label>
          <textarea rows={3} className={inputClass} value={values.heroSubtitle} onChange={update("heroSubtitle")} />
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="font-display text-lg font-bold text-navy">About section</h3>
        <div>
          <label className="text-sm font-semibold text-navy">Title</label>
          <input className={inputClass} value={values.aboutTitle} onChange={update("aboutTitle")} />
        </div>
        <div>
          <label className="text-sm font-semibold text-navy">Body</label>
          <textarea rows={4} className={inputClass} value={values.aboutText} onChange={update("aboutText")} />
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="font-display text-lg font-bold text-navy">
          Plan / Manage / Deliver / Succeed captions
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {values.ringLabels?.map((r) => (
            <div key={r.key} className="rounded-xl bg-slate-50 p-3">
              <label className="text-xs font-bold uppercase tracking-wide text-slate-400">
                {r.key}
              </label>
              <input
                className={inputClass}
                value={r.title}
                onChange={updateRing(r.key, "title")}
              />
              <input
                className={inputClass}
                value={r.caption}
                onChange={updateRing(r.key, "caption")}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          Save home page
        </button>
        {saved && <span className="text-sm font-semibold text-manage">Saved ✓</span>}
      </div>
    </form>
  );
}

export default function Dashboard() {
  const [tab, setTab] = useState("home");

  return (
    <>
      <SEO
        title="Dashboard"
        description="Edit the Ex-Ford PMO Meet Up site content."
        path="/dashboard"
      />
      <PageHero
        eyebrow="For the crew running the show"
        title="Dashboard"
        subtitle="Add, edit, or retire events and update the home page — no code required."
        accent="succeed"
      />

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <ConfigBanner />

        <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                tab === t.key
                  ? "bg-navy text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "home" ? (
            <HomeContentManager />
          ) : (
            <EventManager category={tab} />
          )}
        </div>
      </section>
    </>
  );
}
