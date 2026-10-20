"use client";
import { useState } from "react";
import {
  ZuiElectricBorder,
  type ElectricBorderProps,
} from "@zentauri-ui/zentauri-components/ui/electric-border";
import { cn } from "@/lib/utils";

export function ElectricBorderDemo(props: ElectricBorderProps) {
  const [signals, setSignals] = useState(0);
  return (
    <ZuiElectricBorder
      {...props}
      className={cn("w-full max-w-lg", props.className)}
    >
      <div className="rounded-[inherit] bg-white p-6 text-slate-900 sm:p-8 dark:bg-[#0b1422] dark:text-slate-100">
        <div className="flex items-center justify-between gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          <span>Zentauri / Current</span>
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
            />
            Online
          </span>
        </div>
        <h3 className="mt-8 text-2xl font-medium tracking-tight sm:text-3xl">
          A little current.
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
          Move along the edge. Send a signal. Your content stays at the center
          of it all.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5 dark:border-white/10">
          <p
            role="status"
            className="font-mono text-xs text-slate-500 dark:text-slate-400"
          >
            {signals
              ? `${String(signals).padStart(2, "0")} signals sent`
              : "Ready when you are"}
          </p>
          <button
            type="button"
            onClick={() => setSignals((value) => value + 1)}
            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-100"
          >
            Send a signal <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </ZuiElectricBorder>
  );
}
