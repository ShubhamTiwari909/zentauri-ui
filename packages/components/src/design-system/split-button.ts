export const zuiSplitButtonRoot =
  "inline-flex align-middle data-[full-width=true]:w-full";

export const zuiSplitButtonFullWidth = "w-full";

export const zuiSplitButtonDropdown =
  "data-[full-width=true]:block data-[full-width=true]:w-full";

export const zuiSplitButtonGroup =
  "inline-flex items-stretch data-[full-width=true]:w-full";

export const zuiSplitButtonPrimary =
  "rounded-r-none data-[full-width=true]:min-w-0 data-[full-width=true]:flex-1";

export const zuiSplitButtonTrigger =
  "rounded-l-none border-l border-[color:var(--zui-split-button-separator,var(--zui-border,#ffffff33))] dark:border-[color:var(--zui-split-button-separator-dark,var(--zui-border-dark,#00000033))] px-2.5";

export const zuiSplitButtonTriggerSizes = {
  sm: "min-w-8 px-2",
  md: "min-w-10 px-2.5",
  lg: "min-w-11 px-3",
  xl: "min-w-12 px-3.5",
  "2xl": "min-w-14 px-4",
  "3xl": "min-w-16 px-4",
  "4xl": "min-w-18 px-5",
  "5xl": "min-w-20 px-5",
  "6xl": "min-w-22 px-6",
  "7xl": "min-w-24 px-6",
  "8xl": "min-w-26 px-7",
  "9xl": "min-w-28 px-7",
  "10xl": "min-w-30 px-8",
  icon: "min-w-10 px-0",
} as const;

export const zuiSplitButtonContent =
  "min-w-[var(--zui-split-button-menu-min-width,12rem)]";

export const zuiSplitButtonItemDisabled = "pointer-events-none opacity-50";
