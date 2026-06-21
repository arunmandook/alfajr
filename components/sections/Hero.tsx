"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { clientConfig } from "@/config/client.config";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const card1Ref    = useRef<HTMLDivElement>(null);
  const card2Ref    = useRef<HTMLDivElement>(null);
  const card3Ref    = useRef<HTMLDivElement>(null);
  const floatRef    = useRef<HTMLDivElement>(null);
  const { contact } = clientConfig;

  /* ── Canvas particle network ─────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let animId: number;
    let mouseX = W / 2, mouseY = H / 2;

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    const particles: P[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.4, a: Math.random() * 0.6 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        // slight mouse attraction
        const dx = mouseX - p.x, dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.vx += (dx / dist) * 0.003;
          p.vy += (dy / dist) * 0.003;
        }
        p.vx *= 0.99; p.vy *= 0.99;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,64,96,${p.a * 0.6})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(232,64,96,${0.1 * (1 - d / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    const onMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ── Mouse parallax on floating card cluster ─────────────── */
  useEffect(() => {
    if (!floatRef.current) return;
    const handleMouse = (e: MouseEvent) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 18;
      const my = (e.clientY / window.innerHeight - 0.5) * 12;
      gsap.to(floatRef.current, { x: mx, y: my, duration: 1.8, ease: "power2.out" });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  /* ── Master entrance timeline ────────────────────────────── */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Heading — words slide up from clip
    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll(".word");
      tl.fromTo(words,
        { y: 100, opacity: 0, rotationX: -30 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.1, ease: "power4.out" }
      );
    }

    // Eyebrow line
    tl.from(".hero-eyebrow-line", { scaleX: 0, duration: 0.5, ease: "power2.out" }, 0.1);
    tl.from(".hero-eyebrow-text", { opacity: 0, x: -10, duration: 0.4 }, 0.3);

    // Subtitle
    if (subRef.current) {
      tl.fromTo(subRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
    }

    // CTAs
    if (ctaRef.current) {
      const btns = ctaRef.current.querySelectorAll("button,a");
      tl.fromTo(btns,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.4)" },
        "-=0.4"
      );
    }

    // Stats — count-up feel via stagger
    if (statsRef.current) {
      const items = statsRef.current.querySelectorAll(".stat-item");
      tl.fromTo(items,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.3"
      );
    }

    // Floating cards — staggered from different offsets
    if (card1Ref.current)
      tl.fromTo(card1Ref.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.6");
    if (card2Ref.current)
      tl.fromTo(card2Ref.current, { x: 80, opacity: 0, y: 20 }, { x: 0, opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.7");
    if (card3Ref.current)
      tl.fromTo(card3Ref.current, { x: 50, opacity: 0, y: -10 }, { x: 0, opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.7");
  }, []);

  const scrollToBook = () => document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={sectionRef} id="home"
      className="relative min-h-screen flex items-center overflow-hidden scanlines"
      style={{ background: "radial-gradient(ellipse 90% 80% at 15% 50%, #200409 0%, #0c0105 65%)" }}>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.7 }} />

      {/* Animated gradient orbs — use CSS class animations */}
      <div className="orb-1 absolute pointer-events-none"
        style={{ top: "15%", right: "20%", width: 600, height: 600,
          background: "radial-gradient(circle, rgba(120,10,40,0.35) 0%, transparent 70%)", filter: "blur(70px)" }} />
      <div className="orb-2 absolute pointer-events-none"
        style={{ bottom: "20%", left: "10%", width: 400, height: 400,
          background: "radial-gradient(circle, rgba(232,64,96,0.12) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="orb-3 absolute pointer-events-none"
        style={{ top: "60%", right: "35%", width: 280, height: 280,
          background: "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — text */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="hero-eyebrow-line h-px w-10 origin-left"
                style={{ background: "#e84060" }} />
              <span className="hero-eyebrow-text text-[11px] tracking-[0.25em] uppercase font-body"
                style={{ color: "#e84060" }}>
                Ras Al Khaimah · UAE
              </span>
            </div>

            {/* Heading — words split with overflow clip */}
            <h1 ref={headingRef}
              className="font-heading font-light leading-[1.04] mb-8"
              style={{ fontSize: "clamp(52px,7vw,96px)", color: "#fff", perspective: "800px" }}>
              {[
                { text: "Restore", accent: false },
                { text: "Movement.", accent: true },
                { text: "Reclaim", accent: false },
                { text: "Life.", accent: true },
              ].map(({ text, accent }, i) => (
                <span key={i} className="word inline-block"
                  style={{ marginRight: !accent ? "0.25em" : 0, display: "inline-block" }}>
                  {accent
                    ? <em style={{ fontStyle: "italic", color: "#e84060" }}>{text}</em>
                    : text}
                  {accent && i === 1 && " "}
                  {accent && i === 1 && <br />}
                </span>
              ))}
            </h1>

            <p ref={subRef}
              className="font-body text-lg leading-relaxed mb-10 max-w-md"
              style={{ color: "rgba(255,255,255,0.65)" }}>
              Expert physiotherapy and rehabilitation in Ras Al Khaimah.
              Trusted by over 3,000 patients. Evidence-based care from specialist clinicians.
            </p>

            {/* CTAs with Magnetic + Shimmer + Glow */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <MagneticButton
                onClick={scrollToBook}
                className="btn-shimmer btn-glow btn-ripple group inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-medium text-[15px]"
                style={{ background: "linear-gradient(135deg, #e84060, #b5203f)", boxShadow: "0 8px 32px rgba(232,64,96,0.35)" }}>
                Book Free Consultation
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticButton>

              <MagneticButton
                as="a"
                href={`https://wa.me/${contact.whatsapp}?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20physiotherapy.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-medium text-[15px] transition-all duration-300 hover:border-white/25"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25d366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </MagneticButton>
            </div>

            {/* Trust stats */}
            <div ref={statsRef} className="flex items-center gap-8 mt-12">
              {[
                { val: "3,000+", label: "Patients Treated" },
                { val: "98%",    label: "Satisfaction Rate" },
                { val: "6+",     label: "Specialists" },
              ].map((s) => (
                <div key={s.label} className="stat-item">
                  <div className="font-heading text-2xl font-light text-white stat-glow">{s.val}</div>
                  <div className="text-[11px] tracking-wide font-body" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — floating glass cards */}
          <div ref={floatRef} className="hidden lg:flex flex-col gap-4 items-end">

            {/* Card 1 — progress */}
            <div ref={card1Ref} className="float-a glass rounded-2xl p-6 w-72 border-pulse-red"
              style={{ border: "1px solid rgba(232,64,96,0.15)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: "rgba(232,64,96,0.15)" }}>🏃</div>
                <div>
                  <div className="text-white text-sm font-medium font-body">Sports Rehabilitation</div>
                  <div className="text-white/70 text-xs font-body">Back to peak performance</div>
                </div>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full w-[92%]"
                  style={{ background: "linear-gradient(90deg, #e84060, #c9a96e)",
                    animation: "progress-fill 1.5s 1.5s cubic-bezier(0.4,0,0.2,1) both" }} />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-white/55 text-xs font-body">Recovery progress</span>
                <span className="text-xs font-body" style={{ color: "#e84060" }}>92%</span>
              </div>
            </div>

            {/* Card 2 — next available */}
            <div ref={card2Ref} className="float-b glass rounded-2xl p-5 w-64 mr-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/60 text-xs tracking-wide uppercase font-body">Next Available</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-body"
                  style={{ background: "rgba(232,64,96,0.15)", color: "#e84060",
                    animation: "pulse-opacity 2s ease-in-out infinite" }}>Today</span>
              </div>
              <div className="text-white font-heading text-xl font-light">2:00 PM</div>
              <div className="text-white/70 text-xs mt-1 font-body">Dr. Sarah Al-Ahmad · Physiotherapy</div>
            </div>

            {/* Card 3 — patient avatars */}
            <div ref={card3Ref} className="float-c glass rounded-2xl p-5 w-72">
              <div className="flex -space-x-2 mb-3">
                {(["#e84060","#c9a96e","#5c8ae8","#60b5e8"] as string[]).map((c, i) => (
                  <div key={i}
                    className="w-8 h-8 rounded-full border-2 border-white/10 flex items-center justify-center text-xs text-white font-body"
                    style={{ background: c, animationDelay: `${i * 0.1}s` }}>
                    {["A","K","S","M"][i]}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white/10 flex items-center justify-center text-xs text-white/50 font-body"
                  style={{ background: "rgba(255,255,255,0.05)" }}>+42</div>
              </div>
              <div className="text-white text-sm font-body">
                Patients treated <strong className="text-white">this month</strong>
              </div>
              <div className="text-white/55 text-xs mt-1 font-body">⭐ 4.9 average rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-white text-[10px] tracking-[0.3em] uppercase font-body">Scroll</span>
        <div className="w-px h-12 overflow-hidden relative">
          <div className="w-full h-full absolute"
            style={{ background: "linear-gradient(180deg, #e84060, transparent)",
              animation: "scrollDown 1.8s ease infinite" }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollDown {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes progress-fill {
          from { width: 0%; }
          to   { width: 92%; }
        }
        @keyframes pulse-opacity {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}
