import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["legal-privacy"];

function Privacy() {
  return <ContentPage page={p} />;
}

export default Privacy;
