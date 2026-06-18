import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES.about;
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Topmark — Movers and Logistics" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "About Topmark Movers and Logistics" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
