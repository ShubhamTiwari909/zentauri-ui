export type CssVariableToken = readonly [name: string, value: string];

export type CssVariableReference = {
  title: string;
  description: string;
  lightVariables: readonly CssVariableToken[];
  darkExamples: readonly CssVariableToken[];
  darkVariableCount: number;
};

export function defineCssVariableReference(
  reference: CssVariableReference,
): CssVariableReference {
  return reference;
}
