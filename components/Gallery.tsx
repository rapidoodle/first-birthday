"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionTitle } from "@/components/Section";
import FairyPhoto from "@/components/FairyPhoto";
import Lightbox from "@/components/Lightbox";

/** Masonry gallery — drop photos at /public/photos/gallery-1.jpg … gallery-9.jpg */
const ASPECTS = [
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[4/3]",
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Section id="gallery">
      <SectionTitle
        eyebrow="little moments"
        title="Enchanted Gallery 📸"
        subtitle="A few more sprinkles of pixie dust and favorite memories."
      />

      <div className="masonry mx-auto max-w-5xl">
        {ASPECTS.map((aspect, i) => (
          <motion.button
            key={i}
            onClick={() => setSelected(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            whileHover={{ scale: 1.02 }}
            className="block w-full overflow-hidden rounded-3xl border border-white/70 shadow-fairy transition-shadow duration-300 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fairy-purple"
            aria-label={`Open gallery photo ${i + 1}`}
          >
            <FairyPhoto
              src={`/photos/gallery-${i + 1}.jpg`}
              alt={`Gallery photo ${i + 1}`}
              seed={i + 3}
              aspect={aspect}
            />
          </motion.button>
        ))}
      </div>

      <Lightbox open={selected !== null} onClose={() => setSelected(null)}>
        {selected !== null && (
          <FairyPhoto
            src={`/photos/gallery-${selected + 1}.jpg`}
            alt={`Gallery photo ${selected + 1}`}
            seed={selected + 3}
            aspect="aspect-auto"
            className="max-h-[70vh] w-[min(85vw,700px)] object-contain"
          />
        )}
      </Lightbox>
    </Section>
  );
}
