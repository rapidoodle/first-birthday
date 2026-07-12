/**
 * ── EDIT ME ─────────────────────────────────────────────
 * All event details live here. Update once, changes appear
 * everywhere on the site.
 */
export const event = {
  childName: "Niane",
  fullName: "Niane Reign Perez",
  // Local date & time of the party (placeholder time — edit!)
  dateISO: "2026-08-23T15:00:00+08:00",
  dateLabel: "Sunday, August 23, 2026",
  timeLabel: "3:00 PM – 6:00 PM",
  venueName: "The Sweet Garden Events Hall", // placeholder
  venueAddress: "123 Enchanted Forest Lane, Quezon City", // placeholder
  dressCode: "Storybook pastels — little princes & princesses welcome!",
  // Google Maps: paste your venue link, or leave as search query
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=The+Sweet+Garden+Events+Hall",
  // Venue coordinates for the weather widget (placeholder: Quezon City)
  lat: 14.676,
  lon: 121.0437,
  // Used by the QR code & share button. Set to your deployed URL.
  siteUrl: "https://nias-sweet-one.vercel.app",
};

export const calendarUrl = (() => {
  const start = "20260823T070000Z"; // 3 PM PHT in UTC
  const end = "20260823T100000Z";
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
