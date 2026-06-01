import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { ToggleDemoProps } from "./types";

export function toggleSnippet(opts: ToggleDemoProps): string {
  const { appearance, size, thumbColor } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const thumbColorAttr =
    thumbColor === "default" ? "" : ` thumbColor="${thumbColor}"`;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}`)}<ToggleAnimated${appearanceAttr}${sizeAttr}${thumbColorAttr} defaultChecked animation="spring" aria-label="Demo toggle" />`;
}

export function toggleControlledSnippet(): string {
  return `${variantLeadComment(`controlled state, animation · spring`)}<ToggleAnimated
  checked={checked}
  onCheckedChange={setChecked}
  animation="spring"
  aria-label="Demo toggle"
/>`;
}
