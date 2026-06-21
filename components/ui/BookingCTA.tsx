"use client";

import { CTAButton } from "./CTAButton";
import { CallButton } from "./CallButton";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface BookingCTAProps {
  /** Anchor or route the primary button points to. */
  href?: string;
  /** Also render a secondary call button beside it. */
  withCall?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * The primary conversion pairing used across the site: "Book Now" + "Call Now".
 * Reused in the header, hero, and section CTAs so messaging stays consistent.
 */
export function BookingCTA({
  href = "#booking",
  withCall = true,
  size = "md",
  className,
}: BookingCTAProps) {
  const { dict } = useLanguage();
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>
      <CTAButton href={href} variant="accent" size={size}>
        {dict.common.bookNow}
      </CTAButton>
      {withCall && <CallButton variant="outline" size={size} />}
    </div>
  );
}
