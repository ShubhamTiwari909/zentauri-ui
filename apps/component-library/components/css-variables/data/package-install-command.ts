import { defineCssVariableReference } from "../reference-types";

export const packageInstallCommandCssVariables = defineCssVariableReference({
  title: "Package Install Command CSS variables",
  description:
    "Override these package-install-command variables on :root, a theme selector, or a component wrapper.",
  lightVariables: [
    ["package-install-command-border", "#0000001a"],
    ["package-install-command-bg", "oklch(98.4% 0.003 247.858)"],
    ["package-install-command-fg", "oklch(20.8% 0.042 265.755)"],
    ["package-install-command-subtle-bg", "oklch(92.9% 0.013 255.508)"],
    ["package-install-command-contrast-bg", "#ffffff"],
    ["package-install-command-glass-bg", "#ffffffcc"],
    ["package-install-command-glass-border", "#ffffff66"],
    ["package-install-command-tab-bg", "oklch(96.8% 0.007 247.896)"],
    ["package-install-command-tab-fg", "oklch(44.6% 0.043 257.281)"],
    ["package-install-command-tab-active-bg", "#ffffff"],
    ["package-install-command-tab-active-fg", "oklch(20.8% 0.042 265.755)"],
    ["package-install-command-copy-icon", "oklch(44.6% 0.043 257.281)"],
    ["package-install-command-copy-hover-bg", "#0000000d"],
  ],
  darkExamples: [
    ["package-install-command-border-dark", "#ffffff1a"],
    ["package-install-command-bg-dark", "oklch(12.9% 0.042 264.695)"],
    ["package-install-command-fg-dark", "oklch(98.4% 0.003 247.858)"],
    ["package-install-command-subtle-bg-dark", "oklch(27.9% 0.041 260.031)"],
    ["package-install-command-contrast-bg-dark", "oklch(16.8% 0.04 265.755)"],
    ["package-install-command-glass-bg-dark", "#0f172acc"],
    ["package-install-command-glass-border-dark", "#ffffff1a"],
    ["package-install-command-tab-bg-dark", "oklch(20.8% 0.042 265.755)"],
    ["package-install-command-tab-fg-dark", "oklch(86.9% 0.022 252.894)"],
    [
      "package-install-command-tab-active-bg-dark",
      "oklch(27.9% 0.041 260.031)",
    ],
    [
      "package-install-command-tab-active-fg-dark",
      "oklch(98.4% 0.003 247.858)",
    ],
    ["package-install-command-copy-icon-dark", "oklch(86.9% 0.022 252.894)"],
    ["package-install-command-copy-hover-bg-dark", "#ffffff14"],
  ],
  darkVariableCount: 13,
});
