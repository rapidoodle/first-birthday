import { NextResponse, type NextRequest } from "next/server";

/**
 * Guest gate: the whole site is locked behind a passcode.
 * Set SITE_PASSCODE in your environment (Vercel → Settings → Environment
 * Variables). If SITE_PASSCODE is not set, the site is open (dev mode).
 */
export function middleware(req: NextRequest) {
  const expected = process.env.SITE_PASSCODE;
  if (!expected) return NextResponse.next();

  const cookie = req.cookies.get("fairy_gate")?.value;
  if (cookie === expected) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/gate";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  // Everything is gated except the gate itself, its API, and static assets.
  matcher: ["/((?!_next|gate|api/gate|favicon.ico|.*\\..*).*)"],
};
