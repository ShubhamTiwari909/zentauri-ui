import { Section } from "@/components/common/Section";
import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";
import { sizeInputs } from "../variants";

export function InputsSizesSection() {
  return (
    <Section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-200">
            Sizes
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
            sm, md, lg
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-800 dark:text-slate-400">
          Heights align with the button scale. Pass `disabled`, `readOnly`,
          `autoComplete`, and any other native attribute alongside variants.
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {sizeInputs.map((row) => (
          <div key={row.label} className="grid gap-2">
            <span className="text-xs text-slate-800 dark:text-slate-400">
              {row.label}
            </span>
            <Input
              size={row.size}
              placeholder={row.label}
              aria-label={`${row.label} size`}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
