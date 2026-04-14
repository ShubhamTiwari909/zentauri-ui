"use client";

import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TooltipHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Overlay
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Tooltips for hints on hover or focus.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Delayed reveal, keyboard-friendly triggers, and compact surfaces with
            optional arrows.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Tooltip delayMs={150}>
          <TooltipTrigger className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white outline-none transition hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-cyan-400/50">
            Hover or focus me
          </TooltipTrigger>
          <TooltipContent placement="top" appearance="glass">
            <TooltipArrow />
            Shortcuts: ⌘S to save, ⌘K to search.
          </TooltipContent>
        </Tooltip>
      </div>
    </section>
  );
}
