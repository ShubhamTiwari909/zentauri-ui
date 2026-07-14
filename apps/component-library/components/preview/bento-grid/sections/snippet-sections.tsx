import { Section } from "@/components/common/Section";

import { BentoGridPlayground } from "./components/playground";

export function BentoGridCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Bento grid variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick columns, gap, animation level, and the featured item&apos;s span
        and appearance to preview the bento grid live. Reflow, bento-expand, and
        morph-to-detail are cumulative layers — toggle Show output / Show code
        and the snippet updates to match.
      </p>
      <BentoGridPlayground />
    </Section>
  );
}
