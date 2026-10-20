/** Public color tokens map to private SVG paint values; content inherits its own colors. */
export const zuiElectricBorderBase =
  "relative isolate rounded-[var(--_eb-radius,24px)] [--_eb-core:var(--zui-electric-border-core,#ffffff)] dark:[--_eb-core:var(--zui-electric-border-core-dark,#ffffff)]";

export const zuiElectricBorderAppearances = {
  default:
    "[--_eb-color:var(--zui-electric-border-color,#0891b2)] dark:[--_eb-color:var(--zui-electric-border-color-dark,#7df9ff)] [--_eb-end:var(--_eb-color)]",
  subtle:
    "[--_eb-color:var(--zui-electric-border-subtle-color,#64748b)] dark:[--_eb-color:var(--zui-electric-border-subtle-color-dark,#94a3b8)] [--_eb-end:var(--_eb-color)]",
  contrast:
    "[--_eb-color:var(--zui-electric-border-contrast-color,#0f172a)] dark:[--_eb-color:var(--zui-electric-border-contrast-color-dark,#f8fafc)] [--_eb-end:var(--_eb-color)]",
  primary:
    "[--_eb-color:var(--zui-electric-border-primary-color,#2563eb)] dark:[--_eb-color:var(--zui-electric-border-primary-color-dark,#60a5fa)] [--_eb-end:var(--_eb-color)]",
  secondary:
    "[--_eb-color:var(--zui-electric-border-secondary-color,#64748b)] dark:[--_eb-color:var(--zui-electric-border-secondary-color-dark,#cbd5e1)] [--_eb-end:var(--_eb-color)]",
  success:
    "[--_eb-color:var(--zui-electric-border-success-color,#16a34a)] dark:[--_eb-color:var(--zui-electric-border-success-color-dark,#4ade80)] [--_eb-end:var(--_eb-color)]",
  destructive:
    "[--_eb-color:var(--zui-electric-border-destructive-color,#dc2626)] dark:[--_eb-color:var(--zui-electric-border-destructive-color-dark,#f87171)] [--_eb-end:var(--_eb-color)]",
  warning:
    "[--_eb-color:var(--zui-electric-border-warning-color,#d97706)] dark:[--_eb-color:var(--zui-electric-border-warning-color-dark,#fbbf24)] [--_eb-end:var(--_eb-color)]",
  info: "[--_eb-color:var(--zui-electric-border-info-color,#0284c7)] dark:[--_eb-color:var(--zui-electric-border-info-color-dark,#38bdf8)] [--_eb-end:var(--_eb-color)]",
  blue: "[--_eb-color:var(--zui-electric-border-blue-color,#3b82f6)] dark:[--_eb-color:var(--zui-electric-border-blue-color-dark,#93c5fd)] [--_eb-end:var(--_eb-color)]",
  cyan: "[--_eb-color:var(--zui-electric-border-cyan-color,#0891b2)] dark:[--_eb-color:var(--zui-electric-border-cyan-color-dark,#67e8f9)] [--_eb-end:var(--_eb-color)]",
  emerald:
    "[--_eb-color:var(--zui-electric-border-emerald-color,#059669)] dark:[--_eb-color:var(--zui-electric-border-emerald-color-dark,#6ee7b7)] [--_eb-end:var(--_eb-color)]",
  violet:
    "[--_eb-color:var(--zui-electric-border-violet-color,#7c3aed)] dark:[--_eb-color:var(--zui-electric-border-violet-color-dark,#c4b5fd)] [--_eb-end:var(--_eb-color)]",
  rose: "[--_eb-color:var(--zui-electric-border-rose-color,#e11d48)] dark:[--_eb-color:var(--zui-electric-border-rose-color-dark,#fda4af)] [--_eb-end:var(--_eb-color)]",
  amber:
    "[--_eb-color:var(--zui-electric-border-amber-color,#d97706)] dark:[--_eb-color:var(--zui-electric-border-amber-color-dark,#fcd34d)] [--_eb-end:var(--_eb-color)]",
  slate:
    "[--_eb-color:var(--zui-electric-border-slate-color,#475569)] dark:[--_eb-color:var(--zui-electric-border-slate-color-dark,#cbd5e1)] [--_eb-end:var(--_eb-color)]",
  "gradient-blue":
    "[--_eb-color:var(--zui-electric-border-gradient-blue-color,#2563eb)] dark:[--_eb-color:var(--zui-electric-border-gradient-blue-color-dark,#60a5fa)] [--_eb-end:var(--zui-electric-border-gradient-blue-color-end,#0891b2)] dark:[--_eb-end:var(--zui-electric-border-gradient-blue-color-end-dark,#67e8f9)]",
  "gradient-emerald":
    "[--_eb-color:var(--zui-electric-border-gradient-emerald-color,#059669)] dark:[--_eb-color:var(--zui-electric-border-gradient-emerald-color-dark,#34d399)] [--_eb-end:var(--zui-electric-border-gradient-emerald-color-end,#65a30d)] dark:[--_eb-end:var(--zui-electric-border-gradient-emerald-color-end-dark,#bef264)]",
  "gradient-rose":
    "[--_eb-color:var(--zui-electric-border-gradient-rose-color,#e11d48)] dark:[--_eb-color:var(--zui-electric-border-gradient-rose-color-dark,#fb7185)] [--_eb-end:var(--zui-electric-border-gradient-rose-color-end,#9333ea)] dark:[--_eb-end:var(--zui-electric-border-gradient-rose-color-end-dark,#e879f9)]",
  glass:
    "[--_eb-color:var(--zui-electric-border-glass-color,#64748b)] dark:[--_eb-color:var(--zui-electric-border-glass-color-dark,#e2e8f0)] [--_eb-end:var(--_eb-color)]",
} as const;

export const zuiElectricBorderFallback =
  "pointer-events-none absolute inset-0 rounded-[inherit] border-[length:var(--_eb-thickness,1.5px)] border-[color:var(--_eb-color)] opacity-60";
export const zuiElectricBorderFallbackGlow =
  "shadow-[0_0_8px_var(--_eb-color)]";
export const zuiElectricBorderEffect =
  "pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible motion-reduce:hidden";
export const zuiElectricBorderGlow = "blur-[3px] opacity-35";
export const zuiElectricBorderGradientStart = "[stop-color:var(--_eb-color)]";
export const zuiElectricBorderGradientEnd = "[stop-color:var(--_eb-end)]";
export const zuiElectricBorderCore = "[stroke:var(--_eb-core)]";
