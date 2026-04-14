"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Progress } from "@/components/ui/progress";

export function ProgressExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Striped and animated track treatment.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`appearance · emerald, striped · true, animated · true, value · 65`)}<Progress value={65} appearance="emerald" striped animated />`}
        >
          <Progress value={65} appearance="emerald" striped animated />
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
