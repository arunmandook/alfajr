import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionProps {
  children: ReactNode;
  id?: string;
  /** Eyebrow label shown above the title. */
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** Background tone. */
  tone?: "default" | "muted" | "primary" | "secondary";
  align?: "left" | "center";
  className?: string;
  containerClassName?: string;
}

const tones: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "bg-background text-foreground",
  muted: "bg-neutral/5 text-foreground",
  primary: "bg-primary text-primary-fg",
  secondary: "bg-secondary text-secondary-fg",
};

/**
 * Generic page section wrapper with an optional header block. Used to compose
 * pages consistently; spacing/typography are uniform across the site.
 */
export function Section({
  children,
  id,
  eyebrow,
  title,
  subtitle,
  tone = "default",
  align = "left",
  className,
  containerClassName,
}: SectionProps) {
  const onColor = tone === "primary" || tone === "secondary";
  return (
    <section id={id} className={cn("py-16 md:py-24", tones[tone], className)}>
      <div className={cn("container mx-auto", containerClassName)}>
        {(eyebrow || title || subtitle) && (
          <Reveal
            as="header"
            className={cn(
              "mb-10 md:mb-14 max-w-2xl",
              align === "center" && "mx-auto text-center",
            )}
          >
            {eyebrow && (
              <p
                className={cn(
                  "mb-3 text-xs font-medium uppercase tracking-eyebrow",
                  onColor ? "text-accent" : "text-primary",
                )}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-heading text-4xl md:text-5xl font-light leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={cn("mt-4 text-lg font-light", onColor ? "opacity-90" : "text-neutral")}>
                {subtitle}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
