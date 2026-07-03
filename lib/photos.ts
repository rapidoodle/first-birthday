"use client";

import { useEffect, useState } from "react";

export interface PhotoManifest {
  configured: boolean;
  months: Record<string, string>;
  gallery: { path: string; url: string }[];
}

const EMPTY: PhotoManifest = { configured: false, months: {}, gallery: [] };

let cache: PhotoManifest | null = null;
let inflight: Promise<PhotoManifest> | null = null;

export function fetchManifest(force = false): Promise<PhotoManifest> {
  if (cache && !force) return Promise.resolve(cache);
  if (!inflight || force) {
    inflight = fetch("/api/photos")
      .then((r) => (r.ok ? r.json() : EMPTY))
      .then((m: PhotoManifest) => (cache = m))
      .catch(() => EMPTY);
  }
  return inflight;
}

/** Photo manifest from Supabase Storage; null while loading. */
export function usePhotoManifest() {
  const [manifest, setManifest] = useState<PhotoManifest | null>(cache);
  useEffect(() => {
    fetchManifest().then(setManifest);
  }, []);
  return manifest;
}
