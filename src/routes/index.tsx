import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Metrics } from "@/components/site/Metrics";
import { QuoteWizard } from "@/components/site/QuoteWizard";
import { Trust } from "@/components/site/Trust";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";

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
        <Metrics />
        <QuoteWizard />
        <Trust />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
