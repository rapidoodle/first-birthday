"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-snow-blush via-snow-blue to-snow-gold"
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Swinging enchanted apple */}
          <motion.div
            animate={{ rotate: [-10, 10, -10], y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          >
            <svg width="130" height="140" viewBox="0 0 200 210" aria-hidden>
              <defs>
                <radialGradient id="loadapple" cx="0.35" cy="0.3" r="1">
                  <stop offset="0%" stopColor="#F5A3AC" />
                  <stop offset="55%" stopColor="#E2707D" />
                  <stop offset="100%" stopColor="#C6455C" />
                </radialGradient>
              </defs>
              <path d="M100 58 C 98 40, 104 32, 112 26" fill="none" stroke="#8a6b4f" strokeWidth="8" strokeLinecap="round" />
              <path d="M112 40 C 132 22, 156 26, 158 30 C 152 50, 130 56, 112 46 Z" fill="#7FBF8B" />
              <path
                d="M100 66 C 72 44, 28 58, 26 104 C 24 146, 58 190, 88 186 C 93 185, 97 183, 100 180 C 103 183, 107 185, 112 186 C 142 190, 176 146, 174 104 C 172 58, 128 44, 100 66 Z"
                fill="url(#loadapple)"
                stroke="#fff"
                strokeWidth="6"
              />
              <ellipse cx="66" cy="98" rx="16" ry="26" fill="#fff" opacity="0.5" transform="rotate(-18 66 98)" />
            </svg>
          </motion.div>
          <motion.p
            className="mt-6 font-script text-3xl text-white drop-shadow"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            mirror, mirror on the wall…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
