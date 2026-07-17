import { defineCssVariableReference } from "../reference-types";

export const datePickerCssVariables = defineCssVariableReference({
  title: "Date picker CSS variables",
  description:
    "Override these date picker trigger variables on :root, a theme selector, or a component wrapper. Named-color appearances follow the same *-border / *-fg / *-bg-hover pattern shown for blue; the embedded calendar uses the --zui-calendar-* variables.",
  lightVariables: [
    ["date-picker-trigger-radius", "0.5rem"],
    ["date-picker-trigger-h-sm", "2rem"],
    ["date-picker-trigger-h-md", "2.5rem"],
    ["date-picker-trigger-h-lg", "3rem"],
    ["date-picker-trigger-px", "0.75rem"],
    ["date-picker-trigger-bg", "#ffffff"],
    ["date-picker-trigger-fg", "oklch(13% 0.028 261.692)"],
    ["date-picker-trigger-default-border", "oklch(87.2% 0.01 258.338)"],
    ["date-picker-placeholder-fg", "oklch(44.6% 0.043 257.281)"],
    ["date-picker-ring", "oklch(44.6% 0.03 256.802)"],
    ["date-picker-clear-fg", "oklch(44.6% 0.043 257.281)"],
    ["date-picker-clear-bg-hover", "#0000000d"],
    ["date-picker-trigger-blue-border", "#2563eb"],
    ["date-picker-trigger-blue-fg", "#2563eb"],
    [
      "date-picker-trigger-blue-bg-hover",
      "color-mix(in oklch, #2563eb 8%, transparent)",
    ],
  ],
  darkExamples: [
    ["date-picker-trigger-bg-dark", "oklch(12.9% 0.042 264.695)"],
    ["date-picker-trigger-fg-dark", "#ffffff"],
    ["date-picker-trigger-default-border-dark", "oklch(87.2% 0.01 258.338)"],
    ["date-picker-placeholder-fg-dark", "oklch(86.9% 0.022 252.894)"],
    ["date-picker-ring-dark", "oklch(70.7% 0.022 261.325)"],
    ["date-picker-clear-fg-dark", "oklch(86.9% 0.022 252.894)"],
    ["date-picker-clear-bg-hover-dark", "#ffffff0d"],
    ["date-picker-trigger-blue-border-dark", "#3b82f6"],
    ["date-picker-trigger-blue-fg-dark", "#3b82f6"],
    [
      "date-picker-trigger-blue-bg-hover-dark",
      "color-mix(in oklch, #3b82f6 14%, transparent)",
    ],
  ],
  darkVariableCount: 15,
});
