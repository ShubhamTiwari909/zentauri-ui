export const zuiTimezoneSelectAppearances = {
  default:
    "border border-[color:var(--zui-timezone-select-default-border,var(--zui-border,#00000026))] dark:border-[color:var(--zui-timezone-select-default-border-dark,var(--zui-border-dark,#ffffff26))] bg-[var(--zui-timezone-select-default-bg,var(--zui-surface,#ffffff))] dark:bg-[var(--zui-timezone-select-default-bg-dark,var(--zui-surface-dark,oklch(20.8%_0.042_265.755)))] text-[color:var(--zui-timezone-select-default-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-timezone-select-default-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
  outline:
    "border border-[color:var(--zui-timezone-select-outline-border,var(--zui-border,#00000026))] dark:border-[color:var(--zui-timezone-select-outline-border-dark,var(--zui-border-dark,#ffffff26))] bg-transparent dark:bg-transparent text-[color:var(--zui-timezone-select-outline-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-timezone-select-outline-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
  ghost:
    "bg-transparent dark:bg-transparent text-[color:var(--zui-timezone-select-ghost-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-timezone-select-ghost-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
} as const;

export const zuiTimezoneSelectBase = [
  "relative inline-flex w-full items-center justify-between gap-2 rounded-lg",
  "px-3 py-2 text-sm",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zui-timezone-select-ring-focus,var(--zui-focus-ring,oklch(44.6%_0.043_257.281)))] dark:focus-visible:ring-[var(--zui-timezone-select-ring-focus-dark,var(--zui-focus-ring-dark,oklch(86.9%_0.022_252.894)))]",
  "transition-colors cursor-pointer",
] as const;

export const zuiTimezoneSelectSizes = {
  sm: "h-8 text-xs",
  md: "h-10 text-sm",
  lg: "h-12 text-base",
} as const;

export const zuiTimezoneSelectDropdownBase = [
  "absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-lg border",
  "border-[color:var(--zui-timezone-select-dropdown-border,var(--zui-border,#00000026))] dark:border-[color:var(--zui-timezone-select-dropdown-border-dark,var(--zui-border-dark,#ffffff26))]",
  "bg-[var(--zui-timezone-select-dropdown-bg,var(--zui-surface,#ffffff))] dark:bg-[var(--zui-timezone-select-dropdown-bg-dark,var(--zui-surface-dark,oklch(20.8%_0.042_265.755)))]",
  "shadow-[var(--zui-timezone-select-dropdown-shadow,var(--zui-shadow-lg,0_10px_15px_-3px_rgba(0,0,0,0.1)))] dark:shadow-[var(--zui-timezone-select-dropdown-shadow-dark,var(--zui-shadow-lg-dark,0_10px_15px_-3px_rgba(0,0,0,0.3)))]",
] as const;

export const zuiTimezoneSelectSearchBase = [
  "w-full border-0 bg-transparent px-3 py-2 text-sm outline-none",
  "text-[color:var(--zui-timezone-select-search-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-timezone-select-search-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
  "placeholder:text-[color:var(--zui-timezone-select-placeholder-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:placeholder:text-[color:var(--zui-timezone-select-placeholder-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]",
] as const;

export const zuiTimezoneSelectOptionBase = [
  "flex items-center justify-between gap-2 px-3 py-2 text-sm cursor-pointer",
  "transition-colors",
] as const;

export const zuiTimezoneSelectOptionAppearances = {
  default:
    "text-[color:var(--zui-timezone-select-option-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-timezone-select-option-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))] hover:bg-[var(--zui-timezone-select-option-hover-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:hover:bg-[var(--zui-timezone-select-option-hover-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))]",
  selected:
    "bg-[var(--zui-timezone-select-option-selected-bg,var(--zui-brand,oklch(20.8%_0.042_265.755)))] dark:bg-[var(--zui-timezone-select-option-selected-bg-dark,var(--zui-brand-dark,oklch(98.4%_0.003_247.858)))] text-[color:var(--zui-timezone-select-option-selected-fg,var(--zui-brand-fg,oklch(98.4%_0.003_247.858)))] dark:text-[color:var(--zui-timezone-select-option-selected-fg-dark,var(--zui-brand-fg-dark,oklch(12.9%_0.042_264.695)))]",
} as const;

export const zuiTimezoneSelectGroupLabelBase = [
  "px-3 py-1.5 text-xs font-semibold uppercase tracking-wider",
  "text-[color:var(--zui-timezone-select-group-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-timezone-select-group-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]",
] as const;

export const zuiTimezoneSelectOffsetChipBase = [
  "inline-flex items-center rounded-md px-1.5 py-0.5 text-[0.65rem] font-medium tabular-nums",
  "bg-[var(--zui-timezone-select-chip-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-timezone-select-chip-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))]",
  "text-[color:var(--zui-timezone-select-chip-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-timezone-select-chip-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]",
] as const;

export const zuiTimezoneSelectTimeBase = [
  "tabular-nums text-[0.65rem]",
  "text-[color:var(--zui-timezone-select-time-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-timezone-select-time-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]",
] as const;
