"use client";

import Link from "next/link";
import Image from "next/image";
import { clientConfig } from "@/config/client.config";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { OpeningHours } from "@/components/ui/OpeningHours";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { PhoneIcon, MailIcon, MapPinIcon } from "@/components/ui/icons";
import { telHref, mailHref } from "@/lib/links";
import type { NavItem } from "./Header";

const defaultNav: NavItem[] = [
  { key: "services", href: "#services" },
  { key: "team", href: "#team" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
];

interface FooterProps {
  nav?: NavItem[];
}

/**
 * Site footer: brand blurb, quick links, contact details, live opening hours,
 * embedded map, and social icons. Everything flows from client.config.ts.
 */
export function Footer({ nav = defaultNav }: FooterProps) {
  const { dict, t } = useLanguage();
  const { brand, contact } = clientConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-fg">
      <div className="container mx-auto grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand + social */}
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src={brand.logoLight ?? brand.logo}
              alt={brand.name}
              width={40}
              height={40}
              className="h-9 w-auto"
            />
            <span className="font-heading text-lg font-bold">
              {t(brand.displayName)}
            </span>
          </div>
          <p className="mt-4 text-sm opacity-80">{t(brand.tagline)}</p>
          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold">{dict.footer.followUs}</p>
            <SocialLinks size="sm" />
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-4 font-heading font-semibold">{dict.footer.quickLinks}</h3>
          <ul className="space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="opacity-80 hover:opacity-100 hover:underline">
                  {dict.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 font-heading font-semibold">{dict.footer.contact}</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPinIcon width={18} height={18} className="mt-0.5 shrink-0 text-accent" />
              <span className="opacity-80">{t(contact.address)}</span>
            </li>
            <li>
              <a href={telHref()} className="flex items-center gap-2.5 hover:underline" dir="ltr">
                <PhoneIcon width={18} height={18} className="shrink-0 text-accent" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={mailHref()} className="flex items-center gap-2.5 hover:underline" dir="ltr">
                <MailIcon width={18} height={18} className="shrink-0 text-accent" />
                {contact.email}
              </a>
            </li>
          </ul>
          <div className="mt-6 [&_*]:text-secondary-fg">
            <OpeningHours showStatus />
          </div>
        </div>

        {/* Map */}
        <div>
          <h3 className="mb-4 font-heading font-semibold">{dict.footer.builtWith}</h3>
          <MapEmbed heightClassName="h-56" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 py-5 text-sm opacity-80 sm:flex-row">
          <p>
            © {year} {brand.name}. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
