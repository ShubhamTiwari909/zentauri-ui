import { defineCssVariableReference } from "../css-variable-reference-types";
import { inputsCssVariables } from "./inputs";

export const searchCssVariables = defineCssVariableReference({
  title: "Search CSS variables",
  description:
    "SearchBar composes the Input recipe, so these are the zui variables available through the search input.",
  lightVariables: inputsCssVariables.lightVariables,
  darkExamples: inputsCssVariables.darkExamples,
  darkVariableCount: inputsCssVariables.darkVariableCount,
});
