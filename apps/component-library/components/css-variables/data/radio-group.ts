import { defineCssVariableReference } from "../css-variable-reference-types";

export const radioGroupCssVariables = defineCssVariableReference({
  title: "RadioGroup CSS variables",
  description:
    "Override these radio group variables on :root, a theme selector, or a component wrapper.",
  lightVariables: [
    ["radio-label-fg", "oklch(20.8% 0.042 265.755)"],
    ["radio-border", "#0000004d"],
    ["radio-bg", "transparent"],
    ["radio-ring-focus", "oklch(44.6% 0.043 257.281 / 0.7)"],
    ["radio-ring-offset-focus", "oklch(98.4% 0.003 247.858)"],
    ["radio-default-border-checked", "oklch(44.6% 0.043 257.281)"],
    ["radio-default-indicator-bg", "oklch(44.6% 0.043 257.281)"],
    ["radio-success-border-checked", "oklch(59.6% 0.145 163.225)"],
    ["radio-success-indicator-bg", "oklch(59.6% 0.145 163.225)"],
    ["radio-warning-border-checked", "oklch(68.1% 0.162 75.834)"],
    ["radio-warning-indicator-bg", "oklch(68.1% 0.162 75.834)"],
    ["radio-error-border-checked", "oklch(58.6% 0.253 17.585)"],
    ["radio-error-indicator-bg", "oklch(58.6% 0.253 17.585)"],
    ["radio-info-border-checked", "oklch(54.6% 0.245 262.881)"],
    ["radio-info-indicator-bg", "oklch(54.6% 0.245 262.881)"],
    ["radio-violet-border-checked", "oklch(54.1% 0.281 293.009)"],
    ["radio-violet-indicator-bg", "oklch(54.1% 0.281 293.009)"],
    ["radio-amber-border-checked", "oklch(66.6% 0.179 58.318)"],
    ["radio-amber-indicator-bg", "oklch(66.6% 0.179 58.318)"],
    ["radio-pink-border-checked", "oklch(59.2% 0.249 0.584)"],
    ["radio-pink-indicator-bg", "oklch(59.2% 0.249 0.584)"],
    ["radio-indigo-border-checked", "oklch(51.1% 0.262 276.966)"],
    ["radio-indigo-indicator-bg", "oklch(51.1% 0.262 276.966)"],
  ],
  darkExamples: [
    ["radio-label-fg-dark", "oklch(98.4% 0.003 247.858)"],
    ["radio-border-dark", "#ffffff4d"],
    ["radio-ring-focus-dark", "oklch(86.9% 0.022 252.894 / 0.7)"],
    ["radio-ring-offset-focus-dark", "oklch(12.9% 0.042 264.695)"],
  ],
  darkVariableCount: 4,
});
