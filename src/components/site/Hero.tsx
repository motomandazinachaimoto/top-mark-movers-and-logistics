import { useEffect, useState } from "react";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { openQuote } from "@/components/site/QuoteDialog";
import heroPort from "@/assets/hero-port.jpg";
import heroFleet from "@/assets/hero-fleet.jpg";
import heroAir from "@/assets/hero-air.jpg";
import heroMovers from "@/assets/hero-movers.jpg";

const SLIDES = [
  {
    img: heroPort,
    eyebrow: "Global Freight & Intermodal",
    title: "Move the world,\non your timeline.",
    desc: "From FCL container shipping to out-of-gauge project cargo — Topmark orchestrates seamless intermodal freight across every continent.",
  },
  {
    img: heroFleet,
    eyebrow: "Fleet & Road Freight",
    title: "150+ assets.\n47 counties. One fleet.",
    desc: "Industrial FTL, LTL groupage and specialized petroleum haulage — engineered for uptime, tracked end-to-end.",
  },
  {
    img: heroAir,
    eyebrow: "Air Cargo Consolidation",
    title: "Time-critical cargo,\ndelivered with precision.",
    desc: "Bonded warehousing, cold-chain corridors and priority air freight for shipments that absolutely cannot wait.",
  },
  {
    img: heroMovers,
    eyebrow: "Premium Relocations",
    title: "White-glove moves\nfor what matters most.",
    desc: "Residential, corporate and fine-art relocation handled by specialists — packed, mounted and delivered with care.",
  },
];

export function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setIdx((i) => (i + 1) % SLIDES.length),
      7000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      {/* Slides */}
      <div className="absolute inset-0 -z-10">
        {SLIDES.map((s, i) => (
          <div
            key={s.img}
            className={`absolute inset-0 ease-premium transition-opacity duration-[1600ms] ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== idx}
          >
            <img
              src={s.img}
              alt=""
              width={1920}
              height={1080}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              className={`h-full w-full object-cover ${i === idx ? "animate-kenburns" : ""}`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/95 via-[#0A192F]/75 to-[#0A192F]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent" />
          </div>
        ))}
      </div>

      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-8 xl:col-span-7">
          {SLIDES.map((s, i) =>
            i === idx ? (
              <div key={s.eyebrow} className="space-y-6">
                <span
                  className="animate-rise inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur-md"
                  style={{ animationDelay: "0ms" }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-aqua shadow-glow" />
                  {s.eyebrow}
                </span>
                <h1
                  className="animate-rise whitespace-pre-line font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-7xl"
                  style={{ animationDelay: "120ms" }}
                >
                  {s.title.split("\n").map((line, k) => (
                    <span key={k} className="block">
                      {k === 1 ? (
                        <span className="text-gradient-aqua">{line}</span>
                      ) : (
                        line
                      )}
                    </span>
                  ))}
                </h1>
                <p
                  className="animate-rise max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
                  style={{ animationDelay: "270ms" }}
                >
                  {s.desc}
                </p>
                <div
                  className="animate-rise flex flex-wrap items-center gap-3 pt-2"
                  style={{ animationDelay: "420ms" }}
                >
                  <button type="button" onClick={openQuote} className="btn-aqua btn-aqua-hover">
                    Get Quote <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link to="/services" className="btn-ghost btn-ghost-hover">
                    <PlayCircle className="h-4 w-4" /> Explore Services
                  </Link>
                </div>
              </div>
            ) : null,
          )}
        </div>

        {/* Slide indicators */}
        <div className="lg:col-span-4 xl:col-span-5 flex flex-row gap-3 lg:flex-col lg:items-end lg:justify-end">
          {SLIDES.map((s, i) => (
            <button
              key={s.eyebrow}
              onClick={() => setIdx(i)}
              className="group relative flex-1 lg:w-72 lg:flex-none text-left"
              aria-label={`Show slide: ${s.eyebrow}`}
            >
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full bg-gradient-aqua ease-premium transition-all duration-700 ${
                    i === idx ? "w-full shadow-glow" : "w-0"
                  }`}
                />
              </div>
              <span
                className={`mt-2 hidden text-xs uppercase tracking-[0.2em] lg:block ${
                  i === idx ? "text-white" : "text-white/40"
                }`}
              >
                0{i + 1} · {s.eyebrow}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
