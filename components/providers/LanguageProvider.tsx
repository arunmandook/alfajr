"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  type Locale,
  defaultLocale,
  getDirection,
  locales,
} from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";
import type { Localized } from "@/config/client.config";

interface LanguageContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  isRTL: boolean;
  /** Available locales (empty-ish when bilingual is disabled upstream). */
  available: readonly Locale[];
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  /** Resolve a { en, ar } value from config to the active locale. */
  t: (value: Localized) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "alfajr.locale";

export function LanguageProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Restore a previously chosen locale on mount (client-only).
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && locales.includes(stored)) {
      setLocaleState(stored);
    }
  }, []);

  // Keep <html lang/dir> in sync so RTL applies document-wide.
  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = getDirection(locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "en" ? "ar" : "en";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const dir = getDirection(locale);
    return {
      locale,
      dir,
      isRTL: dir === "rtl",
      available: locales,
      dict: getDictionary(locale),
      setLocale,
      toggleLocale,
      t: (val: Localized) => val[locale] ?? val.en,
    };
  }, [locale, setLocale, toggleLocale]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a <LanguageProvider>.");
  }
  return ctx;
}

/** Convenience hook for components that only need the dictionary. */
export function useTranslation() {
  const { dict, locale, t } = useLanguage();
  return { t: dict, locale, tc: t };
}
