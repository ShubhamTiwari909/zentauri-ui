/**
 * HTTP Request Viewer design tokens.
 *
 * A request-inspector surface (like `json-viewer`): a small set of chrome
 * appearances over a themeable surface, a colored HTTP-method badge, tab
 * controls, and a body code panel. Every color routes through a
 * `--zui-http-request-viewer-*` custom property with a hardcoded fallback and
 * a paired `dark:` variant.
 */

export const zuiHttpRequestViewerBase = [
  "relative rounded-lg border font-mono",
  "border-[color:var(--zui-http-request-viewer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-http-request-viewer-border-dark,var(--zui-border-dark,#ffffff1a))]",
  "bg-[var(--zui-http-request-viewer-bg,var(--zui-surface,oklch(98.4%_0.003_247.858)))] dark:bg-[var(--zui-http-request-viewer-bg-dark,var(--zui-surface-dark,oklch(12.9%_0.042_264.695)))]",
  "text-[color:var(--zui-http-request-viewer-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-http-request-viewer-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
] as const;

export const zuiHttpRequestViewerSizes = {
  sm: "text-xs leading-5",
  md: "text-sm leading-6",
  lg: "text-base leading-7",
} as const;

/** Chrome appearances. `default` keeps the base surface; others override bg/border. */
export const zuiHttpRequestViewerAppearances = {
  default: "",
  subtle:
    "bg-[var(--zui-http-request-viewer-subtle-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-http-request-viewer-subtle-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] border-transparent dark:border-transparent",
  contrast:
    "bg-[var(--zui-http-request-viewer-contrast-bg,#ffffff)] dark:bg-[var(--zui-http-request-viewer-contrast-bg-dark,oklch(16.8%_0.04_265.755))]",
  glass:
    "backdrop-blur-md bg-[var(--zui-http-request-viewer-glass-bg,#ffffffcc)] dark:bg-[var(--zui-http-request-viewer-glass-bg-dark,#0f172acc)] border-[color:var(--zui-http-request-viewer-glass-border,#ffffff66)] dark:border-[color:var(--zui-http-request-viewer-glass-border-dark,#ffffff1a)]",
} as const;

/** Header row holding the method badge and the request URL. */
export const zuiHttpRequestViewerHeaderBase =
  "flex items-center gap-3 border-b px-3 py-2 border-[color:var(--zui-http-request-viewer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-http-request-viewer-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-http-request-viewer-header-bg,var(--zui-surface-muted,oklch(96.8%_0.007_247.896)))] dark:bg-[var(--zui-http-request-viewer-header-bg-dark,var(--zui-surface-muted-dark,oklch(20.8%_0.042_265.755)))]";

/** Monospace URL shown next to the method badge. */
export const zuiHttpRequestViewerUrlBase =
  "min-w-0 flex-1 break-all text-[color:var(--zui-http-request-viewer-url-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-http-request-viewer-url-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]";

/** The method pill base (color comes from the per-method tone map). */
export const zuiHttpRequestViewerMethodBase =
  "inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wide";

/** Per-HTTP-method badge colors. Keys are uppercased methods plus `neutral`. */
export const zuiHttpRequestViewerMethodTones = {
  GET: "bg-[var(--zui-http-request-viewer-method-get-bg,#dcfce7)] dark:bg-[var(--zui-http-request-viewer-method-get-bg-dark,#14532d)] text-[color:var(--zui-http-request-viewer-method-get-fg,#15803d)] dark:text-[color:var(--zui-http-request-viewer-method-get-fg-dark,#86efac)]",
  POST: "bg-[var(--zui-http-request-viewer-method-post-bg,#dbeafe)] dark:bg-[var(--zui-http-request-viewer-method-post-bg-dark,#1e3a8a)] text-[color:var(--zui-http-request-viewer-method-post-fg,#1d4ed8)] dark:text-[color:var(--zui-http-request-viewer-method-post-fg-dark,#93c5fd)]",
  PUT: "bg-[var(--zui-http-request-viewer-method-put-bg,#ffedd5)] dark:bg-[var(--zui-http-request-viewer-method-put-bg-dark,#7c2d12)] text-[color:var(--zui-http-request-viewer-method-put-fg,#c2410c)] dark:text-[color:var(--zui-http-request-viewer-method-put-fg-dark,#fdba74)]",
  PATCH:
    "bg-[var(--zui-http-request-viewer-method-patch-bg,#fef9c3)] dark:bg-[var(--zui-http-request-viewer-method-patch-bg-dark,#713f12)] text-[color:var(--zui-http-request-viewer-method-patch-fg,#a16207)] dark:text-[color:var(--zui-http-request-viewer-method-patch-fg-dark,#fde047)]",
  DELETE:
    "bg-[var(--zui-http-request-viewer-method-delete-bg,#fee2e2)] dark:bg-[var(--zui-http-request-viewer-method-delete-bg-dark,#7f1d1d)] text-[color:var(--zui-http-request-viewer-method-delete-fg,#b91c1c)] dark:text-[color:var(--zui-http-request-viewer-method-delete-fg-dark,#fca5a5)]",
  neutral:
    "bg-[var(--zui-http-request-viewer-method-neutral-bg,#e2e8f0)] dark:bg-[var(--zui-http-request-viewer-method-neutral-bg-dark,#334155)] text-[color:var(--zui-http-request-viewer-method-neutral-fg,#475569)] dark:text-[color:var(--zui-http-request-viewer-method-neutral-fg-dark,#cbd5e1)]",
} as const;

/** Tab strip below the header. */
export const zuiHttpRequestViewerTabsBase =
  "flex items-center gap-1 border-b px-2 pt-2 border-[color:var(--zui-http-request-viewer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-http-request-viewer-border-dark,var(--zui-border-dark,#ffffff1a))]";

/** A single tab button. Active state is wired via the active variant. */
export const zuiHttpRequestViewerTabBase =
  "inline-flex items-center rounded-t-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--zui-http-request-viewer-tab-active-fg,#7c3aed)]";

export const zuiHttpRequestViewerTabStates = {
  inactive:
    "text-[color:var(--zui-http-request-viewer-tab-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-http-request-viewer-tab-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))] hover:bg-[var(--zui-http-request-viewer-tab-hover-bg,#0000000d)] dark:hover:bg-[var(--zui-http-request-viewer-tab-hover-bg-dark,#ffffff14)]",
  active:
    "bg-[var(--zui-http-request-viewer-tab-active-bg,#ffffff)] dark:bg-[var(--zui-http-request-viewer-tab-active-bg-dark,#1e293b)] text-[color:var(--zui-http-request-viewer-tab-active-fg,#7c3aed)] dark:text-[color:var(--zui-http-request-viewer-tab-active-fg-dark,#c4b5fd)]",
} as const;

/** Scrollable padded container that holds the active panel. */
export const zuiHttpRequestViewerPanelBase = "overflow-auto p-3 sm:p-4";

/** A copy action button in the header. */
export const zuiHttpRequestViewerActionBase =
  "inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors cursor-pointer text-[color:var(--zui-http-request-viewer-action-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-http-request-viewer-action-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))] hover:bg-[var(--zui-http-request-viewer-action-hover-bg,#0000000d)] dark:hover:bg-[var(--zui-http-request-viewer-action-hover-bg-dark,#ffffff14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--zui-http-request-viewer-tab-active-fg,#7c3aed)]";

/** A key:value row in the headers / query panels. */
export const zuiHttpRequestViewerRowBase = "flex gap-2 break-words py-0.5";

export const zuiHttpRequestViewerRowKey =
  "shrink-0 font-medium text-[color:var(--zui-http-request-viewer-key-fg,#7c3aed)] dark:text-[color:var(--zui-http-request-viewer-key-fg-dark,#c4b5fd)]";

export const zuiHttpRequestViewerRowValue =
  "min-w-0 break-all text-[color:var(--zui-http-request-viewer-value-fg,#16a34a)] dark:text-[color:var(--zui-http-request-viewer-value-fg-dark,#4ade80)]";

/** Pretty-printed JSON body block. */
export const zuiHttpRequestViewerBodyBase =
  "whitespace-pre-wrap break-words text-[color:var(--zui-http-request-viewer-body-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-http-request-viewer-body-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]";

/** Muted "No headers / query / body" empty-state line. */
export const zuiHttpRequestViewerEmptyBase =
  "italic text-[color:var(--zui-http-request-viewer-empty-fg,#94a3b8)] dark:text-[color:var(--zui-http-request-viewer-empty-fg-dark,#64748b)]";
