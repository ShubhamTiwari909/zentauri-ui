import { defineCssVariableReference } from "../reference-types";

export const imageCompareCssVariables = defineCssVariableReference({
  title: "Image compare CSS variables",
  description:
    "Override these image compare variables on :root, a theme selector, or a component wrapper.",
  lightVariables: [
    ["image-compare-bg", "#f1f5f9"],
    ["image-compare-border", "#e2e8f0"],
    ["image-compare-default-accent", "#0f172a"],
    ["image-compare-focus-ring", "#2563eb"],
    ["image-compare-handle-bg", "#ffffff"],
    ["image-compare-handle-border", "#ffffff99"],
    ["image-compare-handle-fg", "#0f172a"],
    ["image-compare-handle-shadow", "0 4px 16px #0f172a40"],
    ["image-compare-label-bg", "#0f172abf"],
    ["image-compare-label-fg", "#ffffff"],
  ],
  darkExamples: [
    ["image-compare-bg-dark", "#1e293b"],
    ["image-compare-border-dark", "#1e293b"],
    ["image-compare-default-accent-dark", "#f8fafc"],
    ["image-compare-focus-ring-dark", "#60a5fa"],
    ["image-compare-handle-bg-dark", "#0f172a"],
    ["image-compare-handle-border-dark", "#ffffff66"],
    ["image-compare-handle-fg-dark", "#f8fafc"],
    ["image-compare-handle-shadow-dark", "0 4px 18px #00000080"],
    ["image-compare-label-bg-dark", "#020617cc"],
    ["image-compare-label-fg-dark", "#f8fafc"],
  ],
  darkVariableCount: 10,
});
