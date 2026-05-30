import { defineCssVariableReference } from "../css-variable-reference-types";
import { dropdownCssVariables } from "./dropdown";

const contextMenuLightVariables = [
  ...dropdownCssVariables.lightVariables.filter(
    ([name]) =>
      name.startsWith("dropdown-content") || name.startsWith("dropdown-item"),
  ),
  ["dropdown-label-fg", "oklch(55.1% 0.027 264.364)"],
  ["dropdown-separator-bg", "oklch(20.8% 0.042 265.755 / 0.12)"],
] as const;

export const contextMenuCssVariables = defineCssVariableReference({
  title: "ContextMenu CSS variables",
  description:
    "ContextMenu shares Dropdown content and item variables, plus label and separator tokens, so menu theming stays aligned across right-click and click-triggered actions.",
  lightVariables: contextMenuLightVariables,
  darkExamples: [
    ["dropdown-content-border-dark", "#ffffff1a"],
    ["dropdown-content-bg-dark", "oklch(20.8% 0.042 265.755)"],
    ["dropdown-content-fg-dark", "oklch(96.8% 0.007 247.896)"],
    ["dropdown-item-violet-bg-dark", "oklch(28.3% 0.141 291.089)"],
    ["dropdown-item-emerald-bg-dark", "oklch(26.2% 0.051 172.552)"],
    ["dropdown-label-fg-dark", "oklch(70.7% 0.022 261.325)"],
    ["dropdown-separator-bg-dark", "#ffffff1a"],
  ],
  darkVariableCount: 76,
});
