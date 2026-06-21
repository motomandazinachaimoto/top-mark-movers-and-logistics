import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES.quote;

function Quote() {
  return <ContentPage page={p} />;
}

export default Quote;
