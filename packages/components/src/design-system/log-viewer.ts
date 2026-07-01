/**
 * Log Viewer design tokens.
 *
 * A structured-log display surface: a small set of chrome appearances over a
 * themeable surface, a level-filter bar, a search input, and a scrollable list
 * of log entries. Each entry carries a timestamp, level badge, and message,
 * with per-level color tokens. Every color routes through a
 * `--zui-log-viewer-*` custom property with a hardcoded fallback and a paired
 * `dark:` variant.
 */

export const zuiLogViewerBase = [
  "relative overflow-hidden rounded-lg border font-mono",
  "border-[color:var(--zui-log-viewer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-log-viewer-border-dark,var(--zui-border-dark,#ffffff1a))]",
  "bg-[var(--zui-log-viewer-bg,var(--zui-surface,oklch(98.4%_0.003_247.858)))] dark:bg-[var(--zui-log-viewer-bg-dark,var(--zui-surface-dark,oklch(12.9%_0.042_264.695)))]",
  "text-[color:var(--zui-log-viewer-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-log-viewer-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
] as const;

export const zuiLogViewerSizes = {
  sm: "text-[10px] leading-4",
  md: "text-xs leading-5",
  lg: "text-sm leading-6",
} as const;

/** Chrome appearances. `default` keeps the base surface; others override bg/border. */
export const zuiLogViewerAppearances = {
  default: "",
  subtle:
    "bg-[var(--zui-log-viewer-subtle-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-log-viewer-subtle-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] border-transparent dark:border-transparent",
  contrast:
    "bg-[var(--zui-log-viewer-contrast-bg,#ffffff)] dark:bg-[var(--zui-log-viewer-contrast-bg-dark,oklch(16.8%_0.04_265.755))]",
  glass:
    "backdrop-blur-md bg-[var(--zui-log-viewer-glass-bg,#ffffffcc)] dark:bg-[var(--zui-log-viewer-glass-bg-dark,#0f172acc)] border-[color:var(--zui-log-viewer-glass-border,#ffffff66)] dark:border-[color:var(--zui-log-viewer-glass-border-dark,#ffffff1a)]",
} as const;

/** Header bar with filter controls, search, and copy. */
export const zuiLogViewerHeaderBase =
  "flex flex-wrap items-center gap-1 sm:gap-2 border-b px-2 sm:px-3 py-2 border-[color:var(--zui-log-viewer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-log-viewer-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-log-viewer-header-bg,var(--zui-surface-muted,oklch(96.8%_0.007_247.896)))] dark:bg-[var(--zui-log-viewer-header-bg-dark,var(--zui-surface-muted-dark,oklch(20.8%_0.042_265.755)))]";

/** Filter toggle button. */
export const zuiLogViewerFilterBase =
  "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors cursor-pointer text-[color:var(--zui-log-viewer-filter-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-log-viewer-filter-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))] hover:bg-[var(--zui-log-viewer-filter-hover-bg,#0000000d)] dark:hover:bg-[var(--zui-log-viewer-filter-hover-bg-dark,#ffffff14)] focus-visible:outline-none focus-visible:ring-2";

export const zuiLogViewerFilterActive =
  "bg-[var(--zui-log-viewer-filter-active-bg,#0000000d)] dark:bg-[var(--zui-log-viewer-filter-active-bg-dark,#ffffff14)]";

/** Search input wrapper. */
export const zuiLogViewerSearchBase =
  "flex items-center gap-1 rounded-md border px-2 py-1 border-[color:var(--zui-log-viewer-search-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-log-viewer-search-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-log-viewer-search-bg,var(--zui-surface,oklch(98.4%_0.003_247.858)))] dark:bg-[var(--zui-log-viewer-search-bg-dark,var(--zui-surface-dark,oklch(12.9%_0.042_264.695)))]";

export const zuiLogViewerSearchInput =
  "w-full sm:w-32 border-none bg-transparent p-0 text-xs outline-none text-[color:var(--zui-log-viewer-search-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-log-viewer-search-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))] placeholder:text-[color:var(--zui-log-viewer-search-placeholder,#94a3b8)] dark:placeholder:text-[color:var(--zui-log-viewer-search-placeholder-dark,#64748b)]";

/** Copy action button. */
export const zuiLogViewerActionBase =
  "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors cursor-pointer text-[color:var(--zui-log-viewer-action-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-log-viewer-action-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))] hover:bg-[var(--zui-log-viewer-action-hover-bg,#0000000d)] dark:hover:bg-[var(--zui-log-viewer-action-hover-bg-dark,#ffffff14)] focus-visible:outline-none focus-visible:ring-2";

/** Scrollable body that holds log entries. */
export const zuiLogViewerBodyBase = "overflow-auto p-3 sm:p-4 space-y-2";

/** A single log entry row. */
export const zuiLogViewerEntryBase =
  "flex flex-wrap items-start gap-1 sm:gap-3 rounded-sm px-1 py-0.5";

/** Timestamp prefix in each entry. */
export const zuiLogViewerTimestamp =
  "sm:shrink-0 text-[color:var(--zui-log-viewer-timestamp-fg,#94a3b8)] dark:text-[color:var(--zui-log-viewer-timestamp-fg-dark,#64748b)]";

/** Level badge base styling. */
export const zuiLogViewerLevelBase =
  "inline-flex sm:shrink-0 items-center rounded px-1.5 py-0.5 text-xs font-semibold uppercase leading-none";

/** Per-level badge colors. */
export const zuiLogViewerLevelTones = {
  error:
    "bg-[var(--zui-log-viewer-error-bg,#fee2e2)] dark:bg-[var(--zui-log-viewer-error-bg-dark,#7f1d1d)] text-[color:var(--zui-log-viewer-error-fg,#b91c1c)] dark:text-[color:var(--zui-log-viewer-error-fg-dark,#fca5a5)]",
  warn: "bg-[var(--zui-log-viewer-warn-bg,#fef9c3)] dark:bg-[var(--zui-log-viewer-warn-bg-dark,#713f12)] text-[color:var(--zui-log-viewer-warn-fg,#a16207)] dark:text-[color:var(--zui-log-viewer-warn-fg-dark,#fde047)]",
  info: "bg-[var(--zui-log-viewer-info-bg,#dbeafe)] dark:bg-[var(--zui-log-viewer-info-bg-dark,#1e3a8a)] text-[color:var(--zui-log-viewer-info-fg,#1d4ed8)] dark:text-[color:var(--zui-log-viewer-info-fg-dark,#93c5fd)]",
  debug:
    "bg-[var(--zui-log-viewer-debug-bg,#e2e8f0)] dark:bg-[var(--zui-log-viewer-debug-bg-dark,#334155)] text-[color:var(--zui-log-viewer-debug-fg,#475569)] dark:text-[color:var(--zui-log-viewer-debug-fg-dark,#cbd5e1)]",
  verbose:
    "bg-[var(--zui-log-viewer-verbose-bg,#f3e8ff)] dark:bg-[var(--zui-log-viewer-verbose-bg-dark,#4c1d95)] text-[color:var(--zui-log-viewer-verbose-fg,#7c3aed)] dark:text-[color:var(--zui-log-viewer-verbose-fg-dark,#d8b4fe)]",
} as const;

/** The log entry message text. */
export const zuiLogViewerMessage =
  "sm:min-w-0 sm:flex-1 break-words text-[color:var(--zui-log-viewer-message-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-log-viewer-message-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]";

/** Muted metadata/details below the message. */
export const zuiLogViewerMeta =
  "mt-0.5 text-[color:var(--zui-log-viewer-meta-fg,#94a3b8)] dark:text-[color:var(--zui-log-viewer-meta-fg-dark,#64748b)]";

/** Empty-state copy when no logs match or no logs exist. */
export const zuiLogViewerEmpty =
  "py-8 text-center italic text-[color:var(--zui-log-viewer-empty-fg,#94a3b8)] dark:text-[color:var(--zui-log-viewer-empty-fg-dark,#64748b)]";

/** Summary bar at the bottom showing total count and filtered count. */
export const zuiLogViewerSummaryBase =
  "flex items-center gap-3 border-t px-3 py-1.5 border-[color:var(--zui-log-viewer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-log-viewer-border-dark,var(--zui-border-dark,#ffffff1a))] text-xs text-[color:var(--zui-log-viewer-summary-fg,#94a3b8)] dark:text-[color:var(--zui-log-viewer-summary-fg-dark,#64748b)]";
