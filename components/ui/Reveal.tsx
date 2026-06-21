"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in ms (applied as inline transition-delay). */
  delay?: number;
  /** Element to render as. Defaults to a div. */
  as?: ElementType;
  className?: string;
  /** Re-trigger every time it scrolls into view (default: once). */
  once?: boolean;
}

/**
 * Scroll-reveal wrapper. Mirrors the source site's `.rv` pattern: content
 * starts faded + offset, then transitions in when it enters the viewport,
 * observed via IntersectionObserver. Honors prefers-reduced-motion (CSS).
 */
export function Reveal({
  children,
  delay = 0,
  as,
  className,
  once = true,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={cn("rv", visible && "vi", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
