import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found" description="This page doesn't exist." path="/404" />
      <section className="mx-auto flex max-w-lg flex-col items-center px-4 py-28 text-center sm:px-6">
        <span className="text-5xl" aria-hidden="true">
          🧭
        </span>
        <h1 className="mt-4 text-3xl font-extrabold text-navy">
          Wrong turn somewhere?
        </h1>
        <p className="mt-3 text-slate-500">
          That page doesn't exist — maybe it got cancelled like the last three meet-ups.
        </p>
        <Link
          to="/"
          className="mt-6 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
        >
          Back to Home
        </Link>
      </section>
    </>
  );
}
