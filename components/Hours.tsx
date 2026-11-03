"use client";

import { useEffect, useState } from "react";
import { hours, timeZone, type Slot } from "@/lib/salon";
import { useI18n } from "@/components/Language";

const order = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
type Day = (typeof order)[number];

const toMin = (value: string) => {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
};

/** Jour et minute actuels à Marbella, quel que soit le fuseau du visiteur. */
function nowInSalon(): { day: Day; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const day = get("weekday").toLowerCase().slice(0, 3) as Day;
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

function format(slot: Slot, lang: string) {
  const show = (value: string) => (lang === "en" ? value : value.replace(":", "h"));
  return `${show(slot[0])} – ${show(slot[1])}`;
}

export function Hours() {
  const { t, lang } = useI18n();
  const [now, setNow] = useState<{ day: Day; minutes: number } | null>(null);

  useEffect(() => {
    const tick = () => setNow(nowInSalon());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  let status: { open: boolean; label: string } | null = null;
  if (now) {
    const today = hours[now.day];
    const current = today.find(([a, b]) => now.minutes >= toMin(a) && now.minutes < toMin(b));
    if (current) {
      status = { open: true, label: `${t.hours.openNow} · ${t.hours.until} ${format(current, lang).split(" – ")[1]}` };
    } else {
      const later = today.find(([a]) => toMin(a) > now.minutes);
      status = {
        open: false,
        label: later ? `${t.hours.closedNow} · ${t.hours.opensAt} ${format(later, lang).split(" – ")[0]}` : t.hours.closedNow,
      };
    }
  }

  return (
    <div className="hours">
      <p className={`hours-status${status ? (status.open ? " is-open" : " is-closed") : ""}`} aria-live="polite">
        <i aria-hidden="true" />
        {status ? status.label : t.hours.title}
      </p>
      <ul className="hours-list">
        {order.map((day) => {
          const slots = hours[day];
          const isToday = now?.day === day;
          return (
            <li key={day} className={`${isToday ? "is-today" : ""}${slots.length ? "" : " is-closed"}`}>
              <span className="hours-day">
                {t.hours.days[day]}
                {isToday ? <em>{t.hours.today}</em> : null}
              </span>
              <span className="hours-time">
                {slots.length ? slots.map((slot) => <span key={slot[0]}>{format(slot, lang)}</span>) : t.hours.closed}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
