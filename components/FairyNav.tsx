"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "home", label: "Home", emoji: "🧚" },
  { id: "memories", label: "Memories", emoji: "🦋" },
  { id: "details", label: "Details", emoji: "🌸" },
  { id: "rsvp", label: "RSVP", emoji: "🎈" },
  { id: "gallery", label: "Gallery", emoji: "📸" },
];

/** Floating pill navigation that smooth-scrolls between sections. */
export default function FairyNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.7, ease: "easeOut" }}
      className="fixed left-1/2 top-4 z-50 -translate-x-1/2"
      aria-label="Site navigation"
    >
      <div className="flex items-center gap-1 rounded-full border border-white/60 bg-white/70 px-2 py-1.5 shadow-fairy backdrop-blur-xl">
        {LINKS.map(({ id, label, emoji }) => (
          <a
            key={id}
            href={`#${id}`}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-fairy-ink/70 transition-all duration-300 hover:bg-fairy-pink/50 hover:text-fairy-rose",
              active === id &&
                "bg-gradient-to-r from-fairy-pink to-fairy-lavender text-fairy-purple-deep shadow-sm"
            )}
          >
            <span aria-hidden>{emoji}</span>
            <span className="hidden sm:inline">{label}</span>
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
