import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@zentauri-ui/zentauri-components/ui/empty-state";
import { HiCloudArrowUp } from "react-icons/hi2";
import { EmptyStateAnimated } from "@zentauri-ui/zentauri-components/ui/empty-state/animated";

export function EmptyStateExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Ghost appearance for inline panels.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`appearance · ghost, size · sm, animation · fade, align · start`)}
<EmptyStateAnimated appearance="ghost" size="sm" animation="fade" align="start">
  <EmptyStateIcon>
    <HiCloudArrowUp className="size-8 text-slate-800 dark:text-slate-400" aria-hidden />
  </EmptyStateIcon>
  <EmptyStateTitle>No uploads</EmptyStateTitle>
  <EmptyStateDescription>Drag files here to add them.</EmptyStateDescription>
</EmptyStateAnimated>`}
        >
          <EmptyStateAnimated
            appearance="ghost"
            animation="fade"
            align="start"
            size="sm"
          >
            <EmptyStateIcon>
              <HiCloudArrowUp
                className="size-8 text-slate-800 dark:text-slate-400"
                aria-hidden
              />
            </EmptyStateIcon>
            <EmptyStateTitle>No uploads</EmptyStateTitle>
            <EmptyStateDescription>
              Drag files here to add them.
            </EmptyStateDescription>
          </EmptyStateAnimated>
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
