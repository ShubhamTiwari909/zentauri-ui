/** Themeable tokens for the data-driven ActivityFeed surface. */
export const zuiActivityFeedBase = [
  "w-full overflow-hidden rounded-xl border",
  "border-[color:var(--zui-activity-feed-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-activity-feed-border-dark,var(--zui-border-dark,#ffffff1a))]",
  "bg-[var(--zui-activity-feed-bg,var(--zui-surface,#ffffff))] dark:bg-[var(--zui-activity-feed-bg-dark,var(--zui-surface-dark,#0f172a))]",
  "text-[color:var(--zui-activity-feed-fg,var(--zui-fg,#0f172a))] dark:text-[color:var(--zui-activity-feed-fg-dark,var(--zui-fg-dark,#f8fafc))]",
] as const;

export const zuiActivityFeedAppearances = {
  default: "",
  blue: "bg-[var(--zui-activity-feed-blue-bg,#eff6ff)] dark:bg-[var(--zui-activity-feed-blue-bg-dark,#172554)] border-[color:var(--zui-activity-feed-blue-border,#bfdbfe)] dark:border-[color:var(--zui-activity-feed-blue-border-dark,#1d4ed8)]",
  cyan: "bg-[var(--zui-activity-feed-cyan-bg,#ecfeff)] dark:bg-[var(--zui-activity-feed-cyan-bg-dark,#164e63)] border-[color:var(--zui-activity-feed-cyan-border,#a5f3fc)] dark:border-[color:var(--zui-activity-feed-cyan-border-dark,#0e7490)]",
  teal: "bg-[var(--zui-activity-feed-teal-bg,#f0fdfa)] dark:bg-[var(--zui-activity-feed-teal-bg-dark,#134e4a)] border-[color:var(--zui-activity-feed-teal-border,#99f6e4)] dark:border-[color:var(--zui-activity-feed-teal-border-dark,#0f766e)]",
  emerald:
    "bg-[var(--zui-activity-feed-emerald-bg,#ecfdf5)] dark:bg-[var(--zui-activity-feed-emerald-bg-dark,#064e3b)] border-[color:var(--zui-activity-feed-emerald-border,#a7f3d0)] dark:border-[color:var(--zui-activity-feed-emerald-border-dark,#047857)]",
  lime: "bg-[var(--zui-activity-feed-lime-bg,#f7fee7)] dark:bg-[var(--zui-activity-feed-lime-bg-dark,#365314)] border-[color:var(--zui-activity-feed-lime-border,#d9f99d)] dark:border-[color:var(--zui-activity-feed-lime-border-dark,#4d7c0f)]",
  violet:
    "bg-[var(--zui-activity-feed-violet-bg,#f5f3ff)] dark:bg-[var(--zui-activity-feed-violet-bg-dark,#2e1065)] border-[color:var(--zui-activity-feed-violet-border,#ddd6fe)] dark:border-[color:var(--zui-activity-feed-violet-border-dark,#6d28d9)]",
  purple:
    "bg-[var(--zui-activity-feed-purple-bg,#faf5ff)] dark:bg-[var(--zui-activity-feed-purple-bg-dark,#3b0764)] border-[color:var(--zui-activity-feed-purple-border,#e9d5ff)] dark:border-[color:var(--zui-activity-feed-purple-border-dark,#7e22ce)]",
  pink: "bg-[var(--zui-activity-feed-pink-bg,#fdf2f8)] dark:bg-[var(--zui-activity-feed-pink-bg-dark,#500724)] border-[color:var(--zui-activity-feed-pink-border,#fbcfe8)] dark:border-[color:var(--zui-activity-feed-pink-border-dark,#be185d)]",
  rose: "bg-[var(--zui-activity-feed-rose-bg,#fff1f2)] dark:bg-[var(--zui-activity-feed-rose-bg-dark,#4c0519)] border-[color:var(--zui-activity-feed-rose-border,#fecdd3)] dark:border-[color:var(--zui-activity-feed-rose-border-dark,#be123c)]",
  orange:
    "bg-[var(--zui-activity-feed-orange-bg,#fff7ed)] dark:bg-[var(--zui-activity-feed-orange-bg-dark,#431407)] border-[color:var(--zui-activity-feed-orange-border,#fed7aa)] dark:border-[color:var(--zui-activity-feed-orange-border-dark,#c2410c)]",
  amber:
    "bg-[var(--zui-activity-feed-amber-bg,#fffbeb)] dark:bg-[var(--zui-activity-feed-amber-bg-dark,#451a03)] border-[color:var(--zui-activity-feed-amber-border,#fde68a)] dark:border-[color:var(--zui-activity-feed-amber-border-dark,#b45309)]",
  subtle:
    "bg-[var(--zui-activity-feed-subtle-bg,var(--zui-surface-muted,#f8fafc))] dark:bg-[var(--zui-activity-feed-subtle-bg-dark,var(--zui-surface-muted-dark,#1e293b))] border-transparent dark:border-transparent",
  contrast:
    "bg-[var(--zui-activity-feed-contrast-bg,#ffffff)] dark:bg-[var(--zui-activity-feed-contrast-bg-dark,#172033)]",
  glass:
    "backdrop-blur-md bg-[var(--zui-activity-feed-glass-bg,#ffffffcc)] dark:bg-[var(--zui-activity-feed-glass-bg-dark,#0f172acc)] border-[color:var(--zui-activity-feed-glass-border,#ffffff66)] dark:border-[color:var(--zui-activity-feed-glass-border-dark,#ffffff1a)]",
} as const;

export const zuiActivityFeedSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

export const zuiActivityFeedListBase =
  "m-0 flex list-none flex-col divide-y divide-[color:var(--zui-activity-feed-divider,var(--zui-border,#0000001a))] dark:divide-[color:var(--zui-activity-feed-divider-dark,var(--zui-border-dark,#ffffff1a))] p-0";

export const zuiActivityFeedItemBase = "flex items-start gap-3";

export const zuiActivityFeedItemSizes = {
  sm: "p-3",
  md: "p-4",
  lg: "p-5",
} as const;

export const zuiActivityFeedAvatarBase =
  "grid shrink-0 place-items-center overflow-hidden rounded-full bg-[var(--zui-activity-feed-avatar-bg,var(--zui-color-sky,#0ea5e9))] dark:bg-[var(--zui-activity-feed-avatar-bg-dark,var(--zui-color-sky-dark,#0284c7))] font-semibold text-[color:var(--zui-activity-feed-avatar-fg,#ffffff)] dark:text-[color:var(--zui-activity-feed-avatar-fg-dark,#ffffff)]";

export const zuiActivityFeedAvatarSizes = {
  sm: "size-7 text-[10px]",
  md: "size-9 text-xs",
  lg: "size-11 text-sm",
} as const;

export const zuiActivityFeedAvatarImageBase = "size-full object-cover";

export const zuiActivityFeedContentBase = "min-w-0 flex-1";

export const zuiActivityFeedSummaryBase = "leading-5";

export const zuiActivityFeedActorBase = "font-semibold";

export const zuiActivityFeedVerbBase =
  "text-[color:var(--zui-activity-feed-muted-fg,var(--zui-fg-muted,#64748b))] dark:text-[color:var(--zui-activity-feed-muted-fg-dark,var(--zui-fg-muted-dark,#94a3b8))]";

export const zuiActivityFeedObjectBase = "font-medium";

export const zuiActivityFeedMetaBase =
  "mt-1 flex items-center gap-2 text-xs text-[color:var(--zui-activity-feed-muted-fg,var(--zui-fg-muted,#64748b))] dark:text-[color:var(--zui-activity-feed-muted-fg-dark,var(--zui-fg-muted-dark,#94a3b8))]";

export const zuiActivityFeedCountBase =
  "rounded-full bg-[var(--zui-activity-feed-count-bg,var(--zui-surface-muted,#f1f5f9))] px-2 py-0.5 font-medium text-[color:var(--zui-activity-feed-count-fg,var(--zui-fg-muted,#475569))] dark:bg-[var(--zui-activity-feed-count-bg-dark,var(--zui-surface-muted-dark,#334155))] dark:text-[color:var(--zui-activity-feed-count-fg-dark,var(--zui-fg-muted-dark,#cbd5e1))]";

export const zuiActivityFeedEmptyBase =
  "p-6 text-center text-sm text-[color:var(--zui-activity-feed-muted-fg,var(--zui-fg-muted,#64748b))] dark:text-[color:var(--zui-activity-feed-muted-fg-dark,var(--zui-fg-muted-dark,#94a3b8))]";
