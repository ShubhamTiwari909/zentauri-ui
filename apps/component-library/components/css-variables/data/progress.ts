import { defineCssVariableReference } from "../css-variable-reference-types";

export const progressCssVariables = defineCssVariableReference({
  title: "Progress CSS variables",
  description:
    "Override these progress variables on :root, a theme selector, or a component wrapper.",
  lightVariables: [
    ["progress-fg", "oklch(20.8% 0.042 265.755)"],
    ["progress-default-fill", "oklch(20.8% 0.042 265.755)"],
    ["progress-secondary-fill", "oklch(44.6% 0.043 257.281)"],
    ["progress-destructive-fill", "oklch(45.5% 0.188 13.697)"],
    ["progress-emerald-fill", "oklch(43.2% 0.095 166.913)"],
    ["progress-indigo-fill", "oklch(39.8% 0.195 277.366)"],
    ["progress-purple-fill", "oklch(43.8% 0.218 303.724)"],
    ["progress-pink-fill", "oklch(45.9% 0.187 3.815)"],
    ["progress-rose-fill", "oklch(45.5% 0.188 13.697)"],
    ["progress-sky-fill", "oklch(44.3% 0.11 240.79)"],
    ["progress-teal-fill", "oklch(43.7% 0.078 188.216)"],
    ["progress-yellow-fill", "oklch(47.6% 0.114 61.907)"],
    ["progress-orange-fill", "oklch(47% 0.157 37.304)"],
    ["progress-outline-fill", "oklch(52% 0.105 223.128)"],
    ["progress-ghost-fill", "oklch(27.9% 0.041 260.031)"],
    ["progress-glass-fill", "oklch(20.8% 0.042 265.755)"],
    [
      "progress-gradient-blue-fill",
      "linear-gradient(90deg,oklch(62.3% 0.214 259.815),oklch(62.7% 0.265 303.9))",
    ],
    [
      "progress-gradient-green-fill",
      "linear-gradient(90deg,oklch(72.3% 0.219 149.579),oklch(76.8% 0.233 130.85))",
    ],
    [
      "progress-gradient-red-fill",
      "linear-gradient(90deg,oklch(63.7% 0.237 25.331),oklch(65.6% 0.241 354.308))",
    ],
    [
      "progress-gradient-yellow-fill",
      "linear-gradient(90deg,oklch(79.5% 0.184 86.047),oklch(70.5% 0.213 47.604))",
    ],
    [
      "progress-gradient-purple-fill",
      "linear-gradient(90deg,oklch(62.7% 0.265 303.9),oklch(65.6% 0.241 354.308))",
    ],
    [
      "progress-gradient-teal-fill",
      "linear-gradient(90deg,oklch(70.4% 0.14 182.503),oklch(71.5% 0.143 215.221))",
    ],
    [
      "progress-gradient-indigo-fill",
      "linear-gradient(90deg,oklch(58.5% 0.233 277.117),oklch(62.7% 0.265 303.9))",
    ],
    [
      "progress-gradient-pink-fill",
      "linear-gradient(90deg,oklch(65.6% 0.241 354.308),oklch(64.5% 0.246 16.439))",
    ],
    [
      "progress-gradient-orange-fill",
      "linear-gradient(90deg,oklch(70.5% 0.213 47.604),oklch(63.7% 0.237 25.331))",
    ],
    ["progress-track-bg", "#0000001a"],
    [
      "progress-bar-bg-striped",
      "repeating-linear-gradient(135deg,rgba(255,255,255,0.28) 0,rgba(255,255,255,0.28) 10px,transparent 10px,transparent 20px)",
    ],
  ],
  darkExamples: [
    ["progress-fg-dark", "oklch(98.4% 0.003 247.858)"],
    ["progress-default-fill-dark", "oklch(98.4% 0.003 247.858)"],
  ],
  darkVariableCount: 27,
});
