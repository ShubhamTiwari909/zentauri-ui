export const zuiPopoverContentBase =
  "absolute z-50 rounded-lg border shadow-lg transition-all duration-200 outline-none";

export const zuiPopoverContentVariants = {
  default:
    "border-[color:var(--zui-popover-default-border,oklch(20.8%_0.042_265.755_/_0.1))] dark:border-[color:var(--zui-popover-default-border-dark,#ffffff1a)] bg-[var(--zui-popover-default-bg,#ffffff)] dark:bg-[var(--zui-popover-default-bg-dark,oklch(20.8%_0.042_265.755))] text-[color:var(--zui-popover-default-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-popover-default-fg-dark,oklch(96.8%_0.007_247.896))]",
  outline:
    "border-[color:var(--zui-popover-outline-border,oklch(37.3%_0.034_259.733))] dark:border-[color:var(--zui-popover-outline-border-dark,oklch(87.2%_0.01_258.338))] bg-[var(--zui-popover-outline-bg,#ffffff)] dark:bg-[var(--zui-popover-outline-bg-dark,#000000)] text-[color:var(--zui-popover-outline-fg,oklch(21%_0.034_264.665))] dark:text-[color:var(--zui-popover-outline-fg-dark,#ffffff)]",
  ghost:
    "border-transparent bg-[var(--zui-popover-ghost-bg,oklch(96.7%_0.003_264.542))] dark:bg-[var(--zui-popover-ghost-bg-dark,oklch(27.8%_0.033_256.848))] text-[color:var(--zui-popover-ghost-fg,oklch(21%_0.034_264.665))] dark:text-[color:var(--zui-popover-ghost-fg-dark,#ffffffe6)]",
  glass:
    "border-[color:var(--zui-popover-glass-border,#00000026)] dark:border-[color:var(--zui-popover-glass-border-dark,#ffffff26)] bg-[var(--zui-popover-glass-bg,#ffffffb3)] dark:bg-[var(--zui-popover-glass-bg-dark,#020617b3)] text-[color:var(--zui-popover-glass-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-popover-glass-fg-dark,#ffffff)] backdrop-blur-md",
  emerald:
    "border-[color:var(--zui-popover-emerald-border,oklch(43.2%_0.095_166.913_/_0.35))] dark:border-[color:var(--zui-popover-emerald-border-dark,oklch(43.2%_0.095_166.913_/_0.35))] bg-[var(--zui-popover-emerald-bg,oklch(90.5%_0.093_164.15))] text-[color:var(--zui-popover-emerald-fg,oklch(37.8%_0.077_168.94))] dark:bg-[var(--zui-popover-emerald-bg-dark,oklch(26.2%_0.051_172.552))] dark:text-[color:var(--zui-popover-emerald-fg-dark,oklch(90.5%_0.093_164.15))]",
  indigo:
    "border-[color:var(--zui-popover-indigo-border,oklch(39.8%_0.195_277.366_/_0.35))] dark:border-[color:var(--zui-popover-indigo-border-dark,oklch(39.8%_0.195_277.366_/_0.35))] bg-[var(--zui-popover-indigo-bg,oklch(87%_0.065_274.039))] text-[color:var(--zui-popover-indigo-fg,oklch(35.9%_0.144_278.697))] dark:bg-[var(--zui-popover-indigo-bg-dark,oklch(25.7%_0.09_281.288))] dark:text-[color:var(--zui-popover-indigo-fg-dark,oklch(87%_0.065_274.039))]",
  purple:
    "border-[color:var(--zui-popover-purple-border,oklch(43.8%_0.218_303.724_/_0.35))] dark:border-[color:var(--zui-popover-purple-border-dark,oklch(43.8%_0.218_303.724_/_0.35))] bg-[var(--zui-popover-purple-bg,oklch(90.2%_0.063_306.703))] text-[color:var(--zui-popover-purple-fg,oklch(38.1%_0.176_304.987))] dark:bg-[var(--zui-popover-purple-bg-dark,oklch(29.1%_0.149_302.717))] dark:text-[color:var(--zui-popover-purple-fg-dark,oklch(90.2%_0.063_306.703))]",
  pink: "border-[color:var(--zui-popover-pink-border,oklch(45.9%_0.187_3.815_/_0.35))] dark:border-[color:var(--zui-popover-pink-border-dark,oklch(45.9%_0.187_3.815_/_0.35))] bg-[var(--zui-popover-pink-bg,oklch(89.9%_0.061_343.231))] text-[color:var(--zui-popover-pink-fg,oklch(40.8%_0.153_2.432))] dark:bg-[var(--zui-popover-pink-bg-dark,oklch(28.4%_0.109_3.907))] dark:text-[color:var(--zui-popover-pink-fg-dark,oklch(89.9%_0.061_343.231))]",
  rose: "border-[color:var(--zui-popover-rose-border,oklch(45.5%_0.188_13.697_/_0.35))] dark:border-[color:var(--zui-popover-rose-border-dark,oklch(45.5%_0.188_13.697_/_0.35))] bg-[var(--zui-popover-rose-bg,oklch(89.2%_0.058_10.001))] text-[color:var(--zui-popover-rose-fg,oklch(41%_0.159_10.272))] dark:bg-[var(--zui-popover-rose-bg-dark,oklch(27.1%_0.105_12.094))] dark:text-[color:var(--zui-popover-rose-fg-dark,oklch(89.2%_0.058_10.001))]",
  sky: "border-[color:var(--zui-popover-sky-border,oklch(44.3%_0.11_240.79_/_0.35))] dark:border-[color:var(--zui-popover-sky-border-dark,oklch(44.3%_0.11_240.79_/_0.35))] bg-[var(--zui-popover-sky-bg,oklch(90.1%_0.058_230.902))] text-[color:var(--zui-popover-sky-fg,oklch(39.1%_0.09_240.876))] dark:bg-[var(--zui-popover-sky-bg-dark,oklch(29.3%_0.066_243.157))] dark:text-[color:var(--zui-popover-sky-fg-dark,oklch(90.1%_0.058_230.902))]",
  teal: "border-[color:var(--zui-popover-teal-border,oklch(43.7%_0.078_188.216_/_0.35))] dark:border-[color:var(--zui-popover-teal-border-dark,oklch(43.7%_0.078_188.216_/_0.35))] bg-[var(--zui-popover-teal-bg,oklch(91%_0.096_180.426))] text-[color:var(--zui-popover-teal-fg,oklch(38.6%_0.063_188.416))] dark:bg-[var(--zui-popover-teal-bg-dark,oklch(27.7%_0.046_192.524))] dark:text-[color:var(--zui-popover-teal-fg-dark,oklch(91%_0.096_180.426))]",
  yellow:
    "border-[color:var(--zui-popover-yellow-border,oklch(47.6%_0.114_61.907_/_0.35))] dark:border-[color:var(--zui-popover-yellow-border-dark,oklch(47.6%_0.114_61.907_/_0.35))] bg-[var(--zui-popover-yellow-bg,oklch(94.5%_0.129_101.54))] text-[color:var(--zui-popover-yellow-fg,oklch(42.1%_0.095_57.708))] dark:bg-[var(--zui-popover-yellow-bg-dark,oklch(28.6%_0.066_53.813))] dark:text-[color:var(--zui-popover-yellow-fg-dark,oklch(94.5%_0.129_101.54))]",
  orange:
    "border-[color:var(--zui-popover-orange-border,oklch(47%_0.157_37.304_/_0.35))] dark:border-[color:var(--zui-popover-orange-border-dark,oklch(47%_0.157_37.304_/_0.35))] bg-[var(--zui-popover-orange-bg,oklch(90.1%_0.076_70.697))] text-[color:var(--zui-popover-orange-fg,oklch(40.8%_0.123_38.172))] dark:bg-[var(--zui-popover-orange-bg-dark,oklch(26.6%_0.079_36.259))] dark:text-[color:var(--zui-popover-orange-fg-dark,oklch(90.1%_0.076_70.697))]",
  green:
    "border-[color:var(--zui-popover-green-border,oklch(44.8%_0.119_151.328_/_0.35))] dark:border-[color:var(--zui-popover-green-border-dark,oklch(44.8%_0.119_151.328_/_0.35))] bg-[var(--zui-popover-green-bg,oklch(92.5%_0.084_155.995))] text-[color:var(--zui-popover-green-fg,oklch(39.3%_0.095_152.535))] dark:bg-[var(--zui-popover-green-bg-dark,oklch(26.6%_0.065_152.934))] dark:text-[color:var(--zui-popover-green-fg-dark,oklch(92.5%_0.084_155.995))]",
  "gradient-blue":
    "border-transparent bg-linear-to-r from-[var(--zui-popover-gradient-blue-from,oklch(42.4%_0.199_265.638))] dark:from-[var(--zui-popover-gradient-blue-from-dark,oklch(42.4%_0.199_265.638))] to-[var(--zui-popover-gradient-blue-to,oklch(43.8%_0.218_303.724))] dark:to-[var(--zui-popover-gradient-blue-to-dark,oklch(43.8%_0.218_303.724))] text-[color:var(--zui-popover-gradient-blue-fg,#ffffff)] dark:text-[color:var(--zui-popover-gradient-blue-fg-dark,#ffffff)]",
  "gradient-green":
    "border-transparent bg-linear-to-r from-[var(--zui-popover-gradient-green-from,oklch(44.8%_0.119_151.328))] dark:from-[var(--zui-popover-gradient-green-from-dark,oklch(44.8%_0.119_151.328))] to-[var(--zui-popover-gradient-green-to,oklch(45.3%_0.124_130.933))] dark:to-[var(--zui-popover-gradient-green-to-dark,oklch(45.3%_0.124_130.933))] text-[color:var(--zui-popover-gradient-green-fg,#ffffff)] dark:text-[color:var(--zui-popover-gradient-green-fg-dark,#ffffff)]",
  "gradient-red":
    "border-transparent bg-linear-to-r from-[var(--zui-popover-gradient-red-from,oklch(44.4%_0.177_26.899))] dark:from-[var(--zui-popover-gradient-red-from-dark,oklch(44.4%_0.177_26.899))] to-[var(--zui-popover-gradient-red-to,oklch(45.9%_0.187_3.815))] dark:to-[var(--zui-popover-gradient-red-to-dark,oklch(45.9%_0.187_3.815))] text-[color:var(--zui-popover-gradient-red-fg,#ffffff)] dark:text-[color:var(--zui-popover-gradient-red-fg-dark,#ffffff)]",
  "gradient-yellow":
    "border-transparent bg-linear-to-r from-[var(--zui-popover-gradient-yellow-from,oklch(47.6%_0.114_61.907))] dark:from-[var(--zui-popover-gradient-yellow-from-dark,oklch(47.6%_0.114_61.907))] to-[var(--zui-popover-gradient-yellow-to,oklch(47%_0.157_37.304))] dark:to-[var(--zui-popover-gradient-yellow-to-dark,oklch(47%_0.157_37.304))] text-[color:var(--zui-popover-gradient-yellow-fg,#ffffff)] dark:text-[color:var(--zui-popover-gradient-yellow-fg-dark,#ffffff)]",
  "gradient-purple":
    "border-transparent bg-linear-to-r from-[var(--zui-popover-gradient-purple-from,oklch(43.8%_0.218_303.724))] dark:from-[var(--zui-popover-gradient-purple-from-dark,oklch(43.8%_0.218_303.724))] to-[var(--zui-popover-gradient-purple-to,oklch(45.9%_0.187_3.815))] dark:to-[var(--zui-popover-gradient-purple-to-dark,oklch(45.9%_0.187_3.815))] text-[color:var(--zui-popover-gradient-purple-fg,#ffffff)] dark:text-[color:var(--zui-popover-gradient-purple-fg-dark,#ffffff)]",
  "gradient-teal":
    "border-transparent bg-linear-to-r from-[var(--zui-popover-gradient-teal-from,oklch(43.7%_0.078_188.216))] dark:from-[var(--zui-popover-gradient-teal-from-dark,oklch(43.7%_0.078_188.216))] to-[var(--zui-popover-gradient-teal-to,oklch(45%_0.085_224.283))] dark:to-[var(--zui-popover-gradient-teal-to-dark,oklch(45%_0.085_224.283))] text-[color:var(--zui-popover-gradient-teal-fg,#ffffff)] dark:text-[color:var(--zui-popover-gradient-teal-fg-dark,#ffffff)]",
  "gradient-indigo":
    "border-transparent bg-linear-to-r from-[var(--zui-popover-gradient-indigo-from,oklch(39.8%_0.195_277.366))] dark:from-[var(--zui-popover-gradient-indigo-from-dark,oklch(39.8%_0.195_277.366))] to-[var(--zui-popover-gradient-indigo-to,oklch(43.8%_0.218_303.724))] dark:to-[var(--zui-popover-gradient-indigo-to-dark,oklch(43.8%_0.218_303.724))] text-[color:var(--zui-popover-gradient-indigo-fg,#ffffff)] dark:text-[color:var(--zui-popover-gradient-indigo-fg-dark,#ffffff)]",
  "gradient-pink":
    "border-transparent bg-linear-to-r from-[var(--zui-popover-gradient-pink-from,oklch(45.9%_0.187_3.815))] dark:from-[var(--zui-popover-gradient-pink-from-dark,oklch(45.9%_0.187_3.815))] to-[var(--zui-popover-gradient-pink-to,oklch(45.5%_0.188_13.697))] dark:to-[var(--zui-popover-gradient-pink-to-dark,oklch(45.5%_0.188_13.697))] text-[color:var(--zui-popover-gradient-pink-fg,#ffffff)] dark:text-[color:var(--zui-popover-gradient-pink-fg-dark,#ffffff)]",
  "gradient-orange":
    "border-transparent bg-linear-to-r from-[var(--zui-popover-gradient-orange-from,oklch(47%_0.157_37.304))] dark:from-[var(--zui-popover-gradient-orange-from-dark,oklch(47%_0.157_37.304))] to-[var(--zui-popover-gradient-orange-to,oklch(44.4%_0.177_26.899))] dark:to-[var(--zui-popover-gradient-orange-to-dark,oklch(44.4%_0.177_26.899))] text-[color:var(--zui-popover-gradient-orange-fg,#ffffff)] dark:text-[color:var(--zui-popover-gradient-orange-fg-dark,#ffffff)]",
} as const;

export const zuiPopoverContentSizes = {
  sm: "p-3 text-sm",
  md: "p-4 text-sm",
  lg: "p-5 text-base",
} as const;

export const zuiPopoverContentWidths = {
  xs: "min-w-50 md:min-w-xs",
  sm: "min-w-50 md:min-w-sm",
  md: "min-w-50 md:min-w-md",
  lg: "min-w-50 md:min-w-lg",
  xl: "min-w-50 md:min-w-xl",
  "2xl": "min-w-50 md:min-w-2xl",
} as const;
