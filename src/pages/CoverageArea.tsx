import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CTA } from "@/components/site/CTA";
import { openQuote } from "@/components/site/QuoteDialog";

const areaContent: Record<string, {
  title: string;
  eyebrow: string;
  description: string;
  services: string[];
  intro: string;
}> = {
  "westlands": {
    title: "Movers in Westlands",
    eyebrow: "Nairobi Westlands",
    description: "Premium residential and office relocations across Westlands, with fast access to major roads, apartments and business hubs.",
    services: ["House moving", "Office relocation", "Packing & storage"],
    intro: "Our Westlands team handles apartment moves, villa relocations and office moves with careful packing, route planning and flexible scheduling.",
  },
  "kilimani": {
    title: "Movers in Kilimani",
    eyebrow: "Nairobi Kilimani",
    description: "Professional movers for high-rise apartments, modern homes and executive offices in Kilimani.",
    services: ["Apartment moves", "Office moving", "Furniture dismantling"],
    intro: "We move residents and businesses across Kilimani with a focus on speed, protection and clear communication from quote to delivery.",
  },
  "rongai": {
    title: "Movers in Rongai",
    eyebrow: "Ongata Rongai",
    description: "Reliable house and office moving support for Rongai, Kiserian and nearby estates.",
    services: ["House moving", "Long-distance moves", "Packing services"],
    intro: "Whether you are moving into a new home or shifting an office, our Rongai crew keeps the process organized and efficient.",
  },
  "nairobi-cbd": {
    title: "Movers in Nairobi CBD",
    eyebrow: "Central Business District",
    description: "Fast, secure office relocation and commercial moves through Nairobi CBD with minimal downtime.",
    services: ["Office relocation", "IT equipment moves", "Document handling"],
    intro: "We are used to tight access, short windows and high-value equipment, making CBD moves smooth and controlled.",
  },
  "karen": {
    title: "Movers in Karen",
    eyebrow: "Karen & Langata",
    description: "Trusted movers for villas, gated homes and family relocations in Karen and neighboring estates.",
    services: ["House moving", "Storage", "Premium packing"],
    intro: "From large family homes to smaller apartments, our team offers attentive handling and careful planning in Karen.",
  },
  "lavington": {
    title: "Movers in Lavington",
    eyebrow: "Lavington",
    description: "Smooth relocation support for homes, offices and private residences in Lavington.",
    services: ["Residential moves", "Office moves", "Packing services"],
    intro: "We help clients in Lavington move quickly while protecting furniture, electronics and delicate interiors.",
  },
  "kileleshwa": {
    title: "Movers in Kileleshwa",
    eyebrow: "Kileleshwa",
    description: "Elegant, efficient moving services for Kileleshwa apartments and high-end homes.",
    services: ["Apartment relocation", "Packing", "Mounting"],
    intro: "Our crews organize every detail for Kileleshwa moves, from disassembly to final placement and setup.",
  },
  "upper-hill": {
    title: "Movers in Upper Hill",
    eyebrow: "Upper Hill",
    description: "Corporate and executive moving support for Upper Hill offices, towers and serviced spaces.",
    services: ["Office relocation", "IT moves", "Confidential handling"],
    intro: "We understand the operational needs of Upper Hill businesses and plan moves around minimal disruption.",
  },
  "runda": {
    title: "Movers in Runda",
    eyebrow: "Runda",
    description: "Private home and estate relocations for clients in Runda with a premium, detail-focused service.",
    services: ["House moving", "Packing", "Storage"],
    intro: "Runda moves are handled with extra care for premium furniture, artwork and access-sensitive properties.",
  },
  "gigiri": {
    title: "Movers in Gigiri",
    eyebrow: "Gigiri",
    description: "Residential and diplomatic relocation support for Gigiri homes and offices.",
    services: ["House moving", "Office moving", "Packing"],
    intro: "Our Gigiri team combines discretion, organization and dependable transport for both homes and offices.",
  },
  "syokimau": {
    title: "Movers in Syokimau",
    eyebrow: "Syokimau",
    description: "Reliable moves for growing families and businesses in Syokimau and nearby corridors.",
    services: ["House moving", "Office moving", "Long-distance transport"],
    intro: "We cover Syokimau with flexible scheduling, careful loading and consistent communication.",
  },
  "south-b": {
    title: "Movers in South B",
    eyebrow: "South B",
    description: "Affordable and efficient moving support for South B apartments, homes and small offices.",
    services: ["Residential moves", "Packing", "Transport"],
    intro: "Our South B team helps customers move quickly without compromising on care and punctuality.",
  },
  "south-c": {
    title: "Movers in South C",
    eyebrow: "South C",
    description: "Stress-free relocations for homes and offices across South C and nearby neighborhoods.",
    services: ["House moving", "Office relocation", "Storage"],
    intro: "We deliver practical moving solutions for South C residents and business owners alike.",
  },
  "langata": {
    title: "Movers in Langata",
    eyebrow: "Langata",
    description: "Friendly, dependable moving support for families and businesses in Langata.",
    services: ["Residential moving", "Packing", "Storage"],
    intro: "From gated communities to townhouses, we handle Langata moves with care and clear planning.",
  },
  "embakasi": {
    title: "Movers in Embakasi",
    eyebrow: "Embakasi",
    description: "Efficient relocations for homes, warehouses and business premises in Embakasi.",
    services: ["House moves", "Commercial moves", "Truck hire"],
    intro: "Our Embakasi operations are designed for fast loading, reliable transport and straightforward coordination.",
  },
  "donholm": {
    title: "Movers in Donholm",
    eyebrow: "Donholm",
    description: "Dependable moving help for households and teams based in Donholm.",
    services: ["Apartment moving", "Packing", "Office relocation"],
    intro: "We make Donholm moves easier with organized crews, careful packing and punctual arrivals.",
  },
  "buruburu": {
    title: "Movers in Buruburu",
    eyebrow: "Buruburu",
    description: "Trusted local moving services for homes and offices in Buruburu and surrounding areas.",
    services: ["House moving", "Office moving", "Storage"],
    intro: "Buruburu moves are handled with practical planning, respectful crews and full move-day support.",
  },
  "madaraka": {
    title: "Movers in Madaraka",
    eyebrow: "Madaraka",
    description: "Beautifully managed relocations for homes and offices in Madaraka.",
    services: ["Residential moves", "Office moving", "Packing"],
    intro: "We offer reliable help in Madaraka for clients who value punctuality, care and good communication.",
  },
  "parklands": {
    title: "Movers in Parklands",
    eyebrow: "Parklands",
    description: "Professional moving support for Parklands homes, apartments and businesses.",
    services: ["House moving", "Office moving", "Packing"],
    intro: "Parklands jobs are planned with care for access, timing and the protection of high-value belongings.",
  },
  "mombasa": {
    title: "Movers in Mombasa",
    eyebrow: "Coast region",
    description: "Reliable relocation and freight support across Mombasa, including residential and commercial moves.",
    services: ["House moves", "Office moves", "Long-distance logistics"],
    intro: "Our Mombasa team supports coastal moves with strong local knowledge and dependable transport.",
  },
  "kisumu": {
    title: "Movers in Kisumu",
    eyebrow: "Western Kenya",
    description: "Flexible moving and logistics support for Kisumu homes, businesses and cargo projects.",
    services: ["Residential moves", "Office relocation", "Freight"],
    intro: "We coordinate Kisumu moves with careful route planning and professional handling from pickup to destination.",
  },
  "nakuru": {
    title: "Movers in Nakuru",
    eyebrow: "Rift Valley",
    description: "Dependable relocation services for Nakuru residents, offices and commercial clients.",
    services: ["House moving", "Office moving", "Packing"],
    intro: "Our Nakuru operations help make intercity moves straightforward and stress-free.",
  },
  "eldoret": {
    title: "Movers in Eldoret",
    eyebrow: "Rift Valley",
    description: "Trusted moving and logistics support for families and businesses in Eldoret.",
    services: ["House moving", "Office relocation", "Freight"],
    intro: "We help Eldoret clients plan moves with a focus on timing, safety and dependable service.",
  },
  "nairobi": {
    title: "Movers in Nairobi",
    eyebrow: "Nairobi",
    description: "Full-service moving support for Nairobi households, offices and retail operations.",
    services: ["House moving", "Office moving", "Storage"],
    intro: "Whether you are moving within Nairobi or across counties, we provide practical planning and professional crews.",
  },
};

function CoverageArea() {
  const { areaSlug } = useParams();
  const area = useMemo(() => {
    if (!areaSlug) return null;
    return areaContent[areaSlug] ?? null;
  }, [areaSlug]);

  if (!area) {
    return (
      <div className="min-h-screen bg-background px-4 py-24 text-foreground">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-card/70 p-10 text-center shadow-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--aqua)]">Coverage area</p>
          <h1 className="mt-4 text-3xl font-semibold">Area not found</h1>
          <p className="mt-3 text-muted-foreground">We do not currently have a dedicated page for that location.</p>
          <Link to="/coverage" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--aqua)]">
            <ArrowLeft className="h-4 w-4" /> Back to coverage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(63,209,211,0.16),transparent_55%)]" />
        <div className="mx-auto max-w-5xl">
          <Link to="/coverage" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--aqua)]">
            <ArrowLeft className="h-4 w-4" /> Back to coverage
          </Link>
          <div className="mt-8 rounded-[2rem] border border-white/10 bg-card/80 p-8 shadow-2xl backdrop-blur sm:p-10 lg:p-12">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--aqua)]">{area.eyebrow}</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">{area.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{area.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openQuote({ kind: "moving" })}
                className="btn-aqua btn-aqua-hover"
              >
                Get a quote
              </button>
              <a href="tel:+254719174393" className="btn-ghost btn-ghost-hover">
                Call now
              </a>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-white/10 bg-card/70 p-8 shadow-xl">
              <h2 className="text-2xl font-semibold">Why choose us here</h2>
              <p className="mt-4 text-muted-foreground leading-8">{area.intro}</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-card/70 p-8 shadow-xl">
              <h2 className="text-2xl font-semibold">Services available</h2>
              <ul className="mt-4 space-y-3">
                {area.services.map((service) => (
                  <li key={service} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--aqua)]" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </div>
  );
}

export default CoverageArea;
