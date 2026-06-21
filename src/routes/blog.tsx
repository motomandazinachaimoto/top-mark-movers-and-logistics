import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES.blog;
export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights — Topmark Movers and Logistics" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "Insights — Topmark" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
