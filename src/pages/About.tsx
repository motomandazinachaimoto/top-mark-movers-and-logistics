import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES.about;

function About() {
  return <ContentPage page={p} />;
}

export default About;
