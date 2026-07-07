import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { RelativeTimeDemoProps } from "./types";

export function relativeTimeSnippet(opts: RelativeTimeDemoProps): string {
  const { appearance, size, live } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const liveAttr = live ? "" : " live={false}";
  const lead = variantLeadComment(
    `appearance · ${appearance}, size · ${size}, live · ${live}`,
  );
  return `${lead}<RelativeTime${appearanceAttr}${sizeAttr}${liveAttr}
  date={Date.now() - 120000}
/>
`;
}
