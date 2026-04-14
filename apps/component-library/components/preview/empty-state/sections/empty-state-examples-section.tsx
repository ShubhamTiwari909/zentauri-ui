"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { HiCloudArrowUp } from "react-icons/hi2";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";

export function EmptyStateExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Ghost appearance for inline panels.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`appearance · ghost, size · sm, animation · fade, align · start`)}
<EmptyState appearance="ghost" size="sm" animation="fade" align="start">
  <EmptyStateIcon>
    <HiCloudArrowUp className="size-8 text-slate-400" aria-hidden />
  </EmptyStateIcon>
  <EmptyStateTitle>No uploads</EmptyStateTitle>
  <EmptyStateDescription>Drag files here to add them.</EmptyStateDescription>
</EmptyState>`}
        >
          <EmptyState appearance="ghost" animation="fade" align="start" size="sm">
            <EmptyStateIcon>
              <HiCloudArrowUp className="size-8 text-slate-400" aria-hidden />
            </EmptyStateIcon>
            <EmptyStateTitle>No uploads</EmptyStateTitle>
            <EmptyStateDescription>Drag files here to add them.</EmptyStateDescription>
          </EmptyState>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
