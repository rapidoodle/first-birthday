# 🍭 Niane's Sweet One — 1st Birthday Invitation

A storybook Snow White one-page invitation site for Niane Reign Perez's first birthday (August 23, 2026), built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, React Hook Form + Zod, and a Supabase-ready backend.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Customize (5 minutes)

Everything editable lives in **`lib/config.ts`**: party time, venue, address, dress code, Google Maps link, venue coordinates (for the weather widget), your deployed site URL (for the QR code), and the 12 monthly milestone captions.

**Photos** — drop files into `public/photos/`:
`month-1.jpg` … `month-12.jpg` (Monthly Memories) and `gallery-1.jpg` … `gallery-9.jpg` (Gallery). Placeholders show until photos exist.

**Music** — add a soft royalty-free instrumental at `public/audio/lullaby.mp3` (try pixabay.com/music). The toggle button is bottom-right.

## One-time Supabase setup (RSVP, guestbook, photo uploads)

Without setup, forms run in demo mode and photos fall back to `public/photos/`.

1. Create a free project at https://supabase.com
2. SQL Editor → run the contents of `supabase/schema.sql` (RSVP + guestbook tables)
3. Storage → **New bucket** → name it `photos` → toggle **Public bucket ON** → Save
4. Settings → API: copy the Project URL, `anon` key, and `service_role` key
5. Fill them into `.env.local` (copy from `.env.local.example`) for local dev, and into Vercel → Project → Settings → Environment Variables for production, then redeploy

RSVPs appear in the `rsvps` table, wishes in `wishes`, photos in the `photos` bucket.

## Photo uploads (no git needed)

Open `your-site.vercel.app/admin` (not linked anywhere), enter the `ADMIN_PASSWORD`, and upload from any phone: tap a month slot (1–12) or "Add photos" for the gallery. Images are resized in the browser and appear on the site instantly. The gallery shows however many photos you upload; months replace their slot.

## Privacy

Set `SITE_PASSCODE` to lock the whole site behind a cute "magic word" screen — print the word on the invitations. Guests enter it once; a cookie remembers them for 120 days. The site also sends `noindex`, so search engines won't list it. If either env var is unset, that protection is simply off (handy for local dev).

## Deploy

Easiest: push to GitHub and import at https://vercel.com (add the two env vars in Project Settings). After deploying, set `siteUrl` in `lib/config.ts` to your live URL so the QR code and share button point to the real site.

## Features

Full-screen hero with live countdown, glowing lantern arch and drifting storybook sprites with parallax, 12-month memory timeline with lightbox, snow detail cards with Google Maps / Add-to-Calendar / Share buttons, event-day weather widget (Open-Meteo, unlocks ~2 weeks before), QR code, validated RSVP form with confetti, masonry gallery with lazy loading, gift note, guestbook, background-music toggle, cursor sparkles, first-visit confetti, and a swinging enchanted-apple loading screen.
# first-birthday
# first-birthday
