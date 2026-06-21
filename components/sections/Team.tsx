"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TEAM = [
  { name: "Dr. Sarah Al-Ahmad", title: "Lead Physiotherapist", spec: "Orthopaedic & Sports", initials: "SA", color: "#e84060", exp: "12 years", langs: ["EN","AR"] },
  { name: "Dr. Khalid Hassan", title: "Rehabilitation Specialist", spec: "Neurological & Post-Surgery", initials: "KH", color: "#c9a96e", exp: "9 years", langs: ["EN","AR","UR"] },
  { name: "Dr. Priya Nair", title: "Sports Physiotherapist", spec: "Sports Injury & Performance", initials: "PN", color: "#5c8ae8", exp: "7 years", langs: ["EN","UR"] },
  { name: "Dr. Omar Al-Rashidi", title: "Manual Therapy Specialist", spec: "Spine & Chronic Pain", initials: "OR", color: "#60b5a0", exp: "11 years", langs: ["EN","AR"] },
];

export default function Team() {
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
    <section ref={sectionRef} id="team" className="py-32"
      style={{ background: "#130208" }}>
      <div className="container mx-auto px-6">
        <div className="mb-16 reveal">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "#c9a96e" }} />
            <span className="text-[11px] tracking-[0.25em] uppercase font-body" style={{ color: "#c9a96e" }}>Our Specialists</span>
          </div>
          <h2 className="font-heading font-light text-white" style={{ fontSize: "clamp(36px,5vw,64px)" }}>
            Meet the <em style={{ fontStyle: "italic", color: "#c9a96e" }}>Team</em>
          </h2>
          <p className="text-white/70 font-body text-lg max-w-xl mt-4">
            Board-certified physiotherapists with international training and deep expertise in rehabilitation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((m, i) => (
            <div key={i} className="reveal team-card p-8 group cursor-pointer">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-heading font-light text-white mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `linear-gradient(135deg, ${m.color}40, ${m.color}20)`, border: `1px solid ${m.color}40` }}>
                {m.initials}
              </div>

              <div className="text-[10px] tracking-[0.2em] uppercase mb-2 font-body" style={{ color: m.color }}>
                {m.spec}
              </div>
              <h3 className="font-heading text-white text-xl font-light mb-1">{m.name}</h3>
              <p className="text-white/70 font-body text-sm mb-6">{m.title}</p>

              <div className="flex items-center justify-between text-xs">
                <div>
                  <div className="text-white/50 font-body mb-0.5">Experience</div>
                  <div className="text-white/60 font-body">{m.exp}</div>
                </div>
                <div className="flex gap-1">
                  {m.langs.map((l) => (
                    <span key={l} className="px-1.5 py-0.5 rounded text-[10px] font-body"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5">
                <button className="text-sm font-body transition-colors duration-200" style={{ color: `${m.color}80` }}
                  onClick={() => document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" })}>
                  Book with Dr. {m.name.split(" ")[1]} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
