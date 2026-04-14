"use client";

import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PopoverHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Overlay
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Popovers for lightweight context.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Anchored floating panels with placement controls, optional arrow, and
            motion aligned with dropdowns.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Popover>
          <PopoverTrigger className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15">
            Show details
          </PopoverTrigger>
          <PopoverContent placement="bottom" animation="scale" appearance="glass">
            <PopoverArrow />
            <p className="text-sm text-slate-200">
              Popovers stay attached to their trigger while you scan dense UIs.
            </p>
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
}
