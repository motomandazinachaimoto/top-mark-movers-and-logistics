import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["legal-insurance"];
export const Route = createFileRoute("/legal/insurance")({
  head: () => ({
    meta: [
      { title: "Goods in Transit Insurance — Topmark" },
      { name: "description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
