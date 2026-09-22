export const zuiGaugeBase =
  "relative inline-grid shrink-0 place-items-center text-[color:var(--zui-gauge-value-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-gauge-value-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]";

export const zuiGaugeAppearances = {
  default:
    "[--gauge-start:var(--zui-gauge-default-fill,var(--zui-brand,oklch(20.8%_0.042_265.755)))] [--gauge-end:var(--zui-gauge-default-fill,var(--zui-brand,oklch(20.8%_0.042_265.755)))] dark:[--gauge-start:var(--zui-gauge-default-fill-dark,var(--zui-brand-dark,oklch(98.4%_0.003_247.858)))] dark:[--gauge-end:var(--zui-gauge-default-fill-dark,var(--zui-brand-dark,oklch(98.4%_0.003_247.858)))]",
  secondary:
    "[--gauge-start:var(--zui-gauge-secondary-fill,var(--zui-color-slate,#64748b))] [--gauge-end:var(--zui-gauge-secondary-fill,var(--zui-color-slate,#64748b))] dark:[--gauge-start:var(--zui-gauge-secondary-fill-dark,var(--zui-color-slate-dark,#94a3b8))] dark:[--gauge-end:var(--zui-gauge-secondary-fill-dark,var(--zui-color-slate-dark,#94a3b8))]",
  destructive:
    "[--gauge-start:var(--zui-gauge-destructive-fill,var(--zui-status-error,#dc2626))] [--gauge-end:var(--zui-gauge-destructive-fill,var(--zui-status-error,#dc2626))] dark:[--gauge-start:var(--zui-gauge-destructive-fill-dark,var(--zui-status-error-dark,#f87171))] dark:[--gauge-end:var(--zui-gauge-destructive-fill-dark,var(--zui-status-error-dark,#f87171))]",
  success:
    "[--gauge-start:var(--zui-gauge-success-fill,var(--zui-status-success,#16a34a))] [--gauge-end:var(--zui-gauge-success-fill,var(--zui-status-success,#16a34a))] dark:[--gauge-start:var(--zui-gauge-success-fill-dark,var(--zui-status-success-dark,#4ade80))] dark:[--gauge-end:var(--zui-gauge-success-fill-dark,var(--zui-status-success-dark,#4ade80))]",
  warning:
    "[--gauge-start:var(--zui-gauge-warning-fill,var(--zui-status-warning,#d97706))] [--gauge-end:var(--zui-gauge-warning-fill,var(--zui-status-warning,#d97706))] dark:[--gauge-start:var(--zui-gauge-warning-fill-dark,var(--zui-status-warning-dark,#fbbf24))] dark:[--gauge-end:var(--zui-gauge-warning-fill-dark,var(--zui-status-warning-dark,#fbbf24))]",
  info: "[--gauge-start:var(--zui-gauge-info-fill,var(--zui-status-info,#0284c7))] [--gauge-end:var(--zui-gauge-info-fill,var(--zui-status-info,#0284c7))] dark:[--gauge-start:var(--zui-gauge-info-fill-dark,var(--zui-status-info-dark,#38bdf8))] dark:[--gauge-end:var(--zui-gauge-info-fill-dark,var(--zui-status-info-dark,#38bdf8))]",
  blue: "[--gauge-start:var(--zui-gauge-blue-fill,var(--zui-color-blue,#2563eb))] [--gauge-end:var(--zui-gauge-blue-fill,var(--zui-color-blue,#2563eb))] dark:[--gauge-start:var(--zui-gauge-blue-fill-dark,var(--zui-color-blue-dark,#60a5fa))] dark:[--gauge-end:var(--zui-gauge-blue-fill-dark,var(--zui-color-blue-dark,#60a5fa))]",
  cyan: "[--gauge-start:var(--zui-gauge-cyan-fill,var(--zui-color-cyan,#0891b2))] [--gauge-end:var(--zui-gauge-cyan-fill,var(--zui-color-cyan,#0891b2))] dark:[--gauge-start:var(--zui-gauge-cyan-fill-dark,var(--zui-color-cyan-dark,#22d3ee))] dark:[--gauge-end:var(--zui-gauge-cyan-fill-dark,var(--zui-color-cyan-dark,#22d3ee))]",
  emerald:
    "[--gauge-start:var(--zui-gauge-emerald-fill,var(--zui-color-emerald,#059669))] [--gauge-end:var(--zui-gauge-emerald-fill,var(--zui-color-emerald,#059669))] dark:[--gauge-start:var(--zui-gauge-emerald-fill-dark,var(--zui-color-emerald-dark,#34d399))] dark:[--gauge-end:var(--zui-gauge-emerald-fill-dark,var(--zui-color-emerald-dark,#34d399))]",
  violet:
    "[--gauge-start:var(--zui-gauge-violet-fill,var(--zui-color-violet,#7c3aed))] [--gauge-end:var(--zui-gauge-violet-fill,var(--zui-color-violet,#7c3aed))] dark:[--gauge-start:var(--zui-gauge-violet-fill-dark,var(--zui-color-violet-dark,#a78bfa))] dark:[--gauge-end:var(--zui-gauge-violet-fill-dark,var(--zui-color-violet-dark,#a78bfa))]",
  rose: "[--gauge-start:var(--zui-gauge-rose-fill,var(--zui-color-rose,#e11d48))] [--gauge-end:var(--zui-gauge-rose-fill,var(--zui-color-rose,#e11d48))] dark:[--gauge-start:var(--zui-gauge-rose-fill-dark,var(--zui-color-rose-dark,#fb7185))] dark:[--gauge-end:var(--zui-gauge-rose-fill-dark,var(--zui-color-rose-dark,#fb7185))]",
  amber:
    "[--gauge-start:var(--zui-gauge-amber-fill,var(--zui-color-amber,#d97706))] [--gauge-end:var(--zui-gauge-amber-fill,var(--zui-color-amber,#d97706))] dark:[--gauge-start:var(--zui-gauge-amber-fill-dark,var(--zui-color-amber-dark,#fbbf24))] dark:[--gauge-end:var(--zui-gauge-amber-fill-dark,var(--zui-color-amber-dark,#fbbf24))]",
  slate:
    "[--gauge-start:var(--zui-gauge-slate-fill,var(--zui-color-slate,#475569))] [--gauge-end:var(--zui-gauge-slate-fill,var(--zui-color-slate,#475569))] dark:[--gauge-start:var(--zui-gauge-slate-fill-dark,var(--zui-color-slate-dark,#94a3b8))] dark:[--gauge-end:var(--zui-gauge-slate-fill-dark,var(--zui-color-slate-dark,#94a3b8))]",
  "gradient-blue":
    "[--gauge-start:var(--zui-gauge-gradient-blue-from,#2563eb)] [--gauge-end:var(--zui-gauge-gradient-blue-to,#06b6d4)] dark:[--gauge-start:var(--zui-gauge-gradient-blue-from-dark,#60a5fa)] dark:[--gauge-end:var(--zui-gauge-gradient-blue-to-dark,#22d3ee)]",
  "gradient-emerald":
    "[--gauge-start:var(--zui-gauge-gradient-emerald-from,#059669)] [--gauge-end:var(--zui-gauge-gradient-emerald-to,#84cc16)] dark:[--gauge-start:var(--zui-gauge-gradient-emerald-from-dark,#34d399)] dark:[--gauge-end:var(--zui-gauge-gradient-emerald-to-dark,#a3e635)]",
  "gradient-rose":
    "[--gauge-start:var(--zui-gauge-gradient-rose-from,#e11d48)] [--gauge-end:var(--zui-gauge-gradient-rose-to,#d946ef)] dark:[--gauge-start:var(--zui-gauge-gradient-rose-from-dark,#fb7185)] dark:[--gauge-end:var(--zui-gauge-gradient-rose-to-dark,#e879f9)]",
  glass:
    "[--gauge-start:var(--zui-gauge-glass-fill,#64748b)] [--gauge-end:var(--zui-gauge-glass-fill,#64748b)] dark:[--gauge-start:var(--zui-gauge-glass-fill-dark,#e2e8f0)] dark:[--gauge-end:var(--zui-gauge-glass-fill-dark,#e2e8f0)]",
} as const;

export const zuiGaugeSizes = {
  xs: "size-16 text-sm",
  sm: "size-20 text-base",
  md: "size-28 text-xl",
  lg: "size-36 text-2xl",
  xl: "size-44 text-3xl",
} as const;

export const zuiGaugeThicknesses = {
  thin: "[--gauge-stroke-width:5]",
  medium: "[--gauge-stroke-width:8]",
  thick: "[--gauge-stroke-width:12]",
} as const;

export const zuiGaugeVariants = {
  radial: "",
  dial: "",
} as const;

export const zuiGaugeTrack =
  "fill-none stroke-[var(--zui-gauge-track,var(--zui-surface-muted,#e2e8f0))] dark:stroke-[var(--zui-gauge-track-dark,var(--zui-surface-muted-dark,#334155))] [stroke-width:var(--gauge-stroke-width)]";

export const zuiGaugeIndicator =
  "fill-none [stroke-width:var(--gauge-stroke-width)] transition-[stroke-dasharray] duration-500 ease-out motion-reduce:transition-none";

export const zuiGaugeLabel =
  "mt-0.5 max-w-full truncate text-[0.55em] font-medium leading-tight text-[color:var(--zui-gauge-label-fg,var(--zui-fg-muted,#64748b))] dark:text-[color:var(--zui-gauge-label-fg-dark,var(--zui-fg-muted-dark,#94a3b8)))]";
