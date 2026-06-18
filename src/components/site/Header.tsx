import { useEffect, useState } from "react";
import { Truck, ChevronDown, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

type NavItem =
  | { label: string; to: string }
  | { label: string; children: { label: string; to: string }[] };

const NAV: NavItem[] = [
  {
    label: "Moving",
    children: [
      { label: "Residential", to: "/services/residential" },
      { label: "Office & Corporate", to: "/services/office" },
      { label: "Packing & Crating", to: "/services/packing" },
      { label: "Mounting & Handyman", to: "/services/mounting" },
    ],
  },
  {
    label: "Freight",
    children: [
      { label: "Truck Hire & Fleet Rental", to: "/freight/truck-hire" },
      { label: "Full Truckload (FTL)", to: "/freight/ftl" },
      { label: "LTL & Groupage", to: "/freight/ltl" },
      { label: "Petroleum & Bulk Liquid", to: "/freight/petroleum" },
      { label: "Industrial Supply Chain", to: "/freight/industrial" },
    ],
  },
  {
    label: "Global",
    children: [
      { label: "Ocean Freight", to: "/global/ocean" },
      { label: "Air Cargo", to: "/global/air" },
      { label: "Cold Chain", to: "/global/cold-chain" },
      { label: "Project & OOG Cargo", to: "/global/project-cargo" },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About Us", to: "/about" },
      { label: "Our Fleet", to: "/fleet" },
      { label: "Coverage & Network", to: "/coverage" },
      { label: "Careers", to: "/careers" },
      { label: "Insights", to: "/blog" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ease-premium transition-all duration-500 ${
        scrolled
          ? "py-2 backdrop-blur-2xl bg-[rgba(10,25,47,0.78)] border-b border-white/10"
          : "py-4 backdrop-blur-md bg-[rgba(10,25,47,0.25)] border-b border-transparent"
      }`}
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-aqua shadow-glow">
            <Truck className="h-5 w-5 text-[#0A192F]" />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-display text-sm font-bold tracking-tight text-white sm:text-base">
              Topmark
            </span>
            <span className="hidden truncate text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block">
              Movers &amp; Logistics
            </span>
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-1 lg:flex">
          {NAV.map((n) =>
            "to" in n ? (
              <Link
                key={n.label}
                to={n.to}
                className="rounded-full px-4 py-2 text-sm text-white/80 ease-premium transition-colors duration-300 hover:bg-white/5 hover:text-white"
              >
                {n.label}
              </Link>
            ) : (
              <div key={n.label} className="group relative">
                <button className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm text-white/80 ease-premium transition-colors duration-300 hover:bg-white/5 hover:text-white">
                  {n.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </button>
                <div className="invisible absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 translate-y-1 rounded-2xl border border-white/10 bg-[rgba(10,25,47,0.95)] p-2 opacity-0 shadow-2xl backdrop-blur-2xl ease-premium transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {n.children.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      className="block rounded-lg px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/quote" className="btn-aqua btn-aqua-hover hidden sm:inline-flex">
            Get a Free Quote
          </Link>
          <Link to="/quote" className="btn-aqua btn-aqua-hover sm:hidden px-4 text-xs">
            Quote
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/80 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="mx-4 mt-3 max-h-[70vh] overflow-y-auto rounded-2xl border border-white/10 bg-[rgba(10,25,47,0.96)] p-4 backdrop-blur-2xl">
            {NAV.map((n) => (
              <div key={n.label} className="mb-4">
                <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/55">
                  {n.label}
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {"to" in n ? (
                    <Link
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm text-white/85 hover:bg-white/5"
                    >
                      {n.label}
                    </Link>
                  ) : (
                    n.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-2 text-sm text-white/85 hover:bg-white/5"
                      >
                        {c.label}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
