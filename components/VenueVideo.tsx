"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Reveal } from "@/components/Section";
import { event } from "@/lib/config";

/** Extracts the video ID from any common YouTube URL format. */
function youtubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return m ? m[1] : null;
}

/**
 * "Peek at the Venue" — lazy YouTube embed. Shows the video thumbnail with a
 * play button; the actual player only loads when tapped (fast page load).
 * Hidden entirely until event.venueVideoUrl is set in lib/config.ts.
 */
export default function VenueVideo() {
  const [playing, setPlaying] = useState(false);
  const id = event.venueVideoUrl ? youtubeId(event.venueVideoUrl) : null;
  const isShort = event.venueVideoUrl.includes("/shorts/");

  if (!id) return null;

  return (
    <Reveal
      delay={0.2}
      className={`mx-auto mt-12 ${isShort ? "max-w-sm" : "max-w-3xl"}`}
    >
      <div className="rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-snow-lg backdrop-blur-xl md:p-6">
        <p className="mb-1 text-center font-script text-2xl text-snow-red-deep">
          a peek at the venue…
        </p>
        <p className="mb-4 text-center text-sm text-snow-ink/70">
          🏰 {event.venueName}, {event.venueAddress}
        </p>
        <div
          className={`relative overflow-hidden rounded-3xl shadow-snow ${
            isShort ? "aspect-[9/16]" : "aspect-video"
          }`}
        >
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
              title={`Video of ${event.venueName}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              aria-label="Play venue video"
              className="group absolute inset-0 h-full w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                alt={`Preview of ${event.venueName}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-snow-ink/20 transition-colors group-hover:bg-snow-ink/10">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-snow-red-deep shadow-snow-lg transition-transform group-hover:scale-110">
                  <Play size={26} className="ml-1" fill="currentColor" />
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </Reveal>
  );
}
