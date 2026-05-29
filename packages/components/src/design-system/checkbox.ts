export const zuiCheckboxRootBase =
  "group inline-flex w-fit items-start gap-2.5 text-sm font-medium text-[color:var(--zui-checkbox-label-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-checkbox-label-fg-dark,oklch(98.4%_0.003_247.858))] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50";

export const zuiCheckboxControlBase =
  "grid shrink-0 place-items-center rounded-md border-2 border-[color:var(--zui-checkbox-border,#0000004d)] bg-[var(--zui-checkbox-bg,transparent)] text-[color:var(--zui-checkbox-fg,oklch(44.6%_0.043_257.281))] transition-[background-color,border-color,color,box-shadow] peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--zui-checkbox-ring-focus,oklch(44.6%_0.043_257.281_/_0.7))] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--zui-checkbox-ring-offset-focus,oklch(98.4%_0.003_247.858))] dark:border-[color:var(--zui-checkbox-border-dark,#ffffff4d)] dark:text-[color:var(--zui-checkbox-fg-dark,oklch(92.9%_0.013_255.508))] dark:peer-focus-visible:ring-[var(--zui-checkbox-ring-focus-dark,oklch(86.9%_0.022_252.894_/_0.7))] dark:peer-focus-visible:ring-offset-[var(--zui-checkbox-ring-offset-focus-dark,oklch(12.9%_0.042_264.695))] group-data-[disabled=true]:cursor-not-allowed";

export const zuiCheckboxIndicatorBase =
  "pointer-events-none opacity-0 transition-opacity duration-150 stroke-white group-data-[state=checked]:opacity-100 group-data-[state=indeterminate]:opacity-100";

export const zuiCheckboxSizes = {
  sm: {
    root: "text-xs",
    control: "mt-0.5 size-4 rounded-[0.35rem]",
    indicator: "size-3",
  },
  md: {
    root: "text-sm",
    control: "mt-0.5 size-5",
    indicator: "size-3.5",
  },
  lg: {
    root: "text-base",
    control: "mt-0.5 size-6",
    indicator: "size-4",
  },
} as const;

export const zuiCheckboxAppearances = {
  default:
    "group-data-[state=checked]:border-[color:var(--zui-checkbox-default-border-checked,oklch(44.6%_0.043_257.281))] group-data-[state=checked]:bg-[var(--zui-checkbox-default-bg-checked,oklch(44.6%_0.043_257.281))] group-data-[state=checked]:text-[color:var(--zui-checkbox-default-fg-checked,#ffffff)] group-data-[state=indeterminate]:border-[color:var(--zui-checkbox-default-border-checked,oklch(44.6%_0.043_257.281))] group-data-[state=indeterminate]:bg-[var(--zui-checkbox-default-bg-checked,oklch(44.6%_0.043_257.281))] group-data-[state=indeterminate]:text-[color:var(--zui-checkbox-default-fg-checked,#ffffff)]",
  success:
    "group-data-[state=checked]:border-[color:var(--zui-checkbox-success-border-checked,oklch(59.6%_0.145_163.225))] group-data-[state=checked]:bg-[var(--zui-checkbox-success-bg-checked,oklch(59.6%_0.145_163.225))] group-data-[state=checked]:text-[color:var(--zui-checkbox-success-fg-checked,#ffffff)] group-data-[state=indeterminate]:border-[color:var(--zui-checkbox-success-border-checked,oklch(59.6%_0.145_163.225))] group-data-[state=indeterminate]:bg-[var(--zui-checkbox-success-bg-checked,oklch(59.6%_0.145_163.225))]",
  warning:
    "group-data-[state=checked]:border-[color:var(--zui-checkbox-warning-border-checked,oklch(68.1%_0.162_75.834))] group-data-[state=checked]:bg-[var(--zui-checkbox-warning-bg-checked,oklch(68.1%_0.162_75.834))] group-data-[state=checked]:text-[color:var(--zui-checkbox-warning-fg-checked,#ffffff)] group-data-[state=indeterminate]:border-[color:var(--zui-checkbox-warning-border-checked,oklch(68.1%_0.162_75.834))] group-data-[state=indeterminate]:bg-[var(--zui-checkbox-warning-bg-checked,oklch(68.1%_0.162_75.834))]",
  error:
    "group-data-[state=checked]:border-[color:var(--zui-checkbox-error-border-checked,oklch(58.6%_0.253_17.585))] group-data-[state=checked]:bg-[var(--zui-checkbox-error-bg-checked,oklch(58.6%_0.253_17.585))] group-data-[state=checked]:text-[color:var(--zui-checkbox-error-fg-checked,#ffffff)] group-data-[state=indeterminate]:border-[color:var(--zui-checkbox-error-border-checked,oklch(58.6%_0.253_17.585))] group-data-[state=indeterminate]:bg-[var(--zui-checkbox-error-bg-checked,oklch(58.6%_0.253_17.585))]",
  info:
    "group-data-[state=checked]:border-[color:var(--zui-checkbox-info-border-checked,oklch(54.6%_0.245_262.881))] group-data-[state=checked]:bg-[var(--zui-checkbox-info-bg-checked,oklch(54.6%_0.245_262.881))] group-data-[state=checked]:text-[color:var(--zui-checkbox-info-fg-checked,#ffffff)] group-data-[state=indeterminate]:border-[color:var(--zui-checkbox-info-border-checked,oklch(54.6%_0.245_262.881))] group-data-[state=indeterminate]:bg-[var(--zui-checkbox-info-bg-checked,oklch(54.6%_0.245_262.881))]",
  violet:
    "group-data-[state=checked]:border-[color:var(--zui-checkbox-violet-border-checked,oklch(54.1%_0.281_293.009))] group-data-[state=checked]:bg-[var(--zui-checkbox-violet-bg-checked,oklch(54.1%_0.281_293.009))] group-data-[state=checked]:text-[color:var(--zui-checkbox-violet-fg-checked,#ffffff)] group-data-[state=indeterminate]:border-[color:var(--zui-checkbox-violet-border-checked,oklch(54.1%_0.281_293.009))] group-data-[state=indeterminate]:bg-[var(--zui-checkbox-violet-bg-checked,oklch(54.1%_0.281_293.009))]",
  amber:
    "group-data-[state=checked]:border-[color:var(--zui-checkbox-amber-border-checked,oklch(66.6%_0.179_58.318))] group-data-[state=checked]:bg-[var(--zui-checkbox-amber-bg-checked,oklch(66.6%_0.179_58.318))] group-data-[state=checked]:text-[color:var(--zui-checkbox-amber-fg-checked,#ffffff)] group-data-[state=indeterminate]:border-[color:var(--zui-checkbox-amber-border-checked,oklch(66.6%_0.179_58.318))] group-data-[state=indeterminate]:bg-[var(--zui-checkbox-amber-bg-checked,oklch(66.6%_0.179_58.318))]",
  pink:
    "group-data-[state=checked]:border-[color:var(--zui-checkbox-pink-border-checked,oklch(59.2%_0.249_0.584))] group-data-[state=checked]:bg-[var(--zui-checkbox-pink-bg-checked,oklch(59.2%_0.249_0.584))] group-data-[state=checked]:text-[color:var(--zui-checkbox-pink-fg-checked,#ffffff)] group-data-[state=indeterminate]:border-[color:var(--zui-checkbox-pink-border-checked,oklch(59.2%_0.249_0.584))] group-data-[state=indeterminate]:bg-[var(--zui-checkbox-pink-bg-checked,oklch(59.2%_0.249_0.584))]",
  indigo:
    "group-data-[state=checked]:border-[color:var(--zui-checkbox-indigo-border-checked,oklch(51.1%_0.262_276.966))] group-data-[state=checked]:bg-[var(--zui-checkbox-indigo-bg-checked,oklch(51.1%_0.262_276.966))] group-data-[state=checked]:text-[color:var(--zui-checkbox-indigo-fg-checked,#ffffff)] group-data-[state=indeterminate]:border-[color:var(--zui-checkbox-indigo-border-checked,oklch(51.1%_0.262_276.966))] group-data-[state=indeterminate]:bg-[var(--zui-checkbox-indigo-bg-checked,oklch(51.1%_0.262_276.966))]",
} as const;
