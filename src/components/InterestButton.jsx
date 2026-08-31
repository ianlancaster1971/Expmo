import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function InterestButton({ count, onClick, className = "" }) {
  const [justVoted, setJustVoted] = useState(false);
  const [voted, setVoted] = useState(false);

  const handleClick = () => {
    if (voted) return;
    setVoted(true);
    setJustVoted(true);
    onClick();
    window.setTimeout(() => setJustVoted(false), 700);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.92 }}
      disabled={voted}
      aria-pressed={voted}
      className={`relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
        voted
          ? "bg-succeed text-white"
          : "bg-succeed/10 text-succeed hover:bg-succeed hover:text-white"
      } ${className}`}
    >
      <motion.span
        aria-hidden="true"
        animate={justVoted ? { scale: [1, 1.4, 1], rotate: [0, -10, 10, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        {voted ? "🙌" : "🙋"}
      </motion.span>
      {voted ? "I'm in!" : "I'm interested"}
      <span className="rounded-full bg-white/70 px-1.5 py-0.5 text-[11px] text-succeed">
        {count}
      </span>

      <AnimatePresence>
        {justVoted && (
          <motion.span
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -22, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute -top-1 right-3 text-sm font-bold text-succeed"
          >
            +1
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
