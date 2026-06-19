import { createFileRoute, Link } from "@tanstack/react-router";
import { openQuote } from "@/components/site/QuoteDialog";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import heroFleet from "@/assets/hero-fleet.jpg";
import {
  Truck,
  PackageCheck,
  ShieldCheck,
  MapPin,
  Clock,
  Check,
  Box,
  Container,
} from "lucide-react";

export const Route = createFileRoute("/freight/truck-hire")({
  head: () => ({
    meta: [
      { title: "Truck Hire Services in Kenya — Topmark Movers and Logistics" },
      {
        name: "description",
        content:
          "Hire small, medium and large trucks in Kenya. 1.5T canters to 14T heavy-duty haulers — same-day dispatch, GPS tracking, certified drivers and full moving services available.",
      },
      { property: "og:title", content: "Truck Hire Services — Topmark" },
      {
        property: "og:description",
        content:
          "Compact 1.5T canters, mid-size 5–7T transport, and 10–14T heavy-duty haulers — with packing, loading and East-Africa-wide coverage.",
      },
    ],
  }),
  component: TruckHirePage,
});

const FLEET = [
  {
    tag: "Small Trucks",
    title: "Compact Utility Trucks",
    blurb:
      "Perfect for small moves, local deliveries and light cargo runs within Nairobi and surrounding towns.",
    icon: Truck,
    bullets: [
      "1.5T – 3T payload",
      "Ideal for studio/1-bedroom moves",
      "Same-day dispatch available",
    ],
  },
  {
    tag: "Medium Trucks",
    title: "Mid-Size Transport",
    blurb:
      "Ideal for medium-sized homes or offices. The workhorse for most residential and SME relocations.",
    icon: Box,
    bullets: [
      "5T – 7T payload",
      "Fits 2–3 bedroom contents",
      "GPS tracking included",
    ],
  },
  {
    tag: "Large Trucks",
    title: "Heavy-Duty Haulers",
    blurb:
      "Suitable for large moves or long-distance transportation across Kenya and East Africa.",
    icon: Container,
    bullets: [
      "10T – 14T payload",
      "Full house + vehicle transport",
      "Long-haul certified drivers",
    ],
  },
];

const EXTRAS = [
  { icon: PackageCheck, label: "Professional packing materials" },
  { icon: Truck, label: "Careful loading & unloading" },
  { icon: ShieldCheck, label: "Secure transport" },
  { icon: MapPin, label: "Unpacking at destination" },
];

function TruckHirePage() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="relative min-h-screen overflow-x-clip bg-background text-foreground"
    >
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-96 max-w-5xl bg-gradient-aqua opacity-[0.10] blur-[140px]" />
          <div className="bg-grid absolute inset-0 -z-10 opacity-30" />
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white/80 animate-rise">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-aqua" />
              Truck Hire Services
            </span>
            <h1
              className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl animate-rise"
              style={{ animationDelay: "120ms" }}
            >
              Welcome to our{" "}
              <span className="text-gradient-aqua">Truck Hire Services</span>
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg animate-rise"
              style={{ animationDelay: "240ms" }}
            >
              We offer a range of truck sizes to meet the needs of your move —
              whether you're transporting a few small items or a large home or
              office. Our trucks are well-maintained and equipped with the
              necessary safety features to ensure a smooth and secure transport
              of your belongings.
            </p>
            <div
              className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-rise"
              style={{ animationDelay: "360ms" }}
            >
              <button type="button" onClick={openQuote} className="btn-aqua btn-aqua-hover">
                Get Quote
              </button>
              <a
                href="tel:+254715729441"
                className="btn-ghost btn-ghost-hover"
              >
                Call 0715 729 441
              </a>
            </div>
          </div>
        </section>

        {/* Fleet Options — LIGHT SURFACE */}
        <section className="surface-light relative py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-14 max-w-3xl text-center reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0A192F]/10 bg-[#0A192F]/5 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-[#0A192F]/80">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-aqua" />
                Fleet Options
              </span>
              <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-[#0A192F] sm:text-5xl">
                Our Truck Hire Options
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {FLEET.map((f, i) => (
                <div
                  key={f.title}
                  className="card-light card-light-hover reveal flex flex-col rounded-2xl p-7"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-aqua text-[#0A192F]">
                      <f.icon className="h-6 w-6" />
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#0A192F]/55">
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-[#0A192F]">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#0A192F]/70">
                    {f.blurb}
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-[#0A192F]/10 pt-5">
                    {f.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-[#0A192F]/80"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--aqua-deep)]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={openQuote}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--aqua-deep)] hover:underline"
                  >
                    Reserve this size →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* More than trucks */}
        <section className="relative py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5 reveal">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-aqua" />
                  More Than Trucks
                </span>
                <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
                  Complete Moving{" "}
                  <span className="text-gradient-aqua">Services Available</span>
                </h2>
                <p className="mt-5 text-white/70">
                  In addition to truck hire, we also offer a range of moving
                  services to make your move as stress-free as possible. These
                  include packing, loading and unloading, and transport. Our
                  team of experienced movers will handle all aspects of your
                  move with care and efficiency.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="button" onClick={openQuote} className="btn-aqua btn-aqua-hover">
                    Get Quote
                  </button>
                  <a
                    href="tel:+254715729441"
                    className="btn-ghost btn-ghost-hover"
                  >
                    <Clock className="h-4 w-4" /> 24/7 Dispatch
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
                {EXTRAS.map((e, i) => (
                  <div
                    key={e.label}
                    className="glass tilt-card tilt-card-hover reveal rounded-2xl p-6"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-[var(--aqua)]">
                      <e.icon className="h-5 w-5" />
                    </div>
                    <div className="mt-4 font-display text-lg font-semibold text-white">
                      {e.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
