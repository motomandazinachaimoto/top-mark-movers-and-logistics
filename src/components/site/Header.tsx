import { useEffect, useState } from "react";
import { Truck, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { QuoteButton, QuoteDialog, openQuote } from "@/components/site/QuoteDialog";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Truck Hire", to: "/freight/truck-hire" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

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
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 ease-premium transition-all duration-500 ${
          scrolled
            ? "py-2 backdrop-blur-2xl bg-[rgba(10,25,47,0.82)] border-b border-white/10"
            : "py-3 backdrop-blur-md bg-[rgba(10,25,47,0.35)] border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          {/* Brand — full name visible on mobile too */}
          <Link to="/" className="flex min-w-0 flex-1 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-aqua shadow-glow">
              <Truck className="h-5 w-5 text-[#0A192F]" />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate font-display text-sm font-bold tracking-tight text-white sm:text-base">
                Topmark Movers
              </span>
              <span className="truncate text-[9px] uppercase tracking-[0.18em] text-white/55 sm:text-[10px]">
                and Logistics
              </span>
            </span>
          </Link>

          {/* Desktop nav — simple flat links, no dropdowns */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/75 ease-premium transition-colors duration-300 hover:bg-white/5 hover:text-white data-[status=active]:bg-white/[0.06] data-[status=active]:text-white"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Right cluster: CTA + Menu (mobile menu always at right end) */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={openQuote}
              className="btn-aqua btn-aqua-hover hidden px-4 py-2 text-sm sm:inline-flex"
            >
              Get Quote
            </button>
            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-white/85 ease-premium transition-colors hover:bg-white/10 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden ease-premium transition-[max-height,opacity] duration-500 ${
            open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-4 mt-3 rounded-2xl border border-white/10 bg-[rgba(10,25,47,0.96)] p-3 shadow-2xl backdrop-blur-2xl">
            <div className="grid gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  activeOptions={{ exact: n.to === "/" }}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white/85 transition-colors hover:bg-white/5 data-[status=active]:bg-white/[0.08] data-[status=active]:text-white"
                >
                  {n.label}
                </Link>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openQuote();
              }}
              className="btn-aqua btn-aqua-hover mt-3 w-full justify-center sm:hidden"
            >
              Get Quote
            </button>
          </div>
        </div>
      </header>

      <QuoteDialog />
    </>
  );
}
