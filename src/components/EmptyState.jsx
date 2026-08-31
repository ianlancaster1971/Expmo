export default function EmptyState({ icon = "🗓️", title, description }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-14 text-center">
      <span className="text-4xl" aria-hidden="true">
        {icon}
      </span>
      <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      )}
    </div>
  );
}
