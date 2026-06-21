"use client";

import { mapsEmbedSrc, mapsDirectionsHref } from "@/lib/links";
import { clientConfig } from "@/config/client.config";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { MapPinIcon } from "./icons";
import { cn } from "@/lib/utils";

interface MapEmbedProps {
  className?: string;
  /** Tailwind aspect/height utility for the iframe wrapper. */
  heightClassName?: string;
  showDirections?: boolean;
}

/**
 * Google Maps embed (keyless) built from client.config.ts map.embedQuery.
 * Includes an optional "Get directions" link.
 */
export function MapEmbed({
  className,
  heightClassName = "h-72 md:h-96",
  showDirections = true,
}: MapEmbedProps) {
  const { dict, t } = useLanguage();
  const title = t(clientConfig.brand.displayName);

  return (
    <div className={cn("overflow-hidden rounded-brand border border-neutral/15", className)}>
      <iframe
        title={title}
        src={mapsEmbedSrc()}
        className={cn("w-full border-0", heightClassName)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      {showDirections && (
        <a
          href={mapsDirectionsHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-primary px-4 py-3 text-sm font-medium text-primary-fg hover:opacity-90"
        >
          <MapPinIcon width={16} height={16} />
          {dict.common.getDirections}
        </a>
      )}
    </div>
  );
}
