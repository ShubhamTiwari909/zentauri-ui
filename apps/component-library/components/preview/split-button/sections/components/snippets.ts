import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { SplitButtonDemoProps } from "./types";

export function splitButtonSnippet({
  appearance,
  size,
  disabled,
  loading,
  triggerOn,
}: SplitButtonDemoProps): string {
  const appearanceAttr =
    appearance === "default" ? "" : `\n  appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : `\n  size="${size}"`;
  const disabledAttr = disabled ? "\n  disabled" : "";
  const loadingAttr = loading ? "\n  loading" : "";
  const triggerOnAttr =
    triggerOn === "click" ? "" : `\n  triggerOn="${triggerOn}"`;
  const label = loading ? "Saving" : "Save";
  const lead = variantLeadComment(
    [
      `appearance · ${appearance}`,
      `size · ${size}`,
      `triggerOn · ${triggerOn}`,
      disabled && "disabled",
      loading && "loading",
    ]
      .filter(Boolean)
      .join(" | "),
  );

  return `${lead}<SplitButton
  label="${label}"${appearanceAttr}${sizeAttr}${triggerOnAttr}${disabledAttr}${loadingAttr}
  onClick={handleSave}
  items={[
    { id: "save-as", label: "Save As", onSelect: handleSaveAs },
    { id: "export", label: "Export", onSelect: handleExport },
  ]}
/>`;
}
