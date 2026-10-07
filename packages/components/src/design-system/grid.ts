export const zuiGridBase = "grid min-w-0 w-full" as const;

export const zuiGridItemBase = "min-w-0 min-h-0" as const;

export const zuiGridGapValues = {
  none: "0px",
  xs: "var(--zui-grid-gap-xs,0.25rem)",
  sm: "var(--zui-grid-gap-sm,0.5rem)",
  md: "var(--zui-grid-gap-md,1rem)",
  lg: "var(--zui-grid-gap-lg,1.5rem)",
  xl: "var(--zui-grid-gap-xl,2rem)",
} as const;

export const zuiGridGapDarkValues = {
  none: "0px",
  xs: "var(--zui-grid-gap-xs-dark,0.25rem)",
  sm: "var(--zui-grid-gap-sm-dark,0.5rem)",
  md: "var(--zui-grid-gap-md-dark,1rem)",
  lg: "var(--zui-grid-gap-lg-dark,1.5rem)",
  xl: "var(--zui-grid-gap-xl-dark,2rem)",
} as const;

export const zuiGridMinItemWidth =
  "var(--zui-grid-min-item-width,16rem)" as const;

export const zuiGridMinItemWidthDark =
  "var(--zui-grid-min-item-width-dark,16rem)" as const;

export const zuiGridFlows = {
  row: "grid-flow-row",
  "row-dense": "grid-flow-row-dense",
} as const;

export const zuiGridAlignments = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
} as const;

export const zuiGridJustifications = {
  start: "justify-items-start",
  center: "justify-items-center",
  end: "justify-items-end",
  stretch: "justify-items-stretch",
} as const;

export const zuiGridSelfAlignments = {
  auto: "self-auto",
  start: "self-start",
  center: "self-center",
  end: "self-end",
  stretch: "self-stretch",
} as const;

export const zuiGridSelfJustifications = {
  auto: "justify-self-auto",
  start: "justify-self-start",
  center: "justify-self-center",
  end: "justify-self-end",
  stretch: "justify-self-stretch",
} as const;

export const zuiGridItemPaddings = {
  none: "p-0",
  sm: "p-[var(--zui-grid-item-padding-sm,0.5rem)] dark:p-[var(--zui-grid-item-padding-sm-dark,0.5rem)]",
  md: "p-[var(--zui-grid-item-padding-md,1rem)] dark:p-[var(--zui-grid-item-padding-md-dark,1rem)]",
  lg: "p-[var(--zui-grid-item-padding-lg,1.5rem)] dark:p-[var(--zui-grid-item-padding-lg-dark,1.5rem)]",
} as const;

export const zuiGridItemSurface =
  "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)]" as const;

export const zuiGridItemAppearances = {
  default:
    "bg-[var(--zui-grid-default-bg,transparent)] dark:bg-[var(--zui-grid-default-bg-dark,transparent)] text-[color:var(--zui-grid-default-fg,inherit)] dark:text-[color:var(--zui-grid-default-fg-dark,inherit)] border-[color:var(--zui-grid-default-border,transparent)] dark:border-[color:var(--zui-grid-default-border-dark,transparent)]",
  subtle:
    "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-subtle-bg,#f8fafc)] dark:bg-[var(--zui-grid-subtle-bg-dark,#1e293b)] text-[color:var(--zui-grid-subtle-fg,#334155)] dark:text-[color:var(--zui-grid-subtle-fg-dark,#e2e8f0)] border-[color:var(--zui-grid-subtle-border,#e2e8f0)] dark:border-[color:var(--zui-grid-subtle-border-dark,#334155)]",
  contrast:
    "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-contrast-bg,#0f172a)] dark:bg-[var(--zui-grid-contrast-bg-dark,#f8fafc)] text-[color:var(--zui-grid-contrast-fg,#f8fafc)] dark:text-[color:var(--zui-grid-contrast-fg-dark,#0f172a)] border-[color:var(--zui-grid-contrast-border,#334155)] dark:border-[color:var(--zui-grid-contrast-border-dark,#cbd5e1)]",
  glass:
    "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-glass-bg,#ffffffb3)] dark:bg-[var(--zui-grid-glass-bg-dark,#0f172ab3)] text-[color:var(--zui-grid-glass-fg,#0f172a)] dark:text-[color:var(--zui-grid-glass-fg-dark,#f8fafc)] border-[color:var(--zui-grid-glass-border,#cbd5e1)] dark:border-[color:var(--zui-grid-glass-border-dark,#475569)] backdrop-blur-[var(--zui-grid-glass-blur,12px)] dark:backdrop-blur-[var(--zui-grid-glass-blur-dark,12px)]",
  blue: "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-blue-bg,#eff6ff)] dark:bg-[var(--zui-grid-blue-bg-dark,#172554)] text-[color:var(--zui-grid-blue-fg,#1e40af)] dark:text-[color:var(--zui-grid-blue-fg-dark,#dbeafe)] border-[color:var(--zui-grid-blue-border,#bfdbfe)] dark:border-[color:var(--zui-grid-blue-border-dark,#1e40af)]",
  cyan: "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-cyan-bg,#ecfeff)] dark:bg-[var(--zui-grid-cyan-bg-dark,#083344)] text-[color:var(--zui-grid-cyan-fg,#155e75)] dark:text-[color:var(--zui-grid-cyan-fg-dark,#cffafe)] border-[color:var(--zui-grid-cyan-border,#a5f3fc)] dark:border-[color:var(--zui-grid-cyan-border-dark,#155e75)]",
  green:
    "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-green-bg,#f0fdf4)] dark:bg-[var(--zui-grid-green-bg-dark,#052e16)] text-[color:var(--zui-grid-green-fg,#166534)] dark:text-[color:var(--zui-grid-green-fg-dark,#dcfce7)] border-[color:var(--zui-grid-green-border,#bbf7d0)] dark:border-[color:var(--zui-grid-green-border-dark,#166534)]",
  lime: "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-lime-bg,#f7fee7)] dark:bg-[var(--zui-grid-lime-bg-dark,#1a2e05)] text-[color:var(--zui-grid-lime-fg,#3f6212)] dark:text-[color:var(--zui-grid-lime-fg-dark,#ecfccb)] border-[color:var(--zui-grid-lime-border,#d9f99d)] dark:border-[color:var(--zui-grid-lime-border-dark,#3f6212)]",
  emerald:
    "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-emerald-bg,#ecfdf5)] dark:bg-[var(--zui-grid-emerald-bg-dark,#022c22)] text-[color:var(--zui-grid-emerald-fg,#065f46)] dark:text-[color:var(--zui-grid-emerald-fg-dark,#d1fae5)] border-[color:var(--zui-grid-emerald-border,#a7f3d0)] dark:border-[color:var(--zui-grid-emerald-border-dark,#065f46)]",
  indigo:
    "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-indigo-bg,#eef2ff)] dark:bg-[var(--zui-grid-indigo-bg-dark,#1e1b4b)] text-[color:var(--zui-grid-indigo-fg,#3730a3)] dark:text-[color:var(--zui-grid-indigo-fg-dark,#e0e7ff)] border-[color:var(--zui-grid-indigo-border,#c7d2fe)] dark:border-[color:var(--zui-grid-indigo-border-dark,#3730a3)]",
  purple:
    "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-purple-bg,#faf5ff)] dark:bg-[var(--zui-grid-purple-bg-dark,#3b0764)] text-[color:var(--zui-grid-purple-fg,#6b21a8)] dark:text-[color:var(--zui-grid-purple-fg-dark,#f3e8ff)] border-[color:var(--zui-grid-purple-border,#e9d5ff)] dark:border-[color:var(--zui-grid-purple-border-dark,#6b21a8)]",
  pink: "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-pink-bg,#fdf2f8)] dark:bg-[var(--zui-grid-pink-bg-dark,#500724)] text-[color:var(--zui-grid-pink-fg,#9d174d)] dark:text-[color:var(--zui-grid-pink-fg-dark,#fce7f3)] border-[color:var(--zui-grid-pink-border,#fbcfe8)] dark:border-[color:var(--zui-grid-pink-border-dark,#9d174d)]",
  rose: "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-rose-bg,#fff1f2)] dark:bg-[var(--zui-grid-rose-bg-dark,#4c0519)] text-[color:var(--zui-grid-rose-fg,#9f1239)] dark:text-[color:var(--zui-grid-rose-fg-dark,#ffe4e6)] border-[color:var(--zui-grid-rose-border,#fecdd3)] dark:border-[color:var(--zui-grid-rose-border-dark,#9f1239)]",
  sky: "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-sky-bg,#f0f9ff)] dark:bg-[var(--zui-grid-sky-bg-dark,#082f49)] text-[color:var(--zui-grid-sky-fg,#075985)] dark:text-[color:var(--zui-grid-sky-fg-dark,#e0f2fe)] border-[color:var(--zui-grid-sky-border,#bae6fd)] dark:border-[color:var(--zui-grid-sky-border-dark,#075985)]",
  teal: "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-teal-bg,#f0fdfa)] dark:bg-[var(--zui-grid-teal-bg-dark,#042f2e)] text-[color:var(--zui-grid-teal-fg,#115e59)] dark:text-[color:var(--zui-grid-teal-fg-dark,#ccfbf1)] border-[color:var(--zui-grid-teal-border,#99f6e4)] dark:border-[color:var(--zui-grid-teal-border-dark,#115e59)]",
  yellow:
    "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-yellow-bg,#fefce8)] dark:bg-[var(--zui-grid-yellow-bg-dark,#422006)] text-[color:var(--zui-grid-yellow-fg,#854d0e)] dark:text-[color:var(--zui-grid-yellow-fg-dark,#fef9c3)] border-[color:var(--zui-grid-yellow-border,#fef08a)] dark:border-[color:var(--zui-grid-yellow-border-dark,#854d0e)]",
  orange:
    "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-orange-bg,#fff7ed)] dark:bg-[var(--zui-grid-orange-bg-dark,#431407)] text-[color:var(--zui-grid-orange-fg,#9a3412)] dark:text-[color:var(--zui-grid-orange-fg-dark,#ffedd5)] border-[color:var(--zui-grid-orange-border,#fed7aa)] dark:border-[color:var(--zui-grid-orange-border-dark,#9a3412)]",
  red: "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-red-bg,#fef2f2)] dark:bg-[var(--zui-grid-red-bg-dark,#450a0a)] text-[color:var(--zui-grid-red-fg,#991b1b)] dark:text-[color:var(--zui-grid-red-fg-dark,#fee2e2)] border-[color:var(--zui-grid-red-border,#fecaca)] dark:border-[color:var(--zui-grid-red-border-dark,#991b1b)]",
  slate:
    "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-slate-bg,#f8fafc)] dark:bg-[var(--zui-grid-slate-bg-dark,#0f172a)] text-[color:var(--zui-grid-slate-fg,#334155)] dark:text-[color:var(--zui-grid-slate-fg-dark,#f1f5f9)] border-[color:var(--zui-grid-slate-border,#cbd5e1)] dark:border-[color:var(--zui-grid-slate-border-dark,#334155)]",
  gray: "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-gray-bg,#f9fafb)] dark:bg-[var(--zui-grid-gray-bg-dark,#111827)] text-[color:var(--zui-grid-gray-fg,#374151)] dark:text-[color:var(--zui-grid-gray-fg-dark,#f3f4f6)] border-[color:var(--zui-grid-gray-border,#d1d5db)] dark:border-[color:var(--zui-grid-gray-border-dark,#374151)]",
  zinc: "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-[var(--zui-grid-zinc-bg,#fafafa)] dark:bg-[var(--zui-grid-zinc-bg-dark,#18181b)] text-[color:var(--zui-grid-zinc-fg,#3f3f46)] dark:text-[color:var(--zui-grid-zinc-fg-dark,#f4f4f5)] border-[color:var(--zui-grid-zinc-border,#d4d4d8)] dark:border-[color:var(--zui-grid-zinc-border-dark,#3f3f46)]",
  "gradient-blue":
    "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-linear-to-br from-[var(--zui-grid-gradient-blue-from,#eff6ff)] dark:from-[var(--zui-grid-gradient-blue-from-dark,#172554)] to-[var(--zui-grid-gradient-blue-to,#faf5ff)] dark:to-[var(--zui-grid-gradient-blue-to-dark,#3b0764)] text-[color:var(--zui-grid-gradient-blue-fg,#0f172a)] dark:text-[color:var(--zui-grid-gradient-blue-fg-dark,#f8fafc)] border-[color:var(--zui-grid-gradient-blue-border,#bfdbfe)] dark:border-[color:var(--zui-grid-gradient-blue-border-dark,#1e40af)]",
  "gradient-green":
    "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-linear-to-br from-[var(--zui-grid-gradient-green-from,#f0fdf4)] dark:from-[var(--zui-grid-gradient-green-from-dark,#052e16)] to-[var(--zui-grid-gradient-green-to,#f7fee7)] dark:to-[var(--zui-grid-gradient-green-to-dark,#1a2e05)] text-[color:var(--zui-grid-gradient-green-fg,#0f172a)] dark:text-[color:var(--zui-grid-gradient-green-fg-dark,#f8fafc)] border-[color:var(--zui-grid-gradient-green-border,#bbf7d0)] dark:border-[color:var(--zui-grid-gradient-green-border-dark,#166534)]",
  "gradient-purple":
    "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-linear-to-br from-[var(--zui-grid-gradient-purple-from,#faf5ff)] dark:from-[var(--zui-grid-gradient-purple-from-dark,#3b0764)] to-[var(--zui-grid-gradient-purple-to,#fdf2f8)] dark:to-[var(--zui-grid-gradient-purple-to-dark,#500724)] text-[color:var(--zui-grid-gradient-purple-fg,#0f172a)] dark:text-[color:var(--zui-grid-gradient-purple-fg-dark,#f8fafc)] border-[color:var(--zui-grid-gradient-purple-border,#e9d5ff)] dark:border-[color:var(--zui-grid-gradient-purple-border-dark,#6b21a8)]",
  "gradient-orange":
    "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-linear-to-br from-[var(--zui-grid-gradient-orange-from,#fff7ed)] dark:from-[var(--zui-grid-gradient-orange-from-dark,#431407)] to-[var(--zui-grid-gradient-orange-to,#fefce8)] dark:to-[var(--zui-grid-gradient-orange-to-dark,#422006)] text-[color:var(--zui-grid-gradient-orange-fg,#0f172a)] dark:text-[color:var(--zui-grid-gradient-orange-fg-dark,#f8fafc)] border-[color:var(--zui-grid-gradient-orange-border,#fed7aa)] dark:border-[color:var(--zui-grid-gradient-orange-border-dark,#9a3412)]",
  "gradient-pink":
    "rounded-[var(--zui-grid-item-radius,0.75rem)] dark:rounded-[var(--zui-grid-item-radius-dark,0.75rem)] border-[length:var(--zui-grid-item-border-width,1px)] dark:border-[length:var(--zui-grid-item-border-width-dark,1px)] bg-linear-to-br from-[var(--zui-grid-gradient-pink-from,#fdf2f8)] dark:from-[var(--zui-grid-gradient-pink-from-dark,#500724)] to-[var(--zui-grid-gradient-pink-to,#fff1f2)] dark:to-[var(--zui-grid-gradient-pink-to-dark,#4c0519)] text-[color:var(--zui-grid-gradient-pink-fg,#0f172a)] dark:text-[color:var(--zui-grid-gradient-pink-fg-dark,#f8fafc)] border-[color:var(--zui-grid-gradient-pink-border,#fbcfe8)] dark:border-[color:var(--zui-grid-gradient-pink-border-dark,#9d174d)]",
} as const;

export const zuiGridResponsiveClasses = {
  base: "[grid-template-columns:var(--_zui-grid-columns-base)] dark:[grid-template-columns:var(--_zui-grid-columns-base-dark)] [grid-template-rows:var(--_zui-grid-rows-base)] [grid-template-areas:var(--_zui-grid-areas-base)] [column-gap:var(--_zui-grid-column-gap-base)] dark:[column-gap:var(--_zui-grid-column-gap-base-dark)] [row-gap:var(--_zui-grid-row-gap-base)] dark:[row-gap:var(--_zui-grid-row-gap-base-dark)]",
  sm: "sm:[grid-template-columns:var(--_zui-grid-columns-sm)] sm:dark:[grid-template-columns:var(--_zui-grid-columns-sm-dark)] sm:[grid-template-rows:var(--_zui-grid-rows-sm)] sm:[grid-template-areas:var(--_zui-grid-areas-sm)] sm:[column-gap:var(--_zui-grid-column-gap-sm)] sm:dark:[column-gap:var(--_zui-grid-column-gap-sm-dark)] sm:[row-gap:var(--_zui-grid-row-gap-sm)] sm:dark:[row-gap:var(--_zui-grid-row-gap-sm-dark)]",
  md: "md:[grid-template-columns:var(--_zui-grid-columns-md)] md:dark:[grid-template-columns:var(--_zui-grid-columns-md-dark)] md:[grid-template-rows:var(--_zui-grid-rows-md)] md:[grid-template-areas:var(--_zui-grid-areas-md)] md:[column-gap:var(--_zui-grid-column-gap-md)] md:dark:[column-gap:var(--_zui-grid-column-gap-md-dark)] md:[row-gap:var(--_zui-grid-row-gap-md)] md:dark:[row-gap:var(--_zui-grid-row-gap-md-dark)]",
  lg: "lg:[grid-template-columns:var(--_zui-grid-columns-lg)] lg:dark:[grid-template-columns:var(--_zui-grid-columns-lg-dark)] lg:[grid-template-rows:var(--_zui-grid-rows-lg)] lg:[grid-template-areas:var(--_zui-grid-areas-lg)] lg:[column-gap:var(--_zui-grid-column-gap-lg)] lg:dark:[column-gap:var(--_zui-grid-column-gap-lg-dark)] lg:[row-gap:var(--_zui-grid-row-gap-lg)] lg:dark:[row-gap:var(--_zui-grid-row-gap-lg-dark)]",
  xl: "xl:[grid-template-columns:var(--_zui-grid-columns-xl)] xl:dark:[grid-template-columns:var(--_zui-grid-columns-xl-dark)] xl:[grid-template-rows:var(--_zui-grid-rows-xl)] xl:[grid-template-areas:var(--_zui-grid-areas-xl)] xl:[column-gap:var(--_zui-grid-column-gap-xl)] xl:dark:[column-gap:var(--_zui-grid-column-gap-xl-dark)] xl:[row-gap:var(--_zui-grid-row-gap-xl)] xl:dark:[row-gap:var(--_zui-grid-row-gap-xl-dark)]",
  "2xl":
    "2xl:[grid-template-columns:var(--_zui-grid-columns-2xl)] 2xl:dark:[grid-template-columns:var(--_zui-grid-columns-2xl-dark)] 2xl:[grid-template-rows:var(--_zui-grid-rows-2xl)] 2xl:[grid-template-areas:var(--_zui-grid-areas-2xl)] 2xl:[column-gap:var(--_zui-grid-column-gap-2xl)] 2xl:dark:[column-gap:var(--_zui-grid-column-gap-2xl-dark)] 2xl:[row-gap:var(--_zui-grid-row-gap-2xl)] 2xl:dark:[row-gap:var(--_zui-grid-row-gap-2xl-dark)]",
} as const;

export const zuiGridItemResponsiveClasses = {
  base: "[grid-column-start:var(--_zui-grid-item-column-start-base)] [grid-column-end:var(--_zui-grid-item-column-end-base)] [grid-row-start:var(--_zui-grid-item-row-start-base)] [grid-row-end:var(--_zui-grid-item-row-end-base)]",
  sm: "sm:[grid-column-start:var(--_zui-grid-item-column-start-sm)] sm:[grid-column-end:var(--_zui-grid-item-column-end-sm)] sm:[grid-row-start:var(--_zui-grid-item-row-start-sm)] sm:[grid-row-end:var(--_zui-grid-item-row-end-sm)]",
  md: "md:[grid-column-start:var(--_zui-grid-item-column-start-md)] md:[grid-column-end:var(--_zui-grid-item-column-end-md)] md:[grid-row-start:var(--_zui-grid-item-row-start-md)] md:[grid-row-end:var(--_zui-grid-item-row-end-md)]",
  lg: "lg:[grid-column-start:var(--_zui-grid-item-column-start-lg)] lg:[grid-column-end:var(--_zui-grid-item-column-end-lg)] lg:[grid-row-start:var(--_zui-grid-item-row-start-lg)] lg:[grid-row-end:var(--_zui-grid-item-row-end-lg)]",
  xl: "xl:[grid-column-start:var(--_zui-grid-item-column-start-xl)] xl:[grid-column-end:var(--_zui-grid-item-column-end-xl)] xl:[grid-row-start:var(--_zui-grid-item-row-start-xl)] xl:[grid-row-end:var(--_zui-grid-item-row-end-xl)]",
  "2xl":
    "2xl:[grid-column-start:var(--_zui-grid-item-column-start-2xl)] 2xl:[grid-column-end:var(--_zui-grid-item-column-end-2xl)] 2xl:[grid-row-start:var(--_zui-grid-item-row-start-2xl)] 2xl:[grid-row-end:var(--_zui-grid-item-row-end-2xl)]",
} as const;
