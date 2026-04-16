import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { ToggleDemoProps } from "./toggle-code-examples.types";

export function toggleSnippet(opts: ToggleDemoProps): string {
  const { appearance, size } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}`)}<Toggle${appearanceAttr}${sizeAttr} defaultChecked animation="spring" aria-label="Demo toggle" />`;
}
