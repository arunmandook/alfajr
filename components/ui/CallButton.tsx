"use client";

import { CTAButton } from "./CTAButton";
import { PhoneIcon } from "./icons";
import { telHref } from "@/lib/links";
import { clientConfig } from "@/config/client.config";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface CallButtonProps {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Show the phone number instead of the "Call Now" label. */
  showNumber?: boolean;
  className?: string;
  fullWidth?: boolean;
}

/** Tap-to-call button. Number comes from client.config.ts contact.phone. */
export function CallButton({
  variant = "outline",
  size = "md",
  showNumber = false,
  className,
  fullWidth,
}: CallButtonProps) {
  const { dict } = useLanguage();
  return (
    <CTAButton
      href={telHref()}
      variant={variant}
      size={size}
      className={className}
      fullWidth={fullWidth}
      icon={<PhoneIcon />}
    >
      {showNumber ? clientConfig.contact.phone : dict.common.callNow}
    </CTAButton>
  );
}
