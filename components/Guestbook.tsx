"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, PenLine } from "lucide-react";
import { Section, SectionTitle, Reveal } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  fetchWishes,
  submitWish,
  isDemoMode,
  type WishEntry,
} from "@/lib/supabase";

const SAMPLE_WISHES: WishEntry[] = [
  { name: "Lola & Lolo", message: "Happy 1st birthday, our sweetest apo! 💗" },
  { name: "Tita Mia", message: "Can't believe Niane is one already! See you at the party ✨" },
  { name: "The Santos Family", message: "Wishing our little sweetheart a lifetime of joy! 🎈" },
];

export default function Guestbook() {
  const [wishes, setWishes] = useState<WishEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (isDemoMode) {
      setWishes(SAMPLE_WISHES);
    } else {
      fetchWishes()
        .then(setWishes)
        .catch(() => setWishes([]));
    }
  }, []);

  const send = async () => {
    if (!name.trim() || !message.trim() || sending) return;
    setSending(true);
    try {
      await submitWish({ name: name.trim(), message: message.trim() });
      setWishes((w) => [{ name: name.trim(), message: message.trim() }, ...w]);
      setName("");
      setMessage("");
    } catch {
      /* keep values so the guest can retry */
    } finally {
      setSending(false);
    }
  };

  return (
    <Section id="guestbook">
      <SectionTitle
        eyebrow="leave some love"
        title="Guestbook 💌"
        subtitle="Drop a birthday wish for Niane — before or after the party!"
      />

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-5">
        <Reveal className="md:col-span-2">
          <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-fairy backdrop-blur-xl">
            <div>
              <Label htmlFor="wish-name">Your Name</Label>
              <Input
                id="wish-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tita Anna"
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="wish-message">Birthday Wish</Label>
              <Textarea
                id="wish-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Dear Niane…"
              />
            </div>
            <Button
              onClick={send}
              disabled={sending || !name.trim() || !message.trim()}
              className="mt-4 w-full"
            >
              {sending ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <PenLine size={18} />
              )}
              Sign the Guestbook
            </Button>
          </div>
        </Reveal>

        <div className="space-y-4 md:col-span-3">
          {wishes.length === 0 && (
            <Reveal>
              <p className="rounded-3xl border border-white/70 bg-white/60 p-6 text-center text-fairy-ink/60 shadow-fairy backdrop-blur">
                Be the first to leave a magical wish! ✨
              </p>
            </Reveal>
          )}
          {wishes.map((w, i) => (
            <motion.div
              key={`${w.name}-${i}`}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.4) }}
              className="rounded-3xl border border-white/70 bg-white/65 p-5 shadow-fairy backdrop-blur"
            >
              <p className="leading-relaxed text-fairy-ink/85">“{w.message}”</p>
              <p className="mt-2 font-display text-sm font-bold text-fairy-rose">
                — {w.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
