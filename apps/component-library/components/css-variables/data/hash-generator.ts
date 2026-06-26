import { defineCssVariableReference } from "../reference-types";

export const hashGeneratorCssVariables = defineCssVariableReference({
  title: "Hash generator CSS variables",
  description:
    "Override these hash generator variables on :root, a theme selector, or a component wrapper.",
  lightVariables: [
    ["hash-generator-bg", "oklch(98.4% 0.003 247.858)"],
    ["hash-generator-border", "#0000001a"],
    ["hash-generator-fg", "oklch(20.8% 0.042 265.755)"],
    ["hash-generator-header-bg", "oklch(92.9% 0.013 255.508)"],
    ["hash-generator-label-fg", "oklch(55.2% 0.046 257.417)"],
    ["hash-generator-placeholder", "oklch(55.2% 0.046 257.417)"],
    ["hash-generator-ring-focus", "#0000004d"],
    ["hash-generator-output-bg", "oklch(96.8% 0.007 247.896)"],
    ["hash-generator-output-fg", "oklch(44.6% 0.043 257.281)"],
  ],
  darkExamples: [
    ["hash-generator-bg-dark", "oklch(12.9% 0.042 264.695)"],
    ["hash-generator-border-dark", "#ffffff1a"],
    ["hash-generator-fg-dark", "oklch(98.4% 0.003 247.858)"],
    ["hash-generator-header-bg-dark", "oklch(27.9% 0.041 260.031)"],
    ["hash-generator-label-fg-dark", "oklch(70.8% 0.015 256.243)"],
    ["hash-generator-placeholder-dark", "oklch(70.8% 0.015 256.243)"],
    ["hash-generator-ring-focus-dark", "#ffffff4d"],
    ["hash-generator-output-bg-dark", "oklch(18.5% 0.037 264.653)"],
    ["hash-generator-output-fg-dark", "oklch(86.9% 0.022 252.894)"],
  ],
  darkVariableCount: 9,
});
