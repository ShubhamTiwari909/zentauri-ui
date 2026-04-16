import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { SpinnerDemoProps } from "./spinner-code-examples.types";

export function spinnerSnippet(opts: SpinnerDemoProps): string {
  const { appearance, variant, size } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const variantAttr = variant === "ring" ? "" : ` variant="${variant}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(`appearance · ${appearance}, variant · ${variant}, size · ${size}`)}<Spinner${appearanceAttr}${variantAttr}${sizeAttr} aria-label="Loading" />`;
}
