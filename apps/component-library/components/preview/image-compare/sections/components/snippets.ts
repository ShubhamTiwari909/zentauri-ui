import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { ImageCompareDemoProps } from "./types";

export function imageCompareSnippet(opts: ImageCompareDemoProps): string {
  const { appearance, size, radius, defaultPosition } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const radiusAttr = radius === "md" ? "" : ` radius="${radius}"`;
  const positionAttr =
    defaultPosition === 50 ? "" : ` defaultPosition={${defaultPosition}}`;
  const lead = variantLeadComment(
    `${appearance} · ${size} · ${radius} · ${defaultPosition}%`,
  );

  return `import { ImageCompare } from "@zentauri-ui/zentauri-components/ui/image-compare";

${lead}<ImageCompare${appearanceAttr}${sizeAttr}${radiusAttr}${positionAttr}
  before={<img src="/before.jpg" alt="Original photo" />}
  after={<img src="/after.jpg" alt="Edited photo" />}
/>`;
}
