import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["freight-industrial"];
export const Route = createFileRoute("/freight/industrial")({
  head: () => ({
    meta: [
      { title: "Industrial Supply Chain Transport — Topmark" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "Industrial Supply Chain — Topmark" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
