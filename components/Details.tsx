"use client";

import { useEffect, useState } from "react";
import {
  CalendarHeart,
  Clock3,
  MapPin,
  Shirt,
  CalendarPlus,
  CloudSun,
} from "lucide-react";
import { Section, SectionTitle, Reveal } from "@/components/Section";
import { Button } from "@/components/ui/button";
import VenueVideo from "@/components/VenueVideo";
import { event, calendarUrl } from "@/lib/config";

interface Weather {
  tMax: number;
  tMin: number;
  rain: number;
}

function useEventWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "far" | "error">("loading");

  useEffect(() => {
    const eventDay = event.dateISO.slice(0, 10);
    const daysAway =
      (new Date(eventDay).getTime() - Date.now()) / 86_400_000;
    if (daysAway > 15) {
      setStatus("far");
      return;
    }
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${event.lat}&longitude=${event.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&start_date=${eventDay}&end_date=${eventDay}&timezone=auto`
    )
      .then((r) => r.json())
      .then((d) => {
        setWeather({
          tMax: Math.round(d.daily.temperature_2m_max[0]),
          tMin: Math.round(d.daily.temperature_2m_min[0]),
          rain: d.daily.precipitation_probability_max[0],
        });
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, []);

  return { weather, status };
}

const CARDS = [
  {
    icon: CalendarHeart,
    emoji: "🍎",
    label: "Date",
    value: event.dateLabel,
  },
  { icon: Clock3, emoji: "🪞", label: "Time", value: event.timeLabel },
  {
    icon: MapPin,
    emoji: "🏰",
    label: "Venue",
    value: `${event.venueName} · ${event.venueAddress}`,
  },
  { icon: Shirt, emoji: "👑", label: "Dress Code", value: event.dressCode },
];

export default function Details() {
  const { weather, status } = useEventWeather();

  return (
    <Section id="details">
      <SectionTitle
        eyebrow="save the date"
        title="Birthday Details 🍎"
        subtitle="Everything you need to know before the sweetest day of the year."
      />

      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
        {CARDS.map(({ icon: Icon, emoji, label, value }, i) => (
          <Reveal key={label} delay={i * 0.1}>
            <div className="group flex h-full items-start gap-4 rounded-3xl border border-white/70 bg-white/65 p-6 shadow-snow backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-snow-blush to-snow-blue text-snow-royal shadow-snow">
                  <Icon size={24} />
                </div>
                <span className="absolute -right-2 -top-2 text-xl transition-transform duration-300 group-hover:scale-125">
                  {emoji}
                </span>
              </div>
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-wide text-snow-red-deep">
                  {label}
                </p>
                <p className="mt-1 font-semibold leading-snug text-snow-ink">
                  {value}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Weather widget */}
      <Reveal delay={0.2} className="mx-auto mt-5 max-w-4xl">
        <div className="flex items-center gap-4 rounded-3xl border border-white/70 bg-gradient-to-r from-snow-sky/60 to-snow-leaf/60 p-6 shadow-snow backdrop-blur-xl">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-snow-sky-deep shadow-snow">
            <CloudSun size={26} />
          </div>
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-snow-royal">
              Weather on the big day
            </p>
            <p className="mt-1 text-sm font-semibold text-snow-ink/85">
              {status === "loading" && "Asking the magic mirror…"}
              {status === "far" &&
                "Forecast unlocks about two weeks before the party — check back soon! ☁️"}
              {status === "error" && "The mirror is cloudy — try again later."}
              {status === "ok" &&
                weather &&
                `${weather.tMin}°–${weather.tMax}°C with a ${weather.rain}% chance of rain. 🌤️`}
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button
          variant="secondary"
          onClick={() => window.open(event.mapsUrl, "_blank")}
        >
          <MapPin size={18} /> Open in Google Maps
        </Button>
        <Button
          variant="secondary"
          onClick={() => window.open(calendarUrl, "_blank")}
        >
          <CalendarPlus size={18} /> Add to Google Calendar
        </Button>
      </Reveal>

      {/* Venue video (shows once venueVideoUrl is set in lib/config.ts) */}
      <VenueVideo />

      {/* QR code */}
      <Reveal delay={0.35} className="mx-auto mt-12 max-w-xs text-center">
        <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-snow backdrop-blur-xl">
          <p className="font-script text-xl text-snow-red-deep">scan me!</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=44578F&bgcolor=ffffff&data=${encodeURIComponent(event.siteUrl)}`}
            alt="QR code linking to this invitation"
            width={180}
            height={180}
            loading="lazy"
            className="mx-auto mt-3 rounded-2xl"
          />
          <p className="mt-3 text-xs text-snow-ink/60">
            Share this QR so guests can open the invitation instantly 💌
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
