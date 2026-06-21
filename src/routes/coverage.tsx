import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES.coverage;
export const Route = createFileRoute("/coverage")({
  head: () => ({
    meta: [
      { title: "Coverage & Network — Topmark" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "Coverage & Network — Topmark" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
