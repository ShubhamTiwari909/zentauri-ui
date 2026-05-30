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
  const isHorizontal = orientation === "horizontal";
  const isBoth = orientation === "both";
  const className = isHorizontal ? "max-w-full p-3" : "h-64 p-4";
  const viewportClassName = isHorizontal
    ? "flex gap-3"
    : isBoth
      ? "grid grid-cols-3 gap-3"
      : undefined;

  const innerContent =
    isHorizontal || isBoth
      ? `  {/* card items rendered directly */}`
      : `  <div className="space-y-3">...</div>`;

  return `${variantLeadComment(
    `appearance ${opts.appearance ?? "default"} / orientation ${orientation}`,
  )}<ScrollArea
  aria-label="Scroll area variant preview"
${propLine("appearance", opts.appearance)}  className="${className}"
${propLine("orientation", opts.orientation)}${propLine("scrollbar", opts.scrollbar)}${propLine("shadow", opts.shadow)}${propLine("size", opts.size)}${propLine("viewportClassName", viewportClassName)}>\n${innerContent}\n</ScrollArea>`;
}
