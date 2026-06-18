import { ShieldCheck, Clock, Globe2, Award, Leaf, HeadphonesIcon } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, title: "ISO 9001 & 28000 Certified", desc: "Quality and supply-chain security audited annually by independent registrars." },
  { icon: Clock, title: "99.4% On-Time Delivery", desc: "Live network orchestration with proactive ETA re-projection." },
  { icon: Globe2, title: "Tier-1 Carrier Network", desc: "Direct allocations with MSC, Maersk, CMA CGM, Emirates SkyCargo." },
  { icon: Award, title: "Fully Insured Cargo", desc: "Lloyd's-underwritten coverage up to USD 50M per shipment." },
  { icon: Leaf, title: "Carbon-Aware Routing", desc: "Per-shipment CO₂ accounting with offset and SAF options." },
  { icon: HeadphonesIcon, title: "24/7 Control Tower", desc: "Always-on operations desk with one-hour incident SLA." },
];

export function Trust() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-aqua" /> Why Topmark
            </span>
            <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Trusted by operators who <span className="text-gradient-aqua">can't afford delays.</span>
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              We combine asset-heavy ground operations with a digital control
              tower — giving you the predictability of an in-house logistics
              team and the reach of a global 3PL.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {ITEMS.map((it, i) => (
              <div
                key={it.title}
                className="glass tilt-card tilt-card-hover reveal rounded-2xl p-6"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-[var(--aqua)]">
                  <it.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display text-base font-semibold text-white">{it.title}</div>
                <div className="mt-1.5 text-sm leading-relaxed text-white/65">{it.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
