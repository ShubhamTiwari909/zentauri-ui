export const zuiMarqueeBase =
  "group/marquee relative isolate flex min-w-0 overflow-hidden rounded-xl border border-transparent bg-[var(--zui-marquee-bg,transparent)] text-[color:var(--zui-marquee-fg,inherit)] [--zui-marquee-gap:1rem]";

export const zuiMarqueeAppearances = {
  default:
    "[--zui-marquee-bg:transparent] [--zui-marquee-fg:oklch(20.8%_0.042_265.755)] dark:[--zui-marquee-fg:#ffffff]",
  outline:
    "border-[color:var(--zui-marquee-outline-border,oklch(86.9%_0.022_252.894))] [--zui-marquee-bg:#ffffff] [--zui-marquee-fg:oklch(20.8%_0.042_265.755)] dark:border-[color:var(--zui-marquee-outline-border-dark,oklch(37.2%_0.044_257.287))] dark:[--zui-marquee-bg:oklch(20.8%_0.042_265.755)] dark:[--zui-marquee-fg:#ffffff]",
  ghost:
    "[--zui-marquee-bg:transparent] [--zui-marquee-fg:oklch(27.9%_0.041_260.031)] dark:[--zui-marquee-fg:oklch(96.8%_0.007_247.896)]",
  card: "border-[color:var(--zui-marquee-card-border,oklch(92.9%_0.013_255.508))] bg-[var(--zui-marquee-card-bg,#ffffff)] shadow-sm shadow-slate-950/5 [--zui-marquee-fg:oklch(20.8%_0.042_265.755)] dark:border-[color:var(--zui-marquee-card-border-dark,oklch(37.2%_0.044_257.287))] dark:bg-[var(--zui-marquee-card-bg-dark,oklch(20.8%_0.042_265.755_/_0.9))] dark:shadow-black/20 dark:[--zui-marquee-fg:#ffffff]",
  separated:
    "border-y border-x-0 rounded-none border-[color:var(--zui-marquee-separated-border,oklch(86.9%_0.022_252.894))] [--zui-marquee-bg:transparent] [--zui-marquee-fg:oklch(20.8%_0.042_265.755)] dark:border-[color:var(--zui-marquee-separated-border-dark,oklch(37.2%_0.044_257.287))] dark:[--zui-marquee-fg:#ffffff]",
  sky: "border-[color:var(--zui-marquee-sky-border,oklch(62.3%_0.214_259.815_/_0.28))] [--zui-marquee-bg:oklch(97.7%_0.013_236.62)] [--zui-marquee-fg:oklch(39.1%_0.09_240.876)] dark:border-[color:var(--zui-marquee-sky-border-dark,oklch(70.7%_0.165_254.624_/_0.3))] dark:[--zui-marquee-bg:oklch(39.1%_0.09_240.876_/_0.28)] dark:[--zui-marquee-fg:oklch(95.1%_0.026_236.824)]",
  rose: "border-[color:var(--zui-marquee-rose-border,oklch(58.6%_0.253_17.585_/_0.24))] [--zui-marquee-bg:oklch(96.9%_0.015_12.422)] [--zui-marquee-fg:oklch(41%_0.159_10.272)] dark:border-[color:var(--zui-marquee-rose-border-dark,oklch(71.2%_0.194_13.428_/_0.3))] dark:[--zui-marquee-bg:oklch(41%_0.159_10.272_/_0.28)] dark:[--zui-marquee-fg:oklch(94.1%_0.03_12.58)]",
  purple:
    "border-[color:var(--zui-marquee-purple-border,oklch(62.7%_0.265_303.9_/_0.24))] [--zui-marquee-bg:oklch(97.7%_0.014_308.299)] [--zui-marquee-fg:oklch(38.1%_0.176_304.987)] dark:border-[color:var(--zui-marquee-purple-border-dark,oklch(71.4%_0.203_305.504_/_0.3))] dark:[--zui-marquee-bg:oklch(38.1%_0.176_304.987_/_0.28)] dark:[--zui-marquee-fg:oklch(94.6%_0.033_307.174)]",
  pink: "border-[color:var(--zui-marquee-pink-border,oklch(65.6%_0.241_354.308_/_0.24))] [--zui-marquee-bg:oklch(97.1%_0.014_343.198)] [--zui-marquee-fg:oklch(40.8%_0.153_2.432)] dark:border-[color:var(--zui-marquee-pink-border-dark,oklch(71.8%_0.202_349.761_/_0.3))] dark:[--zui-marquee-bg:oklch(40.8%_0.153_2.432_/_0.28)] dark:[--zui-marquee-fg:oklch(94.8%_0.028_342.258)]",
  orange:
    "border-[color:var(--zui-marquee-orange-border,oklch(70.5%_0.213_47.604_/_0.26))] [--zui-marquee-bg:oklch(98%_0.016_73.684)] [--zui-marquee-fg:oklch(40.8%_0.123_38.172)] dark:border-[color:var(--zui-marquee-orange-border-dark,oklch(75%_0.183_55.934_/_0.32))] dark:[--zui-marquee-bg:oklch(40.8%_0.123_38.172_/_0.28)] dark:[--zui-marquee-fg:oklch(95.4%_0.038_75.164)]",
  yellow:
    "border-[color:var(--zui-marquee-yellow-border,oklch(79.5%_0.184_86.047_/_0.3))] [--zui-marquee-bg:oklch(98.7%_0.026_102.212)] [--zui-marquee-fg:oklch(42.1%_0.095_57.708)] dark:border-[color:var(--zui-marquee-yellow-border-dark,oklch(85.2%_0.199_91.936_/_0.32))] dark:[--zui-marquee-bg:oklch(42.1%_0.095_57.708_/_0.28)] dark:[--zui-marquee-fg:oklch(97.3%_0.071_103.193)]",
  teal: "border-[color:var(--zui-marquee-teal-border,oklch(70.4%_0.14_182.503_/_0.28))] [--zui-marquee-bg:oklch(98.4%_0.014_180.72)] [--zui-marquee-fg:oklch(38.6%_0.063_188.416)] dark:border-[color:var(--zui-marquee-teal-border-dark,oklch(77.7%_0.152_181.912_/_0.32))] dark:[--zui-marquee-bg:oklch(38.6%_0.063_188.416_/_0.28)] dark:[--zui-marquee-fg:oklch(95.3%_0.051_180.801)]",
  indigo:
    "border-[color:var(--zui-marquee-indigo-border,oklch(58.5%_0.233_277.117_/_0.24))] [--zui-marquee-bg:oklch(96.2%_0.018_272.314)] [--zui-marquee-fg:oklch(35.9%_0.144_278.697)] dark:border-[color:var(--zui-marquee-indigo-border-dark,oklch(67.3%_0.182_276.935_/_0.32))] dark:[--zui-marquee-bg:oklch(35.9%_0.144_278.697_/_0.28)] dark:[--zui-marquee-fg:oklch(93%_0.034_272.788)]",
  emerald:
    "border-[color:var(--zui-marquee-emerald-border,oklch(69.6%_0.17_162.48_/_0.28))] [--zui-marquee-bg:oklch(97.9%_0.021_166.113)] [--zui-marquee-fg:oklch(37.8%_0.077_168.94)] dark:border-[color:var(--zui-marquee-emerald-border-dark,oklch(76.5%_0.177_163.223_/_0.32))] dark:[--zui-marquee-bg:oklch(37.8%_0.077_168.94_/_0.28)] dark:[--zui-marquee-fg:oklch(95%_0.052_163.051)]",
  "gradient-blue":
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-blue-from,oklch(62.3%_0.214_259.815))] dark:from-[var(--zui-marquee-gradient-blue-from-dark,oklch(42.4%_0.199_265.638))] to-[var(--zui-marquee-gradient-blue-to,oklch(54.6%_0.245_262.881))] dark:to-[var(--zui-marquee-gradient-blue-to-dark,oklch(37.9%_0.146_265.522))] [--zui-marquee-fg:#ffffff] dark:[--zui-marquee-fg:#ffffff]",
  "gradient-green":
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-green-from,oklch(72.3%_0.219_149.579))] dark:from-[var(--zui-marquee-gradient-green-from-dark,oklch(44.8%_0.119_151.328))] to-[var(--zui-marquee-gradient-green-to,oklch(62.7%_0.194_149.214))] dark:to-[var(--zui-marquee-gradient-green-to-dark,oklch(39.3%_0.095_152.535))] [--zui-marquee-fg:#ffffff] dark:[--zui-marquee-fg:#ffffff]",
  "gradient-red":
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-red-from,oklch(63.7%_0.237_25.331))] dark:from-[var(--zui-marquee-gradient-red-from-dark,oklch(44.4%_0.177_26.899))] to-[var(--zui-marquee-gradient-red-to,oklch(57.7%_0.245_27.325))] dark:to-[var(--zui-marquee-gradient-red-to-dark,oklch(39.6%_0.141_25.723))] [--zui-marquee-fg:#ffffff] dark:[--zui-marquee-fg:#ffffff]",
  "gradient-yellow":
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-yellow-from,oklch(85.2%_0.199_91.936))] dark:from-[var(--zui-marquee-gradient-yellow-from-dark,oklch(47.6%_0.114_61.907))] to-[var(--zui-marquee-gradient-yellow-to,oklch(79.5%_0.184_86.047))] dark:to-[var(--zui-marquee-gradient-yellow-to-dark,oklch(42.1%_0.095_57.708))] [--zui-marquee-fg:oklch(27.9%_0.077_45.635)] dark:[--zui-marquee-fg:#ffffff]",
  "gradient-purple":
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-purple-from,oklch(71.4%_0.203_305.504))] dark:from-[var(--zui-marquee-gradient-purple-from-dark,oklch(43.8%_0.218_303.724))] to-[var(--zui-marquee-gradient-purple-to,oklch(62.7%_0.265_303.9))] dark:to-[var(--zui-marquee-gradient-purple-to-dark,oklch(38.1%_0.176_304.987))] [--zui-marquee-fg:#ffffff] dark:[--zui-marquee-fg:#ffffff]",
  "gradient-teal":
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-teal-from,oklch(77.7%_0.152_181.912))] dark:from-[var(--zui-marquee-gradient-teal-from-dark,oklch(43.7%_0.078_188.216))] to-[var(--zui-marquee-gradient-teal-to,oklch(70.4%_0.14_182.503))] dark:to-[var(--zui-marquee-gradient-teal-to-dark,oklch(38.6%_0.063_188.416))] [--zui-marquee-fg:#ffffff] dark:[--zui-marquee-fg:#ffffff]",
  "gradient-indigo":
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-indigo-from,oklch(67.3%_0.182_276.935))] dark:from-[var(--zui-marquee-gradient-indigo-from-dark,oklch(39.8%_0.195_277.366))] to-[var(--zui-marquee-gradient-indigo-to,oklch(58.5%_0.233_277.117))] dark:to-[var(--zui-marquee-gradient-indigo-to-dark,oklch(35.9%_0.144_278.697))] [--zui-marquee-fg:#ffffff] dark:[--zui-marquee-fg:#ffffff]",
  "gradient-pink":
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-pink-from,oklch(71.8%_0.202_349.761))] dark:from-[var(--zui-marquee-gradient-pink-from-dark,oklch(45.9%_0.187_3.815))] to-[var(--zui-marquee-gradient-pink-to,oklch(65.6%_0.241_354.308))] dark:to-[var(--zui-marquee-gradient-pink-to-dark,oklch(40.8%_0.153_2.432))] [--zui-marquee-fg:#ffffff] dark:[--zui-marquee-fg:#ffffff]",
  "gradient-orange":
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-orange-from,oklch(75%_0.183_55.934))] dark:from-[var(--zui-marquee-gradient-orange-from-dark,oklch(47%_0.157_37.304))] to-[var(--zui-marquee-gradient-orange-to,oklch(70.5%_0.213_47.604))] dark:to-[var(--zui-marquee-gradient-orange-to-dark,oklch(40.8%_0.123_38.172))] [--zui-marquee-fg:#ffffff] dark:[--zui-marquee-fg:#ffffff]",
  blue: "border border-[color:var(--zui-marquee-blue-border,#2563eb)] dark:border-[color:var(--zui-marquee-blue-border-dark,#3b82f6)] bg-[var(--zui-marquee-blue-bg,#2563eb14)] dark:bg-[var(--zui-marquee-blue-bg-dark,#3b82f624)] text-[color:var(--zui-marquee-blue-fg,#0f172a)] dark:text-[color:var(--zui-marquee-blue-fg-dark,#f8fafc)]",
  cyan: "border border-[color:var(--zui-marquee-cyan-border,#0891b2)] dark:border-[color:var(--zui-marquee-cyan-border-dark,#22d3ee)] bg-[var(--zui-marquee-cyan-bg,#0891b214)] dark:bg-[var(--zui-marquee-cyan-bg-dark,#22d3ee24)] text-[color:var(--zui-marquee-cyan-fg,#0f172a)] dark:text-[color:var(--zui-marquee-cyan-fg-dark,#f8fafc)]",
  green:
    "border border-[color:var(--zui-marquee-green-border,#16a34a)] dark:border-[color:var(--zui-marquee-green-border-dark,#22c55e)] bg-[var(--zui-marquee-green-bg,#16a34a14)] dark:bg-[var(--zui-marquee-green-bg-dark,#22c55e24)] text-[color:var(--zui-marquee-green-fg,#0f172a)] dark:text-[color:var(--zui-marquee-green-fg-dark,#f8fafc)]",
  lime: "border border-[color:var(--zui-marquee-lime-border,#65a30d)] dark:border-[color:var(--zui-marquee-lime-border-dark,#a3e635)] bg-[var(--zui-marquee-lime-bg,#65a30d14)] dark:bg-[var(--zui-marquee-lime-bg-dark,#a3e63524)] text-[color:var(--zui-marquee-lime-fg,#0f172a)] dark:text-[color:var(--zui-marquee-lime-fg-dark,#f8fafc)]",
  mint: "border border-[color:var(--zui-marquee-mint-border,#10b981)] dark:border-[color:var(--zui-marquee-mint-border-dark,#6ee7b7)] bg-[var(--zui-marquee-mint-bg,#10b98114)] dark:bg-[var(--zui-marquee-mint-bg-dark,#6ee7b724)] text-[color:var(--zui-marquee-mint-fg,#0f172a)] dark:text-[color:var(--zui-marquee-mint-fg-dark,#f8fafc)]",
  ocean:
    "border border-[color:var(--zui-marquee-ocean-border,#0284c7)] dark:border-[color:var(--zui-marquee-ocean-border-dark,#38bdf8)] bg-[var(--zui-marquee-ocean-bg,#0284c714)] dark:bg-[var(--zui-marquee-ocean-bg-dark,#38bdf824)] text-[color:var(--zui-marquee-ocean-fg,#0f172a)] dark:text-[color:var(--zui-marquee-ocean-fg-dark,#f8fafc)]",
  sapphire:
    "border border-[color:var(--zui-marquee-sapphire-border,#1d4ed8)] dark:border-[color:var(--zui-marquee-sapphire-border-dark,#60a5fa)] bg-[var(--zui-marquee-sapphire-bg,#1d4ed814)] dark:bg-[var(--zui-marquee-sapphire-bg-dark,#60a5fa24)] text-[color:var(--zui-marquee-sapphire-fg,#0f172a)] dark:text-[color:var(--zui-marquee-sapphire-fg-dark,#f8fafc)]",
  lavender:
    "border border-[color:var(--zui-marquee-lavender-border,#8b5cf6)] dark:border-[color:var(--zui-marquee-lavender-border-dark,#a78bfa)] bg-[var(--zui-marquee-lavender-bg,#8b5cf614)] dark:bg-[var(--zui-marquee-lavender-bg-dark,#a78bfa24)] text-[color:var(--zui-marquee-lavender-fg,#0f172a)] dark:text-[color:var(--zui-marquee-lavender-fg-dark,#f8fafc)]",
  ruby: "border border-[color:var(--zui-marquee-ruby-border,#be123c)] dark:border-[color:var(--zui-marquee-ruby-border-dark,#fb7185)] bg-[var(--zui-marquee-ruby-bg,#be123c14)] dark:bg-[var(--zui-marquee-ruby-bg-dark,#fb718524)] text-[color:var(--zui-marquee-ruby-fg,#0f172a)] dark:text-[color:var(--zui-marquee-ruby-fg-dark,#f8fafc)]",
  red: "border border-[color:var(--zui-marquee-red-border,#dc2626)] dark:border-[color:var(--zui-marquee-red-border-dark,#ef4444)] bg-[var(--zui-marquee-red-bg,#dc262614)] dark:bg-[var(--zui-marquee-red-bg-dark,#ef444424)] text-[color:var(--zui-marquee-red-fg,#0f172a)] dark:text-[color:var(--zui-marquee-red-fg-dark,#f8fafc)]",
  slate:
    "border border-[color:var(--zui-marquee-slate-border,#475569)] dark:border-[color:var(--zui-marquee-slate-border-dark,#64748b)] bg-[var(--zui-marquee-slate-bg,#47556914)] dark:bg-[var(--zui-marquee-slate-bg-dark,#64748b24)] text-[color:var(--zui-marquee-slate-fg,#0f172a)] dark:text-[color:var(--zui-marquee-slate-fg-dark,#f8fafc)]",
  zinc: "border border-[color:var(--zui-marquee-zinc-border,#52525b)] dark:border-[color:var(--zui-marquee-zinc-border-dark,#71717a)] bg-[var(--zui-marquee-zinc-bg,#52525b14)] dark:bg-[var(--zui-marquee-zinc-bg-dark,#71717a24)] text-[color:var(--zui-marquee-zinc-fg,#0f172a)] dark:text-[color:var(--zui-marquee-zinc-fg-dark,#f8fafc)]",
  stone:
    "border border-[color:var(--zui-marquee-stone-border,#57534e)] dark:border-[color:var(--zui-marquee-stone-border-dark,#78716c)] bg-[var(--zui-marquee-stone-bg,#57534e14)] dark:bg-[var(--zui-marquee-stone-bg-dark,#78716c24)] text-[color:var(--zui-marquee-stone-fg,#0f172a)] dark:text-[color:var(--zui-marquee-stone-fg-dark,#f8fafc)]",
  royal:
    "border border-[color:var(--zui-marquee-royal-border,#4338ca)] dark:border-[color:var(--zui-marquee-royal-border-dark,#818cf8)] bg-[var(--zui-marquee-royal-bg,#4338ca14)] dark:bg-[var(--zui-marquee-royal-bg-dark,#818cf824)] text-[color:var(--zui-marquee-royal-fg,#0f172a)] dark:text-[color:var(--zui-marquee-royal-fg-dark,#f8fafc)]",
  electric:
    "border border-[color:var(--zui-marquee-electric-border,#0ea5e9)] dark:border-[color:var(--zui-marquee-electric-border-dark,#38bdf8)] bg-[var(--zui-marquee-electric-bg,#0ea5e914)] dark:bg-[var(--zui-marquee-electric-bg-dark,#38bdf824)] text-[color:var(--zui-marquee-electric-fg,#0f172a)] dark:text-[color:var(--zui-marquee-electric-fg-dark,#f8fafc)]",
  forest:
    "border border-[color:var(--zui-marquee-forest-border,#166534)] dark:border-[color:var(--zui-marquee-forest-border-dark,#4ade80)] bg-[var(--zui-marquee-forest-bg,#16653414)] dark:bg-[var(--zui-marquee-forest-bg-dark,#4ade8024)] text-[color:var(--zui-marquee-forest-fg,#0f172a)] dark:text-[color:var(--zui-marquee-forest-fg-dark,#f8fafc)]",
  sunset:
    "border border-[color:var(--zui-marquee-sunset-border,#ea580c)] dark:border-[color:var(--zui-marquee-sunset-border-dark,#fb923c)] bg-[var(--zui-marquee-sunset-bg,#ea580c14)] dark:bg-[var(--zui-marquee-sunset-bg-dark,#fb923c24)] text-[color:var(--zui-marquee-sunset-fg,#0f172a)] dark:text-[color:var(--zui-marquee-sunset-fg-dark,#f8fafc)]",
  magenta:
    "border border-[color:var(--zui-marquee-magenta-border,#c026d3)] dark:border-[color:var(--zui-marquee-magenta-border-dark,#e879f9)] bg-[var(--zui-marquee-magenta-bg,#c026d314)] dark:bg-[var(--zui-marquee-magenta-bg-dark,#e879f924)] text-[color:var(--zui-marquee-magenta-fg,#0f172a)] dark:text-[color:var(--zui-marquee-magenta-fg-dark,#f8fafc)]",
  crimson:
    "border border-[color:var(--zui-marquee-crimson-border,#b91c1c)] dark:border-[color:var(--zui-marquee-crimson-border-dark,#f87171)] bg-[var(--zui-marquee-crimson-bg,#b91c1c14)] dark:bg-[var(--zui-marquee-crimson-bg-dark,#f8717124)] text-[color:var(--zui-marquee-crimson-fg,#0f172a)] dark:text-[color:var(--zui-marquee-crimson-fg-dark,#f8fafc)]",
  aqua: "border border-[color:var(--zui-marquee-aqua-border,#0f766e)] dark:border-[color:var(--zui-marquee-aqua-border-dark,#2dd4bf)] bg-[var(--zui-marquee-aqua-bg,#0f766e14)] dark:bg-[var(--zui-marquee-aqua-bg-dark,#2dd4bf24)] text-[color:var(--zui-marquee-aqua-fg,#0f172a)] dark:text-[color:var(--zui-marquee-aqua-fg-dark,#f8fafc)]",
  plum: "border border-[color:var(--zui-marquee-plum-border,#7e22ce)] dark:border-[color:var(--zui-marquee-plum-border-dark,#c084fc)] bg-[var(--zui-marquee-plum-bg,#7e22ce14)] dark:bg-[var(--zui-marquee-plum-bg-dark,#c084fc24)] text-[color:var(--zui-marquee-plum-fg,#0f172a)] dark:text-[color:var(--zui-marquee-plum-fg-dark,#f8fafc)]",
} as const;

export const zuiMarqueeOrientations = {
  horizontal: "w-full flex-row",
  vertical: "h-64 flex-col",
} as const;

export const zuiMarqueeSizes = {
  sm: "p-2 text-xs",
  md: "p-3 text-sm",
  lg: "p-4 text-base",
} as const;

export const zuiMarqueeFade = {
  false: "",
  true: "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] data-[orientation=vertical]:[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]",
} as const;
