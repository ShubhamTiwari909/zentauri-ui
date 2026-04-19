import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { SkeletonDemoProps } from "./skeleton-code-examples.types";

export function skeletonSnippet(opts: SkeletonDemoProps): string {
  const { appearance, size, rounded, animation, shimmerTone } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const roundedAttr = rounded === "md" ? "" : ` rounded="${rounded}"`;
  const animationAttr = animation === "none" ? "" : ` animation="${animation}"`;
  const shimmerToneAttr =
    shimmerTone === "default" ? "" : ` shimmerTone="${shimmerTone}"`;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}, rounded · ${rounded}, animation · ${animation}, shimmerTone · ${shimmerTone}`)}<SkeletonAnimated className="max-w-md"${appearanceAttr}${sizeAttr}${roundedAttr}${animationAttr}${shimmerToneAttr} />`;
}
