// Literal recipes keep every token and responsive utility in Tailwind scan scope.
export const zuiResizablePanelsBase =
  "flex min-h-0 min-w-0 overflow-hidden border-solid data-[resizing=true]:select-none rounded-[var(--zui-resizable-panels-radius,0.75rem)] dark:rounded-[var(--zui-resizable-panels-radius-dark,0.75rem)] border-[length:var(--zui-resizable-panels-border-width,1px)] dark:border-[length:var(--zui-resizable-panels-border-width-dark,1px)] border-[color:var(--zui-resizable-panels-border,#e2e8f0)] dark:border-[color:var(--zui-resizable-panels-border-dark,#334155)]";
export const zuiResizablePanelsOrientations = {
  horizontal: "flex-row",
  vertical: "flex-col",
} as const;
export const zuiResizablePanelsPanelBase =
  "min-h-0 min-w-0 overflow-auto border-solid border-[length:var(--zui-resizable-panels-panel-border-width,0px)] dark:border-[length:var(--zui-resizable-panels-panel-border-width-dark,0px)]";
export const zuiResizablePanelsHandleBase =
  "relative flex shrink-0 touch-none select-none items-center justify-center outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--zui-resizable-panels-focus-ring,#2563eb)] dark:focus-visible:ring-[color:var(--zui-resizable-panels-focus-ring-dark,#60a5fa)] data-[disabled=true]:cursor-default data-[disabled=true]:opacity-50";
export const zuiResizablePanelsHandleOrientations = {
  horizontal:
    "w-(--_zui-resizable-panels-handle-size) self-stretch cursor-col-resize",
  vertical:
    "h-(--_zui-resizable-panels-handle-size) self-stretch cursor-row-resize",
} as const;
export const zuiResizablePanelsHandleSizes = {
  sm: "[--_zui-resizable-panels-handle-size:var(--zui-resizable-panels-handle-size-sm,12px)] dark:[--_zui-resizable-panels-handle-size:var(--zui-resizable-panels-handle-size-sm-dark,12px)]",
  md: "[--_zui-resizable-panels-handle-size:var(--zui-resizable-panels-handle-size-md,24px)] dark:[--_zui-resizable-panels-handle-size:var(--zui-resizable-panels-handle-size-md-dark,24px)]",
  lg: "[--_zui-resizable-panels-handle-size:var(--zui-resizable-panels-handle-size-lg,32px)] dark:[--_zui-resizable-panels-handle-size:var(--zui-resizable-panels-handle-size-lg-dark,32px)]",
} as const;
export const zuiResizablePanelsGripBase =
  "pointer-events-none rounded-full bg-current";
export const zuiResizablePanelsGripOrientations = {
  horizontal:
    "w-[var(--zui-resizable-panels-grip-thickness,3px)] dark:w-[var(--zui-resizable-panels-grip-thickness-dark,3px)] h-[var(--zui-resizable-panels-grip-length,24px)] dark:h-[var(--zui-resizable-panels-grip-length-dark,24px)]",
  vertical:
    "h-[var(--zui-resizable-panels-grip-thickness,3px)] dark:h-[var(--zui-resizable-panels-grip-thickness-dark,3px)] w-[var(--zui-resizable-panels-grip-length,24px)] dark:w-[var(--zui-resizable-panels-grip-length-dark,24px)]",
} as const;
export const zuiResizablePanelsPanelPaddings = {
  none: "p-0",
  sm: "p-[var(--zui-resizable-panels-panel-padding-sm,0.5rem)] dark:p-[var(--zui-resizable-panels-panel-padding-sm-dark,0.5rem)]",
  md: "p-[var(--zui-resizable-panels-panel-padding-md,1rem)] dark:p-[var(--zui-resizable-panels-panel-padding-md-dark,1rem)]",
  lg: "p-[var(--zui-resizable-panels-panel-padding-lg,1.5rem)] dark:p-[var(--zui-resizable-panels-panel-padding-lg-dark,1.5rem)]",
} as const;

export const zuiResizablePanelsPanelAppearances = {
  default:
    "bg-[var(--zui-resizable-panels-panel-default-bg,transparent)] dark:bg-[var(--zui-resizable-panels-panel-default-bg-dark,transparent)] text-[color:var(--zui-resizable-panels-panel-default-fg,inherit)] dark:text-[color:var(--zui-resizable-panels-panel-default-fg-dark,inherit)] border-[color:var(--zui-resizable-panels-panel-default-border,transparent)] dark:border-[color:var(--zui-resizable-panels-panel-default-border-dark,transparent)]",
  subtle:
    "bg-[var(--zui-resizable-panels-panel-subtle-bg,#f8fafc)] dark:bg-[var(--zui-resizable-panels-panel-subtle-bg-dark,#1e293b)] text-[color:var(--zui-resizable-panels-panel-subtle-fg,#334155)] dark:text-[color:var(--zui-resizable-panels-panel-subtle-fg-dark,#e2e8f0)] border-[color:var(--zui-resizable-panels-panel-subtle-border,#e2e8f0)] dark:border-[color:var(--zui-resizable-panels-panel-subtle-border-dark,#334155)]",
  contrast:
    "bg-[var(--zui-resizable-panels-panel-contrast-bg,#0f172a)] dark:bg-[var(--zui-resizable-panels-panel-contrast-bg-dark,#f8fafc)] text-[color:var(--zui-resizable-panels-panel-contrast-fg,#f8fafc)] dark:text-[color:var(--zui-resizable-panels-panel-contrast-fg-dark,#0f172a)] border-[color:var(--zui-resizable-panels-panel-contrast-border,#334155)] dark:border-[color:var(--zui-resizable-panels-panel-contrast-border-dark,#cbd5e1)]",
  glass:
    "bg-[var(--zui-resizable-panels-panel-glass-bg,#ffffffb3)] dark:bg-[var(--zui-resizable-panels-panel-glass-bg-dark,#0f172ab3)] text-[color:var(--zui-resizable-panels-panel-glass-fg,#0f172a)] dark:text-[color:var(--zui-resizable-panels-panel-glass-fg-dark,#f8fafc)] border-[color:var(--zui-resizable-panels-panel-glass-border,#cbd5e1)] dark:border-[color:var(--zui-resizable-panels-panel-glass-border-dark,#475569)] backdrop-blur-[var(--zui-resizable-panels-panel-glass-blur,12px)] dark:backdrop-blur-[var(--zui-resizable-panels-panel-glass-blur-dark,12px)]",
  blue: "bg-[var(--zui-resizable-panels-panel-blue-bg,#eff6ff)] dark:bg-[var(--zui-resizable-panels-panel-blue-bg-dark,#172554)] text-[color:var(--zui-resizable-panels-panel-blue-fg,#1e40af)] dark:text-[color:var(--zui-resizable-panels-panel-blue-fg-dark,#dbeafe)] border-[color:var(--zui-resizable-panels-panel-blue-border,#bfdbfe)] dark:border-[color:var(--zui-resizable-panels-panel-blue-border-dark,#1e40af)]",
  cyan: "bg-[var(--zui-resizable-panels-panel-cyan-bg,#ecfeff)] dark:bg-[var(--zui-resizable-panels-panel-cyan-bg-dark,#083344)] text-[color:var(--zui-resizable-panels-panel-cyan-fg,#155e75)] dark:text-[color:var(--zui-resizable-panels-panel-cyan-fg-dark,#cffafe)] border-[color:var(--zui-resizable-panels-panel-cyan-border,#a5f3fc)] dark:border-[color:var(--zui-resizable-panels-panel-cyan-border-dark,#155e75)]",
  green:
    "bg-[var(--zui-resizable-panels-panel-green-bg,#f0fdf4)] dark:bg-[var(--zui-resizable-panels-panel-green-bg-dark,#052e16)] text-[color:var(--zui-resizable-panels-panel-green-fg,#166534)] dark:text-[color:var(--zui-resizable-panels-panel-green-fg-dark,#dcfce7)] border-[color:var(--zui-resizable-panels-panel-green-border,#bbf7d0)] dark:border-[color:var(--zui-resizable-panels-panel-green-border-dark,#166534)]",
  lime: "bg-[var(--zui-resizable-panels-panel-lime-bg,#f7fee7)] dark:bg-[var(--zui-resizable-panels-panel-lime-bg-dark,#1a2e05)] text-[color:var(--zui-resizable-panels-panel-lime-fg,#3f6212)] dark:text-[color:var(--zui-resizable-panels-panel-lime-fg-dark,#ecfccb)] border-[color:var(--zui-resizable-panels-panel-lime-border,#d9f99d)] dark:border-[color:var(--zui-resizable-panels-panel-lime-border-dark,#3f6212)]",
  emerald:
    "bg-[var(--zui-resizable-panels-panel-emerald-bg,#ecfdf5)] dark:bg-[var(--zui-resizable-panels-panel-emerald-bg-dark,#022c22)] text-[color:var(--zui-resizable-panels-panel-emerald-fg,#065f46)] dark:text-[color:var(--zui-resizable-panels-panel-emerald-fg-dark,#d1fae5)] border-[color:var(--zui-resizable-panels-panel-emerald-border,#a7f3d0)] dark:border-[color:var(--zui-resizable-panels-panel-emerald-border-dark,#065f46)]",
  indigo:
    "bg-[var(--zui-resizable-panels-panel-indigo-bg,#eef2ff)] dark:bg-[var(--zui-resizable-panels-panel-indigo-bg-dark,#1e1b4b)] text-[color:var(--zui-resizable-panels-panel-indigo-fg,#3730a3)] dark:text-[color:var(--zui-resizable-panels-panel-indigo-fg-dark,#e0e7ff)] border-[color:var(--zui-resizable-panels-panel-indigo-border,#c7d2fe)] dark:border-[color:var(--zui-resizable-panels-panel-indigo-border-dark,#3730a3)]",
  purple:
    "bg-[var(--zui-resizable-panels-panel-purple-bg,#faf5ff)] dark:bg-[var(--zui-resizable-panels-panel-purple-bg-dark,#3b0764)] text-[color:var(--zui-resizable-panels-panel-purple-fg,#6b21a8)] dark:text-[color:var(--zui-resizable-panels-panel-purple-fg-dark,#f3e8ff)] border-[color:var(--zui-resizable-panels-panel-purple-border,#e9d5ff)] dark:border-[color:var(--zui-resizable-panels-panel-purple-border-dark,#6b21a8)]",
  pink: "bg-[var(--zui-resizable-panels-panel-pink-bg,#fdf2f8)] dark:bg-[var(--zui-resizable-panels-panel-pink-bg-dark,#500724)] text-[color:var(--zui-resizable-panels-panel-pink-fg,#9d174d)] dark:text-[color:var(--zui-resizable-panels-panel-pink-fg-dark,#fce7f3)] border-[color:var(--zui-resizable-panels-panel-pink-border,#fbcfe8)] dark:border-[color:var(--zui-resizable-panels-panel-pink-border-dark,#9d174d)]",
  rose: "bg-[var(--zui-resizable-panels-panel-rose-bg,#fff1f2)] dark:bg-[var(--zui-resizable-panels-panel-rose-bg-dark,#4c0519)] text-[color:var(--zui-resizable-panels-panel-rose-fg,#9f1239)] dark:text-[color:var(--zui-resizable-panels-panel-rose-fg-dark,#ffe4e6)] border-[color:var(--zui-resizable-panels-panel-rose-border,#fecdd3)] dark:border-[color:var(--zui-resizable-panels-panel-rose-border-dark,#9f1239)]",
  sky: "bg-[var(--zui-resizable-panels-panel-sky-bg,#f0f9ff)] dark:bg-[var(--zui-resizable-panels-panel-sky-bg-dark,#082f49)] text-[color:var(--zui-resizable-panels-panel-sky-fg,#075985)] dark:text-[color:var(--zui-resizable-panels-panel-sky-fg-dark,#e0f2fe)] border-[color:var(--zui-resizable-panels-panel-sky-border,#bae6fd)] dark:border-[color:var(--zui-resizable-panels-panel-sky-border-dark,#075985)]",
  teal: "bg-[var(--zui-resizable-panels-panel-teal-bg,#f0fdfa)] dark:bg-[var(--zui-resizable-panels-panel-teal-bg-dark,#042f2e)] text-[color:var(--zui-resizable-panels-panel-teal-fg,#115e59)] dark:text-[color:var(--zui-resizable-panels-panel-teal-fg-dark,#ccfbf1)] border-[color:var(--zui-resizable-panels-panel-teal-border,#99f6e4)] dark:border-[color:var(--zui-resizable-panels-panel-teal-border-dark,#115e59)]",
  yellow:
    "bg-[var(--zui-resizable-panels-panel-yellow-bg,#fefce8)] dark:bg-[var(--zui-resizable-panels-panel-yellow-bg-dark,#422006)] text-[color:var(--zui-resizable-panels-panel-yellow-fg,#854d0e)] dark:text-[color:var(--zui-resizable-panels-panel-yellow-fg-dark,#fef9c3)] border-[color:var(--zui-resizable-panels-panel-yellow-border,#fef08a)] dark:border-[color:var(--zui-resizable-panels-panel-yellow-border-dark,#854d0e)]",
  orange:
    "bg-[var(--zui-resizable-panels-panel-orange-bg,#fff7ed)] dark:bg-[var(--zui-resizable-panels-panel-orange-bg-dark,#431407)] text-[color:var(--zui-resizable-panels-panel-orange-fg,#9a3412)] dark:text-[color:var(--zui-resizable-panels-panel-orange-fg-dark,#ffedd5)] border-[color:var(--zui-resizable-panels-panel-orange-border,#fed7aa)] dark:border-[color:var(--zui-resizable-panels-panel-orange-border-dark,#9a3412)]",
  red: "bg-[var(--zui-resizable-panels-panel-red-bg,#fef2f2)] dark:bg-[var(--zui-resizable-panels-panel-red-bg-dark,#450a0a)] text-[color:var(--zui-resizable-panels-panel-red-fg,#991b1b)] dark:text-[color:var(--zui-resizable-panels-panel-red-fg-dark,#fee2e2)] border-[color:var(--zui-resizable-panels-panel-red-border,#fecaca)] dark:border-[color:var(--zui-resizable-panels-panel-red-border-dark,#991b1b)]",
  slate:
    "bg-[var(--zui-resizable-panels-panel-slate-bg,#f8fafc)] dark:bg-[var(--zui-resizable-panels-panel-slate-bg-dark,#0f172a)] text-[color:var(--zui-resizable-panels-panel-slate-fg,#334155)] dark:text-[color:var(--zui-resizable-panels-panel-slate-fg-dark,#f1f5f9)] border-[color:var(--zui-resizable-panels-panel-slate-border,#cbd5e1)] dark:border-[color:var(--zui-resizable-panels-panel-slate-border-dark,#334155)]",
  gray: "bg-[var(--zui-resizable-panels-panel-gray-bg,#f9fafb)] dark:bg-[var(--zui-resizable-panels-panel-gray-bg-dark,#111827)] text-[color:var(--zui-resizable-panels-panel-gray-fg,#374151)] dark:text-[color:var(--zui-resizable-panels-panel-gray-fg-dark,#f3f4f6)] border-[color:var(--zui-resizable-panels-panel-gray-border,#d1d5db)] dark:border-[color:var(--zui-resizable-panels-panel-gray-border-dark,#374151)]",
  zinc: "bg-[var(--zui-resizable-panels-panel-zinc-bg,#fafafa)] dark:bg-[var(--zui-resizable-panels-panel-zinc-bg-dark,#18181b)] text-[color:var(--zui-resizable-panels-panel-zinc-fg,#3f3f46)] dark:text-[color:var(--zui-resizable-panels-panel-zinc-fg-dark,#f4f4f5)] border-[color:var(--zui-resizable-panels-panel-zinc-border,#d4d4d8)] dark:border-[color:var(--zui-resizable-panels-panel-zinc-border-dark,#3f3f46)]",
  "gradient-blue":
    "bg-linear-to-br from-[var(--zui-resizable-panels-panel-gradient-blue-from,#eff6ff)] dark:from-[var(--zui-resizable-panels-panel-gradient-blue-from-dark,#172554)] to-[var(--zui-resizable-panels-panel-gradient-blue-to,#faf5ff)] dark:to-[var(--zui-resizable-panels-panel-gradient-blue-to-dark,#3b0764)] text-[color:var(--zui-resizable-panels-panel-gradient-blue-fg,#0f172a)] dark:text-[color:var(--zui-resizable-panels-panel-gradient-blue-fg-dark,#f8fafc)] border-[color:var(--zui-resizable-panels-panel-gradient-blue-border,#bfdbfe)] dark:border-[color:var(--zui-resizable-panels-panel-gradient-blue-border-dark,#1e40af)]",
  "gradient-green":
    "bg-linear-to-br from-[var(--zui-resizable-panels-panel-gradient-green-from,#f0fdf4)] dark:from-[var(--zui-resizable-panels-panel-gradient-green-from-dark,#052e16)] to-[var(--zui-resizable-panels-panel-gradient-green-to,#f7fee7)] dark:to-[var(--zui-resizable-panels-panel-gradient-green-to-dark,#1a2e05)] text-[color:var(--zui-resizable-panels-panel-gradient-green-fg,#0f172a)] dark:text-[color:var(--zui-resizable-panels-panel-gradient-green-fg-dark,#f8fafc)] border-[color:var(--zui-resizable-panels-panel-gradient-green-border,#bbf7d0)] dark:border-[color:var(--zui-resizable-panels-panel-gradient-green-border-dark,#166534)]",
  "gradient-purple":
    "bg-linear-to-br from-[var(--zui-resizable-panels-panel-gradient-purple-from,#faf5ff)] dark:from-[var(--zui-resizable-panels-panel-gradient-purple-from-dark,#3b0764)] to-[var(--zui-resizable-panels-panel-gradient-purple-to,#fdf2f8)] dark:to-[var(--zui-resizable-panels-panel-gradient-purple-to-dark,#500724)] text-[color:var(--zui-resizable-panels-panel-gradient-purple-fg,#0f172a)] dark:text-[color:var(--zui-resizable-panels-panel-gradient-purple-fg-dark,#f8fafc)] border-[color:var(--zui-resizable-panels-panel-gradient-purple-border,#e9d5ff)] dark:border-[color:var(--zui-resizable-panels-panel-gradient-purple-border-dark,#6b21a8)]",
  "gradient-orange":
    "bg-linear-to-br from-[var(--zui-resizable-panels-panel-gradient-orange-from,#fff7ed)] dark:from-[var(--zui-resizable-panels-panel-gradient-orange-from-dark,#431407)] to-[var(--zui-resizable-panels-panel-gradient-orange-to,#fefce8)] dark:to-[var(--zui-resizable-panels-panel-gradient-orange-to-dark,#422006)] text-[color:var(--zui-resizable-panels-panel-gradient-orange-fg,#0f172a)] dark:text-[color:var(--zui-resizable-panels-panel-gradient-orange-fg-dark,#f8fafc)] border-[color:var(--zui-resizable-panels-panel-gradient-orange-border,#fed7aa)] dark:border-[color:var(--zui-resizable-panels-panel-gradient-orange-border-dark,#9a3412)]",
  "gradient-pink":
    "bg-linear-to-br from-[var(--zui-resizable-panels-panel-gradient-pink-from,#fdf2f8)] dark:from-[var(--zui-resizable-panels-panel-gradient-pink-from-dark,#500724)] to-[var(--zui-resizable-panels-panel-gradient-pink-to,#fff1f2)] dark:to-[var(--zui-resizable-panels-panel-gradient-pink-to-dark,#4c0519)] text-[color:var(--zui-resizable-panels-panel-gradient-pink-fg,#0f172a)] dark:text-[color:var(--zui-resizable-panels-panel-gradient-pink-fg-dark,#f8fafc)] border-[color:var(--zui-resizable-panels-panel-gradient-pink-border,#fbcfe8)] dark:border-[color:var(--zui-resizable-panels-panel-gradient-pink-border-dark,#9d174d)]",
} as const;

export const zuiResizablePanelsHandleAppearances = {
  default:
    "bg-[var(--zui-resizable-panels-handle-default-bg,#f1f5f9)] dark:bg-[var(--zui-resizable-panels-handle-default-bg-dark,#0f172a)] text-[color:var(--zui-resizable-panels-handle-default-fg,#64748b)] dark:text-[color:var(--zui-resizable-panels-handle-default-fg-dark,#94a3b8)]",
  subtle:
    "bg-[var(--zui-resizable-panels-handle-subtle-bg,#f8fafc)] dark:bg-[var(--zui-resizable-panels-handle-subtle-bg-dark,#1e293b)] text-[color:var(--zui-resizable-panels-handle-subtle-fg,#334155)] dark:text-[color:var(--zui-resizable-panels-handle-subtle-fg-dark,#e2e8f0)]",
  contrast:
    "bg-[var(--zui-resizable-panels-handle-contrast-bg,#0f172a)] dark:bg-[var(--zui-resizable-panels-handle-contrast-bg-dark,#f8fafc)] text-[color:var(--zui-resizable-panels-handle-contrast-fg,#f8fafc)] dark:text-[color:var(--zui-resizable-panels-handle-contrast-fg-dark,#0f172a)]",
  glass:
    "bg-[var(--zui-resizable-panels-handle-glass-bg,#ffffffb3)] dark:bg-[var(--zui-resizable-panels-handle-glass-bg-dark,#0f172ab3)] text-[color:var(--zui-resizable-panels-handle-glass-fg,#0f172a)] dark:text-[color:var(--zui-resizable-panels-handle-glass-fg-dark,#f8fafc)] backdrop-blur-[var(--zui-resizable-panels-handle-glass-blur,12px)] dark:backdrop-blur-[var(--zui-resizable-panels-handle-glass-blur-dark,12px)]",
  blue: "bg-[var(--zui-resizable-panels-handle-blue-bg,#eff6ff)] dark:bg-[var(--zui-resizable-panels-handle-blue-bg-dark,#172554)] text-[color:var(--zui-resizable-panels-handle-blue-fg,#1e40af)] dark:text-[color:var(--zui-resizable-panels-handle-blue-fg-dark,#dbeafe)]",
  cyan: "bg-[var(--zui-resizable-panels-handle-cyan-bg,#ecfeff)] dark:bg-[var(--zui-resizable-panels-handle-cyan-bg-dark,#083344)] text-[color:var(--zui-resizable-panels-handle-cyan-fg,#155e75)] dark:text-[color:var(--zui-resizable-panels-handle-cyan-fg-dark,#cffafe)]",
  green:
    "bg-[var(--zui-resizable-panels-handle-green-bg,#f0fdf4)] dark:bg-[var(--zui-resizable-panels-handle-green-bg-dark,#052e16)] text-[color:var(--zui-resizable-panels-handle-green-fg,#166534)] dark:text-[color:var(--zui-resizable-panels-handle-green-fg-dark,#dcfce7)]",
  lime: "bg-[var(--zui-resizable-panels-handle-lime-bg,#f7fee7)] dark:bg-[var(--zui-resizable-panels-handle-lime-bg-dark,#1a2e05)] text-[color:var(--zui-resizable-panels-handle-lime-fg,#3f6212)] dark:text-[color:var(--zui-resizable-panels-handle-lime-fg-dark,#ecfccb)]",
  emerald:
    "bg-[var(--zui-resizable-panels-handle-emerald-bg,#ecfdf5)] dark:bg-[var(--zui-resizable-panels-handle-emerald-bg-dark,#022c22)] text-[color:var(--zui-resizable-panels-handle-emerald-fg,#065f46)] dark:text-[color:var(--zui-resizable-panels-handle-emerald-fg-dark,#d1fae5)]",
  indigo:
    "bg-[var(--zui-resizable-panels-handle-indigo-bg,#eef2ff)] dark:bg-[var(--zui-resizable-panels-handle-indigo-bg-dark,#1e1b4b)] text-[color:var(--zui-resizable-panels-handle-indigo-fg,#3730a3)] dark:text-[color:var(--zui-resizable-panels-handle-indigo-fg-dark,#e0e7ff)]",
  purple:
    "bg-[var(--zui-resizable-panels-handle-purple-bg,#faf5ff)] dark:bg-[var(--zui-resizable-panels-handle-purple-bg-dark,#3b0764)] text-[color:var(--zui-resizable-panels-handle-purple-fg,#6b21a8)] dark:text-[color:var(--zui-resizable-panels-handle-purple-fg-dark,#f3e8ff)]",
  pink: "bg-[var(--zui-resizable-panels-handle-pink-bg,#fdf2f8)] dark:bg-[var(--zui-resizable-panels-handle-pink-bg-dark,#500724)] text-[color:var(--zui-resizable-panels-handle-pink-fg,#9d174d)] dark:text-[color:var(--zui-resizable-panels-handle-pink-fg-dark,#fce7f3)]",
  rose: "bg-[var(--zui-resizable-panels-handle-rose-bg,#fff1f2)] dark:bg-[var(--zui-resizable-panels-handle-rose-bg-dark,#4c0519)] text-[color:var(--zui-resizable-panels-handle-rose-fg,#9f1239)] dark:text-[color:var(--zui-resizable-panels-handle-rose-fg-dark,#ffe4e6)]",
  sky: "bg-[var(--zui-resizable-panels-handle-sky-bg,#f0f9ff)] dark:bg-[var(--zui-resizable-panels-handle-sky-bg-dark,#082f49)] text-[color:var(--zui-resizable-panels-handle-sky-fg,#075985)] dark:text-[color:var(--zui-resizable-panels-handle-sky-fg-dark,#e0f2fe)]",
  teal: "bg-[var(--zui-resizable-panels-handle-teal-bg,#f0fdfa)] dark:bg-[var(--zui-resizable-panels-handle-teal-bg-dark,#042f2e)] text-[color:var(--zui-resizable-panels-handle-teal-fg,#115e59)] dark:text-[color:var(--zui-resizable-panels-handle-teal-fg-dark,#ccfbf1)]",
  yellow:
    "bg-[var(--zui-resizable-panels-handle-yellow-bg,#fefce8)] dark:bg-[var(--zui-resizable-panels-handle-yellow-bg-dark,#422006)] text-[color:var(--zui-resizable-panels-handle-yellow-fg,#854d0e)] dark:text-[color:var(--zui-resizable-panels-handle-yellow-fg-dark,#fef9c3)]",
  orange:
    "bg-[var(--zui-resizable-panels-handle-orange-bg,#fff7ed)] dark:bg-[var(--zui-resizable-panels-handle-orange-bg-dark,#431407)] text-[color:var(--zui-resizable-panels-handle-orange-fg,#9a3412)] dark:text-[color:var(--zui-resizable-panels-handle-orange-fg-dark,#ffedd5)]",
  red: "bg-[var(--zui-resizable-panels-handle-red-bg,#fef2f2)] dark:bg-[var(--zui-resizable-panels-handle-red-bg-dark,#450a0a)] text-[color:var(--zui-resizable-panels-handle-red-fg,#991b1b)] dark:text-[color:var(--zui-resizable-panels-handle-red-fg-dark,#fee2e2)]",
  slate:
    "bg-[var(--zui-resizable-panels-handle-slate-bg,#f8fafc)] dark:bg-[var(--zui-resizable-panels-handle-slate-bg-dark,#0f172a)] text-[color:var(--zui-resizable-panels-handle-slate-fg,#334155)] dark:text-[color:var(--zui-resizable-panels-handle-slate-fg-dark,#f1f5f9)]",
  gray: "bg-[var(--zui-resizable-panels-handle-gray-bg,#f9fafb)] dark:bg-[var(--zui-resizable-panels-handle-gray-bg-dark,#111827)] text-[color:var(--zui-resizable-panels-handle-gray-fg,#374151)] dark:text-[color:var(--zui-resizable-panels-handle-gray-fg-dark,#f3f4f6)]",
  zinc: "bg-[var(--zui-resizable-panels-handle-zinc-bg,#fafafa)] dark:bg-[var(--zui-resizable-panels-handle-zinc-bg-dark,#18181b)] text-[color:var(--zui-resizable-panels-handle-zinc-fg,#3f3f46)] dark:text-[color:var(--zui-resizable-panels-handle-zinc-fg-dark,#f4f4f5)]",
  "gradient-blue":
    "bg-linear-to-br from-[var(--zui-resizable-panels-handle-gradient-blue-from,#eff6ff)] dark:from-[var(--zui-resizable-panels-handle-gradient-blue-from-dark,#172554)] to-[var(--zui-resizable-panels-handle-gradient-blue-to,#faf5ff)] dark:to-[var(--zui-resizable-panels-handle-gradient-blue-to-dark,#3b0764)] text-[color:var(--zui-resizable-panels-handle-gradient-blue-fg,#0f172a)] dark:text-[color:var(--zui-resizable-panels-handle-gradient-blue-fg-dark,#f8fafc)]",
  "gradient-green":
    "bg-linear-to-br from-[var(--zui-resizable-panels-handle-gradient-green-from,#f0fdf4)] dark:from-[var(--zui-resizable-panels-handle-gradient-green-from-dark,#052e16)] to-[var(--zui-resizable-panels-handle-gradient-green-to,#f7fee7)] dark:to-[var(--zui-resizable-panels-handle-gradient-green-to-dark,#1a2e05)] text-[color:var(--zui-resizable-panels-handle-gradient-green-fg,#0f172a)] dark:text-[color:var(--zui-resizable-panels-handle-gradient-green-fg-dark,#f8fafc)]",
  "gradient-purple":
    "bg-linear-to-br from-[var(--zui-resizable-panels-handle-gradient-purple-from,#faf5ff)] dark:from-[var(--zui-resizable-panels-handle-gradient-purple-from-dark,#3b0764)] to-[var(--zui-resizable-panels-handle-gradient-purple-to,#fdf2f8)] dark:to-[var(--zui-resizable-panels-handle-gradient-purple-to-dark,#500724)] text-[color:var(--zui-resizable-panels-handle-gradient-purple-fg,#0f172a)] dark:text-[color:var(--zui-resizable-panels-handle-gradient-purple-fg-dark,#f8fafc)]",
  "gradient-orange":
    "bg-linear-to-br from-[var(--zui-resizable-panels-handle-gradient-orange-from,#fff7ed)] dark:from-[var(--zui-resizable-panels-handle-gradient-orange-from-dark,#431407)] to-[var(--zui-resizable-panels-handle-gradient-orange-to,#fefce8)] dark:to-[var(--zui-resizable-panels-handle-gradient-orange-to-dark,#422006)] text-[color:var(--zui-resizable-panels-handle-gradient-orange-fg,#0f172a)] dark:text-[color:var(--zui-resizable-panels-handle-gradient-orange-fg-dark,#f8fafc)]",
  "gradient-pink":
    "bg-linear-to-br from-[var(--zui-resizable-panels-handle-gradient-pink-from,#fdf2f8)] dark:from-[var(--zui-resizable-panels-handle-gradient-pink-from-dark,#500724)] to-[var(--zui-resizable-panels-handle-gradient-pink-to,#fff1f2)] dark:to-[var(--zui-resizable-panels-handle-gradient-pink-to-dark,#4c0519)] text-[color:var(--zui-resizable-panels-handle-gradient-pink-fg,#0f172a)] dark:text-[color:var(--zui-resizable-panels-handle-gradient-pink-fg-dark,#f8fafc)]",
} as const;

export const zuiResizablePanelsContentBase = "min-h-0 min-w-0 h-full";
