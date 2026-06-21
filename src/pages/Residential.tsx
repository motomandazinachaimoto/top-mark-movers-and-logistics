import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["services-residential"];

function Residential() {
  return <ContentPage page={p} />;
}

export default Residential;
