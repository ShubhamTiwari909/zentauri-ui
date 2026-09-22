export const zuiImageCompareBase = [
  "relative isolate w-full overflow-hidden border border-[color:var(--zui-image-compare-border,var(--zui-border,#e2e8f0))] dark:border-[color:var(--zui-image-compare-border-dark,var(--zui-border-dark,#1e293b))]",
  "bg-[var(--zui-image-compare-bg,var(--zui-surface-muted,#f1f5f9))] dark:bg-[var(--zui-image-compare-bg-dark,var(--zui-surface-muted-dark,#1e293b))]",
  "select-none touch-none",
] as const;

export const zuiImageCompareAppearances = {
  default:
    "[--image-compare-accent:var(--zui-image-compare-default-accent,var(--zui-brand,#0f172a))] dark:[--image-compare-accent:var(--zui-image-compare-default-accent-dark,var(--zui-brand-dark,#f8fafc))]",
  blue: "[--image-compare-accent:var(--zui-image-compare-blue-accent,var(--zui-color-blue,#2563eb))] dark:[--image-compare-accent:var(--zui-image-compare-blue-accent-dark,var(--zui-color-blue-dark,#3b82f6))]",
  cyan: "[--image-compare-accent:var(--zui-image-compare-cyan-accent,var(--zui-color-cyan,#0891b2))] dark:[--image-compare-accent:var(--zui-image-compare-cyan-accent-dark,var(--zui-color-cyan-dark,#22d3ee))]",
  green:
    "[--image-compare-accent:var(--zui-image-compare-green-accent,var(--zui-color-green,#16a34a))] dark:[--image-compare-accent:var(--zui-image-compare-green-accent-dark,var(--zui-color-green-dark,#22c55e))]",
  emerald:
    "[--image-compare-accent:var(--zui-image-compare-emerald-accent,var(--zui-color-emerald,#059669))] dark:[--image-compare-accent:var(--zui-image-compare-emerald-accent-dark,var(--zui-color-emerald-dark,#34d399))]",
  teal: "[--image-compare-accent:var(--zui-image-compare-teal-accent,var(--zui-color-teal,#0d9488))] dark:[--image-compare-accent:var(--zui-image-compare-teal-accent-dark,var(--zui-color-teal-dark,#2dd4bf))]",
  sky: "[--image-compare-accent:var(--zui-image-compare-sky-accent,var(--zui-color-sky,#0284c7))] dark:[--image-compare-accent:var(--zui-image-compare-sky-accent-dark,var(--zui-color-sky-dark,#38bdf8))]",
  indigo:
    "[--image-compare-accent:var(--zui-image-compare-indigo-accent,var(--zui-color-indigo,#4f46e5))] dark:[--image-compare-accent:var(--zui-image-compare-indigo-accent-dark,var(--zui-color-indigo-dark,#6366f1))]",
  purple:
    "[--image-compare-accent:var(--zui-image-compare-purple-accent,var(--zui-color-purple,#7c3aed))] dark:[--image-compare-accent:var(--zui-image-compare-purple-accent-dark,var(--zui-color-purple-dark,#8b5cf6))]",
  pink: "[--image-compare-accent:var(--zui-image-compare-pink-accent,var(--zui-color-pink,#db2777))] dark:[--image-compare-accent:var(--zui-image-compare-pink-accent-dark,var(--zui-color-pink-dark,#ec4899))]",
  rose: "[--image-compare-accent:var(--zui-image-compare-rose-accent,var(--zui-color-rose,#e11d48))] dark:[--image-compare-accent:var(--zui-image-compare-rose-accent-dark,var(--zui-color-rose-dark,#f43f5e))]",
  red: "[--image-compare-accent:var(--zui-image-compare-red-accent,var(--zui-color-red,#dc2626))] dark:[--image-compare-accent:var(--zui-image-compare-red-accent-dark,var(--zui-color-red-dark,#ef4444))]",
  orange:
    "[--image-compare-accent:var(--zui-image-compare-orange-accent,var(--zui-color-orange,#ea580c))] dark:[--image-compare-accent:var(--zui-image-compare-orange-accent-dark,var(--zui-color-orange-dark,#f97316))]",
  yellow:
    "[--image-compare-accent:var(--zui-image-compare-yellow-accent,var(--zui-color-yellow,#ca8a04))] dark:[--image-compare-accent:var(--zui-image-compare-yellow-accent-dark,var(--zui-color-yellow-dark,#eab308))]",
  slate:
    "[--image-compare-accent:var(--zui-image-compare-slate-accent,var(--zui-color-slate,#475569))] dark:[--image-compare-accent:var(--zui-image-compare-slate-accent-dark,var(--zui-color-slate-dark,#64748b))]",
  zinc: "[--image-compare-accent:var(--zui-image-compare-zinc-accent,var(--zui-color-zinc,#52525b))] dark:[--image-compare-accent:var(--zui-image-compare-zinc-accent-dark,var(--zui-color-zinc-dark,#71717a))]",
  "gradient-blue":
    "[--image-compare-accent:var(--zui-image-compare-gradient-blue-accent,linear-gradient(180deg,#2563eb,#7c3aed))] dark:[--image-compare-accent:var(--zui-image-compare-gradient-blue-accent-dark,linear-gradient(180deg,#3b82f6,#8b5cf6))]",
  "gradient-sunset":
    "[--image-compare-accent:var(--zui-image-compare-gradient-sunset-accent,linear-gradient(180deg,#f97316,#e11d48))] dark:[--image-compare-accent:var(--zui-image-compare-gradient-sunset-accent-dark,linear-gradient(180deg,#fb923c,#fb7185))]",
} as const;

export const zuiImageCompareSizes = {
  sm: "[--image-compare-handle:2rem] [--image-compare-divider:2px] text-xs",
  md: "[--image-compare-handle:2.5rem] [--image-compare-divider:3px] text-sm",
  lg: "[--image-compare-handle:3rem] [--image-compare-divider:4px] text-base",
} as const;

export const zuiImageCompareRadii = {
  none: "rounded-none",
  sm: "rounded-md",
  md: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-[2rem]",
} as const;

export const zuiImageCompareLayerBase =
  "absolute inset-0 overflow-hidden [&>*]:size-full [&>*]:object-cover";

export const zuiImageCompareDividerBase = [
  "absolute inset-y-0 z-20 -translate-x-1/2 cursor-ew-resize outline-none",
  "w-[var(--image-compare-divider,3px)] [background:var(--image-compare-accent,#0f172a)]",
  "focus-visible:[filter:drop-shadow(0_0_4px_var(--zui-image-compare-focus-ring,var(--zui-focus-ring,#2563eb)))] dark:focus-visible:[filter:drop-shadow(0_0_4px_var(--zui-image-compare-focus-ring-dark,var(--zui-focus-ring-dark,#60a5fa)))]",
] as const;

export const zuiImageCompareHandleBase = [
  "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center",
  "size-[var(--image-compare-handle,2.5rem)] rounded-full border border-[color:var(--zui-image-compare-handle-border,#ffffff99)] dark:border-[color:var(--zui-image-compare-handle-border-dark,#ffffff66)]",
  "bg-[var(--zui-image-compare-handle-bg,#ffffff)] dark:bg-[var(--zui-image-compare-handle-bg-dark,#0f172a)]",
  "text-[color:var(--zui-image-compare-handle-fg,#0f172a)] dark:text-[color:var(--zui-image-compare-handle-fg-dark,#f8fafc)]",
  "shadow-[var(--zui-image-compare-handle-shadow,0_4px_16px_#0f172a40)] dark:shadow-[var(--zui-image-compare-handle-shadow-dark,0_4px_18px_#00000080)]",
] as const;

export const zuiImageCompareLabelBase =
  "absolute top-3 z-10 rounded-full bg-[var(--zui-image-compare-label-bg,#0f172abf)] dark:bg-[var(--zui-image-compare-label-bg-dark,#020617cc)] px-2.5 py-1 font-medium text-[color:var(--zui-image-compare-label-fg,#ffffff)] dark:text-[color:var(--zui-image-compare-label-fg-dark,#f8fafc)] shadow-sm backdrop-blur-sm";
