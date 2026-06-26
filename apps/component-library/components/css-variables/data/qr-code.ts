import { defineCssVariableReference } from "../reference-types";

export const qrCodeCssVariables = defineCssVariableReference({
  title: "QR code CSS variables",
  description:
    "Override these QR code variables on :root, a theme selector, or a component wrapper.",
  lightVariables: [
    ["qr-code-bg", "oklch(98.4% 0.003 247.858)"],
    ["qr-code-border", "#0000001a"],
    ["qr-code-canvas-bg", "oklch(92.9% 0.013 255.508)"],
    ["qr-code-caption-fg", "oklch(55.2% 0.046 257.417)"],
  ],
  darkExamples: [
    ["qr-code-bg-dark", "oklch(12.9% 0.042 264.695)"],
    ["qr-code-border-dark", "#ffffff1a"],
    ["qr-code-canvas-bg-dark", "oklch(27.9% 0.041 260.031)"],
    ["qr-code-caption-fg-dark", "oklch(70.8% 0.015 256.243)"],
  ],
  darkVariableCount: 4,
});
