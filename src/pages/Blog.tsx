import { ContentPage } from "@/components/site/ContentPage";
import { PAGES } from "@/lib/pages";

const p = PAGES.blog;

function Blog() {
  return <ContentPage page={p} />;
}

export default Blog;
