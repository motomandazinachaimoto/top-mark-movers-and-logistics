import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Gallery } from "@/components/site/Gallery";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Topmark Movers and Logistics" },
      {
        name: "description",
        content:
          "A visual tour of Topmark Movers and Logistics — our fleet, crews, warehouses and operations across East Africa.",
      },
      { property: "og:title", content: "Gallery — Topmark Movers and Logistics" },
      {
        property: "og:description",
        content: "Explore our fleet, crews and operations through a cinematic gallery.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#0A192F] text-white">
      <Header />
      <main>
        <Gallery />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
