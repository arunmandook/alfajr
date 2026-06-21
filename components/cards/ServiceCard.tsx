"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Localized } from "@/config/client.config";
import { cn } from "@/lib/utils";

export interface Service {
  id: string;
  title: Localized;
  description: Localized;
  /** Optional icon node (e.g. an SVG) or emoji. */
  icon?: ReactNode;
  href?: string;
}

interface ServiceCardProps {
  service: Service;
  className?: string;
}

/**
 * A single service/treatment card. Content is localized via the { en, ar }
 * Localized shape, resolved through the language context.
 */
export function ServiceCard({ service, className }: ServiceCardProps) {
  const { t, dict } = useLanguage();

  const inner = (
    <article
      className={cn(
        "group flex h-full flex-col rounded-brand border border-neutral/15 bg-background p-6 transition-shadow hover:shadow-lg",
        className,
      )}
    >
      {service.icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-brand bg-primary/10 text-2xl text-primary">
          {service.icon}
        </div>
      )}
      <h3 className="font-heading text-xl font-semibold text-foreground">
        {t(service.title)}
      </h3>
      <p className="mt-2 flex-1 text-neutral">{t(service.description)}</p>
      {service.href && (
        <span className="mt-4 text-sm font-semibold text-primary group-hover:underline">
          {dict.common.learnMore} →
        </span>
      )}
    </article>
  );

  return service.href ? (
    <Link href={service.href} className="block h-full">
      {inner}
    </Link>
  ) : (
    inner
  );
}
