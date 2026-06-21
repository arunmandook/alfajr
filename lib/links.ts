import { clientConfig } from "@/config/client.config";

const { contact, map } = clientConfig;

/** tel: link from the configured phone (strips spaces & punctuation). */
export function telHref(phone: string = contact.phone): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** mailto: link. */
export function mailHref(email: string = contact.email): string {
  return `mailto:${email}`;
}

/**
 * WhatsApp click-to-chat link with an optional prefilled message.
 * Number must be international, digits only (set in client.config.ts).
 */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Google Maps directions link (opens the place). */
export function mapsDirectionsHref(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    map.embedQuery,
  )}`;
}

/** Google Maps embeddable iframe src (no API key required). */
export function mapsEmbedSrc(): string {
  const q = encodeURIComponent(map.embedQuery);
  return `https://maps.google.com/maps?q=${q}&z=${map.zoom}&output=embed`;
}
