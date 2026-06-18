import { useEffect, useState } from "react";
import { Truck } from "lucide-react";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#network", label: "Network" },
  { href: "#quote", label: "Get Quote" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

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
          ? "py-2 backdrop-blur-2xl bg-[rgba(10,25,47,0.72)] border-b border-white/10"
          : "py-4 backdrop-blur-md bg-[rgba(10,25,47,0.20)] border-b border-transparent"
      }`}
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
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
        </a>

        <nav className="hidden items-center justify-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-4 py-2 text-sm text-white/75 ease-premium transition-colors duration-300 hover:bg-white/5 hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a href="#quote" className="btn-aqua btn-aqua-hover hidden sm:inline-flex">
          Get a Free Quote
        </a>
        <a href="#quote" className="btn-aqua btn-aqua-hover sm:hidden px-4 text-xs">
          Quote
        </a>
      </div>
    </header>
  );
}
