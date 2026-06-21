"use client";
import { useRef, MouseEvent, ReactNode, CSSProperties } from "react";
import gsap from "gsap";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

/*
 * Psychology: The magnetic pull effect makes buttons feel physically
 * responsive — as if the CTA "wants" to be clicked. This tactile metaphor
 * reduces friction and increases the perceived confidence in the action.
 * Used by Apple, Linear, and premium SaaS products for primary CTAs.
 */
export default function MagneticButton({
  children,
  className = "",
  style,
  onClick,
  strength = 0.3,
  as: Tag = "button",
  href,
  target,
  rel,
  disabled,
  type = "button",
}: Props) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const handleMove = (e: MouseEvent) => {
    if (!ref.current || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(ref.current, { x, y, duration: 0.35, ease: "power2.out" });
  };

  const handleLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  };

  const props = {
    ref,
    className: `magnetic ${className}`,
    style,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
    ...(Tag === "a" ? { href, target, rel } : { type, disabled }),
  };

  return <Tag {...(props as React.HTMLAttributes<HTMLElement> & { href?: string; target?: string; rel?: string })}>{children}</Tag>;
}
