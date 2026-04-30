/** Shared section chrome for typography code examples (matches table preview pattern). */
export const TYPOGRAPHY_CODE_EXAMPLES_SECTION_CLASS =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

/** Tone tokens used across variants showcase and code-example rows. */
export const TYPOGRAPHY_TONES = [
  "default",
  "muted",
  "primary",
  "secondary",
  "accent",
  "destructive",
] as const;

/** Aligns with `@zentauri-ui/zentauri-components` Heading `tone` prop. */
export type AppTypographyTone = (typeof TYPOGRAPHY_TONES)[number];

export const HEADING_LEVEL_SHOWCASE = [1, 2, 3, 4, 5, 6] as const;

export type HeadingLevelShowcase = (typeof HEADING_LEVEL_SHOWCASE)[number];

export const TEXT_SIZE_VARIANTS = ["sm", "base", "lg"] as const;

export type TextSizeVariant = (typeof TEXT_SIZE_VARIANTS)[number];

export const LIST_MARKERS = ["disc", "circle", "none"] as const;

export type ListMarkerVariant = (typeof LIST_MARKERS)[number];
