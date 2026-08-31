import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LogoLockup } from "./Logo";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/future-events", label: "Future Events" },
  { to: "/potential-events", label: "Potential Events" },
  { to: "/past-events", label: "Past Events" },
];

function NavItem({ to, label, end, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
          isActive
            ? "text-white bg-navy"
            : "text-slate-600 hover:text-navy hover:bg-slate-100"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled
          ? "border-slate-200 bg-white/90 backdrop-blur-md shadow-sm"
          : "border-transparent bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="shrink-0">
          <LogoLockup size={38} />
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </nav>

        <div className="hidden md:block">
          <NavLink
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-plan to-succeed px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105"
          >
            Dashboard
          </NavLink>
        </div>

        <button
          type="button"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-navy md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
            className="absolute block h-0.5 w-5 bg-current"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            className="absolute block h-0.5 w-5 bg-current"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
            className="absolute block h-0.5 w-5 bg-current"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {LINKS.map((link) => (
                <NavItem key={link.to} {...link} onClick={() => setOpen(false)} />
              ))}
              <NavLink
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-plan to-succeed px-4 py-2.5 text-sm font-semibold text-white"
              >
                Dashboard
              </NavLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
