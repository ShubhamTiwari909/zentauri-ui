import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { CodeDiffDemoProps } from "./types";

export function codeDiffSnippet(opts: CodeDiffDemoProps): string {
  const { viewType, size, showLineNumbers, showGutterMarkers } = opts;
  const viewTypeAttr = viewType === "unified" ? "" : ` viewType="${viewType}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const lineNumbersAttr = showLineNumbers ? "" : " showLineNumbers={false}";
  const gutterMarkersAttr = showGutterMarkers
    ? ""
    : " showGutterMarkers={false}";
  const lead = variantLeadComment(
    `viewType · ${viewType}, size · ${size}, lineNumbers · ${showLineNumbers}, gutters · ${showGutterMarkers}`,
  );

  return `${lead}<CodeDiff
  oldCode={oldCode}
  newCode={newCode}${viewTypeAttr}${sizeAttr}${lineNumbersAttr}${gutterMarkersAttr}
/>`;
}
