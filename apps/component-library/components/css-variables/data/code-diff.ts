import { defineCssVariableReference } from "../reference-types";

export const codeDiffCssVariables = defineCssVariableReference({
  title: "Code Diff CSS variables",
  description:
    "Override these code-diff variables on :root, a theme selector, or a component wrapper.",
  lightVariables: [
    ["code-diff-border", "#0000001a"],
    ["code-diff-bg", "oklch(98.4% 0.003 247.858)"],
    ["code-diff-fg", "oklch(20.8% 0.042 265.755)"],
    ["code-diff-header-bg", "oklch(92.9% 0.013 255.508)"],
    ["code-diff-header-fg", "oklch(55.2% 0.046 257.417)"],
    ["code-diff-line-number-fg", "oklch(55.2% 0.046 257.417)"],
    ["code-diff-added-bg", "oklch(92.8% 0.109 150.96)"],
    ["code-diff-added-fg", "oklch(29.1% 0.065 148.99)"],
    ["code-diff-removed-bg", "oklch(93.1% 0.08 22.4)"],
    ["code-diff-removed-fg", "oklch(30.7% 0.06 28.07)"],
  ],
  darkExamples: [
    ["code-diff-border-dark", "#ffffff1a"],
    ["code-diff-bg-dark", "oklch(12.9% 0.042 264.695)"],
    ["code-diff-fg-dark", "oklch(98.4% 0.003 247.858)"],
    ["code-diff-header-bg-dark", "oklch(27.9% 0.041 260.031)"],
    ["code-diff-header-fg-dark", "oklch(70.8% 0.015 256.243)"],
    ["code-diff-line-number-fg-dark", "oklch(70.8% 0.015 256.243)"],
    ["code-diff-added-bg-dark", "oklch(26.8% 0.077 146.44)"],
    ["code-diff-added-fg-dark", "oklch(74% 0.131 149.02)"],
    ["code-diff-removed-bg-dark", "oklch(26.9% 0.07 22.54)"],
    ["code-diff-removed-fg-dark", "oklch(74.2% 0.127 24.75)"],
  ],
  darkVariableCount: 10,
});
