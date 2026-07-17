import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { DatePickerDemoProps } from "./types";

export function datePickerSnippet(opts: DatePickerDemoProps): string {
  const {
    mode,
    appearance,
    size,
    clearable = false,
    animation = "none",
  } = opts;
  const modeAttr = mode === "single" ? "" : ` mode="${mode}"`;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const clearableAttr = clearable ? " clearable" : "";
  const lead = variantLeadComment(
    `mode · ${mode}, appearance · ${appearance}, size · ${size}${clearable ? ", clearable" : ""}`,
  );
  const sharedAttrs = `${modeAttr}${appearanceAttr}${sizeAttr}${clearableAttr}`;

  if (animation !== "none") {
    return `import { DatePickerAnimated } from "@zentauri-ui/zentauri-components/ui/date-picker/animated";

${lead}<DatePickerAnimated${sharedAttrs} animation="${animation}" />`;
  }

  return `import { DatePicker } from "@zentauri-ui/zentauri-components/ui/date-picker";

${lead}<DatePicker${sharedAttrs} />`;
}
