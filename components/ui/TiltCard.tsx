"use client";
import { useRef, MouseEvent, ReactNode, CSSProperties } from "react";
import gsap from "gsap";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxTilt?: number;
  perspective?: number;
  glare?: boolean;
  onClick?: () => void;
}

/*
 * Psychology: 3D perspective tilt activates the brain's physical-world
 * intuition. When an object responds to pointer movement in 3D space, the
 * brain perceives it as tangible and substantial — not a flat graphic.
 * This tactile quality dramatically increases the perceived quality of the
 * brand and drives users to explore further. Used by Stripe, Vercel, and
 * Linear for their feature cards.
 */
export default function TiltCard({
  children,
  className = "",
  style,
  maxTilt = 10,
  perspective = 900,
  glare = true,
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent) => {
    if (!ref.current || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(ref.current, {
      rotationY: x * maxTilt * 2,
      rotationX: -y * maxTilt * 2,
      transformPerspective: perspective,
      ease: "power2.out",
      duration: 0.4,
    });
    if (glare && glareRef.current) {
      const glareX = (x + 0.5) * 100;
      const glareY = (y + 0.5) * 100;
      gsap.to(glareRef.current, {
        opacity: 0.12,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3), transparent 60%)`,
        duration: 0.3,
      });
    }
  };

  const handleLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
    if (glare && glareRef.current) {
      gsap.to(glareRef.current, { opacity: 0, duration: 0.4 });
    }
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      style={{ ...style, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10 opacity-0"
          style={{ borderRadius: "inherit" }}
        />
      )}
      {children}
    </div>
  );
}
