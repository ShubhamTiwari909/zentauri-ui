import { defineCssVariableReference } from "../reference-types";

export const decryptedTextCssVariables = defineCssVariableReference({
  title: "Decrypted Text CSS variables",
  description:
    "Colour the glyphs shown while each letter is still scrambled. Timing and order are configured through props; private --_dt-* values are not a public token API.",
  lightVariables: [
    ["decrypted-text-glyph", "currentColor"],
    ["decrypted-text-muted-glyph", "#64748b"],
    ["decrypted-text-matrix-glyph", "#15803d"],
    ["decrypted-text-cyan-glyph", "#0e7490"],
    ["decrypted-text-amber-glyph", "#b45309"],
    ["decrypted-text-violet-glyph", "#6d28d9"],
    ["decrypted-text-rose-glyph", "#be123c"],
  ],
  darkExamples: [
    ["decrypted-text-glyph-dark", "currentColor"],
    ["decrypted-text-muted-glyph-dark", "#94a3b8"],
    ["decrypted-text-matrix-glyph-dark", "#4ade80"],
    ["decrypted-text-cyan-glyph-dark", "#22d3ee"],
    ["decrypted-text-amber-glyph-dark", "#fbbf24"],
    ["decrypted-text-violet-glyph-dark", "#a78bfa"],
    ["decrypted-text-rose-glyph-dark", "#fb7185"],
  ],
  darkVariableCount: 7,
});
