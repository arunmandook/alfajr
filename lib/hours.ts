import { clientConfig, type OpeningHour } from "@/config/client.config";

/**
 * Opening-hours helpers. Note: "open now" is computed from the visitor's local
 * clock, NOT the clinic timezone — for a marketing site this is an acceptable
 * approximation. Swap in a timezone lib if exact GST handling is required.
 */

export interface OpenStatus {
  isOpen: boolean;
  /** The hours entry matching today. */
  today: OpeningHour | undefined;
}

export function getTodayHours(now: Date = new Date()): OpeningHour | undefined {
  const day = now.getDay();
  return clientConfig.contact.openingHours.find((h) => h.day === day);
}

export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const today = getTodayHours(now);
  if (!today || !today.open || !today.close) {
    return { isOpen: false, today };
  }
  const minutes = now.getHours() * 60 + now.getMinutes();
  const [oh, om] = today.open.split(":").map(Number);
  const [ch, cm] = today.close.split(":").map(Number);
  const isOpen = minutes >= oh * 60 + om && minutes < ch * 60 + cm;
  return { isOpen, today };
}

/** Format "08:00" -> "8:00 AM" for display. */
export function formatTime(value: string | null): string | null {
  if (!value) return null;
  const [h, m] = value.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

/** Opening hours sorted so the week reads Mon→Sun (UAE convention). */
export function getWeekHours(): OpeningHour[] {
  const order = [1, 2, 3, 4, 5, 6, 0];
  return [...clientConfig.contact.openingHours].sort(
    (a, b) => order.indexOf(a.day) - order.indexOf(b.day),
  );
}
