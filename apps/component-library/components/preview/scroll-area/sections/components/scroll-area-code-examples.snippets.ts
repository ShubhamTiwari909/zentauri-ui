import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { ScrollAreaDemoProps } from "./scroll-area-code-examples.types";

function propLine(name: string, value: unknown): string {
  if (value === undefined || value === false) {
    return "";
  }

  if (value === true) {
    return `  ${name}\n`;
  }

  return `  ${name}="${String(value)}"\n`;
}

export function scrollAreaSnippet(opts: ScrollAreaDemoProps): string {
  const orientation = opts.orientation ?? "vertical";
  const isHorizontal = orientation === "horizontal" || orientation === "both";
  const className = isHorizontal ? "max-w-full p-3" : "h-64 p-4";
  const viewportClassName = isHorizontal
    ? "grid min-w-[44rem] grid-cols-3 gap-3"
    : undefined;

  return `${variantLeadComment(
    `appearance ${opts.appearance ?? "default"} / orientation ${orientation}`,
  )}<ScrollArea
  aria-label="Scroll area variant preview"
${propLine("appearance", opts.appearance)}  className="${className}"
${propLine("orientation", opts.orientation)}${propLine("scrollbar", opts.scrollbar)}${propLine("shadow", opts.shadow)}${propLine("size", opts.size)}${propLine("viewportClassName", viewportClassName)}>
  <div className="${isHorizontal ? "grid gap-3" : "space-y-3"}">...</div>
</ScrollArea>`;
}
