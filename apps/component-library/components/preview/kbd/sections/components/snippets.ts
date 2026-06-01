import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { KbdDemoProps } from "./types";

export function kbdSnippet(opts: KbdDemoProps): string {
  const { appearance, size } = opts;
  const appearanceAttr =
    appearance === "outline" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;

  return `${variantLeadComment(
    `appearance · ${appearance}, size · ${size}`,
  )}<Kbd${appearanceAttr}${sizeAttr}>Esc</Kbd>

<Kbd keys={["⌘", "K"]} separator="+"${appearanceAttr}${sizeAttr} />

<Kbd keys={["Ctrl", "Shift", "P"]} separator="+"${appearanceAttr}${sizeAttr} />`;
}

export function kbdAnimatedSnippet(): string {
  return `${variantLeadComment("animated key press")}import { KbdAnimated } from "@zentauri-ui/zentauri-components/ui/kbd/animated";

<KbdAnimated animation="press" appearance="indigo" keys={["⌘", "K"]} separator="+" />`;
}
