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
 * supplied "IT Project Management" mockup: mark, wordmark, and the
 * Plan / Manage / Deliver / Succeed strapline.
 */
export function LogoHero({ className = "" }) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <LogoMark size={132} className="drop-shadow-[0_10px_30px_rgba(37,99,235,0.25)]" />
      <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
        <span className="text-plan">IT</span> PROJECT
      </h1>
      <p className="mt-1 flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-slate-500 sm:text-base">
        <span className="h-px w-8 bg-slate-300" aria-hidden="true" />
        MANAGEMENT
        <span className="h-px w-8 bg-slate-300" aria-hidden="true" />
      </p>
      <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-display text-sm font-bold tracking-wide sm:text-base">
        <span className="text-plan">PLAN</span>
        <span className="text-slate-300">|</span>
        <span className="text-manage">MANAGE</span>
        <span className="text-slate-300">|</span>
        <span className="text-deliver">DELIVER</span>
        <span className="text-slate-300">|</span>
        <span className="text-succeed">SUCCEED</span>
      </p>
    </div>
  );
}
