import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["services-packing"];
export const Route = createFileRoute("/services/packing")({
  head: () => ({
    meta: [
      { title: "Premium Packing & Crating — Topmark" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "Packing & Crating — Topmark" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
