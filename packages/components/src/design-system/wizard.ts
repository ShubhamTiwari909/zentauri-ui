export const zuiWizardBase = "flex w-full flex-col gap-6";

export const zuiWizardAppearances = {
  default:
    "rounded-xl border border-[color:var(--zui-wizard-default-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-wizard-default-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-wizard-default-bg,var(--zui-surface,#ffffff))] dark:bg-[var(--zui-wizard-default-bg-dark,var(--zui-surface-dark,oklch(14.5%_0.019_265.755)))] p-6",
  outline:
    "rounded-xl border border-[color:var(--zui-wizard-outline-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-wizard-outline-border-dark,var(--zui-border-dark,#ffffff1a))] bg-transparent p-6",
  ghost: "bg-transparent",
  card: "rounded-2xl border border-[color:var(--zui-wizard-card-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-wizard-card-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-wizard-card-bg,var(--zui-surface,#ffffff))] dark:bg-[var(--zui-wizard-card-bg-dark,var(--zui-surface-dark,oklch(14.5%_0.019_265.755)))] p-8 shadow-[var(--zui-wizard-card-shadow,0_1px_3px_0_rgb(0_0_0_/_0.1))] dark:shadow-[var(--zui-wizard-card-shadow-dark,0_1px_3px_0_rgb(0_0_0_/_0.3))]",
  separated: "gap-8",
  blue: "rounded-xl border border-[...] p-6",
  cyan: "rounded-xl border border-[...] p-6",
  green: "rounded-xl border border-[...] p-6",
  lime: "rounded-xl border border-[...] p-6",
  mint: "rounded-xl border border-[...] p-6",
  ocean: "rounded-xl border border-[...] p-6",
  sapphire: "rounded-xl border border-[...] p-6",
  lavender: "rounded-xl border border-[...] p-6",
  ruby: "rounded-xl border border-[...] p-6",
  red: "rounded-xl border border-[...] p-6",
  slate: "rounded-xl border border-[...] p-6",
  zinc: "rounded-xl border border-[...] p-6",
  stone: "rounded-xl border border-[...] p-6",
  royal: "rounded-xl border border-[...] p-6",
  electric: "rounded-xl border border-[...] p-6",
  forest: "rounded-xl border border-[...] p-6",
  sunset: "rounded-xl border border-[...] p-6",
  magenta: "rounded-xl border border-[...] p-6",
  crimson: "rounded-xl border border-[...] p-6",
  aqua: "rounded-xl border border-[...] p-6",
  plum: "rounded-xl border border-[...] p-6",
  sky: "rounded-xl border border-[...] p-6",
  rose: "rounded-xl border border-[...] p-6",
  purple: "rounded-xl border border-[...] p-6",
  pink: "rounded-xl border border-[...] p-6",
  orange: "rounded-xl border border-[...] p-6",
  yellow: "rounded-xl border border-[...] p-6",
  teal: "rounded-xl border border-[...] p-6",
  indigo: "rounded-xl border border-[...] p-6",
  emerald: "rounded-xl border border-[...] p-6",
  "gradient-blue": "rounded-xl border border-[...] p-6",
  "gradient-green": "rounded-xl border border-[...] p-6",
  "gradient-red": "rounded-xl border border-[...] p-6",
  "gradient-yellow": "rounded-xl border border-[...] p-6",
  "gradient-purple": "rounded-xl border border-[...] p-6",
  "gradient-teal": "rounded-xl border border-[...] p-6",
  "gradient-indigo": "rounded-xl border border-[...] p-6",
  "gradient-pink": "rounded-xl border border-[...] p-6",
  "gradient-orange": "rounded-xl border border-[...] p-6",
} as const;

export const zuiWizardSizes = {
  sm: "gap-4 p-4",
  md: "gap-6 p-6",
  lg: "gap-8 p-8",
} as const;

export const zuiWizardHeaderBase =
  "text-[color:var(--zui-wizard-header-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-wizard-header-fg-dark,var(--zui-fg-dark,oklch(92.9%_0.013_255.508)))]";

export const zuiWizardHeaderSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

export const zuiWizardContentBase =
  "text-[color:var(--zui-wizard-content-fg,var(--zui-fg,oklch(37.2%_0.044_257.287)))] dark:text-[color:var(--zui-wizard-content-fg-dark,var(--zui-fg-dark,oklch(92.9%_0.013_255.508)))]";

export const zuiWizardProgressBase = "w-full";

export const zuiWizardProgressBarBase =
  "h-2 overflow-hidden rounded-full bg-[var(--zui-wizard-progress-track-bg,var(--zui-surface-muted,oklch(55.4%_0.046_257.417_/_0.25)))] dark:bg-[var(--zui-wizard-progress-track-bg-dark,var(--zui-surface-muted-dark,oklch(55.4%_0.046_257.417_/_0.25)))]";

export const zuiWizardProgressFillBase =
  "h-full rounded-full bg-[var(--zui-wizard-progress-fill-bg,var(--zui-color-blue,#2563eb))] dark:bg-[var(--zui-wizard-progress-fill-bg-dark,var(--zui-color-blue-dark,#3b82f6))] transition-all duration-300";

export const zuiWizardProgressDotsBase = "flex items-center gap-2";

export const zuiWizardProgressDotBase =
  "size-2.5 rounded-full bg-[var(--zui-wizard-progress-dot-bg,var(--zui-surface-muted,oklch(55.4%_0.046_257.417_/_0.25)))] dark:bg-[var(--zui-wizard-progress-dot-bg-dark,var(--zui-surface-muted-dark,oklch(55.4%_0.046_257.417_/_0.25)))]";

export const zuiWizardProgressDotActiveBase =
  "bg-[var(--zui-wizard-progress-dot-active-bg,var(--zui-color-blue,#2563eb))] dark:bg-[var(--zui-wizard-progress-dot-active-bg-dark,var(--zui-color-blue-dark,#3b82f6))]";

export const zuiWizardProgressDotCompletedBase =
  "bg-[var(--zui-wizard-progress-dot-completed-bg,var(--zui-color-emerald,#059669))] dark:bg-[var(--zui-wizard-progress-dot-completed-bg-dark,var(--zui-color-emerald-dark,#34d399))]";

export const zuiWizardNavigationBase =
  "flex items-center justify-between gap-4";

export const zuiWizardNavigationSizes = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
} as const;

export const zuiWizardSidebarBase =
  "flex flex-col gap-2 border-r border-[color:var(--zui-wizard-sidebar-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-wizard-sidebar-border-dark,var(--zui-border-dark,#ffffff1a))] pr-6";

export const zuiWizardSidebarStepBase =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[color:var(--zui-wizard-sidebar-step-fg,var(--zui-fg-muted,oklch(55.4%_0.046_257.417)))] dark:text-[color:var(--zui-wizard-sidebar-step-fg-dark,var(--zui-fg-muted-dark,oklch(70.4%_0.04_256.788)))] transition-colors hover:bg-[var(--zui-wizard-sidebar-step-bg-hover,var(--zui-surface-hover,oklch(55.4%_0.046_257.417_/_0.1)))] dark:hover:bg-[var(--zui-wizard-sidebar-step-bg-hover-dark,var(--zui-surface-hover-dark,oklch(55.4%_0.046_257.417_/_0.1)))]";

export const zuiWizardSidebarStepActiveBase =
  "bg-[var(--zui-wizard-sidebar-step-active-bg,var(--zui-color-blue,#2563eb_/_0.1))] dark:bg-[var(--zui-wizard-sidebar-step-active-bg-dark,var(--zui-color-blue-dark,#3b82f6_/_0.15))] text-[color:var(--zui-wizard-sidebar-step-active-fg,var(--zui-color-blue,#2563eb))] dark:text-[color:var(--zui-wizard-sidebar-step-active-fg-dark,var(--zui-color-blue-dark,#60a5fa))]";

export const zuiWizardSidebarStepCompletedBase =
  "text-[color:var(--zui-wizard-sidebar-step-completed-fg,var(--zui-color-emerald,#059669))] dark:text-[color:var(--zui-wizard-sidebar-step-completed-fg-dark,var(--zui-color-emerald-dark,#34d399))]";

export const zuiWizardStepIndicatorBase =
  "grid size-8 shrink-0 place-items-center rounded-full border text-xs font-semibold";

export const zuiWizardStepIndicatorStates = {
  upcoming:
    "border-[color:var(--zui-wizard-step-indicator-upcoming-border,var(--zui-border,#00000026))] dark:border-[color:var(--zui-wizard-step-indicator-upcoming-border-dark,var(--zui-border-dark,#ffffff26))] bg-[var(--zui-wizard-step-indicator-upcoming-bg,transparent)] dark:bg-[var(--zui-wizard-step-indicator-upcoming-bg-dark,transparent)] text-[color:var(--zui-wizard-step-indicator-upcoming-fg,var(--zui-fg-muted,oklch(55.4%_0.046_257.417)))] dark:text-[color:var(--zui-wizard-step-indicator-upcoming-fg-dark,var(--zui-fg-muted-dark,oklch(70.4%_0.04_256.788)))]",
  current:
    "border-[color:var(--zui-wizard-step-indicator-current-border,var(--zui-color-blue,#2563eb))] dark:border-[color:var(--zui-wizard-step-indicator-current-border-dark,var(--zui-color-blue-dark,#3b82f6))] bg-[var(--zui-wizard-step-indicator-current-bg,var(--zui-color-blue,#2563eb))] dark:bg-[var(--zui-wizard-step-indicator-current-bg-dark,var(--zui-color-blue-dark,#3b82f6))] text-white",
  completed:
    "border-[color:var(--zui-wizard-step-indicator-completed-border,var(--zui-color-emerald,#059669))] dark:border-[color:var(--zui-wizard-step-indicator-completed-border-dark,var(--zui-color-emerald-dark,#34d399))] bg-[var(--zui-wizard-step-indicator-completed-bg,var(--zui-color-emerald,#059669))] dark:bg-[var(--zui-wizard-step-indicator-completed-bg-dark,var(--zui-color-emerald-dark,#34d399))] text-white",
} as const;

export type ZuiWizardStepIndicatorState =
  keyof typeof zuiWizardStepIndicatorStates;

export const zuiWizardFooterBase =
  "border-t border-[color:var(--zui-wizard-footer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-wizard-footer-border-dark,var(--zui-border-dark,#ffffff1a))] pt-6";
