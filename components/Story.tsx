"use client";

import { Section, Reveal } from "@/components/Section";

export default function Story() {
  return (
    <Section id="story" className="py-16 md:py-24">
      <Reveal className="mx-auto max-w-2xl">
        <div className="relative rounded-[2.5rem] border border-white/70 bg-white/60 p-10 text-center shadow-snow backdrop-blur-xl md:p-14">
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl" aria-hidden>
            🍎
          </span>
          <p className="font-script text-2xl text-snow-red-deep md:text-3xl">
            once upon a time…
          </p>
          <p className="mt-6 text-lg leading-relaxed text-snow-ink/85 md:text-xl">
            One whole year of smiles, giggles, and unforgettable memories. We
            can&apos;t wait to celebrate this sweet milestone with our family
            and friends.
          </p>
          <div className="mt-8 flex justify-center gap-4 text-3xl" aria-hidden>
            <span className="animate-float">🍼</span>
            <span className="animate-float-slow">💗</span>
            <span className="animate-float" style={{ animationDelay: "1s" }}>
              🎂
            </span>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
