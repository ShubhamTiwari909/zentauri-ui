import { Button } from "@/components/ui/buttons/button";
import { sizeButtons } from "../variants";

export function ButtonSizesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
            Sizes
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Default button sizes
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          The component keeps the native button API, so you can still pass `type`,
          `disabled`, `onClick`, ARIA attributes, and any other standard button props
          alongside the library variants.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {sizeButtons.map((button) => (
          <Button key={button.label} size={button.size} appearance="outline">
            {button.label}
          </Button>
        ))}
      </div>
    </section>
  );
}
