"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  { step: "01", title: "Initial Assessment", duration: "Day 1", desc: "Comprehensive evaluation of your condition, movement, strength, and pain levels. We build your personalised recovery plan.", icon: "🩺" },
  { step: "02", title: "Treatment Begins", duration: "Week 1–2", desc: "Targeted hands-on therapy to reduce pain, restore mobility, and kickstart the healing process.", icon: "⚡" },
  { step: "03", title: "Active Rehabilitation", duration: "Week 2–6", desc: "Progressive exercises, functional training, and sport-specific movements tailored to your recovery goals.", icon: "💪" },
  { step: "04", title: "Strength & Stability", duration: "Week 4–10", desc: "Building the strength, balance, and endurance needed for daily life, sport, and work demands.", icon: "🏋️" },
  { step: "05", title: "Return to Activity", duration: "Week 8–16", desc: "Confidence testing, performance benchmarking, and a plan to prevent re-injury as you return to full activity.", icon: "🏃" },
  { step: "06", title: "Ongoing Support", duration: "Ongoing", desc: "Home exercise programs, progress reviews, and open access to your clinical team for continued success.", icon: "🌟" },
];

export default function RecoveryJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const totalScroll = track.scrollWidth - track.parentElement!.clientWidth;

    gsap.to(track, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalScroll}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Reveal heading
    gsap.fromTo(sectionRef.current.querySelectorAll(".reveal"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
    );
  }, []);

  return (
    <section ref={sectionRef} id="recovery" className="relative overflow-hidden"
      style={{ background: "#100106" }}>
      <div className="h-screen flex flex-col justify-center">
        {/* Heading */}
        <div className="container mx-auto px-6 mb-16 flex-shrink-0">
          <div className="reveal flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "#c9a96e" }} />
            <span className="text-[11px] tracking-[0.25em] uppercase font-body" style={{ color: "#c9a96e" }}>Your Path to Recovery</span>
          </div>
          <h2 className="reveal font-heading font-light text-white" style={{ fontSize: "clamp(32px,4vw,56px)" }}>
            The Recovery <em style={{ fontStyle: "italic", color: "#c9a96e" }}>Journey</em>
          </h2>
          <p className="reveal text-white/55 font-body text-sm mt-2">Scroll to explore →</p>
        </div>

        {/* Horizontal scroll track */}
        <div className="h-scroll-container px-6 md:px-20">
          <div ref={trackRef} className="h-scroll-track gap-6">
            {STEPS.map((s, i) => (
              <div key={i} className="timeline-item" data-step={s.step}
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-3xl mb-6">{s.icon}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase mb-2 font-body" style={{ color: "#c9a96e" }}>{s.duration}</div>
                <h3 className="font-heading text-white text-2xl font-light mb-4">{s.title}</h3>
                <p className="text-white/70 font-body text-sm leading-relaxed">{s.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="mt-8 flex items-center gap-2">
                    <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(255,255,255,0.2)" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {/* Final CTA card */}
            <div className="flex-shrink-0 w-64 flex items-center justify-center">
              <button onClick={() => document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" })}
                className="flex flex-col items-center gap-4 p-8 rounded-2xl text-center transition-all duration-300 hover:scale-105 group"
                style={{ background: "linear-gradient(135deg, rgba(232,64,96,0.15), rgba(92,10,31,0.2))", border: "1px solid rgba(232,64,96,0.25)" }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #e84060, #b5203f)" }}>
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-heading text-xl font-light mb-1">Start Your Journey</div>
                  <div className="text-white/70 font-body text-sm">Book a free consultation</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
