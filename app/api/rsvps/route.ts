import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

function checkPassword(password: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  return !!expected && typeof password === "string" && password === expected;
}

export interface RsvpRecord {
  id: string;
  first_name: string;
  last_name: string;
  guests: number;
  attending: boolean;
  allergies: string | null;
  message: string | null;
  created_at: string;
}

/** Fetch all RSVPs. Requires admin password in Authorization header. */
export async function GET(req: Request) {
  const password = req.headers.get("Authorization")?.replace("Bearer ", "");
  
  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 500 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("rsvps")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ rsvps: data ?? [] });
}

/** Delete an RSVP. JSON body: { id }. */
export async function DELETE(req: Request) {
  const password = req.headers.get("Authorization")?.replace("Bearer ", "");
  
  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 500 }
    );
  }

  const { id } = await req.json().catch(() => ({}));
  
  if (!id) {
    return NextResponse.json({ error: "Missing RSVP id" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("rsvps").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
