import { useState } from "react";
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

const STEPS = ["Service", "Route", "Payload", "Contact"] as const;

export function QuoteWizard() {
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
    <section id="quote" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-aqua" /> Smart Quote
            </span>
            <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Price your move in <span className="text-gradient-aqua">under 60 seconds.</span>
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Tell us what you're moving and where it's going. Our enterprise
              estimation engine returns an instant cost band, then loops in a
              dedicated logistics architect within one business hour.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/75">
              {[
                "Instant cost range across all modalities",
                "Dedicated account architect within 1 hour",
                "ISO-compliant, fully insured shipments",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-aqua text-[#0A192F]">
                    <Check className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 reveal">
            <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8">
              {/* Progress */}
              <div className="mb-8">
                <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/55">
                  <span>
                    Step {step + 1} of {STEPS.length} · {STEPS[step]}
                  </span>
                  <span className="text-[var(--aqua)]">{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-gradient-aqua shadow-glow ease-premium transition-[width] duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {done ? (
                <div className="py-12 text-center animate-rise">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-aqua shadow-glow">
                    <Check className="h-8 w-8 text-[#0A192F]" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-white">
                    Request received.
                  </h3>
                  <p className="mt-2 text-white/70">
                    A Topmark logistics architect will reach out to {data.email}{" "}
                    within one business hour.
                  </p>
                </div>
              ) : (
                <>
                  {step === 0 && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-rise">
                      {[
                        { id: "moving", icon: Home, title: "Moving Houses", desc: "Residential or office relocation, packing & mounting." },
                        { id: "freight", icon: Container, title: "Commercial Freight", desc: "Road, ocean, air or intermodal cargo shipping." },
                      ].map((o) => {
                        const isSel = data.kind === o.id;
                        return (
                          <button
                            key={o.id}
                            onClick={() => setData({ ...data, kind: o.id as "moving" | "freight" })}
                            className={`group relative overflow-hidden rounded-2xl border p-6 text-left ease-premium transition-all duration-500 ${
                              isSel
                                ? "border-[var(--aqua)] bg-[rgba(0,242,254,0.06)] shadow-glow"
                                : "border-white/10 bg-white/[0.02] hover:border-white/30"
                            }`}
                            style={{ minHeight: 180 }}
                          >
                            <o.icon
                              className={`h-10 w-10 ease-premium transition-all duration-500 ${
                                isSel ? "text-[var(--aqua)] scale-110" : "text-white/70 group-hover:text-white"
                              }`}
                            />
                            <div className="mt-4 font-display text-lg font-semibold text-white">
                              {o.title}
                            </div>
                            <div className="mt-1.5 text-sm text-white/60">{o.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-rise">
                      <Field
                        icon={MapPin}
                        label="Origin City / Port"
                        value={data.origin}
                        onChange={(v) => setData({ ...data, origin: v })}
                        placeholder="e.g. Mombasa, KE"
                      />
                      <Field
                        icon={MapPin}
                        label="Destination City / Port"
                        value={data.destination}
                        onChange={(v) => setData({ ...data, destination: v })}
                        placeholder="e.g. Rotterdam, NL"
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-rise">
                      <Field
                        icon={Package}
                        label="Weight / Volume"
                        value={data.weight}
                        onChange={(v) => setData({ ...data, weight: v })}
                        placeholder="e.g. 12 tons or 40ft container"
                      />
                      <Field
                        icon={Package}
                        label="Commodity Type"
                        value={data.commodity}
                        onChange={(v) => setData({ ...data, commodity: v })}
                        placeholder="e.g. electronics, pharma"
                      />
                      <div className="sm:col-span-2">
                        <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
                          Temperature Constraint
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {["ambient", "chilled", "frozen"].map((t) => (
                            <button
                              key={t}
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
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-rise">
                      <Field
                        icon={User}
                        label="Full Name"
                        value={data.name}
                        onChange={(v) => setData({ ...data, name: v })}
                        placeholder="Jane Okonkwo"
                      />
                      <Field
                        icon={User}
                        label="Corporate Email"
                        type="email"
                        value={data.email}
                        onChange={(v) => setData({ ...data, email: v })}
                        placeholder="jane@company.com"
                      />
                      <Field
                        icon={User}
                        label="Phone Number"
                        value={data.phone}
                        onChange={(v) => setData({ ...data, phone: v })}
                        placeholder="+254 700 000 000"
                      />
                      <Field
                        icon={User}
                        label="Date of Movement"
                        type="date"
                        value={data.date}
                        onChange={(v) => setData({ ...data, date: v })}
                      />
                    </div>
                  )}

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      disabled={step === 0}
                      className="btn-ghost btn-ghost-hover disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                    {step < STEPS.length - 1 ? (
                      <button
                        onClick={() => can && setStep((s) => s + 1)}
                        disabled={!can}
                        className="btn-aqua btn-aqua-hover disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Continue <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => can && setDone(true)}
                        disabled={!can}
                        className="btn-aqua btn-aqua-hover disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Submit Request <Check className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
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
      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
        {label}
      </span>
      <div className="group relative flex items-center rounded-xl border border-white/10 bg-white/[0.02] ease-premium transition-all duration-500 focus-within:border-[var(--aqua)] focus-within:bg-[rgba(0,242,254,0.04)] focus-within:shadow-glow">
        <Icon className="ml-3.5 h-4 w-4 text-white/40 group-focus-within:text-[var(--aqua)]" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, 200))}
          placeholder={placeholder}
          maxLength={200}
          className="w-full bg-transparent px-3 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none"
          style={{ minHeight: 48 }}
        />
      </div>
    </label>
  );
}
