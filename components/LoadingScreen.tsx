"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STAR =
  "95,18 111.5,65.3 161.6,66.4 121.6,96.7 136.1,144.6 95,116 53.9,144.6 68.4,96.7 28.4,66.4 78.5,65.3";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-fairy-pink via-fairy-lavender to-fairy-blue"
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Twirling magic wand star */}
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          >
            <svg width="150" height="150" viewBox="0 0 190 165" aria-hidden>
              <defs>
                <linearGradient id="wandstar" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F7A8C9" />
                  <stop offset="100%" stopColor="#8FD3E8" />
                </linearGradient>
              </defs>
              <polygon
                points={STAR}
                fill="url(#wandstar)"
                stroke="#fff"
                strokeWidth="7"
                strokeLinejoin="round"
              />
              <circle cx="72" cy="60" r="7" fill="#fff" opacity="0.8" />
            </svg>
          </motion.div>
          <div className="mt-4 h-24 w-2.5 -translate-y-3 rounded-full bg-white/90 shadow-fairy" />
          {/* orbiting sparkles */}
          <motion.p
            className="mt-2 font-script text-2xl text-white drop-shadow"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            a little magic is loading…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
