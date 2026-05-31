import { defineCssVariableReference } from "../css-variable-reference-types";

export const treeViewCssVariables = defineCssVariableReference({
  title: "TreeView CSS variables",
  description:
    "Override these TreeView variables on :root, a theme selector, or a component wrapper.",
  lightVariables: [
    ["tree-view-fg", "oklch(20.8% 0.042 265.755)"],
    ["tree-view-default-border", "#0000001a"],
    ["tree-view-outline-border", "#00000026"],
    ["tree-view-card-bg", "#0000000d"],
    ["tree-view-item-hover", "#0000000d"],
    ["tree-view-selected", "#0000000f"],
    ["tree-view-selected-fg", "oklch(20.8% 0.042 265.755)"],
    ["tree-view-ring-focus", "#0000004d"],
    ["tree-view-chevron", "oklch(55.5% 0.041 257.417)"],
    ["tree-view-icon", "oklch(55.5% 0.041 257.417)"],
    ["tree-view-guide", "#0000001a"],
    ["tree-view-sky-border", "oklch(44.3% 0.11 240.79)"],
    ["tree-view-sky-selected", "oklch(95.1% 0.026 236.824)"],
    ["tree-view-emerald-selected", "oklch(95% 0.052 163.051)"],
    ["tree-view-gradient-fg", "#ffffff"],
  ],
  darkExamples: [
    ["tree-view-fg-dark", "oklch(92.9% 0.013 255.508)"],
    ["tree-view-item-hover-dark", "#ffffff0d"],
    ["tree-view-selected-dark", "#ffffff14"],
    ["tree-view-chevron-dark", "oklch(70.4% 0.04 256.788)"],
  ],
  darkVariableCount: 10,
});
