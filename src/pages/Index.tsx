import { Link } from "react-router-dom";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Metrics } from "@/components/site/Metrics";
import { Trust } from "@/components/site/Trust";
import { CTA } from "@/components/site/CTA";
import { openQuote } from "@/components/site/QuoteDialog";
import { useReveal } from "@/hooks/use-reveal";
import { useEffect } from "react";
import { Truck, ShieldCheck, Clock, Globe2 } from "lucide-react";

const PROMISES = [
  { icon: Truck, title: "Owned Fleet", desc: "150+ assets — all on our books, telematics and maintenance schedule." },
  { icon: ShieldCheck, title: "Fully Insured", desc: "Lloyd's-underwritten GIT cover on every consignment." },
  { icon: Clock, title: "On-Time, 99.4%", desc: "Live control-tower orchestration with proactive ETA re-projection." },
  { icon: Globe2, title: "47 Counties · 80+ Lanes", desc: "From Lamu to Lokichogio, and across the EAC and the world." },
];

function Index() {
  const ref = useReveal<HTMLDivElement>();
  
  // SEO for homepage
  useEffect(() => {
    document.title = "Topmark Movers and Logistics | Premium Moving & Freight Services in Kenya";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Kenya's trusted movers and logistics company. Professional residential moving, office relocation, freight forwarding, and supply chain solutions across 47 counties and 80+ global trade lanes. Get a free quote today.");
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://topmarkmovers.com/');
    }
    
    // Update Open Graph tags
    updateMetaTag('og:title', 'Topmark Movers and Logistics | Premium Moving & Freight Services in Kenya');
    updateMetaTag('og:url', 'https://topmarkmovers.com/');
    
    // Update Twitter tags
    updateMetaTag('twitter:title', 'Topmark Movers and Logistics | Premium Moving & Freight Services in Kenya');
    updateMetaTag('twitter:url', 'https://topmarkmovers.com/');
    
    // Add Homepage Schema
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Topmark Movers and Logistics",
      "url": "https://topmarkmovers.com",
      "description": "Kenya's trusted movers and logistics company providing residential moving, office relocation, freight forwarding, and supply chain solutions",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://topmarkmovers.com/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    });
    document.head.appendChild(schema);
    
    return () => {
      // Cleanup schema
      if (document.head.contains(schema)) {
        document.head.removeChild(schema);
      }
    };
  }, []);

  function updateMetaTag(property: string, content: string) {
    const tag = document.querySelector(`meta[property="${property}"]`) || 
                document.querySelector(`meta[name="${property}"]`);
    if (tag) {
      tag.setAttribute('content', content);
    }
  }
  
  return (
    <div ref={ref}>
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
              <button type="button" onClick={openQuote} className="btn-aqua btn-aqua-hover">Get Quote</button>
              <Link to="/freight/truck-hire" className="btn-ghost btn-ghost-hover" style={{ color: "#0A192F", borderColor: "rgba(10,25,47,0.18)", background: "rgba(10,25,47,0.04)" }}>
                Explore Truck Hire
              </Link>
            </div>
          </div>
        </section>

        <Metrics />
        <Trust />
        <CTA />
      </main>
    </div>
  );
}

export default Index;
