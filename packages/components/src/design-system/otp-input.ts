export const zuiOtpRootBase =
  "grid w-fit gap-2 text-[color:var(--zui-otp-label-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-otp-label-fg-dark,oklch(98.4%_0.003_247.858))] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50";

export const zuiOtpLabelBase =
  "text-sm font-medium leading-6 text-[color:var(--zui-otp-label-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-otp-label-fg-dark,oklch(98.4%_0.003_247.858))]";

export const zuiOtpHintBase =
  "max-w-sm text-xs leading-5 text-[color:var(--zui-otp-hint-fg,oklch(55.4%_0.046_257.417))] dark:text-[color:var(--zui-otp-hint-fg-dark,oklch(70.4%_0.04_256.788))]";

export const zuiOtpCellsBase = "flex flex-wrap items-center gap-2";

export const zuiOtpCellBase =
  "grid place-items-center rounded-xl border bg-[var(--zui-otp-bg,#ffffff)] text-center font-semibold tabular-nums text-[color:var(--zui-otp-fg,oklch(20.8%_0.042_265.755))] shadow-sm shadow-black/5 outline-none transition-[background-color,border-color,box-shadow,color,transform] placeholder:text-transparent focus-visible:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--zui-otp-ring-offset-focus,#ffffff)] disabled:cursor-not-allowed dark:bg-[var(--zui-otp-bg-dark,oklch(12.9%_0.042_264.695))] dark:text-[color:var(--zui-otp-fg-dark,oklch(98.4%_0.003_247.858))] dark:shadow-black/20 dark:focus-visible:ring-offset-[var(--zui-otp-ring-offset-focus-dark,oklch(12.9%_0.042_264.695))]";

export const zuiOtpSeparatorBase =
  "h-px w-3 shrink-0 bg-[color:var(--zui-otp-separator,#94a3b8)] opacity-70 dark:bg-[color:var(--zui-otp-separator-dark,#64748b)]";

export const zuiOtpErrorBase =
  "text-sm leading-6 text-[color:var(--zui-otp-error-fg,oklch(58.6%_0.253_17.585))] dark:text-[color:var(--zui-otp-error-fg-dark,oklch(71.2%_0.194_13.428))]";

export const zuiOtpSizes = {
  sm: "size-9 rounded-lg text-sm",
  md: "size-11 text-base",
  lg: "size-13 rounded-2xl text-lg",
} as const;

export const zuiOtpAppearances = {
  default:
    "border-[color:var(--zui-otp-default-border,#cbd5e1)] focus-visible:border-[color:var(--zui-otp-default-border-focus,oklch(44.6%_0.043_257.281))] focus-visible:ring-[var(--zui-otp-default-ring-focus,oklch(44.6%_0.043_257.281_/_0.25))] dark:border-[color:var(--zui-otp-default-border-dark,#475569)] dark:focus-visible:border-[color:var(--zui-otp-default-border-focus-dark,oklch(86.9%_0.022_252.894))] dark:focus-visible:ring-[var(--zui-otp-default-ring-focus-dark,oklch(86.9%_0.022_252.894_/_0.25))]",
  outline:
    "border-[color:var(--zui-otp-outline-border,#64748b)] bg-transparent focus-visible:border-[color:var(--zui-otp-outline-border-focus,oklch(54.6%_0.245_262.881))] focus-visible:ring-[var(--zui-otp-outline-ring-focus,oklch(54.6%_0.245_262.881_/_0.28))] dark:border-[color:var(--zui-otp-outline-border-dark,#94a3b8)] dark:bg-transparent dark:focus-visible:border-[color:var(--zui-otp-outline-border-focus-dark,oklch(70.7%_0.165_254.624))] dark:focus-visible:ring-[var(--zui-otp-outline-ring-focus-dark,oklch(70.7%_0.165_254.624_/_0.28))]",
  glass:
    "border-[color:var(--zui-otp-glass-border,#ffffff66)] bg-[var(--zui-otp-glass-bg,#ffffffcc)] backdrop-blur-md focus-visible:border-[color:var(--zui-otp-glass-border-focus,oklch(70.7%_0.165_254.624))] focus-visible:ring-[var(--zui-otp-glass-ring-focus,oklch(70.7%_0.165_254.624_/_0.32))] dark:border-[color:var(--zui-otp-glass-border-dark,#ffffff26)] dark:bg-[var(--zui-otp-glass-bg-dark,#0f172acc)] dark:focus-visible:border-[color:var(--zui-otp-glass-border-focus-dark,oklch(78.9%_0.154_211.53))] dark:focus-visible:ring-[var(--zui-otp-glass-ring-focus-dark,oklch(78.9%_0.154_211.53_/_0.32))]",
  success:
    "border-[color:var(--zui-otp-success-border,oklch(69.6%_0.17_162.48_/_0.6))] focus-visible:border-[color:var(--zui-otp-success-border-focus,oklch(59.6%_0.145_163.225))] focus-visible:ring-[var(--zui-otp-success-ring-focus,oklch(59.6%_0.145_163.225_/_0.28))] dark:border-[color:var(--zui-otp-success-border-dark,oklch(69.6%_0.17_162.48_/_0.5))] dark:focus-visible:border-[color:var(--zui-otp-success-border-focus-dark,oklch(77.7%_0.152_181.912))] dark:focus-visible:ring-[var(--zui-otp-success-ring-focus-dark,oklch(77.7%_0.152_181.912_/_0.28))]",
  error:
    "border-[color:var(--zui-otp-error-border,oklch(58.6%_0.253_17.585_/_0.7))] focus-visible:border-[color:var(--zui-otp-error-border-focus,oklch(58.6%_0.253_17.585))] focus-visible:ring-[var(--zui-otp-error-ring-focus,oklch(58.6%_0.253_17.585_/_0.28))] dark:border-[color:var(--zui-otp-error-border-dark,oklch(71.2%_0.194_13.428_/_0.65))] dark:focus-visible:border-[color:var(--zui-otp-error-border-focus-dark,oklch(71.2%_0.194_13.428))] dark:focus-visible:ring-[var(--zui-otp-error-ring-focus-dark,oklch(71.2%_0.194_13.428_/_0.28))]",
  warning:
    "border-[color:var(--zui-otp-warning-border,oklch(79.5%_0.184_86.047_/_0.7))] focus-visible:border-[color:var(--zui-otp-warning-border-focus,oklch(68.1%_0.162_75.834))] focus-visible:ring-[var(--zui-otp-warning-ring-focus,oklch(68.1%_0.162_75.834_/_0.28))] dark:border-[color:var(--zui-otp-warning-border-dark,oklch(79.5%_0.184_86.047_/_0.5))] dark:focus-visible:border-[color:var(--zui-otp-warning-border-focus-dark,oklch(85.2%_0.199_91.936))] dark:focus-visible:ring-[var(--zui-otp-warning-ring-focus-dark,oklch(85.2%_0.199_91.936_/_0.28))]",
  info: "border-[color:var(--zui-otp-info-border,oklch(62.3%_0.214_259.815_/_0.7))] focus-visible:border-[color:var(--zui-otp-info-border-focus,oklch(54.6%_0.245_262.881))] focus-visible:ring-[var(--zui-otp-info-ring-focus,oklch(54.6%_0.245_262.881_/_0.28))] dark:border-[color:var(--zui-otp-info-border-dark,oklch(62.3%_0.214_259.815_/_0.5))] dark:focus-visible:border-[color:var(--zui-otp-info-border-focus-dark,oklch(70.7%_0.165_254.624))] dark:focus-visible:ring-[var(--zui-otp-info-ring-focus-dark,oklch(70.7%_0.165_254.624_/_0.28))]",
  violet:
    "border-[color:var(--zui-otp-violet-border,oklch(60.6%_0.25_292.717_/_0.7))] focus-visible:border-[color:var(--zui-otp-violet-border-focus,oklch(54.1%_0.281_293.009))] focus-visible:ring-[var(--zui-otp-violet-ring-focus,oklch(54.1%_0.281_293.009_/_0.28))] dark:border-[color:var(--zui-otp-violet-border-dark,oklch(60.6%_0.25_292.717_/_0.5))] dark:focus-visible:border-[color:var(--zui-otp-violet-border-focus-dark,oklch(70.2%_0.183_293.541))] dark:focus-visible:ring-[var(--zui-otp-violet-ring-focus-dark,oklch(70.2%_0.183_293.541_/_0.28))]",
  amber:
    "border-[color:var(--zui-otp-amber-border,oklch(76.9%_0.188_70.08_/_0.7))] focus-visible:border-[color:var(--zui-otp-amber-border-focus,oklch(66.6%_0.179_58.318))] focus-visible:ring-[var(--zui-otp-amber-ring-focus,oklch(66.6%_0.179_58.318_/_0.28))] dark:border-[color:var(--zui-otp-amber-border-dark,oklch(76.9%_0.188_70.08_/_0.5))] dark:focus-visible:border-[color:var(--zui-otp-amber-border-focus-dark,oklch(82.8%_0.189_84.429))] dark:focus-visible:ring-[var(--zui-otp-amber-ring-focus-dark,oklch(82.8%_0.189_84.429_/_0.28))]",
  pink: "border-[color:var(--zui-otp-pink-border,oklch(65.6%_0.241_354.308_/_0.7))] focus-visible:border-[color:var(--zui-otp-pink-border-focus,oklch(59.2%_0.249_0.584))] focus-visible:ring-[var(--zui-otp-pink-ring-focus,oklch(59.2%_0.249_0.584_/_0.28))] dark:border-[color:var(--zui-otp-pink-border-dark,oklch(65.6%_0.241_354.308_/_0.5))] dark:focus-visible:border-[color:var(--zui-otp-pink-border-focus-dark,oklch(71.8%_0.202_349.761))] dark:focus-visible:ring-[var(--zui-otp-pink-ring-focus-dark,oklch(71.8%_0.202_349.761_/_0.28))]",
  indigo:
    "border-[color:var(--zui-otp-indigo-border,oklch(58.5%_0.233_277.117_/_0.7))] focus-visible:border-[color:var(--zui-otp-indigo-border-focus,oklch(51.1%_0.262_276.966))] focus-visible:ring-[var(--zui-otp-indigo-ring-focus,oklch(51.1%_0.262_276.966_/_0.28))] dark:border-[color:var(--zui-otp-indigo-border-dark,oklch(58.5%_0.233_277.117_/_0.5))] dark:focus-visible:border-[color:var(--zui-otp-indigo-border-focus-dark,oklch(67.3%_0.182_276.935))] dark:focus-visible:ring-[var(--zui-otp-indigo-ring-focus-dark,oklch(67.3%_0.182_276.935_/_0.28))]",
  orange:
    "border-[color:var(--zui-otp-orange-border,oklch(70.5%_0.213_47.604_/_0.7))] focus-visible:border-[color:var(--zui-otp-orange-border-focus,oklch(64.6%_0.222_41.116))] focus-visible:ring-[var(--zui-otp-orange-ring-focus,oklch(64.6%_0.222_41.116_/_0.28))] dark:border-[color:var(--zui-otp-orange-border-dark,oklch(70.5%_0.213_47.604_/_0.5))] dark:focus-visible:border-[color:var(--zui-otp-orange-border-focus-dark,oklch(75%_0.183_55.934))] dark:focus-visible:ring-[var(--zui-otp-orange-ring-focus-dark,oklch(75%_0.183_55.934_/_0.28))]",
} as const;
