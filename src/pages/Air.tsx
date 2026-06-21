import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["global-air"];

function Air() {
  return <ContentPage page={p} />;
}

export default Air;
