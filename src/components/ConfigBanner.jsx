import { useEvents } from "../context/EventsContext";

/**
 * Tells whoever is looking at the Dashboard whether edits are only saved to
 * this browser (demo mode) or are live for every visitor (Supabase mode).
 */
export default function ConfigBanner() {
  const { isLive } = useEvents();

  if (isLive) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-manage/30 bg-manage/10 px-4 py-3 text-sm font-medium text-manage">
        <span aria-hidden="true">🟢</span>
        Connected — changes save live and are visible to every visitor.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-deliver/30 bg-deliver/10 px-4 py-3 text-sm text-deliver">
      <p className="font-semibold">
        <span aria-hidden="true">🟠</span> Demo mode — changes only save to
        this browser.
      </p>
      <p className="mt-1 text-deliver/80">
        Connect a free Supabase project and add the keys to{" "}
        <code className="rounded bg-white/60 px-1 py-0.5 font-mono text-xs">
          .env
        </code>{" "}
        (see <code className="rounded bg-white/60 px-1 py-0.5 font-mono text-xs">.env.example</code>) to make edits go live for everyone.
      </p>
    </div>
  );
}
