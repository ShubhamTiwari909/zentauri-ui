import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { AlertAppearance, AlertSize } from "./alert-code-examples.types";

export function alertSnippet(
  appearance: AlertAppearance,
  size: AlertSize,
): string {
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}`)}<Alert${appearanceAttr}${sizeAttr} animation="none" className="text-xs md:text-sm">
 <div className="space-y-1">
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Short supporting copy for this alert.</AlertDescription>
 </div>
</Alert>`;
}
