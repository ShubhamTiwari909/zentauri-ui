import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";
import { appearanceInputsExtended } from "../variants";

const checkboxSizes = ["sm", "md", "lg"] as const;

export function InputsCheckboxSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
            Checkbox
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            <code className="text-cyan-200/90">as=&quot;checkbox&quot;</code>
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          Native{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-cyan-100/90">
            type=&quot;checkbox&quot;
          </code>{" "}
          with the same <code className="text-cyan-100/90">appearance</code>{" "}
          tokens as text fields; <code className="text-cyan-100/90">size</code>{" "}
          maps to control dimensions.
        </p>
      </div>
      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Appearances
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {appearanceInputsExtended.map((row) => (
            <label
              key={`cb-${row.label}`}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/5 bg-white/2 px-3 py-2.5 text-sm text-slate-200 transition hover:border-white/10"
            >
              <Input
                as="checkbox"
                type="checkbox"
                size="md"
                appearance={row.appearance}
                defaultChecked={row.appearance === "success"}
                aria-label={`${row.label} checkbox`}
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
          {checkboxSizes.map((size) => (
            <label
              key={`cb-size-${size}`}
              className="flex cursor-pointer items-center gap-2 text-xs text-slate-400"
            >
              <Input
                as="checkbox"
                type="checkbox"
                size={size}
                appearance="violet"
                aria-label={`Checkbox size ${size}`}
                className="w-auto shrink-0"
              />
              <span className="uppercase tracking-wide">{size}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
