"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { event } from "@/lib/config";

function useCountdown(targetISO: string) {
  const calc = () => {
    const diff = new Date(targetISO).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor(diff / 3_600_000) % 24,
      minutes: Math.floor(diff / 60_000) % 60,
      seconds: Math.floor(diff / 1000) % 60,
      done: false,
    };
  };
  const [t, setT] = useState<ReturnType<typeof calc> | null>(null);
  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetISO]);
  return t;
}

/** Enchanted lantern orbs drifting along the top of the hero. */
const ORBS = [
  { c: "#E2707D", x: 8, d: 0 },
  { c: "#F7DE9C", x: 22, d: 0.4 },
  { c: "#8FA9E0", x: 36, d: 0.8 },
  { c: "#C9E2F5", x: 62, d: 0.2 },
  { c: "#7FBF8B", x: 76, d: 0.6 },
  { c: "#FFDDE1", x: 90, d: 1.0 },
];

export default function Hero() {
  const t = useCountdown(event.dateISO);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-end overflow-hidden px-5 pb-16 pt-24 text-center"
    >
      {/* Lantern orb arch */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-56">
        {ORBS.map((o, i) => (
          <motion.div
            key={i}
            className="absolute h-14 w-14 rounded-full md:h-20 md:w-20"
            style={{
              left: `${o.x}%`,
              top: i % 2 ? "8%" : "0%",
              background: `radial-gradient(circle at 35% 30%, white 0%, ${o.c} 55%)`,
              boxShadow: `0 0 30px 6px ${o.c}66`,
            }}
            animate={{ y: [0, -14, 0], scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 5 + i, delay: o.d, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="font-script text-3xl text-snow-red-deep md:text-4xl"
      >
        Mirror, mirror on the wall…
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 max-w-4xl font-display text-5xl font-extrabold leading-tight text-snow-royal md:text-7xl"
      >
        🍎 Niane, the{" "}
        <span className="bg-gradient-to-r from-snow-red-deep via-snow-red to-snow-blue-deep bg-clip-text text-transparent">
          Fairest Little One
        </span>
        , is turning one! ✨
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.55, duration: 0.8 }}
        className="mt-5 max-w-xl text-lg text-snow-ink/80 md:text-xl"
      >
        Join us as we celebrate our little sweetheart&apos;s first birthday!
      </motion.p>

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.75, duration: 0.8 }}
        className="mt-10 flex gap-3 md:gap-5"
        aria-label="Countdown to the birthday"
      >
        {(
          [
            ["Days", t?.days],
            ["Hours", t?.hours],
            ["Minutes", t?.minutes],
            ["Seconds", t?.seconds],
          ] as const
        ).map(([label, value]) => (
          <div
            key={label}
            className="flex w-[76px] flex-col items-center rounded-3xl border border-white/70 bg-white/70 px-2 py-4 shadow-snow backdrop-blur-xl md:w-24 md:py-5"
          >
            <span className="font-display text-3xl font-extrabold tabular-nums text-snow-red-deep md:text-4xl">
              {value !== undefined ? String(value).padStart(2, "0") : "--"}
            </span>
            <span className="mt-1 text-[11px] font-bold uppercase tracking-wider text-snow-ink/60 md:text-xs">
              {label}
            </span>
          </div>
        ))}
      </motion.div>
      {t?.done && (
        <p className="mt-4 font-script text-3xl text-snow-red-deep">
          It&apos;s party time! 🎉
        </p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.95, duration: 0.8 }}
        className="mt-10"
      >
        <Button size="lg" onClick={() => document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })}>
          RSVP Now 💌
        </Button>
      </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#story"
        aria-label="Scroll down"
        className="absolute bottom-6 z-10 text-2xl text-snow-blue-deep"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        ⌄
      </motion.a>
    </section>
  );
}
