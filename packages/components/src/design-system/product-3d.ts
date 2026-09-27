export const zuiProduct3DBase =
  "relative block w-full overflow-hidden rounded-2xl border border-[color:var(--zui-product-3d-border,#cbd5e1)] bg-[color:var(--zui-product-3d-bg,#f8fafc)] text-[color:var(--zui-product-3d-fg,#0f172a)] dark:border-[color:var(--zui-product-3d-border-dark,#334155)] dark:bg-[color:var(--zui-product-3d-bg-dark,#020617)] dark:text-[color:var(--zui-product-3d-fg-dark,#f8fafc)]";

export const zuiProduct3DAppearances = {
  default: "[--product-3d-accent:var(--zui-product-3d-default-accent,#6366f1)] dark:[--product-3d-accent:var(--zui-product-3d-default-accent-dark,#818cf8)]",
  primary: "[--product-3d-accent:var(--zui-product-3d-primary-accent,#2563eb)] dark:[--product-3d-accent:var(--zui-product-3d-primary-accent-dark,#60a5fa)]",
  secondary: "[--product-3d-accent:var(--zui-product-3d-secondary-accent,#64748b)] dark:[--product-3d-accent:var(--zui-product-3d-secondary-accent-dark,#94a3b8)]",
  success: "[--product-3d-accent:var(--zui-product-3d-success-accent,#16a34a)] dark:[--product-3d-accent:var(--zui-product-3d-success-accent-dark,#4ade80)]",
  destructive: "[--product-3d-accent:var(--zui-product-3d-destructive-accent,#dc2626)] dark:[--product-3d-accent:var(--zui-product-3d-destructive-accent-dark,#f87171)]",
  warning: "[--product-3d-accent:var(--zui-product-3d-warning-accent,#d97706)] dark:[--product-3d-accent:var(--zui-product-3d-warning-accent-dark,#fbbf24)]",
  info: "[--product-3d-accent:var(--zui-product-3d-info-accent,#0284c7)] dark:[--product-3d-accent:var(--zui-product-3d-info-accent-dark,#38bdf8)]",
  blue: "[--product-3d-accent:var(--zui-product-3d-blue-accent,#2563eb)] dark:[--product-3d-accent:var(--zui-product-3d-blue-accent-dark,#60a5fa)]",
  cyan: "[--product-3d-accent:var(--zui-product-3d-cyan-accent,#0891b2)] dark:[--product-3d-accent:var(--zui-product-3d-cyan-accent-dark,#22d3ee)]",
  emerald: "[--product-3d-accent:var(--zui-product-3d-emerald-accent,#059669)] dark:[--product-3d-accent:var(--zui-product-3d-emerald-accent-dark,#34d399)]",
  violet: "[--product-3d-accent:var(--zui-product-3d-violet-accent,#7c3aed)] dark:[--product-3d-accent:var(--zui-product-3d-violet-accent-dark,#a78bfa)]",
  rose: "[--product-3d-accent:var(--zui-product-3d-rose-accent,#e11d48)] dark:[--product-3d-accent:var(--zui-product-3d-rose-accent-dark,#fb7185)]",
  amber: "[--product-3d-accent:var(--zui-product-3d-amber-accent,#d97706)] dark:[--product-3d-accent:var(--zui-product-3d-amber-accent-dark,#fbbf24)]",
  slate: "[--product-3d-accent:var(--zui-product-3d-slate-accent,#475569)] dark:[--product-3d-accent:var(--zui-product-3d-slate-accent-dark,#94a3b8)]",
  "gradient-blue": "[--product-3d-accent:var(--zui-product-3d-gradient-blue-accent,#3b82f6)] dark:[--product-3d-accent:var(--zui-product-3d-gradient-blue-accent-dark,#22d3ee)]",
  "gradient-emerald": "[--product-3d-accent:var(--zui-product-3d-gradient-emerald-accent,#10b981)] dark:[--product-3d-accent:var(--zui-product-3d-gradient-emerald-accent-dark,#a3e635)]",
  "gradient-rose": "[--product-3d-accent:var(--zui-product-3d-gradient-rose-accent,#f43f5e)] dark:[--product-3d-accent:var(--zui-product-3d-gradient-rose-accent-dark,#e879f9)]",
  glass: "[--product-3d-accent:var(--zui-product-3d-glass-accent,#64748b)] dark:[--product-3d-accent:var(--zui-product-3d-glass-accent-dark,#cbd5e1)]",
} as const;

export const zuiProduct3DSizes = {
  sm: "h-72",
  md: "h-96",
  lg: "h-[32rem]",
} as const;

export const zuiProduct3DControl =
  "rounded-lg border border-[color:var(--zui-product-3d-control-border,#cbd5e1)] bg-[color:var(--zui-product-3d-control-bg,#fff)] text-[color:var(--zui-product-3d-control-fg,#334155)] shadow-sm transition-colors hover:bg-[color:var(--zui-product-3d-control-hover,#f1f5f9)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--product-3d-accent)] dark:border-[color:var(--zui-product-3d-control-border-dark,#475569)] dark:bg-[color:var(--zui-product-3d-control-bg-dark,#0f172a)] dark:text-[color:var(--zui-product-3d-control-fg-dark,#e2e8f0)] dark:hover:bg-[color:var(--zui-product-3d-control-hover-dark,#1e293b)]";

export const zuiProduct3DHotspot =
  "group relative grid size-8 place-items-center rounded-full border-2 border-white bg-[color:var(--product-3d-accent)] text-white shadow-lg shadow-black/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:border-slate-950";

export const zuiProduct3DAnnotation =
  "pointer-events-none absolute bottom-full left-1/2 mb-3 w-max max-w-48 -translate-x-1/2 rounded-lg border border-[color:var(--zui-product-3d-annotation-border,#cbd5e1)] bg-[color:var(--zui-product-3d-annotation-bg,#fff)] px-3 py-2 text-left text-xs leading-5 text-[color:var(--zui-product-3d-annotation-fg,#0f172a)] shadow-xl dark:border-[color:var(--zui-product-3d-annotation-border-dark,#475569)] dark:bg-[color:var(--zui-product-3d-annotation-bg-dark,#0f172a)] dark:text-[color:var(--zui-product-3d-annotation-fg-dark,#f8fafc)]";

export const zuiProduct3DStatus =
  "rounded-lg border border-[color:var(--zui-product-3d-status-border,#cbd5e1)] bg-[color:var(--zui-product-3d-status-bg,#fff)] px-3 py-1.5 text-xs text-[color:var(--zui-product-3d-status-fg,#334155)] shadow-sm dark:border-[color:var(--zui-product-3d-status-border-dark,#475569)] dark:bg-[color:var(--zui-product-3d-status-bg-dark,#0f172a)] dark:text-[color:var(--zui-product-3d-status-fg-dark,#e2e8f0)]";
