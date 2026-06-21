import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["services-office"];

function Office() {
  return <ContentPage page={p} />;
}

export default Office;
