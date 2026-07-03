"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

const PASTELS = ["#F7A8C9", "#B79CE0", "#8FD3E8", "#8FE0C5", "#FCEEB5"];

export function fairyBurst() {
  const opts = { colors: PASTELS, disableForReducedMotion: true };
  confetti({ ...opts, particleCount: 90, spread: 75, origin: { y: 0.65 } });
  setTimeout(
    () =>
      confetti({
        ...opts,
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
      }),
    180
  );
  setTimeout(
    () =>
      confetti({
        ...opts,
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
      }),
    320
  );
}

/** Soft confetti rain the first time someone opens the invitation. */
export default function FirstVisitConfetti() {
  useEffect(() => {
    if (localStorage.getItem("nia-visited")) return;
    localStorage.setItem("nia-visited", "1");
    const t = setTimeout(fairyBurst, 2300); // after the loading screen
    return () => clearTimeout(t);
  }, []);

  return null;
}
