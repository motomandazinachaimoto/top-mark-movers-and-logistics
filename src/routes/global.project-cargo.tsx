import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["global-project"];
export const Route = createFileRoute("/global/project-cargo")({
  head: () => ({
    meta: [
      { title: "Project Cargo & Out-of-Gauge Logistics — Topmark" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "Project & OOG Cargo — Topmark" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
