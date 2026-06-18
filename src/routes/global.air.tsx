import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["global-air"];
export const Route = createFileRoute("/global/air")({
  head: () => ({
    meta: [
      { title: "Air Cargo Services — Topmark" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "Air Cargo — Topmark" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
