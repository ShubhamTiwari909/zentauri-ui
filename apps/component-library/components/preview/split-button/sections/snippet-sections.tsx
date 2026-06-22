import { Section } from "@/components/common/Section";

import { SplitButtonPlayground } from "./components/playground";

export function SplitButtonCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Split button variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a variant, size, or toggle disabled and loading states to preview
        the split button live. Toggle Show output / Show code and the snippet
        updates to match.
      </p>
      <SplitButtonPlayground />
    </Section>
  );
}
