import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { RadioGroupDemoProps } from "./radio-group-code-examples.types";

export function radioGroupSnippet(opts: RadioGroupDemoProps): string {
  const { appearance, size, orientation = "vertical" } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const orientationAttr =
    orientation === "vertical" ? "" : ` orientation="${orientation}"`;
  return `${variantLeadComment(
    `appearance · ${appearance}, size · ${size}, orientation · ${orientation}`,
  )}<RadioGroup defaultValue="pro"${appearanceAttr}${sizeAttr}${orientationAttr}>
  <RadioGroupItem value="starter">Starter</RadioGroupItem>
  <RadioGroupItem value="pro">Pro</RadioGroupItem>
  <RadioGroupItem value="enterprise">Enterprise</RadioGroupItem>
</RadioGroup>`;
}

export function radioGroupControlledSnippet(): string {
  return `${variantLeadComment("controlled state")}<RadioGroup value={value} onValueChange={setValue} appearance="success">
  <RadioGroupItem value="starter">Starter</RadioGroupItem>
  <RadioGroupItem value="pro">Pro</RadioGroupItem>
  <RadioGroupItem value="enterprise">Enterprise</RadioGroupItem>
</RadioGroup>`;
}
