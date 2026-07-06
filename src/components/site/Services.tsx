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
import { useHeicImage } from "@/lib/optimizeImageUrl";

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
      { icon: Home, title: "Residential & Office Moves",
        desc: "Full-service packing, transit and unpacking for homes and corporate HQs.", 
        image: "https://res.cloudinary.com/dun0ibkj0/image/upload/v1781871710/IMG_7558-1_amdb1w.jpg",
        kind: "moving" },

      { icon: Package, title: "Custom Packaging", 
        desc: "Engineered crating and protective materials for fragile, oversized loads.", 
        image: "https://res.cloudinary.com/dun0ibkj0/image/upload/v1783170080/IMG_1641_euhwls_kaosjf.png", 
        kind: "moving" },
      { icon: Frame,
        title: "Fine-Art & Valuables", 
        desc: "Climate-controlled handling for art, antiques, instruments and archives.",
         image: "https://res.cloudinary.com/dun0ibkj0/image/upload/v1783168334/IMG_7717_czaptk.heic",
          kind: "moving" },
      { icon: Wrench, title: "Specialized Mounting", desc: "Disassembly, mounting and re-installation by trained technical crews.", image: "https://res.cloudinary.com/dun0ibkj0/image/upload/v1781871710/IMG_7558-1_amdb1w.jpg", kind: "office" },
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

function ServiceCard({ service: s, index: i }: { service: Service; index: number }) {
  const { imageSrc, isLoading } = useHeicImage(s.image);

  return (
    <article
      className="glass tilt-card tilt-card-hover animate-rise group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl text-left"
      style={{ animationDelay: `${i * 90}ms` }}
      onClick={() => openQuote({ kind: s.kind })}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openQuote({ kind: s.kind });
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Get a quote for ${s.title}`}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={s.title}
          loading="lazy"
          style={{ opacity: isLoading ? 0.6 : 1 }}
          className="h-full w-full object-cover ease-premium transition-all duration-[1400ms] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent" />
        <div className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-[rgba(10,25,47,0.65)] text-[var(--aqua)] backdrop-blur-md">
          <s.icon className="h-5 w-5" />
        </div>
      </div>
      <div className="relative flex flex-1 flex-col p-6">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-aqua opacity-0 blur-3xl ease-premium transition-opacity duration-700 group-hover:opacity-20" />
        <h3 className="font-display text-lg font-semibold text-[#0A192F]">
          {s.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#0A192F]/70">{s.desc}</p>
        <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--aqua)] ease-premium transition-all duration-500 group-hover:gap-2.5">
          Get a quote <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </article>
  );
}

export function Services() {
  const [active, setActive] = useState(TABS[0].id);
  const current = TABS.find((t) => t.id === active)!;

  return (
    <section id="services" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0A192F]/10 bg-[#0A192F]/5 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-[#0A192F]/80">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-aqua" /> Service Hub
          </span>
          <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-[#0A192F] sm:text-5xl">
            One operator. <span className="text-gradient-aqua">Every modality.</span>
          </h2>
          <p className="mt-4 text-base text-[#0A192F]/70 sm:text-lg">
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
                      : "text-[#0A192F]/75 hover:text-[#0A192F]"
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
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-[#0A192F]/60 reveal">
          {current.sub}
        </p>
      </div>
    </section>
  );
}
