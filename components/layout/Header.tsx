"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { clientConfig } from "@/config/client.config";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { BookingCTA } from "@/components/ui/BookingCTA";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

export interface NavItem {
  /** Key into dict.nav, e.g. "services". */
  key: keyof Dictionary["nav"];
  href: string;
}

const defaultNav: NavItem[] = [
  { key: "home", href: "#home" },
  { key: "services", href: "#services" },
  { key: "team", href: "#team" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
];

interface HeaderProps {
  nav?: NavItem[];
}

/**
 * Sticky site header. Logo + display name come from client.config.ts brand;
 * nav labels from the i18n dictionary; includes the EN/AR toggle and the
 * primary Book/Call CTA. Fully responsive with a mobile drawer.
 */
export function Header({ nav = defaultNav }: HeaderProps) {
  const { dict, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const { brand } = clientConfig;

  return (
    <header className="sticky top-0 z-40 border-b border-neutral/10 bg-background/90 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5" aria-label={brand.name}>
          <Image
            src={brand.logo}
            alt={brand.name}
            width={40}
            height={40}
            className="h-9 w-auto"
            priority
          />
          <span className="hidden font-heading text-lg font-bold text-secondary sm:block">
            {t(brand.displayName)}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {dict.nav[item.key]}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <BookingCTA withCall={false} size="sm" />
        </div>

        {/* Mobile trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="rounded-brand p-2 text-foreground hover:bg-primary/10"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-neutral/10 bg-background lg:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0",
        )}
      >
        <nav className="container mx-auto flex flex-col gap-1 py-3">
          {nav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-brand px-2 py-2.5 text-base font-medium text-foreground hover:bg-primary/10"
            >
              {dict.nav[item.key]}
            </Link>
          ))}
          <div className="px-2 py-3">
            <BookingCTA />
          </div>
        </nav>
      </div>
    </header>
  );
}
