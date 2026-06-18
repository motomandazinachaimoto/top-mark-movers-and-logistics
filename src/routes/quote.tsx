import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES.quote;
export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Free Quote — Topmark Movers and Logistics" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "Get a Free Quote — Topmark" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
