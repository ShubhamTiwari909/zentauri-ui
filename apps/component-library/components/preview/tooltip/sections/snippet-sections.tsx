import { Section } from "@/components/common/Section";

import { TooltipPlayground } from "./components/playground";

export function TooltipCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Tooltip variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Pick a content variant, size, width, root position, and animation to
        preview the tooltip live. Toggle Show output / Show code and the snippet
        updates to match the selected variant.
      </p>
      <TooltipPlayground />
    </Section>
  );
}
