import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { PasswordStrengthMeterDemoProps } from "./types";

function passwordStrengthMeterAttrs(
  opts: PasswordStrengthMeterDemoProps,
): string {
  const { appearance, size, shape, animated, segmented } = opts;
  const parts: string[] = [];
  if (appearance !== "default") {
    parts.push(`appearance="${appearance}"`);
  }
  if (size !== "md") {
    parts.push(`size="${size}"`);
  }
  if (shape !== "rounded") {
    parts.push(`shape="${shape}"`);
  }
  if (animated) {
    parts.push("animated");
  }
  if (segmented) {
    parts.push("segmented");
  }
  parts.push('label="Password"');
  parts.push("value={42}");
  const attr = parts.length ? ` ${parts.join(" ")}` : "";
  return attr;
}

export function passwordStrengthMeterSnippet(
  opts: PasswordStrengthMeterDemoProps,
): string {
  const { appearance, size, shape, animated, segmented } = opts;
  const detail = [
    `appearance · ${appearance}`,
    `size · ${size}`,
    `shape · ${shape}`,
    animated ? "animated · true" : "animated · false",
    segmented ? "segmented · true" : "segmented · false",
  ].join(", ");

  if (animated) {
    return `${variantLeadComment(detail)}import { PasswordStrengthMeterAnimated } from "@zentauri-ui/zentauri-components/ui/password-strength-meter/animated";

<PasswordStrengthMeterAnimated${passwordStrengthMeterAttrs(opts)} animation="shimmer" />`;
  }

  return `${variantLeadComment(detail)}import { PasswordStrengthMeter } from "@zentauri-ui/zentauri-components/ui/password-strength-meter";

<PasswordStrengthMeter${passwordStrengthMeterAttrs(opts)} />`;
}
