import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES["global-project"];

function ProjectCargo() {
  return <ContentPage page={p} />;
}

export default ProjectCargo;
