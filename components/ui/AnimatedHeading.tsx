"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Props {
  children: string;
  accentWords?: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  trigger?: "scroll" | "mount";
}

export default function AnimatedHeading({
  children,
  accentWords = [],
  as: Tag = "h2",
  className = "",
  delay = 0,
  trigger = "scroll",
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current) return;
    const spans = ref.current.querySelectorAll<HTMLSpanElement>(".word-inner");
    gsap.set(spans, { y: "110%", opacity: 0 });
    gsap.to(spans, {
      y: "0%",
      opacity: 1,
      duration: 0.75,
      stagger: 0.07,
      ease: "power4.out",
      delay,
      ...(trigger === "scroll"
        ? { scrollTrigger: { trigger: ref.current, start: "top 88%" } }
        : {}),
    });
  }, [delay, trigger]);

  const words = children.split(" ");

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      {words.map((word, i) => (
        <span key={i} className="word-outer">
          <span className={`word-inner${accentWords.includes(word) ? " word-accent" : ""}`}>
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
