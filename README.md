# 🍭 Niane's Sweet One — 1st Birthday Invitation

A pastel fairy-garden one-page invitation site for Niane Reign Perez's first birthday (August 23, 2026), built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, React Hook Form + Zod, and a Supabase-ready backend.

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

## Enable live RSVP + Guestbook (Supabase)

Without setup, forms run in demo mode (they succeed but nothing is saved).

1. Create a free project at https://supabase.com
2. In the dashboard, open SQL Editor and run the contents of `supabase/schema.sql`
3. Copy `.env.local.example` to `.env.local` and paste your Project URL and anon key (Settings → API)
4. Restart the dev server. RSVPs appear in the `rsvps` table, wishes in `wishes`.

## Deploy

Easiest: push to GitHub and import at https://vercel.com (add the two env vars in Project Settings). After deploying, set `siteUrl` in `lib/config.ts` to your live URL so the QR code and share button point to the real site.

## Features

Full-screen hero with live countdown, glowing fairy-light arch and drifting fairy dust with parallax, 12-month memory timeline with lightbox, fairy detail cards with Google Maps / Add-to-Calendar / Share buttons, event-day weather widget (Open-Meteo, unlocks ~2 weeks before), QR code, validated RSVP form with confetti, masonry gallery with lazy loading, gift note, guestbook, background-music toggle, cursor sparkles, first-visit confetti, and a spinning fairy-wand loading screen.
# first-birthday
