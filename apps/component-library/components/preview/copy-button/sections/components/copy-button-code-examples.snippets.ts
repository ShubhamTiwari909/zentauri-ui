import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { CopyButtonDemoProps } from "./copy-button-code-examples.types";

export function copyButtonSnippet(opts: CopyButtonDemoProps): string {
  const { appearance, size } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;

  return `${variantLeadComment(
    `appearance · ${appearance}, size · ${size}`,
  )}<CopyButton value="zentauri-${appearance}"${appearanceAttr}${sizeAttr} />

<CopyButton
  value="https://zentauri.dev/${appearance}"
  iconOnly={false}
  label="Copy link"${appearanceAttr}${sizeAttr}
/>`;
}

export function copyButtonAnimatedSnippet(): string {
  return `${variantLeadComment("animated icon swap")}import { CopyButtonAnimated } from "@zentauri-ui/zentauri-components/ui/copy-button/animated";

<CopyButtonAnimated animation="swap" appearance="indigo" value="zentauri-ui" />`;
}
