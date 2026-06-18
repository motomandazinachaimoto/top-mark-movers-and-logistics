import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES.contact;
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Topmark Movers and Logistics" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "Contact Topmark" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
