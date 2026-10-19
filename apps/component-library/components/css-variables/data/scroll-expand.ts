import { defineCssVariableReference } from "../reference-types";

export const scrollExpandCssVariables = defineCssVariableReference({
  title: "Scroll Expand CSS variables",
  description:
    "Theme the frame radius, section background, headline type, scrim gradient, overlay text and hint colour, and the focus ring of a self-scrolling section. Scroll timing is configured through props; private --_se-* values are not a public token API.",
  lightVariables: [
    ["scroll-expand-radius", "24px"],
    ["scroll-expand-bg", "transparent"],
    ["scroll-expand-focus-ring", "#0369a1"],
    [
      "scroll-expand-scrim",
      "linear-gradient(to top,#020617d9,#0206171f 45%,#02061766)",
    ],
    ["scroll-expand-fg", "#ffffff"],
    ["scroll-expand-hint", "#475569"],
    [
      "scroll-expand-light-scrim",
      "linear-gradient(to top,#ffffffe6,#ffffff26 45%,#ffffff73)",
    ],
    ["scroll-expand-light-fg", "#0f172a"],
    ["scroll-expand-light-hint", "#475569"],
    [
      "scroll-expand-contrast-scrim",
      "linear-gradient(to top,#000000f2,#00000066 50%,#000000a6)",
    ],
    ["scroll-expand-contrast-fg", "#ffffff"],
    ["scroll-expand-contrast-hint", "#0f172a"],
    [
      "scroll-expand-tint-scrim",
      "linear-gradient(to top,#312e81e6,#4338ca33 45%,#1e1b4b80)",
    ],
    ["scroll-expand-tint-fg", "#eef2ff"],
    ["scroll-expand-tint-hint", "#4338ca"],
    ["scroll-expand-title-weight", "700"],
    ["scroll-expand-title-tracking", "-0.03em"],
    ["scroll-expand-title-size", "clamp(1.75rem,7.5cqi,5.25rem)"],
    ["scroll-expand-title-shadow", "0 2px 24px #00000073"],
  ],
  darkExamples: [
    ["scroll-expand-radius-dark", "24px"],
    ["scroll-expand-bg-dark", "transparent"],
    ["scroll-expand-focus-ring-dark", "#38bdf8"],
    [
      "scroll-expand-scrim-dark",
      "linear-gradient(to top,#000000d9,#0000001f 45%,#00000066)",
    ],
    ["scroll-expand-fg-dark", "#ffffff"],
    ["scroll-expand-hint-dark", "#ffffff8c"],
    [
      "scroll-expand-light-scrim-dark",
      "linear-gradient(to top,#f8fafce6,#f8fafc26 45%,#f8fafc73)",
    ],
    ["scroll-expand-light-fg-dark", "#0f172a"],
    ["scroll-expand-light-hint-dark", "#cbd5e1"],
    [
      "scroll-expand-contrast-scrim-dark",
      "linear-gradient(to top,#000000f2,#00000066 50%,#000000a6)",
    ],
    ["scroll-expand-contrast-fg-dark", "#ffffff"],
    ["scroll-expand-contrast-hint-dark", "#ffffffb3"],
    [
      "scroll-expand-tint-scrim-dark",
      "linear-gradient(to top,#1e1b4bf2,#4338ca40 45%,#1e1b4b8c)",
    ],
    ["scroll-expand-tint-fg-dark", "#eef2ff"],
    ["scroll-expand-tint-hint-dark", "#a5b4fc"],
    ["scroll-expand-title-weight-dark", "700"],
    ["scroll-expand-title-tracking-dark", "-0.03em"],
    ["scroll-expand-title-size-dark", "clamp(1.75rem,7.5cqi,5.25rem)"],
    ["scroll-expand-title-shadow-dark", "0 2px 24px #00000073"],
  ],
  darkVariableCount: 19,
});
