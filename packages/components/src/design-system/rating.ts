export const zuiRatingRootBase =
  "grid w-fit gap-2 text-[color:var(--zui-rating-label-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-rating-label-fg-dark,oklch(98.4%_0.003_247.858))] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50";

export const zuiRatingLabelBase =
  "text-sm font-medium leading-6 text-[color:var(--zui-rating-label-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-rating-label-fg-dark,oklch(98.4%_0.003_247.858))]";

export const zuiRatingHintBase =
  "max-w-sm text-xs leading-5 text-[color:var(--zui-rating-hint-fg,oklch(55.4%_0.046_257.417))] dark:text-[color:var(--zui-rating-hint-fg-dark,oklch(70.4%_0.04_256.788))]";

export const zuiRatingGroupBase =
  "flex w-fit flex-wrap items-center gap-[var(--zui-rating-gap,0.25rem)]";

export const zuiRatingItemBase =
  "relative inline-grid shrink-0 place-items-center text-[color:var(--zui-rating-empty,oklch(86.9%_0.022_252.894))] transition-transform duration-200 data-[interactive=true]:hover:-translate-y-0.5 dark:text-[color:var(--zui-rating-empty-dark,oklch(37.2%_0.044_257.287))]";

export const zuiRatingIconBase =
  "pointer-events-none col-start-1 row-start-1 transition-[clip-path,color,transform] duration-200 ease-out";

export const zuiRatingControlBase =
  "absolute inset-y-0 z-[1] cursor-pointer rounded-md bg-transparent outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[var(--zui-rating-ring-focus,oklch(54.6%_0.245_262.881_/_0.32))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--zui-rating-ring-offset-focus,#ffffff)] disabled:cursor-not-allowed dark:focus-visible:ring-offset-[var(--zui-rating-ring-offset-focus-dark,oklch(12.9%_0.042_264.695))]";

export const zuiRatingErrorBase =
  "text-sm leading-6 text-[color:var(--zui-rating-error-fg,oklch(58.6%_0.253_17.585))] dark:text-[color:var(--zui-rating-error-fg-dark,oklch(71.2%_0.194_13.428))]";

export const zuiRatingSizes = {
  sm: "size-5 text-lg",
  md: "size-7 text-2xl",
  lg: "size-9 text-3xl",
} as const;

export const zuiRatingAppearances = {
  default:
    "text-[color:var(--zui-rating-default-active,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-rating-default-active-dark,oklch(98.4%_0.003_247.858))]",
  secondary:
    "text-[color:var(--zui-rating-secondary-active,oklch(44.6%_0.043_257.281))] dark:text-[color:var(--zui-rating-secondary-active-dark,oklch(86.9%_0.022_252.894))]",
  destructive:
    "text-[color:var(--zui-rating-destructive-active,oklch(58.6%_0.253_17.585))] dark:text-[color:var(--zui-rating-destructive-active-dark,oklch(71.2%_0.194_13.428))]",
  outline:
    "text-[color:var(--zui-rating-outline-active,oklch(44.6%_0.043_257.281))] dark:text-[color:var(--zui-rating-outline-active-dark,oklch(86.9%_0.022_252.894))]",
  ghost:
    "text-[color:var(--zui-rating-ghost-active,oklch(37.2%_0.044_257.287))] dark:text-[color:var(--zui-rating-ghost-active-dark,oklch(92.9%_0.013_255.508))]",
  glass:
    "text-[color:var(--zui-rating-glass-active,oklch(54.6%_0.245_262.881))] drop-shadow-[0_2px_12px_rgba(59,130,246,0.25)] dark:text-[color:var(--zui-rating-glass-active-dark,oklch(78.9%_0.154_211.53))]",
  emerald:
    "text-[color:var(--zui-rating-emerald-active,oklch(59.6%_0.145_163.225))] dark:text-[color:var(--zui-rating-emerald-active-dark,oklch(77.7%_0.152_181.912))]",
  indigo:
    "text-[color:var(--zui-rating-indigo-active,oklch(51.1%_0.262_276.966))] dark:text-[color:var(--zui-rating-indigo-active-dark,oklch(67.3%_0.182_276.935))]",
  purple:
    "text-[color:var(--zui-rating-purple-active,oklch(55.8%_0.288_302.321))] dark:text-[color:var(--zui-rating-purple-active-dark,oklch(71.4%_0.203_305.504))]",
  pink: "text-[color:var(--zui-rating-pink-active,oklch(59.2%_0.249_0.584))] dark:text-[color:var(--zui-rating-pink-active-dark,oklch(71.8%_0.202_349.761))]",
  rose: "text-[color:var(--zui-rating-rose-active,oklch(58.6%_0.253_17.585))] dark:text-[color:var(--zui-rating-rose-active-dark,oklch(71.2%_0.194_13.428))]",
  sky: "text-[color:var(--zui-rating-sky-active,oklch(62.3%_0.214_259.815))] dark:text-[color:var(--zui-rating-sky-active-dark,oklch(74.6%_0.16_232.661))]",
  teal: "text-[color:var(--zui-rating-teal-active,oklch(60%_0.118_184.704))] dark:text-[color:var(--zui-rating-teal-active-dark,oklch(77.7%_0.152_181.912))]",
  yellow:
    "text-[color:var(--zui-rating-yellow-active,oklch(79.5%_0.184_86.047))] dark:text-[color:var(--zui-rating-yellow-active-dark,oklch(85.2%_0.199_91.936))]",
  orange:
    "text-[color:var(--zui-rating-orange-active,oklch(64.6%_0.222_41.116))] dark:text-[color:var(--zui-rating-orange-active-dark,oklch(75%_0.183_55.934))]",
  gray: "text-[color:var(--zui-rating-gray-active,oklch(55.1%_0.027_264.364))] dark:text-[color:var(--zui-rating-gray-active-dark,oklch(70.7%_0.022_261.325))]",
  amber:
    "text-[color:var(--zui-rating-amber-active,oklch(76.9%_0.188_70.08))] dark:text-[color:var(--zui-rating-amber-active-dark,oklch(82.8%_0.189_84.429))]",
  violet:
    "text-[color:var(--zui-rating-violet-active,oklch(54.1%_0.281_293.009))] dark:text-[color:var(--zui-rating-violet-active-dark,oklch(70.2%_0.183_293.541))]",
  "gradient-blue":
    "text-[color:var(--zui-rating-gradient-blue-active,oklch(54.6%_0.245_262.881))] drop-shadow-[0_2px_12px_rgba(37,99,235,0.28)] dark:text-[color:var(--zui-rating-gradient-blue-active-dark,oklch(70.7%_0.165_254.624))]",
  "gradient-green":
    "text-[color:var(--zui-rating-gradient-green-active,oklch(62.7%_0.194_149.214))] drop-shadow-[0_2px_12px_rgba(22,163,74,0.24)] dark:text-[color:var(--zui-rating-gradient-green-active-dark,oklch(79.2%_0.209_151.711))]",
  "gradient-red":
    "text-[color:var(--zui-rating-gradient-red-active,oklch(57.7%_0.245_27.325))] drop-shadow-[0_2px_12px_rgba(220,38,38,0.24)] dark:text-[color:var(--zui-rating-gradient-red-active-dark,oklch(70.4%_0.191_22.216))]",
  "gradient-yellow":
    "text-[color:var(--zui-rating-gradient-yellow-active,oklch(79.5%_0.184_86.047))] drop-shadow-[0_2px_12px_rgba(234,179,8,0.24)] dark:text-[color:var(--zui-rating-gradient-yellow-active-dark,oklch(85.2%_0.199_91.936))]",
  "gradient-purple":
    "text-[color:var(--zui-rating-gradient-purple-active,oklch(62.7%_0.265_303.9))] drop-shadow-[0_2px_12px_rgba(147,51,234,0.24)] dark:text-[color:var(--zui-rating-gradient-purple-active-dark,oklch(71.4%_0.203_305.504))]",
  "gradient-teal":
    "text-[color:var(--zui-rating-gradient-teal-active,oklch(60%_0.118_184.704))] drop-shadow-[0_2px_12px_rgba(13,148,136,0.24)] dark:text-[color:var(--zui-rating-gradient-teal-active-dark,oklch(77.7%_0.152_181.912))]",
  "gradient-indigo":
    "text-[color:var(--zui-rating-gradient-indigo-active,oklch(51.1%_0.262_276.966))] drop-shadow-[0_2px_12px_rgba(79,70,229,0.24)] dark:text-[color:var(--zui-rating-gradient-indigo-active-dark,oklch(67.3%_0.182_276.935))]",
  "gradient-pink":
    "text-[color:var(--zui-rating-gradient-pink-active,oklch(59.2%_0.249_0.584))] drop-shadow-[0_2px_12px_rgba(219,39,119,0.24)] dark:text-[color:var(--zui-rating-gradient-pink-active-dark,oklch(71.8%_0.202_349.761))]",
  "gradient-orange":
    "text-[color:var(--zui-rating-gradient-orange-active,oklch(64.6%_0.222_41.116))] drop-shadow-[0_2px_12px_rgba(234,88,12,0.24)] dark:text-[color:var(--zui-rating-gradient-orange-active-dark,oklch(75%_0.183_55.934))]",
  blue: "text-[color:var(--zui-rating-blue-fg,#2563eb)] dark:text-[color:var(--zui-rating-blue-fg-dark,#3b82f6)]",
  cyan: "text-[color:var(--zui-rating-cyan-fg,#0891b2)] dark:text-[color:var(--zui-rating-cyan-fg-dark,#22d3ee)]",
  green:
    "text-[color:var(--zui-rating-green-fg,#16a34a)] dark:text-[color:var(--zui-rating-green-fg-dark,#22c55e)]",
  lime: "text-[color:var(--zui-rating-lime-fg,#65a30d)] dark:text-[color:var(--zui-rating-lime-fg-dark,#a3e635)]",
  mint: "text-[color:var(--zui-rating-mint-fg,#10b981)] dark:text-[color:var(--zui-rating-mint-fg-dark,#6ee7b7)]",
  ocean:
    "text-[color:var(--zui-rating-ocean-fg,#0284c7)] dark:text-[color:var(--zui-rating-ocean-fg-dark,#38bdf8)]",
  sapphire:
    "text-[color:var(--zui-rating-sapphire-fg,#1d4ed8)] dark:text-[color:var(--zui-rating-sapphire-fg-dark,#60a5fa)]",
  lavender:
    "text-[color:var(--zui-rating-lavender-fg,#8b5cf6)] dark:text-[color:var(--zui-rating-lavender-fg-dark,#a78bfa)]",
  ruby: "text-[color:var(--zui-rating-ruby-fg,#be123c)] dark:text-[color:var(--zui-rating-ruby-fg-dark,#fb7185)]",
  red: "text-[color:var(--zui-rating-red-fg,#dc2626)] dark:text-[color:var(--zui-rating-red-fg-dark,#ef4444)]",
  slate:
    "text-[color:var(--zui-rating-slate-fg,#475569)] dark:text-[color:var(--zui-rating-slate-fg-dark,#64748b)]",
  zinc: "text-[color:var(--zui-rating-zinc-fg,#52525b)] dark:text-[color:var(--zui-rating-zinc-fg-dark,#71717a)]",
  stone:
    "text-[color:var(--zui-rating-stone-fg,#57534e)] dark:text-[color:var(--zui-rating-stone-fg-dark,#78716c)]",
  royal:
    "text-[color:var(--zui-rating-royal-fg,#4338ca)] dark:text-[color:var(--zui-rating-royal-fg-dark,#818cf8)]",
  electric:
    "text-[color:var(--zui-rating-electric-fg,#0ea5e9)] dark:text-[color:var(--zui-rating-electric-fg-dark,#38bdf8)]",
  forest:
    "text-[color:var(--zui-rating-forest-fg,#166534)] dark:text-[color:var(--zui-rating-forest-fg-dark,#4ade80)]",
  sunset:
    "text-[color:var(--zui-rating-sunset-fg,#ea580c)] dark:text-[color:var(--zui-rating-sunset-fg-dark,#fb923c)]",
  magenta:
    "text-[color:var(--zui-rating-magenta-fg,#c026d3)] dark:text-[color:var(--zui-rating-magenta-fg-dark,#e879f9)]",
  crimson:
    "text-[color:var(--zui-rating-crimson-fg,#b91c1c)] dark:text-[color:var(--zui-rating-crimson-fg-dark,#f87171)]",
  aqua: "text-[color:var(--zui-rating-aqua-fg,#0f766e)] dark:text-[color:var(--zui-rating-aqua-fg-dark,#2dd4bf)]",
  plum: "text-[color:var(--zui-rating-plum-fg,#7e22ce)] dark:text-[color:var(--zui-rating-plum-fg-dark,#c084fc)]",
} as const;
