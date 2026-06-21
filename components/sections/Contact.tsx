"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CONTACT_ITEMS = [
  { icon: "📍", label: "Location", value: "Al Fajr Rehabilitation Centre, Dubai, UAE", href: "https://maps.google.com/?q=Dubai+UAE" },
  { icon: "📞", label: "Phone", value: "+971 4 355 8821", href: "tel:+97143558821" },
  { icon: "💬", label: "WhatsApp", value: "+971 50 123 4567", href: "https://wa.me/971501234567" },
  { icon: "✉️", label: "Email", value: "info@alfajrrehab.ae", href: "mailto:info@alfajrrehab.ae" },
];

const HOURS = [
  { day: "Saturday – Thursday", time: "8:00 AM – 8:00 PM" },
  { day: "Friday", time: "2:00 PM – 8:00 PM" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll(".reveal"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
    );
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-32"
      style={{ background: "#130208" }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="reveal flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#c9a96e" }} />
              <span className="text-[11px] tracking-[0.25em] uppercase font-body" style={{ color: "#c9a96e" }}>Get In Touch</span>
            </div>
            <h2 className="reveal font-heading font-light text-white mb-4" style={{ fontSize: "clamp(32px,4vw,56px)" }}>
              Visit <em style={{ fontStyle: "italic", color: "#c9a96e" }}>Us</em>
            </h2>
            <p className="reveal text-white/70 font-body mb-10 max-w-md">
              Walk in or book ahead — we welcome same-day appointments when available.
            </p>

            <div className="space-y-5">
              {CONTACT_ITEMS.map((item, i) => (
                <a key={i} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="reveal flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.15)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-body mb-0.5">{item.label}</div>
                    <div className="text-white/70 font-body text-sm group-hover:text-white transition-colors duration-200">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Opening hours */}
            <div className="reveal mt-10 p-6 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-body mb-4">Opening Hours</div>
              {HOURS.map((h, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-white/50 font-body text-sm">{h.day}</span>
                  <span className="text-white/80 font-body text-sm">{h.time}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="reveal mt-8">
              <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium font-body transition-all duration-300 hover:scale-105"
                style={{ background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.25)", color: "#25d366" }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.847L.057 23.854a.5.5 0 00.612.612l6.033-1.47A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 01-5.073-1.386l-.364-.217-3.785.921.944-3.77-.237-.386A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right: Map embed placeholder */}
          <div className="reveal">
            <div className="rounded-3xl overflow-hidden"
              style={{ height: "480px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", position: "relative" }}>
              <iframe
                title="Al Fajr Rehabilitation Centre Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.8!2d55.2708!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDEyJzE3LjMiTiA1NcKwMTYnMTQuOSJF!5e0!3m2!1sen!2sae!4v1234567890"
                width="100%" height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.6)", opacity: 0.7 }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
