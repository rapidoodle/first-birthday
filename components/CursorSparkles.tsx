"use client";

import { useEffect, useRef } from "react";

const SPARKLES = ["✨", "🦋", "⭐", "💗"];

/** Tiny fairy sparkles trail the cursor (desktop only, throttled). */
export default function CursorSparkles() {
  const last = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last.current < 90) return;
      last.current = now;

      const el = document.createElement("span");
      el.className = "sparkle-particle";
      el.textContent = SPARKLES[Math.floor(Math.random() * SPARKLES.length)];
      el.style.left = `${e.clientX + (Math.random() * 16 - 8)}px`;
      el.style.top = `${e.clientY + (Math.random() * 16 - 8)}px`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 900);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
