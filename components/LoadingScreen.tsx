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
          {/* Swinging dinosaur egg */}
          <motion.div
            animate={{ rotate: [-10, 10, -10], y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          >
            <span className="text-8xl drop-shadow">🥚</span>
          </motion.div>
          <motion.p
            className="mt-6 font-script text-3xl text-white drop-shadow"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            Digging up a birthday adventure…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
