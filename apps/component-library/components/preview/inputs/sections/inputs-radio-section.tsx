import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";
import { appearanceInputsExtended } from "../variants";

const radioSizes = ["sm", "md", "lg"] as const;
const planTiers = ["Starter", "Pro", "Enterprise"] as const;

export function InputsRadioSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
            Radio
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            <code className="text-cyan-200/90">as=&quot;radio&quot;</code>
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          Native{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-cyan-100/90">
            type=&quot;radio&quot;
          </code>{" "}
          uses the same accent mapping when checked; use a shared{" "}
          <code className="text-cyan-100/90">name</code> for mutually exclusive
          options.
        </p>
      </div>
      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Appearances
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {appearanceInputsExtended.map((row) => (
            <label
              key={`rb-${row.label}`}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/5 bg-white/2 px-3 py-2.5 text-sm text-slate-200 transition hover:border-white/10"
            >
              <Input
                as="radio"
                type="radio"
                name={`radio-appearance-${row.appearance}`}
                value={row.appearance}
                size="md"
                appearance={row.appearance}
                defaultChecked={row.appearance === "default"}
                aria-label={`${row.label} radio`}
                className="w-auto shrink-0"
              />
              <span>{row.label}</span>
            </label>
          ))}
        </div>
        <p className="mt-8 text-xs font-medium uppercase tracking-wide text-slate-500">
          Sizes
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-6">
          {radioSizes.map((size) => (
            <label
              key={`rb-size-${size}`}
              className="flex cursor-pointer items-center gap-2 text-xs text-slate-400"
            >
              <Input
                as="radio"
                type="radio"
                name={`radio-size-${size}`}
                value={size}
                size={size}
                appearance="info"
                aria-label={`Radio size ${size}`}
                className="w-auto shrink-0"
              />
              <span className="uppercase tracking-wide">{size}</span>
            </label>
          ))}
        </div>
        <p className="mt-8 text-xs font-medium uppercase tracking-wide text-slate-500">
          Group
        </p>
        <div className="mt-3 grid max-w-md gap-2 rounded-xl border border-white/10 bg-white/2 p-4">
          {planTiers.map((tier, index) => (
            <label
              key={tier}
              className="flex cursor-pointer items-center gap-3 text-sm text-slate-200"
            >
              <Input
                as="radio"
                type="radio"
                name="inputs-preview-plan-tier"
                value={tier.toLowerCase()}
                size="md"
                appearance="violet"
                defaultChecked={index === 1}
                aria-label={`${tier} plan`}
                className="w-auto shrink-0"
              />
              <span>{tier}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
