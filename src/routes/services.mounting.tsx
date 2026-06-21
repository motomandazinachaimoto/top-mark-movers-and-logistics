import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["services-mounting"];
export const Route = createFileRoute("/services/mounting")({
  head: () => ({
    meta: [
      { title: "Mounting & Handyman Services — Topmark" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "Mounting & Handyman — Topmark" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
