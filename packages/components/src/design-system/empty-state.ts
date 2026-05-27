export const zuiEmptyStateBase =
  "flex w-full flex-col items-center text-center";

export const zuiEmptyStateSizes = {
  sm: "gap-2 p-4 text-sm",
  md: "gap-3 p-6 text-sm",
  lg: "gap-4 p-8 text-base",
} as const;

export const zuiEmptyStateAppearances = {
  default:
    "text-[color:var(--zui-empty-state-default-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-empty-state-default-fg-dark,oklch(98.4%_0.003_247.858))]",
  ghost:
    "text-[color:var(--zui-empty-state-ghost-fg,oklch(37.2%_0.044_257.287))] dark:text-[color:var(--zui-empty-state-ghost-fg-dark,oklch(92.9%_0.013_255.508))]",
  card: "rounded-2xl border border-[color:var(--zui-empty-state-card-border,#0000001a)] dark:border-[color:var(--zui-empty-state-card-border-dark,#ffffff1a)] bg-[var(--zui-empty-state-card-bg,#ffffffe6)] dark:bg-[var(--zui-empty-state-card-bg-dark,#ffffff0d)] p-8 text-[color:var(--zui-empty-state-card-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-empty-state-card-fg-dark,oklch(98.4%_0.003_247.858))] shadow-[var(--zui-empty-state-card-shadow,0_8px_24px_rgba(15,23,42,0.12))] dark:shadow-[var(--zui-empty-state-card-shadow-dark,0_18px_48px_rgba(15,23,42,0.35))]",
} as const;

export const zuiEmptyStateAlignments = {
  start: "items-start text-left",
  center: "items-center text-center",
  end: "items-end text-right",
} as const;

export const zuiEmptyStateTitleBase = "font-semibold tracking-tight";

export const zuiEmptyStateTitleSizes = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
} as const;

export const zuiEmptyStateDescriptionBase =
  "max-w-md text-[color:var(--zui-empty-state-description-fg,oklch(55.4%_0.046_257.417))] dark:text-[color:var(--zui-empty-state-description-fg-dark,oklch(70.4%_0.04_256.788))]";

export const zuiEmptyStateDescriptionSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;
