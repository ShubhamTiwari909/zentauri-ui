import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { DividerDemoProps } from "./divider-code-examples.types";

export function dividerSnippet(opts: DividerDemoProps): string {
  const { appearance, orientation, size, withLabel } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const orientationAttr =
    orientation === "horizontal" ? "" : ` orientation="${orientation}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const base = `<Divider${appearanceAttr}${orientationAttr}${sizeAttr}`;
  const lead = variantLeadComment(
    `appearance · ${appearance}, orientation · ${orientation}, size · ${size}, label · ${withLabel ? "Section" : "none"}`,
  );
  if (withLabel) {
    return `${lead}${base} label="Section" />`;
  }
  return `${lead}${base} />`;
}
