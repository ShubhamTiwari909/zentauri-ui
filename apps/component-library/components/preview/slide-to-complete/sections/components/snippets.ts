import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { SlideToCompleteDemoProps } from "./types";

export function slideToCompleteSnippet(opts: SlideToCompleteDemoProps): string {
  const {
    appearance,
    size,
    threshold,
    label = "Slide to approve",
    disabled = false,
    loading = false,
  } = opts;

  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const thresholdAttr = threshold === 0.9 ? "" : ` threshold={${threshold}}`;
  // Emit the label as a JS string expression rather than a raw quoted JSX
  // attribute, so a label containing a `"`, backslash, or newline still
  // produces compilable code.
  const escapedLabel = label
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r");
  const labelAttr = ` label={"${escapedLabel}"}`;
  const disabledAttr = disabled ? " disabled" : "";
  const loadingAttr = loading ? " loading" : "";
  const lead = variantLeadComment(
    `appearance · ${appearance}, size · ${size}, threshold · ${threshold}`,
  );

  return `import { SlideToComplete } from "@zentauri-ui/zentauri-components/ui/slide-to-complete";

${lead}<SlideToComplete${appearanceAttr}${sizeAttr}${thresholdAttr}${labelAttr}${disabledAttr}${loadingAttr}
  onComplete={() => console.log("approved")}
/>`;
}

export function slideToCompleteControlledSnippet(): string {
  return `${variantLeadComment("controlled state")}const [approved, setApproved] = useState(false);

<SlideToComplete
  appearance={approved ? "success" : "primary"}
  label={approved ? "Approved" : "Slide to approve"}
  success={approved}
  value={approved}
  onValueChange={setApproved}
/>`;
}
