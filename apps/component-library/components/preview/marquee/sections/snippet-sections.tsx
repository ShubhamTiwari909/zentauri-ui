import { Section } from "@/components/common/Section";

import { MarqueePlayground } from "./components/playground";

export function MarqueeCodeExamplesSection() {
  return (
    <Section className="max-w-7xl">
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Marquee variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick an appearance, size, orientation, direction, and behavior to
        preview the marquee live. Toggle Show output / Show code and the snippet
        updates to match the selected variant.
      </p>
      <MarqueePlayground />
    </Section>
  );
}
