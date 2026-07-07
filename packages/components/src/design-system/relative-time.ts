export const zuiRelativeTimeAppearances = {
  default:
    "bg-[var(--zui-relative-time-default-bg,transparent)] dark:bg-[var(--zui-relative-time-default-bg-dark,transparent)] text-[color:var(--zui-relative-time-default-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-relative-time-default-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]",
  primary:
    "bg-[var(--zui-relative-time-primary-bg,transparent)] dark:bg-[var(--zui-relative-time-primary-bg-dark,transparent)] text-[color:var(--zui-relative-time-primary-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-relative-time-primary-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
  secondary:
    "bg-[var(--zui-relative-time-secondary-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-relative-time-secondary-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] text-[color:var(--zui-relative-time-secondary-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-relative-time-secondary-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
  badge:
    "rounded-full bg-[var(--zui-relative-time-badge-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-relative-time-badge-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] text-[color:var(--zui-relative-time-badge-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-relative-time-badge-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]",
  blue: "bg-[var(--zui-relative-time-blue-bg,var(--zui-color-blue,#1d4ed8))] dark:bg-[var(--zui-relative-time-blue-bg-dark,var(--zui-color-blue-dark,#2563eb))] text-[color:var(--zui-relative-time-blue-fg,#ffffff)] dark:text-[color:var(--zui-relative-time-blue-fg-dark,#ffffff)]",
  green:
    "bg-[var(--zui-relative-time-green-bg,var(--zui-color-green,#15803d))] dark:bg-[var(--zui-relative-time-green-bg-dark,var(--zui-color-green-dark,#16a34a))] text-[color:var(--zui-relative-time-green-fg,#ffffff)] dark:text-[color:var(--zui-relative-time-green-fg-dark,#ffffff)]",
  red: "bg-[var(--zui-relative-time-red-bg,var(--zui-color-red,#b91c1c))] dark:bg-[var(--zui-relative-time-red-bg-dark,var(--zui-color-red-dark,#dc2626))] text-[color:var(--zui-relative-time-red-fg,#ffffff)] dark:text-[color:var(--zui-relative-time-red-fg-dark,#ffffff)]",
  outline:
    "border border-[color:var(--zui-relative-time-outline-border,var(--zui-border,#00000026))] dark:border-[color:var(--zui-relative-time-outline-border-dark,var(--zui-border-dark,#ffffff26))] bg-transparent dark:bg-transparent text-[color:var(--zui-relative-time-outline-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-relative-time-outline-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]",
  ghost:
    "bg-transparent dark:bg-transparent text-[color:var(--zui-relative-time-ghost-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-relative-time-ghost-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]",
} as const;

export type ZuiRelativeTimeAppearance = keyof typeof zuiRelativeTimeAppearances;

export const zuiRelativeTimeBase = [
  "inline-flex items-center gap-1 whitespace-nowrap",
  "transition-colors",
] as const;

export const zuiRelativeTimeSizes = {
  sm: "px-1 py-0.5 text-xs",
  md: "px-1.5 py-0.5 text-sm",
  lg: "px-2 py-1 text-base",
} as const;
