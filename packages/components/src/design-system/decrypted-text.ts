// Public tokens are --zui-decrypted-text-*; --_dt-* properties are private.
// The real text lives in a visually hidden copy; the animated letters are
// aria-hidden. Each scrambled glyph floats over its hidden real letter, so the
// line never changes width while the text decodes.

export const zuiDecryptedTextBase = "relative";

// Colour of the glyphs while a letter is still scrambled. `default` keeps the
// surrounding text colour.
export const zuiDecryptedTextAppearances = {
  default:
    "[--_dt-glyph:var(--zui-decrypted-text-glyph,currentColor)] dark:[--_dt-glyph:var(--zui-decrypted-text-glyph-dark,currentColor)]",
  muted:
    "[--_dt-glyph:var(--zui-decrypted-text-muted-glyph,#64748b)] dark:[--_dt-glyph:var(--zui-decrypted-text-muted-glyph-dark,#94a3b8)]",
  matrix:
    "[--_dt-glyph:var(--zui-decrypted-text-matrix-glyph,#15803d)] dark:[--_dt-glyph:var(--zui-decrypted-text-matrix-glyph-dark,#4ade80)]",
  cyan: "[--_dt-glyph:var(--zui-decrypted-text-cyan-glyph,#0e7490)] dark:[--_dt-glyph:var(--zui-decrypted-text-cyan-glyph-dark,#22d3ee)]",
  amber:
    "[--_dt-glyph:var(--zui-decrypted-text-amber-glyph,#b45309)] dark:[--_dt-glyph:var(--zui-decrypted-text-amber-glyph-dark,#fbbf24)]",
  violet:
    "[--_dt-glyph:var(--zui-decrypted-text-violet-glyph,#6d28d9)] dark:[--_dt-glyph:var(--zui-decrypted-text-violet-glyph-dark,#a78bfa)]",
  rose: "[--_dt-glyph:var(--zui-decrypted-text-rose-glyph,#be123c)] dark:[--_dt-glyph:var(--zui-decrypted-text-rose-glyph-dark,#fb7185)]",
} as const;

export const zuiDecryptedTextVisual = "whitespace-pre-wrap";

export const zuiDecryptedTextWord = "whitespace-nowrap";

// Cells stay inline so resolved letters keep the font's kerning; `flip`
// switches them to inline-block because transforms need a box.
export const zuiDecryptedTextCell = "group/dt-cell relative";

export const zuiDecryptedTextEffects = {
  scramble: "",
  fade: "",
  flip: "inline-block",
} as const;

// The real letter. Hidden while scrambled, and always shown when scripts are
// off or motion is reduced, so the text can never be stuck scrambled.
export const zuiDecryptedTextGhost =
  "group-data-[scrambled]/dt-cell:invisible [@media(scripting:none)]:visible! motion-reduce:visible!";

export const zuiDecryptedTextGhostFade =
  "transition-opacity duration-300 ease-out group-data-[scrambled]/dt-cell:visible group-data-[scrambled]/dt-cell:opacity-0 [@media(scripting:none)]:opacity-100! motion-reduce:opacity-100! motion-reduce:transition-none";

// Centred on both axes: the glyph's line box and the real letter's content
// area share a centre, so their baselines match at any line-height.
export const zuiDecryptedTextGlyph =
  "pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 select-none text-[color:var(--_dt-glyph,currentColor)] group-data-[scrambled]/dt-cell:inline [@media(scripting:none)]:hidden! motion-reduce:hidden!";

export const zuiDecryptedTextGlyphFade = "opacity-45";
