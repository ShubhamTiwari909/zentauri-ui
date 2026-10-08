"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { timeTravelInspectorVariants } from "@zentauri-ui/zentauri-components/ui/time-travel-inspector";
import { TimeTravelInspectorDemo } from "./time-travel-inspector-code-examples-demo";
import {
  TIME_TRAVEL_APPEARANCES,
  TIME_TRAVEL_SIZES,
  type InspectorAppearance,
  type InspectorSize,
} from "./time-travel-inspector-code-examples.data";
import { timeTravelInspectorSnippet } from "./time-travel-inspector-code-examples.snippets";

export function TimeTravelInspectorPlayground() {
  const [appearance, setAppearance] = useState<InspectorAppearance>("default");
  const [size, setSize] = useState<InspectorSize>("md");
  return (
    <div className="mt-6 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          Appearance
          <select
            className="rounded-lg border border-slate-300 bg-white p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            value={appearance}
            onChange={(event) =>
              setAppearance(event.target.value as InspectorAppearance)
            }
          >
            {TIME_TRAVEL_APPEARANCES.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Size
          <select
            className="rounded-lg border border-slate-300 bg-white p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            value={size}
            onChange={(event) => setSize(event.target.value as InspectorSize)}
          >
            {TIME_TRAVEL_SIZES.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold">Replay a checkout session</p>
        <PreviewCodeShowcase
          code={timeTravelInspectorSnippet(appearance, size)}
        >
          <TimeTravelInspectorDemo appearance={appearance} size={size} />
        </PreviewCodeShowcase>
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold">All appearances</p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {TIME_TRAVEL_APPEARANCES.map((value) => (
            <button
              type="button"
              key={value}
              aria-pressed={appearance === value}
              aria-label={`Use ${value} appearance`}
              onClick={() => setAppearance(value)}
              className="rounded-xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
            >
              <span
                className={cn(
                  timeTravelInspectorVariants({
                    appearance: value,
                    size: "sm",
                  }),
                  "block p-4",
                  appearance === value && "ring-2 ring-sky-500",
                )}
              >
                <span className="flex justify-between font-semibold">
                  <span>{value}</span>
                  <span aria-hidden="true">
                    {appearance === value ? "✓" : "↗"}
                  </span>
                </span>
                <span
                  className="my-3 flex items-center gap-1"
                  aria-hidden="true"
                >
                  <span className="h-px flex-1 bg-current opacity-20" />
                  <span className="size-2 rounded-full bg-current" />
                  <span className="h-px flex-1 bg-current opacity-20" />
                </span>
                <span className="grid grid-cols-2 gap-2">
                  <span className="rounded border border-current/20 p-2 font-mono">
                    total: 128
                  </span>
                  <span className="rounded border border-current/20 p-2 text-right">
                    $128.00
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
