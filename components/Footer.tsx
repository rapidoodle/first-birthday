"use client";

import { motion } from "framer-motion";
import { event } from "@/lib/config";

const DINO_ROW = ["🦖", "🦕", "🌋", "🥚", "🌿", "🦴", "☀️", "✨"];

export default function Footer() {
  return (
    <footer className="relative mt-8 overflow-hidden bg-gradient-to-b from-transparent to-snow-blue/50 px-5 pb-10 pt-16 text-center">
      <div className="flex justify-center gap-4 text-3xl" aria-hidden>
        {DINO_ROW.map((c, i) => (
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
        Made with ❤️ for {event.childName}&apos;s {event.age}st Birthday
      </p>
      <p className="mt-2 text-sm text-snow-ink/60">
        {event.dateLabel} · See you there! {event.accentEmoji}
      </p>
    </footer>
  );
}
