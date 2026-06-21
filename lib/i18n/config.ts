import { clientConfig } from "@/config/client.config";

export type Locale = "en" | "ar";

export const locales = clientConfig.locale.supported;
export const defaultLocale: Locale = clientConfig.locale.default;

/** Text direction per locale. Arabic renders right-to-left. */
export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

/** Human-readable name shown in the language toggle. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return localeDirection[locale];
}

export function isRTL(locale: Locale): boolean {
  return getDirection(locale) === "rtl";
}
