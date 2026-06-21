import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["global-ocean"];

function Ocean() {
  return <ContentPage page={p} />;
}

export default Ocean;
