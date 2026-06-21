import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["legal-terms"];

function Terms() {
  return <ContentPage page={p} />;
}

export default Terms;
