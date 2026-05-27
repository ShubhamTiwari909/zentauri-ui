export const zuiInputBase = [
  "w-full min-w-0 rounded-xl border bg-[var(--zui-input-bg,#0000000d)] dark:bg-[var(--zui-input-bg-dark,#ffffff0d)] text-[color:var(--zui-input-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-input-fg-dark,oklch(98.4%_0.003_247.858))] shadow-[var(--zui-input-shadow,0_1px_2px_rgba(15,23,42,0.08))] dark:shadow-[var(--zui-input-shadow-dark,0_1px_2px_rgba(15,23,42,0.12))]",
  "ring-offset-[var(--zui-input-ring-offset,oklch(98.4%_0.003_247.858))] dark:ring-offset-[var(--zui-input-ring-offset-dark,oklch(12.9%_0.042_264.695))] transition-colors",
  "placeholder:text-[color:var(--zui-input-placeholder-fg,oklch(55.4%_0.046_257.417))] dark:placeholder:text-[color:var(--zui-input-placeholder-fg-dark,oklch(55.4%_0.046_257.417))]",
  "focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "read-only:cursor-default read-only:bg-[var(--zui-input-bg-read-only,#00000008)] dark:bg-[var(--zui-input-bg-dark,#ffffff08)]",
  "file:h-8",
] as const;

export const zuiInputAs = {
  input: "",
  textarea: "h-auto! resize-y py-2 align-top",
  file: [
    "p-0! cursor-pointer",
    "file:cursor-pointer file:border-0 file:border-r file:border-[color:var(--zui-input-file-border,#0000001a)] dark:file:border-[color:var(--zui-input-file-border-dark,#ffffff1a)]",
    "file:bg-[var(--zui-input-file-bg,#0000001a)] dark:file:bg-[var(--zui-input-file-bg-dark,#ffffff1a)] file:text-[color:var(--zui-input-file-fg,oklch(37.2%_0.044_257.287))] dark:file:text-[color:var(--zui-input-file-fg-dark,oklch(92.9%_0.013_255.508))] file:font-medium",
    "file:transition-colors file:duration-200",
    "hover:file:bg-[var(--zui-input-file-bg-hover,#00000026)] dark:hover:file:bg-[var(--zui-input-file-bg-hover-dark,#ffffff26)]",
    "[&:not(:disabled)]:file:hover:text-[color:var(--zui-input-file-fg-hover,#ffffff)]",
    "disabled:file:cursor-not-allowed",
  ],
  checkbox: [
    "shrink-0 cursor-pointer appearance-none relative",
    "min-h-0! shadow-none outline-none",
    "border-2 border-[color:var(--zui-input-checkbox-border,#0000004d)] dark:border-[color:var(--zui-input-checkbox-border-dark,#ffffff4d)] [&:not(:checked)]:bg-[var(--zui-input-checkbox-bg,transparent)]",
    "transition-[color,box-shadow,border-color,background-color]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "read-only:cursor-default",
    "checked:after:absolute checked:after:content-[''] checked:after:size-3 checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:rounded-full checked:after:bg-current",
  ],
  radio: [
    "shrink-0 cursor-pointer appearance-none rounded-full",
    "min-h-0! shadow-none outline-none",
    "border-2 border-[color:var(--zui-input-radio-border,#0000004d)] dark:border-[color:var(--zui-input-radio-border-dark,#ffffff4d)] bg-[var(--zui-input-radio-bg,transparent)]! read-only:bg-[var(--zui-input-radio-bg-read-only,transparent)]!",
    "ring-2 ring-[var(--zui-input-radio-ring,#00000033)] dark:ring-[var(--zui-input-radio-ring-dark,#ffffff33)] ring-offset-2 ring-offset-[var(--zui-input-radio-ring-offset,oklch(98.4%_0.003_247.858))] dark:ring-offset-[var(--zui-input-radio-ring-offset-dark,oklch(12.9%_0.042_264.695))]",
    "transition-[color,box-shadow,background-color,border-color,box-shadow]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "read-only:cursor-default",
  ],
  date: "w-auto shrink-0",
} as const;

export const zuiInputAppearances = {
  default:
    "border-[color:var(--zui-input-default-border,#0000001a)] dark:border-[color:var(--zui-input-default-border-dark,#ffffff1a)] focus-visible:border-[color:var(--zui-input-default-border-focus,#00000033)] dark:focus-visible:border-[color:var(--zui-input-default-border-focus-dark,#ffffff33)]",
  warning:
    "border-[color:var(--zui-input-warning-border,oklch(79.5%_0.184_86.047_/_0.8))] text-[color:var(--zui-input-warning-fg,oklch(28.6%_0.066_53.813))] dark:text-[color:var(--zui-input-warning-fg-dark,oklch(98.7%_0.026_102.212))] placeholder:text-[color:var(--zui-input-warning-placeholder-fg,oklch(47.6%_0.114_61.907))] dark:placeholder:text-[color:var(--zui-input-warning-placeholder-fg-dark,oklch(90.5%_0.182_98.111_/_0.7))] focus-visible:border-[color:var(--zui-input-warning-border-focus,oklch(68.1%_0.162_75.834))] dark:focus-visible:border-[color:var(--zui-input-warning-border-focus-dark,oklch(85.2%_0.199_91.936))] focus-visible:ring-[var(--zui-input-warning-ring-focus,oklch(85.2%_0.199_91.936_/_0.8))]",
  error:
    "border-[color:var(--zui-input-error-border,oklch(64.5%_0.246_16.439_/_0.8))] text-[color:var(--zui-input-error-fg,oklch(27.1%_0.105_12.094))] dark:text-[color:var(--zui-input-error-fg-dark,oklch(96.9%_0.015_12.422))] placeholder:text-[color:var(--zui-input-error-placeholder-fg,oklch(45.5%_0.188_13.697))] dark:placeholder:text-[color:var(--zui-input-error-placeholder-fg-dark,oklch(81%_0.117_11.638_/_0.7))] focus-visible:border-[color:var(--zui-input-error-border-focus,oklch(58.6%_0.253_17.585))] dark:focus-visible:border-[color:var(--zui-input-error-border-focus-dark,oklch(71.2%_0.194_13.428))] focus-visible:ring-[var(--zui-input-error-ring-focus,oklch(71.2%_0.194_13.428_/_0.8))]",
  success:
    "border-[color:var(--zui-input-success-border,oklch(69.6%_0.17_162.48_/_0.7))] text-[color:var(--zui-input-success-fg,oklch(26.2%_0.051_172.552))] dark:text-[color:var(--zui-input-success-fg-dark,oklch(97.9%_0.021_166.113))] placeholder:text-[color:var(--zui-input-success-placeholder-fg,oklch(43.2%_0.095_166.913))] dark:placeholder:text-[color:var(--zui-input-success-placeholder-fg-dark,oklch(84.5%_0.143_164.978_/_0.7))] focus-visible:border-[color:var(--zui-input-success-border-focus,oklch(59.6%_0.145_163.225))] dark:focus-visible:border-[color:var(--zui-input-success-border-focus-dark,oklch(76.5%_0.177_163.223))] focus-visible:ring-[var(--zui-input-success-ring-focus,oklch(76.5%_0.177_163.223_/_0.8))]",
  info: "border-[color:var(--zui-input-info-border,oklch(62.3%_0.214_259.815_/_0.8))] text-[color:var(--zui-input-info-fg,oklch(28.2%_0.091_267.935))] dark:text-[color:var(--zui-input-info-fg-dark,oklch(97%_0.014_254.604))] placeholder:text-[color:var(--zui-input-info-placeholder-fg,oklch(42.4%_0.199_265.638))] dark:placeholder:text-[color:var(--zui-input-info-placeholder-fg-dark,oklch(80.9%_0.105_251.813_/_0.7))] focus-visible:border-[color:var(--zui-input-info-border-focus,oklch(54.6%_0.245_262.881))] dark:focus-visible:border-[color:var(--zui-input-info-border-focus-dark,oklch(70.7%_0.165_254.624))] focus-visible:ring-[var(--zui-input-info-ring-focus,oklch(70.7%_0.165_254.624_/_0.8))]",
  violet:
    "border-[color:var(--zui-input-violet-border,oklch(60.6%_0.25_292.717_/_0.8))] text-[color:var(--zui-input-violet-fg,oklch(28.3%_0.141_291.089))] dark:text-[color:var(--zui-input-violet-fg-dark,oklch(96.9%_0.016_293.756))] placeholder:text-[color:var(--zui-input-violet-placeholder-fg,oklch(43.2%_0.232_292.759))] dark:placeholder:text-[color:var(--zui-input-violet-placeholder-fg-dark,oklch(81.1%_0.111_293.571_/_0.7))] focus-visible:border-[color:var(--zui-input-violet-border-focus,oklch(54.1%_0.281_293.009))] dark:focus-visible:border-[color:var(--zui-input-violet-border-focus-dark,oklch(70.2%_0.183_293.541))] focus-visible:ring-[var(--zui-input-violet-ring-focus,oklch(70.2%_0.183_293.541_/_0.8))]",
  amber:
    "border-[color:var(--zui-input-amber-border,oklch(76.9%_0.188_70.08_/_0.8))] text-[color:var(--zui-input-amber-fg,oklch(27.9%_0.077_45.635))] dark:text-[color:var(--zui-input-amber-fg-dark,oklch(98.7%_0.022_95.277))] placeholder:text-[color:var(--zui-input-amber-placeholder-fg,oklch(47.3%_0.137_46.201))] dark:placeholder:text-[color:var(--zui-input-amber-placeholder-fg-dark,oklch(87.9%_0.169_91.605_/_0.7))] focus-visible:border-[color:var(--zui-input-amber-border-focus,oklch(66.6%_0.179_58.318))] dark:focus-visible:border-[color:var(--zui-input-amber-border-focus-dark,oklch(82.8%_0.189_84.429))] focus-visible:ring-[var(--zui-input-amber-ring-focus,oklch(82.8%_0.189_84.429_/_0.8))]",
  pink: "border-[color:var(--zui-input-pink-border,oklch(65.6%_0.241_354.308_/_0.8))] text-[color:var(--zui-input-pink-fg,oklch(28.4%_0.109_3.907))] dark:text-[color:var(--zui-input-pink-fg-dark,oklch(97.1%_0.014_343.198))] placeholder:text-[color:var(--zui-input-pink-placeholder-fg,oklch(45.9%_0.187_3.815))] dark:placeholder:text-[color:var(--zui-input-pink-placeholder-fg-dark,oklch(82.3%_0.12_346.018_/_0.7))] focus-visible:border-[color:var(--zui-input-pink-border-focus,oklch(59.2%_0.249_0.584))] dark:focus-visible:border-[color:var(--zui-input-pink-border-focus-dark,oklch(71.8%_0.202_349.761))] focus-visible:ring-[var(--zui-input-pink-ring-focus,oklch(71.8%_0.202_349.761_/_0.8))]",
  indigo:
    "border-[color:var(--zui-input-indigo-border,oklch(58.5%_0.233_277.117_/_0.8))] text-[color:var(--zui-input-indigo-fg,oklch(25.7%_0.09_281.288))] dark:text-[color:var(--zui-input-indigo-fg-dark,oklch(96.2%_0.018_272.314))] placeholder:text-[color:var(--zui-input-indigo-placeholder-fg,oklch(39.8%_0.195_277.366))] dark:placeholder:text-[color:var(--zui-input-indigo-placeholder-fg-dark,oklch(78.5%_0.115_274.713_/_0.7))] focus-visible:border-[color:var(--zui-input-indigo-border-focus,oklch(51.1%_0.262_276.966))] dark:focus-visible:border-[color:var(--zui-input-indigo-border-focus-dark,oklch(67.3%_0.182_276.935))] focus-visible:ring-[var(--zui-input-indigo-ring-focus,oklch(67.3%_0.182_276.935_/_0.8))]",
  orange:
    "border-[color:var(--zui-input-orange-border,oklch(70.5%_0.213_47.604_/_0.8))] text-[color:var(--zui-input-orange-fg,oklch(26.6%_0.079_36.259))] dark:text-[color:var(--zui-input-orange-fg-dark,oklch(98%_0.016_73.684))] placeholder:text-[color:var(--zui-input-orange-placeholder-fg,oklch(47%_0.157_37.304))] dark:placeholder:text-[color:var(--zui-input-orange-placeholder-fg-dark,oklch(83.7%_0.128_66.29_/_0.7))] focus-visible:border-[color:var(--zui-input-orange-border-focus,oklch(64.6%_0.222_41.116))] dark:focus-visible:border-[color:var(--zui-input-orange-border-focus-dark,oklch(75%_0.183_55.934))] focus-visible:ring-[var(--zui-input-orange-ring-focus,oklch(75%_0.183_55.934_/_0.8))]",
} as const;

export const zuiInputSizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 md:h-11 px-4 text-sm",
  lg: "h-10 md:h-12 px-5 text-base",
} as const;

export const zuiInputRing = {
  true: "focus-visible:ring-2 focus-visible:ring-offset-2",
  false: "",
} as const;
