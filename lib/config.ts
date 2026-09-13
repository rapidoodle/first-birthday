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
  rsvpDeadline: "Please reply by August 16 so we can prepare the dinosaur den.",
  rsvpMessageLabel: "Message for Shane",
  rsvpMessagePlaceholder: "Leave a birthday roar for our little explorer… (optional)",
  heroImage: "/photos/shane_dinosaur.jpg",
  accentEmoji: "🦖",
  decorativeEmojis: ["🦕", "🌋", "🥚", "🌿", "☀️", "🦴", "✨"],
  // Local date & time of the party (placeholder time — edit!)
  dateISO: "2026-08-23T14:00:00+08:00",
  dateLabel: "Sunday, August 23, 2026",
  timeLabel: "2:00 PM – 5:00 PM",
  venueName: "Kinder City",
  venueAddress: "Vista Mall, Sta. Rosa, Laguna",
  dressCode: `Dino explorers — greens, oranges, and adventurous outfits welcome! 🦖🌿
Comfy clothes are encouraged for little ones ready to roam the prehistoric jungle.`,
  // Google Maps: paste your venue link, or leave as search query
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Kinder+City+Vista+Mall+Santa+Rosa+Laguna",
  // Venue coordinates for the weather widget (Santa Rosa, Laguna)
  lat: 14.3122,
  lon: 121.1114,
  // Used by the QR code & share button. Set to your deployed URL.
  siteUrl: "https://shanes-dino-day.vercel.app",
  // YouTube link for the "Peek at the Venue" video (any format:
  // youtube.com/watch?v=…, youtu.be/…, shorts). Leave "" to hide the video.
  venueVideoUrl: "",
};

export const calendarUrl = (() => {
  const start = "20260823T060000Z"; // 2 PM PHT in UTC
  const end = "20260823T090000Z"; // 5 PM PHT
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
