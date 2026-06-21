"use client";

import { WhatsAppIcon } from "./icons";
import { whatsappHref } from "@/lib/links";
import { useLanguage } from "@/components/providers/LanguageProvider";

/**
 * Fixed floating WhatsApp button. Sits on the trailing edge (right in LTR, left
 * in RTL automatically via logical `end` positioning). Prefilled greeting is
 * localized. Number comes from client.config.ts contact.whatsapp.
 */
export function WhatsAppFloat() {
  const { dict, locale } = useLanguage();
  const greeting =
    locale === "ar"
      ? "مرحباً، أود الاستفسار عن المواعيد."
      : "Hello, I'd like to ask about appointments.";

  return (
    <a
      href={whatsappHref(greeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.common.whatsapp}
      className="fixed bottom-5 end-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <WhatsAppIcon width={28} height={28} />
    </a>
  );
}
