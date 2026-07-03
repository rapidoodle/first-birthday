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

/** Glowing fairy orbs drifting along the top, like garden fairy lights. */
const ORBS = [
  { c: "#F7A8C9", x: 8, d: 0 },
  { c: "#FCEEB5", x: 22, d: 0.4 },
  { c: "#B79CE0", x: 36, d: 0.8 },
  { c: "#8FD3E8", x: 62, d: 0.2 },
  { c: "#8FE0C5", x: 76, d: 0.6 },
  { c: "#FFD6E8", x: 90, d: 1.0 },
];

const STAR =
  "95,18 111.5,65.3 161.6,66.4 121.6,96.7 136.1,144.6 95,116 53.9,144.6 68.4,96.7 28.4,66.4 78.5,65.3";

export default function Hero() {
  const t = useCountdown(event.dateISO);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-24 text-center"
    >
      {/* Fairy-light orb arch */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-56">
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

      {/* Magic wand illustration */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2.0, type: "spring", damping: 14 }}
        className="relative mb-6"
        aria-hidden
      >
        <motion.svg
          width="190"
          height="235"
          viewBox="0 0 190 240"
          className="drop-shadow-xl"
          animate={{ y: [0, -12, 0], rotate: [0, 3, 0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="fairystar" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFD6E8" />
              <stop offset="50%" stopColor="#F7A8C9" />
              <stop offset="100%" stopColor="#8FD3E8" />
            </linearGradient>
          </defs>
          {/* wand */}
          <rect x="90" y="150" width="10" height="85" rx="5" fill="#FFF8E1" stroke="#FCEEB5" />
          {/* glow */}
          <circle cx="95" cy="82" r="76" fill="#FFD6E8" opacity="0.35" />
          {/* star */}
          <polygon
            points={STAR}
            fill="url(#fairystar)"
            stroke="#fff"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <circle cx="72" cy="58" r="7" fill="#fff" opacity="0.8" />
          {/* trailing sparkles */}
          <circle cx="30" cy="150" r="4" fill="#B79CE0" opacity="0.7" />
          <circle cx="160" cy="140" r="5" fill="#8FE0C5" opacity="0.7" />
          <circle cx="45" cy="35" r="3" fill="#F7A8C9" opacity="0.8" />
          <circle cx="150" cy="30" r="4" fill="#8FD3E8" opacity="0.8" />
        </motion.svg>
        <motion.span
          className="absolute -right-8 top-6 text-4xl"
          animate={{ rotate: [0, 15, 0], y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          🦋
        </motion.span>
        <motion.span
          className="absolute -left-10 bottom-14 text-4xl"
          animate={{ rotate: [0, -15, 0], y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
        >
          🌸
        </motion.span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="font-script text-2xl text-fairy-rose md:text-3xl"
      >
        our little fairy {event.fullName} is turning one!
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 max-w-4xl font-display text-5xl font-extrabold leading-tight text-fairy-purple-deep md:text-7xl"
      >
        🧚 A{" "}
        <span className="bg-gradient-to-r from-fairy-rose via-fairy-pink-deep to-fairy-blue-deep bg-clip-text text-transparent">
          Fairy First Birthday
        </span>{" "}
        for Niane ✨
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.55, duration: 0.8 }}
        className="mt-5 max-w-xl text-lg text-fairy-ink/80 md:text-xl"
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
            className="flex w-[76px] flex-col items-center rounded-3xl border border-white/70 bg-white/70 px-2 py-4 shadow-fairy backdrop-blur-xl md:w-24 md:py-5"
          >
            <span className="font-display text-3xl font-extrabold tabular-nums text-fairy-rose md:text-4xl">
              {value !== undefined ? String(value).padStart(2, "0") : "--"}
            </span>
            <span className="mt-1 text-[11px] font-bold uppercase tracking-wider text-fairy-ink/60 md:text-xs">
              {label}
            </span>
          </div>
        ))}
      </motion.div>
      {t?.done && (
        <p className="mt-4 font-script text-2xl text-fairy-rose">
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

      {/* Scroll hint */}
      <motion.a
        href="#story"
        aria-label="Scroll down"
        className="absolute bottom-6 text-2xl text-fairy-purple"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        ⌄
      </motion.a>
    </section>
  );
}
