import { NextResponse } from "next/server";
import { supabaseAdmin, PHOTOS_BUCKET } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

/**
 * Public manifest of uploaded photos.
 * months: { "1": url, ... "12": url } for files at months/month-N.*
 * gallery: every file under gallery/, oldest first.
 */
export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json({ configured: false, months: {}, gallery: [] });
  }

  const bucket = supabaseAdmin.storage.from(PHOTOS_BUCKET);
  const [monthsRes, galleryRes] = await Promise.all([
    bucket.list("months", { limit: 100 }),
    bucket.list("gallery", {
      limit: 100,
      sortBy: { column: "created_at", order: "asc" },
    }),
  ]);

  const months: Record<string, string> = {};
  for (const f of monthsRes.data ?? []) {
    const m = f.name.match(/^month-(\d{1,2})\.\w+$/);
    if (!m) continue;
    const { publicUrl } = bucket.getPublicUrl(`months/${f.name}`).data;
    // updated_at as cache-buster so replaced photos show immediately
    months[m[1]] = `${publicUrl}?v=${encodeURIComponent(f.updated_at ?? "")}`;
  }

  const gallery = (galleryRes.data ?? [])
    .filter((f) => !f.name.startsWith("."))
    .map((f) => {
      const path = `gallery/${f.name}`;
      const { publicUrl } = bucket.getPublicUrl(path).data;
      return { path, url: `${publicUrl}?v=${encodeURIComponent(f.updated_at ?? "")}` };
    });

  return NextResponse.json({ configured: true, months, gallery });
}
