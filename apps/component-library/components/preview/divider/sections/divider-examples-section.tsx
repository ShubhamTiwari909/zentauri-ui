"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Divider } from "@repo/components/ui";

export function DividerExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Vertical divider between two columns.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`Divider · orientation · vertical, appearance · default`)}
<div className="flex h-24 items-stretch gap-4">
  <span className="text-sm text-slate-300">Left</span>
  <Divider orientation="vertical" appearance="default" />
  <span className="text-sm text-slate-300">Right</span>
</div>`}
        >
          <div className="flex h-24 items-stretch gap-4">
            <span className="text-sm text-slate-300">Left</span>
            <Divider orientation="vertical" appearance="default" />
            <span className="text-sm text-slate-300">Right</span>
          </div>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
