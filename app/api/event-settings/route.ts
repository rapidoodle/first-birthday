import { NextResponse } from "next/server";
import { event } from "@/lib/config";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const DEFAULT_SETTINGS = {
  dateISO: event.dateISO.slice(0, 10),
  dateLabel: event.dateLabel,
  timeLabel: event.timeLabel,
  venueName: event.venueName,
  venueAddress: event.venueAddress,
  dressCode: event.dressCode,
};

function checkPassword(password: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  return !!expected && typeof password === "string" && password === expected;
}

function formatDateLabel(dateISO: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${dateISO}T12:00:00Z`));
}

export async function GET() {
  if (!supabaseAdmin) return NextResponse.json(DEFAULT_SETTINGS);

  const { data, error } = await supabaseAdmin
    .from("event_settings")
    .select("date_iso, date_label, time_label, venue_name, venue_address, dress_code")
    .eq("id", 1)
    .maybeSingle();

  if (error || !data) return NextResponse.json(DEFAULT_SETTINGS);

  return NextResponse.json({
    dateISO: data.date_iso,
    dateLabel: data.date_label,
    timeLabel: data.time_label,
    venueName: data.venue_name,
    venueAddress: data.venue_address,
    dressCode: data.dress_code,
  });
}

export async function PUT(req: Request) {
  const password = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => ({}));
  const fields = ["dateISO", "timeLabel", "venueName", "venueAddress", "dressCode"] as const;
  if (fields.some((field) => typeof body[field] !== "string" || !body[field].trim())) {
    return NextResponse.json({ error: "All event detail fields are required" }, { status: 400 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(body.dateISO)) {
    return NextResponse.json({ error: "Date must be a valid date" }, { status: 400 });
  }

  const payload = {
    id: 1,
    date_iso: body.dateISO,
    date_label: formatDateLabel(body.dateISO),
    time_label: body.timeLabel.trim(),
    venue_name: body.venueName.trim(),
    venue_address: body.venueAddress.trim(),
    dress_code: body.dressCode.trim(),
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabaseAdmin.from("event_settings").upsert(payload);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    dateISO: payload.date_iso,
    dateLabel: payload.date_label,
    timeLabel: payload.time_label,
    venueName: payload.venue_name,
    venueAddress: payload.venue_address,
    dressCode: payload.dress_code,
  });
}