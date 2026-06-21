"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONDITIONS = [
  {
    id: "neck",
    name: "Neck & Cervical Pain",
    subtitle: "Posture, Whiplash & Disc Issues",
    desc: "Chronic neck tension, whiplash injuries, cervical disc problems, and postural strain from desk work. Our specialists restore full range of motion and relieve nerve compression.",
    tags: ["Manual Therapy", "Dry Needling", "Postural Correction", "Deep Tissue"],
    recovery: "4–8 weeks",
    color: "#e84060",
    bg: "linear-gradient(135deg, #1a0308 0%, #3d0a18 50%, #7a1030 100%)",
    icon: (
      <svg viewBox="0 0 120 160" fill="none" className="w-full h-full">
        <ellipse cx="60" cy="28" rx="28" ry="28" fill="rgba(232,64,96,0.15)" stroke="rgba(232,64,96,0.5)" strokeWidth="1.5"/>
        <rect x="50" y="56" width="20" height="60" rx="10" fill="rgba(232,64,96,0.1)" stroke="rgba(232,64,96,0.4)" strokeWidth="1.5"/>
        <line x1="60" y1="56" x2="60" y2="116" stroke="rgba(232,64,96,0.6)" strokeWidth="2" strokeDasharray="4 4"/>
        <circle cx="60" cy="70" r="5" fill="rgba(232,64,96,0.8)"/>
        <circle cx="60" cy="86" r="5" fill="rgba(232,64,96,0.8)"/>
        <circle cx="60" cy="102" r="5" fill="rgba(232,64,96,0.8)"/>
        <path d="M40 130 Q60 160 80 130" stroke="rgba(232,64,96,0.3)" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    id: "shoulder",
    name: "Shoulder Injuries",
    subtitle: "Rotator Cuff, Impingement & Frozen Shoulder",
    desc: "Rotator cuff tears, shoulder impingement, frozen shoulder (adhesive capsulitis), and AC joint sprains. We restore strength, stability and overhead function.",
    tags: ["Joint Mobilisation", "Shockwave Therapy", "Strength Training", "Taping"],
    recovery: "6–16 weeks",
    color: "#d43f5a",
    bg: "linear-gradient(135deg, #180410 0%, #450a20 50%, #8c1535 100%)",
    icon: (
      <svg viewBox="0 0 140 140" fill="none" className="w-full h-full">
        <circle cx="70" cy="40" r="32" fill="rgba(212,63,90,0.12)" stroke="rgba(212,63,90,0.45)" strokeWidth="1.5"/>
        <path d="M30 70 Q10 90 20 110 Q30 130 50 125 Q70 120 80 100" stroke="rgba(212,63,90,0.6)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M110 70 Q130 90 120 110 Q110 130 90 125 Q70 120 80 100" stroke="rgba(212,63,90,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <circle cx="70" cy="72" r="10" fill="rgba(212,63,90,0.8)" stroke="rgba(212,63,90,0.4)" strokeWidth="1"/>
        <circle cx="30" cy="70" r="6" fill="rgba(212,63,90,0.4)"/>
        <circle cx="110" cy="70" r="6" fill="rgba(212,63,90,0.2)"/>
      </svg>
    ),
  },
  {
    id: "back",
    name: "Back & Spine Pain",
    subtitle: "Disc Herniation, Sciatica & Chronic Back Pain",
    desc: "Lower back pain, disc herniation, sciatica, spondylosis, and spinal stenosis. One of our most treated conditions — with an exceptional recovery rate using a multi-modal approach.",
    tags: ["Spinal Decompression", "Core Rehab", "McKenzie Method", "TENS"],
    recovery: "6–12 weeks",
    color: "#c93555",
    bg: "linear-gradient(135deg, #140308 0%, #3a0915 50%, #780e2d 100%)",
    icon: (
      <svg viewBox="0 0 80 200" fill="none" className="w-full h-full">
        <rect x="30" y="10" width="20" height="180" rx="10" fill="rgba(201,53,85,0.08)" stroke="rgba(201,53,85,0.3)" strokeWidth="1"/>
        {[30,50,70,90,110,130,150,170].map((y, i) => (
          <g key={i}>
            <rect x="20" y={y} width="40" height="14" rx="7" fill="rgba(201,53,85,0.15)" stroke="rgba(201,53,85,0.5)" strokeWidth="1"/>
            <line x1="8" y1={y+7} x2="20" y2={y+7} stroke="rgba(201,53,85,0.3)" strokeWidth="1"/>
            <line x1="60" y1={y+7} x2="72" y2={y+7} stroke="rgba(201,53,85,0.3)" strokeWidth="1"/>
          </g>
        ))}
        <circle cx="40" cy="110" r="8" fill="rgba(201,53,85,0.9)"/>
      </svg>
    ),
  },
  {
    id: "hip",
    name: "Hip & Pelvis",
    subtitle: "Hip Impingement, Bursitis & Groin Strain",
    desc: "Femoroacetabular impingement (FAI), hip bursitis, labral tears, groin strains, and post hip replacement rehabilitation. We restore pain-free mobility and strength.",
    tags: ["Soft Tissue Release", "Gait Retraining", "Hip Strengthening", "Hydrotherapy"],
    recovery: "8–20 weeks",
    color: "#bf2e4e",
    bg: "linear-gradient(135deg, #130208 0%, #370810 50%, #72122a 100%)",
    icon: (
      <svg viewBox="0 0 160 120" fill="none" className="w-full h-full">
        <path d="M20 20 Q80 60 140 20" stroke="rgba(191,46,78,0.4)" strokeWidth="2" fill="none"/>
        <circle cx="50" cy="70" r="28" fill="rgba(191,46,78,0.1)" stroke="rgba(191,46,78,0.5)" strokeWidth="1.5"/>
        <circle cx="110" cy="70" r="28" fill="rgba(191,46,78,0.08)" stroke="rgba(191,46,78,0.3)" strokeWidth="1.5"/>
        <circle cx="50" cy="70" r="10" fill="rgba(191,46,78,0.8)"/>
        <circle cx="110" cy="70" r="10" fill="rgba(191,46,78,0.4)"/>
        <line x1="50" y1="98" x2="50" y2="118" stroke="rgba(191,46,78,0.4)" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="110" y1="98" x2="110" y2="118" stroke="rgba(191,46,78,0.2)" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "knee",
    name: "Knee Injuries",
    subtitle: "ACL, Meniscus, Patella & Osteoarthritis",
    desc: "ACL/PCL ligament tears, meniscus injuries, patellofemoral pain, runner's knee, and knee osteoarthritis. Rapid return-to-sport protocols for athletes and active individuals.",
    tags: ["ACL Rehab Protocol", "Shockwave", "VMO Strengthening", "Bracing"],
    recovery: "8–24 weeks",
    color: "#e84060",
    bg: "linear-gradient(135deg, #1a0308 0%, #4a0d1c 50%, #921830 100%)",
    icon: (
      <svg viewBox="0 0 100 180" fill="none" className="w-full h-full">
        <rect x="30" y="10" width="40" height="60" rx="12" fill="rgba(232,64,96,0.1)" stroke="rgba(232,64,96,0.4)" strokeWidth="1.5"/>
        <ellipse cx="50" cy="90" rx="30" ry="28" fill="rgba(232,64,96,0.15)" stroke="rgba(232,64,96,0.6)" strokeWidth="2"/>
        <circle cx="50" cy="90" r="12" fill="rgba(232,64,96,0.8)"/>
        <line x1="28" y1="80" x2="50" y2="90" stroke="rgba(232,64,96,0.5)" strokeWidth="1.5"/>
        <line x1="72" y1="80" x2="50" y2="90" stroke="rgba(232,64,96,0.5)" strokeWidth="1.5"/>
        <rect x="30" y="118" width="40" height="55" rx="12" fill="rgba(232,64,96,0.08)" stroke="rgba(232,64,96,0.3)" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: "ankle",
    name: "Ankle & Foot",
    subtitle: "Sprains, Plantar Fasciitis & Achilles",
    desc: "Ankle sprains and instability, plantar fasciitis, Achilles tendinopathy, and flat foot correction. We address both acute injuries and chronic overuse conditions.",
    tags: ["Proprioception Training", "Orthotic Assessment", "Dry Needling", "Taping"],
    recovery: "4–12 weeks",
    color: "#d94a62",
    bg: "linear-gradient(135deg, #160208 0%, #400a18 50%, #821028 100%)",
    icon: (
      <svg viewBox="0 0 160 100" fill="none" className="w-full h-full">
        <rect x="20" y="10" width="30" height="70" rx="10" fill="rgba(217,74,98,0.1)" stroke="rgba(217,74,98,0.4)" strokeWidth="1.5"/>
        <path d="M50 60 Q80 55 120 70 Q140 78 150 90 L50 90 Z" fill="rgba(217,74,98,0.15)" stroke="rgba(217,74,98,0.5)" strokeWidth="1.5"/>
        <circle cx="35" cy="62" r="10" fill="rgba(217,74,98,0.8)"/>
        <line x1="50" y1="62" x2="120" y2="70" stroke="rgba(217,74,98,0.4)" strokeWidth="1.5" strokeDasharray="5 3"/>
      </svg>
    ),
  },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 400 : -400, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -400 : 400, opacity: 0 }),
};

export default function Conditions() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const c = CONDITIONS[idx];

  const go = useCallback((next: number) => {
    setDir(next > idx ? 1 : -1);
    setIdx(next);
  }, [idx]);

  const next = useCallback(() => go((idx + 1) % CONDITIONS.length), [go, idx]);
  const prev = useCallback(() => go((idx - 1 + CONDITIONS.length) % CONDITIONS.length), [go, idx]);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section id="conditions" className="py-20 relative overflow-hidden" style={{ background: "#0c0105" }}>
      {/* Red background glow that follows active condition */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,64,96,0.08) 0%, transparent 70%)` }} />

      <div className="container mx-auto px-6">
        {/* Section heading */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "#e84060" }} />
            <span className="text-[11px] tracking-[0.25em] uppercase font-body" style={{ color: "#e84060" }}>Interactive</span>
            <div className="h-px w-8" style={{ background: "#e84060" }} />
          </div>
          <h2 className="font-heading font-light text-white" style={{ fontSize: "clamp(32px,4.5vw,60px)" }}>
            Conditions We <em style={{ fontStyle: "italic", color: "#e84060" }}>Treat</em>
          </h2>
          <p className="text-white/60 font-body mt-3 text-base">Specialist-led care for the most common musculoskeletal conditions in the UAE</p>
        </div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden" style={{ background: "#130208", border: "1px solid rgba(232,64,96,0.2)", minHeight: "420px" }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={idx} custom={dir} variants={slideVariants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className="grid grid-cols-1 md:grid-cols-2">

                {/* LEFT — Visual panel */}
                <div className="relative flex items-center justify-center p-12 min-h-[280px] md:min-h-[420px]"
                  style={{ background: c.bg }}>
                  {/* Large step number watermark */}
                  <span className="absolute top-6 left-8 font-heading text-8xl font-light select-none pointer-events-none"
                    style={{ color: "rgba(255,255,255,0.04)", lineHeight: 1 }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Condition illustration */}
                  <div className="relative z-10 w-40 h-40 md:w-52 md:h-52 drop-shadow-lg">
                    {c.icon}
                  </div>

                  {/* Recovery badge */}
                  <div className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body"
                    style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(232,64,96,0.3)", color: "rgba(255,255,255,0.8)" }}>
                    <svg className="w-3.5 h-3.5" style={{ color: c.color }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 6v6l4 2"/>
                    </svg>
                    Recovery: {c.recovery}
                  </div>
                </div>

                {/* RIGHT — Info panel */}
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <div className="text-[10px] tracking-[0.2em] uppercase font-body mb-3" style={{ color: c.color }}>
                    {c.subtitle}
                  </div>
                  <h3 className="font-heading font-light text-white mb-4" style={{ fontSize: "clamp(24px,3vw,36px)", lineHeight: 1.1 }}>
                    {c.name}
                  </h3>
                  <p className="text-white/75 font-body text-sm leading-relaxed mb-7">{c.desc}</p>

                  {/* Treatment tags */}
                  <div className="mb-7">
                    <div className="text-[10px] tracking-[0.15em] uppercase text-white/35 font-body mb-3">Treatment Approach</div>
                    <div className="flex flex-wrap gap-2">
                      {c.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-body"
                          style={{ background: `${c.color}15`, color: "rgba(255,255,255,0.8)", border: `1px solid ${c.color}30` }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" })}
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full text-sm font-medium font-body self-start transition-all duration-300 hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${c.color}, #b5203f)`, color: "#fff" }}>
                    Book for {c.name.split(" ")[0]} Treatment
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation row */}
          <div className="flex items-center justify-between mt-6">
            {/* Prev / Next */}
            <div className="flex gap-3">
              <button onClick={prev}
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 hover:border-[#e84060] hover:text-white"
                style={{ border: "1px solid rgba(232,64,96,0.25)", color: "rgba(255,255,255,0.4)" }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <button onClick={next}
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 hover:border-[#e84060] hover:text-white"
                style={{ border: "1px solid rgba(232,64,96,0.25)", color: "rgba(255,255,255,0.4)" }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            {/* Condition pill tabs */}
            <div className="hidden sm:flex items-center gap-2 flex-wrap justify-end">
              {CONDITIONS.map((cond, i) => (
                <button key={cond.id} onClick={() => go(i)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-body transition-all duration-300"
                  style={{
                    background: i === idx ? "#e84060" : "rgba(232,64,96,0.08)",
                    color: i === idx ? "#fff" : "rgba(255,255,255,0.5)",
                    border: `1px solid ${i === idx ? "#e84060" : "rgba(232,64,96,0.15)"}`,
                  }}>
                  {cond.name.split(" ")[0]}
                </button>
              ))}
            </div>

            {/* Progress dots (mobile) */}
            <div className="flex sm:hidden items-center gap-2">
              {CONDITIONS.map((_, i) => (
                <button key={i} onClick={() => go(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === idx ? "20px" : "8px",
                    height: "8px",
                    background: i === idx ? "#e84060" : "rgba(232,64,96,0.25)",
                  }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
