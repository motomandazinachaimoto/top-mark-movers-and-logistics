import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["global-coldchain"];

function ColdChain() {
  return <ContentPage page={p} />;
}

export default ColdChain;
