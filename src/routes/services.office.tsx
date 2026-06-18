import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["services-office"];
export const Route = createFileRoute("/services/office")({
  head: () => ({
    meta: [
      { title: "Office & Corporate Relocations — Topmark" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "Office Relocations — Topmark" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
