"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PopoverExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Start placement for right-aligned toolbars.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`PopoverContent · placement · bottom-start, animation · fade, size · sm`)}
<Popover>
  <PopoverTrigger className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200">
    Info
  </PopoverTrigger>
  <PopoverContent placement="bottom-start" animation="fade" size="sm">
    <p className="text-xs text-slate-300">Short contextual help text.</p>
  </PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200">
              Info
            </PopoverTrigger>
            <PopoverContent placement="bottom-start" animation="fade" size="sm">
              <p className="text-xs text-slate-300">Short contextual help text.</p>
            </PopoverContent>
          </Popover>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
