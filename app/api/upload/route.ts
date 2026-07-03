import { NextResponse } from "next/server";
import { supabaseAdmin, PHOTOS_BUCKET } from "@/lib/supabase-admin";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Wrong password" }, { status: 401 });
}

function checkPassword(password: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  return !!expected && typeof password === "string" && password === expected;
}

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
};

/** Upload a photo. FormData: password, slot ("month-1".."month-12" | "gallery"), file. */
export async function POST(req: Request) {
  const form = await req.formData();

  if (!checkPassword(form.get("password"))) return unauthorized();

  // Password check only (used by the admin page to "unlock")
  if (form.get("action") === "verify") return NextResponse.json({ ok: true });

  if (!supabaseAdmin) {
    return NextResponse.json(
      { ok: false, error: "Supabase is not configured on the server." },
      { status: 500 }
    );
  }

  const slot = String(form.get("slot") ?? "");
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ ok: false, error: "No file received" }, { status: 400 });
  }
  if (file.size > 15 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "File too large (max 15 MB)" }, { status: 400 });
  }

  const ext = EXT[file.type] ?? "jpg";
  const bucket = supabaseAdmin.storage.from(PHOTOS_BUCKET);
  let path: string;

  if (/^month-([1-9]|1[0-2])$/.test(slot)) {
    // Remove any previous file for this month (may have a different extension)
    const existing = await bucket.list("months", { limit: 100 });
    const stale = (existing.data ?? [])
      .filter((f) => f.name.startsWith(`${slot}.`))
      .map((f) => `months/${f.name}`);
    if (stale.length) await bucket.remove(stale);
    path = `months/${slot}.${ext}`;
  } else if (slot === "gallery") {
    const safe = file.name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 40) || "photo";
    path = `gallery/${Date.now()}-${safe}.${ext}`;
  } else {
    return NextResponse.json({ ok: false, error: "Invalid slot" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await bucket.upload(path, buffer, {
    contentType: file.type || "image/jpeg",
    upsert: true,
    cacheControl: "3600",
  });
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, path });
}

/** Delete a photo. JSON body: { password, path }. */
export async function DELETE(req: Request) {
  const { password, path } = await req.json().catch(() => ({}));
  if (!checkPassword(password)) return unauthorized();
  if (!supabaseAdmin) {
    return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });
  }
  if (typeof path !== "string" || !/^(months|gallery)\/[^/]+$/.test(path)) {
    return NextResponse.json({ ok: false, error: "Invalid path" }, { status: 400 });
  }
  const { error } = await supabaseAdmin.storage.from(PHOTOS_BUCKET).remove([path]);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
