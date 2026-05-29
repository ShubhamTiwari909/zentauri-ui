import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { CheckboxDemoProps } from "./checkbox-code-examples.types";

export function checkboxSnippet(opts: CheckboxDemoProps): string {
  const { appearance, size, indeterminate } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const indeterminateAttr = indeterminate ? " indeterminate" : "";
  return `${variantLeadComment(
    `appearance · ${appearance}, size · ${size}${indeterminate ? ", indeterminate" : ""}`,
  )}<Checkbox${appearanceAttr}${sizeAttr}${indeterminateAttr} defaultChecked>
  ${indeterminate ? "Partially selected" : "Accept terms"}
</Checkbox>`;
}

export function checkboxControlledSnippet(): string {
  return `${variantLeadComment("controlled state")}<Checkbox checked={checked} onCheckedChange={setChecked} appearance="success">
  Controlled checkbox
</Checkbox>`;
}
