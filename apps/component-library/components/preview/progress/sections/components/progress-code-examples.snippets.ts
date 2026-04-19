import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { ProgressDemoProps } from "./progress-code-examples.types";

function progressAttrs(opts: ProgressDemoProps): string {
  const { appearance, size, shape, striped, animated } = opts;
  const parts: string[] = [];
  if (appearance !== "default") {
    parts.push(`appearance="${appearance}"`);
  }
  if (size !== "md") {
    parts.push(`size="${size}"`);
  }
  if (shape !== "rounded") {
    parts.push(`shape="${shape}"`);
  }
  if (striped) {
    parts.push("striped");
  }
  if (animated) {
    parts.push("animated");
  }
  parts.push("value={42}");
  const attr = parts.length ? ` ${parts.join(" ")}` : "";
  return attr;
}

export function progressSnippet(opts: ProgressDemoProps): string {
  const { appearance, size, shape, striped, animated } = opts;
  const detail = [
    `appearance · ${appearance}`,
    `size · ${size}`,
    `shape · ${shape}`,
    striped ? "striped · true" : "striped · false",
    animated ? "animated · true" : "animated · false",
  ].join(", ");
  return `${variantLeadComment(detail)}<Progress${progressAttrs(opts)} />`;
}
