import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["services-index"];

function ServicesIndex() {
  return <ContentPage page={p} />;
}

export default ServicesIndex;
