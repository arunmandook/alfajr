"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Step = 1 | 2 | 3;

interface FormData {
  name: string;
  phone: string;
  email: string;
  condition: string;
  preferred_time: string;
  message: string;
}

const CONDITIONS = [
  "Back Pain", "Neck Pain", "Shoulder Injury", "Knee Pain",
  "Hip Pain", "Ankle/Foot", "Sports Injury", "Post-Surgery", "Neurological", "Other"
];
const TIMES = ["Morning (8am–12pm)", "Afternoon (12pm–4pm)", "Evening (4pm–8pm)", "Any time"];

export default function BookingForm() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>({ name: "", phone: "", email: "", condition: "", preferred_time: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll(".reveal"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
    );
  }, []);

  const set = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }));

  const nextStep = () => {
    if (step === 1) {
      if (!form.name.trim() || !form.phone.trim()) { setError("Name and phone are required."); return; }
      if (!/^[\d\s+\-()]{7,}$/.test(form.phone)) { setError("Enter a valid phone number."); return; }
    }
    if (step === 2 && !form.condition) { setError("Please select a condition."); return; }
    setError("");
    setStep((s) => (s < 3 ? (s + 1) as Step : s));
  };

  const submit = async () => {
    if (!form.preferred_time) { setError("Please select a preferred time."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "website" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");
      setDone(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} id="book" className="py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a030c 0%, #12060f 100%)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(232,64,96,0.06) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-14 reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#e84060" }} />
              <span className="text-[11px] tracking-[0.25em] uppercase font-body" style={{ color: "#e84060" }}>Free Consultation</span>
              <div className="h-px w-8" style={{ background: "#e84060" }} />
            </div>
            <h2 className="font-heading font-light text-white mb-3" style={{ fontSize: "clamp(32px,4vw,56px)" }}>
              Book Your <em style={{ fontStyle: "italic", color: "#e84060" }}>Consultation</em>
            </h2>
            <p className="text-white/40 font-body">No waiting lists. We&apos;ll confirm your slot within 2 hours.</p>
          </div>

          {/* Step indicators */}
          <div className="reveal flex items-center justify-center gap-4 mb-12">
            {([1, 2, 3] as Step[]).map((s) => (
              <div key={s} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-body font-medium transition-all duration-300"
                  style={{ background: step >= s ? "#e84060" : "rgba(255,255,255,0.06)", color: step >= s ? "#fff" : "rgba(255,255,255,0.3)", border: step >= s ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
                  {step > s ? "✓" : s}
                </div>
                {s < 3 && <div className="w-16 h-px transition-all duration-500" style={{ background: step > s ? "#e84060" : "rgba(255,255,255,0.08)" }} />}
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="reveal glass-dark rounded-3xl p-8 md:p-12">
            {done ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "linear-gradient(135deg, #e84060, #b5203f)" }}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-white text-2xl font-light mb-3">Request Received!</h3>
                <p className="text-white/50 font-body mb-6">We&apos;ll WhatsApp you within 2 hours to confirm your appointment.</p>
                <p className="text-white/30 font-body text-sm">Or call us now: <a href="tel:+97143558821" className="text-white/60 hover:text-white transition-colors">+971 4 355 8821</a></p>
              </div>
            ) : (
              <>
                {/* Step 1: Personal details */}
                {step === 1 && (
                  <div className="space-y-5">
                    <h3 className="font-heading text-white text-xl font-light mb-6">Your Details</h3>
                    <div>
                      <label className="block text-xs tracking-wider uppercase text-white/30 font-body mb-2">Full Name *</label>
                      <input className="input-premium w-full" placeholder="e.g. Ahmed Al Rashidi"
                        value={form.name} onChange={e => set("name", e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wider uppercase text-white/30 font-body mb-2">Phone Number *</label>
                      <input className="input-premium w-full" type="tel" placeholder="+971 50 123 4567"
                        value={form.phone} onChange={e => set("phone", e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wider uppercase text-white/30 font-body mb-2">Email Address</label>
                      <input className="input-premium w-full" type="email" placeholder="optional"
                        value={form.email} onChange={e => set("email", e.target.value)} />
                    </div>
                  </div>
                )}

                {/* Step 2: Condition */}
                {step === 2 && (
                  <div>
                    <h3 className="font-heading text-white text-xl font-light mb-6">What brings you in?</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {CONDITIONS.map((c) => (
                        <button key={c} onClick={() => set("condition", c)}
                          className="px-4 py-3 rounded-xl text-sm font-body text-left transition-all duration-200"
                          style={{
                            background: form.condition === c ? "rgba(232,64,96,0.15)" : "rgba(255,255,255,0.04)",
                            border: form.condition === c ? "1px solid rgba(232,64,96,0.5)" : "1px solid rgba(255,255,255,0.06)",
                            color: form.condition === c ? "#fff" : "rgba(255,255,255,0.5)"
                          }}>
                          {c}
                        </button>
                      ))}
                    </div>
                    <div className="mt-5">
                      <label className="block text-xs tracking-wider uppercase text-white/30 font-body mb-2">Additional notes</label>
                      <textarea className="input-premium w-full resize-none" rows={3} placeholder="Tell us more about your condition..."
                        value={form.message} onChange={e => set("message", e.target.value)} />
                    </div>
                  </div>
                )}

                {/* Step 3: Time preference */}
                {step === 3 && (
                  <div>
                    <h3 className="font-heading text-white text-xl font-light mb-6">Preferred Time</h3>
                    <div className="space-y-3">
                      {TIMES.map((t) => (
                        <button key={t} onClick={() => set("preferred_time", t)}
                          className="w-full px-5 py-4 rounded-xl text-sm font-body text-left flex items-center gap-4 transition-all duration-200"
                          style={{
                            background: form.preferred_time === t ? "rgba(232,64,96,0.12)" : "rgba(255,255,255,0.03)",
                            border: form.preferred_time === t ? "1px solid rgba(232,64,96,0.4)" : "1px solid rgba(255,255,255,0.06)",
                            color: form.preferred_time === t ? "#fff" : "rgba(255,255,255,0.5)"
                          }}>
                          <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                            style={{ border: form.preferred_time === t ? "none" : "1px solid rgba(255,255,255,0.15)", background: form.preferred_time === t ? "#e84060" : "transparent" }}>
                            {form.preferred_time === t && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {error && <p className="mt-4 text-sm font-body" style={{ color: "#e84060" }}>{error}</p>}

                <div className="flex items-center justify-between mt-8">
                  {step > 1 ? (
                    <button onClick={() => { setStep((s) => (s - 1) as Step); setError(""); }}
                      className="text-sm font-body text-white/30 hover:text-white/60 transition-colors">
                      ← Back
                    </button>
                  ) : <div />}

                  {step < 3 ? (
                    <button onClick={nextStep}
                      className="flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium font-body text-white transition-all duration-300 hover:scale-105"
                      style={{ background: "linear-gradient(135deg, #e84060, #b5203f)" }}>
                      Continue →
                    </button>
                  ) : (
                    <button onClick={submit} disabled={loading}
                      className="flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium font-body text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: "linear-gradient(135deg, #e84060, #b5203f)" }}>
                      {loading ? "Submitting..." : "Book Free Consultation"}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Trust line */}
          <div className="reveal flex items-center justify-center gap-8 mt-8 text-white/20 text-xs font-body">
            <span>🔒 Private & confidential</span>
            <span>·</span>
            <span>No obligation</span>
            <span>·</span>
            <span>Reply within 2 hours</span>
          </div>
        </div>
      </div>
    </section>
  );
}
