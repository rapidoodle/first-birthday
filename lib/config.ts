/**
 * ── EDIT ME ─────────────────────────────────────────────
 * All event details live here. Update once, changes appear
 * everywhere on the site.
 */
export const event = {
  childName: "Niane",
  fullName: "Niane Reign Perez",
  // Local date & time of the party (placeholder time — edit!)
  dateISO: "2026-08-23T14:00:00+08:00",
  dateLabel: "Sunday, August 23, 2026",
  timeLabel: "2:00 PM – 5:00 PM",
  venueName: "Kinder City",
  venueAddress: "Vista Mall, Sta. Rosa, Laguna",
  dressCode: "Storybook pastels — little princes & princesses welcome!",
  // Google Maps: paste your venue link, or leave as search query
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Kinder+City+Vista+Mall+Santa+Rosa+Laguna",
  // Venue coordinates for the weather widget (Santa Rosa, Laguna)
  lat: 14.3122,
  lon: 121.1114,
  // Used by the QR code & share button. Set to your deployed URL.
  siteUrl: "https://nias-sweet-one.vercel.app",
};

export const calendarUrl = (() => {
  const start = "20260823T060000Z"; // 2 PM PHT in UTC
  const end = "20260823T090000Z"; // 5 PM PHT
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "The Fairest Little One — Niane turns 1 🍎",
    dates: `${start}/${end}`,
    details:
      "Join us as we celebrate Niane's first birthday! Dress code: pastel colors.",
    location: `${event.venueName}, ${event.venueAddress}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
})();

/** Captions for the 12 monthly memory cards — edit freely. */
export const milestones = [
  "Hello, world! Our sweetest gift arrived.",
  "First real smiles — and our hearts melted.",
  "Discovering her tiny hands and big giggles.",
  "Rolling over like a little marshmallow.",
  "First taste of solid food — messy and magical.",
  "Sitting up and stealing the show.",
  "Babbling her first sweet sounds.",
  "Crawling adventures begin!",
  "Pulling up to stand — unstoppable.",
  "Waving hi and blowing kisses.",
  "First wobbly steps toward Mama & Papa.",
  "One whole year of pure magic. 🎂",
];
