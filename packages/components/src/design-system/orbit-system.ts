/** Themeable orbital scene surfaces and accent palettes. */
export const zuiOrbitSystemBase =
  "relative isolate w-full overflow-hidden rounded-3xl border border-[color:var(--zui-orbit-system-border,#cbd5e1)] bg-[color:var(--zui-orbit-system-bg,#f8fafc)] text-[color:var(--zui-orbit-system-fg,#0f172a)] select-none touch-none dark:border-[color:var(--zui-orbit-system-border-dark,#334155)] dark:bg-[color:var(--zui-orbit-system-bg-dark,#020617)] dark:text-[color:var(--zui-orbit-system-fg-dark,#f8fafc)]";

export const zuiOrbitSystemSizes = {
  sm: "h-72",
  md: "h-96",
  lg: "h-[32rem]",
} as const;

export const zuiOrbitSystemAppearances = {
  default:
    "[--zui-orbit-accent:var(--zui-orbit-system-default-accent,#6366f1)] dark:[--zui-orbit-accent:var(--zui-orbit-system-default-accent-dark,#a5b4fc)]",
  primary:
    "[--zui-orbit-accent:var(--zui-orbit-system-primary-accent,#2563eb)] dark:[--zui-orbit-accent:var(--zui-orbit-system-primary-accent-dark,#60a5fa)]",
  secondary:
    "[--zui-orbit-accent:var(--zui-orbit-system-secondary-accent,#64748b)] dark:[--zui-orbit-accent:var(--zui-orbit-system-secondary-accent-dark,#cbd5e1)]",
  success:
    "[--zui-orbit-accent:var(--zui-orbit-system-success-accent,#16a34a)] dark:[--zui-orbit-accent:var(--zui-orbit-system-success-accent-dark,#4ade80)]",
  destructive:
    "[--zui-orbit-accent:var(--zui-orbit-system-destructive-accent,#dc2626)] dark:[--zui-orbit-accent:var(--zui-orbit-system-destructive-accent-dark,#f87171)]",
  warning:
    "[--zui-orbit-accent:var(--zui-orbit-system-warning-accent,#d97706)] dark:[--zui-orbit-accent:var(--zui-orbit-system-warning-accent-dark,#fbbf24)]",
  info: "[--zui-orbit-accent:var(--zui-orbit-system-info-accent,#0284c7)] dark:[--zui-orbit-accent:var(--zui-orbit-system-info-accent-dark,#38bdf8)]",
  blue: "[--zui-orbit-accent:var(--zui-orbit-system-blue-accent,#3b82f6)] dark:[--zui-orbit-accent:var(--zui-orbit-system-blue-accent-dark,#93c5fd)]",
  cyan: "[--zui-orbit-accent:var(--zui-orbit-system-cyan-accent,#0891b2)] dark:[--zui-orbit-accent:var(--zui-orbit-system-cyan-accent-dark,#67e8f9)]",
  emerald:
    "[--zui-orbit-accent:var(--zui-orbit-system-emerald-accent,#059669)] dark:[--zui-orbit-accent:var(--zui-orbit-system-emerald-accent-dark,#6ee7b7)]",
  violet:
    "[--zui-orbit-accent:var(--zui-orbit-system-violet-accent,#7c3aed)] dark:[--zui-orbit-accent:var(--zui-orbit-system-violet-accent-dark,#c4b5fd)]",
  rose: "[--zui-orbit-accent:var(--zui-orbit-system-rose-accent,#e11d48)] dark:[--zui-orbit-accent:var(--zui-orbit-system-rose-accent-dark,#fda4af)]",
  amber:
    "[--zui-orbit-accent:var(--zui-orbit-system-amber-accent,#d97706)] dark:[--zui-orbit-accent:var(--zui-orbit-system-amber-accent-dark,#fcd34d)]",
  slate:
    "[--zui-orbit-accent:var(--zui-orbit-system-slate-accent,#475569)] dark:[--zui-orbit-accent:var(--zui-orbit-system-slate-accent-dark,#cbd5e1)]",
  "gradient-blue":
    "[--zui-orbit-accent:var(--zui-orbit-system-gradient-blue-accent,#2563eb)] dark:[--zui-orbit-accent:var(--zui-orbit-system-gradient-blue-accent-dark,#22d3ee)]",
  "gradient-emerald":
    "[--zui-orbit-accent:var(--zui-orbit-system-gradient-emerald-accent,#059669)] dark:[--zui-orbit-accent:var(--zui-orbit-system-gradient-emerald-accent-dark,#a3e635)]",
  "gradient-rose":
    "[--zui-orbit-accent:var(--zui-orbit-system-gradient-rose-accent,#e11d48)] dark:[--zui-orbit-accent:var(--zui-orbit-system-gradient-rose-accent-dark,#e879f9)]",
  glass:
    "[--zui-orbit-accent:var(--zui-orbit-system-glass-accent,#64748b)] dark:[--zui-orbit-accent:var(--zui-orbit-system-glass-accent-dark,#e2e8f0)]",
} as const;

export const zuiOrbitSystemGlow =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,var(--zui-orbit-system-glow,rgba(99,102,241,0.18)),transparent_43%)] dark:bg-[radial-gradient(circle_at_50%_48%,var(--zui-orbit-system-glow-dark,rgba(99,102,241,0.22)),transparent_48%)]";
export const zuiOrbitSystemRing =
  "pointer-events-none absolute rounded-full border border-[color:var(--zui-orbit-system-ring,rgba(99,102,241,0.38))] shadow-[0_0_18px_var(--zui-orbit-system-ring-glow,rgba(99,102,241,0.13))] dark:border-[color:var(--zui-orbit-system-ring-dark,rgba(165,180,252,0.38))] dark:shadow-[0_0_18px_var(--zui-orbit-system-ring-glow-dark,rgba(165,180,252,0.18))]";
export const zuiOrbitSystemCore =
  "absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--zui-orbit-system-core-border,#a5b4fc)] bg-[color:var(--zui-orbit-system-core-bg,#eef2ff)] px-5 py-3 text-sm font-semibold text-[color:var(--zui-orbit-system-core-fg,#312e81)] shadow-[0_0_36px_var(--zui-orbit-system-core-glow,rgba(99,102,241,0.35))] dark:border-[color:var(--zui-orbit-system-core-border-dark,#6366f1)] dark:bg-[color:var(--zui-orbit-system-core-bg-dark,#1e1b4b)] dark:text-[color:var(--zui-orbit-system-core-fg-dark,#e0e7ff)] dark:shadow-[0_0_36px_var(--zui-orbit-system-core-glow-dark,rgba(129,140,248,0.5))]";
export const zuiOrbitSystemItem =
  "absolute z-20 flex min-h-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[color:var(--zui-orbit-system-item-border,#c7d2fe)] bg-[color:var(--zui-orbit-system-item-bg,#fff)] px-3 py-2 text-xs font-semibold text-[color:var(--zui-orbit-system-item-fg,#1e293b)] shadow-[0_8px_24px_var(--zui-orbit-system-item-shadow,rgba(30,41,59,0.16))] transition-[border-color,box-shadow,background-color] hover:border-[color:var(--zui-orbit-accent,#6366f1)] hover:shadow-[0_0_22px_var(--zui-orbit-accent,#6366f1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--zui-orbit-accent,#6366f1)] data-[selected=true]:border-[color:var(--zui-orbit-accent,#6366f1)] data-[selected=true]:shadow-[0_0_24px_var(--zui-orbit-accent,#6366f1)] dark:border-[color:var(--zui-orbit-system-item-border-dark,#475569)] dark:bg-[color:var(--zui-orbit-system-item-bg-dark,#0f172a)] dark:text-[color:var(--zui-orbit-system-item-fg-dark,#f8fafc)] dark:shadow-[0_8px_24px_var(--zui-orbit-system-item-shadow-dark,rgba(0,0,0,0.35))]";
export const zuiOrbitSystemControl =
  "rounded-lg border border-[color:var(--zui-orbit-system-control-border,#cbd5e1)] bg-[color:var(--zui-orbit-system-control-bg,#fff)] px-2 py-1 text-xs font-medium text-[color:var(--zui-orbit-system-control-fg,#334155)] hover:border-[color:var(--zui-orbit-accent,#6366f1)] focus-visible:outline-2 focus-visible:outline-[color:var(--zui-orbit-accent,#6366f1)] dark:border-[color:var(--zui-orbit-system-control-border-dark,#475569)] dark:bg-[color:var(--zui-orbit-system-control-bg-dark,#0f172a)] dark:text-[color:var(--zui-orbit-system-control-fg-dark,#e2e8f0)]";
