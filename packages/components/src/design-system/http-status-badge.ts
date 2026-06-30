/**
 * HTTP Status Badge design tokens.
 *
 * A small inline badge that maps an HTTP status code to a semantic tone. Color
 * is tone-driven (runtime), so each fill style ships as a tone-keyed map ending
 * in `Tones` — the design-token guard audits those for `--zui-*` + paired
 * `dark:` coverage. Every color routes through a `--zui-http-status-badge-*`
 * custom property with a hardcoded fallback and a paired `dark:` variant.
 */

/** The six semantic tones a status code can resolve to. */
export type HttpStatusBadgeTone =
  | "info"
  | "success"
  | "redirect"
  | "clientError"
  | "serverError"
  | "neutral";

/** Structural base: layout + typography only, no color. */
export const zuiHttpStatusBadgeBase =
  "inline-flex items-center gap-1.5 rounded-md border border-transparent font-medium font-mono whitespace-nowrap align-middle" as const;

export const zuiHttpStatusBadgeSizes = {
  sm: "px-1.5 py-0.5 text-xs leading-4",
  md: "px-2 py-0.5 text-sm leading-5",
  lg: "px-2.5 py-1 text-base leading-6",
} as const;

/** Solid fill: colored background with light/white foreground. */
export const zuiHttpStatusBadgeSolidTones = {
  info: "bg-[var(--zui-http-status-badge-info-solid-bg,#0284c7)] dark:bg-[var(--zui-http-status-badge-info-solid-bg-dark,#0ea5e9)] text-[color:var(--zui-http-status-badge-info-solid-fg,#ffffff)] dark:text-[color:var(--zui-http-status-badge-info-solid-fg-dark,#082f49)]",
  success:
    "bg-[var(--zui-http-status-badge-success-solid-bg,#16a34a)] dark:bg-[var(--zui-http-status-badge-success-solid-bg-dark,#22c55e)] text-[color:var(--zui-http-status-badge-success-solid-fg,#ffffff)] dark:text-[color:var(--zui-http-status-badge-success-solid-fg-dark,#052e16)]",
  redirect:
    "bg-[var(--zui-http-status-badge-redirect-solid-bg,#2563eb)] dark:bg-[var(--zui-http-status-badge-redirect-solid-bg-dark,#3b82f6)] text-[color:var(--zui-http-status-badge-redirect-solid-fg,#ffffff)] dark:text-[color:var(--zui-http-status-badge-redirect-solid-fg-dark,#0c1844)]",
  clientError:
    "bg-[var(--zui-http-status-badge-client-error-solid-bg,#d97706)] dark:bg-[var(--zui-http-status-badge-client-error-solid-bg-dark,#f59e0b)] text-[color:var(--zui-http-status-badge-client-error-solid-fg,#ffffff)] dark:text-[color:var(--zui-http-status-badge-client-error-solid-fg-dark,#451a03)]",
  serverError:
    "bg-[var(--zui-http-status-badge-server-error-solid-bg,#dc2626)] dark:bg-[var(--zui-http-status-badge-server-error-solid-bg-dark,#ef4444)] text-[color:var(--zui-http-status-badge-server-error-solid-fg,#ffffff)] dark:text-[color:var(--zui-http-status-badge-server-error-solid-fg-dark,#450a0a)]",
  neutral:
    "bg-[var(--zui-http-status-badge-neutral-solid-bg,#475569)] dark:bg-[var(--zui-http-status-badge-neutral-solid-bg-dark,#64748b)] text-[color:var(--zui-http-status-badge-neutral-solid-fg,#ffffff)] dark:text-[color:var(--zui-http-status-badge-neutral-solid-fg-dark,#020617)]",
} as const;

/** Soft fill: tinted background with a matching colored foreground. */
export const zuiHttpStatusBadgeSoftTones = {
  info: "bg-[var(--zui-http-status-badge-info-soft-bg,#e0f2fe)] dark:bg-[var(--zui-http-status-badge-info-soft-bg-dark,#0c4a6e4d)] text-[color:var(--zui-http-status-badge-info-soft-fg,#075985)] dark:text-[color:var(--zui-http-status-badge-info-soft-fg-dark,#7dd3fc)]",
  success:
    "bg-[var(--zui-http-status-badge-success-soft-bg,#dcfce7)] dark:bg-[var(--zui-http-status-badge-success-soft-bg-dark,#14532d4d)] text-[color:var(--zui-http-status-badge-success-soft-fg,#15803d)] dark:text-[color:var(--zui-http-status-badge-success-soft-fg-dark,#86efac)]",
  redirect:
    "bg-[var(--zui-http-status-badge-redirect-soft-bg,#dbeafe)] dark:bg-[var(--zui-http-status-badge-redirect-soft-bg-dark,#1e3a8a4d)] text-[color:var(--zui-http-status-badge-redirect-soft-fg,#1d4ed8)] dark:text-[color:var(--zui-http-status-badge-redirect-soft-fg-dark,#93c5fd)]",
  clientError:
    "bg-[var(--zui-http-status-badge-client-error-soft-bg,#fef3c7)] dark:bg-[var(--zui-http-status-badge-client-error-soft-bg-dark,#451a034d)] text-[color:var(--zui-http-status-badge-client-error-soft-fg,#b45309)] dark:text-[color:var(--zui-http-status-badge-client-error-soft-fg-dark,#fcd34d)]",
  serverError:
    "bg-[var(--zui-http-status-badge-server-error-soft-bg,#fee2e2)] dark:bg-[var(--zui-http-status-badge-server-error-soft-bg-dark,#450a0a4d)] text-[color:var(--zui-http-status-badge-server-error-soft-fg,#b91c1c)] dark:text-[color:var(--zui-http-status-badge-server-error-soft-fg-dark,#fca5a5)]",
  neutral:
    "bg-[var(--zui-http-status-badge-neutral-soft-bg,#f1f5f9)] dark:bg-[var(--zui-http-status-badge-neutral-soft-bg-dark,#1e293b4d)] text-[color:var(--zui-http-status-badge-neutral-soft-fg,#334155)] dark:text-[color:var(--zui-http-status-badge-neutral-soft-fg-dark,#cbd5e1)]",
} as const;

/** Outline fill: transparent background with a colored border + foreground. */
export const zuiHttpStatusBadgeOutlineTones = {
  info: "bg-transparent border-[color:var(--zui-http-status-badge-info-outline-border,#0284c7)] dark:border-[color:var(--zui-http-status-badge-info-outline-border-dark,#38bdf8)] text-[color:var(--zui-http-status-badge-info-outline-fg,#075985)] dark:text-[color:var(--zui-http-status-badge-info-outline-fg-dark,#7dd3fc)]",
  success:
    "bg-transparent border-[color:var(--zui-http-status-badge-success-outline-border,#16a34a)] dark:border-[color:var(--zui-http-status-badge-success-outline-border-dark,#4ade80)] text-[color:var(--zui-http-status-badge-success-outline-fg,#15803d)] dark:text-[color:var(--zui-http-status-badge-success-outline-fg-dark,#86efac)]",
  redirect:
    "bg-transparent border-[color:var(--zui-http-status-badge-redirect-outline-border,#2563eb)] dark:border-[color:var(--zui-http-status-badge-redirect-outline-border-dark,#60a5fa)] text-[color:var(--zui-http-status-badge-redirect-outline-fg,#1d4ed8)] dark:text-[color:var(--zui-http-status-badge-redirect-outline-fg-dark,#93c5fd)]",
  clientError:
    "bg-transparent border-[color:var(--zui-http-status-badge-client-error-outline-border,#d97706)] dark:border-[color:var(--zui-http-status-badge-client-error-outline-border-dark,#fbbf24)] text-[color:var(--zui-http-status-badge-client-error-outline-fg,#b45309)] dark:text-[color:var(--zui-http-status-badge-client-error-outline-fg-dark,#fcd34d)]",
  serverError:
    "bg-transparent border-[color:var(--zui-http-status-badge-server-error-outline-border,#dc2626)] dark:border-[color:var(--zui-http-status-badge-server-error-outline-border-dark,#f87171)] text-[color:var(--zui-http-status-badge-server-error-outline-fg,#b91c1c)] dark:text-[color:var(--zui-http-status-badge-server-error-outline-fg-dark,#fca5a5)]",
  neutral:
    "bg-transparent border-[color:var(--zui-http-status-badge-neutral-outline-border,#94a3b8)] dark:border-[color:var(--zui-http-status-badge-neutral-outline-border-dark,#64748b)] text-[color:var(--zui-http-status-badge-neutral-outline-fg,#334155)] dark:text-[color:var(--zui-http-status-badge-neutral-outline-fg-dark,#cbd5e1)]",
} as const;
