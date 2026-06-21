import { Truck, Mail, Phone, MapPin, Clock, Facebook, Instagram, Music2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

const COLS: { h: string; l: { label: string; to: string }[] }[] = [
  {
    h: "Moving",
    l: [
      { label: "Residential", to: "/services/residential" },
      { label: "Office & Corporate", to: "/services/office" },
      { label: "Packing & Crating", to: "/services/packing" },
      { label: "Mounting & Handyman", to: "/services/mounting" },
    ],
  },
  {
    h: "Freight",
    l: [
      { label: "Truck Hire", to: "/freight/truck-hire" },
      { label: "Full Truckload", to: "/freight/ftl" },
      { label: "LTL & Groupage", to: "/freight/ltl" },
      { label: "Petroleum & Bulk", to: "/freight/petroleum" },
      { label: "Industrial Supply", to: "/freight/industrial" },
    ],
  },
  {
    h: "Global & Company",
    l: [
      { label: "Ocean Freight", to: "/global/ocean" },
      { label: "Air Cargo", to: "/global/air" },
      { label: "Cold Chain", to: "/global/cold-chain" },
      { label: "About Us", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/10 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-aqua shadow-glow">
                <Truck className="h-5 w-5 text-[#0A192F]" />
              </span>
              <div>
                <div className="font-display text-base font-bold text-white">Topmark</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                  Movers &amp; Logistics
                </div>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm text-white/65">
              An enterprise logistics operator engineering road, ocean, air and
              white-glove movements across 47 counties and 80+ global trade lanes.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/70">
              <a href="mailto:operations@topmark.co" className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-[var(--aqua)]" /> operations@topmark.co
              </a>
              <a href="tel:+254715729441" className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 text-[var(--aqua)]" /> +254 715 729 441
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--aqua)]" /> Industrial Area, Nairobi · Mombasa Port
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-3">
            {COLS.map((c) => (
              <div key={c.h}>
                <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white/55">{c.h}</div>
                <ul className="space-y-2.5 text-sm text-white/75">
                  {c.l.map((i) => (
                    <li key={i.to}>
                      <Link
                        to={i.to}
                        className="ease-premium transition-colors duration-300 hover:text-white"
                      >
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Topmark Movers and Logistics. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/legal/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/legal/terms" className="hover:text-white">Terms</Link>
            <Link to="/legal/insurance" className="hover:text-white">GIT Insurance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
