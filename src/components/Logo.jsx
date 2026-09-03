import LogoMark from "./LogoMark";

/**
 * Compact lockup used in the navbar / footer: mark + wordmark.
 */
export function LogoLockup({ size = 40, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold text-navy sm:text-base">
          Ex-Ford PMO
        </span>
        <span className="text-[11px] font-semibold tracking-wide text-slate-500 sm:text-xs">
          Meet Up
        </span>
      </span>
    </span>
  );
}

/**
 * Full hero lockup, used once at the top of the Home page — mirrors the
 * supplied "IT Project Management" mockup: mark and wordmark.
 */
export function LogoHero({ className = "" }) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <LogoMark size={92} className="drop-shadow-[0_10px_30px_rgba(37,99,235,0.25)]" />
      <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
        <span className="text-plan">IT</span> PROJECT
      </h1>
      <p className="mt-1 flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-slate-500 sm:text-sm">
        <span className="h-px w-8 bg-slate-300" aria-hidden="true" />
        MANAGEMENT
        <span className="h-px w-8 bg-slate-300" aria-hidden="true" />
      </p>
    </div>
  );
}
