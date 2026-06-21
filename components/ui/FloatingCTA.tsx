"use client";
import { useState, useEffect } from "react";

export default function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToBook = () => document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-500"
      style={{ opacity: show ? 1 : 0, transform: `translateX(-50%) translateY(${show ? "0" : "20px"})`, pointerEvents: show ? "auto" : "none" }}>
      <button onClick={scrollToBook}
        className="flex items-center gap-3 px-7 py-4 rounded-full text-sm font-medium font-body text-white shadow-2xl transition-all duration-300 hover:scale-105"
        style={{ background: "linear-gradient(135deg, #e84060, #b5203f)", boxShadow: "0 20px 60px rgba(232,64,96,0.4)" }}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
        </svg>
        Book Free Consultation
      </button>
    </div>
  );
}
