import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["freight-ltl"];
export const Route = createFileRoute("/freight/ltl")({
  head: () => ({
    meta: [
      { title: "LTL & Groupage — Topmark" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "LTL & Groupage — Topmark" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
