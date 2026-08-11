"use client";

import { useRef, useState } from "react";
import { Loader2, Trash2, Upload, Lock, Check, Users, UserCheck, UserX, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePhotoManifest, fetchManifest, type PhotoManifest } from "@/lib/photos";

interface RsvpRecord {
  id: string;
  first_name: string;
  last_name: string;
  guests: number;
  attending: boolean;
  allergies: string | null;
  message: string | null;
  created_at: string;
}

/**
 * Hidden admin page for Mama & Papa. Not linked anywhere on the site.
 * Open /admin, enter the admin password (ADMIN_PASSWORD env var), and manage
 * photos and view RSVPs.
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
  const [rsvps, setRsvps] = useState<RsvpRecord[]>([]);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"rsvps" | "photos">("rsvps");
  const loaded = usePhotoManifest();
  const galleryInput = useRef<HTMLInputElement>(null);

  const current = manifest ?? loaded;

  const refresh = async () => setManifest(await fetchManifest(true));

  const fetchRsvps = async (pwd: string) => {
    setRsvpLoading(true);
    try {
      const res = await fetch("/api/rsvps", {
        headers: { Authorization: `Bearer ${pwd}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRsvps(data.rsvps ?? []);
      }
    } catch {
      // ignore
    } finally {
      setRsvpLoading(false);
    }
  };

  const deleteRsvp = async (id: string) => {
    if (!confirm("Delete this RSVP?")) return;
    const res = await fetch("/api/rsvps", {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${password}`,
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setRsvps((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const unlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const fd = new FormData();
    fd.set("password", password);
    fd.set("action", "verify");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (res.ok) {
      setUnlocked(true);
      fetchRsvps(password);
    } else {
      setAuthError("Wrong password.");
    }
  };

  // Stats
  const totalGuests = rsvps.filter((r) => r.attending).reduce((sum, r) => sum + r.guests, 0);
  const attending = rsvps.filter((r) => r.attending).length;
  const notAttending = rsvps.filter((r) => !r.attending).length;

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
          className="w-full max-w-sm rounded-[2rem] border border-white/70 bg-white/70 p-8 text-center shadow-snow-lg backdrop-blur-xl"
        >
          <Lock className="mx-auto text-snow-royal" size={32} />
          <h1 className="mt-3 font-display text-2xl font-bold text-snow-royal">
            Admin Panel
          </h1>
          <p className="mt-1 text-sm text-snow-ink/60">For Mama & Papa only 🤫</p>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="mt-5 text-center"
            autoFocus
          />
          {authError && (
            <p className="mt-2 text-sm font-semibold text-snow-red-deep">{authError}</p>
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
      <h1 className="font-display text-3xl font-bold text-snow-royal">
        🍎 Niane&apos;s Admin Panel
      </h1>

      {/* Tabs */}
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setActiveTab("rsvps")}
          className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
            activeTab === "rsvps"
              ? "bg-snow-royal text-white"
              : "bg-white/60 text-snow-ink hover:bg-white/80"
          }`}
        >
          <Users size={16} />
          RSVPs
        </button>
        <button
          onClick={() => setActiveTab("photos")}
          className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
            activeTab === "photos"
              ? "bg-snow-royal text-white"
              : "bg-white/60 text-snow-ink hover:bg-white/80"
          }`}
        >
          <Upload size={16} />
          Photos
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-2xl bg-snow-blush/50 p-4 text-sm font-semibold text-snow-red-deep">
          {error}
        </p>
      )}

      {/* RSVP Tab */}
      {activeTab === "rsvps" && (
        <div className="mt-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/70 bg-white/70 p-4 text-center shadow-snow backdrop-blur-xl">
              <div className="flex items-center justify-center gap-2 text-snow-leaf">
                <UserCheck size={20} />
                <span className="font-display text-2xl font-bold">{attending}</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-snow-ink/60">Attending</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/70 p-4 text-center shadow-snow backdrop-blur-xl">
              <div className="flex items-center justify-center gap-2 text-snow-red-deep">
                <UserX size={20} />
                <span className="font-display text-2xl font-bold">{notAttending}</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-snow-ink/60">Can&apos;t Make It</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/70 p-4 text-center shadow-snow backdrop-blur-xl">
              <div className="flex items-center justify-center gap-2 text-snow-royal">
                <Users size={20} />
                <span className="font-display text-2xl font-bold">{totalGuests}</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-snow-ink/60">Total Guests</p>
            </div>
          </div>

          {/* Refresh button */}
          <div className="mt-6 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-snow-royal">
              Guest List
            </h2>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => fetchRsvps(password)}
              disabled={rsvpLoading}
            >
              {rsvpLoading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <RefreshCw size={16} />
              )}
              Refresh
            </Button>
          </div>

          {/* RSVP List */}
          <div className="mt-4 space-y-3">
            {rsvpLoading && rsvps.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin text-snow-royal" size={32} />
              </div>
            ) : rsvps.length === 0 ? (
              <p className="rounded-2xl bg-white/60 p-6 text-center text-sm text-snow-ink/50">
                No RSVPs yet — share the invitation! 💌
              </p>
            ) : (
              rsvps.map((rsvp) => (
                <div
                  key={rsvp.id}
                  className={`relative rounded-2xl border p-4 shadow-snow backdrop-blur-xl ${
                    rsvp.attending
                      ? "border-snow-leaf/50 bg-snow-leaf/10"
                      : "border-snow-red/30 bg-snow-blush/30"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-snow-royal">
                        {rsvp.first_name} {rsvp.last_name}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-snow-ink/70">
                        <span
                          className={`inline-flex items-center gap-1 font-semibold ${
                            rsvp.attending ? "text-snow-leaf" : "text-snow-red-deep"
                          }`}
                        >
                          {rsvp.attending ? (
                            <>
                              <UserCheck size={14} /> Attending
                            </>
                          ) : (
                            <>
                              <UserX size={14} /> Not Attending
                            </>
                          )}
                        </span>
                        {rsvp.attending && (
                          <span>
                            <Users size={14} className="inline" /> {rsvp.guests} guest
                            {rsvp.guests > 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                      {rsvp.allergies && (
                        <p className="mt-2 text-sm text-snow-ink/70">
                          <span className="font-semibold">Allergies:</span> {rsvp.allergies}
                        </p>
                      )}
                      {rsvp.message && (
                        <p className="mt-2 rounded-xl bg-white/50 p-3 text-sm italic text-snow-ink/80">
                          &ldquo;{rsvp.message}&rdquo;
                        </p>
                      )}
                      <p className="mt-2 text-xs text-snow-ink/50">
                        {new Date(rsvp.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteRsvp(rsvp.id)}
                      aria-label="Delete RSVP"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-snow-red-deep shadow transition-colors hover:bg-snow-red hover:text-white"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Photos Tab */}
      {activeTab === "photos" && (
        <div className="mt-6">
          <p className="text-snow-ink/70">
            Tap a slot to upload. Photos appear on the site instantly — no redeploy
            needed. Images are resized automatically, so phone photos are fine.
          </p>
          {current && !current.configured && (
            <p className="mt-4 rounded-2xl bg-snow-gold/60 p-4 text-sm font-semibold text-snow-ink">
              ⚠️ Supabase isn&apos;t configured yet — uploads won&apos;t work until the
              env vars are set (see README).
            </p>
          )}

          <h2 className="mt-8 font-display text-xl font-bold text-snow-royal">
            Monthly Memories (1–12)
          </h2>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {Array.from({ length: 12 }, (_, i) => {
              const slot = `month-${i + 1}`;
              const url = current?.months[String(i + 1)];
              return (
                <label
                  key={slot}
                  className="group relative block cursor-pointer overflow-hidden rounded-2xl border-2 border-snow-blue/60 bg-white/60 shadow-snow transition-transform hover:-translate-y-0.5"
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
                      <div className="flex h-full w-full items-center justify-center text-snow-ink/40">
                        <Upload size={20} />
                      </div>
                    )}
                  </div>
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-white/90 px-2 py-0.5 font-display text-xs font-bold text-snow-red-deep shadow">
                    {i + 1}
                  </span>
                  {busySlot === slot && (
                    <span className="absolute inset-0 flex items-center justify-center bg-white/70">
                      <Loader2 className="animate-spin text-snow-royal" size={22} />
                    </span>
                  )}
                  {doneSlot === slot && (
                    <span className="absolute inset-0 flex items-center justify-center bg-snow-leaf/70">
                      <Check className="text-snow-royal" size={26} />
                    </span>
                  )}
                </label>
              );
            })}
          </div>

          <div className="mt-12 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-snow-royal">
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
                className="group relative overflow-hidden rounded-2xl border-2 border-snow-blue/60 shadow-snow"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.url} alt="" className="aspect-square w-full object-cover" />
                <button
                  onClick={() => remove(g.path)}
                  aria-label="Delete photo"
                  className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-snow-red-deep opacity-0 shadow transition-opacity group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            {current?.gallery.length === 0 && (
              <p className="col-span-full rounded-2xl bg-white/60 p-6 text-center text-sm text-snow-ink/50">
                No gallery photos yet — add some! 🌸
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
