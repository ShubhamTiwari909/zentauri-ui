"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TRIGGER_SOFT =
  "rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200 outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50";

const TRIGGER_EMPHASIS =
  "rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 text-sm text-cyan-100 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50";

export function TooltipExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Longer hover delay and danger intent for critical controls.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment("Tooltip · delay · 400, position · bottom")}
<Tooltip position="bottom" delay={400}>
  <TooltipTrigger className="${TRIGGER_SOFT}">
    Slow hover
  </TooltipTrigger>
  <TooltipContent variant="outline" size="sm" animation="fade">
    Opens after 400ms on hover; focus still opens immediately.
  </TooltipContent>
</Tooltip>`}
        >
          <Tooltip position="bottom" delay={400}>
            <TooltipTrigger className={TRIGGER_SOFT}>Slow hover</TooltipTrigger>
            <TooltipContent variant="outline" size="sm" animation="fade">
              Opens after 400ms on hover; focus still opens immediately.
            </TooltipContent>
          </Tooltip>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment("TooltipContent · intent · danger, animation · scale")}
<Tooltip position="top">
  <TooltipTrigger className="${TRIGGER_EMPHASIS}">
    Delete row
  </TooltipTrigger>
  <TooltipContent variant="default" size="lg" intent="danger" animation="scale">
    This removes the row for everyone. You cannot undo this action.
  </TooltipContent>
</Tooltip>`}
        >
          <Tooltip position="top">
            <TooltipTrigger className={TRIGGER_EMPHASIS}>Delete row</TooltipTrigger>
            <TooltipContent
              variant="default"
              size="lg"
              intent="danger"
              animation="scale"
            >
              This removes the row for everyone. You cannot undo this action.
            </TooltipContent>
          </Tooltip>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
