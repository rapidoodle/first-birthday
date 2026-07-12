"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

const PASTELS = ["#E2707D", "#8FA9E0", "#F7DE9C", "#7FBF8B", "#FFDDE1"];

export function snowBurst() {
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
    const t = setTimeout(snowBurst, 2300); // after the loading screen
    return () => clearTimeout(t);
  }, []);

  return null;
}
