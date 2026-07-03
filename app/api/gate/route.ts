import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { passcode } = await req.json().catch(() => ({ passcode: "" }));
  const expected = process.env.SITE_PASSCODE;

  const ok =
    !expected ||
    (typeof passcode === "string" &&
      passcode.trim().toLowerCase() === expected.trim().toLowerCase());

  if (!ok) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("fairy_gate", expected ?? "open", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 120, // 120 days — covers the party and after
    path: "/",
  });
  return res;
}
