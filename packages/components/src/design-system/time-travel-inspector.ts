export const zuiTimeTravelInspectorBase =
  "@container w-full min-w-0 overflow-hidden rounded-xl border bg-[var(--zui-time-travel-inspector-bg,#ffffff)] dark:bg-[var(--zui-time-travel-inspector-bg-dark,#0f172a)] text-[color:var(--zui-time-travel-inspector-fg,#0f172a)] dark:text-[color:var(--zui-time-travel-inspector-fg-dark,#f8fafc)] border-[color:var(--zui-time-travel-inspector-border,#e2e8f0)] dark:border-[color:var(--zui-time-travel-inspector-border-dark,#334155)]";
export const zuiTimeTravelInspectorAppearances = {
  default: "",
  blue: "bg-[var(--zui-time-travel-inspector-blue-bg,#eff6ff)] dark:bg-[var(--zui-time-travel-inspector-blue-bg-dark,#172554)] border-[color:var(--zui-time-travel-inspector-blue-border,#bfdbfe)] dark:border-[color:var(--zui-time-travel-inspector-blue-border-dark,#1d4ed8)]",
  cyan: "bg-[var(--zui-time-travel-inspector-cyan-bg,#ecfeff)] dark:bg-[var(--zui-time-travel-inspector-cyan-bg-dark,#164e63)] border-[color:var(--zui-time-travel-inspector-cyan-border,#a5f3fc)] dark:border-[color:var(--zui-time-travel-inspector-cyan-border-dark,#0e7490)]",
  teal: "bg-[var(--zui-time-travel-inspector-teal-bg,#f0fdfa)] dark:bg-[var(--zui-time-travel-inspector-teal-bg-dark,#134e4a)] border-[color:var(--zui-time-travel-inspector-teal-border,#99f6e4)] dark:border-[color:var(--zui-time-travel-inspector-teal-border-dark,#0f766e)]",
  emerald:
    "bg-[var(--zui-time-travel-inspector-emerald-bg,#ecfdf5)] dark:bg-[var(--zui-time-travel-inspector-emerald-bg-dark,#064e3b)] border-[color:var(--zui-time-travel-inspector-emerald-border,#a7f3d0)] dark:border-[color:var(--zui-time-travel-inspector-emerald-border-dark,#047857)]",
  lime: "bg-[var(--zui-time-travel-inspector-lime-bg,#f7fee7)] dark:bg-[var(--zui-time-travel-inspector-lime-bg-dark,#365314)] border-[color:var(--zui-time-travel-inspector-lime-border,#d9f99d)] dark:border-[color:var(--zui-time-travel-inspector-lime-border-dark,#4d7c0f)]",
  violet:
    "bg-[var(--zui-time-travel-inspector-violet-bg,#f5f3ff)] dark:bg-[var(--zui-time-travel-inspector-violet-bg-dark,#2e1065)] border-[color:var(--zui-time-travel-inspector-violet-border,#ddd6fe)] dark:border-[color:var(--zui-time-travel-inspector-violet-border-dark,#6d28d9)]",
  purple:
    "bg-[var(--zui-time-travel-inspector-purple-bg,#faf5ff)] dark:bg-[var(--zui-time-travel-inspector-purple-bg-dark,#3b0764)] border-[color:var(--zui-time-travel-inspector-purple-border,#e9d5ff)] dark:border-[color:var(--zui-time-travel-inspector-purple-border-dark,#7e22ce)]",
  pink: "bg-[var(--zui-time-travel-inspector-pink-bg,#fdf2f8)] dark:bg-[var(--zui-time-travel-inspector-pink-bg-dark,#500724)] border-[color:var(--zui-time-travel-inspector-pink-border,#fbcfe8)] dark:border-[color:var(--zui-time-travel-inspector-pink-border-dark,#be185d)]",
  rose: "bg-[var(--zui-time-travel-inspector-rose-bg,#fff1f2)] dark:bg-[var(--zui-time-travel-inspector-rose-bg-dark,#4c0519)] border-[color:var(--zui-time-travel-inspector-rose-border,#fecdd3)] dark:border-[color:var(--zui-time-travel-inspector-rose-border-dark,#be123c)]",
  orange:
    "bg-[var(--zui-time-travel-inspector-orange-bg,#fff7ed)] dark:bg-[var(--zui-time-travel-inspector-orange-bg-dark,#431407)] border-[color:var(--zui-time-travel-inspector-orange-border,#fed7aa)] dark:border-[color:var(--zui-time-travel-inspector-orange-border-dark,#c2410c)]",
  amber:
    "bg-[var(--zui-time-travel-inspector-amber-bg,#fffbeb)] dark:bg-[var(--zui-time-travel-inspector-amber-bg-dark,#451a03)] border-[color:var(--zui-time-travel-inspector-amber-border,#fde68a)] dark:border-[color:var(--zui-time-travel-inspector-amber-border-dark,#b45309)]",
  subtle:
    "bg-[var(--zui-time-travel-inspector-subtle-bg,var(--zui-surface-muted,#f8fafc))] dark:bg-[var(--zui-time-travel-inspector-subtle-bg-dark,var(--zui-surface-muted-dark,#1e293b))] border-transparent dark:border-transparent",
  contrast:
    "bg-[var(--zui-time-travel-inspector-contrast-bg,#ffffff)] dark:bg-[var(--zui-time-travel-inspector-contrast-bg-dark,#172033)]",
  "gradient-blue":
    "bg-gradient-to-br from-[var(--zui-time-travel-inspector-gradient-from,#eff6ff)] dark:from-[var(--zui-time-travel-inspector-gradient-from-dark,#172554)] to-[var(--zui-time-travel-inspector-gradient-to,#f5f3ff)] dark:to-[var(--zui-time-travel-inspector-gradient-to-dark,#2e1065)]",
  glass:
    "backdrop-blur-md bg-[var(--zui-time-travel-inspector-glass-bg,#ffffffcc)] dark:bg-[var(--zui-time-travel-inspector-glass-bg-dark,#0f172acc)] border-[color:var(--zui-time-travel-inspector-glass-border,#ffffff66)] dark:border-[color:var(--zui-time-travel-inspector-glass-border-dark,#ffffff1a)]",
} as const;

export const zuiTimeTravelInspectorSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;
export const zuiTimeTravelInspectorToolbarBase =
  "flex flex-wrap items-center gap-3 border-b p-4 border-[color:var(--zui-time-travel-inspector-border,#e2e8f0)] dark:border-[color:var(--zui-time-travel-inspector-border-dark,#334155)]";
export const zuiTimeTravelInspectorMutedBase =
  "text-xs text-[color:var(--zui-time-travel-inspector-muted-fg,#475569)] dark:text-[color:var(--zui-time-travel-inspector-muted-fg-dark,#cbd5e1)]";
export const zuiTimeTravelInspectorControlBase =
  "rounded-md border px-3 py-2 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-40 bg-[var(--zui-time-travel-inspector-control-bg,#ffffff)] dark:bg-[var(--zui-time-travel-inspector-control-bg-dark,#1e293b)] text-[color:var(--zui-time-travel-inspector-fg,#0f172a)] dark:text-[color:var(--zui-time-travel-inspector-fg-dark,#f8fafc)] border-[color:var(--zui-time-travel-inspector-border,#e2e8f0)] dark:border-[color:var(--zui-time-travel-inspector-border-dark,#334155)] ring-[color:var(--zui-time-travel-inspector-focus-ring,#2563eb)] dark:ring-[color:var(--zui-time-travel-inspector-focus-ring-dark,#60a5fa)]";
export const zuiTimeTravelInspectorSelectedBase =
  "font-semibold bg-[var(--zui-time-travel-inspector-selected-bg,#dbeafe)] dark:bg-[var(--zui-time-travel-inspector-selected-bg-dark,#1e3a8a)] text-[color:var(--zui-time-travel-inspector-selected-fg,#1e40af)] dark:text-[color:var(--zui-time-travel-inspector-selected-fg-dark,#dbeafe)]";
export const zuiTimeTravelInspectorTimelineBase =
  "space-y-4 border-b p-4 border-[color:var(--zui-time-travel-inspector-border,#e2e8f0)] dark:border-[color:var(--zui-time-travel-inspector-border-dark,#334155)]";
export const zuiTimeTravelInspectorScrubberBase =
  "w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 disabled:cursor-default accent-[var(--zui-time-travel-inspector-accent,#2563eb)] dark:accent-[var(--zui-time-travel-inspector-accent-dark,#60a5fa)] ring-[color:var(--zui-time-travel-inspector-focus-ring,#2563eb)] dark:ring-[color:var(--zui-time-travel-inspector-focus-ring-dark,#60a5fa)]";
export const zuiTimeTravelInspectorPanelBase =
  "min-w-0 space-y-3 rounded-lg border p-4 bg-[var(--zui-time-travel-inspector-panel-bg,#f8fafc)] dark:bg-[var(--zui-time-travel-inspector-panel-bg-dark,#020617)] border-[color:var(--zui-time-travel-inspector-border,#e2e8f0)] dark:border-[color:var(--zui-time-travel-inspector-border-dark,#334155)]";
export const zuiTimeTravelInspectorCodeBase =
  "max-h-72 overflow-auto whitespace-pre-wrap break-words font-mono text-xs leading-6 ";
export const zuiTimeTravelInspectorChangeBase =
  "rounded-md border p-3 border-[color:var(--zui-time-travel-inspector-border,#e2e8f0)] dark:border-[color:var(--zui-time-travel-inspector-border-dark,#334155)]";
export const zuiTimeTravelInspectorBeforeBase =
  "break-words font-mono text-xs text-[color:var(--zui-time-travel-inspector-before-fg,#b91c1c)] dark:text-[color:var(--zui-time-travel-inspector-before-fg-dark,#fca5a5)]";
export const zuiTimeTravelInspectorAfterBase =
  "break-words font-mono text-xs text-[color:var(--zui-time-travel-inspector-after-fg,#047857)] dark:text-[color:var(--zui-time-travel-inspector-after-fg-dark,#6ee7b7)]";
