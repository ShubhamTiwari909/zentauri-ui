import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Divider } from "@zentauri-ui/zentauri-components/ui/divider";

export function DividerExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Vertical divider between two columns.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`Divider · orientation · vertical, appearance · default`)}
<div className="flex h-24 items-stretch gap-4">
  <span className="text-sm text-slate-800 dark:text-slate-300">Left</span>
  <Divider orientation="vertical" appearance="default" />
  <span className="text-sm text-slate-800 dark:text-slate-300">Right</span>
</div>`}
        >
          <div className="flex h-24 items-stretch gap-4">
            <span className="text-sm text-slate-800 dark:text-slate-300">
              Left
            </span>
            <Divider orientation="vertical" appearance="default" />
            <span className="text-sm text-slate-800 dark:text-slate-300">
              Right
            </span>
          </div>
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
