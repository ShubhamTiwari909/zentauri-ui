"use client";

import { useState } from "react";

import { SlideToComplete } from "@zentauri-ui/zentauri-components/ui/slide-to-complete";

export function SlideToCompleteControlledDemo() {
  const [approved, setApproved] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <SlideToComplete
        appearance={approved ? "success" : "primary"}
        label={approved ? "Approved" : "Slide to approve"}
        success={approved}
        value={approved}
        onValueChange={setApproved}
      />
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-600 dark:text-slate-400">
          Approved:{" "}
          <code className="rounded bg-slate-200 px-1.5 py-0.5 text-cyan-700 dark:bg-slate-950/80 dark:text-cyan-200">
            {approved ? "true" : "false"}
          </code>
        </span>
        <button
          type="button"
          onClick={() => setApproved(false)}
          className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold text-slate-600 transition-colors hover:border-slate-300 dark:border-white/10 dark:text-slate-300 dark:hover:border-white/20"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
