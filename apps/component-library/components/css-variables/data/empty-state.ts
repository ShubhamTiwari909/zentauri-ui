import { defineCssVariableReference } from "../reference-types";

export const emptyStateCssVariables = defineCssVariableReference({
  title: "Empty state CSS variables",
  description:
    "Override these empty state variables on :root, a theme selector, or a component wrapper.",
  lightVariables: [
    ["empty-state-default-fg", "oklch(20.8% 0.042 265.755)"],
    ["empty-state-ghost-fg", "oklch(37.2% 0.044 257.287)"],
    ["empty-state-card-border", "#0000001a"],
    ["empty-state-card-bg", "#ffffffe6"],
    ["empty-state-card-fg", "oklch(20.8% 0.042 265.755)"],
    ["empty-state-card-shadow", "0 8px 24px rgba(15,23,42,0.12)"],
    ["empty-state-description-fg", "oklch(55.4% 0.046 257.417)"],
  ],
  darkExamples: [
    ["empty-state-default-fg-dark", "oklch(98.4% 0.003 247.858)"],
    ["empty-state-ghost-fg-dark", "oklch(92.9% 0.013 255.508)"],
  ],
  darkVariableCount: 7,
});
