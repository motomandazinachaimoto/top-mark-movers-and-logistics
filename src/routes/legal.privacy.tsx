import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["legal-privacy"];
export const Route = createFileRoute("/legal/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Topmark" },
      { name: "description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
