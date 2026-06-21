"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { clientConfig } from "@/config/client.config";
import MagneticButton from "@/components/ui/MagneticButton";

const HERO_IMAGES = [
  { src: "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&fit=crop", label: "Strength Training" },
  { src: "https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&fit=crop", label: "Flexibility & Rehab" },
  { src: "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&fit=crop", label: "Cardio Recovery" },
  { src: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&fit=crop", label: "Active Recovery" },
];

export default function Hero() {
  const [imgIdx, setImgIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
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

  /* ── Hero image carousel ─────────────────────────────────── */
  useEffect(() => {
    const t = setInterval(() => {
      setImgIdx(prev => {
        setPrevIdx(prev);
        return (prev + 1) % HERO_IMAGES.length;
      });
    }, 4000);
    return () => clearInterval(t);
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

          {/* RIGHT — hero image + floating glass cards */}
          <div className="hidden lg:block" style={{ position: "relative", minHeight: "580px" }}>

            {/* Carousel image panel */}
            <div style={{ position: "absolute", inset: 0, borderRadius: "28px", overflow: "hidden" }}>
              {/* Outgoing image fades out */}
              {prevIdx !== null && (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={`prev-${prevIdx}`}
                  src={HERO_IMAGES[prevIdx].src}
                  alt=""
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center 30%",
                    animation: "heroFadeOut 0.9s ease forwards" }}
                />
              )}
              {/* Active image fades in */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={`cur-${imgIdx}`}
                src={HERO_IMAGES[imgIdx].src}
                alt={HERO_IMAGES[imgIdx].label}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center 30%",
                  animation: "heroFadeIn 0.9s ease forwards" }}
              />
              {/* Dark vignette */}
              <div style={{ position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(8,0,3,0.55) 0%, rgba(8,0,3,0.2) 60%, rgba(8,0,3,0.45) 100%)" }} />
              {/* Red brand tint */}
              <div style={{ position: "absolute", inset: 0, background: "rgba(92,10,31,0.22)" }} />
              {/* Left fade */}
              <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "30%",
                background: "linear-gradient(to right, rgba(8,0,3,0.7) 0%, transparent 100%)" }} />
              {/* Dot indicators */}
              <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
                display: "flex", gap: 6, zIndex: 2 }}>
                {HERO_IMAGES.map((_, i) => (
                  <button key={i} onClick={() => { setPrevIdx(imgIdx); setImgIdx(i); }}
                    style={{ width: i === imgIdx ? 20 : 6, height: 6, borderRadius: 99,
                      background: i === imgIdx ? "#e84060" : "rgba(255,255,255,0.3)",
                      border: "none", cursor: "pointer", padding: 0,
                      transition: "all 0.3s ease" }} />
                ))}
              </div>
              {/* Image label */}
              <div style={{ position: "absolute", bottom: 40, right: 16,
                background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(232,64,96,0.25)", borderRadius: 99,
                padding: "4px 12px", color: "rgba(255,255,255,0.7)", fontSize: 10,
                letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {HERO_IMAGES[imgIdx].label}
              </div>
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
        @keyframes heroFadeIn {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes heroFadeOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.97); }
        }
      `}</style>
    </section>
  );
}
