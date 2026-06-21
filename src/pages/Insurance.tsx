import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["legal-insurance"];

function Insurance() {
  return <ContentPage page={p} />;
}

export default Insurance;
