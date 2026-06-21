import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

// Route components (will be migrated from TanStack Router)
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Quote from "./pages/Quote.tsx";
import Contact from "./pages/Contact.tsx";
import Careers from "./pages/Careers.tsx";
import Coverage from "./pages/Coverage.tsx";
import Fleet from "./pages/Fleet.tsx";
import Gallery from "./pages/Gallery.tsx";
import Blog from "./pages/Blog.tsx";

// Services routes
import ServicesIndex from "./pages/ServicesIndex.tsx";
import Residential from "./pages/Residential.tsx";
import Office from "./pages/Office.tsx";
import Packing from "./pages/Packing.tsx";
import Mounting from "./pages/Mounting.tsx";

// Freight routes
import Ftl from "./pages/Ftl.tsx";
import Ltl from "./pages/Ltl.tsx";
import TruckHire from "./pages/TruckHire.tsx";
import Petroleum from "./pages/Petroleum.tsx";
import Industrial from "./pages/Industrial.tsx";

// Global routes
import Ocean from "./pages/Ocean.tsx";
import Air from "./pages/Air.tsx";
import ColdChain from "./pages/ColdChain.tsx";
import ProjectCargo from "./pages/ProjectCargo.tsx";

// Legal routes
import Terms from "./pages/Terms.tsx";
import Privacy from "./pages/Privacy.tsx";
import Insurance from "./pages/Insurance.tsx";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/quote" element={<Layout><Quote /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/careers" element={<Layout><Careers /></Layout>} />
        <Route path="/coverage" element={<Layout><Coverage /></Layout>} />
        <Route path="/fleet" element={<Layout><Fleet /></Layout>} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Layout><Blog /></Layout>} />
        
        {/* Services routes */}
        <Route path="/services" element={<Layout><ServicesIndex /></Layout>} />
        <Route path="/services/residential" element={<Layout><Residential /></Layout>} />
        <Route path="/services/office" element={<Layout><Office /></Layout>} />
        <Route path="/services/packing" element={<Layout><Packing /></Layout>} />
        <Route path="/services/mounting" element={<Layout><Mounting /></Layout>} />
        
        {/* Freight routes */}
        <Route path="/freight/ftl" element={<Layout><Ftl /></Layout>} />
        <Route path="/freight/ltl" element={<Layout><Ltl /></Layout>} />
        <Route path="/freight/truck-hire" element={<Layout><TruckHire /></Layout>} />
        <Route path="/freight/petroleum" element={<Layout><Petroleum /></Layout>} />
        <Route path="/freight/industrial" element={<Layout><Industrial /></Layout>} />
        
        {/* Global routes */}
        <Route path="/global/ocean" element={<Layout><Ocean /></Layout>} />
        <Route path="/global/air" element={<Layout><Air /></Layout>} />
        <Route path="/global/cold-chain" element={<Layout><ColdChain /></Layout>} />
        <Route path="/global/project-cargo" element={<Layout><ProjectCargo /></Layout>} />
        
        {/* Legal routes */}
        <Route path="/legal/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/legal/privacy" element={<Layout><Privacy /></Layout>} />
        <Route path="/legal/insurance" element={<Layout><Insurance /></Layout>} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
