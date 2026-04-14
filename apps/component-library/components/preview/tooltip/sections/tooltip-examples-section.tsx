"use client";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TooltipExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Primary tone for emphasis on critical controls.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`<Tooltip>
  <TooltipTrigger>Deploy</TooltipTrigger>
  <TooltipContent appearance="primary" size="lg">
    Runs checks before shipping to production.
  </TooltipContent>
</Tooltip>`}
        >
          <Tooltip>
            <TooltipTrigger className="rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 text-sm text-cyan-100 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50">
              Deploy
            </TooltipTrigger>
            <TooltipContent appearance="primary" size="lg" placement="bottom">
              Runs checks before shipping to production.
            </TooltipContent>
          </Tooltip>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
