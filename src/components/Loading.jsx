export default function Loading({ label = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-400">
      <span
        className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-plan"
        role="status"
        aria-label={label}
      />
      <span className="text-sm">{label}</span>
    </div>
  );
}
