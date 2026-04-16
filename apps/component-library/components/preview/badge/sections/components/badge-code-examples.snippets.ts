import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { BadgeDemoProps } from "./badge-code-examples.types";

export function badgeSnippet(opts: BadgeDemoProps): string {
  const { appearance, size, shape } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const shapeAttr = shape === "pill" ? "" : ` shape="${shape}"`;
  const lead = variantLeadComment(
    `appearance · ${appearance}, size · ${size}, shape · ${shape}`,
  );
  const base = `<Badge${appearanceAttr}${sizeAttr}${shapeAttr} animation="none"`;
  if (shape === "dot") {
    return `${lead}${base} aria-label="Status active" />`;
  }
  return `${lead}${base}>
  Featured
</Badge>`;
}
