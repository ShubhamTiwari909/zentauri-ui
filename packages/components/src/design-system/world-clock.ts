export const zuiWorldClockAppearances = {
  default:
    "bg-[var(--zui-world-clock-default-bg,var(--zui-surface,#ffffff))] dark:bg-[var(--zui-world-clock-default-bg-dark,var(--zui-surface-dark,oklch(20.8%_0.042_265.755)))] text-[color:var(--zui-world-clock-default-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-world-clock-default-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
  surface:
    "bg-[var(--zui-world-clock-surface-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-world-clock-surface-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] text-[color:var(--zui-world-clock-surface-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-world-clock-surface-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
  glass:
    "border border-[color:var(--zui-world-clock-glass-border,var(--zui-border,#00000026))] dark:border-[color:var(--zui-world-clock-glass-border-dark,var(--zui-border-dark,#ffffff26))] bg-[var(--zui-world-clock-glass-bg,var(--zui-surface-soft,#0000001a))] dark:bg-[var(--zui-world-clock-glass-bg-dark,var(--zui-surface-soft-dark,#ffffff1a))] backdrop-blur-md text-[color:var(--zui-world-clock-glass-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-world-clock-glass-fg-dark,var(--zui-fg-dark,#ffffff))]",
  outline:
    "border border-[color:var(--zui-world-clock-outline-border,var(--zui-border,#00000026))] dark:border-[color:var(--zui-world-clock-outline-border-dark,var(--zui-border-dark,#ffffff26))] bg-transparent dark:bg-transparent text-[color:var(--zui-world-clock-outline-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-world-clock-outline-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
  blue: "bg-[var(--zui-world-clock-blue-bg,var(--zui-color-blue,#2563eb))] dark:bg-[var(--zui-world-clock-blue-bg-dark,var(--zui-color-blue-dark,#3b82f6))] text-[color:var(--zui-world-clock-blue-fg,#ffffff)] dark:text-[color:var(--zui-world-clock-blue-fg-dark,#ffffff)]",
  green:
    "bg-[var(--zui-world-clock-green-bg,var(--zui-color-green,#16a34a))] dark:bg-[var(--zui-world-clock-green-bg-dark,var(--zui-color-green-dark,#22c55e))] text-[color:var(--zui-world-clock-green-fg,#ffffff)] dark:text-[color:var(--zui-world-clock-green-fg-dark,#ffffff)]",
  red: "bg-[var(--zui-world-clock-red-bg,var(--zui-color-red,#dc2626))] dark:bg-[var(--zui-world-clock-red-bg-dark,var(--zui-color-red-dark,#ef4444))] text-[color:var(--zui-world-clock-red-fg,#ffffff)] dark:text-[color:var(--zui-world-clock-red-fg-dark,#ffffff)]",
  "gradient-blue":
    "bg-linear-to-r from-[var(--zui-world-clock-gradient-blue-from,var(--zui-color-blue,oklch(42.4%_0.199_265.638)))] dark:from-[var(--zui-world-clock-gradient-blue-from-dark,var(--zui-color-blue-dark,oklch(54.6%_0.245_262.881)))] to-[var(--zui-world-clock-gradient-blue-to,var(--zui-color-purple,oklch(43.8%_0.218_303.724)))] dark:to-[var(--zui-world-clock-gradient-blue-to-dark,var(--zui-color-purple-dark,oklch(55.8%_0.288_302.321)))] text-[color:var(--zui-world-clock-gradient-blue-fg,var(--zui-brand-fg,oklch(96.8%_0.007_247.896)))] dark:text-[color:var(--zui-world-clock-gradient-blue-fg-dark,var(--zui-brand-fg-dark,#ffffff))]",
  "gradient-purple":
    "bg-linear-to-r from-[var(--zui-world-clock-gradient-purple-from,var(--zui-color-purple,oklch(43.8%_0.218_303.724)))] dark:from-[var(--zui-world-clock-gradient-purple-from-dark,var(--zui-color-purple-dark,oklch(55.8%_0.288_302.321)))] to-[var(--zui-world-clock-gradient-purple-to,var(--zui-color-pink,oklch(45.9%_0.187_3.815)))] dark:to-[var(--zui-world-clock-gradient-purple-to-dark,var(--zui-color-pink-dark,oklch(59.2%_0.249_0.584)))] text-[color:var(--zui-world-clock-gradient-purple-fg,var(--zui-brand-fg,oklch(96.8%_0.007_247.896)))] dark:text-[color:var(--zui-world-clock-gradient-purple-fg-dark,var(--zui-brand-fg-dark,#ffffff))]",
} as const;

export type ZuiWorldClockAppearance = keyof typeof zuiWorldClockAppearances;

export const zuiWorldClockBase = ["inline-flex flex-wrap gap-3"] as const;

export const zuiWorldClockLayouts = {
  grid: "grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3",
  row: "flex flex-row flex-wrap gap-3",
  list: "flex flex-col gap-2",
} as const;

export const zuiWorldClockCardBase = [
  "relative flex flex-col gap-1 rounded-xl p-4",
  "border border-[color:var(--zui-world-clock-card-border,var(--zui-border,#0000000d))] dark:border-[color:var(--zui-world-clock-card-border-dark,var(--zui-border-dark,#ffffff0d))]",
  "transition-colors",
] as const;

export const zuiWorldClockCardSizes = {
  sm: "p-3 gap-0.5",
  md: "p-4 gap-1",
  lg: "p-6 gap-2",
} as const;

export const zuiWorldClockLabelBase = [
  "font-medium",
  "text-[color:var(--zui-world-clock-label-fg,currentColor)] dark:text-[color:var(--zui-world-clock-label-fg-dark,currentColor)]",
] as const;

export const zuiWorldClockTimeBase = [
  "tabular-nums font-semibold tracking-tight",
  "text-[color:var(--zui-world-clock-time-fg,currentColor)] dark:text-[color:var(--zui-world-clock-time-fg-dark,currentColor)]",
] as const;

export const zuiWorldClockDateBase = [
  "text-xs",
  "text-[color:var(--zui-world-clock-date-fg,currentColor)] dark:text-[color:var(--zui-world-clock-date-fg-dark,currentColor)]",
  "opacity-70",
] as const;

export const zuiWorldClockOffsetBase = [
  "inline-flex items-center rounded-md px-1.5 py-0.5 text-[0.6rem] font-medium tabular-nums",
  "bg-[var(--zui-world-clock-offset-bg,rgba(0,0,0,0.06))] dark:bg-[var(--zui-world-clock-offset-bg-dark,rgba(255,255,255,0.1))]",
  "text-[color:var(--zui-world-clock-offset-fg,currentColor)] dark:text-[color:var(--zui-world-clock-offset-fg-dark,currentColor)]",
] as const;

export const zuiWorldClockDaynightBase = [
  "inline-flex size-6 items-center justify-center rounded-full text-xs",
  "opacity-60",
] as const;
