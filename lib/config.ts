/**
 * ── EDIT ME ─────────────────────────────────────────────
 * All event details live here. Update once, changes appear
 * everywhere on the site.
 */
export const event = {
  childName: "Shane",
  fullName: "Shane Perez",
  age: 1,
  theme: "Dino Explorer",
  heroEyebrow: "ROAR! It’s party time!",
  heroTitle: "Shane is turning one!",
  heroSubtitle:
    "Join our little explorer for a wild first birthday adventure filled with dinosaurs, sunshine, and big family fun.",
  storyEyebrow: "A little adventure begins…",
  storyText:
    "One whole year of tiny footsteps, giant smiles, and unforgettable discoveries. Come celebrate Shane’s very first trip around the sun with us!",
  rsvpDeadline: "Please reply by October 7 so we can prepare the dinosaur den.",
  rsvpMessageLabel: "Message for Shane",
  rsvpMessagePlaceholder: "Leave a birthday roar for our little explorer… (optional)",
  heroImage: "/photos/shane_dinosaur.jpg",
  accentEmoji: "🦖",
  decorativeEmojis: ["🦕", "🌋", "🥚", "🌿", "☀️", "🦴", "✨"],
  // Local date & time of the party in Atlantic Daylight Time.
  dateISO: "2026-10-14T14:00:00-03:00",
  dateLabel: "Wednesday, October 14, 2026",
  timeLabel: "2:00 PM – 5:00 PM",
  venueName: "Our Humble Abode",
  venueAddress: "B-404 Route 176, Pennfield, NB E5H 2L6",
  dressCode: `Dino explorers — greens, oranges, and adventurous outfits welcome! 🦖🌿
Comfy clothes are encouraged for little ones ready to roam the prehistoric jungle.`,
  // Google Maps: paste your venue link, or leave as search query.
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Our+Humble+Abode%2C+B-404+Route+176%2C+Pennfield%2C+NB+E5H+2L6",
  // Venue coordinates for the weather widget (Pennfield, New Brunswick).
  lat: 45.0824,
  lon: -66.7774,
  // Used by the QR code & share button. Set to your deployed URL.
  siteUrl: "https://shanes-dino-day.vercel.app",
  // YouTube link for the "Peek at the Venue" video (any format:
  // youtube.com/watch?v=…, youtu.be/…, shorts). Leave "" to hide the video.
  venueVideoUrl: "",
};

export const calendarUrl = (() => {
  const start = "20261014T170000Z"; // 2 PM ADT in UTC
  const end = "20261014T200000Z"; // 5 PM ADT
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.childName} turns ${event.age} — ${event.theme} ${event.accentEmoji}`,
    dates: `${start}/${end}`,
    details:
      `Join us as we celebrate ${event.fullName}'s ${event.age} birthday! Theme: ${event.theme}.`,
    location: `${event.venueName}, ${event.venueAddress}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
})();

/** Captions for the 12 monthly memory cards — edit freely. */
export const milestones = [
  "Hello, world! Our sweetest gift arrived.",
  "First real smiles — and our hearts melted.",
  "Discovering his tiny hands and big giggles.",
  "Rolling over like a little marshmallow.",
  "First taste of solid food — messy and magical.",
  "Sitting up and stealing the show.",
  "Babbling his first sweet sounds.",
  "Crawling adventures begin!",
  "Pulling up to stand — unstoppable.",
  "Waving hi and blowing kisses.",
  "First wobbly steps toward Mama & Papa.",
  "One whole year of pure magic. 🎂",
];
