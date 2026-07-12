"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const pastels = [
  "from-snow-blush to-snow-blue",
  "from-snow-sky to-snow-leaf",
  "from-snow-gold to-snow-blush",
  "from-snow-blue to-snow-sky",
  "from-snow-leaf to-snow-gold",
];
const emojis = ["🍎", "👑", "🐦", "✨", "🌹", "🍄", "🌲", "💛"];

/**
 * Renders /public{src}. If the file doesn't exist yet, shows a cute
 * pastel placeholder instead — drop your real photos into /public/photos.
 */
export default function SnowPhoto({
  src,
  alt,
  seed = 0,
  className,
  aspect = "aspect-[4/5]",
}: {
  src: string;
  alt: string;
  seed?: number;
  className?: string;
  aspect?: string;
}) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div
        className={cn(
          "flex w-full items-center justify-center bg-gradient-to-br",
          pastels[seed % pastels.length],
          aspect,
          className
        )}
        role="img"
        aria-label={alt}
      >
        <div className="text-center">
          <span className="block text-5xl drop-shadow-sm">
            {emojis[seed % emojis.length]}
          </span>
          <span className="mt-2 block px-4 text-xs font-semibold text-white/90 drop-shadow">
            Photo coming soon
          </span>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setMissing(true)}
      className={cn("w-full object-cover", aspect, className)}
    />
  );
}
