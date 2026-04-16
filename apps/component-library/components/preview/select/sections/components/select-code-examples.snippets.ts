import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { SelectContentDemoProps, SelectTriggerDemoProps } from "./select-code-examples.types";

export function selectTriggerSnippet(opts: SelectTriggerDemoProps): string {
  const { triggerVariant, triggerSize } = opts;
  const variantAttr =
    triggerVariant === "default" ? "" : ` variant="${triggerVariant}"`;
  const sizeAttr = triggerSize === "md" ? "" : ` size="${triggerSize}"`;
  return `${variantLeadComment(`SelectTrigger · variant · ${triggerVariant}, size · ${triggerSize}`)}<Select defaultValue={["opt-a"]} multiple={false}>
  <SelectTrigger${variantAttr}${sizeAttr}>
    <SelectValue placeholder="Choose one" />
  </SelectTrigger>
  <SelectContent appearance="default" size="md">
    <SelectItem value="opt-a">Option A</SelectItem>
    <SelectItem value="opt-b">Option B</SelectItem>
    <SelectItem value="opt-c" disabled>
      Option C (disabled)
    </SelectItem>
  </SelectContent>
</Select>`;
}

export function selectContentSnippet(opts: SelectContentDemoProps): string {
  const { contentAppearance, contentSize, contentSpacing } = opts;
  const appearanceAttr =
    contentAppearance === "default" ? "" : ` appearance="${contentAppearance}"`;
  const sizeAttr = contentSize === "md" ? "" : ` size="${contentSize}"`;
  const spacingAttr =
    contentSpacing === "default" || contentSpacing === undefined
      ? ""
      : ` spacing="${contentSpacing}"`;
  return `${variantLeadComment(`SelectContent · appearance · ${contentAppearance}, size · ${contentSize}`)}<Select defaultValue={["opt-a"]} multiple={false}>
  <SelectTrigger variant="ghost" size="sm">
    <SelectValue placeholder="Choose one" />
  </SelectTrigger>
  <SelectContent${appearanceAttr}${sizeAttr}${spacingAttr}>
    <SelectItem value="opt-a" appearance={contentAppearance}>Option A</SelectItem>
    <SelectItem value="opt-b" appearance={contentAppearance}>Option B</SelectItem>
  </SelectContent>
</Select>`;
}

export function selectMultiSnippet(): string {
  return `${variantLeadComment("Select · multi, controlled value + onChange")}<Select
  multiple
  value={selected}
  onChange={setSelected}
>
  <SelectTrigger variant="sky" size="md">
    <SelectValue placeholder="Pick one or more" />
  </SelectTrigger>
  <SelectContent appearance="sky" size="md">
    <SelectItem value="opt-a" appearance="sky">Option A</SelectItem>
    <SelectItem value="opt-b" appearance="sky">Option B</SelectItem>
    <SelectItem value="opt-c" appearance="sky">Option C</SelectItem>
  </SelectContent>
</Select>`;
}
