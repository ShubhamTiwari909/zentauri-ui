import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { SkeletonButtonAnimated } from "@zentauri-ui/zentauri-components/ui/skeleton/animated";

export function SkeletonExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Button-shaped skeleton for toolbar placeholders.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`SkeletonButtonAnimated · buttonSize · md, animation · shimmer`)}
<SkeletonButtonAnimated buttonSize="md" className="w-32" animation="shimmer" />`}
        >
          <SkeletonButtonAnimated
            buttonSize="md"
            className="w-32"
            animation="shimmer"
          />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
