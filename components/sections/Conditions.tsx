"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CONDITIONS = [
  { id: "neck", label: "Neck Pain", x: "50%", y: "18%", color: "#e84060",
    title: "Cervical & Neck Pain",
    desc: "Neck pain from posture, whiplash, disc issues, or tension. We restore mobility and relieve pain with manual therapy, targeted exercises, and dry needling.",
    treatments: ["Manual Therapy", "Deep Tissue Massage", "Dry Needling", "Postural Correction"],
    recovery: "4–8 weeks" },
  { id: "shoulder", label: "Shoulder", x: "72%", y: "26%", color: "#c9a96e",
    title: "Shoulder Injury & Pain",
    desc: "From rotator cuff tears to frozen shoulder and dislocations. We rebuild strength and restore full range of motion.",
    treatments: ["Rotator Cuff Rehab", "Joint Mobilisation", "Ultrasound Therapy", "Strengthening"],
    recovery: "6–12 weeks" },
  { id: "back", label: "Back Pain", x: "54%", y: "42%", color: "#e84060",
    title: "Back Pain & Spine",
    desc: "Lower and upper back pain, disc herniation, sciatica, and spinal stenosis. Evidence-based treatment to get you moving pain-free.",
    treatments: ["Spinal Manipulation", "Core Stabilisation", "TENS Therapy", "McKenzie Method"],
    recovery: "6–10 weeks" },
  { id: "hip", label: "Hip Pain", x: "46%", y: "54%", color: "#c9a96e",
    title: "Hip Pain & Bursitis",
    desc: "Hip replacement rehab, bursitis, labral tears, and osteoarthritis. We restore strength, flexibility, and pain-free movement.",
    treatments: ["Hip Mobilisation", "Strengthening", "Hydrotherapy", "Gait Retraining"],
    recovery: "8–14 weeks" },
  { id: "knee", label: "Knee", x: "56%", y: "70%", color: "#e84060",
    title: "Knee Injury & Dislocation",
    desc: "ACL/PCL tears, meniscus injuries, patella tracking problems, and knee replacements. Sport-specific rehab to full return.",
    treatments: ["ACL Rehab Protocol", "Bracing Support", "Quadriceps Strengthening", "Proprioception Training"],
    recovery: "8–16 weeks" },
  { id: "ankle", label: "Ankle", x: "52%", y: "86%", color: "#c9a96e",
    title: "Ankle & Foot Pain",
    desc: "Ankle sprains, plantar fasciitis, Achilles tendinopathy, and instability. We rebuild stability for confident movement.",
    treatments: ["Balance Training", "Taping & Bracing", "Soft Tissue Therapy", "Return-to-Sport"],
    recovery: "4–8 weeks" },
];

export default function Conditions() {
  const [active, setActive] = useState(CONDITIONS[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const current = CONDITIONS.find((c) => c.id === active)!;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll(".reveal"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
    );
  }, []);

  return (
    <section ref={sectionRef} id="conditions" className="py-32 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(92,10,31,0.15) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="mb-20 reveal">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "#e84060" }} />
            <span className="text-[11px] tracking-[0.25em] uppercase font-body" style={{ color: "#e84060" }}>Interactive</span>
          </div>
          <h2 className="font-heading font-light text-white mb-4" style={{ fontSize: "clamp(36px,5vw,64px)" }}>
            Conditions We <em style={{ fontStyle: "italic", color: "#e84060" }}>Treat</em>
          </h2>
          <p className="text-white/40 font-body text-lg max-w-xl">
            Click any area of the body to explore our treatment approach for that condition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* SVG Body */}
          <div className="reveal flex justify-center">
            <div className="relative" style={{ width: 280, height: 520 }}>
              {/* Body SVG outline */}
              <svg viewBox="0 0 280 520" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full">
                {/* Head */}
                <ellipse cx="140" cy="48" rx="32" ry="38" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
                {/* Neck */}
                <rect x="126" y="84" width="28" height="22" rx="4" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
                {/* Torso */}
                <path d="M80 106 Q68 120 70 200 Q72 240 80 260 H200 Q208 240 210 200 Q212 120 200 106 Z"
                  stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
                {/* Left arm */}
                <path d="M80 110 Q55 140 52 200 Q50 220 58 240 Q64 250 72 242 Q78 220 78 180 Q80 150 86 120"
                  stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
                {/* Right arm */}
                <path d="M200 110 Q225 140 228 200 Q230 220 222 240 Q216 250 208 242 Q202 220 202 180 Q200 150 194 120"
                  stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
                {/* Left leg */}
                <path d="M80 260 Q74 320 74 370 Q73 410 78 440 Q82 460 96 462 Q108 462 110 442 Q112 410 112 370 L110 260"
                  stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
                {/* Right leg */}
                <path d="M200 260 Q206 320 206 370 Q207 410 202 440 Q198 460 184 462 Q172 462 170 442 Q168 410 168 370 L170 260"
                  stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
                {/* Spine line */}
                <line x1="140" y1="106" x2="140" y2="258" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
              </svg>

              {/* Hotspot dots */}
              {CONDITIONS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: c.x, top: c.y }}
                  aria-label={c.label}
                >
                  <div className={`relative flex items-center justify-center transition-all duration-300 ${active === c.id ? "scale-125" : "scale-100 hover:scale-110"}`}>
                    <div className="w-3 h-3 rounded-full z-10 relative" style={{ background: c.color }} />
                    {active === c.id && (
                      <div className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ background: c.color }} />
                    )}
                    <div className={`absolute w-8 h-8 rounded-full transition-all duration-300 ${active === c.id ? "opacity-30 scale-150" : "opacity-0 group-hover:opacity-20 group-hover:scale-150"}`}
                      style={{ background: c.color }} />
                  </div>
                  <span className="absolute left-1/2 -translate-x-1/2 mt-1 text-[10px] whitespace-nowrap font-body"
                    style={{ color: active === c.id ? c.color : "rgba(255,255,255,0.35)", top: "100%" }}>
                    {c.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Info panel */}
          <div key={active} className="reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-[11px] tracking-widest uppercase font-body"
              style={{ background: "rgba(232,64,96,0.1)", color: "#e84060", border: "1px solid rgba(232,64,96,0.2)" }}>
              {current.label}
            </div>
            <h3 className="font-heading font-light text-white mb-4" style={{ fontSize: "clamp(28px,3vw,42px)" }}>
              {current.title}
            </h3>
            <p className="text-white/50 font-body text-base leading-relaxed mb-8">{current.desc}</p>

            <div className="mb-8">
              <h4 className="text-white/30 text-[11px] uppercase tracking-[0.2em] mb-4 font-body">Treatment Approach</h4>
              <div className="flex flex-wrap gap-2">
                {current.treatments.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full text-sm font-body"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-10 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: "rgba(201,169,110,0.1)" }}>⏱</div>
              <div>
                <div className="text-white/30 text-[10px] uppercase tracking-widest mb-0.5 font-body">Typical Recovery</div>
                <div className="text-white font-heading text-xl font-light">{current.recovery}</div>
              </div>
            </div>

            <button onClick={() => document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-white font-medium text-sm transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #e84060, #b5203f)" }}>
              Book for {current.label}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Condition nav pills */}
        <div className="flex flex-wrap gap-3 mt-20 justify-center reveal">
          {CONDITIONS.map((c) => (
            <button key={c.id} onClick={() => setActive(c.id)}
              className="px-4 py-2 rounded-full text-sm transition-all duration-300 font-body"
              style={{
                background: active === c.id ? "rgba(232,64,96,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${active === c.id ? "rgba(232,64,96,0.4)" : "rgba(255,255,255,0.06)"}`,
                color: active === c.id ? "#e84060" : "rgba(255,255,255,0.5)",
              }}>
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
