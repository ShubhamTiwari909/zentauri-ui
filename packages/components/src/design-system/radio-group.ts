export const zuiRadioGroupRootBase = "grid gap-2";

export const zuiRadioGroupItemBase =
  "group inline-flex w-fit items-start gap-2.5 text-sm font-medium text-[color:var(--zui-radio-label-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-radio-label-fg-dark,oklch(98.4%_0.003_247.858))] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50";

export const zuiRadioGroupControlBase =
  "grid shrink-0 place-items-center rounded-full border-2 border-[color:var(--zui-radio-border,#0000004d)] bg-[var(--zui-radio-bg,transparent)] dark:bg-[var(--zui-radio-bg-dark,transparent)] transition-[background-color,border-color,box-shadow] peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--zui-radio-ring-focus,oklch(44.6%_0.043_257.281_/_0.7))] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--zui-radio-ring-offset-focus,oklch(98.4%_0.003_247.858))] dark:border-[color:var(--zui-radio-border-dark,#ffffff4d)] dark:peer-focus-visible:ring-[var(--zui-radio-ring-focus-dark,oklch(86.9%_0.022_252.894_/_0.7))] dark:peer-focus-visible:ring-offset-[var(--zui-radio-ring-offset-focus-dark,oklch(12.9%_0.042_264.695))] group-data-[disabled=true]:cursor-not-allowed";

export const zuiRadioGroupIndicatorBase =
  "pointer-events-none block rounded-full opacity-0 transition-opacity duration-150 group-data-[state=checked]:opacity-100";

export const zuiRadioGroupSizes = {
  sm: {
    item: "text-xs",
    control: "mt-0.5 size-4",
    indicator: "size-1.5",
  },
  md: {
    item: "text-sm",
    control: "mt-0.5 size-5",
    indicator: "size-2",
  },
  lg: {
    item: "text-base",
    control: "mt-0.5 size-6",
    indicator: "size-2.5",
  },
} as const;

export const zuiRadioGroupAppearances = {
  default:
    "group-data-[state=checked]:border-[color:var(--zui-radio-default-border-checked,oklch(44.6%_0.043_257.281))] dark:group-data-[state=checked]:border-[color:var(--zui-radio-default-border-checked-dark,oklch(44.6%_0.043_257.281))] [&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-default-indicator-bg,oklch(44.6%_0.043_257.281))] dark:[&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-default-indicator-bg-dark,oklch(44.6%_0.043_257.281))]",
  success:
    "group-data-[state=checked]:border-[color:var(--zui-radio-success-border-checked,oklch(59.6%_0.145_163.225))] dark:group-data-[state=checked]:border-[color:var(--zui-radio-success-border-checked-dark,oklch(59.6%_0.145_163.225))] [&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-success-indicator-bg,oklch(59.6%_0.145_163.225))] dark:[&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-success-indicator-bg-dark,oklch(59.6%_0.145_163.225))]",
  warning:
    "group-data-[state=checked]:border-[color:var(--zui-radio-warning-border-checked,oklch(68.1%_0.162_75.834))] dark:group-data-[state=checked]:border-[color:var(--zui-radio-warning-border-checked-dark,oklch(68.1%_0.162_75.834))] [&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-warning-indicator-bg,oklch(68.1%_0.162_75.834))] dark:[&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-warning-indicator-bg-dark,oklch(68.1%_0.162_75.834))]",
  error:
    "group-data-[state=checked]:border-[color:var(--zui-radio-error-border-checked,oklch(58.6%_0.253_17.585))] dark:group-data-[state=checked]:border-[color:var(--zui-radio-error-border-checked-dark,oklch(58.6%_0.253_17.585))] [&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-error-indicator-bg,oklch(58.6%_0.253_17.585))] dark:[&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-error-indicator-bg-dark,oklch(58.6%_0.253_17.585))]",
  info: "group-data-[state=checked]:border-[color:var(--zui-radio-info-border-checked,oklch(54.6%_0.245_262.881))] dark:group-data-[state=checked]:border-[color:var(--zui-radio-info-border-checked-dark,oklch(54.6%_0.245_262.881))] [&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-info-indicator-bg,oklch(54.6%_0.245_262.881))] dark:[&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-info-indicator-bg-dark,oklch(54.6%_0.245_262.881))]",
  violet:
    "group-data-[state=checked]:border-[color:var(--zui-radio-violet-border-checked,oklch(54.1%_0.281_293.009))] dark:group-data-[state=checked]:border-[color:var(--zui-radio-violet-border-checked-dark,oklch(54.1%_0.281_293.009))] [&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-violet-indicator-bg,oklch(54.1%_0.281_293.009))] dark:[&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-violet-indicator-bg-dark,oklch(54.1%_0.281_293.009))]",
  amber:
    "group-data-[state=checked]:border-[color:var(--zui-radio-amber-border-checked,oklch(66.6%_0.179_58.318))] dark:group-data-[state=checked]:border-[color:var(--zui-radio-amber-border-checked-dark,oklch(66.6%_0.179_58.318))] [&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-amber-indicator-bg,oklch(66.6%_0.179_58.318))] dark:[&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-amber-indicator-bg-dark,oklch(66.6%_0.179_58.318))]",
  pink: "group-data-[state=checked]:border-[color:var(--zui-radio-pink-border-checked,oklch(59.2%_0.249_0.584))] dark:group-data-[state=checked]:border-[color:var(--zui-radio-pink-border-checked-dark,oklch(59.2%_0.249_0.584))] [&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-pink-indicator-bg,oklch(59.2%_0.249_0.584))] dark:[&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-pink-indicator-bg-dark,oklch(59.2%_0.249_0.584))]",
  indigo:
    "group-data-[state=checked]:border-[color:var(--zui-radio-indigo-border-checked,oklch(51.1%_0.262_276.966))] dark:group-data-[state=checked]:border-[color:var(--zui-radio-indigo-border-checked-dark,oklch(51.1%_0.262_276.966))] [&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-indigo-indicator-bg,oklch(51.1%_0.262_276.966))] dark:[&_[data-slot=radio-group-indicator]]:bg-[var(--zui-radio-indigo-indicator-bg-dark,oklch(51.1%_0.262_276.966))]",
} as const;

export const zuiRadioGroupOrientations = {
  vertical: "grid gap-2",
  horizontal: "flex flex-wrap gap-x-5 gap-y-2",
} as const;
