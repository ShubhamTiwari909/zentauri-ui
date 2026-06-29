import { defineCssVariableReference } from "../reference-types";

export const qrScannerCssVariables = defineCssVariableReference({
  title: "QR scanner CSS variables",
  description:
    "Override these QR scanner variables on :root, a theme selector, or a component wrapper.",
  lightVariables: [
    ["qr-scanner-bg", "oklch(98.4% 0.003 247.858)"],
    ["qr-scanner-status-bg", "oklch(98.4% 0.003 247.858)"],
    ["qr-scanner-status-fg", "oklch(55.2% 0.046 257.417)"],
  ],
  darkExamples: [
    ["qr-scanner-bg-dark", "oklch(12.9% 0.042 264.695)"],
    ["qr-scanner-status-bg-dark", "oklch(12.9% 0.042 264.695)"],
    ["qr-scanner-status-fg-dark", "oklch(70.8% 0.015 256.243)"],
  ],
  darkVariableCount: 3,
});
