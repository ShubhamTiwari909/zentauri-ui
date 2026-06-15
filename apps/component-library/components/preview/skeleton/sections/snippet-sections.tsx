import { Section } from "@/components/common/Section";

import { SkeletonPlayground } from "./components/playground";

export function SkeletonCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Skeleton variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Pick an appearance, size, radius, animation, and shimmer tone to preview
        the skeleton live. Toggle Show output / Show code and the snippet
        updates to match the selected variant.
      </p>
      <SkeletonPlayground />
    </Section>
  );
}
