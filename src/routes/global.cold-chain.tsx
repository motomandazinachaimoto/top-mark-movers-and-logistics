import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["global-coldchain"];
export const Route = createFileRoute("/global/cold-chain")({
  head: () => ({
    meta: [
      { title: "Cold Chain & Temperature-Controlled Transport — Topmark" },
      { name: "description", content: p.lede },
      { property: "og:title", content: "Cold Chain — Topmark" },
      { property: "og:description", content: p.lede },
    ],
  }),
  component: () => <ContentPage page={p} />,
});
