"use client";

import { Section, Reveal } from "@/components/Section";

export default function Gifts() {
  return (
    <Section id="gifts" className="py-14 md:py-20">
      <Reveal className="mx-auto max-w-2xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-snow-blush/70 via-snow-blue/70 to-snow-sky/70 p-[2px] shadow-snow-lg">
          <div className="rounded-[calc(2.5rem-2px)] bg-white/80 p-10 text-center backdrop-blur-xl md:p-12">
            <span className="text-5xl" aria-hidden>
              🎁
            </span>
            <h3 className="mt-4 font-display text-3xl font-bold text-snow-royal">
              A Note on Gifts
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-snow-ink/85">
              Your presence is the sweetest gift. 💕
            </p>
            <p className="mt-2 leading-relaxed text-snow-ink/70">
              If you&apos;d still like to bless Niane, a small contribution toward
              her future is greatly appreciated.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
