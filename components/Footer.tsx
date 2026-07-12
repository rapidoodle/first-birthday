"use client";

import { motion } from "framer-motion";

const SNOW_ROW = ["🍎", "👑", "🪞", "🌹", "🐦", "🍄", "🌲", "✨"];

export default function Footer() {
  return (
    <footer className="relative mt-8 overflow-hidden bg-gradient-to-b from-transparent to-snow-blue/50 px-5 pb-10 pt-16 text-center">
      <div className="flex justify-center gap-4 text-3xl" aria-hidden>
        {SNOW_ROW.map((c, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2.6,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          >
            {c}
          </motion.span>
        ))}
      </div>
      <p className="mt-8 font-display text-lg font-bold text-snow-royal">
        Made with ❤️ for Niane&apos;s First Birthday
      </p>
      <p className="mt-2 text-sm text-snow-ink/60">
        August 23, 2026 · See you there! 🍎
      </p>
    </footer>
  );
}
