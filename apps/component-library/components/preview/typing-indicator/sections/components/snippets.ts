import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { TypingIndicatorDemoProps } from "./types";

export function typingIndicatorSnippet(opts: TypingIndicatorDemoProps): string {
  const { appearance, size, dots = 3, label, animation = "none" } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const dotsAttr = dots === 3 ? "" : ` dots={${dots}}`;
  const labelAttr = label ? ` label="${label}"` : "";
  const lead = variantLeadComment(
    `appearance · ${appearance}, size · ${size}, dots · ${dots}${label ? `, label · ${label}` : ""}`,
  );

  if (animation !== "none") {
    return `import { TypingIndicatorAnimated } from "@zentauri-ui/zentauri-components/ui/typing-indicator/animated";

${lead}<TypingIndicatorAnimated${appearanceAttr}${sizeAttr}${dotsAttr}${labelAttr} animation="${animation}" />`;
  }

  return `import { TypingIndicator } from "@zentauri-ui/zentauri-components/ui/typing-indicator";

${lead}<TypingIndicator${appearanceAttr}${sizeAttr}${dotsAttr}${labelAttr} />`;
}
