import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES.gallery;

function Gallery() {
  return <ContentPage page={p} />;
}

export default Gallery;
