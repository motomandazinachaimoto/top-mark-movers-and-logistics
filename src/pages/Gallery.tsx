import { Gallery } from "@/components/site/Gallery";

function GalleryPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <main>
        <Gallery />
      </main>
    </div>
  );
}

export default GalleryPage;
