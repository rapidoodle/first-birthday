"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionTitle } from "@/components/Section";
import FairyPhoto from "@/components/FairyPhoto";
import Lightbox from "@/components/Lightbox";
import { milestones } from "@/lib/config";

const MONTH_EMOJI = ["🍼", "😊", "🎀", "🧸", "🥄", "🌷", "🗣️", "🐣", "🌟", "👋", "👣", "🎂"];

/** 12 monthly memory cards — drop photos at /public/photos/month-1.jpg … month-12.jpg */
export default function Memories() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Section id="memories">
      <SectionTitle
        eyebrow="watch her grow"
        title="Monthly Memories 🦋"
        subtitle="Twelve months of sweetness — one adorable moment at a time."
      />

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {milestones.map((caption, i) => (
          <motion.button
            key={i}
            onClick={() => setSelected(i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: (i % 4) * 0.08 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group overflow-hidden rounded-3xl border border-white/70 bg-white/70 text-left shadow-fairy backdrop-blur transition-shadow duration-300 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fairy-purple"
            aria-label={`Month ${i + 1}: ${caption}`}
          >
            <div className="relative overflow-hidden">
              <FairyPhoto
                src={`/photos/month-${i + 1}.jpg`}
                alt={`Niane at month ${i + 1}`}
                seed={i}
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 font-display text-sm font-extrabold text-fairy-rose shadow-fairy">
                {i + 1}
              </span>
            </div>
            <div className="p-4">
              <p className="font-display text-sm font-bold text-fairy-purple-deep">
                {MONTH_EMOJI[i]} Month {i + 1}
              </p>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-fairy-ink/70">
                {caption}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox
        open={selected !== null}
        onClose={() => setSelected(null)}
        caption={
          selected !== null
            ? `Month ${selected + 1} — ${milestones[selected]}`
            : undefined
        }
      >
        {selected !== null && (
          <FairyPhoto
            src={`/photos/month-${selected + 1}.jpg`}
            alt={`Niane at month ${selected + 1}`}
            seed={selected}
            aspect="aspect-[4/3]"
            className="max-h-[65vh] w-[min(80vw,640px)]"
          />
        )}
      </Lightbox>
    </Section>
  );
}
