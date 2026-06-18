import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["freight-petroleum"];
export const Route = createFileRoute("/freight/petroleum")({
  head: () => ({
    meta: [
      { title: "Petroleum & Bulk Liquid Haulage — Topmark" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "Petroleum & Bulk Liquid — Topmark" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
