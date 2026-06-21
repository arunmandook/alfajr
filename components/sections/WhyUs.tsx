"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const STATS = [
  { value: 3000, suffix: "+", label: "Patients Treated", sub: "Since 2018" },
  { value: 98, suffix: "%", label: "Satisfaction Rate", sub: "Verified reviews" },
  { value: 6, suffix: "+", label: "Specialists", sub: "Certified clinicians" },
  { value: 12, suffix: "min", label: "Wait Time", sub: "Avg. appointment" },
];

const PILLARS = [
  { icon: "🏥", title: "Evidence-Based Care", desc: "Every treatment protocol is grounded in peer-reviewed research and clinical best practices." },
  { icon: "🤝", title: "Personalised Approach", desc: "No generic plans. Each patient receives a customised recovery roadmap built around their goals." },
  { icon: "⚡", title: "Advanced Technology", desc: "TENS, ultrasound, dry needling, shockwave therapy — the latest modalities for faster recovery." },
  { icon: "🌍", title: "Multilingual Team", desc: "We speak Arabic, English, and Urdu — care without language barriers." },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll(".reveal"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
    );
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 relative overflow-hidden"
      style={{ background: "#130208" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(92,10,31,0.12) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-6">
        <div className="mb-20 reveal">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "#c9a96e" }} />
            <span className="text-[11px] tracking-[0.25em] uppercase font-body" style={{ color: "#c9a96e" }}>Why Choose Us</span>
          </div>
          <h2 className="font-heading font-light text-white" style={{ fontSize: "clamp(36px,5vw,64px)" }}>
            Why Patients <em style={{ fontStyle: "italic", color: "#c9a96e" }}>Trust</em> Us
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {STATS.map((s, i) => (
            <div key={i} className="reveal text-center p-8 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="stat-number mb-1">
                <AnimatedCounter end={s.value} suffix={s.suffix} />
              </div>
              <div className="text-white font-body text-sm font-medium mb-1">{s.label}</div>
              <div className="text-white/55 font-body text-xs">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, i) => (
            <div key={i} className="reveal service-card p-8">
              <div className="text-4xl mb-6">{p.icon}</div>
              <h3 className="font-heading text-white text-xl font-light mb-3">{p.title}</h3>
              <p className="text-white/70 font-body text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
