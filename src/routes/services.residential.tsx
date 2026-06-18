import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["services-residential"];
export const Route = createFileRoute("/services/residential")({
  head: () => ({
    meta: [
      { title: "Residential House Moving — Topmark" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "Residential House Moving — Topmark" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
