import { Section } from "@/components/common/Section";

import { ScrollAreaPlayground } from "./components/playground";

export function ScrollAreaCodeExamplesSection() {
  return (
    <Section className="max-w-7xl">
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Scroll Area variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick an appearance, size, orientation, scrollbar, and shadow to preview
        the scroll area live. Toggle Show output / Show code and the snippet
        updates to match the selected variant.
      </p>
      <ScrollAreaPlayground />
    </Section>
  );
}
