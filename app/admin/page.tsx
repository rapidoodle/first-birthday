"use client";

import { useRef, useState } from "react";
import { Loader2, Trash2, Upload, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePhotoManifest, fetchManifest, type PhotoManifest } from "@/lib/photos";

/**
 * Hidden photo-upload page for Mama & Papa. Not linked anywhere on the site.
 * Open /admin, enter the admin password (ADMIN_PASSWORD env var), and upload
 * straight from a phone. Images are resized in the browser before upload.
 */

async function resizeImage(file: File, maxSize = 1600): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, w, h);
    const blob = await new Promise<Blob | null>((res) =>
      canvas.toBlob(res, "image/jpeg", 0.85)
    );
    return blob ?? file;
  } catch {
    return file; // e.g. HEIC on browsers that can't decode it — upload original
  }
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [authError, setAuthError] = useState("");
  const [busySlot, setBusySlot] = useState<string | null>(null);
  const [doneSlot, setDoneSlot] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [manifest, setManifest] = useState<PhotoManifest | null>(null);
  const loaded = usePhotoManifest();
  const galleryInput = useRef<HTMLInputElement>(null);

  const current = manifest ?? loaded;

  const refresh = async () => setManifest(await fetchManifest(true));

  const unlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const fd = new FormData();
    fd.set("password", password);
    fd.set("action", "verify");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (res.ok) setUnlocked(true);
    else setAuthError("Wrong password.");
  };

  const upload = async (slot: string, file: File) => {
    setBusySlot(slot);
    setError("");
    try {
      const blob = await resizeImage(file);
      const fd = new FormData();
      fd.set("password", password);
      fd.set("slot", slot);
      fd.set(
        "file",
        new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", {
          type: blob.type || "image/jpeg",
        })
      );
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      await refresh();
      setDoneSlot(slot);
      setTimeout(() => setDoneSlot((s) => (s === slot ? null : s)), 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusySlot(null);
    }
  };

  const remove = async (path: string) => {
    if (!confirm("Delete this photo?")) return;
    setError("");
    const res = await fetch("/api/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, path }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Delete failed");
      return;
    }
    await refresh();
  };

  if (!unlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5">
        <form
          onSubmit={unlock}
          className="w-full max-w-sm rounded-[2rem] border border-white/70 bg-white/70 p-8 text-center shadow-fairy-lg backdrop-blur-xl"
        >
          <Lock className="mx-auto text-fairy-purple-deep" size={32} />
          <h1 className="mt-3 font-display text-2xl font-bold text-fairy-purple-deep">
            Photo Admin
          </h1>
          <p className="mt-1 text-sm text-fairy-ink/60">For Mama & Papa only 🤫</p>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="mt-5 text-center"
            autoFocus
          />
          {authError && (
            <p className="mt-2 text-sm font-semibold text-fairy-rose">{authError}</p>
          )}
          <Button type="submit" className="mt-4 w-full">
            Unlock
          </Button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="font-display text-3xl font-bold text-fairy-purple-deep">
        📸 Niane&apos;s Photo Admin
      </h1>
      <p className="mt-2 text-fairy-ink/70">
        Tap a slot to upload. Photos appear on the site instantly — no redeploy
        needed. Images are resized automatically, so phone photos are fine.
      </p>
      {current && !current.configured && (
        <p className="mt-4 rounded-2xl bg-fairy-butter/60 p-4 text-sm font-semibold text-fairy-ink">
          ⚠️ Supabase isn&apos;t configured yet — uploads won&apos;t work until the
          env vars are set (see README).
        </p>
      )}
      {error && (
        <p className="mt-4 rounded-2xl bg-fairy-pink/50 p-4 text-sm font-semibold text-fairy-rose">
          {error}
        </p>
      )}

      <h2 className="mt-10 font-display text-xl font-bold text-fairy-purple-deep">
        Monthly Memories (1–12)
      </h2>
      <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {Array.from({ length: 12 }, (_, i) => {
          const slot = `month-${i + 1}`;
          const url = current?.months[String(i + 1)];
          return (
            <label
              key={slot}
              className="group relative block cursor-pointer overflow-hidden rounded-2xl border-2 border-fairy-lavender/60 bg-white/60 shadow-fairy transition-transform hover:-translate-y-0.5"
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={busySlot !== null}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) upload(slot, f);
                  e.target.value = "";
                }}
              />
              <div className="aspect-square">
                {url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={url} alt={slot} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-fairy-ink/40">
                    <Upload size={20} />
                  </div>
                )}
              </div>
              <span className="absolute left-1.5 top-1.5 rounded-full bg-white/90 px-2 py-0.5 font-display text-xs font-bold text-fairy-rose shadow">
                {i + 1}
              </span>
              {busySlot === slot && (
                <span className="absolute inset-0 flex items-center justify-center bg-white/70">
                  <Loader2 className="animate-spin text-fairy-purple-deep" size={22} />
                </span>
              )}
              {doneSlot === slot && (
                <span className="absolute inset-0 flex items-center justify-center bg-fairy-mint/70">
                  <Check className="text-fairy-purple-deep" size={26} />
                </span>
              )}
            </label>
          );
        })}
      </div>

      <div className="mt-12 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-fairy-purple-deep">
          Gallery
        </h2>
        <Button
          size="sm"
          disabled={busySlot !== null}
          onClick={() => galleryInput.current?.click()}
        >
          {busySlot === "gallery" ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Upload size={16} />
          )}
          Add photos
        </Button>
        <input
          ref={galleryInput}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={async (e) => {
            const files = Array.from(e.target.files ?? []);
            for (const f of files) await upload("gallery", f);
            e.target.value = "";
          }}
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
        {(current?.gallery ?? []).map((g) => (
          <div
            key={g.path}
            className="group relative overflow-hidden rounded-2xl border-2 border-fairy-lavender/60 shadow-fairy"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={g.url} alt="" className="aspect-square w-full object-cover" />
            <button
              onClick={() => remove(g.path)}
              aria-label="Delete photo"
              className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-fairy-rose opacity-0 shadow transition-opacity group-hover:opacity-100"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {current?.gallery.length === 0 && (
          <p className="col-span-full rounded-2xl bg-white/60 p-6 text-center text-sm text-fairy-ink/50">
            No gallery photos yet — add some! 🌸
          </p>
        )}
      </div>
    </main>
  );
}
