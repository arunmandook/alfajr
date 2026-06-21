"use client";

import { clientConfig } from "@/config/client.config";
import { localeNames, type Locale } from "@/lib/i18n/config";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { GlobeIcon } from "./icons";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
}

/**
 * EN ⇆ AR toggle. Renders nothing unless features.enableBilingual is true.
 * For two locales it acts as a simple switch; for more it cycles. Switching
 * updates <html dir> via the LanguageProvider, flipping the whole layout to RTL.
 */
export function LanguageToggle({ className }: LanguageToggleProps) {
  const { locale, available, setLocale, toggleLocale } = useLanguage();

  if (!clientConfig.features.enableBilingual || available.length < 2) {
    return null;
  }

  // The label shows the language you'll switch TO.
  const next: Locale = locale === "en" ? "ar" : "en";

  function handleClick() {
    if (available.length === 2) {
      toggleLocale();
    } else {
      const idx = available.indexOf(locale);
      setLocale(available[(idx + 1) % available.length]);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Switch language to ${localeNames[next]}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-brand border border-current/20 px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-primary/10",
        className,
      )}
    >
      <GlobeIcon width={16} height={16} />
      <span>{localeNames[next]}</span>
    </button>
  );
}
