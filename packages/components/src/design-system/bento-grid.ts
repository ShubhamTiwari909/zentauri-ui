export const zuiBentoGridBase =
  "grid w-full auto-rows-[var(--zui-bento-grid-row,minmax(7rem,auto))]";

export const zuiBentoGridGaps = {
  sm: "gap-[var(--zui-bento-grid-gap-sm,0.5rem)]",
  md: "gap-[var(--zui-bento-grid-gap-md,1rem)]",
  lg: "gap-[var(--zui-bento-grid-gap-lg,1.5rem)]",
} as const;

export const zuiBentoGridFlows = {
  row: "grid-flow-row",
  dense: "grid-flow-row-dense",
} as const;

export const zuiBentoGridSpans = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "col-span-2 row-span-1",
  "1x2": "col-span-1 row-span-2",
  "2x2": "col-span-2 row-span-2",
  featured: "col-span-3 row-span-2",
} as const;

// Static-entry bento expand: pure CSS class swap on hover/focus-within. Grid
// tracks are discrete values so this snaps instead of animating — expected for
// the static entry; the animated entry smooths it via Framer Motion `layout`.
export const zuiBentoGridExpandedSpans = {
  "1x1":
    "hover:col-span-1 hover:row-span-1 focus-within:col-span-1 focus-within:row-span-1",
  "2x1":
    "hover:col-span-2 hover:row-span-1 focus-within:col-span-2 focus-within:row-span-1",
  "1x2":
    "hover:col-span-1 hover:row-span-2 focus-within:col-span-1 focus-within:row-span-2",
  "2x2":
    "hover:col-span-2 hover:row-span-2 focus-within:col-span-2 focus-within:row-span-2",
  featured:
    "hover:col-span-3 hover:row-span-2 focus-within:col-span-3 focus-within:row-span-2",
} as const;

export const zuiBentoGridItemBase = [
  "relative overflow-hidden rounded-[var(--zui-bento-grid-item-radius,1rem)] transition-[background-color,border-color,box-shadow] duration-200",
  "text-[color:var(--zui-bento-grid-item-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-bento-grid-item-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
  "outline-none ring-offset-[var(--zui-bento-grid-ring-offset,var(--zui-ring-offset,oklch(98.4%_0.003_247.858)))] dark:ring-offset-[var(--zui-bento-grid-ring-offset-dark,var(--zui-ring-offset-dark,oklch(12.9%_0.042_264.695)))]",
  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--zui-bento-grid-ring,var(--zui-focus-ring,oklch(44.6%_0.043_257.281)))] dark:focus-visible:ring-[var(--zui-bento-grid-ring-dark,var(--zui-focus-ring-dark,oklch(86.9%_0.022_252.894)))]",
] as const;

export const zuiBentoGridAppearances = {
  default:
    "border border-[color:var(--zui-bento-grid-default-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-bento-grid-default-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-bento-grid-default-bg,var(--zui-surface-muted,#0000000d))] dark:bg-[var(--zui-bento-grid-default-bg-dark,var(--zui-surface-muted-dark,#ffffff0d))]",
  glass:
    "border border-[color:var(--zui-bento-grid-glass-border,var(--zui-border,#00000026))] dark:border-[color:var(--zui-bento-grid-glass-border-dark,var(--zui-border-dark,#ffffff26))] bg-[var(--zui-bento-grid-glass-bg,var(--zui-surface-soft,#0000001a))] dark:bg-[var(--zui-bento-grid-glass-bg-dark,var(--zui-surface-soft-dark,#ffffff1a))] backdrop-blur-md",
  blue: "border border-[color:var(--zui-bento-grid-blue-border,var(--zui-color-blue,#2563eb))] dark:border-[color:var(--zui-bento-grid-blue-border-dark,var(--zui-color-blue-dark,#3b82f6))] bg-[var(--zui-bento-grid-blue-bg,color-mix(in oklch, var(--zui-color-blue,#2563eb) 10%, transparent))] dark:bg-[var(--zui-bento-grid-blue-bg-dark,color-mix(in oklch, var(--zui-color-blue-dark,#3b82f6) 18%, transparent))]",
  cyan: "border border-[color:var(--zui-bento-grid-cyan-border,var(--zui-color-cyan,#0891b2))] dark:border-[color:var(--zui-bento-grid-cyan-border-dark,var(--zui-color-cyan-dark,#22d3ee))] bg-[var(--zui-bento-grid-cyan-bg,color-mix(in oklch, var(--zui-color-cyan,#0891b2) 10%, transparent))] dark:bg-[var(--zui-bento-grid-cyan-bg-dark,color-mix(in oklch, var(--zui-color-cyan-dark,#22d3ee) 18%, transparent))]",
  green:
    "border border-[color:var(--zui-bento-grid-green-border,var(--zui-color-green,#16a34a))] dark:border-[color:var(--zui-bento-grid-green-border-dark,var(--zui-color-green-dark,#22c55e))] bg-[var(--zui-bento-grid-green-bg,color-mix(in oklch, var(--zui-color-green,#16a34a) 10%, transparent))] dark:bg-[var(--zui-bento-grid-green-bg-dark,color-mix(in oklch, var(--zui-color-green-dark,#22c55e) 18%, transparent))]",
  lime: "border border-[color:var(--zui-bento-grid-lime-border,var(--zui-color-lime,#65a30d))] dark:border-[color:var(--zui-bento-grid-lime-border-dark,var(--zui-color-lime-dark,#a3e635))] bg-[var(--zui-bento-grid-lime-bg,color-mix(in oklch, var(--zui-color-lime,#65a30d) 10%, transparent))] dark:bg-[var(--zui-bento-grid-lime-bg-dark,color-mix(in oklch, var(--zui-color-lime-dark,#a3e635) 18%, transparent))]",
  emerald:
    "border border-[color:var(--zui-bento-grid-emerald-border,var(--zui-color-emerald,oklch(69.6%_0.17_162.48)))] dark:border-[color:var(--zui-bento-grid-emerald-border-dark,var(--zui-color-emerald-dark,oklch(43.2%_0.095_166.913)))] bg-[var(--zui-bento-grid-emerald-bg,color-mix(in oklch, var(--zui-color-emerald,oklch(69.6%_0.17_162.48)) 10%, transparent))] dark:bg-[var(--zui-bento-grid-emerald-bg-dark,color-mix(in oklch, var(--zui-color-emerald-dark,oklch(43.2%_0.095_166.913)) 18%, transparent))]",
  indigo:
    "border border-[color:var(--zui-bento-grid-indigo-border,var(--zui-color-indigo,oklch(39.8%_0.195_277.366)))] dark:border-[color:var(--zui-bento-grid-indigo-border-dark,var(--zui-color-indigo-dark,oklch(51.1%_0.262_276.966)))] bg-[var(--zui-bento-grid-indigo-bg,color-mix(in oklch, var(--zui-color-indigo,oklch(39.8%_0.195_277.366)) 10%, transparent))] dark:bg-[var(--zui-bento-grid-indigo-bg-dark,color-mix(in oklch, var(--zui-color-indigo-dark,oklch(51.1%_0.262_276.966)) 18%, transparent))]",
  purple:
    "border border-[color:var(--zui-bento-grid-purple-border,var(--zui-color-purple,oklch(43.8%_0.218_303.724)))] dark:border-[color:var(--zui-bento-grid-purple-border-dark,var(--zui-color-purple-dark,oklch(55.8%_0.288_302.321)))] bg-[var(--zui-bento-grid-purple-bg,color-mix(in oklch, var(--zui-color-purple,oklch(43.8%_0.218_303.724)) 10%, transparent))] dark:bg-[var(--zui-bento-grid-purple-bg-dark,color-mix(in oklch, var(--zui-color-purple-dark,oklch(55.8%_0.288_302.321)) 18%, transparent))]",
  pink: "border border-[color:var(--zui-bento-grid-pink-border,var(--zui-color-pink,oklch(45.9%_0.187_3.815)))] dark:border-[color:var(--zui-bento-grid-pink-border-dark,var(--zui-color-pink-dark,oklch(59.2%_0.249_0.584)))] bg-[var(--zui-bento-grid-pink-bg,color-mix(in oklch, var(--zui-color-pink,oklch(45.9%_0.187_3.815)) 10%, transparent))] dark:bg-[var(--zui-bento-grid-pink-bg-dark,color-mix(in oklch, var(--zui-color-pink-dark,oklch(59.2%_0.249_0.584)) 18%, transparent))]",
  rose: "border border-[color:var(--zui-bento-grid-rose-border,var(--zui-color-rose,oklch(64.5%_0.246_16.439)))] dark:border-[color:var(--zui-bento-grid-rose-border-dark,var(--zui-color-rose-dark,oklch(51.4%_0.222_16.935)))] bg-[var(--zui-bento-grid-rose-bg,color-mix(in oklch, var(--zui-color-rose,oklch(64.5%_0.246_16.439)) 10%, transparent))] dark:bg-[var(--zui-bento-grid-rose-bg-dark,color-mix(in oklch, var(--zui-color-rose-dark,oklch(51.4%_0.222_16.935)) 18%, transparent))]",
  sky: "border border-[color:var(--zui-bento-grid-sky-border,var(--zui-color-sky,oklch(68.5%_0.169_237.323)))] dark:border-[color:var(--zui-bento-grid-sky-border-dark,var(--zui-color-sky-dark,oklch(50%_0.134_242.749)))] bg-[var(--zui-bento-grid-sky-bg,color-mix(in oklch, var(--zui-color-sky,oklch(68.5%_0.169_237.323)) 10%, transparent))] dark:bg-[var(--zui-bento-grid-sky-bg-dark,color-mix(in oklch, var(--zui-color-sky-dark,oklch(50%_0.134_242.749)) 18%, transparent))]",
  teal: "border border-[color:var(--zui-bento-grid-teal-border,var(--zui-color-teal,oklch(70.4%_0.14_182.503)))] dark:border-[color:var(--zui-bento-grid-teal-border-dark,var(--zui-color-teal-dark,oklch(51.1%_0.096_186.391)))] bg-[var(--zui-bento-grid-teal-bg,color-mix(in oklch, var(--zui-color-teal,oklch(70.4%_0.14_182.503)) 10%, transparent))] dark:bg-[var(--zui-bento-grid-teal-bg-dark,color-mix(in oklch, var(--zui-color-teal-dark,oklch(51.1%_0.096_186.391)) 18%, transparent))]",
  yellow:
    "border border-[color:var(--zui-bento-grid-yellow-border,var(--zui-color-yellow,oklch(79.5%_0.184_86.047)))] dark:border-[color:var(--zui-bento-grid-yellow-border-dark,var(--zui-color-yellow-dark,oklch(47.6%_0.114_61.907)))] bg-[var(--zui-bento-grid-yellow-bg,color-mix(in oklch, var(--zui-color-yellow,oklch(79.5%_0.184_86.047)) 10%, transparent))] dark:bg-[var(--zui-bento-grid-yellow-bg-dark,color-mix(in oklch, var(--zui-color-yellow-dark,oklch(47.6%_0.114_61.907)) 18%, transparent))]",
  orange:
    "border border-[color:var(--zui-bento-grid-orange-border,var(--zui-color-orange,oklch(70.5%_0.213_47.604)))] dark:border-[color:var(--zui-bento-grid-orange-border-dark,var(--zui-color-orange-dark,oklch(47%_0.157_37.304)))] bg-[var(--zui-bento-grid-orange-bg,color-mix(in oklch, var(--zui-color-orange,oklch(70.5%_0.213_47.604)) 10%, transparent))] dark:bg-[var(--zui-bento-grid-orange-bg-dark,color-mix(in oklch, var(--zui-color-orange-dark,oklch(47%_0.157_37.304)) 18%, transparent))]",
  red: "border border-[color:var(--zui-bento-grid-red-border,var(--zui-color-red,#dc2626))] dark:border-[color:var(--zui-bento-grid-red-border-dark,var(--zui-color-red-dark,#ef4444))] bg-[var(--zui-bento-grid-red-bg,color-mix(in oklch, var(--zui-color-red,#dc2626) 10%, transparent))] dark:bg-[var(--zui-bento-grid-red-bg-dark,color-mix(in oklch, var(--zui-color-red-dark,#ef4444) 18%, transparent))]",
  slate:
    "border border-[color:var(--zui-bento-grid-slate-border,var(--zui-color-slate,#475569))] dark:border-[color:var(--zui-bento-grid-slate-border-dark,var(--zui-color-slate-dark,#64748b))] bg-[var(--zui-bento-grid-slate-bg,color-mix(in oklch, var(--zui-color-slate,#475569) 10%, transparent))] dark:bg-[var(--zui-bento-grid-slate-bg-dark,color-mix(in oklch, var(--zui-color-slate-dark,#64748b) 18%, transparent))]",
  gray: "border border-[color:var(--zui-bento-grid-gray-border,var(--zui-color-gray,oklch(55.1%_0.027_264.364)))] dark:border-[color:var(--zui-bento-grid-gray-border-dark,var(--zui-color-gray-dark,oklch(55.1%_0.027_264.364)))] bg-[var(--zui-bento-grid-gray-bg,color-mix(in oklch, var(--zui-color-gray,oklch(55.1%_0.027_264.364)) 10%, transparent))] dark:bg-[var(--zui-bento-grid-gray-bg-dark,color-mix(in oklch, var(--zui-color-gray-dark,oklch(55.1%_0.027_264.364)) 18%, transparent))]",
  zinc: "border border-[color:var(--zui-bento-grid-zinc-border,var(--zui-color-zinc,#52525b))] dark:border-[color:var(--zui-bento-grid-zinc-border-dark,var(--zui-color-zinc-dark,#71717a))] bg-[var(--zui-bento-grid-zinc-bg,color-mix(in oklch, var(--zui-color-zinc,#52525b) 10%, transparent))] dark:bg-[var(--zui-bento-grid-zinc-bg-dark,color-mix(in oklch, var(--zui-color-zinc-dark,#71717a) 18%, transparent))]",
  "gradient-blue":
    "border border-[color:var(--zui-bento-grid-gradient-blue-border,var(--zui-color-blue,oklch(42.4%_0.199_265.638)))] dark:border-[color:var(--zui-bento-grid-gradient-blue-border-dark,var(--zui-color-blue-dark,oklch(54.6%_0.245_262.881)))] bg-linear-to-br from-[var(--zui-bento-grid-gradient-blue-from,var(--zui-color-blue,oklch(97%_0.014_254.604)))] dark:from-[var(--zui-bento-grid-gradient-blue-from-dark,var(--zui-color-blue-dark,oklch(28.2%_0.091_267.935_/_0.7)))] to-[var(--zui-bento-grid-gradient-blue-to,var(--zui-color-purple,oklch(97.7%_0.014_308.299)))] dark:to-[var(--zui-bento-grid-gradient-blue-to-dark,var(--zui-color-purple-dark,oklch(29.1%_0.149_302.717_/_0.7)))]",
  "gradient-green":
    "border border-[color:var(--zui-bento-grid-gradient-green-border,var(--zui-color-green,oklch(44.8%_0.119_151.328)))] dark:border-[color:var(--zui-bento-grid-gradient-green-border-dark,var(--zui-color-green-dark,oklch(62.7%_0.194_149.214)))] bg-linear-to-br from-[var(--zui-bento-grid-gradient-green-from,var(--zui-color-green,oklch(96.2%_0.044_156.743)))] dark:from-[var(--zui-bento-grid-gradient-green-from-dark,var(--zui-color-green-dark,oklch(26.6%_0.065_152.934_/_0.7)))] to-[var(--zui-bento-grid-gradient-green-to,var(--zui-color-lime,oklch(96.7%_0.067_122.328)))] dark:to-[var(--zui-bento-grid-gradient-green-to-dark,var(--zui-color-lime-dark,oklch(27.4%_0.072_132.109_/_0.7)))]",
  "gradient-purple":
    "border border-[color:var(--zui-bento-grid-gradient-purple-border,var(--zui-color-purple,oklch(43.8%_0.218_303.724)))] dark:border-[color:var(--zui-bento-grid-gradient-purple-border-dark,var(--zui-color-purple-dark,oklch(55.8%_0.288_302.321)))] bg-linear-to-br from-[var(--zui-bento-grid-gradient-purple-from,var(--zui-color-purple,oklch(97.7%_0.014_308.299)))] dark:from-[var(--zui-bento-grid-gradient-purple-from-dark,var(--zui-color-purple-dark,oklch(29.1%_0.149_302.717_/_0.7)))] to-[var(--zui-bento-grid-gradient-purple-to,var(--zui-color-pink,oklch(97.1%_0.014_343.198)))] dark:to-[var(--zui-bento-grid-gradient-purple-to-dark,var(--zui-color-pink-dark,oklch(28.4%_0.109_3.907_/_0.7)))]",
} as const;

export const zuiBentoGridDetailOverlayBase =
  "fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--zui-bento-grid-overlay-bg,rgba(15,23,42,0.4))] dark:bg-[var(--zui-bento-grid-overlay-bg-dark,rgba(2,6,23,0.6))] backdrop-blur-sm";

export const zuiBentoGridDetailBase =
  "relative w-full max-w-[var(--zui-bento-grid-detail-max-w,42rem)] max-h-[85vh] overflow-y-auto rounded-[var(--zui-bento-grid-detail-radius,1.25rem)] border border-[color:var(--zui-bento-grid-detail-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-bento-grid-detail-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-bento-grid-detail-bg,var(--zui-bg,#ffffff))] dark:bg-[var(--zui-bento-grid-detail-bg-dark,var(--zui-bg-dark,oklch(12.9%_0.042_264.695)))] text-[color:var(--zui-bento-grid-detail-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-bento-grid-detail-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))] p-6 shadow-[var(--zui-bento-grid-detail-shadow,var(--zui-shadow,0_18px_48px_rgba(15,23,42,0.18)))] dark:shadow-[var(--zui-bento-grid-detail-shadow-dark,var(--zui-shadow-dark,0_18px_48px_rgba(2,6,23,0.55)))] outline-none";

export const zuiBentoGridDetailCloseBase =
  "absolute right-3 top-3 inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-[color:var(--zui-bento-grid-detail-close-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-bento-grid-detail-close-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))] transition hover:bg-black/5 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zui-bento-grid-ring,var(--zui-focus-ring,oklch(44.6%_0.043_257.281)))] dark:focus-visible:ring-[var(--zui-bento-grid-ring-dark,var(--zui-focus-ring-dark,oklch(86.9%_0.022_252.894)))]";
