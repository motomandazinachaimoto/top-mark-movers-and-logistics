import { useState } from "react";
import {
  Home,
  Package,
  Frame,
  Wrench,
  Truck,
  Boxes,
  Layers,
  Fuel,
  Ship,
  Plane,
  Snowflake,
  Construction,
  ArrowUpRight,
} from "lucide-react";
import { openQuote, type QuoteKind } from "@/components/site/QuoteDialog";

type Service = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  image: string;
  kind: QuoteKind;
};

const TABS: { id: string; label: string; sub: string; items: Service[] }[] = [
  {
    id: "relocations",
    label: "Relocations",
    sub: "Residential, corporate & specialty moves",
    items: [
      { icon: Home, title: "Residential & Office Moves", desc: "Full-service packing, transit and unpacking for homes and corporate HQs.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70", kind: "moving" },
      { icon: Package, title: "Custom Packaging", desc: "Engineered crating and protective materials for fragile, oversized loads.", image: "https://images.unsplash.com/photo-1530631673369-bc20fdb32288?auto=format&fit=crop&w=1200&q=70", kind: "moving" },
      { icon: Frame, title: "Fine-Art & Valuables", desc: "Climate-controlled handling for art, antiques, instruments and archives.", image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?auto=format&fit=crop&w=1200&q=70", kind: "moving" },
      { icon: Wrench, title: "Specialized Mounting", desc: "Disassembly, mounting and re-installation by trained technical crews.", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=70", kind: "office" },
    ],
  },
  {
    id: "fleet",
    label: "Fleet & Road Freight",
    sub: "FTL, LTL, petroleum & hazardous bulk",
    items: [
      { icon: Truck, title: "Trucks for Hire", desc: "On-demand vehicles from 1-ton vans to 40-ton articulated tractors.", image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=70", kind: "freight" },
      { icon: Boxes, title: "Full Truckload (FTL)", desc: "Dedicated rigs for door-to-door, sealed, single-customer movements.", image: "https://images.unsplash.com/photo-1586191582056-b5d6147053e9?auto=format&fit=crop&w=1200&q=70", kind: "freight" },
      { icon: Layers, title: "LTL Groupage", desc: "Cost-efficient industrial consolidation with daily scheduled corridors.", image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=70", kind: "freight" },
      { icon: Fuel, title: "Petroleum & HAZMAT", desc: "DOT-compliant bulk haulage with certified drivers and tracked tankers.", image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1200&q=70", kind: "freight" },
    ],
  },
  {
    id: "global",
    label: "Global Freight",
    sub: "Ocean, air & intermodal solutions",
    items: [
      { icon: Ship, title: "Ocean FCL / LCL", desc: "Direct FCL allocations and reliable LCL consolidations on major lanes.", image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1200&q=70", kind: "freight" },
      { icon: Plane, title: "Air Cargo Consolidation", desc: "Priority, deferred and charter air with global IATA partners.", image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=70", kind: "freight" },
      { icon: Snowflake, title: "Cold Chain Logistics", desc: "Temperature-validated transport for pharma, perishables and biotech.", image: "https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=1200&q=70", kind: "freight" },
      { icon: Construction, title: "Project & OOG Cargo", desc: "Out-of-gauge, breakbulk and turnkey engineering project movements.", image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=70", kind: "freight" },
    ],
  },
];

export function Services() {
  const [active, setActive] = useState(TABS[0].id);
  const current = TABS.find((t) => t.id === active)!;

  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-aqua" /> Service Hub
          </span>
          <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            One operator. <span className="text-gradient-aqua">Every modality.</span>
          </h2>
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            Switch between operations vectors to see how Topmark engineers logistics
            across road, ocean, air and white-glove moves.
          </p>
        </div>

        {/* Tab switchboard */}
        <div className="mt-12 reveal">
          <div className="glass mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-1 rounded-full p-1.5">
            {TABS.map((t) => {
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`relative rounded-full px-4 py-2.5 text-sm font-medium ease-premium transition-all duration-500 sm:px-6 sm:py-3 ${
                    isActive
                      ? "text-[#0A192F]"
                      : "text-white/75 hover:text-white"
                  }`}
                  style={{ minHeight: 48 }}
                >
                  {isActive && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-gradient-aqua shadow-glow" />
                  )}
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <div
          key={current.id}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {current.items.map((s, i) => (
            <article
              key={s.title}
              className="glass tilt-card tilt-card-hover animate-rise group relative overflow-hidden rounded-2xl p-6"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-aqua opacity-0 blur-3xl ease-premium transition-opacity duration-700 group-hover:opacity-20" />
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5 text-[var(--aqua)]">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{s.desc}</p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--aqua)] opacity-0 ease-premium transition-opacity duration-500 group-hover:opacity-100">
                Learn more <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-white/50 reveal">
          {current.sub}
        </p>
      </div>
    </section>
  );
}
