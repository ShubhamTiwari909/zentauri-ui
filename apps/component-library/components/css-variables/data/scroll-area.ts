import { defineCssVariableReference } from "../reference-types";

export const scrollAreaCssVariables = defineCssVariableReference({
  title: "ScrollArea CSS variables",
  description:
    "Override these ScrollArea variables on :root, a theme selector, or a component wrapper.",
  lightVariables: [
    ["scroll-area-thumb", "#94a3b8"],
    ["scroll-area-thumb-border", "#f8fafc"],
    ["scroll-area-track", "#e2e8f0"],
    ["scroll-area-size", "0.625rem"],
    ["scroll-area-ring-focus", "oklch(54.6% 0.245 262.881 / 0.28)"],
    ["scroll-area-ring-offset-focus", "#ffffff"],
    ["scroll-area-outline-border", "#cbd5e1"],
    ["scroll-area-glass-border", "#ffffff80"],
    ["scroll-area-glass-bg", "#ffffff99"],
    ["scroll-area-sky-border", "oklch(62.3% 0.214 259.815 / 0.35)"],
    ["scroll-area-emerald-border", "oklch(59.6% 0.145 163.225 / 0.35)"],
    ["scroll-area-rose-border", "oklch(58.6% 0.253 17.585 / 0.3)"],
    ["scroll-area-amber-border", "oklch(76.9% 0.188 70.08 / 0.35)"],
    ["scroll-area-violet-border", "oklch(60.6% 0.25 292.717 / 0.35)"],
  ],
  darkExamples: [
    ["scroll-area-thumb-dark", "#64748b"],
    ["scroll-area-thumb-border-dark", "#020617"],
  ],
  darkVariableCount: 8,
});
