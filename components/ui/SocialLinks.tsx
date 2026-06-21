import { clientConfig } from "@/config/client.config";
import { SocialIcon } from "./icons";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  /** Visual size of each icon button. */
  size?: "sm" | "md";
  className?: string;
  variant?: "solid" | "ghost";
}

/** Renders the social icons configured in client.config.ts social[]. */
export function SocialLinks({
  size = "md",
  className,
  variant = "ghost",
}: SocialLinksProps) {
  const links = clientConfig.social;
  if (links.length === 0) return null;

  const box = size === "sm" ? "h-9 w-9" : "h-10 w-10";

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link) => (
        <li key={link.platform}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={cn(
              "flex items-center justify-center rounded-brand transition-colors",
              box,
              variant === "solid"
                ? "bg-primary text-primary-fg hover:opacity-90"
                : "border border-current/20 text-current hover:bg-primary hover:text-primary-fg hover:border-primary",
            )}
          >
            <SocialIcon platform={link.platform} />
          </a>
        </li>
      ))}
    </ul>
  );
}
