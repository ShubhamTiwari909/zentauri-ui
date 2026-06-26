import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { SecretRevealDemoProps } from "./types";

export function secretRevealSnippet(opts: SecretRevealDemoProps): string {
  const {
    appearance,
    size,
    value = "sk-abc123def456",
    label,
    animation = "none",
    initiallyRevealed,
  } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const escapeAttr = (v: string) => v.replace(/"/g, "&quot;");
  const labelAttr = label ? ` label="${escapeAttr(label)}"` : "";
  const initiallyRevealedAttr = initiallyRevealed ? " initiallyRevealed" : "";
  const valueAttr = ` value="${escapeAttr(value)}"`;
  const lead = variantLeadComment(
    `appearance · ${appearance}, size · ${size}${label ? `, label · ${label}` : ""}`,
  );

  if (animation !== "none") {
    return `import { SecretRevealAnimated } from "@zentauri-ui/zentauri-components/ui/secret-reveal/animated";

${lead}<SecretRevealAnimated${appearanceAttr}${sizeAttr}${valueAttr}${labelAttr}${initiallyRevealedAttr} animation="${animation}" />`;
  }

  return `import { SecretReveal } from "@zentauri-ui/zentauri-components/ui/secret-reveal";

${lead}<SecretReveal${appearanceAttr}${sizeAttr}${valueAttr}${labelAttr}${initiallyRevealedAttr} />`;
}
