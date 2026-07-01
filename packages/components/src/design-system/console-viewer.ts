/**
 * Console Viewer design tokens.
 *
 * A browser-console display surface: a small set of chrome appearances over a
 * themeable surface, a toolbar with filter/clear controls, and a scrollable
 * list of console entries. Each entry mirrors a browser DevTools console
 * message (log, info, warn, error, debug, dir, table, group). Every color
 * routes through a `--zui-console-viewer-*` custom property with a hardcoded
 * fallback and a paired `dark:` variant.
 */

export const zuiConsoleViewerBase = [
  "relative overflow-hidden rounded-lg border font-mono",
  "border-[color:var(--zui-console-viewer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-console-viewer-border-dark,var(--zui-border-dark,#ffffff1a))]",
  "bg-[var(--zui-console-viewer-bg,var(--zui-surface,oklch(98.4%_0.003_247.858)))] dark:bg-[var(--zui-console-viewer-bg-dark,var(--zui-surface-dark,oklch(12.9%_0.042_264.695)))]",
  "text-[color:var(--zui-console-viewer-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-console-viewer-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
] as const;

export const zuiConsoleViewerSizes = {
  sm: "text-xs leading-5",
  md: "text-sm leading-6",
  lg: "text-base leading-7",
} as const;

/** Chrome appearances. `default` keeps the base surface; others override bg/border. */
export const zuiConsoleViewerAppearances = {
  default: "",
  subtle:
    "bg-[var(--zui-console-viewer-subtle-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-console-viewer-subtle-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] border-transparent dark:border-transparent",
  contrast:
    "bg-[var(--zui-console-viewer-contrast-bg,#ffffff)] dark:bg-[var(--zui-console-viewer-contrast-bg-dark,oklch(16.8%_0.04_265.755))]",
  glass:
    "backdrop-blur-md bg-[var(--zui-console-viewer-glass-bg,#ffffffcc)] dark:bg-[var(--zui-console-viewer-glass-bg-dark,#0f172acc)] border-[color:var(--zui-console-viewer-glass-border,#ffffff66)] dark:border-[color:var(--zui-console-viewer-glass-border-dark,#ffffff1a)]",
} as const;

/** Toolbar with filter, clear, and collapse controls. */
export const zuiConsoleViewerToolbarBase =
  "flex flex-wrap items-center gap-2 border-b px-3 py-2 border-[color:var(--zui-console-viewer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-console-viewer-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-console-viewer-toolbar-bg,var(--zui-surface-muted,oklch(96.8%_0.007_247.896)))] dark:bg-[var(--zui-console-viewer-toolbar-bg-dark,var(--zui-surface-muted-dark,oklch(20.8%_0.042_265.755)))]";

/** Toolbar action button. */
export const zuiConsoleViewerActionBase =
  "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors cursor-pointer text-[color:var(--zui-console-viewer-action-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-console-viewer-action-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))] hover:bg-[var(--zui-console-viewer-action-hover-bg,#0000000d)] dark:hover:bg-[var(--zui-console-viewer-action-hover-bg-dark,#ffffff14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--zui-console-viewer-action-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:focus-visible:ring-[color:var(--zui-console-viewer-action-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]";

export const zuiConsoleViewerActionActive =
  "bg-[var(--zui-console-viewer-action-active-bg,#0000000d)] dark:bg-[var(--zui-console-viewer-action-active-bg-dark,#ffffff14)]";

/** Scrollable body that holds console entries. */
export const zuiConsoleViewerBodyBase = "overflow-auto p-3 sm:p-4 space-y-0.5";

/** A single console entry row. */
export const zuiConsoleViewerEntryBase =
  "flex flex-wrap items-start gap-2 rounded-sm px-1 py-0.5";

/** Per-console-type icon/indicator styling. */
export const zuiConsoleViewerIconBase =
  "mt-0.5 shrink-0 text-base leading-none";

export const zuiConsoleViewerTypeTones = {
  log: "text-[color:var(--zui-console-viewer-log-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-console-viewer-log-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
  info: "text-[color:var(--zui-console-viewer-info-fg,#2563eb)] dark:text-[color:var(--zui-console-viewer-info-fg-dark,#60a5fa)]",
  warn: "text-[color:var(--zui-console-viewer-warn-fg,#d97706)] dark:text-[color:var(--zui-console-viewer-warn-fg-dark,#fbbf24)]",
  error:
    "text-[color:var(--zui-console-viewer-error-fg,#dc2626)] dark:text-[color:var(--zui-console-viewer-error-fg-dark,#f87171)]",
  debug:
    "text-[color:var(--zui-console-viewer-debug-fg,#6b7280)] dark:text-[color:var(--zui-console-viewer-debug-fg-dark,#9ca3af)]",
  dir: "text-[color:var(--zui-console-viewer-dir-fg,#7c3aed)] dark:text-[color:var(--zui-console-viewer-dir-fg-dark,#c4b5fd)]",
  table:
    "text-[color:var(--zui-console-viewer-table-fg,#0d9488)] dark:text-[color:var(--zui-console-viewer-table-fg-dark,#2dd4bf)]",
  group:
    "text-[color:var(--zui-console-viewer-group-fg,#2563eb)] dark:text-[color:var(--zui-console-viewer-group-fg-dark,#60a5fa)]",
  groupCollapsed:
    "text-[color:var(--zui-console-viewer-group-fg,#2563eb)] dark:text-[color:var(--zui-console-viewer-group-fg-dark,#60a5fa)]",
  groupEnd:
    "text-[color:var(--zui-console-viewer-group-end-fg,#94a3b8)] dark:text-[color:var(--zui-console-viewer-group-end-fg-dark,#64748b)]",
} as const;

/** The console entry message content. */
export const zuiConsoleViewerMessage =
  "min-w-0 flex-1 break-words text-[color:var(--zui-console-viewer-message-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-console-viewer-message-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]";

/** Stack trace / additional metadata. */
export const zuiConsoleViewerMeta =
  "pl-6 sm:pl-0 mt-0.5 text-[color:var(--zui-console-viewer-meta-fg,#94a3b8)] dark:text-[color:var(--zui-console-viewer-meta-fg-dark,#64748b)]";

/** Indentation for grouped entries. */
export const zuiConsoleViewerIndent =
  "border-l border-[color:var(--zui-console-viewer-group-line,#0000001a)] dark:border-[color:var(--zui-console-viewer-group-line-dark,#ffffff1a)]";

/** Empty-state text. */
export const zuiConsoleViewerEmpty =
  "py-8 text-center italic text-[color:var(--zui-console-viewer-empty-fg,#94a3b8)] dark:text-[color:var(--zui-console-viewer-empty-fg-dark,#64748b)]";

/** Count badge for repeated entries. */
export const zuiConsoleViewerCountBase =
  "inline-flex items-center justify-center rounded-full px-1.5 text-xs font-bold leading-none text-[color:var(--zui-console-viewer-count-fg,#ffffff)] dark:text-[color:var(--zui-console-viewer-count-fg-dark,#ffffff)] bg-[var(--zui-console-viewer-count-bg,#2563eb)] dark:bg-[var(--zui-console-viewer-count-bg-dark,#3b82f6)]";
