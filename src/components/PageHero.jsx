import { motion } from "framer-motion";

const ACCENTS = {
  plan: "from-plan to-plan-light",
  manage: "from-manage to-manage-light",
  deliver: "from-deliver to-deliver-light",
  succeed: "from-succeed to-succeed-light",
};

export default function PageHero({ eyebrow, title, subtitle, accent = "plan" }) {
  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-20">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br ${ACCENTS[accent]} opacity-30 blur-3xl`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-gradient-to-br ${ACCENTS[accent]} opacity-20 blur-3xl`}
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-hand text-lg text-white/70 sm:text-xl"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-2 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-base text-white/70 sm:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
