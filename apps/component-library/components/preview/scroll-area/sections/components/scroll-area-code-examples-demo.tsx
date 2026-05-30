import { ScrollArea } from "@zentauri-ui/zentauri-components/ui/scroll-area";

import type { ScrollAreaDemoProps } from "./scroll-area-code-examples.types";
import { cn } from "@/lib/utils";

const rows = [
  "Design token sync completed",
  "Preview route generated",
  "SEO document attached",
  "Package export verified",
  "Regression suite queued",
  "Release note drafted",
  "CLI registry updated",
  "Homepage health refreshed",
];

const cards = [
  "Preview",
  "Components",
  "Hooks",
  "Charts",
  "Typography",
  "Installation",
  "HTML",
  "CSS",
  "Javascript",
];

export function ScrollAreaDemo({
  appearance = "default",
  orientation = "vertical",
  scrollbar = "auto",
  shadow = false,
  size = "md",
}: ScrollAreaDemoProps) {
  const horizontal = orientation === "horizontal";
  const both = orientation === "both";

  return (
    <ScrollArea
      aria-label="Scroll area variant preview"
      appearance={appearance}
      className={horizontal ? "max-w-full p-3" : "h-64 p-4"}
      orientation={orientation}
      scrollbar={scrollbar}
      shadow={shadow}
      size={size}
      viewportClassName={cn(
        horizontal && "flex gap-3",
        both && "grid grid-cols-3 gap-3",
      )}
    >
      {horizontal || both ? (
        cards.map((card) => (
          <article
            key={card}
            className="rounded-2xl min-w-40 bg-slate-950 p-4 text-white ring-1 ring-white/10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              Surface
            </p>
            <p className="mt-3 text-lg font-semibold">{card}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              A compact card inside a scrollable rail.
            </p>
          </article>
        ))
      ) : (
        <div className="space-y-3">
          {rows.map((row, index) => (
            <div
              key={row}
              className="rounded-xl border border-slate-900/10 bg-white p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              <span className="mr-2 font-semibold text-cyan-600 dark:text-cyan-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              {row}
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
}
