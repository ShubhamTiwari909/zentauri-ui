export const zuiCommandOverlayBase =
  "fixed inset-0 z-9999 bg-[var(--zui-command-overlay-bg,oklch(12.9%_0.042_264.695_/_0.6))] dark:bg-[var(--zui-command-overlay-bg-dark,oklch(12.9%_0.042_264.695_/_0.6))] backdrop-blur-sm";

export const zuiCommandTriggerBase =
  "relative inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-md border border-[color:var(--zui-command-trigger-border,#0000001a)] dark:border-[color:var(--zui-command-trigger-border-dark,#ffffff1a)] bg-[var(--zui-command-trigger-bg,oklch(98.4%_0.003_247.858))] dark:bg-[var(--zui-command-trigger-bg-dark,oklch(12.9%_0.042_264.695))] px-3 py-2 text-sm text-[color:var(--zui-command-trigger-fg,oklch(44.6%_0.03_256.802))] dark:text-[color:var(--zui-command-trigger-fg-dark,oklch(86.9%_0.022_252.894))] transition hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40";

export const zuiCommandContentBase =
  "fixed left-1/2 top-[15%] z-9999 w-[calc(100%-2rem)] -translate-x-1/2 overflow-hidden rounded-xl border border-[color:var(--zui-command-content-border,#0000001a)] dark:border-[color:var(--zui-command-content-border-dark,#ffffff1a)] bg-[var(--zui-command-content-bg,oklch(98.4%_0.003_247.858))] dark:bg-[var(--zui-command-content-bg-dark,oklch(12.9%_0.042_264.695))] text-[color:var(--zui-command-content-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-command-content-fg-dark,oklch(98.4%_0.003_247.858))] shadow-[var(--zui-command-content-shadow,0_12px_40px_rgba(15,23,42,0.18))] dark:shadow-[var(--zui-command-content-shadow-dark,0_24px_80px_rgba(15,23,42,0.6))] focus:outline-none";

export const zuiCommandContentSizes = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
} as const;

export const zuiCommandInputRowBase =
  "flex items-center gap-2 border-b border-[color:var(--zui-command-input-border,#0000000f)] dark:border-[color:var(--zui-command-input-border-dark,#ffffff14)] px-4";

export const zuiCommandInputBase =
  "h-12 w-full bg-transparent text-sm text-[color:var(--zui-command-input-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-command-input-fg-dark,oklch(98.4%_0.003_247.858))] placeholder:text-[color:var(--zui-command-input-placeholder,oklch(55.1%_0.027_264.364))] dark:placeholder:text-[color:var(--zui-command-input-placeholder-dark,oklch(55.1%_0.027_264.364))] focus:outline-none";

export const zuiCommandListBase =
  "max-h-[min(60vh,420px)] overflow-y-auto overscroll-contain p-2";

export const zuiCommandGroupHeadingBase =
  "px-2 pb-1 pt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--zui-command-group-heading-fg,oklch(55.1%_0.027_264.364))] dark:text-[color:var(--zui-command-group-heading-fg-dark,oklch(70.7%_0.022_261.325))]";

export const zuiCommandItemBase =
  "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-[color:var(--zui-command-item-fg,oklch(27.8%_0.033_256.848))] dark:text-[color:var(--zui-command-item-fg-dark,oklch(86.9%_0.022_252.894))] transition-colors data-[active=true]:bg-[var(--zui-command-item-active-bg,oklch(95.1%_0.026_236.824))] dark:data-[active=true]:bg-[var(--zui-command-item-active-bg-dark,oklch(28.2%_0.091_267.935_/_0.55))] data-[active=true]:text-[color:var(--zui-command-item-active-fg,oklch(20.8%_0.042_265.755))] dark:data-[active=true]:text-[color:var(--zui-command-item-active-fg-dark,oklch(98.4%_0.003_247.858))] aria-disabled:cursor-not-allowed aria-disabled:opacity-50";

export const zuiCommandSeparatorBase =
  "my-1 h-px bg-[var(--zui-command-separator-bg,#0000000f)] dark:bg-[var(--zui-command-separator-bg-dark,#ffffff14)]";

export const zuiCommandEmptyBase =
  "px-3 py-8 text-center text-sm text-[color:var(--zui-command-empty-fg,oklch(55.1%_0.027_264.364))] dark:text-[color:var(--zui-command-empty-fg-dark,oklch(70.7%_0.022_261.325))]";

export const zuiCommandFooterBase =
  "flex items-center gap-3 border-t border-[color:var(--zui-command-footer-border,#0000000f)] dark:border-[color:var(--zui-command-footer-border-dark,#ffffff14)] px-4 py-2 text-xs text-[color:var(--zui-command-footer-fg,oklch(55.1%_0.027_264.364))] dark:text-[color:var(--zui-command-footer-fg-dark,oklch(70.7%_0.022_261.325))]";

export const zuiCommandContentAppearances = {
  default:
    "bg-[var(--zui-command-content-default-bg,oklch(98.4%_0.003_247.858))] dark:bg-[var(--zui-command-content-default-bg-dark,oklch(12.9%_0.042_264.695))]",
  glass:
    "border-[color:var(--zui-command-content-glass-border,#00000026)] dark:border-[color:var(--zui-command-content-glass-border-dark,#ffffff26)] bg-[var(--zui-command-content-glass-bg,oklch(98.4%_0.003_247.858_/_0.7))] dark:bg-[var(--zui-command-content-glass-bg-dark,oklch(12.9%_0.042_264.695_/_0.7))] backdrop-blur-xl",
  sky: "border-[color:var(--zui-command-content-sky-border,oklch(44.3%_0.11_240.79))] dark:border-[color:var(--zui-command-content-sky-border-dark,oklch(58.8%_0.158_241.966))] bg-[var(--zui-command-content-sky-bg,oklch(97.7%_0.013_236.62))] dark:bg-[var(--zui-command-content-sky-bg-dark,oklch(29.3%_0.066_243.157_/_0.7))] backdrop-blur-xl",
  rose: "border-[color:var(--zui-command-content-rose-border,oklch(45.5%_0.188_13.697))] dark:border-[color:var(--zui-command-content-rose-border-dark,oklch(58.6%_0.253_17.585))] bg-[var(--zui-command-content-rose-bg,oklch(96.9%_0.015_12.422))] dark:bg-[var(--zui-command-content-rose-bg-dark,oklch(27.1%_0.105_12.094_/_0.7))] backdrop-blur-xl",
  purple:
    "border-[color:var(--zui-command-content-purple-border,oklch(43.8%_0.218_303.724))] dark:border-[color:var(--zui-command-content-purple-border-dark,oklch(55.8%_0.288_302.321))] bg-[var(--zui-command-content-purple-bg,oklch(97.7%_0.014_308.299))] dark:bg-[var(--zui-command-content-purple-bg-dark,oklch(29.1%_0.149_302.717_/_0.7))] backdrop-blur-xl",
  pink: "border-[color:var(--zui-command-content-pink-border,oklch(45.9%_0.187_3.815))] dark:border-[color:var(--zui-command-content-pink-border-dark,oklch(59.2%_0.249_0.584))] bg-[var(--zui-command-content-pink-bg,oklch(97.1%_0.014_343.198))] dark:bg-[var(--zui-command-content-pink-bg-dark,oklch(28.4%_0.109_3.907_/_0.7))] backdrop-blur-xl",
  orange:
    "border-[color:var(--zui-command-content-orange-border,oklch(47%_0.157_37.304))] dark:border-[color:var(--zui-command-content-orange-border-dark,oklch(64.6%_0.222_41.116))] bg-[var(--zui-command-content-orange-bg,oklch(98%_0.016_73.684))] dark:bg-[var(--zui-command-content-orange-bg-dark,oklch(26.6%_0.079_36.259_/_0.7))] backdrop-blur-xl",
  yellow:
    "border-[color:var(--zui-command-content-yellow-border,oklch(47.6%_0.114_61.907))] dark:border-[color:var(--zui-command-content-yellow-border-dark,oklch(68.1%_0.162_75.834))] bg-[var(--zui-command-content-yellow-bg,oklch(98.7%_0.026_102.212))] dark:bg-[var(--zui-command-content-yellow-bg-dark,oklch(28.6%_0.066_53.813_/_0.7))] backdrop-blur-xl",
  teal: "border-[color:var(--zui-command-content-teal-border,oklch(43.7%_0.078_188.216))] dark:border-[color:var(--zui-command-content-teal-border-dark,oklch(60%_0.118_184.704))] bg-[var(--zui-command-content-teal-bg,oklch(98.4%_0.014_180.72))] dark:bg-[var(--zui-command-content-teal-bg-dark,oklch(27.7%_0.046_192.524_/_0.7))] backdrop-blur-xl",
  indigo:
    "border-[color:var(--zui-command-content-indigo-border,oklch(39.8%_0.195_277.366))] dark:border-[color:var(--zui-command-content-indigo-border-dark,oklch(51.1%_0.262_276.966))] bg-[var(--zui-command-content-indigo-bg,oklch(96.2%_0.018_272.314))] dark:bg-[var(--zui-command-content-indigo-bg-dark,oklch(25.7%_0.09_281.288_/_0.7))] backdrop-blur-xl",
  emerald:
    "border-[color:var(--zui-command-content-emerald-border,oklch(43.2%_0.095_166.913))] dark:border-[color:var(--zui-command-content-emerald-border-dark,oklch(59.6%_0.145_163.225))] bg-[var(--zui-command-content-emerald-bg,oklch(97.9%_0.021_166.113))] dark:bg-[var(--zui-command-content-emerald-bg-dark,oklch(26.2%_0.051_172.552_/_0.7))] backdrop-blur-xl",
  gray: "border-[color:var(--zui-command-content-gray-border,oklch(27.8%_0.033_256.848))] dark:border-[color:var(--zui-command-content-gray-border-dark,oklch(44.6%_0.03_256.802))] bg-[var(--zui-command-content-gray-bg,oklch(98.5%_0.002_247.839))] dark:bg-[var(--zui-command-content-gray-bg-dark,oklch(13%_0.028_261.692_/_0.7))] backdrop-blur-xl",
  amber:
    "border-[color:var(--zui-command-content-amber-border,oklch(47.3%_0.137_46.201))] dark:border-[color:var(--zui-command-content-amber-border-dark,oklch(66.6%_0.179_58.318))] bg-[var(--zui-command-content-amber-bg,oklch(98.7%_0.022_95.277))] dark:bg-[var(--zui-command-content-amber-bg-dark,oklch(27.9%_0.077_45.635_/_0.7))] backdrop-blur-xl",
  violet:
    "border-[color:var(--zui-command-content-violet-border,oklch(43.2%_0.232_292.759))] dark:border-[color:var(--zui-command-content-violet-border-dark,oklch(54.1%_0.281_293.009))] bg-[var(--zui-command-content-violet-bg,oklch(96.9%_0.016_293.756))] dark:bg-[var(--zui-command-content-violet-bg-dark,oklch(28.3%_0.141_291.089_/_0.7))] backdrop-blur-xl",
  "gradient-blue":
    "border-[color:var(--zui-command-content-gradient-blue-border,oklch(42.4%_0.199_265.638))] dark:border-[color:var(--zui-command-content-gradient-blue-border-dark,oklch(54.6%_0.245_262.881))] bg-linear-to-br from-[var(--zui-command-content-gradient-blue-from,oklch(97%_0.014_254.604))] dark:from-[var(--zui-command-content-gradient-blue-from-dark,oklch(28.2%_0.091_267.935_/_0.85))] to-[var(--zui-command-content-gradient-blue-to,oklch(97.7%_0.014_308.299))] dark:to-[var(--zui-command-content-gradient-blue-to-dark,oklch(29.1%_0.149_302.717_/_0.85))] backdrop-blur-xl",
  "gradient-green":
    "border-[color:var(--zui-command-content-gradient-green-border,oklch(44.8%_0.119_151.328))] dark:border-[color:var(--zui-command-content-gradient-green-border-dark,oklch(62.7%_0.194_149.214))] bg-linear-to-br from-[var(--zui-command-content-gradient-green-from,oklch(98.2%_0.018_155.826))] dark:from-[var(--zui-command-content-gradient-green-from-dark,oklch(26.6%_0.065_152.934_/_0.85))] to-[var(--zui-command-content-gradient-green-to,oklch(98.6%_0.031_120.757))] dark:to-[var(--zui-command-content-gradient-green-to-dark,oklch(27.4%_0.072_132.109_/_0.85))] backdrop-blur-xl",
  "gradient-red":
    "border-[color:var(--zui-command-content-gradient-red-border,oklch(44.4%_0.177_26.899))] dark:border-[color:var(--zui-command-content-gradient-red-border-dark,oklch(57.7%_0.245_27.325))] bg-linear-to-br from-[var(--zui-command-content-gradient-red-from,oklch(97.1%_0.013_17.38))] dark:from-[var(--zui-command-content-gradient-red-from-dark,oklch(25.8%_0.092_26.042_/_0.85))] to-[var(--zui-command-content-gradient-red-to,oklch(97.1%_0.014_343.198))] dark:to-[var(--zui-command-content-gradient-red-to-dark,oklch(28.4%_0.109_3.907_/_0.85))] backdrop-blur-xl",
  "gradient-yellow":
    "border-[color:var(--zui-command-content-gradient-yellow-border,oklch(47.6%_0.114_61.907))] dark:border-[color:var(--zui-command-content-gradient-yellow-border-dark,oklch(68.1%_0.162_75.834))] bg-linear-to-br from-[var(--zui-command-content-gradient-yellow-from,oklch(98.7%_0.026_102.212))] dark:from-[var(--zui-command-content-gradient-yellow-from-dark,oklch(28.6%_0.066_53.813_/_0.85))] to-[var(--zui-command-content-gradient-yellow-to,oklch(98%_0.016_73.684))] dark:to-[var(--zui-command-content-gradient-yellow-to-dark,oklch(26.6%_0.079_36.259_/_0.85))] backdrop-blur-xl",
  "gradient-purple":
    "border-[color:var(--zui-command-content-gradient-purple-border,oklch(43.8%_0.218_303.724))] dark:border-[color:var(--zui-command-content-gradient-purple-border-dark,oklch(55.8%_0.288_302.321))] bg-linear-to-br from-[var(--zui-command-content-gradient-purple-from,oklch(97.7%_0.014_308.299))] dark:from-[var(--zui-command-content-gradient-purple-from-dark,oklch(29.1%_0.149_302.717_/_0.85))] to-[var(--zui-command-content-gradient-purple-to,oklch(97.1%_0.014_343.198))] dark:to-[var(--zui-command-content-gradient-purple-to-dark,oklch(28.4%_0.109_3.907_/_0.85))] backdrop-blur-xl",
  "gradient-teal":
    "border-[color:var(--zui-command-content-gradient-teal-border,oklch(43.7%_0.078_188.216))] dark:border-[color:var(--zui-command-content-gradient-teal-border-dark,oklch(60%_0.118_184.704))] bg-linear-to-br from-[var(--zui-command-content-gradient-teal-from,oklch(98.4%_0.014_180.72))] dark:from-[var(--zui-command-content-gradient-teal-from-dark,oklch(27.7%_0.046_192.524_/_0.85))] to-[var(--zui-command-content-gradient-teal-to,oklch(98.4%_0.019_200.873))] dark:to-[var(--zui-command-content-gradient-teal-to-dark,oklch(30.2%_0.056_229.695_/_0.85))] backdrop-blur-xl",
  "gradient-indigo":
    "border-[color:var(--zui-command-content-gradient-indigo-border,oklch(39.8%_0.195_277.366))] dark:border-[color:var(--zui-command-content-gradient-indigo-border-dark,oklch(51.1%_0.262_276.966))] bg-linear-to-br from-[var(--zui-command-content-gradient-indigo-from,oklch(96.2%_0.018_272.314))] dark:from-[var(--zui-command-content-gradient-indigo-from-dark,oklch(25.7%_0.09_281.288_/_0.85))] to-[var(--zui-command-content-gradient-indigo-to,oklch(97.7%_0.014_308.299))] dark:to-[var(--zui-command-content-gradient-indigo-to-dark,oklch(29.1%_0.149_302.717_/_0.85))] backdrop-blur-xl",
  "gradient-pink":
    "border-[color:var(--zui-command-content-gradient-pink-border,oklch(45.9%_0.187_3.815))] dark:border-[color:var(--zui-command-content-gradient-pink-border-dark,oklch(59.2%_0.249_0.584))] bg-linear-to-br from-[var(--zui-command-content-gradient-pink-from,oklch(97.1%_0.014_343.198))] dark:from-[var(--zui-command-content-gradient-pink-from-dark,oklch(28.4%_0.109_3.907_/_0.85))] to-[var(--zui-command-content-gradient-pink-to,oklch(96.9%_0.015_12.422))] dark:to-[var(--zui-command-content-gradient-pink-to-dark,oklch(27.1%_0.105_12.094_/_0.85))] backdrop-blur-xl",
} as const;
