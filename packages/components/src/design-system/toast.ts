export const zuiToastViewportBase =
  "fixed z-[60] flex max-h-screen flex-col gap-2 p-4";

export const zuiToastViewportPositions = {
  "top-left": "left-0 top-0 items-start",
  "top-center": "left-1/2 top-0 -translate-x-1/2 items-center",
  "top-right": "right-0 top-0 items-end",
  "bottom-left": "bottom-0 left-0 items-start",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-0 right-0 items-end",
} as const;

export const zuiToastRootBase =
  "pointer-events-auto w-[min(100vw-2rem,380px)] rounded-xl border bg-[var(--zui-toast-root-bg,oklch(98.4%_0.003_247.858))] dark:bg-[var(--zui-toast-root-bg-dark,oklch(98.4%_0.003_247.858))] p-4 text-[color:var(--zui-toast-root-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-toast-root-fg-dark,oklch(98.4%_0.003_247.858))] shadow-[var(--zui-toast-root-shadow,0_8px_24px_rgba(15,23,42,0.12))] dark:shadow-[var(--zui-toast-root-shadow-dark,0_18px_48px_rgba(15,23,42,0.45))]";

export const zuiToastRootAppearances = {
  default:
    "bg-[var(--zui-toast-root-default-bg,oklch(12.9%_0.042_264.695))] dark:bg-[var(--zui-toast-root-default-bg-dark,oklch(12.9%_0.042_264.695))] text-[color:var(--zui-toast-root-default-fg,oklch(98.4%_0.003_247.858))] dark:text-[color:var(--zui-toast-root-default-fg-dark,oklch(98.4%_0.003_247.858))]",
  success:
    "border-[color:var(--zui-toast-root-success-border,oklch(69.6%_0.17_162.48_/_0.4))] dark:border-[color:var(--zui-toast-root-success-border-dark,oklch(69.6%_0.17_162.48_/_0.4))] bg-[var(--zui-toast-root-success-bg,oklch(26.2%_0.051_172.552))] dark:bg-[var(--zui-toast-root-success-bg-dark,oklch(26.2%_0.051_172.552))] text-[color:var(--zui-toast-root-success-fg,oklch(97.9%_0.021_166.113))] dark:text-[color:var(--zui-toast-root-success-fg-dark,oklch(97.9%_0.021_166.113))]",
  warning:
    "border-[color:var(--zui-toast-root-warning-border,oklch(76.9%_0.188_70.08_/_0.4))] dark:border-[color:var(--zui-toast-root-warning-border-dark,oklch(76.9%_0.188_70.08_/_0.4))] bg-[var(--zui-toast-root-warning-bg,oklch(27.9%_0.077_45.635))] dark:bg-[var(--zui-toast-root-warning-bg-dark,oklch(27.9%_0.077_45.635))] text-[color:var(--zui-toast-root-warning-fg,oklch(98.7%_0.022_95.277))] dark:text-[color:var(--zui-toast-root-warning-fg-dark,oklch(98.7%_0.022_95.277))]",
  error:
    "border-[color:var(--zui-toast-root-error-border,oklch(64.5%_0.246_16.439_/_0.5))] dark:border-[color:var(--zui-toast-root-error-border-dark,oklch(64.5%_0.246_16.439_/_0.5))] bg-[var(--zui-toast-root-error-bg,oklch(27.1%_0.105_12.094))] dark:bg-[var(--zui-toast-root-error-bg-dark,oklch(27.1%_0.105_12.094))] text-[color:var(--zui-toast-root-error-fg,oklch(96.9%_0.015_12.422))] dark:text-[color:var(--zui-toast-root-error-fg-dark,oklch(96.9%_0.015_12.422))]",
  info: "border-[color:var(--zui-toast-root-info-border,oklch(68.5%_0.169_237.323_/_0.4))] dark:border-[color:var(--zui-toast-root-info-border-dark,oklch(68.5%_0.169_237.323_/_0.4))] bg-[var(--zui-toast-root-info-bg,oklch(29.3%_0.066_243.157))] dark:bg-[var(--zui-toast-root-info-bg-dark,oklch(29.3%_0.066_243.157))] text-[color:var(--zui-toast-root-info-fg,oklch(97.7%_0.013_236.62))] dark:text-[color:var(--zui-toast-root-info-fg-dark,oklch(97.7%_0.013_236.62))]",
  ghost:
    "border-[color:var(--zui-toast-root-ghost-border,transparent)] dark:border-[color:var(--zui-toast-root-ghost-border-dark,transparent)] bg-[var(--zui-toast-root-ghost-bg,transparent)] dark:bg-[var(--zui-toast-root-ghost-bg-dark,transparent)] text-[color:var(--zui-toast-root-ghost-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-toast-root-ghost-fg-dark,oklch(20.8%_0.042_265.755))]",
  purple:
    "border-[color:var(--zui-toast-root-purple-border,oklch(43.8%_0.218_303.724))] dark:border-[color:var(--zui-toast-root-purple-border-dark,oklch(55.8%_0.288_302.321))] bg-[var(--zui-toast-root-purple-bg,oklch(29.1%_0.149_302.717))] dark:bg-[var(--zui-toast-root-purple-bg-dark,oklch(29.1%_0.149_302.717))] backdrop-blur-xl text-[color:var(--zui-toast-root-purple-fg,oklch(97.7%_0.014_308.299))] dark:text-[color:var(--zui-toast-root-purple-fg-dark,oklch(97.7%_0.014_308.299))]",
  pink: "border-[color:var(--zui-toast-root-pink-border,oklch(45.9%_0.187_3.815))] dark:border-[color:var(--zui-toast-root-pink-border-dark,oklch(59.2%_0.249_0.584))] bg-[var(--zui-toast-root-pink-bg,oklch(28.4%_0.109_3.907))] dark:bg-[var(--zui-toast-root-pink-bg-dark,oklch(28.4%_0.109_3.907))] backdrop-blur-xl text-[color:var(--zui-toast-root-pink-fg,oklch(97.1%_0.014_343.198))] dark:text-[color:var(--zui-toast-root-pink-fg-dark,oklch(97.1%_0.014_343.198))]",
  orange:
    "border-[color:var(--zui-toast-root-orange-border,oklch(47%_0.157_37.304))] dark:border-[color:var(--zui-toast-root-orange-border-dark,oklch(64.6%_0.222_41.116))] bg-[var(--zui-toast-root-orange-bg,oklch(26.6%_0.079_36.259))] dark:bg-[var(--zui-toast-root-orange-bg-dark,oklch(26.6%_0.079_36.259))] backdrop-blur-xl text-[color:var(--zui-toast-root-orange-fg,oklch(98%_0.016_73.684))] dark:text-[color:var(--zui-toast-root-orange-fg-dark,oklch(98%_0.016_73.684))]",
  yellow:
    "border-[color:var(--zui-toast-root-yellow-border,oklch(47.6%_0.114_61.907))] dark:border-[color:var(--zui-toast-root-yellow-border-dark,oklch(68.1%_0.162_75.834))] bg-[var(--zui-toast-root-yellow-bg,oklch(28.6%_0.066_53.813))] dark:bg-[var(--zui-toast-root-yellow-bg-dark,oklch(28.6%_0.066_53.813))] backdrop-blur-xl text-[color:var(--zui-toast-root-yellow-fg,oklch(98.7%_0.026_102.212))] dark:text-[color:var(--zui-toast-root-yellow-fg-dark,oklch(98.7%_0.026_102.212))]",
  teal: "border-[color:var(--zui-toast-root-teal-border,oklch(43.7%_0.078_188.216))] dark:border-[color:var(--zui-toast-root-teal-border-dark,oklch(60%_0.118_184.704))] bg-[var(--zui-toast-root-teal-bg,oklch(27.7%_0.046_192.524))] dark:bg-[var(--zui-toast-root-teal-bg-dark,oklch(27.7%_0.046_192.524))] backdrop-blur-xl text-[color:var(--zui-toast-root-teal-fg,oklch(98.4%_0.014_180.72))] dark:text-[color:var(--zui-toast-root-teal-fg-dark,oklch(98.4%_0.014_180.72))]",
  indigo:
    "border-[color:var(--zui-toast-root-indigo-border,oklch(39.8%_0.195_277.366))] dark:border-[color:var(--zui-toast-root-indigo-border-dark,oklch(51.1%_0.262_276.966))] bg-[var(--zui-toast-root-indigo-bg,oklch(25.7%_0.09_281.288))] dark:bg-[var(--zui-toast-root-indigo-bg-dark,oklch(25.7%_0.09_281.288))] backdrop-blur-xl text-[color:var(--zui-toast-root-indigo-fg,oklch(96.2%_0.018_272.314))] dark:text-[color:var(--zui-toast-root-indigo-fg-dark,oklch(96.2%_0.018_272.314))]",
  emerald:
    "border-[color:var(--zui-toast-root-emerald-border,oklch(43.2%_0.095_166.913))] dark:border-[color:var(--zui-toast-root-emerald-border-dark,oklch(59.6%_0.145_163.225))] bg-[var(--zui-toast-root-emerald-bg,oklch(26.2%_0.051_172.552))] dark:bg-[var(--zui-toast-root-emerald-bg-dark,oklch(26.2%_0.051_172.552))] backdrop-blur-xl text-[color:var(--zui-toast-root-emerald-fg,oklch(97.9%_0.021_166.113))] dark:text-[color:var(--zui-toast-root-emerald-fg-dark,oklch(97.9%_0.021_166.113))]",
  gray: "border-[color:var(--zui-toast-root-gray-border,oklch(27.8%_0.033_256.848))] dark:border-[color:var(--zui-toast-root-gray-border-dark,oklch(44.6%_0.03_256.802))] bg-[var(--zui-toast-root-gray-bg,oklch(13%_0.028_261.692))] dark:bg-[var(--zui-toast-root-gray-bg-dark,oklch(13%_0.028_261.692))] backdrop-blur-xl text-[color:var(--zui-toast-root-gray-fg,oklch(98.5%_0.002_247.839))] dark:text-[color:var(--zui-toast-root-gray-fg-dark,oklch(98.5%_0.002_247.839))]",
  amber:
    "border-[color:var(--zui-toast-root-amber-border,oklch(47.3%_0.137_46.201))] dark:border-[color:var(--zui-toast-root-amber-border-dark,oklch(66.6%_0.179_58.318))] bg-[var(--zui-toast-root-amber-bg,oklch(27.9%_0.077_45.635))] dark:bg-[var(--zui-toast-root-amber-bg-dark,oklch(27.9%_0.077_45.635))] backdrop-blur-xl text-[color:var(--zui-toast-root-amber-fg,oklch(98.7%_0.022_95.277))] dark:text-[color:var(--zui-toast-root-amber-fg-dark,oklch(98.7%_0.022_95.277))]",
  violet:
    "border-[color:var(--zui-toast-root-violet-border,oklch(43.2%_0.232_292.759))] dark:border-[color:var(--zui-toast-root-violet-border-dark,oklch(54.1%_0.281_293.009))] bg-[var(--zui-toast-root-violet-bg,oklch(28.3%_0.141_291.089))] dark:bg-[var(--zui-toast-root-violet-bg-dark,oklch(28.3%_0.141_291.089))] backdrop-blur-xl text-[color:var(--zui-toast-root-violet-fg,oklch(96.9%_0.016_293.756))] dark:text-[color:var(--zui-toast-root-violet-fg-dark,oklch(96.9%_0.016_293.756))]",
  "gradient-blue":
    "border-[color:var(--zui-toast-root-gradient-blue-border,oklch(42.4%_0.199_265.638))] dark:border-[color:var(--zui-toast-root-gradient-blue-border-dark,oklch(54.6%_0.245_262.881))] bg-linear-to-r from-[var(--zui-toast-root-gradient-blue-from,oklch(97%_0.014_254.604))] dark:from-[var(--zui-toast-root-gradient-blue-from-dark,oklch(28.2%_0.091_267.935_/_0.7))] to-[var(--zui-toast-root-gradient-blue-to,oklch(97.7%_0.014_308.299))] dark:to-[var(--zui-toast-root-gradient-blue-to-dark,oklch(29.1%_0.149_302.717_/_0.7))] backdrop-blur-xl",
  "gradient-green":
    "border-[color:var(--zui-toast-root-gradient-green-border,oklch(44.8%_0.119_151.328))] dark:border-[color:var(--zui-toast-root-gradient-green-border-dark,oklch(62.7%_0.194_149.214))] bg-linear-to-r from-[var(--zui-toast-root-gradient-green-from,oklch(98.2%_0.018_155.826))] dark:from-[var(--zui-toast-root-gradient-green-from-dark,oklch(26.6%_0.065_152.934_/_0.7))] to-[var(--zui-toast-root-gradient-green-to,oklch(98.6%_0.031_120.757))] dark:to-[var(--zui-toast-root-gradient-green-to-dark,oklch(27.4%_0.072_132.109_/_0.7))] backdrop-blur-xl",
  "gradient-red":
    "border-[color:var(--zui-toast-root-gradient-red-border,oklch(44.4%_0.177_26.899))] dark:border-[color:var(--zui-toast-root-gradient-red-border-dark,oklch(57.7%_0.245_27.325))] bg-linear-to-r from-[var(--zui-toast-root-gradient-red-from,oklch(97.1%_0.013_17.38))] dark:from-[var(--zui-toast-root-gradient-red-from-dark,oklch(25.8%_0.092_26.042_/_0.7))] to-[var(--zui-toast-root-gradient-red-to,oklch(97.1%_0.014_343.198))] dark:to-[var(--zui-toast-root-gradient-red-to-dark,oklch(28.4%_0.109_3.907_/_0.7))] backdrop-blur-xl",
  "gradient-yellow":
    "border-[color:var(--zui-toast-root-gradient-yellow-border,oklch(47.6%_0.114_61.907))] dark:border-[color:var(--zui-toast-root-gradient-yellow-border-dark,oklch(68.1%_0.162_75.834))] bg-linear-to-r from-[var(--zui-toast-root-gradient-yellow-from,oklch(98.7%_0.026_102.212))] dark:from-[var(--zui-toast-root-gradient-yellow-from-dark,oklch(28.6%_0.066_53.813_/_0.7))] to-[var(--zui-toast-root-gradient-yellow-to,oklch(98%_0.016_73.684))] dark:to-[var(--zui-toast-root-gradient-yellow-to-dark,oklch(26.6%_0.079_36.259_/_0.7))] backdrop-blur-xl",
  "gradient-purple":
    "border-[color:var(--zui-toast-root-gradient-purple-border,oklch(43.8%_0.218_303.724))] dark:border-[color:var(--zui-toast-root-gradient-purple-border-dark,oklch(55.8%_0.288_302.321))] bg-linear-to-r from-[var(--zui-toast-root-gradient-purple-from,oklch(97.7%_0.014_308.299))] dark:from-[var(--zui-toast-root-gradient-purple-from-dark,oklch(29.1%_0.149_302.717_/_0.7))] to-[var(--zui-toast-root-gradient-purple-to,oklch(97.1%_0.014_343.198))] dark:to-[var(--zui-toast-root-gradient-purple-to-dark,oklch(28.4%_0.109_3.907_/_0.7))] backdrop-blur-xl",
  "gradient-teal":
    "border-[color:var(--zui-toast-root-gradient-teal-border,oklch(43.7%_0.078_188.216))] dark:border-[color:var(--zui-toast-root-gradient-teal-border-dark,oklch(60%_0.118_184.704))] bg-linear-to-r from-[var(--zui-toast-root-gradient-teal-from,oklch(98.4%_0.014_180.72))] dark:from-[var(--zui-toast-root-gradient-teal-from-dark,oklch(27.7%_0.046_192.524_/_0.7))] to-[var(--zui-toast-root-gradient-teal-to,oklch(98.4%_0.019_200.873))] dark:to-[var(--zui-toast-root-gradient-teal-to-dark,oklch(30.2%_0.056_229.695_/_0.7))] backdrop-blur-xl",
  "gradient-indigo":
    "border-[color:var(--zui-toast-root-gradient-indigo-border,oklch(39.8%_0.195_277.366))] dark:border-[color:var(--zui-toast-root-gradient-indigo-border-dark,oklch(51.1%_0.262_276.966))] bg-linear-to-r from-[var(--zui-toast-root-gradient-indigo-from,oklch(96.2%_0.018_272.314))] dark:from-[var(--zui-toast-root-gradient-indigo-from-dark,oklch(25.7%_0.09_281.288_/_0.7))] to-[var(--zui-toast-root-gradient-indigo-to,oklch(97.7%_0.014_308.299))] dark:to-[var(--zui-toast-root-gradient-indigo-to-dark,oklch(29.1%_0.149_302.717_/_0.7))] backdrop-blur-xl",
  "gradient-pink":
    "border-[color:var(--zui-toast-root-gradient-pink-border,oklch(45.9%_0.187_3.815))] dark:border-[color:var(--zui-toast-root-gradient-pink-border-dark,oklch(59.2%_0.249_0.584))] bg-linear-to-r from-[var(--zui-toast-root-gradient-pink-from,oklch(97.1%_0.014_343.198))] dark:from-[var(--zui-toast-root-gradient-pink-from-dark,oklch(28.4%_0.109_3.907_/_0.7))] to-[var(--zui-toast-root-gradient-pink-to,oklch(96.9%_0.015_12.422))] dark:to-[var(--zui-toast-root-gradient-pink-to-dark,oklch(27.1%_0.105_12.094_/_0.7))] backdrop-blur-xl",
  "gradient-orange":
    "border-[color:var(--zui-toast-root-gradient-orange-border,oklch(47%_0.157_37.304))] dark:border-[color:var(--zui-toast-root-gradient-orange-border-dark,oklch(64.6%_0.222_41.116))] bg-linear-to-r from-[var(--zui-toast-root-gradient-orange-from,oklch(98%_0.016_73.684))] dark:from-[var(--zui-toast-root-gradient-orange-from-dark,oklch(26.6%_0.079_36.259_/_0.7))] to-[var(--zui-toast-root-gradient-orange-to,oklch(97.1%_0.013_17.38))] dark:to-[var(--zui-toast-root-gradient-orange-to-dark,oklch(25.8%_0.092_26.042_/_0.7))] backdrop-blur-xl",
} as const;

export const zuiToastRootSizes = {
  sm: "p-3 text-xs",
  md: "p-4 text-sm",
  lg: "p-5 text-base",
} as const;
