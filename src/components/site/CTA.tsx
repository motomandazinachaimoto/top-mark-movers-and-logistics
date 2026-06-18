import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-strong relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16 sm:py-24 reveal">
          <div className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-64 w-2/3 bg-gradient-aqua opacity-30 blur-[120px]" />
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Your next shipment is <span className="text-gradient-aqua">one conversation away.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Talk to a logistics architect today. Same-day quotes for time-sensitive freight and white-glove relocations.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="#quote" className="btn-aqua btn-aqua-hover">
              Start a Quote <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn-ghost btn-ghost-hover">
              Speak to Operations
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
