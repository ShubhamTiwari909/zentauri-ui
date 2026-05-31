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
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-blue-from,oklch(62.3%_0.214_259.815))] to-[var(--zui-marquee-gradient-blue-to,oklch(54.6%_0.245_262.881))] [--zui-marquee-fg:#ffffff]",
  "gradient-green":
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-green-from,oklch(72.3%_0.219_149.579))] to-[var(--zui-marquee-gradient-green-to,oklch(62.7%_0.194_149.214))] [--zui-marquee-fg:#ffffff]",
  "gradient-red":
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-red-from,oklch(63.7%_0.237_25.331))] to-[var(--zui-marquee-gradient-red-to,oklch(57.7%_0.245_27.325))] [--zui-marquee-fg:#ffffff]",
  "gradient-yellow":
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-yellow-from,oklch(85.2%_0.199_91.936))] to-[var(--zui-marquee-gradient-yellow-to,oklch(79.5%_0.184_86.047))] [--zui-marquee-fg:oklch(27.9%_0.077_45.635)]",
  "gradient-purple":
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-purple-from,oklch(71.4%_0.203_305.504))] to-[var(--zui-marquee-gradient-purple-to,oklch(62.7%_0.265_303.9))] [--zui-marquee-fg:#ffffff]",
  "gradient-teal":
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-teal-from,oklch(77.7%_0.152_181.912))] to-[var(--zui-marquee-gradient-teal-to,oklch(70.4%_0.14_182.503))] [--zui-marquee-fg:#ffffff]",
  "gradient-indigo":
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-indigo-from,oklch(67.3%_0.182_276.935))] to-[var(--zui-marquee-gradient-indigo-to,oklch(58.5%_0.233_277.117))] [--zui-marquee-fg:#ffffff]",
  "gradient-pink":
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-pink-from,oklch(71.8%_0.202_349.761))] to-[var(--zui-marquee-gradient-pink-to,oklch(65.6%_0.241_354.308))] [--zui-marquee-fg:#ffffff]",
  "gradient-orange":
    "border-transparent bg-linear-to-r from-[var(--zui-marquee-gradient-orange-from,oklch(75%_0.183_55.934))] to-[var(--zui-marquee-gradient-orange-to,oklch(70.5%_0.213_47.604))] [--zui-marquee-fg:#ffffff]",
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
