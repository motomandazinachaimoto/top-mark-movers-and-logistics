import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { openQuote } from "@/components/site/QuoteDialog";

type Slide = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
};

const SLIDES: Slide[] = [
  {
    id: "fleet",
    title: "A Fleet Built for Every Move",
    category: "Our Fleet",
    description:
      "From compact 3-ton vans to 40-foot long-haul trailers — every truck is GPS tracked, GIT insured and driver-vetted for safe, on-time delivery across East Africa.",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "house",
    title: "Stress-Free House Moves",
    category: "Residential",
    description:
      "Professional packers, padded blankets and dedicated supervisors. We treat every plate, sofa and family photo as if it were our own.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "office",
    title: "Seamless Office Relocations",
    category: "Corporate",
    description:
      "Weekend and after-hours moves planned to the minute, so your team walks into a fully wired workspace on Monday morning.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "warehouse",
    title: "Secure Warehousing & Storage",
    category: "Storage",
    description:
      "24/7 CCTV-monitored warehouses with climate-controlled bays for short-term staging and long-term archival storage.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "port",
    title: "Ocean Freight & Port Clearance",
    category: "Global Logistics",
    description:
      "FCL, LCL and project cargo through Mombasa and Dar es Salaam — with in-house clearing agents to keep your shipment moving.",
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "air",
    title: "Time-Critical Air Freight",
    category: "Air Cargo",
    description:
      "Express consolidations and charter solutions for high-value, perishable and just-in-time shipments worldwide.",
    image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "team",
    title: "The People Behind Every Move",
    category: "Our Team",
    description:
      "Trained crews, certified drivers and dedicated move coordinators — the human touch that turns logistics into peace of mind.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80",
  },
];

export function Gallery() {
  const [index, setIndex] = useState(0);
  const active = SLIDES[index];

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [go]);

  // Build the thumbnail strip: the next N items after the active one
  const upcoming = Array.from({ length: Math.min(4, SLIDES.length - 1) }, (_, i) =>
    SLIDES[(index + 1 + i) % SLIDES.length],
  );

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#0A192F] text-white">
      {/* Full-bleed animated background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={active.id}
          layoutId={`media-${active.id}`}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={active.image}
            alt={active.title}
            className="h-full w-full object-cover"
            draggable={false}
          />
          {/* Cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/85 via-[#0A192F]/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-transparent to-[#0A192F]/30" />
        </motion.div>
      </AnimatePresence>

      {/* Slow Ken-Burns shimmer */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.18),transparent_60%)]" />

      {/* Content shell */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-4 pb-32 pt-28 sm:px-6 sm:pb-36 lg:px-8 lg:pb-40 lg:pt-32">
        {/* Left text block */}
        <div className="flex flex-1 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
                exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
              className="max-w-2xl"
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300 backdrop-blur-md"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
                {active.category}
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                {active.title}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
              >
                {active.description}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
                <button onClick={openQuote} className="btn-aqua btn-aqua-hover px-6 py-3 text-sm">
                  Get Quote
                </button>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <span className="tabular-nums font-medium text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-10 bg-white/30" />
                  <span className="tabular-nums">{String(SLIDES.length).padStart(2, "0")}</span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Nav arrows */}
      <div className="absolute bottom-6 left-4 z-20 flex items-center gap-2 sm:bottom-8 sm:left-6 lg:left-8">
        <NavArrow onClick={() => go(-1)} label="Previous">
          <ChevronLeft className="h-5 w-5" />
        </NavArrow>
        <NavArrow onClick={() => go(1)} label="Next">
          <ChevronRight className="h-5 w-5" />
        </NavArrow>
      </div>

      {/* Thumbnail rail — bottom right */}
      <div className="absolute inset-x-0 bottom-6 z-20 px-4 sm:bottom-8 sm:px-6 lg:bottom-10 lg:px-8">
        <div className="flex justify-end">
          <div className="hide-scrollbar flex max-w-full gap-3 overflow-x-auto pb-1 sm:gap-4">
            {upcoming.map((slide) => {
              const target = SLIDES.findIndex((s) => s.id === slide.id);
              return (
                <motion.button
                  key={slide.id}
                  layoutId={`media-${slide.id}`}
                  onClick={() => setIndex(target)}
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="group relative h-28 w-44 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-white/5 text-left shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md sm:h-32 sm:w-52"
                  aria-label={`Show ${slide.title}`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                      {slide.category}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-xs font-semibold text-white sm:text-sm">
                      {slide.title}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-[3px] bg-white/10">
        <motion.div
          key={active.id}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 7, ease: "linear" }}
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.7)]"
        />
      </div>
    </section>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -14,
    filter: "blur(4px)",
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] as const },
  },
} as const;

function NavArrow({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-all duration-300 ease-out hover:scale-105 hover:border-cyan-300/60 hover:bg-cyan-400/15 hover:text-cyan-200 sm:h-12 sm:w-12"
    >
      {children}
    </button>
  );
}
