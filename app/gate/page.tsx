"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function GatePage() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim() || busy) return;
    setBusy(true);
    setError(false);
    const res = await fetch("/api/gate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode }),
    }).catch(() => null);
    if (res?.ok) {
      window.location.replace("/");
    } else {
      setError(true);
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-[2.5rem] border border-white/70 bg-white/70 p-10 text-center shadow-fairy-lg backdrop-blur-xl"
      >
        <motion.span
          className="inline-block text-6xl"
          animate={{ y: [0, -10, 0], rotate: [0, 6, 0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          aria-hidden
        >
          🧚
        </motion.span>
        <h1 className="mt-4 font-display text-3xl font-bold text-fairy-purple-deep">
          A Fairy First Birthday
        </h1>
        <p className="mt-2 font-script text-xl text-fairy-rose">
          whisper the magic word to enter…
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <motion.div
            animate={error ? { x: [0, -10, 10, -8, 8, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <Input
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setError(false);
              }}
              placeholder="Magic word ✨"
              className="text-center"
              autoFocus
              autoComplete="off"
            />
          </motion.div>
          {error && (
            <p className="text-sm font-semibold text-fairy-rose">
              Hmm, that&apos;s not it — check your invitation! 💌
            </p>
          )}
          <Button type="submit" className="w-full" disabled={busy}>
            <Sparkles size={18} />
            {busy ? "Opening…" : "Enter the Garden"}
          </Button>
        </form>

        <p className="mt-6 text-xs text-fairy-ink/50">
          The magic word is on your invitation. 🌸
        </p>
      </motion.div>
    </main>
  );
}
