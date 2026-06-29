/**
 * JSON Viewer design tokens.
 *
 * A code/data-display surface (like `code-diff`): a small set of chrome
 * appearances over a themeable surface, plus semantic syntax-color tokens for
 * keys and value types. Every color routes through a `--zui-json-viewer-*`
 * custom property with a hardcoded fallback and a paired `dark:` variant.
 */

export const zuiJsonViewerBase = [
  "relative rounded-lg border font-mono",
  "border-[color:var(--zui-json-viewer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-json-viewer-border-dark,var(--zui-border-dark,#ffffff1a))]",
  "bg-[var(--zui-json-viewer-bg,var(--zui-surface,oklch(98.4%_0.003_247.858)))] dark:bg-[var(--zui-json-viewer-bg-dark,var(--zui-surface-dark,oklch(12.9%_0.042_264.695)))]",
  "text-[color:var(--zui-json-viewer-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-json-viewer-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
] as const;

export const zuiJsonViewerSizes = {
  sm: "text-xs leading-5",
  md: "text-sm leading-6",
  lg: "text-base leading-7",
} as const;

/** Chrome appearances. `default` keeps the base surface; others override bg/border. */
export const zuiJsonViewerAppearances = {
  default: "",
  subtle:
    "bg-[var(--zui-json-viewer-subtle-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-json-viewer-subtle-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] border-transparent dark:border-transparent",
  contrast:
    "bg-[var(--zui-json-viewer-contrast-bg,#ffffff)] dark:bg-[var(--zui-json-viewer-contrast-bg-dark,oklch(16.8%_0.04_265.755))]",
  glass:
    "backdrop-blur-md bg-[var(--zui-json-viewer-glass-bg,#ffffffcc)] dark:bg-[var(--zui-json-viewer-glass-bg-dark,#0f172acc)] border-[color:var(--zui-json-viewer-glass-border,#ffffff66)] dark:border-[color:var(--zui-json-viewer-glass-border-dark,#ffffff1a)]",
} as const;

/** Optional toolbar above the tree (expand / collapse / copy). */
export const zuiJsonViewerToolbarBase =
  "flex items-center justify-between gap-2 border-b px-3 py-2 border-[color:var(--zui-json-viewer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-json-viewer-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-json-viewer-toolbar-bg,var(--zui-surface-muted,oklch(96.8%_0.007_247.896)))] dark:bg-[var(--zui-json-viewer-toolbar-bg-dark,var(--zui-surface-muted-dark,oklch(20.8%_0.042_265.755)))] text-[color:var(--zui-json-viewer-toolbar-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-json-viewer-toolbar-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]";

export const zuiJsonViewerActionBase =
  "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors cursor-pointer text-[color:var(--zui-json-viewer-action-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-json-viewer-action-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))] hover:bg-[var(--zui-json-viewer-action-hover-bg,#0000000d)] dark:hover:bg-[var(--zui-json-viewer-action-hover-bg-dark,#ffffff14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--zui-json-viewer-key-fg,#7c3aed)]";

/** Scrollable padded container that holds the recursive tree. */
export const zuiJsonViewerTreeBase = "overflow-auto p-3 sm:p-4";

/** A single toggle/disclosure control on a container node. */
export const zuiJsonViewerToggleBase =
  "inline-flex size-4 shrink-0 items-center justify-center rounded-sm cursor-pointer select-none text-[color:var(--zui-json-viewer-toggle-fg,#64748b)] dark:text-[color:var(--zui-json-viewer-toggle-fg-dark,#94a3b8)] hover:bg-[var(--zui-json-viewer-action-hover-bg,#0000000d)] dark:hover:bg-[var(--zui-json-viewer-action-hover-bg-dark,#ffffff14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--zui-json-viewer-key-fg,#7c3aed)]";

export const zuiJsonViewerKey =
  "text-[color:var(--zui-json-viewer-key-fg,#7c3aed)] dark:text-[color:var(--zui-json-viewer-key-fg-dark,#c4b5fd)]";

export const zuiJsonViewerPunctuation =
  "text-[color:var(--zui-json-viewer-punctuation-fg,#64748b)] dark:text-[color:var(--zui-json-viewer-punctuation-fg-dark,#94a3b8)]";

export const zuiJsonViewerPreview =
  "italic text-[color:var(--zui-json-viewer-preview-fg,#94a3b8)] dark:text-[color:var(--zui-json-viewer-preview-fg-dark,#64748b)]";

/** Vertical indent guide drawn down the left of an expanded container. */
export const zuiJsonViewerGuide =
  "border-l border-[color:var(--zui-json-viewer-guide-border,#0000000f)] dark:border-[color:var(--zui-json-viewer-guide-border-dark,#ffffff14)]";

/** Per-value-type syntax colors. Keys match `JsonValueKind` primitive members. */
export const zuiJsonViewerValues = {
  string:
    "text-[color:var(--zui-json-viewer-string-fg,#16a34a)] dark:text-[color:var(--zui-json-viewer-string-fg-dark,#4ade80)]",
  number:
    "text-[color:var(--zui-json-viewer-number-fg,#2563eb)] dark:text-[color:var(--zui-json-viewer-number-fg-dark,#60a5fa)]",
  boolean:
    "text-[color:var(--zui-json-viewer-boolean-fg,#c2410c)] dark:text-[color:var(--zui-json-viewer-boolean-fg-dark,#fb923c)]",
  null: "italic text-[color:var(--zui-json-viewer-null-fg,#64748b)] dark:text-[color:var(--zui-json-viewer-null-fg-dark,#94a3b8)]",
} as const;
