export const zuiCardBase = [
  "relative flex w-full flex-col overflow-hidden text-[color:var(--zui-card-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-card-fg-dark,oklch(98.4%_0.003_247.858))]",
  "ring-offset-[var(--zui-card-ring-offset,oklch(98.4%_0.003_247.858))] dark:ring-offset-[var(--zui-card-ring-offset-dark,oklch(12.9%_0.042_264.695))] transition-colors",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zui-card-ring-focus,oklch(44.6%_0.043_257.281))] dark:focus-visible:ring-[var(--zui-card-ring-focus-dark,oklch(86.9%_0.022_252.894))] focus-visible:ring-offset-2",
] as const;

export const zuiCardAppearances = {
  default:
    "border border-[color:var(--zui-card-default-border,#0000001a)] dark:border-[color:var(--zui-card-default-border-dark,#ffffff1a)] bg-[var(--zui-card-default-bg,#0000000d)] dark:bg-[var(--zui-card-default-bg-dark,#ffffff0d)] shadow-[var(--zui-card-default-shadow,0_1px_2px_rgba(15,23,42,0.08))] dark:shadow-[var(--zui-card-default-shadow-dark,0_1px_2px_rgba(15,23,42,0.12))]",
  glass:
    "border border-[color:var(--zui-card-glass-border,#00000026)] dark:border-[color:var(--zui-card-glass-border-dark,#ffffff26)] bg-[var(--zui-card-glass-bg,#0000001a)] dark:bg-[var(--zui-card-glass-bg-dark,#ffffff1a)] backdrop-blur-md shadow-[var(--zui-card-glass-shadow,0_8px_24px_rgba(15,23,42,0.12))] dark:shadow-[var(--zui-card-glass-shadow-dark,0_18px_48px_rgba(15,23,42,0.35))]",
  outline:
    "border border-[color:var(--zui-card-outline-border,#00000026)] dark:border-[color:var(--zui-card-outline-border-dark,#ffffff26)] bg-[var(--zui-card-outline-bg,transparent)] dark:bg-[var(--zui-card-outline-bg-dark,transparent)]",
  ghost:
    "border border-[color:var(--zui-card-ghost-border,transparent)] dark:border-[color:var(--zui-card-ghost-border-dark,transparent)] bg-[var(--zui-card-ghost-bg,transparent)] dark:bg-[var(--zui-card-ghost-bg-dark,transparent)]",
  elevated:
    "border border-[color:var(--zui-card-elevated-border,#0000001a)] dark:border-[color:var(--zui-card-elevated-border-dark,#ffffff1a)] bg-[var(--zui-card-elevated-bg,oklch(96.8%_0.007_247.896_/_0.8))] dark:bg-[var(--zui-card-elevated-bg-dark,oklch(20.8%_0.042_265.755_/_0.8))] shadow-[var(--zui-card-elevated-shadow,0_12px_32px_rgba(15,23,42,0.12))] dark:shadow-[var(--zui-card-elevated-shadow-dark,0_24px_64px_rgba(15,23,42,0.45))]",
  sky: "border border-[color:var(--zui-card-sky-border,oklch(44.3%_0.11_240.79))] dark:border-[color:var(--zui-card-sky-border-dark,oklch(58.8%_0.158_241.966))] bg-[var(--zui-card-sky-bg,oklch(97.7%_0.013_236.62))] dark:bg-[var(--zui-card-sky-bg-dark,oklch(29.3%_0.066_243.157_/_0.7))] backdrop-blur-xl",
  rose: "border border-[color:var(--zui-card-rose-border,oklch(45.5%_0.188_13.697))] dark:border-[color:var(--zui-card-rose-border-dark,oklch(58.6%_0.253_17.585))] bg-[var(--zui-card-rose-bg,oklch(96.9%_0.015_12.422))] dark:bg-[var(--zui-card-rose-bg-dark,oklch(27.1%_0.105_12.094_/_0.7))] backdrop-blur-xl",
  purple:
    "border border-[color:var(--zui-card-purple-border,oklch(43.8%_0.218_303.724))] dark:border-[color:var(--zui-card-purple-border-dark,oklch(55.8%_0.288_302.321))] bg-[var(--zui-card-purple-bg,oklch(97.7%_0.014_308.299))] dark:bg-[var(--zui-card-purple-bg-dark,oklch(29.1%_0.149_302.717_/_0.7))] backdrop-blur-xl",
  pink: "border border-[color:var(--zui-card-pink-border,oklch(45.9%_0.187_3.815))] dark:border-[color:var(--zui-card-pink-border-dark,oklch(59.2%_0.249_0.584))] bg-[var(--zui-card-pink-bg,oklch(97.1%_0.014_343.198))] dark:bg-[var(--zui-card-pink-bg-dark,oklch(28.4%_0.109_3.907_/_0.7))] backdrop-blur-xl",
  orange:
    "border border-[color:var(--zui-card-orange-border,oklch(47%_0.157_37.304))] dark:border-[color:var(--zui-card-orange-border-dark,oklch(64.6%_0.222_41.116))] bg-[var(--zui-card-orange-bg,oklch(98%_0.016_73.684))] dark:bg-[var(--zui-card-orange-bg-dark,oklch(26.6%_0.079_36.259_/_0.7))] backdrop-blur-xl",
  yellow:
    "border border-[color:var(--zui-card-yellow-border,oklch(47.6%_0.114_61.907))] dark:border-[color:var(--zui-card-yellow-border-dark,oklch(68.1%_0.162_75.834))] bg-[var(--zui-card-yellow-bg,oklch(98.7%_0.026_102.212))] dark:bg-[var(--zui-card-yellow-bg-dark,oklch(28.6%_0.066_53.813_/_0.7))] backdrop-blur-xl",
  teal: "border border-[color:var(--zui-card-teal-border,oklch(43.7%_0.078_188.216))] dark:border-[color:var(--zui-card-teal-border-dark,oklch(60%_0.118_184.704))] bg-[var(--zui-card-teal-bg,oklch(98.4%_0.014_180.72))] dark:bg-[var(--zui-card-teal-bg-dark,oklch(27.7%_0.046_192.524_/_0.7))] backdrop-blur-xl",
  indigo:
    "border border-[color:var(--zui-card-indigo-border,oklch(39.8%_0.195_277.366))] dark:border-[color:var(--zui-card-indigo-border-dark,oklch(51.1%_0.262_276.966))] bg-[var(--zui-card-indigo-bg,oklch(96.2%_0.018_272.314))] dark:bg-[var(--zui-card-indigo-bg-dark,oklch(25.7%_0.09_281.288_/_0.7))] backdrop-blur-xl",
  emerald:
    "border border-[color:var(--zui-card-emerald-border,oklch(43.2%_0.095_166.913))] dark:border-[color:var(--zui-card-emerald-border-dark,oklch(59.6%_0.145_163.225))] bg-[var(--zui-card-emerald-bg,oklch(97.9%_0.021_166.113))] dark:bg-[var(--zui-card-emerald-bg-dark,oklch(26.2%_0.051_172.552_/_0.7))] backdrop-blur-xl",
  gray: "border border-[color:var(--zui-card-gray-border,oklch(27.8%_0.033_256.848))] dark:border-[color:var(--zui-card-gray-border-dark,oklch(44.6%_0.03_256.802))] bg-[var(--zui-card-gray-bg,oklch(98.5%_0.002_247.839))] dark:bg-[var(--zui-card-gray-bg-dark,oklch(13%_0.028_261.692_/_0.7))] backdrop-blur-xl",
  amber:
    "border border-[color:var(--zui-card-amber-border,oklch(47.3%_0.137_46.201))] dark:border-[color:var(--zui-card-amber-border-dark,oklch(66.6%_0.179_58.318))] bg-[var(--zui-card-amber-bg,oklch(98.7%_0.022_95.277))] dark:bg-[var(--zui-card-amber-bg-dark,oklch(27.9%_0.077_45.635_/_0.7))] backdrop-blur-xl",
  violet:
    "border border-[color:var(--zui-card-violet-border,oklch(43.2%_0.232_292.759))] dark:border-[color:var(--zui-card-violet-border-dark,oklch(54.1%_0.281_293.009))] bg-[var(--zui-card-violet-bg,oklch(96.9%_0.016_293.756))] dark:bg-[var(--zui-card-violet-bg-dark,oklch(28.3%_0.141_291.089_/_0.7))] backdrop-blur-xl",
  "gradient-blue":
    "border border-[color:var(--zui-card-gradient-blue-border,oklch(42.4%_0.199_265.638))] dark:border-[color:var(--zui-card-gradient-blue-border-dark,oklch(54.6%_0.245_262.881))] bg-linear-to-r from-[var(--zui-card-gradient-blue-from,oklch(97%_0.014_254.604))] dark:from-[var(--zui-card-gradient-blue-from-dark,oklch(28.2%_0.091_267.935_/_0.7))] to-[var(--zui-card-gradient-blue-to,oklch(97.7%_0.014_308.299))] dark:to-[var(--zui-card-gradient-blue-to-dark,oklch(29.1%_0.149_302.717_/_0.7))] backdrop-blur-xl",
  "gradient-green":
    "border border-[color:var(--zui-card-gradient-green-border,oklch(44.8%_0.119_151.328))] dark:border-[color:var(--zui-card-gradient-green-border-dark,oklch(62.7%_0.194_149.214))] bg-linear-to-r from-[var(--zui-card-gradient-green-from,oklch(98.2%_0.018_155.826))] dark:from-[var(--zui-card-gradient-green-from-dark,oklch(26.6%_0.065_152.934_/_0.7))] to-[var(--zui-card-gradient-green-to,oklch(98.6%_0.031_120.757))] dark:to-[var(--zui-card-gradient-green-to-dark,oklch(27.4%_0.072_132.109_/_0.7))] backdrop-blur-xl",
  "gradient-red":
    "border border-[color:var(--zui-card-gradient-red-border,oklch(44.4%_0.177_26.899))] dark:border-[color:var(--zui-card-gradient-red-border-dark,oklch(57.7%_0.245_27.325))] bg-linear-to-r from-[var(--zui-card-gradient-red-from,oklch(97.1%_0.013_17.38))] dark:from-[var(--zui-card-gradient-red-from-dark,oklch(25.8%_0.092_26.042_/_0.7))] to-[var(--zui-card-gradient-red-to,oklch(97.1%_0.014_343.198))] dark:to-[var(--zui-card-gradient-red-to-dark,oklch(28.4%_0.109_3.907_/_0.7))] backdrop-blur-xl",
  "gradient-yellow":
    "border border-[color:var(--zui-card-gradient-yellow-border,oklch(47.6%_0.114_61.907))] dark:border-[color:var(--zui-card-gradient-yellow-border-dark,oklch(68.1%_0.162_75.834))] bg-linear-to-r from-[var(--zui-card-gradient-yellow-from,oklch(98.7%_0.026_102.212))] dark:from-[var(--zui-card-gradient-yellow-from-dark,oklch(28.6%_0.066_53.813_/_0.7))] to-[var(--zui-card-gradient-yellow-to,oklch(98%_0.016_73.684))] dark:to-[var(--zui-card-gradient-yellow-to-dark,oklch(26.6%_0.079_36.259_/_0.7))] backdrop-blur-xl",
  "gradient-purple":
    "border border-[color:var(--zui-card-gradient-purple-border,oklch(43.8%_0.218_303.724))] dark:border-[color:var(--zui-card-gradient-purple-border-dark,oklch(55.8%_0.288_302.321))] bg-linear-to-r from-[var(--zui-card-gradient-purple-from,oklch(97.7%_0.014_308.299))] dark:from-[var(--zui-card-gradient-purple-from-dark,oklch(29.1%_0.149_302.717_/_0.7))] to-[var(--zui-card-gradient-purple-to,oklch(97.1%_0.014_343.198))] dark:to-[var(--zui-card-gradient-purple-to-dark,oklch(28.4%_0.109_3.907_/_0.7))] backdrop-blur-xl",
  "gradient-teal":
    "border border-[color:var(--zui-card-gradient-teal-border,oklch(43.7%_0.078_188.216))] dark:border-[color:var(--zui-card-gradient-teal-border-dark,oklch(60%_0.118_184.704))] bg-linear-to-r from-[var(--zui-card-gradient-teal-from,oklch(98.4%_0.014_180.72))] dark:from-[var(--zui-card-gradient-teal-from-dark,oklch(27.7%_0.046_192.524_/_0.7))] to-[var(--zui-card-gradient-teal-to,oklch(98.4%_0.019_200.873))] dark:to-[var(--zui-card-gradient-teal-to-dark,oklch(30.2%_0.056_229.695_/_0.7))] backdrop-blur-xl",
  "gradient-indigo":
    "border border-[color:var(--zui-card-gradient-indigo-border,oklch(39.8%_0.195_277.366))] dark:border-[color:var(--zui-card-gradient-indigo-border-dark,oklch(51.1%_0.262_276.966))] bg-linear-to-r from-[var(--zui-card-gradient-indigo-from,oklch(96.2%_0.018_272.314))] dark:from-[var(--zui-card-gradient-indigo-from-dark,oklch(25.7%_0.09_281.288_/_0.7))] to-[var(--zui-card-gradient-indigo-to,oklch(97.7%_0.014_308.299))] dark:to-[var(--zui-card-gradient-indigo-to-dark,oklch(29.1%_0.149_302.717_/_0.7))] backdrop-blur-xl",
  "gradient-pink":
    "border border-[color:var(--zui-card-gradient-pink-border,oklch(45.9%_0.187_3.815))] dark:border-[color:var(--zui-card-gradient-pink-border-dark,oklch(59.2%_0.249_0.584))] bg-linear-to-r from-[var(--zui-card-gradient-pink-from,oklch(97.1%_0.014_343.198))] dark:from-[var(--zui-card-gradient-pink-from-dark,oklch(28.4%_0.109_3.907_/_0.7))] to-[var(--zui-card-gradient-pink-to,oklch(96.9%_0.015_12.422))] dark:to-[var(--zui-card-gradient-pink-to-dark,oklch(27.1%_0.105_12.094_/_0.7))] backdrop-blur-xl",
  "gradient-orange":
    "border border-[color:var(--zui-card-gradient-orange-border,oklch(47%_0.157_37.304))] dark:border-[color:var(--zui-card-gradient-orange-border-dark,oklch(64.6%_0.222_41.116))] bg-linear-to-r from-[var(--zui-card-gradient-orange-from,oklch(98%_0.016_73.684))] dark:from-[var(--zui-card-gradient-orange-from-dark,oklch(26.6%_0.079_36.259_/_0.7))] to-[var(--zui-card-gradient-orange-to,oklch(97.1%_0.013_17.38))] dark:to-[var(--zui-card-gradient-orange-to-dark,oklch(25.8%_0.092_26.042_/_0.7))] backdrop-blur-xl",
} as const;

export const zuiCardSizes = {
  sm: "gap-2 p-3 text-sm",
  md: "gap-3 p-4 text-sm",
  lg: "gap-4 p-6 text-base",
} as const;

export const zuiCardRounded = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-3xl",
} as const;

export const zuiCardHeaderBase =
  "flex flex-col gap-1 border-b border-[color:var(--zui-card-header-border,#0000001a)] dark:border-[color:var(--zui-card-header-border-dark,#ffffff1a)] pb-3";

export const zuiCardHeaderSizes = {
  sm: "pb-2",
  md: "pb-3",
  lg: "pb-4",
} as const;

export const zuiCardFooterBase =
  "flex flex-col gap-2 border-t border-[color:var(--zui-card-footer-border,#0000001a)] dark:border-[color:var(--zui-card-footer-border-dark,#ffffff1a)] pt-3";

export const zuiCardFooterSizes = {
  sm: "pt-2",
  md: "pt-3",
  lg: "pt-4",
} as const;

export const zuiCardTitleBase =
  "font-semibold tracking-tight text-[color:var(--zui-card-title-fg,oklch(12.9%_0.042_264.695))] dark:text-[color:var(--zui-card-title-fg-dark,#ffffff)]";

export const zuiCardTitleSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

export const zuiCardDescriptionBase =
  "text-[color:var(--zui-card-description-fg,oklch(55.4%_0.046_257.417))] dark:text-[color:var(--zui-card-description-fg-dark,oklch(98.4%_0.003_247.858))]";

export const zuiCardDescriptionSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;
