import { useEffect, useState } from "react";
import {
  Home,
  Container,
  Truck,
  MapPin,
  Package,
  User,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  Building2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const OFFICE_PHONE = "+254719 174393";
const OFFICE_WHATSAPP = "+254719 174393";
const OFFICE_EMAIL = "info@topmarkmovers.com";

const STEPS = ["Service", "Details", "Contact"] as const;
const EVENT = "topmark:open-quote";

export type QuoteKind = "moving" | "office" | "freight";

export function openQuote(opts?: { kind?: QuoteKind } | unknown) {
  if (typeof window !== "undefined") {
    const detail =
      opts && typeof opts === "object" && "kind" in (opts as Record<string, unknown>)
        ? { kind: (opts as { kind?: QuoteKind }).kind }
        : {};
    window.dispatchEvent(new CustomEvent(EVENT, { detail }));
  }
}

export function QuoteButton({
  children = "Get Quote",
  className = "btn-aqua btn-aqua-hover",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={openQuote} className={className}>
      {children}
    </button>
  );
}

type Kind = "moving" | "office" | "freight" | "";
type Method = "call" | "whatsapp" | "email" | "";

export function QuoteDialog() {
  const [open, setOpen] = useState(false);
  const [presetKind, setPresetKind] = useState<QuoteKind | "">("");

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail as { kind?: QuoteKind } | undefined;
      setPresetKind(detail?.kind ?? "");
      setOpen(true);
    };
    window.addEventListener(EVENT, onOpen);
    return () => window.removeEventListener(EVENT, onOpen);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl border-white/10 bg-[rgba(10,25,47,0.96)] p-0 text-white shadow-2xl backdrop-blur-2xl sm:rounded-3xl">
        <DialogTitle className="sr-only">Get a Quote</DialogTitle>
        <DialogDescription className="sr-only">
          Tell us about your move and pick how you want us to reply.
        </DialogDescription>
        <QuoteForm key={open ? `open-${presetKind}` : "closed"} presetKind={presetKind || undefined} onDone={() => setTimeout(() => setOpen(false), 1800)} />
      </DialogContent>
    </Dialog>
  );
}

function QuoteForm({ onDone, presetKind }: { onDone?: () => void; presetKind?: QuoteKind }) {
  const [step, setStep] = useState(presetKind ? 1 : 0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    kind: (presetKind ?? "") as Kind,
    // House moving
    bedrooms: "",
    // Office / commercial business
    businessType: "",
    // Freight
    goods: "",
    // Common
    origin: "",
    destination: "",
    date: "",
    // Contact
    name: "",
    phone: "",
    email: "",
    method: "" as Method,
    notes: "",
  });

  const progress = ((step + 1) / STEPS.length) * 100;
  const isHouse = data.kind === "moving";
  const isOffice = data.kind === "office";
  const isFreight = data.kind === "freight";

  const can = (() => {
    if (step === 0) return !!data.kind;
    if (step === 1) {
      const route = data.origin.trim().length > 1 && data.destination.trim().length > 1;
      if (isHouse) return route && data.bedrooms.trim().length > 0;
      if (isOffice) return route && data.businessType.trim().length > 1;
      if (isFreight) return route && data.goods.trim().length > 1;
      return false;
    }
    if (step === 2) {
      if (!data.name.trim() || !data.method) return false;
      if (data.method === "email") return /.+@.+\..+/.test(data.email);
      if (data.method === "call") return true;
      return data.phone.trim().length >= 7;
    }
    return false;
  })();

  const submit = () => {
    if (!can) return;
    const kindLabel =
      data.kind === "moving" ? "House Moving" : data.kind === "office" ? "Office / Commercial Relocation" : "Commercial Freight";
    const lines = [
      `Hello Topmark, I would like a quote.`,
      ``,
      `Service: ${kindLabel}`,
      isHouse ? `House size: ${data.bedrooms}` : "",
      isOffice ? `Business type: ${data.businessType}` : "",
      isFreight ? `Goods: ${data.goods}` : "",
      `From: ${data.origin}`,
      `To: ${data.destination}`,
      data.date ? `Preferred date: ${data.date}` : "",
      ``,
      `Name: ${data.name}`,
      data.phone ? `Phone: ${data.phone}` : "",
      data.email ? `Email: ${data.email}` : "",
    ].filter(Boolean);
    const message = lines.join("\n");

    if (typeof window !== "undefined") {
      if (data.method === "call") {
        window.location.href = `tel:${OFFICE_PHONE}`;
      } else if (data.method === "whatsapp") {
        window.open(
          `https://wa.me/${OFFICE_WHATSAPP}?text=${encodeURIComponent(message)}`,
          "_blank",
          "noopener,noreferrer",
        );
      } else if (data.method === "email") {
        const subject = `Quote request — ${kindLabel}`;
        window.location.href = `mailto:${OFFICE_EMAIL}?subject=${encodeURIComponent(
          subject,
        )}&body=${encodeURIComponent(message)}`;
      }
    }
    setDone(true);
    onDone?.();
  };


  return (
    <div className="relative overflow-hidden p-6 sm:p-8">
      <div className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-gradient-aqua opacity-20 blur-3xl" />

      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/55">
          <span>
            Step {step + 1} of {STEPS.length} · {STEPS[step]}
          </span>
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
        <div className="animate-rise py-10 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-aqua shadow-glow">
            <Check className="h-7 w-7 text-[#0A192F]" />
          </div>
          <h3 className="mt-5 font-display text-2xl font-bold text-white">Request received.</h3>
          <p className="mt-2 text-white/70">
            A Topmark coordinator will reach out by{" "}
            <span className="text-[var(--aqua)]">{labelFor(data.method)}</span> within one business hour.
          </p>
        </div>
      ) : (
        <>
          {step === 0 && (
            <div className="animate-rise grid grid-cols-1 gap-3 sm:grid-cols-3">
              {([
                { id: "moving", icon: Home, title: "House Moving", desc: "Residential relocation." },
                { id: "office", icon: Truck, title: "Office Moving", desc: "Corporate relocation." },
                { id: "freight", icon: Container, title: "Commercial Freight", desc: "Goods & cargo transport." },
              ] as const).map((o) => {
                const isSel = data.kind === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setData({ ...data, kind: o.id })}
                    className={`group relative overflow-hidden rounded-2xl border p-5 text-left ease-premium transition-all duration-500 ${
                      isSel
                        ? "border-[var(--aqua)] bg-[rgba(0,242,254,0.06)] shadow-glow"
                        : "border-white/10 bg-white/[0.02] hover:border-white/30"
                    }`}
                  >
                    <o.icon
                      className={`h-8 w-8 ease-premium transition-all duration-500 ${
                        isSel ? "scale-110 text-[var(--aqua)]" : "text-white/70"
                      }`}
                    />
                    <div className="mt-3 font-display text-base font-semibold text-white">{o.title}</div>
                    <div className="mt-1 text-xs text-white/60">{o.desc}</div>
                  </button>
                );
              })}
            </div>
          )}

          {step === 1 && isHouse && (
            <div className="animate-rise grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/55">
                  House size
                </label>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {["Studio", "1 Bed", "2 Bed", "3 Bed", "4 Bed", "5+ Bed"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setData({ ...data, bedrooms: t })}
                      className={`rounded-xl border px-2 py-3 text-sm ease-premium transition-all duration-500 ${
                        data.bedrooms === t
                          ? "border-[var(--aqua)] bg-[rgba(0,242,254,0.08)] text-white"
                          : "border-white/10 bg-white/[0.02] text-white/65 hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <Field icon={MapPin} label="Pick-up location" value={data.origin} onChange={(v) => setData({ ...data, origin: v })} placeholder="e.g. Kilimani, Nairobi" />
              <Field icon={MapPin} label="New location" value={data.destination} onChange={(v) => setData({ ...data, destination: v })} placeholder="e.g. Karen, Nairobi" />
              <Field icon={Package} label="Moving date" type="date" value={data.date} onChange={(v) => setData({ ...data, date: v })} />
            </div>
          )}

          {step === 1 && isOffice && (
            <div className="animate-rise grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field icon={Building2} label="Type / nature of business" value={data.businessType} onChange={(v) => setData({ ...data, businessType: v })} placeholder="e.g. Retail shop, Law firm, Clinic" />
              <Field icon={Package} label="Preferred move date" type="date" value={data.date} onChange={(v) => setData({ ...data, date: v })} />
              <Field icon={MapPin} label="From (current address)" value={data.origin} onChange={(v) => setData({ ...data, origin: v })} placeholder="e.g. Westlands, Nairobi" />
              <Field icon={MapPin} label="To (new address)" value={data.destination} onChange={(v) => setData({ ...data, destination: v })} placeholder="e.g. Upper Hill, Nairobi" />
            </div>
          )}

          {step === 1 && isFreight && (
            <div className="animate-rise grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field icon={Package} label="What goods are you transporting?" value={data.goods} onChange={(v) => setData({ ...data, goods: v })} placeholder="e.g. 12 tons of cement bags" />
              <Field icon={Package} label="Pick-up date" type="date" value={data.date} onChange={(v) => setData({ ...data, date: v })} />
              <Field icon={MapPin} label="From" value={data.origin} onChange={(v) => setData({ ...data, origin: v })} placeholder="e.g. Mombasa Port" />
              <Field icon={MapPin} label="To" value={data.destination} onChange={(v) => setData({ ...data, destination: v })} placeholder="e.g. Nairobi ICD" />
            </div>
          )}

          {step === 2 && (
            <div className="animate-rise space-y-4">
              <Field icon={User} label="Full Name" value={data.name} onChange={(v) => setData({ ...data, name: v })} placeholder="Jane Doe" />

              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/55">
                  How should we reply?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { id: "call", icon: Phone, label: "Call" },
                    { id: "whatsapp", icon: MessageCircle, label: "WhatsApp" },
                    { id: "email", icon: Mail, label: "Email" },
                  ] as const).map((m) => {
                    const isSel = data.method === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setData({ ...data, method: m.id })}
                        className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-4 text-sm ease-premium transition-all duration-500 ${
                          isSel
                            ? "border-[var(--aqua)] bg-[rgba(0,242,254,0.08)] text-white shadow-glow"
                            : "border-white/10 bg-white/[0.02] text-white/70 hover:text-white"
                        }`}
                      >
                        <m.icon className={`h-5 w-5 ${isSel ? "text-[var(--aqua)]" : ""}`} />
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {data.method === "email" ? (
                <Field icon={Mail} label="Email address" type="email" value={data.email} onChange={(v) => setData({ ...data, email: v })} placeholder="jane@company.com" />
              ) : data.method === "whatsapp" ? (
                <Field icon={Phone} label="WhatsApp number" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} placeholder="+254 700 000 000" />
              ) : data.method === "call" ? (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/70">
                  Tapping <span className="text-white">Send Request</span> will dial our office line{" "}
                  <a href={`tel:${OFFICE_PHONE}`} className="text-[var(--aqua)]">+254 719 174 393</a> on your device.
                </div>
              ) : null}
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
                onClick={submit}
                disabled={!can}
                className="btn-aqua btn-aqua-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {data.method === "call" ? "Call Office" : data.method === "whatsapp" ? "Send on WhatsApp" : data.method === "email" ? "Send Email" : "Send Request"} <Check className="h-4 w-4" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function labelFor(m: Method) {
  if (m === "call") return "phone call";
  if (m === "whatsapp") return "WhatsApp";
  if (m === "email") return "email";
  return "your preferred channel";
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
