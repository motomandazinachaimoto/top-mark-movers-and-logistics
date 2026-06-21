import { Gallery } from "@/components/site/Gallery";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

function GalleryPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Header />
      <main>
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}

export default GalleryPage;
