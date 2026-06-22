"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import TiltCard from "@/components/ui/TiltCard";

const STATS = [
  { value: 3000, suffix: "+",   label: "Patients Treated", sub: "Since 2018" },
  { value: 98,   suffix: "%",   label: "Satisfaction Rate", sub: "Verified reviews" },
  { value: 6,    suffix: "+",   label: "Specialists",       sub: "Certified clinicians" },
  { value: 12,   suffix: "min", label: "Wait Time",         sub: "Avg. appointment" },
];

const PILLARS = [
  { icon: "🏥", title: "Evidence-Based Care",    desc: "Every treatment protocol is grounded in peer-reviewed research and clinical best practices." },
  { icon: "🤝", title: "Personalised Approach",  desc: "No generic plans. Each patient receives a customised recovery roadmap built around their goals." },
  { icon: "⚡", title: "Advanced Technology",    desc: "TENS, ultrasound, dry needling, shockwave therapy — the latest modalities for faster recovery." },
  { icon: "🌍", title: "Multilingual Team",       desc: "We speak Arabic, English, and Urdu — care without language barriers." },
];

export default function WhyUs() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const pillarsRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (headRef.current) {
      gsap.fromTo(headRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 84%" } }
      );
    }

    if (statsRef.current) {
      const statCards = statsRef.current.children;
      gsap.fromTo(statCards,
        { opacity: 0, y: 40, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.8, ease: "back.out(1.2)",
          scrollTrigger: { trigger: statsRef.current, start: "top 78%" } }
      );
    }

    if (pillarsRef.current) {
      const pillarCards = pillarsRef.current.children;
      gsap.fromTo(pillarCards,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: pillarsRef.current, start: "top 80%" } }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 relative overflow-hidden"
      style={{ background: "#4A0015" }}>

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(122,0,32,0.12) 0%, transparent 70%)" }} />
      <div className="absolute right-0 bottom-0 pointer-events-none"
        style={{ width: 500, height: 500,
          background: "radial-gradient(circle, rgba(196,112,128,0.04) 0%, transparent 70%)",
          filter: "blur(70px)" }} />

      <div className="container mx-auto px-6">

        {/* Header */}
        <div ref={headRef} className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "#C47080" }} />
            <span className="text-[11px] tracking-[0.25em] uppercase font-body" style={{ color: "#C47080" }}>Why Choose Us</span>
          </div>
          <h2 className="font-heading font-light text-white" style={{ fontSize: "clamp(36px,5vw,64px)" }}>
            Why Patients <em style={{ fontStyle: "italic", color: "#C47080" }}>Trust</em> Us
          </h2>
        </div>

        {/* Stats grid — card-pulse pulsing borders */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {STATS.map((s, i) => (
            <div key={i} className="card-pulse text-center p-8 rounded-2xl relative overflow-hidden group"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(232,0,26,0.1)" }}>
              {/* Hover background glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(232,0,26,0.05) 0%, transparent 70%)" }} />
              <div className="stat-number mb-1 relative z-10">
                <AnimatedCounter end={s.value} suffix={s.suffix} />
              </div>
              <div className="text-white font-body text-sm font-medium mb-1 relative z-10">{s.label}</div>
              <div className="font-body text-xs relative z-10" style={{ color: "rgba(255,255,255,0.45)" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Pillars with TiltCard */}
        <div ref={pillarsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, i) => (
            <TiltCard key={i} maxTilt={7}
              className="service-card group"
              style={{ border: "1px solid rgba(196,112,128,0.08)" }}>
              <div className="p-8">
                <div className="card-icon text-4xl mb-6">{p.icon}</div>
                <h3 className="font-heading text-white text-xl font-light mb-3">{p.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{p.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
