"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface HeroProps {
  title: string;
  subtitle?: string;
  /** Optional eyebrow/badge; falls back to the dictionary hero badge. */
  badge?: string;
  /** Background image path (under /public) or remote URL. */
  image?: string;
  imageAlt?: string;
  /** Call-to-action slot — typically <BookingCTA /> or <CTAButton/>s. */
  actions?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

/**
 * Marketing hero. Brand badge text comes from the i18n dictionary; all colors
 * from theme tokens. Pass content as props so pages stay declarative.
 */
export function Hero({
  title,
  subtitle,
  badge,
  image,
  imageAlt = "",
  actions,
  align = "left",
  className,
}: HeroProps) {
  const { dict } = useLanguage();
  const eyebrow = badge ?? dict.hero.badge;

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-secondary text-secondary-fg",
        className,
      )}
    >
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/70 to-secondary" />
        </div>
      )}

      <div className="container relative mx-auto py-20 md:py-32">
        <div
          className={cn(
            "max-w-2xl",
            align === "center" && "mx-auto text-center",
          )}
        >
          {eyebrow && (
            <span className="inline-flex animate-fade-up items-center rounded-brand border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-eyebrow text-accent [animation-delay:.3s]">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-6 animate-fade-up font-heading text-5xl font-light leading-[1.1] md:text-7xl [animation-delay:.5s]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-xl animate-fade-up text-lg font-light opacity-90 md:text-xl [animation-delay:.7s]">
              {subtitle}
            </p>
          )}
          {actions && (
            <div
              className={cn(
                "mt-9 flex animate-fade-up flex-wrap gap-4 [animation-delay:.9s]",
                align === "center" && "justify-center",
              )}
            >
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
