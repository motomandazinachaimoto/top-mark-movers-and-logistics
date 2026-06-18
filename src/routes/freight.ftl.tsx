import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["freight-ftl"];
export const Route = createFileRoute("/freight/ftl")({
  head: () => ({
    meta: [
      { title: "Full Truckload (FTL) — Topmark" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "Full Truckload (FTL) — Topmark" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
