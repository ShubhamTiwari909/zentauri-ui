import { defineCssVariableReference } from "../css-variable-reference-types";

export const breadcrumbCssVariables = defineCssVariableReference({
  title: "Breadcrumb CSS variables",
  description:
    "Override these breadcrumb variables on :root, a theme selector, or a component wrapper.",
  lightVariables: [
    ["breadcrumb-default-fg", "oklch(44.6% 0.043 257.281)"],
    ["breadcrumb-muted-fg", "oklch(55.4% 0.046 257.417)"],
    ["breadcrumb-sky-fg", "oklch(44.3% 0.11 240.79)"],
    ["breadcrumb-rose-fg", "oklch(45.5% 0.188 13.697)"],
    ["breadcrumb-purple-fg", "oklch(43.8% 0.218 303.724)"],
    ["breadcrumb-pink-fg", "oklch(45.9% 0.187 3.815)"],
    ["breadcrumb-orange-fg", "oklch(47% 0.157 37.304)"],
    ["breadcrumb-yellow-fg", "oklch(47.6% 0.114 61.907)"],
    ["breadcrumb-teal-fg", "oklch(43.7% 0.078 188.216)"],
    ["breadcrumb-indigo-fg", "oklch(39.8% 0.195 277.366)"],
    ["breadcrumb-emerald-fg", "oklch(43.2% 0.095 166.913)"],
    ["breadcrumb-gray-fg", "oklch(27.8% 0.033 256.848)"],
    ["breadcrumb-amber-fg", "oklch(47.3% 0.137 46.201)"],
    ["breadcrumb-violet-fg", "oklch(43.2% 0.232 292.759)"],
    ["breadcrumb-link-ring-focus", "#0000004d"],
    ["breadcrumb-link-ring-offset-focus", "oklch(98.4% 0.003 247.858)"],
    ["breadcrumb-page-fg", "oklch(27.9% 0.041 260.031)"],
    ["breadcrumb-separator-fg", "oklch(70.4% 0.04 256.788)"],
  ],
  darkExamples: [
    ["breadcrumb-default-fg-dark", "oklch(86.9% 0.022 252.894)"],
    ["breadcrumb-muted-fg-dark", "oklch(70.4% 0.04 256.788)"],
  ],
  darkVariableCount: 18,
});
