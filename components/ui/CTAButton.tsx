import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "accent" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-fg hover:opacity-90",
  secondary: "bg-secondary text-secondary-fg hover:opacity-90",
  accent: "bg-accent text-accent-fg hover:opacity-90",
  outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-fg",
  ghost: "text-primary hover:bg-primary/10",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-base gap-2",
  lg: "px-7 py-3.5 text-lg gap-2.5",
};

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

type ButtonProps = BaseProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

type LinkProps = BaseProps & {
  href: string;
  /** External links open in a new tab. */
  external?: boolean;
};

export type CTAButtonProps = ButtonProps | LinkProps;

/**
 * Polymorphic call-to-action. Renders an <a> (internal or external) when given
 * `href`, otherwise a <button>. All brand colors flow from Tailwind tokens,
 * which are themselves seeded from client.config.ts.
 */
export function CTAButton(props: CTAButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    icon,
    className,
    fullWidth,
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center rounded-brand font-body font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const isExternal =
      props.external ?? /^(https?:|tel:|mailto:|https:\/\/wa\.me)/.test(props.href);
    if (isExternal) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
