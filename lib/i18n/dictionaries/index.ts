import type { Locale } from "../config";
import en, { type Dictionary } from "./en";
import ar from "./ar";

export const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}

export type { Dictionary };
