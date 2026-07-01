/**
 * API Endpoint Card design tokens.
 *
 * A card-surface that displays an API endpoint's method, path, description,
 * tags, and optional request/response examples. Every color routes through a
 * `--zui-api-endpoint-card-*` custom property with a hardcoded fallback and a
 * paired `dark:` variant.
 */

export const zuiApiEndpointCardBase = [
  "relative rounded-lg border",
  "border-[color:var(--zui-api-endpoint-card-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-api-endpoint-card-border-dark,var(--zui-border-dark,#ffffff1a))]",
  "bg-[var(--zui-api-endpoint-card-bg,var(--zui-surface,oklch(98.4%_0.003_247.858)))] dark:bg-[var(--zui-api-endpoint-card-bg-dark,var(--zui-surface-dark,oklch(12.9%_0.042_264.695)))]",
  "text-[color:var(--zui-api-endpoint-card-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-api-endpoint-card-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
] as const;

export const zuiApiEndpointCardSizes = {
  sm: "text-xs leading-5",
  md: "text-sm leading-6",
  lg: "text-base leading-7",
} as const;

/** Chrome appearances. `default` keeps the base surface; others override bg/border. */
export const zuiApiEndpointCardAppearances = {
  default: "",
  subtle:
    "bg-[var(--zui-api-endpoint-card-subtle-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-api-endpoint-card-subtle-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] border-transparent dark:border-transparent",
  contrast:
    "bg-[var(--zui-api-endpoint-card-contrast-bg,#ffffff)] dark:bg-[var(--zui-api-endpoint-card-contrast-bg-dark,oklch(16.8%_0.04_265.755))]",
  glass:
    "backdrop-blur-md bg-[var(--zui-api-endpoint-card-glass-bg,#ffffffcc)] dark:bg-[var(--zui-api-endpoint-card-glass-bg-dark,#0f172acc)] border-[color:var(--zui-api-endpoint-card-glass-border,#ffffff66)] dark:border-[color:var(--zui-api-endpoint-card-glass-border-dark,#ffffff1a)]",
} as const;

/** Header row with method badge and path. */
export const zuiApiEndpointCardHeaderBase =
  "flex flex-wrap items-center gap-3 border-b px-3 py-2.5 border-[color:var(--zui-api-endpoint-card-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-api-endpoint-card-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-api-endpoint-card-header-bg,var(--zui-surface-muted,oklch(96.8%_0.007_247.896)))] dark:bg-[var(--zui-api-endpoint-card-header-bg-dark,var(--zui-surface-muted-dark,oklch(20.8%_0.042_265.755)))]";

/** Method badge base styling. */
export const zuiApiEndpointCardMethodBase =
  "inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wide";

/** Per-HTTP-method badge colors. */
export const zuiApiEndpointCardMethodTones = {
  GET: "bg-[var(--zui-api-endpoint-card-method-get-bg,#dcfce7)] dark:bg-[var(--zui-api-endpoint-card-method-get-bg-dark,#14532d)] text-[color:var(--zui-api-endpoint-card-method-get-fg,#15803d)] dark:text-[color:var(--zui-api-endpoint-card-method-get-fg-dark,#86efac)]",
  POST: "bg-[var(--zui-api-endpoint-card-method-post-bg,#dbeafe)] dark:bg-[var(--zui-api-endpoint-card-method-post-bg-dark,#1e3a8a)] text-[color:var(--zui-api-endpoint-card-method-post-fg,#1d4ed8)] dark:text-[color:var(--zui-api-endpoint-card-method-post-fg-dark,#93c5fd)]",
  PUT: "bg-[var(--zui-api-endpoint-card-method-put-bg,#ffedd5)] dark:bg-[var(--zui-api-endpoint-card-method-put-bg-dark,#7c2d12)] text-[color:var(--zui-api-endpoint-card-method-put-fg,#c2410c)] dark:text-[color:var(--zui-api-endpoint-card-method-put-fg-dark,#fdba74)]",
  PATCH:
    "bg-[var(--zui-api-endpoint-card-method-patch-bg,#fef9c3)] dark:bg-[var(--zui-api-endpoint-card-method-patch-bg-dark,#713f12)] text-[color:var(--zui-api-endpoint-card-method-patch-fg,#a16207)] dark:text-[color:var(--zui-api-endpoint-card-method-patch-fg-dark,#fde047)]",
  DELETE:
    "bg-[var(--zui-api-endpoint-card-method-delete-bg,#fee2e2)] dark:bg-[var(--zui-api-endpoint-card-method-delete-bg-dark,#7f1d1d)] text-[color:var(--zui-api-endpoint-card-method-delete-fg,#b91c1c)] dark:text-[color:var(--zui-api-endpoint-card-method-delete-fg-dark,#fca5a5)]",
  HEAD: "bg-[var(--zui-api-endpoint-card-method-head-bg,#f3e8ff)] dark:bg-[var(--zui-api-endpoint-card-method-head-bg-dark,#4c1d95)] text-[color:var(--zui-api-endpoint-card-method-head-fg,#7c3aed)] dark:text-[color:var(--zui-api-endpoint-card-method-head-fg-dark,#d8b4fe)]",
  OPTIONS:
    "bg-[var(--zui-api-endpoint-card-method-options-bg,#e2e8f0)] dark:bg-[var(--zui-api-endpoint-card-method-options-bg-dark,#334155)] text-[color:var(--zui-api-endpoint-card-method-options-fg,#475569)] dark:text-[color:var(--zui-api-endpoint-card-method-options-fg-dark,#cbd5e1)]",
  neutral:
    "bg-[var(--zui-api-endpoint-card-method-neutral-bg,#e2e8f0)] dark:bg-[var(--zui-api-endpoint-card-method-neutral-bg-dark,#334155)] text-[color:var(--zui-api-endpoint-card-method-neutral-fg,#475569)] dark:text-[color:var(--zui-api-endpoint-card-method-neutral-fg-dark,#cbd5e1)]",
} as const;

/** Path / URL text. */
export const zuiApiEndpointCardPathBase =
  "min-w-0 flex-1 break-all font-mono text-[color:var(--zui-api-endpoint-card-path-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-api-endpoint-card-path-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]";

/** Description paragraph. */
export const zuiApiEndpointCardDescriptionBase =
  "px-3 py-2 text-[color:var(--zui-api-endpoint-card-description-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-api-endpoint-card-description-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]";

/** Tags row. */
export const zuiApiEndpointCardTagsBase =
  "flex flex-wrap items-center gap-1.5 px-3 pb-2";

/** A single tag chip. */
export const zuiApiEndpointCardTagBase =
  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-[color:var(--zui-api-endpoint-card-tag-fg,#7c3aed)] dark:text-[color:var(--zui-api-endpoint-card-tag-fg-dark,#c4b5fd)] bg-[var(--zui-api-endpoint-card-tag-bg,#7c3aed1a)] dark:bg-[var(--zui-api-endpoint-card-tag-bg-dark,#c4b5fd26)]";

/** Request/Response example button. */
export const zuiApiEndpointCardExampleBase =
  "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors cursor-pointer text-[color:var(--zui-api-endpoint-card-example-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-api-endpoint-card-example-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))] hover:bg-[var(--zui-api-endpoint-card-example-hover-bg,#0000000d)] dark:hover:bg-[var(--zui-api-endpoint-card-example-hover-bg-dark,#ffffff14)] focus-visible:outline-none focus-visible:ring-2";
