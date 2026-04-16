import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@zentauri-ui/zentauri-components/ui/select";

import type { SelectContentDemoProps, SelectTriggerDemoProps } from "./select-code-examples.types";

export function SelectTriggerDemo({ triggerVariant, triggerSize }: SelectTriggerDemoProps) {
  return (
    <div className="max-w-md">
      <Select defaultValue={["opt-a"]} multiple={false}>
        <SelectTrigger variant={triggerVariant} size={triggerSize}>
          <SelectValue placeholder="Choose one" />
        </SelectTrigger>
        <SelectContent appearance={triggerVariant} size="md">
          <SelectItem value="opt-a" appearance={triggerVariant}>
            Option A
          </SelectItem>
          <SelectItem value="opt-b" appearance={triggerVariant}>
            Option B
          </SelectItem>
          <SelectItem value="opt-c" disabled appearance={triggerVariant}>
            Option C (disabled)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SelectContentDemo({
  contentAppearance,
  contentSize,
  contentSpacing,
}: SelectContentDemoProps) {
  return (
    <div className="max-w-md">
      <p className="mb-5 text-sm text-slate-400">
        SelectContent · Appearance ·{" "}
        <span className="font-bold">{contentAppearance}</span>, Size ·{" "}
        <span className="font-bold">{contentSize}</span>, Spacing ·{" "}
        <span className="font-bold">{contentSpacing}</span>
      </p>
      <Select defaultValue={["opt-a"]} multiple={false}>
        <SelectTrigger variant={contentAppearance} size="sm">
          <SelectValue placeholder="Choose one" />
        </SelectTrigger>
        <SelectContent
          appearance={contentAppearance}
          size={contentSize}
          spacing={contentSpacing}
        >
          <SelectItem value="opt-a" appearance={contentAppearance}>
            Option A
          </SelectItem>
          <SelectItem value="opt-b" appearance={contentAppearance}>
            Option B
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SelectMultiDemo() {
  return (
    <div className="max-w-md">
      <p className="mb-5 text-sm text-slate-400">
        Select · multi, controlled value + onChange
      </p>
      <Select multiple defaultValue={["opt-a", "opt-b"]}>
        <SelectTrigger variant="sky" size="md">
          <SelectValue placeholder="Pick one or more" />
        </SelectTrigger>
        <SelectContent appearance="sky" size="md">
          <SelectItem value="opt-a" appearance="sky">
            Option A
          </SelectItem>
          <SelectItem value="opt-b" appearance="sky">
            Option B
          </SelectItem>
          <SelectItem value="opt-c" appearance="sky">
            Option C
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
