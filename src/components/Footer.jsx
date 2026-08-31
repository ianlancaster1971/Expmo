import { NavLink } from "react-router-dom";
import { LogoLockup } from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6">
        <LogoLockup size={34} />
        <p className="max-w-md text-sm text-slate-500">
          A very unofficial reunion crew. Plan it, manage it, deliver it,
          succeed at it — repeat whenever someone fancies a pint.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600">
          <NavLink to="/" end className="hover:text-navy">
            Home
          </NavLink>
          <NavLink to="/future-events" className="hover:text-navy">
            Future Events
          </NavLink>
          <NavLink to="/potential-events" className="hover:text-navy">
            Potential Events
          </NavLink>
          <NavLink to="/past-events" className="hover:text-navy">
            Past Events
          </NavLink>
          <NavLink to="/dashboard" className="hover:text-navy">
            Dashboard
          </NavLink>
        </nav>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Ex-Ford PMO Meet Up. Built for the crew, not for Ford.
        </p>
      </div>
    </footer>
  );
}
