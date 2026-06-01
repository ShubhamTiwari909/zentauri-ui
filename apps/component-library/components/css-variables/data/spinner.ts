import { defineCssVariableReference } from "../reference-types";

export const spinnerCssVariables = defineCssVariableReference({
  title: "Spinner CSS variables",
  description:
    "Override these spinner variables on :root, a theme selector, or a component wrapper.",
  lightVariables: [
    ["spinner-default-fg", "oklch(20.8% 0.042 265.755)"],
    ["spinner-secondary-fg", "oklch(44.6% 0.043 257.281)"],
    ["spinner-destructive-fg", "oklch(58.6% 0.253 17.585)"],
    ["spinner-ghost-fg", "oklch(44.6% 0.043 257.281)"],
    ["spinner-emerald-fg", "oklch(59.6% 0.145 163.225)"],
    ["spinner-indigo-fg", "oklch(51.1% 0.262 276.966)"],
    ["spinner-purple-fg", "oklch(55.8% 0.288 302.321)"],
    ["spinner-pink-fg", "oklch(59.2% 0.249 0.584)"],
    ["spinner-rose-fg", "oklch(58.6% 0.253 17.585)"],
    ["spinner-sky-fg", "oklch(58.8% 0.158 241.966)"],
    ["spinner-teal-fg", "oklch(60% 0.118 184.704)"],
    ["spinner-yellow-fg", "oklch(68.1% 0.162 75.834)"],
    ["spinner-orange-fg", "oklch(64.6% 0.222 41.116)"],
    ["spinner-gradient-blue-fg", "oklch(54.6% 0.245 262.881)"],
    ["spinner-gradient-green-fg", "oklch(62.7% 0.194 149.214)"],
    ["spinner-gradient-red-fg", "oklch(57.7% 0.245 27.325)"],
    ["spinner-gradient-yellow-fg", "oklch(68.1% 0.162 75.834)"],
    ["spinner-gradient-purple-fg", "oklch(55.8% 0.288 302.321)"],
    ["spinner-gradient-teal-fg", "oklch(60% 0.118 184.704)"],
    ["spinner-gradient-indigo-fg", "oklch(51.1% 0.262 276.966)"],
    ["spinner-gradient-pink-fg", "oklch(59.2% 0.249 0.584)"],
    ["spinner-gradient-orange-fg", "oklch(64.6% 0.222 41.116)"],
  ],
  darkExamples: [
    ["spinner-default-fg-dark", "oklch(98.4% 0.003 247.858)"],
    ["spinner-secondary-fg-dark", "oklch(86.9% 0.022 252.894)"],
  ],
  darkVariableCount: 22,
});
