"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TESTIMONIALS = [
  { name: "Ahmed Al Rashidi", role: "Sports Injury — Recovered in 8 weeks", initials: "AR", color: "#E8001A",
    rating: 5, text: "After my ACL tear, I thought my football career was over. The team at Al Fajr gave me a structured recovery plan and I was back on the field in 8 weeks. Exceptional care." },
  { name: "Fatima Al Mansoori", role: "Post-Surgery Rehab — Knee Replacement", initials: "FA", color: "#C47080",
    rating: 5, text: "The staff are incredibly professional and compassionate. My recovery after knee replacement was faster than expected. I'm now walking without pain for the first time in years." },
  { name: "Priya Sharma", role: "Chronic Back Pain — 3 months treatment", initials: "PS", color: "#5c8ae8",
    rating: 5, text: "I had suffered with back pain for 5 years and seen multiple doctors. After 3 months at Al Fajr, I'm pain-free. The manual therapy and dry needling made all the difference." },
  { name: "Khalid Al Zaabi", role: "Shoulder Dislocation — Full recovery", initials: "KZ", color: "#60b5a0",
    rating: 5, text: "Dislocated my shoulder playing cricket. The physiotherapy team here are world-class. Their sports-specific rehab protocol got me back to full strength and confidence." },
  { name: "Sarah Johnson", role: "Neck Pain — 6 weeks treatment", initials: "SJ", color: "#E8001A",
    rating: 5, text: "Working from home had destroyed my neck and shoulders. The postural correction programme and hands-on therapy completely resolved my pain. Highly recommend!" },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll(".reveal"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
    );
  }, []);

  const next = () => setCurrent((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section ref={sectionRef} className="py-32 bg-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="reveal">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#E8001A" }} />
              <span className="text-[11px] tracking-[0.25em] uppercase font-body" style={{ color: "#E8001A" }}>Patient Stories</span>
            </div>
            <h2 className="font-heading font-light text-white" style={{ fontSize: "clamp(36px,5vw,64px)" }}>
              Real <em style={{ fontStyle: "italic", color: "#E8001A" }}>Recoveries</em>
            </h2>
          </div>
          <div className="reveal flex items-center gap-4">
            <div className="flex items-center gap-1 mr-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4" fill="#C47080" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="text-white/70 text-sm font-body">4.9 · 200+ reviews</span>
          </div>
        </div>

        {/* Slider */}
        <div className="reveal relative overflow-hidden">
          <div ref={trackRef} className="flex gap-6 transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(calc(-${current * 412}px))` }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card glass rounded-2xl p-8 flex-shrink-0"
                style={{ opacity: i === current ? 1 : 0.4, transform: i === current ? "scale(1)" : "scale(0.96)" }}>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className="w-4 h-4" fill="#C47080" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-white/70 font-body text-base leading-relaxed mb-8 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-heading text-white flex-shrink-0"
                    style={{ background: `${t.color}30`, border: `1px solid ${t.color}40` }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium font-body">{t.name}</div>
                    <div className="text-white/55 text-xs font-body">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-10 reveal">
          <button onClick={prev} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className="step-dot" style={{
                background: i === current ? "#E8001A" : "rgba(255,255,255,0.15)",
                transform: i === current ? "scale(1.4)" : "scale(1)",
              }} />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
