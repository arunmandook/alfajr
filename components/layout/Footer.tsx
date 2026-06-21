import { clientConfig } from "@/config/client.config";

export default function Footer() {
  const { brand, contact, social } = clientConfig;

  return (
    <footer className="bg-dark-2 border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-heading font-semibold text-sm"
                style={{ background: "linear-gradient(135deg, #e84060, #5c0a1f)" }}>AF</div>
              <div>
                <div className="text-white font-heading text-base font-semibold">Al Fajr Rehabilitation</div>
                <div className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Ras Al Khaimah, UAE</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-body">
              Expert physiotherapy and rehabilitation. Helping patients restore movement and reclaim life in Ras Al Khaimah.
            </p>
            <div className="flex gap-3 mt-8">
              {social.map((s) => (
                <a key={s.platform} href={s.url} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300 text-xs font-body">
                  {s.platform[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white/50 text-[10px] tracking-[0.2em] uppercase mb-6 font-body">Services</h4>
            <ul className="space-y-3">
              {["Physiotherapy","Sports Rehab","Post-Surgery","Pain Management","Spine & Neck","Orthopedic"].map((s) => (
                <li key={s}><span className="text-white/35 text-sm hover:text-white/60 transition-colors cursor-pointer font-body">{s}</span></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/50 text-[10px] tracking-[0.2em] uppercase mb-6 font-body">Contact</h4>
            <ul className="space-y-4">
              <li>
                <p className="text-white/25 text-[10px] uppercase tracking-widest mb-0.5 font-body">Phone</p>
                <a href={`tel:${contact.phone}`} className="text-white/50 text-sm hover:text-white transition-colors font-body">{contact.phone}</a>
              </li>
              <li>
                <p className="text-white/25 text-[10px] uppercase tracking-widest mb-0.5 font-body">Email</p>
                <a href={`mailto:${contact.email}`} className="text-white/50 text-sm hover:text-white transition-colors font-body">{contact.email}</a>
              </li>
              <li>
                <p className="text-white/25 text-[10px] uppercase tracking-widest mb-0.5 font-body">Hours</p>
                <p className="text-white/50 text-sm font-body">Sat–Thu: 9AM – 9PM</p>
                <p className="text-white/50 text-sm font-body">Fri: 2PM – 9PM</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="gradient-divider mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-body">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy","Terms of Service"].map((l) => (
              <span key={l} className="text-white/20 text-xs hover:text-white/40 transition-colors cursor-pointer font-body">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
