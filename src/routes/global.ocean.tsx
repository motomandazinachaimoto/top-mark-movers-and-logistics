import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["global-ocean"];
export const Route = createFileRoute("/global/ocean")({
  head: () => ({
    meta: [
      { title: "Ocean Freight (FCL & LCL) — Topmark" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "Ocean Freight — Topmark" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
