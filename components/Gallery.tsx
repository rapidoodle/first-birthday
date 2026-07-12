"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionTitle } from "@/components/Section";
import SnowPhoto from "@/components/SnowPhoto";
import Lightbox from "@/components/Lightbox";
import { usePhotoManifest } from "@/lib/photos";

/** Masonry gallery — photos uploaded via /admin (falls back to /public/photos). */
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
  const manifest = usePhotoManifest();

  // Uploaded photos if any; otherwise 9 local/placeholder slots.
  const photos =
    manifest && manifest.gallery.length > 0
      ? manifest.gallery.map((g) => g.url)
      : ASPECTS.map((_, i) => `/photos/gallery-${i + 1}.jpg`);

  return (
    <Section id="gallery">
      <SectionTitle
        eyebrow="little moments"
        title="Enchanted Gallery 📸"
        subtitle="A few more pages from her little storybook."
      />

      <div className="masonry mx-auto max-w-5xl">
        {photos.map((src, i) => (
          <motion.button
            key={src}
            onClick={() => setSelected(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            whileHover={{ scale: 1.02 }}
            className="block w-full overflow-hidden rounded-3xl border border-white/70 shadow-snow transition-shadow duration-300 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snow-blue-deep"
            aria-label={`Open gallery photo ${i + 1}`}
          >
            <SnowPhoto
              src={src}
              alt={`Gallery photo ${i + 1}`}
              seed={i + 3}
              aspect={ASPECTS[i % ASPECTS.length]}
            />
          </motion.button>
        ))}
      </div>

      <Lightbox open={selected !== null} onClose={() => setSelected(null)}>
        {selected !== null && photos[selected] && (
          <SnowPhoto
            src={photos[selected]}
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
