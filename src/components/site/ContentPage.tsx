import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import { Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { openQuote } from "@/components/site/QuoteDialog";
import type { PageContent, PageBlock } from "@/lib/pages";
import heroPort from "@/assets/hero-port.jpg";
import heroFleet from "@/assets/hero-fleet.jpg";
import heroAir from "@/assets/hero-air.jpg";
import heroMovers from "@/assets/hero-movers.jpg";

function pickHero(slug: string) {
  const s = slug.toLowerCase();
  if (s.includes("truck") || s.includes("fleet") || s.includes("ftl") || s.includes("ltl") || s.includes("petroleum") || s.includes("industrial")) return heroFleet;
  if (s.includes("air")) return heroAir;
  if (s.includes("ocean") || s.includes("global") || s.includes("project") || s.includes("cold") || s.includes("coverage")) return heroPort;
  if (s.includes("residential") || s.includes("office") || s.includes("packing") || s.includes("mounting") || s.includes("services")) return heroMovers;
  if (s.includes("about") || s.includes("contact") || s.includes("careers") || s.includes("blog") || s.includes("quote")) return heroMovers;
  return heroPort;
}

function Block({ block }: { block: PageBlock }) {
  const light = block.light;
  return (
    <section
      className={`relative py-20 lg:py-28 ${light ? "surface-light" : ""}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(block.eyebrow || block.heading || block.intro) && (
          <div className="mx-auto mb-12 max-w-3xl text-center reveal">
            {block.eyebrow && (
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.2em] ${
                  light
                    ? "border-[#0A192F]/10 bg-[#0A192F]/5 text-[#0A192F]/80"
                    : "border-white/10 bg-white/5 text-white/80"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-aqua" />
                {block.eyebrow}
              </span>
            )}
            {block.heading && (
              <h2
                className={`mt-6 font-display text-3xl font-bold leading-tight sm:text-4xl ${
                  light ? "text-[#0A192F]" : "text-white"
                }`}
              >
                {block.heading}
              </h2>
            )}
            {block.intro && (
              <p
                className={`mt-4 ${light ? "text-[#0A192F]/70" : "text-white/70"}`}
              >
                {block.intro}
              </p>
            )}
          </div>
        )}

        {block.kind === "features" && block.items && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {block.items.map((it, i) => (
              <div
                key={it.title}
                className={`reveal rounded-2xl p-6 ${
                  light
                    ? "card-light card-light-hover"
                    : "glass tilt-card tilt-card-hover"
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div
                  className={`grid h-10 w-10 place-items-center rounded-xl ${
                    light
                      ? "bg-gradient-aqua text-[#0A192F]"
                      : "border border-white/10 bg-white/5 text-[var(--aqua)]"
                  }`}
                >
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div
                  className={`mt-4 font-display text-lg font-semibold ${
                    light ? "text-[#0A192F]" : "text-white"
                  }`}
                >
                  {it.title}
                </div>
                <div
                  className={`mt-2 text-sm leading-relaxed ${
                    light ? "text-[#0A192F]/70" : "text-white/65"
                  }`}
                >
                  {it.desc}
                </div>
                {it.bullets && (
                  <ul className="mt-4 space-y-1.5">
                    {it.bullets.map((b) => (
                      <li
                        key={b}
                        className={`flex items-start gap-2 text-sm ${
                          light ? "text-[#0A192F]/75" : "text-white/70"
                        }`}
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--aqua-deep)]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {block.kind === "checklist" && block.bullets && (
          <div className="mx-auto max-w-3xl reveal">
            <ul className="grid gap-3 sm:grid-cols-2">
              {block.bullets.map((b) => (
                <li
                  key={b}
                  className={`flex items-start gap-3 rounded-xl p-4 ${
                    light
                      ? "card-light"
                      : "glass border border-white/10"
                  }`}
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-aqua text-[#0A192F]">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span
                    className={`text-sm ${light ? "text-[#0A192F]/85" : "text-white/85"}`}
                  >
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {block.kind === "stats" && block.stats && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {block.stats.map((s) => (
              <div
                key={s.label}
                className={`reveal rounded-2xl p-6 text-center ${
                  light ? "card-light" : "glass"
                }`}
              >
                <div
                  className={`font-display text-3xl font-bold tabular-nums sm:text-4xl ${
                    light ? "text-[#0A192F]" : "text-gradient-aqua"
                  }`}
                >
                  {s.value}
                </div>
                <div
                  className={`mt-2 text-xs uppercase tracking-[0.2em] ${
                    light ? "text-[#0A192F]/60" : "text-white/55"
                  }`}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function ContentPage({ page }: { page: PageContent }) {
  const ref = useReveal<HTMLDivElement>();
  const heroImg = pickHero(page.slug);
  return (
    <div ref={ref} className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Header />
      <main>
        {/* Hero with cinematic background */}
        <section className="relative isolate flex min-h-[78svh] items-center overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="absolute inset-0 -z-10">
            <img
              src={heroImg}
              alt=""
              className="h-full w-full animate-kenburns object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/95 via-[#0A192F]/75 to-[#0A192F]/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent" />
          </div>
          <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-96 max-w-5xl bg-gradient-aqua opacity-[0.10] blur-[140px]" />
          <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white/80 animate-rise">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-aqua" />
              {page.eyebrow}
            </span>
            <h1
              className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl animate-rise"
              style={{ animationDelay: "120ms" }}
            >
              {page.title}{" "}
              {page.titleAccent && (
                <span className="text-gradient-aqua">{page.titleAccent}</span>
              )}
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg animate-rise"
              style={{ animationDelay: "240ms" }}
            >
              {page.lede}
            </p>
            {(page.ctaPrimary || page.ctaSecondary) && (
              <div
                className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-rise"
                style={{ animationDelay: "360ms" }}
              >
                {page.ctaPrimary && (
                  <CTALink href={page.ctaPrimary.href} primary>
                    {page.ctaPrimary.label}
                  </CTALink>
                )}
                {page.ctaSecondary && (
                  <CTALink href={page.ctaSecondary.href}>
                    {page.ctaSecondary.label}
                  </CTALink>
                )}
              </div>
            )}
          </div>
        </section>

        {page.blocks.map((b, i) => (
          <Block key={i} block={b} />
        ))}

        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function CTALink({
  href,
  primary,
  children,
}: {
  href: string;
  primary?: boolean;
  children: React.ReactNode;
}) {
  const cls = primary ? "btn-aqua btn-aqua-hover" : "btn-ghost btn-ghost-hover";
  if (href === "/quote" || href === "/#quote") {
    return (
      <button type="button" onClick={openQuote} className={cls}>
        {children}
      </button>
    );
  }
  if (href.startsWith("/") && !href.startsWith("/#")) {
    return (
      <Link to={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}
