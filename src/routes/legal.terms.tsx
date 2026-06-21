import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["legal-terms"];
export const Route = createFileRoute("/legal/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Topmark" },
      { name: "description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
