/**
 * Request Timeline Viewer design tokens.
 *
 * A waterfall data-display surface (like `json-viewer`): a small set of chrome
 * appearances over a themeable surface, plus semantic per-phase color tokens for
 * each network timing phase. Every color routes through a
 * `--zui-request-timeline-viewer-*` custom property with a hardcoded fallback
 * and a paired `dark:` variant.
 */

export const zuiRequestTimelineViewerBase = [
  "relative rounded-lg border font-mono",
  "border-[color:var(--zui-request-timeline-viewer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-request-timeline-viewer-border-dark,var(--zui-border-dark,#ffffff1a))]",
  "bg-[var(--zui-request-timeline-viewer-bg,var(--zui-surface,oklch(98.4%_0.003_247.858)))] dark:bg-[var(--zui-request-timeline-viewer-bg-dark,var(--zui-surface-dark,oklch(12.9%_0.042_264.695)))]",
  "text-[color:var(--zui-request-timeline-viewer-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-request-timeline-viewer-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
] as const;

export const zuiRequestTimelineViewerSizes = {
  sm: "text-xs leading-5 p-3 sm:p-4",
  md: "text-sm leading-6 p-3 sm:p-4",
  lg: "text-base leading-7 p-4 sm:p-5",
} as const;

/** Chrome appearances. `default` keeps the base surface; others override bg/border. */
export const zuiRequestTimelineViewerAppearances = {
  default: "",
  subtle:
    "bg-[var(--zui-request-timeline-viewer-subtle-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-request-timeline-viewer-subtle-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] border-transparent dark:border-transparent",
  contrast:
    "bg-[var(--zui-request-timeline-viewer-contrast-bg,#ffffff)] dark:bg-[var(--zui-request-timeline-viewer-contrast-bg-dark,oklch(16.8%_0.04_265.755))]",
  glass:
    "backdrop-blur-md bg-[var(--zui-request-timeline-viewer-glass-bg,#ffffffcc)] dark:bg-[var(--zui-request-timeline-viewer-glass-bg-dark,#0f172acc)] border-[color:var(--zui-request-timeline-viewer-glass-border,#ffffff66)] dark:border-[color:var(--zui-request-timeline-viewer-glass-border-dark,#ffffff1a)]",
} as const;

/** A single phase row container. */
export const zuiRequestTimelineViewerRowBase = "flex items-center gap-3 py-1";

/** The text label sitting to the left of each phase bar. */
export const zuiRequestTimelineViewerLabelBase =
  "w-20 shrink-0 truncate text-[color:var(--zui-request-timeline-viewer-label-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-request-timeline-viewer-label-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]";

/** The full-width track the proportional bar is laid over. */
export const zuiRequestTimelineViewerTrackBase =
  "relative h-3 min-w-0 flex-1 overflow-hidden rounded-sm bg-[var(--zui-request-timeline-viewer-track-bg,#0000000d)] dark:bg-[var(--zui-request-timeline-viewer-track-bg-dark,#ffffff14)]";

/** The colored proportional bar inside the track. */
export const zuiRequestTimelineViewerBarBase =
  "absolute inset-y-0 left-0 rounded-sm";

/** The duration text sitting to the right of each phase bar. */
export const zuiRequestTimelineViewerDurationBase =
  "w-16 shrink-0 text-right tabular-nums text-[color:var(--zui-request-timeline-viewer-duration-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-request-timeline-viewer-duration-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]";

/** Legend container mapping each tone to its label/color. */
export const zuiRequestTimelineViewerLegendBase =
  "mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t pt-3 border-[color:var(--zui-request-timeline-viewer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-request-timeline-viewer-border-dark,var(--zui-border-dark,#ffffff1a))] text-[color:var(--zui-request-timeline-viewer-legend-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-request-timeline-viewer-legend-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]";

/** A single swatch dot in the legend. */
export const zuiRequestTimelineViewerLegendSwatchBase =
  "inline-block size-2.5 shrink-0 rounded-sm";

/** Total-duration summary row beneath the timeline. */
export const zuiRequestTimelineViewerTotalBase =
  "mt-3 flex items-center justify-between gap-2 border-t pt-3 font-medium border-[color:var(--zui-request-timeline-viewer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-request-timeline-viewer-border-dark,var(--zui-border-dark,#ffffff1a))] text-[color:var(--zui-request-timeline-viewer-total-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-request-timeline-viewer-total-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]";

/** Per-phase-tone colors. Keys match `TimelinePhaseTone` members. */
export const zuiRequestTimelineViewerPhaseTones = {
  blocked:
    "bg-[var(--zui-request-timeline-viewer-blocked,#94a3b8)] dark:bg-[var(--zui-request-timeline-viewer-blocked-dark,#cbd5e1)]",
  dns: "bg-[var(--zui-request-timeline-viewer-dns,#0ea5e9)] dark:bg-[var(--zui-request-timeline-viewer-dns-dark,#38bdf8)]",
  connect:
    "bg-[var(--zui-request-timeline-viewer-connect,#f59e0b)] dark:bg-[var(--zui-request-timeline-viewer-connect-dark,#fbbf24)]",
  tls: "bg-[var(--zui-request-timeline-viewer-tls,#8b5cf6)] dark:bg-[var(--zui-request-timeline-viewer-tls-dark,#a78bfa)]",
  send: "bg-[var(--zui-request-timeline-viewer-send,#ec4899)] dark:bg-[var(--zui-request-timeline-viewer-send-dark,#f472b6)]",
  wait: "bg-[var(--zui-request-timeline-viewer-wait,#22c55e)] dark:bg-[var(--zui-request-timeline-viewer-wait-dark,#4ade80)]",
  receive:
    "bg-[var(--zui-request-timeline-viewer-receive,#2563eb)] dark:bg-[var(--zui-request-timeline-viewer-receive-dark,#60a5fa)]",
} as const;
