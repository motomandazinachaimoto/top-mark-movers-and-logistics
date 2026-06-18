import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["services-index"];
export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Topmark Movers and Logistics" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "Services — Topmark" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
