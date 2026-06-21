"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { clientConfig } from "@/config/client.config";

const links = [
  { label: "About", href: "#about" },
  { label: "Conditions", href: "#conditions" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { contact } = clientConfig;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-dark py-3" : "py-6"
        }`}
        style={{ opacity: 0 }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button onClick={() => scrollTo("#home")} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #e84060, #5c0a1f)" }}>
              <span className="text-white font-heading text-sm font-semibold">AF</span>
            </div>
            <div className="text-left">
              <div className="text-white font-heading text-sm font-semibold leading-tight tracking-wide">Al Fajr</div>
              <div className="text-white/70 text-[9px] tracking-[0.2em] uppercase">Rehabilitation Centre</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.href)}
                className="text-white/60 hover:text-white text-[13px] tracking-wide transition-colors duration-200 font-body">
                {l.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer"
              className="text-[13px] text-white/50 hover:text-white transition-colors flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <button onClick={() => scrollTo("#book")}
              className="px-5 py-2.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #e84060, #b5203f)" }}>
              Book Consultation
            </button>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2">
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-4 h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0 w-6" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(8,2,10,0.97)", backdropFilter: "blur(20px)" }}>
        {links.map((l) => (
          <button key={l.label} onClick={() => scrollTo(l.href)}
            className="font-heading text-4xl text-white/70 hover:text-white transition-colors">
            {l.label}
          </button>
        ))}
        <button onClick={() => scrollTo("#book")}
          className="mt-4 px-8 py-3 rounded-full text-white font-medium"
          style={{ background: "linear-gradient(135deg, #e84060, #b5203f)" }}>
          Book Consultation
        </button>
      </div>
    </>
  );
}
