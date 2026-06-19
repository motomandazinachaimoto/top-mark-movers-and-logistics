import { useEffect, useState } from "react";
import {
  Home,
  Container,
  MapPin,
  Package,
  User,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const STEPS = ["Service", "Route", "Payload", "Contact"] as const;
const EVENT = "topmark:open-quote";

export function openQuote() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(EVENT));
  }
}

type Props = {
  children?: React.ReactNode;
  className?: string;
  asChild?: boolean;
};

export function QuoteButton({ children = "Get Quote", className = "btn-aqua btn-aqua-hover" }: Props) {
  return (
    <button type="button" onClick={openQuote} className={className}>
      {children}
    </button>
  );
}

export function QuoteDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(EVENT, onOpen);
    return () => window.removeEventListener(EVENT, onOpen);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-2xl border-white/10 bg-[rgba(10,25,47,0.96)] p-0 text-white shadow-2xl backdrop-blur-2xl sm:rounded-3xl"
      >
        <DialogTitle className="sr-only">Get a Quote</DialogTitle>
        <DialogDescription className="sr-only">
          Tell us about your move in four quick steps and we will respond within one business hour.
        </DialogDescription>
        <QuoteForm onDone={() => setTimeout(() => setOpen(false), 1800)} />
      </DialogContent>
    </Dialog>
  );
}

function QuoteForm({ onDone }: { onDone?: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    kind: "" as "moving" | "freight" | "",
    origin: "",
    destination: "",
    weight: "",
    commodity: "",
    temp: "ambient",
    name: "",
    email: "",
    phone: "",
    date: "",
  });

  const progress = ((step + 1) / STEPS.length) * 100;
  const can = (() => {
    if (step === 0) return !!data.kind;
    if (step === 1) return data.origin.trim().length > 1 && data.destination.trim().length > 1;
    if (step === 2) return data.weight.trim().length > 0;
    if (step === 3) return data.name && /.+@.+\..+/.test(data.email) && data.phone;
    return false;
  })();

  return (
    <div className="relative overflow-hidden p-6 sm:p-8">
      <div className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-gradient-aqua opacity-20 blur-3xl" />

      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/55">
          <span>Step {step + 1} of {STEPS.length} · {STEPS[step]}</span>
          <span className="text-[var(--aqua)]">{Math.round(progress)}%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-aqua shadow-glow ease-premium transition-[width] duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {done ? (
        <div className="py-10 text-center animate-rise">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-aqua shadow-glow">
            <Check className="h-7 w-7 text-[#0A192F]" />
          </div>
          <h3 className="mt-5 font-display text-2xl font-bold text-white">Request received.</h3>
          <p className="mt-2 text-white/70">
            A Topmark coordinator will reach out to {data.email} within one business hour.
          </p>
        </div>
      ) : (
        <>
          {step === 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 animate-rise">
              {[
                { id: "moving", icon: Home, title: "Moving House", desc: "Home or office relocation, packing & setup." },
                { id: "freight", icon: Container, title: "Commercial Freight", desc: "Road, ocean or air cargo shipping." },
              ].map((o) => {
                const isSel = data.kind === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setData({ ...data, kind: o.id as "moving" | "freight" })}
                    className={`group relative overflow-hidden rounded-2xl border p-5 text-left ease-premium transition-all duration-500 ${
                      isSel
                        ? "border-[var(--aqua)] bg-[rgba(0,242,254,0.06)] shadow-glow"
                        : "border-white/10 bg-white/[0.02] hover:border-white/30"
                    }`}
                  >
                    <o.icon className={`h-8 w-8 ease-premium transition-all duration-500 ${isSel ? "text-[var(--aqua)] scale-110" : "text-white/70"}`} />
                    <div className="mt-3 font-display text-base font-semibold text-white">{o.title}</div>
                    <div className="mt-1 text-xs text-white/60">{o.desc}</div>
                  </button>
                );
              })}
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 animate-rise">
              <Field icon={MapPin} label="From" value={data.origin} onChange={(v) => setData({ ...data, origin: v })} placeholder="e.g. Nairobi" />
              <Field icon={MapPin} label="To" value={data.destination} onChange={(v) => setData({ ...data, destination: v })} placeholder="e.g. Mombasa" />
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 animate-rise">
              <Field icon={Package} label="Size / Weight" value={data.weight} onChange={(v) => setData({ ...data, weight: v })} placeholder="e.g. 3-bedroom or 12 tons" />
              <Field icon={Package} label="What are you moving?" value={data.commodity} onChange={(v) => setData({ ...data, commodity: v })} placeholder="e.g. household items" />
              <div className="sm:col-span-2">
                <label className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/55">Temperature</label>
                <div className="grid grid-cols-3 gap-2">
                  {["ambient", "chilled", "frozen"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setData({ ...data, temp: t })}
                      className={`rounded-xl border px-3 py-3 text-sm capitalize ease-premium transition-all duration-500 ${
                        data.temp === t
                          ? "border-[var(--aqua)] bg-[rgba(0,242,254,0.08)] text-white"
                          : "border-white/10 bg-white/[0.02] text-white/65 hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 animate-rise">
              <Field icon={User} label="Full Name" value={data.name} onChange={(v) => setData({ ...data, name: v })} placeholder="Jane Doe" />
              <Field icon={User} label="Email" type="email" value={data.email} onChange={(v) => setData({ ...data, email: v })} placeholder="jane@company.com" />
              <Field icon={User} label="Phone" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} placeholder="+254 700 000 000" />
              <Field icon={User} label="Moving Date" type="date" value={data.date} onChange={(v) => setData({ ...data, date: v })} />
            </div>
          )}

          <div className="mt-7 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="btn-ghost btn-ghost-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={() => can && setStep((s) => s + 1)}
                disabled={!can}
                className="btn-aqua btn-aqua-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (!can) return;
                  setDone(true);
                  onDone?.();
                }}
                disabled={!can}
                className="btn-aqua btn-aqua-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send Request <Check className="h-4 w-4" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/55">{label}</span>
      <div className="group relative flex items-center rounded-xl border border-white/10 bg-white/[0.02] ease-premium transition-all duration-500 focus-within:border-[var(--aqua)] focus-within:bg-[rgba(0,242,254,0.04)] focus-within:shadow-glow">
        <Icon className="ml-3.5 h-4 w-4 text-white/40 group-focus-within:text-[var(--aqua)]" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, 200))}
          placeholder={placeholder}
          maxLength={200}
          className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none"
          style={{ minHeight: 44 }}
        />
      </div>
    </label>
  );
}
