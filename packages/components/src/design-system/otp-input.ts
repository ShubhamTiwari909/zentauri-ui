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
  sm: "size-7 md:size-9 rounded-lg text-sm",
  md: "size-9 md:size-11 text-base",
  lg: "size-11 md:size-13 rounded-2xl text-lg",
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
  blue: "border border-[color:var(--zui-otp-blue-border,#2563eb)] dark:border-[color:var(--zui-otp-blue-border-dark,#3b82f6)] bg-[var(--zui-otp-blue-bg,#2563eb14)] dark:bg-[var(--zui-otp-blue-bg-dark,#3b82f624)] text-[color:var(--zui-otp-blue-fg,#0f172a)] dark:text-[color:var(--zui-otp-blue-fg-dark,#f8fafc)]",
  cyan: "border border-[color:var(--zui-otp-cyan-border,#0891b2)] dark:border-[color:var(--zui-otp-cyan-border-dark,#22d3ee)] bg-[var(--zui-otp-cyan-bg,#0891b214)] dark:bg-[var(--zui-otp-cyan-bg-dark,#22d3ee24)] text-[color:var(--zui-otp-cyan-fg,#0f172a)] dark:text-[color:var(--zui-otp-cyan-fg-dark,#f8fafc)]",
  green:
    "border border-[color:var(--zui-otp-green-border,#16a34a)] dark:border-[color:var(--zui-otp-green-border-dark,#22c55e)] bg-[var(--zui-otp-green-bg,#16a34a14)] dark:bg-[var(--zui-otp-green-bg-dark,#22c55e24)] text-[color:var(--zui-otp-green-fg,#0f172a)] dark:text-[color:var(--zui-otp-green-fg-dark,#f8fafc)]",
  lime: "border border-[color:var(--zui-otp-lime-border,#65a30d)] dark:border-[color:var(--zui-otp-lime-border-dark,#a3e635)] bg-[var(--zui-otp-lime-bg,#65a30d14)] dark:bg-[var(--zui-otp-lime-bg-dark,#a3e63524)] text-[color:var(--zui-otp-lime-fg,#0f172a)] dark:text-[color:var(--zui-otp-lime-fg-dark,#f8fafc)]",
  mint: "border border-[color:var(--zui-otp-mint-border,#10b981)] dark:border-[color:var(--zui-otp-mint-border-dark,#6ee7b7)] bg-[var(--zui-otp-mint-bg,#10b98114)] dark:bg-[var(--zui-otp-mint-bg-dark,#6ee7b724)] text-[color:var(--zui-otp-mint-fg,#0f172a)] dark:text-[color:var(--zui-otp-mint-fg-dark,#f8fafc)]",
  ocean:
    "border border-[color:var(--zui-otp-ocean-border,#0284c7)] dark:border-[color:var(--zui-otp-ocean-border-dark,#38bdf8)] bg-[var(--zui-otp-ocean-bg,#0284c714)] dark:bg-[var(--zui-otp-ocean-bg-dark,#38bdf824)] text-[color:var(--zui-otp-ocean-fg,#0f172a)] dark:text-[color:var(--zui-otp-ocean-fg-dark,#f8fafc)]",
  sapphire:
    "border border-[color:var(--zui-otp-sapphire-border,#1d4ed8)] dark:border-[color:var(--zui-otp-sapphire-border-dark,#60a5fa)] bg-[var(--zui-otp-sapphire-bg,#1d4ed814)] dark:bg-[var(--zui-otp-sapphire-bg-dark,#60a5fa24)] text-[color:var(--zui-otp-sapphire-fg,#0f172a)] dark:text-[color:var(--zui-otp-sapphire-fg-dark,#f8fafc)]",
  lavender:
    "border border-[color:var(--zui-otp-lavender-border,#8b5cf6)] dark:border-[color:var(--zui-otp-lavender-border-dark,#a78bfa)] bg-[var(--zui-otp-lavender-bg,#8b5cf614)] dark:bg-[var(--zui-otp-lavender-bg-dark,#a78bfa24)] text-[color:var(--zui-otp-lavender-fg,#0f172a)] dark:text-[color:var(--zui-otp-lavender-fg-dark,#f8fafc)]",
  ruby: "border border-[color:var(--zui-otp-ruby-border,#be123c)] dark:border-[color:var(--zui-otp-ruby-border-dark,#fb7185)] bg-[var(--zui-otp-ruby-bg,#be123c14)] dark:bg-[var(--zui-otp-ruby-bg-dark,#fb718524)] text-[color:var(--zui-otp-ruby-fg,#0f172a)] dark:text-[color:var(--zui-otp-ruby-fg-dark,#f8fafc)]",
  red: "border border-[color:var(--zui-otp-red-border,#dc2626)] dark:border-[color:var(--zui-otp-red-border-dark,#ef4444)] bg-[var(--zui-otp-red-bg,#dc262614)] dark:bg-[var(--zui-otp-red-bg-dark,#ef444424)] text-[color:var(--zui-otp-red-fg,#0f172a)] dark:text-[color:var(--zui-otp-red-fg-dark,#f8fafc)]",
  slate:
    "border border-[color:var(--zui-otp-slate-border,#475569)] dark:border-[color:var(--zui-otp-slate-border-dark,#64748b)] bg-[var(--zui-otp-slate-bg,#47556914)] dark:bg-[var(--zui-otp-slate-bg-dark,#64748b24)] text-[color:var(--zui-otp-slate-fg,#0f172a)] dark:text-[color:var(--zui-otp-slate-fg-dark,#f8fafc)]",
  zinc: "border border-[color:var(--zui-otp-zinc-border,#52525b)] dark:border-[color:var(--zui-otp-zinc-border-dark,#71717a)] bg-[var(--zui-otp-zinc-bg,#52525b14)] dark:bg-[var(--zui-otp-zinc-bg-dark,#71717a24)] text-[color:var(--zui-otp-zinc-fg,#0f172a)] dark:text-[color:var(--zui-otp-zinc-fg-dark,#f8fafc)]",
  stone:
    "border border-[color:var(--zui-otp-stone-border,#57534e)] dark:border-[color:var(--zui-otp-stone-border-dark,#78716c)] bg-[var(--zui-otp-stone-bg,#57534e14)] dark:bg-[var(--zui-otp-stone-bg-dark,#78716c24)] text-[color:var(--zui-otp-stone-fg,#0f172a)] dark:text-[color:var(--zui-otp-stone-fg-dark,#f8fafc)]",
  royal:
    "border border-[color:var(--zui-otp-royal-border,#4338ca)] dark:border-[color:var(--zui-otp-royal-border-dark,#818cf8)] bg-[var(--zui-otp-royal-bg,#4338ca14)] dark:bg-[var(--zui-otp-royal-bg-dark,#818cf824)] text-[color:var(--zui-otp-royal-fg,#0f172a)] dark:text-[color:var(--zui-otp-royal-fg-dark,#f8fafc)]",
  electric:
    "border border-[color:var(--zui-otp-electric-border,#0ea5e9)] dark:border-[color:var(--zui-otp-electric-border-dark,#38bdf8)] bg-[var(--zui-otp-electric-bg,#0ea5e914)] dark:bg-[var(--zui-otp-electric-bg-dark,#38bdf824)] text-[color:var(--zui-otp-electric-fg,#0f172a)] dark:text-[color:var(--zui-otp-electric-fg-dark,#f8fafc)]",
  forest:
    "border border-[color:var(--zui-otp-forest-border,#166534)] dark:border-[color:var(--zui-otp-forest-border-dark,#4ade80)] bg-[var(--zui-otp-forest-bg,#16653414)] dark:bg-[var(--zui-otp-forest-bg-dark,#4ade8024)] text-[color:var(--zui-otp-forest-fg,#0f172a)] dark:text-[color:var(--zui-otp-forest-fg-dark,#f8fafc)]",
  sunset:
    "border border-[color:var(--zui-otp-sunset-border,#ea580c)] dark:border-[color:var(--zui-otp-sunset-border-dark,#fb923c)] bg-[var(--zui-otp-sunset-bg,#ea580c14)] dark:bg-[var(--zui-otp-sunset-bg-dark,#fb923c24)] text-[color:var(--zui-otp-sunset-fg,#0f172a)] dark:text-[color:var(--zui-otp-sunset-fg-dark,#f8fafc)]",
  magenta:
    "border border-[color:var(--zui-otp-magenta-border,#c026d3)] dark:border-[color:var(--zui-otp-magenta-border-dark,#e879f9)] bg-[var(--zui-otp-magenta-bg,#c026d314)] dark:bg-[var(--zui-otp-magenta-bg-dark,#e879f924)] text-[color:var(--zui-otp-magenta-fg,#0f172a)] dark:text-[color:var(--zui-otp-magenta-fg-dark,#f8fafc)]",
  crimson:
    "border border-[color:var(--zui-otp-crimson-border,#b91c1c)] dark:border-[color:var(--zui-otp-crimson-border-dark,#f87171)] bg-[var(--zui-otp-crimson-bg,#b91c1c14)] dark:bg-[var(--zui-otp-crimson-bg-dark,#f8717124)] text-[color:var(--zui-otp-crimson-fg,#0f172a)] dark:text-[color:var(--zui-otp-crimson-fg-dark,#f8fafc)]",
  aqua: "border border-[color:var(--zui-otp-aqua-border,#0f766e)] dark:border-[color:var(--zui-otp-aqua-border-dark,#2dd4bf)] bg-[var(--zui-otp-aqua-bg,#0f766e14)] dark:bg-[var(--zui-otp-aqua-bg-dark,#2dd4bf24)] text-[color:var(--zui-otp-aqua-fg,#0f172a)] dark:text-[color:var(--zui-otp-aqua-fg-dark,#f8fafc)]",
  plum: "border border-[color:var(--zui-otp-plum-border,#7e22ce)] dark:border-[color:var(--zui-otp-plum-border-dark,#c084fc)] bg-[var(--zui-otp-plum-bg,#7e22ce14)] dark:bg-[var(--zui-otp-plum-bg-dark,#c084fc24)] text-[color:var(--zui-otp-plum-fg,#0f172a)] dark:text-[color:var(--zui-otp-plum-fg-dark,#f8fafc)]",
} as const;
