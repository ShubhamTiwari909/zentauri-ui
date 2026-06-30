/**
 * API Response Viewer design tokens.
 *
 * A data-display surface (like `json-viewer`): a small set of chrome
 * appearances over a themeable surface, a status pill colored by HTTP status
 * tone, tab controls, and a monospace body panel. Every color routes through a
 * `--zui-api-response-viewer-*` custom property with a hardcoded fallback and a
 * paired `dark:` variant.
 */

export const zuiApiResponseViewerBase = [
  "relative overflow-hidden rounded-lg border font-mono",
  "border-[color:var(--zui-api-response-viewer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-api-response-viewer-border-dark,var(--zui-border-dark,#ffffff1a))]",
  "bg-[var(--zui-api-response-viewer-bg,var(--zui-surface,oklch(98.4%_0.003_247.858)))] dark:bg-[var(--zui-api-response-viewer-bg-dark,var(--zui-surface-dark,oklch(12.9%_0.042_264.695)))]",
  "text-[color:var(--zui-api-response-viewer-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-api-response-viewer-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
] as const;

export const zuiApiResponseViewerSizes = {
  sm: "text-xs leading-5",
  md: "text-sm leading-6",
  lg: "text-base leading-7",
} as const;

/** Chrome appearances. `default` keeps the base surface; others override bg/border. */
export const zuiApiResponseViewerAppearances = {
  default: "",
  subtle:
    "bg-[var(--zui-api-response-viewer-subtle-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-api-response-viewer-subtle-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] border-transparent dark:border-transparent",
  contrast:
    "bg-[var(--zui-api-response-viewer-contrast-bg,#ffffff)] dark:bg-[var(--zui-api-response-viewer-contrast-bg-dark,oklch(16.8%_0.04_265.755))]",
  glass:
    "backdrop-blur-md bg-[var(--zui-api-response-viewer-glass-bg,#ffffffcc)] dark:bg-[var(--zui-api-response-viewer-glass-bg-dark,#0f172acc)] border-[color:var(--zui-api-response-viewer-glass-border,#ffffff66)] dark:border-[color:var(--zui-api-response-viewer-glass-border-dark,#ffffff1a)]",
} as const;

/** Header strip above the tabs (method, status pill, url, meta). */
export const zuiApiResponseViewerHeaderBase =
  "flex flex-wrap items-center gap-2 border-b px-3 py-2 border-[color:var(--zui-api-response-viewer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-api-response-viewer-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-api-response-viewer-header-bg,var(--zui-surface-muted,oklch(96.8%_0.007_247.896)))] dark:bg-[var(--zui-api-response-viewer-header-bg-dark,var(--zui-surface-muted-dark,oklch(20.8%_0.042_265.755)))] text-[color:var(--zui-api-response-viewer-header-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-api-response-viewer-header-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]";

/** Method label badge (GET, POST, …). */
export const zuiApiResponseViewerMethodBase =
  "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--zui-api-response-viewer-method-fg,#7c3aed)] dark:text-[color:var(--zui-api-response-viewer-method-fg-dark,#c4b5fd)] bg-[var(--zui-api-response-viewer-method-bg,#7c3aed1a)] dark:bg-[var(--zui-api-response-viewer-method-bg-dark,#c4b5fd26)]";

/** URL display, truncated. */
export const zuiApiResponseViewerUrlBase =
  "min-w-0 flex-1 truncate text-xs text-[color:var(--zui-api-response-viewer-url-fg,#64748b)] dark:text-[color:var(--zui-api-response-viewer-url-fg-dark,#94a3b8)]";

/** Right-aligned meta cluster (time / size). */
export const zuiApiResponseViewerMetaBase =
  "ml-auto flex items-center gap-3 text-xs text-[color:var(--zui-api-response-viewer-meta-fg,#94a3b8)] dark:text-[color:var(--zui-api-response-viewer-meta-fg-dark,#64748b)]";

/** Tabs row container. */
export const zuiApiResponseViewerTabsBase =
  "flex items-center gap-1 border-b px-2 pt-1 border-[color:var(--zui-api-response-viewer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-api-response-viewer-border-dark,var(--zui-border-dark,#ffffff1a))]";

/** A single tab button (inactive state). */
export const zuiApiResponseViewerTabBase =
  "relative -mb-px inline-flex items-center gap-1 rounded-t-md border-b-2 border-transparent px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer text-[color:var(--zui-api-response-viewer-tab-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-api-response-viewer-tab-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))] hover:bg-[var(--zui-api-response-viewer-tab-hover-bg,#0000000d)] dark:hover:bg-[var(--zui-api-response-viewer-tab-hover-bg-dark,#ffffff14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--zui-api-response-viewer-tab-active-fg,#7c3aed)]";

/** Active tab styling layered onto the base. */
export const zuiApiResponseViewerTabActive =
  "border-[color:var(--zui-api-response-viewer-tab-active-fg,#7c3aed)] dark:border-[color:var(--zui-api-response-viewer-tab-active-fg-dark,#c4b5fd)] text-[color:var(--zui-api-response-viewer-tab-active-fg,#7c3aed)] dark:text-[color:var(--zui-api-response-viewer-tab-active-fg-dark,#c4b5fd)]";

/** Copy action button. */
export const zuiApiResponseViewerActionBase =
  "ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors cursor-pointer text-[color:var(--zui-api-response-viewer-action-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-api-response-viewer-action-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))] hover:bg-[var(--zui-api-response-viewer-action-hover-bg,#0000000d)] dark:hover:bg-[var(--zui-api-response-viewer-action-hover-bg-dark,#ffffff14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--zui-api-response-viewer-tab-active-fg,#7c3aed)]";

/** Scrollable padded panel that holds the body / headers content. */
export const zuiApiResponseViewerPanelBase = "overflow-auto p-3 sm:p-4";

/** Pretty-printed JSON body. */
export const zuiApiResponseViewerBodyBase =
  "m-0 whitespace-pre-wrap break-words text-[color:var(--zui-api-response-viewer-body-fg,#16a34a)] dark:text-[color:var(--zui-api-response-viewer-body-fg-dark,#4ade80)]";

/** A header row key cell. */
export const zuiApiResponseViewerHeaderKey =
  "shrink-0 font-medium text-[color:var(--zui-api-response-viewer-key-fg,#7c3aed)] dark:text-[color:var(--zui-api-response-viewer-key-fg-dark,#c4b5fd)]";

/** A header row value cell. */
export const zuiApiResponseViewerHeaderValue =
  "min-w-0 break-words text-[color:var(--zui-api-response-viewer-value-fg,#2563eb)] dark:text-[color:var(--zui-api-response-viewer-value-fg-dark,#60a5fa)]";

/** Empty-state copy when no headers are present. */
export const zuiApiResponseViewerEmpty =
  "italic text-[color:var(--zui-api-response-viewer-empty-fg,#94a3b8)] dark:text-[color:var(--zui-api-response-viewer-empty-fg-dark,#64748b)]";

/**
 * Status pill colors keyed by tone. Tones derive from the HTTP status class:
 * 1xx info, 2xx success, 3xx redirect, 4xx clientError, 5xx serverError, else
 * neutral. Each entry carries a `--zui-` token and dark coverage.
 */
export const zuiApiResponseViewerStatusTones = {
  info: "text-[color:var(--zui-api-response-viewer-info-fg,#1d4ed8)] dark:text-[color:var(--zui-api-response-viewer-info-fg-dark,#93c5fd)] bg-[var(--zui-api-response-viewer-info-bg,#dbeafe)] dark:bg-[var(--zui-api-response-viewer-info-bg-dark,#1e3a8a4d)]",
  success:
    "text-[color:var(--zui-api-response-viewer-success-fg,#15803d)] dark:text-[color:var(--zui-api-response-viewer-success-fg-dark,#86efac)] bg-[var(--zui-api-response-viewer-success-bg,#dcfce7)] dark:bg-[var(--zui-api-response-viewer-success-bg-dark,#14532d4d)]",
  redirect:
    "text-[color:var(--zui-api-response-viewer-redirect-fg,#a16207)] dark:text-[color:var(--zui-api-response-viewer-redirect-fg-dark,#fde047)] bg-[var(--zui-api-response-viewer-redirect-bg,#fef9c3)] dark:bg-[var(--zui-api-response-viewer-redirect-bg-dark,#713f124d)]",
  clientError:
    "text-[color:var(--zui-api-response-viewer-client-error-fg,#c2410c)] dark:text-[color:var(--zui-api-response-viewer-client-error-fg-dark,#fdba74)] bg-[var(--zui-api-response-viewer-client-error-bg,#ffedd5)] dark:bg-[var(--zui-api-response-viewer-client-error-bg-dark,#7c2d124d)]",
  serverError:
    "text-[color:var(--zui-api-response-viewer-server-error-fg,#b91c1c)] dark:text-[color:var(--zui-api-response-viewer-server-error-fg-dark,#fca5a5)] bg-[var(--zui-api-response-viewer-server-error-bg,#fee2e2)] dark:bg-[var(--zui-api-response-viewer-server-error-bg-dark,#7f1d1d4d)]",
  neutral:
    "text-[color:var(--zui-api-response-viewer-neutral-fg,#475569)] dark:text-[color:var(--zui-api-response-viewer-neutral-fg-dark,#cbd5e1)] bg-[var(--zui-api-response-viewer-neutral-bg,#e2e8f0)] dark:bg-[var(--zui-api-response-viewer-neutral-bg-dark,#33415580)]",
} as const;

/** Shared base styling for the status pill (layout + shape). */
export const zuiApiResponseViewerStatusBase =
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold";
