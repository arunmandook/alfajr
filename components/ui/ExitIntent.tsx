"use client";
import { useState, useEffect } from "react";

export default function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const handler = (e: MouseEvent) => {
      if (e.clientY < 20) setOpen(true);
    };
    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, [dismissed]);

  const close = () => { setOpen(false); setDismissed(true); };

  const submit = async () => {
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source: "exit_intent", condition: "", preferred_time: "" }),
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="exit-overlay" onClick={close}>
      <div className="relative max-w-md w-full mx-4 glass-dark rounded-3xl p-8 text-center"
        onClick={(e) => e.stopPropagation()}>
        <button onClick={close}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-white/60 transition-colors"
          style={{ background: "rgba(255,255,255,0.05)" }}>
          ×
        </button>

        {sent ? (
          <div className="py-4">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="font-heading text-white text-2xl font-light mb-2">We&apos;ll be in touch!</h3>
            <p className="text-white/40 font-body text-sm">Expect a WhatsApp message within 2 hours.</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "linear-gradient(135deg, rgba(232,64,96,0.2), rgba(232,64,96,0.1))", border: "1px solid rgba(232,64,96,0.3)" }}>
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-heading text-white text-2xl font-light mb-2">Before you go...</h3>
            <p className="text-white/50 font-body text-sm mb-6">
              Get a <strong className="text-white">free 15-minute phone consultation</strong> with one of our specialists. No obligation.
            </p>
            <div className="space-y-3 text-left mb-5">
              <input className="input-premium w-full" placeholder="Your name"
                value={name} onChange={e => setName(e.target.value)} />
              <input className="input-premium w-full" type="tel" placeholder="Your phone (+971...)"
                value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <button onClick={submit} disabled={loading || !name || !phone}
              className="w-full py-4 rounded-full text-sm font-medium font-body text-white transition-all duration-300 hover:scale-105 disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #e84060, #b5203f)" }}>
              {loading ? "Sending..." : "Get My Free Consultation →"}
            </button>
            <button onClick={close} className="mt-3 text-xs text-white/20 font-body hover:text-white/40 transition-colors">
              No thanks, I&apos;ll pass
            </button>
          </>
        )}
      </div>
    </div>
  );
}
