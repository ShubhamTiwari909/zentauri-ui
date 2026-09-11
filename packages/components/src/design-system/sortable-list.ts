export const zuiSortableListBase =
  "flex flex-col overflow-hidden rounded-xl border border-[var(--zui-sortable-list-border,var(--zui-border,oklch(92.9%_0.013_255.508)))] bg-[var(--zui-sortable-list-bg,var(--zui-surface,white))] dark:border-[var(--zui-sortable-list-border-dark,var(--zui-border-dark,oklch(27.9%_0.041_260.031)))] dark:bg-[var(--zui-sortable-list-bg-dark,var(--zui-surface-dark,oklch(20.8%_0.042_265.755)))]";

export const zuiSortableListItemBase =
  "group flex items-center gap-3 border-b border-[var(--zui-sortable-list-item-border,var(--zui-border,oklch(92.9%_0.013_255.508)))] last:border-b-0 transition-colors dark:border-[var(--zui-sortable-list-item-border-dark,var(--zui-border-dark,oklch(27.9%_0.041_260.031)))]";

export const zuiSortableListAppearances = {
  default:
    "hover:bg-[var(--zui-sortable-list-default-hover,var(--zui-surface-muted,oklch(96.8%_0.007_247.896)))] dark:hover:bg-[var(--zui-sortable-list-default-hover-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))]",
  subtle:
    "bg-[var(--zui-sortable-list-subtle-bg,var(--zui-surface-muted,oklch(96.8%_0.007_247.896)))] dark:bg-[var(--zui-sortable-list-subtle-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] hover:brightness-95 dark:hover:brightness-110",
  primary:
    "hover:bg-[var(--zui-sortable-list-primary-hover,var(--zui-color-blue-50,#eff6ff))] dark:hover:bg-[var(--zui-sortable-list-primary-hover-dark,var(--zui-color-blue-950,#172554))]",
  outline:
    "bg-transparent hover:bg-[var(--zui-sortable-list-outline-hover,var(--zui-surface-muted,oklch(96.8%_0.007_247.896)))] dark:hover:bg-[var(--zui-sortable-list-outline-hover-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))]",
  ghost:
    "border-transparent bg-transparent hover:bg-[var(--zui-sortable-list-ghost-hover,var(--zui-surface-muted,oklch(96.8%_0.007_247.896)))] dark:hover:bg-[var(--zui-sortable-list-ghost-hover-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))]",
  card: "rounded-2xl p-1 shadow-[var(--zui-sortable-list-card-shadow,0_1px_3px_0_rgb(0_0_0_/_0.1))] dark:shadow-[var(--zui-sortable-list-card-shadow-dark,0_1px_3px_0_rgb(0_0_0_/_0.3))]",
  separated:
    "gap-2 border-transparent bg-transparent dark:border-transparent dark:bg-transparent",
  blue: "border-[color:var(--zui-sortable-list-blue-border,var(--zui-color-blue,#2563eb))] bg-[var(--zui-sortable-list-blue-bg,color-mix(in_oklch,var(--zui-color-blue,#2563eb)_8%,transparent))] dark:border-[color:var(--zui-sortable-list-blue-border-dark,var(--zui-color-blue-dark,#3b82f6))] dark:bg-[var(--zui-sortable-list-blue-bg-dark,color-mix(in_oklch,var(--zui-color-blue-dark,#3b82f6)_15%,transparent))]",
  cyan: "border-[color:var(--zui-sortable-list-cyan-border,var(--zui-color-cyan,#0891b2))] bg-[var(--zui-sortable-list-cyan-bg,color-mix(in_oklch,var(--zui-color-cyan,#0891b2)_8%,transparent))] dark:border-[color:var(--zui-sortable-list-cyan-border-dark,var(--zui-color-cyan-dark,#22d3ee))] dark:bg-[var(--zui-sortable-list-cyan-bg-dark,color-mix(in_oklch,var(--zui-color-cyan-dark,#22d3ee)_15%,transparent))]",
  green:
    "border-[color:var(--zui-sortable-list-green-border,var(--zui-color-green,#16a34a))] bg-[var(--zui-sortable-list-green-bg,color-mix(in_oklch,var(--zui-color-green,#16a34a)_8%,transparent))] dark:border-[color:var(--zui-sortable-list-green-border-dark,var(--zui-color-green-dark,#22c55e))] dark:bg-[var(--zui-sortable-list-green-bg-dark,color-mix(in_oklch,var(--zui-color-green-dark,#22c55e)_15%,transparent))]",
  emerald:
    "border-[color:var(--zui-sortable-list-emerald-border,var(--zui-color-emerald,#059669))] bg-[var(--zui-sortable-list-emerald-bg,color-mix(in_oklch,var(--zui-color-emerald,#059669)_8%,transparent))] dark:border-[color:var(--zui-sortable-list-emerald-border-dark,var(--zui-color-emerald-dark,#34d399))] dark:bg-[var(--zui-sortable-list-emerald-bg-dark,color-mix(in_oklch,var(--zui-color-emerald-dark,#34d399)_15%,transparent))]",
  purple:
    "border-[color:var(--zui-sortable-list-purple-border,var(--zui-color-purple,#9333ea))] bg-[var(--zui-sortable-list-purple-bg,color-mix(in_oklch,var(--zui-color-purple,#9333ea)_8%,transparent))] dark:border-[color:var(--zui-sortable-list-purple-border-dark,var(--zui-color-purple-dark,#c084fc))] dark:bg-[var(--zui-sortable-list-purple-bg-dark,color-mix(in_oklch,var(--zui-color-purple-dark,#c084fc)_15%,transparent))]",
  pink: "border-[color:var(--zui-sortable-list-pink-border,var(--zui-color-pink,#db2777))] bg-[var(--zui-sortable-list-pink-bg,color-mix(in_oklch,var(--zui-color-pink,#db2777)_8%,transparent))] dark:border-[color:var(--zui-sortable-list-pink-border-dark,var(--zui-color-pink-dark,#f472b6))] dark:bg-[var(--zui-sortable-list-pink-bg-dark,color-mix(in_oklch,var(--zui-color-pink-dark,#f472b6)_15%,transparent))]",
  orange:
    "border-[color:var(--zui-sortable-list-orange-border,var(--zui-color-orange,#ea580c))] bg-[var(--zui-sortable-list-orange-bg,color-mix(in_oklch,var(--zui-color-orange,#ea580c)_8%,transparent))] dark:border-[color:var(--zui-sortable-list-orange-border-dark,var(--zui-color-orange-dark,#fb923c))] dark:bg-[var(--zui-sortable-list-orange-bg-dark,color-mix(in_oklch,var(--zui-color-orange-dark,#fb923c)_15%,transparent))]",
  red: "border-[color:var(--zui-sortable-list-red-border,var(--zui-color-red,#dc2626))] bg-[var(--zui-sortable-list-red-bg,color-mix(in_oklch,var(--zui-color-red,#dc2626)_8%,transparent))] dark:border-[color:var(--zui-sortable-list-red-border-dark,var(--zui-color-red-dark,#ef4444))] dark:bg-[var(--zui-sortable-list-red-bg-dark,color-mix(in_oklch,var(--zui-color-red-dark,#ef4444)_15%,transparent))]",
  amber:
    "border-[color:var(--zui-sortable-list-amber-border,var(--zui-color-amber,#d97706))] bg-[var(--zui-sortable-list-amber-bg,color-mix(in_oklch,var(--zui-color-amber,#d97706)_8%,transparent))] dark:border-[color:var(--zui-sortable-list-amber-border-dark,var(--zui-color-amber-dark,#fbbf24))] dark:bg-[var(--zui-sortable-list-amber-bg-dark,color-mix(in_oklch,var(--zui-color-amber-dark,#fbbf24)_15%,transparent))]",
  slate:
    "border-[color:var(--zui-sortable-list-slate-border,var(--zui-color-slate,#475569))] bg-[var(--zui-sortable-list-slate-bg,color-mix(in_oklch,var(--zui-color-slate,#475569)_8%,transparent))] dark:border-[color:var(--zui-sortable-list-slate-border-dark,var(--zui-color-slate-dark,#64748b))] dark:bg-[var(--zui-sortable-list-slate-bg-dark,color-mix(in_oklch,var(--zui-color-slate-dark,#64748b)_15%,transparent))]",
  "gradient-blue":
    "bg-linear-to-r from-[var(--zui-sortable-list-gradient-blue-from,var(--zui-color-blue,#2563eb))] to-[var(--zui-sortable-list-gradient-blue-to,var(--zui-color-cyan,#0891b2))] text-[color:var(--zui-sortable-list-gradient-blue-fg,#ffffff)] dark:text-[color:var(--zui-sortable-list-gradient-blue-fg-dark,#0f172a)] dark:from-[var(--zui-sortable-list-gradient-blue-from-dark,var(--zui-color-blue-dark,#3b82f6))] dark:to-[var(--zui-sortable-list-gradient-blue-to-dark,var(--zui-color-cyan-dark,#22d3ee))]",
  "gradient-purple":
    "bg-linear-to-r from-[var(--zui-sortable-list-gradient-purple-from,var(--zui-color-purple,#9333ea))] to-[var(--zui-sortable-list-gradient-purple-to,var(--zui-color-pink,#db2777))] text-[color:var(--zui-sortable-list-gradient-purple-fg,#ffffff)] dark:text-[color:var(--zui-sortable-list-gradient-purple-fg-dark,#0f172a)] dark:from-[var(--zui-sortable-list-gradient-purple-from-dark,var(--zui-color-purple-dark,#c084fc))] dark:to-[var(--zui-sortable-list-gradient-purple-to-dark,var(--zui-color-pink-dark,#f472b6))]",
  "gradient-green":
    "bg-linear-to-r from-[var(--zui-sortable-list-gradient-green-from,var(--zui-color-green,#16a34a))] to-[var(--zui-sortable-list-gradient-green-to,var(--zui-color-lime,#65a30d))] text-[color:var(--zui-sortable-list-gradient-green-fg,#ffffff)] dark:text-[color:var(--zui-sortable-list-gradient-green-fg-dark,#0f172a)] dark:from-[var(--zui-sortable-list-gradient-green-from-dark,var(--zui-color-green-dark,#22c55e))] dark:to-[var(--zui-sortable-list-gradient-green-to-dark,var(--zui-color-lime-dark,#a3e635))]",
  glass:
    "bg-[var(--zui-sortable-list-glass-bg,rgba(255,255,255,0.6))] backdrop-blur-xl hover:bg-[var(--zui-sortable-list-glass-hover,rgba(255,255,255,0.8))] dark:bg-[var(--zui-sortable-list-glass-bg-dark,rgba(255,255,255,0.05))] dark:hover:bg-[var(--zui-sortable-list-glass-hover-dark,rgba(255,255,255,0.1))]",
} as const;

export const zuiSortableListSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

export const zuiSortableListItemSizes = {
  sm: "min-h-10 px-3 py-2",
  md: "min-h-12 px-4 py-3",
  lg: "min-h-14 px-5 py-4",
} as const;

export const zuiSortableListHandleBase =
  "flex shrink-0 cursor-grab touch-none items-center justify-center text-[color:var(--zui-sortable-list-handle,var(--zui-fg-muted,oklch(55.6%_0.043_257.417)))] active:cursor-grabbing dark:text-[color:var(--zui-sortable-list-handle-dark,var(--zui-fg-muted-dark,oklch(70.4%_0.04_256.788)))]";

export const zuiSortableListGradientHandle =
  "text-[color:var(--zui-sortable-list-gradient-handle,#ffffff)] dark:text-[color:var(--zui-sortable-list-gradient-handle-dark,#0f172a)]";
