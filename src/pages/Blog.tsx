import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { optimizeImageUrl, usePrefetchImages } from "@/lib/optimizeImageUrl";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
  videoUrl: string;
};

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The 30-Day Moving Checklist: Your Complete Guide to Stress-Free Relocation",
    excerpt: "Everything you need to do four weeks, two weeks, and 24 hours before move day. This comprehensive checklist covers packing, notifications, and final preparations.",
    content: "Moving can be overwhelming, but with proper planning, it doesn't have to be. This comprehensive guide breaks down your moving timeline into manageable phases...",
    author: "Topmark Team",
    date: "2026-06-15",
    readTime: "8 min read",
    category: "Moving Tips",
    image: "https://res.cloudinary.com/dun0ibkj0/image/upload/v1781871710/IMG_9480-1-600x600_ak4mhf.jpg",
    slug: "30-day-moving-checklist",
    videoUrl: "https://res.cloudinary.com/dun0ibkj0/video/upload/v1782048312/We_ensure_everything_is_delivered_safely_and_ontime._qualitymoving_gma9sv.mp4"
  },
  {
    id: "2",
    title: "FTL vs LTL: A Cost Calculator for Kenyan SMEs",
    excerpt: "Understanding when dedicated freight capacity actually pays for itself. We break down the costs, benefits, and optimal use cases for Full Truckload vs Less-Than-Truckload shipping.",
    content: "For Kenyan SMEs, choosing between FTL and LTL shipping can significantly impact your bottom line. This analysis helps you make the right choice for your business...",
    author: "Logistics Experts",
    date: "2026-06-10",
    readTime: "6 min read",
    category: "Freight Tips",
    image: "https://res.cloudinary.com/dun0ibkj0/image/upload/v1783168334/IMG_9402_ahqlhj.heic",
    slug: "ftl-vs-ltl-cost-calculator",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-truck-driving-on-a-highway-at-sunset-4157-large.mp4"
  },
  {
    id: "3",
    title: "Cold Chain in East Africa: 2026 Outlook",
    excerpt: "What pharmaceutical and agricultural shippers should plan for next quarter. Analysis of infrastructure developments, regulatory changes, and market opportunities.",
    content: "The cold chain logistics sector in East Africa is undergoing rapid transformation. Here's what shippers need to know about the coming changes...",
    author: "Industry Analysts",
    date: "2026-06-05",
    readTime: "10 min read",
    category: "Industry Insights",
    image: "https://res.cloudinary.com/dun0ibkj0/image/upload/v1783168331/IMG_7610_eyrrem.heic",
    slug: "cold-chain-east-africa-2026",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-warehouse-worker-loading-a-box-43512-large.mp4"
  },
  {
    id: "4",
    title: "Cross-Border Tips: Malaba & Busia Border Posts",
    excerpt: "Documents, dwell times, and how to avoid demurrage at Kenya's busiest border crossings. Essential guide for freight forwarders and shippers.",
    content: "Navigating cross-border logistics in East Africa requires proper documentation and strategic planning. Here's your guide to smooth crossings at Malaba and Busia...",
    author: "Customs Specialists",
    date: "2026-05-28",
    readTime: "7 min read",
    category: "Cross-Border",
    image: "https://res.cloudinary.com/dun0ibkj0/image/upload/v1783168331/IMG_7583.JPG_xptn3e.jpg",
    slug: "cross-border-tips-malaba-busia",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cargo-ship-in-the-ocean-4063-large.mp4"
  },
  {
    id: "5",
    title: "Office Relocation: Minimizing Downtime During Business Moves",
    excerpt: "Strategies for weekend and after-hours moves that ensure your team walks into a fully operational workspace on Monday morning.",
    content: "Office relocations don't have to disrupt your business operations. With proper planning and the right logistics partner, you can achieve seamless transitions...",
    author: "Corporate Moving Team",
    date: "2026-05-20",
    readTime: "5 min read",
    category: "Office Moving",
    image: "https://res.cloudinary.com/dun0ibkj0/image/upload/v1781871712/IMG_7054_fw6mbe.jpg",
    slug: "office-relocation-minimizing-downtime",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-office-workers-moving-boxes-4847-large.mp4"
  },
  {
    id: "6",
    title: "Understanding Goods in Transit Insurance in Kenya",
    excerpt: "What every shipper should know about GIT coverage, limits, exclusions, and claims process for protecting your cargo during transit.",
    content: "Goods in Transit insurance is a critical component of logistics risk management. This guide explains everything you need to know about protecting your shipments...",
    author: "Insurance Experts",
    date: "2026-05-15",
    readTime: "9 min read",
    category: "Insurance",
    image: "https://res.cloudinary.com/dun0ibkj0/image/upload/v1783168324/IMG_6381_dthvmz.heic",
    slug: "goods-in-transit-insurance-kenya",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-truck-on-the-road-at-night-4098-large.mp4"
  }
];

const CATEGORIES = ["All", "Moving Tips", "Freight Tips", "Industry Insights", "Cross-Border", "Office Moving", "Insurance"];

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Prefetch all post images on mount
  usePrefetchImages(BLOG_POSTS.map((p) => p.image));

  const filteredPosts = selectedCategory === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <main>
        {/* Hero Section */}
        <section className="relative isolate flex min-h-[60svh] items-center overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0A192F] via-[#0A2A4A] to-[#0A192F]" />
          <div className="absolute inset-0 bg-grid opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-96 max-w-5xl bg-gradient-aqua opacity-[0.10] blur-[140px]" />
          
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-aqua" />
              Topmark Insights
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Logistics & Moving
              <span className="block text-gradient-aqua">Expert Guides</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/70 sm:text-xl">
              Industry analysis, household moving checklists, commercial supply-chain tips, and expert insights from Kenya's logistics leaders.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b border-white/10 bg-[#0A192F]/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto py-4">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-aqua text-[#0A192F]"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group cursor-pointer flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={optimizeImageUrl(post.image)}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full bg-gradient-aqua px-3 py-1 text-xs font-medium text-[#0A192F]">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-4 text-xs text-white/60 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="mb-2 font-display text-lg font-semibold text-white group-hover:text-gradient-aqua transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="mb-4 flex-1 text-sm text-white/70 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <User className="h-3.5 w-3.5" />
                        {post.author}
                      </div>
                      <div className="inline-flex items-center gap-1 text-sm font-medium text-[var(--aqua-deep)] group-hover:gap-2 transition-all">
                        Watch Video <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#0A192F]">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Need Logistics Support?
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Get expert help with your moving or freight needs. Our team is available 24/7.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="/quote"
                className="inline-flex items-center justify-center rounded-md bg-gradient-aqua px-6 py-3 text-sm font-medium text-[#0A192F] transition-colors hover:bg-gradient-aqua/90"
              >
                Get a Free Quote
              </a>
              <a
                href="tel:+254719174393"
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Call +254 719 174 393
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Blog Post Video Modal */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-3xl bg-[#0A192F] border-white/10 text-white">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-white text-xl">{selectedPost.title}</DialogTitle>
              </DialogHeader>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                <video
                  src={selectedPost.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-4 text-xs text-white/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(selectedPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {selectedPost.readTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {selectedPost.author}
                  </div>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">
                  {selectedPost.content}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Blog;
