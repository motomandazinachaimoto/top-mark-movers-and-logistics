import { useEffect, useRef, useState } from "react";
import { MapPin, Truck, PackageCheck, Globe2 } from "lucide-react";

const METRICS = [
  { icon: MapPin, label: "Counties Covered", value: 47, suffix: "/47" },
  { icon: Truck, label: "Active Fleet Assets", value: 150, suffix: "+" },
  { icon: PackageCheck, label: "Successful Deliveries", value: 12000, suffix: "+" },
  { icon: Globe2, label: "Global Trade Lanes", value: 80, suffix: "+" },
];

function useCountUp(target: number, start: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return val;
}

function Metric({ m, start }: { m: (typeof METRICS)[number]; start: boolean }) {
  const v = useCountUp(m.value, start);
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-6 text-center sm:p-8">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5 text-[var(--aqua)]">
        <m.icon className="h-6 w-6" />
      </div>
      <div className="mt-5 font-display text-4xl font-bold tabular-nums text-white sm:text-5xl">
        <span className="text-gradient-aqua">{v.toLocaleString()}</span>
        <span className="text-white/60">{m.suffix}</span>
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/55">
        {m.label}
      </div>
    </div>
  );
}

export function Metrics() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => e.isIntersecting && setStart(true)),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="network" className="relative py-24 lg:py-32">
      <div className="absolute inset-x-0 top-1/2 -z-10 mx-auto h-72 max-w-5xl -translate-y-1/2 bg-gradient-aqua opacity-[0.08] blur-[120px]" />
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-aqua" /> Enterprise Footprint
          </span>
          <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            Built at the scale of <span className="text-gradient-aqua">commerce itself.</span>
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {METRICS.map((m) => (
            <Metric key={m.label} m={m} start={start} />
          ))}
        </div>
      </div>
    </section>
  );
}
