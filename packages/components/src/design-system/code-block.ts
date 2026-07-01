/**
 * Code Block design tokens.
 *
 * A code-display surface with a language label, line numbers, and a copy
 * button. Every color routes through a `--zui-code-block-*` custom property
 * with a hardcoded fallback and a paired `dark:` variant.
 */

export const zuiCodeBlockBase = [
  "relative rounded-lg border font-mono",
  "border-[color:var(--zui-code-block-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-code-block-border-dark,var(--zui-border-dark,#ffffff1a))]",
  "bg-[var(--zui-code-block-bg,var(--zui-surface,oklch(98.4%_0.003_247.858)))] dark:bg-[var(--zui-code-block-bg-dark,var(--zui-surface-dark,oklch(12.9%_0.042_264.695)))]",
  "text-[color:var(--zui-code-block-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-code-block-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
] as const;

export const zuiCodeBlockSizes = {
  sm: "text-xs leading-5",
  md: "text-sm leading-6",
  lg: "text-base leading-7",
} as const;

/** Chrome appearances. `default` keeps the base surface; others override bg/border. */
export const zuiCodeBlockAppearances = {
  default: "",
  subtle:
    "bg-[var(--zui-code-block-subtle-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-code-block-subtle-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] border-transparent dark:border-transparent",
  contrast:
    "bg-[var(--zui-code-block-contrast-bg,oklch(16.8%_0.04_265.755))] dark:bg-[var(--zui-code-block-contrast-bg-dark,#0c0a09)] border-[color:var(--zui-code-block-contrast-border,#334155)] dark:border-[color:var(--zui-code-block-contrast-border-dark,#1e293b)] text-[color:var(--zui-code-block-contrast-fg,#e2e8f0)] dark:text-[color:var(--zui-code-block-contrast-fg-dark,#fafafa)]",
  glass:
    "backdrop-blur-md bg-[var(--zui-code-block-glass-bg,#ffffffcc)] dark:bg-[var(--zui-code-block-glass-bg-dark,#0f172acc)] border-[color:var(--zui-code-block-glass-border,#ffffff66)] dark:border-[color:var(--zui-code-block-glass-border-dark,#ffffff1a)]",
} as const;

/** Header bar with language label and copy button. */
export const zuiCodeBlockHeaderBase =
  "flex items-center gap-2 border-b px-3 py-1.5 border-[color:var(--zui-code-block-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-code-block-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-code-block-header-bg,var(--zui-surface-muted,oklch(96.8%_0.007_247.896)))] dark:bg-[var(--zui-code-block-header-bg-dark,var(--zui-surface-muted-dark,oklch(20.8%_0.042_265.755)))]";

/** Language label badge. */
export const zuiCodeBlockLangBase =
  "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium text-[color:var(--zui-code-block-lang-fg,#7c3aed)] dark:text-[color:var(--zui-code-block-lang-fg-dark,#c4b5fd)] bg-[var(--zui-code-block-lang-bg,#7c3aed1a)] dark:bg-[var(--zui-code-block-lang-bg-dark,#c4b5fd26)]";

/** Copy action button. */
export const zuiCodeBlockActionBase =
  "ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors cursor-pointer text-[color:var(--zui-code-block-action-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-code-block-action-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))] hover:bg-[var(--zui-code-block-action-hover-bg,#0000000d)] dark:hover:bg-[var(--zui-code-block-action-hover-bg-dark,#ffffff14)] focus-visible:outline-none focus-visible:ring-2";

/** Scrollable code body. */
export const zuiCodeBlockBodyBase = "overflow-auto";

/** The <pre> element holding the code. */
export const zuiCodeBlockPre =
  "m-0 whitespace-pre break-all p-3 sm:p-4 text-[color:var(--zui-code-block-code-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-code-block-code-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]";

/** Line number gutter. */
export const zuiCodeBlockLineNumber =
  "inline-block w-8 shrink-0 select-none text-right text-[color:var(--zui-code-block-line-number-fg,#94a3b8)] dark:text-[color:var(--zui-code-block-line-number-fg-dark,#64748b)]";
