import { useState } from "react";

const EMPTY = {
  title: "",
  date: "",
  time: "",
  location: "",
  venue: "",
  eats: "",
  website: "",
  directions: "",
  description: "",
  recap: "",
};

const FIELD_LABEL = "block text-sm font-semibold text-navy";
const FIELD_INPUT =
  "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-navy focus:border-plan focus:outline-none focus:ring-2 focus:ring-plan/20";

export default function EventForm({
  category,
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Save",
}) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues });
  const [saving, setSaving] = useState(false);

  const update = (field) => (e) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.title.trim()) return;
    setSaving(true);
    try {
      await onSubmit(values);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2"
    >
      <div className="sm:col-span-2">
        <label className={FIELD_LABEL} htmlFor="title">
          Event title *
        </label>
        <input
          id="title"
          required
          className={FIELD_INPUT}
          value={values.title}
          onChange={update("title")}
          placeholder="e.g. Southend Meet Up"
        />
      </div>

      <div>
        <label className={FIELD_LABEL} htmlFor="date">
          Date
        </label>
        <input
          id="date"
          type="date"
          className={FIELD_INPUT}
          value={values.date}
          onChange={update("date")}
        />
      </div>

      <div>
        <label className={FIELD_LABEL} htmlFor="time">
          Time
        </label>
        <input
          id="time"
          type="time"
          className={FIELD_INPUT}
          value={values.time}
          onChange={update("time")}
        />
      </div>

      <div>
        <label className={FIELD_LABEL} htmlFor="location">
          Location (town)
        </label>
        <input
          id="location"
          className={FIELD_INPUT}
          value={values.location}
          onChange={update("location")}
          placeholder="e.g. Southend-on-Sea, Essex"
        />
      </div>

      <div>
        <label className={FIELD_LABEL} htmlFor="venue">
          Where? (venue)
        </label>
        <input
          id="venue"
          className={FIELD_INPUT}
          value={values.venue}
          onChange={update("venue")}
          placeholder="e.g. Mawsons, Southchurch Road"
        />
      </div>

      <div>
        <label className={FIELD_LABEL} htmlFor="eats">
          Eats
        </label>
        <input
          id="eats"
          className={FIELD_INPUT}
          value={values.eats}
          onChange={update("eats")}
          placeholder="e.g. Indian"
        />
      </div>

      <div>
        <label className={FIELD_LABEL} htmlFor="website">
          Website link
        </label>
        <input
          id="website"
          type="url"
          className={FIELD_INPUT}
          value={values.website}
          onChange={update("website")}
          placeholder="https://…"
        />
      </div>

      <div>
        <label className={FIELD_LABEL} htmlFor="directions">
          Directions link
        </label>
        <input
          id="directions"
          type="url"
          className={FIELD_INPUT}
          value={values.directions}
          onChange={update("directions")}
          placeholder="https://maps.google.com/…"
        />
      </div>

      <div className="sm:col-span-2">
        <label className={FIELD_LABEL} htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          className={FIELD_INPUT}
          value={values.description}
          onChange={update("description")}
        />
      </div>

      {category === "past" && (
        <div className="sm:col-span-2">
          <label className={FIELD_LABEL} htmlFor="recap">
            Recap (how did it go?)
          </label>
          <textarea
            id="recap"
            rows={2}
            className={FIELD_INPUT}
            value={values.recap}
            onChange={update("recap")}
          />
        </div>
      )}

      <div className="flex items-center gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:opacity-60"
        >
          {saving ? "Saving…" : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-white"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
