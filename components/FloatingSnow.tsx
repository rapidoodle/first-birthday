"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STORYBOOK = ["🍎", "✨", "👑", "🐦", "🌹", "🍄", "🌲", "💛", "🪞", "🦋"];

interface Sprite {
  emoji: string;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

/** Ambient storybook sprites drifting behind every section + gentle parallax. */
export default function FloatingSnow() {
  const [sprites, setSprites] = useState<Sprite[]>([]);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);

  useEffect(() => {
    // Generated client-side to avoid hydration mismatch.
    setSprites(
      Array.from({ length: 18 }, (_, i) => ({
        emoji: STORYBOOK[i % STORYBOOK.length],
        left: Math.random() * 96,
        top: Math.random() * 100,
        size: 18 + Math.random() * 26,
        duration: 7 + Math.random() * 8,
        delay: Math.random() * 6,
        opacity: 0.25 + Math.random() * 0.35,
      }))
    );
  }, []);

  return (
    <motion.div
      aria-hidden
      style={{ y }}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {sprites.map((s, i) => (
        <motion.span
          key={i}
          className="absolute select-none"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            fontSize: s.size,
            opacity: s.opacity,
            filter: "blur(0.3px)",
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, i % 2 ? 12 : -12, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: s.duration,
            delay: s.delay,
            ease: "easeInOut",
          }}
        >
          {s.emoji}
        </motion.span>
      ))}
    </motion.div>
  );
}
