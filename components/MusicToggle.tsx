"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

/**
 * Soft background music toggle.
 * Drop a gentle instrumental/lullaby at /public/audio/lullaby.mp3
 * (royalty-free sources: pixabay.com/music, freesound.org).
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const toggle = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/lullaby.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.35;
    }
    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch {
      setUnavailable(true);
      setTimeout(() => setUnavailable(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.5, type: "spring" }}
      className="fixed bottom-5 right-5 z-50"
    >
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-white/80 text-snow-royal shadow-snow backdrop-blur-xl transition-transform hover:scale-110 active:scale-95"
      >
        {playing ? (
          <motion.span
            animate={{ rotate: [0, -12, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            <Music size={20} />
          </motion.span>
        ) : (
          <VolumeX size={20} />
        )}
      </button>
      {unavailable && (
        <p className="absolute bottom-14 right-0 w-52 rounded-2xl bg-white/90 p-3 text-xs text-snow-ink shadow-snow backdrop-blur">
          Add a song at{" "}
          <code className="text-snow-red-deep">public/audio/lullaby.mp3</code> to
          enable music 🎵
        </p>
      )}
    </motion.div>
  );
}
