import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Metrics } from "@/components/site/Metrics";
import { QuoteWizard } from "@/components/site/QuoteWizard";
import { Trust } from "@/components/site/Trust";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";
import { Truck, ShieldCheck, Clock, Globe2 } from "lucide-react";

const PROMISES = [
  { icon: Truck, title: "Owned Fleet", desc: "150+ assets — all on our books, telematics and maintenance schedule." },
  { icon: ShieldCheck, title: "Fully Insured", desc: "Lloyd's-underwritten GIT cover on every consignment." },
  { icon: Clock, title: "On-Time, 99.4%", desc: "Live control-tower orchestration with proactive ETA re-projection." },
  { icon: Globe2, title: "47 Counties · 80+ Lanes", desc: "From Lamu to Lokichogio, and across the EAC and the world." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Topmark Movers and Logistics — Global Freight, Fleet & Relocations" },
      {
        name: "description",
        content:
          "Topmark Movers and Logistics engineers premium relocations, road freight, ocean and air cargo across 47 counties and 80+ global trade lanes. Get an instant quote.",
      },
      { property: "og:title", content: "Topmark Movers and Logistics" },
      {
        property: "og:description",
        content:
          "Premium relocations, fleet & road freight, and global intermodal logistics. 99.4% on-time, 150+ assets, 24/7 control tower.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Services />

        {/* Promise strip — white surface */}
        <section className="surface-light relative py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0A192F]/10 bg-[#0A192F]/5 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-[#0A192F]/80">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-aqua" /> The Topmark Promise
              </span>
              <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-[#0A192F] sm:text-5xl">
                Predictable logistics, <span className="text-[var(--aqua-deep)]">backed by paper.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[#0A192F]/70">
                Every promise on this page is in your contract, in your insurance certificate, and on your real-time tracking dashboard.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PROMISES.map((p, i) => (
                <div
                  key={p.title}
                  className="card-light card-light-hover reveal rounded-2xl p-6"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-aqua text-[#0A192F]">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 font-display text-lg font-semibold text-[#0A192F]">
                    {p.title}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-[#0A192F]/70">
                    {p.desc}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link to="/quote" className="btn-aqua btn-aqua-hover">Get a Free Quote</Link>
              <Link to="/freight/truck-hire" className="btn-ghost btn-ghost-hover" style={{ color: "#0A192F", borderColor: "rgba(10,25,47,0.18)", background: "rgba(10,25,47,0.04)" }}>
                Explore Truck Hire
              </Link>
            </div>
          </div>
        </section>

        <Metrics />
        <QuoteWizard />
        <Trust />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
