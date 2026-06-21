"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "@/components/ui/TiltCard";

const SERVICES = [
  { icon: "🦴", title: "Orthopaedic Physiotherapy", desc: "Joints, bones, muscles, and tendons. From acute injuries to chronic conditions.", tag: "Most Popular" },
  { icon: "⚽", title: "Sports Rehabilitation",     desc: "Get athletes back to peak performance faster with sport-specific protocols.",     tag: "" },
  { icon: "🔪", title: "Post-Surgery Rehab",        desc: "Structured recovery after knee, hip, shoulder, or spinal surgery.",              tag: "" },
  { icon: "🧠", title: "Neurological Rehab",        desc: "Stroke recovery, Parkinson's, MS — improving quality of life through movement.", tag: "" },
  { icon: "👶", title: "Paediatric Physio",         desc: "Gentle, play-based therapy for children's developmental and injury needs.",       tag: "" },
  { icon: "💆", title: "Manual Therapy",            desc: "Hands-on joint mobilisation, manipulation, and soft tissue techniques.",          tag: "" },
  { icon: "⚡", title: "Dry Needling",              desc: "Trigger point therapy using fine needles to release muscle tension and pain.",    tag: "" },
  { icon: "🌊", title: "Shockwave Therapy",         desc: "Non-invasive acoustic wave treatment for stubborn tendon and tissue injuries.",   tag: "New" },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    /* Header reveal */
    if (headRef.current) {
      gsap.fromTo(headRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 82%" } }
      );
    }

    /* Cards stagger in */
    const cards = sectionRef.current.querySelectorAll(".service-reveal");
    gsap.fromTo(cards,
      { opacity: 0, y: 50, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } }
    );
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-32 relative overflow-hidden"
      style={{ background: "#0e0207" }}>

      {/* Background orb */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none"
        style={{ width: 600, height: 600,
          background: "radial-gradient(circle, rgba(232,64,96,0.04) 0%, transparent 70%)",
          filter: "blur(80px)" }} />

      <div className="container mx-auto px-6">

        {/* Header */}
        <div ref={headRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#e84060" }} />
              <span className="text-[11px] tracking-[0.25em] uppercase font-body" style={{ color: "#e84060" }}>What We Offer</span>
            </div>
            <h2 className="font-heading font-light text-white" style={{ fontSize: "clamp(36px,5vw,64px)" }}>
              Our <em style={{ fontStyle: "italic", color: "#e84060" }}>Services</em>
            </h2>
          </div>
          <button
            onClick={() => document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-shimmer btn-glow hidden md:flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium font-body"
            style={{ background: "rgba(232,64,96,0.1)", border: "1px solid rgba(232,64,96,0.3)", color: "#e84060" }}>
            Book Any Service
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <TiltCard key={i} maxTilt={8}
              className="service-reveal service-card cursor-pointer group card-pulse"
              style={{ border: "1px solid rgba(232,64,96,0.08)" }}
              onClick={() => document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" })}>
              <div className="p-7">
                {s.tag && (
                  <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-medium mb-4 font-body"
                    style={{ background: "rgba(232,64,96,0.15)", color: "#e84060", border: "1px solid rgba(232,64,96,0.25)" }}>
                    {s.tag}
                  </span>
                )}
                <div className="card-icon text-3xl mb-5">{s.icon}</div>
                <h3 className="font-heading text-white text-lg font-light mb-3">{s.title}</h3>
                <p className="text-white/70 font-body text-sm leading-relaxed mb-6">{s.desc}</p>
                <div className="flex items-center gap-2 text-sm font-body transition-colors duration-300 group-hover:text-white"
                  style={{ color: "rgba(232,64,96,0.7)" }}>
                  Learn more
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
