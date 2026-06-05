export const zuiTimelineBase = "flex w-full flex-col";

export const zuiTimelineItemBase = "relative flex gap-4";

export const zuiTimelineIndicatorBase =
  "relative z-[1] grid shrink-0 place-items-center rounded-full border font-semibold transition-colors";

export const zuiTimelineIndicatorAppearances = {
  default:
    "border-[color:var(--zui-timeline-indicator-default-border,oklch(55.1%_0.027_264.364_/_0.6))] bg-[var(--zui-timeline-indicator-default-bg,oklch(55.1%_0.027_264.364_/_0.2))] text-[color:var(--zui-timeline-indicator-default-fg,oklch(21%_0.034_264.665))] dark:text-[color:var(--zui-timeline-indicator-default-fg-dark,oklch(96.7%_0.003_264.542))] ring-2 ring-[var(--zui-timeline-indicator-default-ring,oklch(70.7%_0.022_261.325_/_0.3))]",
  sky: "border-[color:var(--zui-timeline-indicator-sky-border,oklch(68.5%_0.169_237.323_/_0.6))] bg-[var(--zui-timeline-indicator-sky-bg,oklch(68.5%_0.169_237.323_/_0.2))] text-[color:var(--zui-timeline-indicator-sky-fg,oklch(39.1%_0.09_240.876))] dark:text-[color:var(--zui-timeline-indicator-sky-fg-dark,oklch(95.1%_0.026_236.824))] ring-2 ring-[var(--zui-timeline-indicator-sky-ring,oklch(74.6%_0.16_232.661_/_0.3))]",
  rose: "border-[color:var(--zui-timeline-indicator-rose-border,oklch(64.5%_0.246_16.439_/_0.6))] bg-[var(--zui-timeline-indicator-rose-bg,oklch(64.5%_0.246_16.439_/_0.2))] text-[color:var(--zui-timeline-indicator-rose-fg,oklch(41%_0.159_10.272))] dark:text-[color:var(--zui-timeline-indicator-rose-fg-dark,oklch(94.1%_0.03_12.58))] ring-2 ring-[var(--zui-timeline-indicator-rose-ring,oklch(71.2%_0.194_13.428_/_0.3))]",
  purple:
    "border-[color:var(--zui-timeline-indicator-purple-border,oklch(62.7%_0.265_303.9_/_0.6))] bg-[var(--zui-timeline-indicator-purple-bg,oklch(62.7%_0.265_303.9_/_0.2))] text-[color:var(--zui-timeline-indicator-purple-fg,oklch(38.1%_0.176_304.987))] dark:text-[color:var(--zui-timeline-indicator-purple-fg-dark,oklch(94.6%_0.033_307.174))] ring-2 ring-[var(--zui-timeline-indicator-purple-ring,oklch(71.4%_0.203_305.504_/_0.3))]",
  pink: "border-[color:var(--zui-timeline-indicator-pink-border,oklch(65.6%_0.241_354.308_/_0.6))] bg-[var(--zui-timeline-indicator-pink-bg,oklch(65.6%_0.241_354.308_/_0.2))] text-[color:var(--zui-timeline-indicator-pink-fg,oklch(40.8%_0.153_2.432))] dark:text-[color:var(--zui-timeline-indicator-pink-fg-dark,oklch(94.8%_0.028_342.258))] ring-2 ring-[var(--zui-timeline-indicator-pink-ring,oklch(71.8%_0.202_349.761_/_0.3))]",
  orange:
    "border-[color:var(--zui-timeline-indicator-orange-border,oklch(70.5%_0.213_47.604_/_0.6))] bg-[var(--zui-timeline-indicator-orange-bg,oklch(70.5%_0.213_47.604_/_0.2))] text-[color:var(--zui-timeline-indicator-orange-fg,oklch(40.8%_0.123_38.172))] dark:text-[color:var(--zui-timeline-indicator-orange-fg-dark,oklch(95.4%_0.038_75.164))] ring-2 ring-[var(--zui-timeline-indicator-orange-ring,oklch(75%_0.183_55.934_/_0.3))]",
  yellow:
    "border-[color:var(--zui-timeline-indicator-yellow-border,oklch(79.5%_0.184_86.047_/_0.6))] bg-[var(--zui-timeline-indicator-yellow-bg,oklch(79.5%_0.184_86.047_/_0.2))] text-[color:var(--zui-timeline-indicator-yellow-fg,oklch(42.1%_0.095_57.708))] dark:text-[color:var(--zui-timeline-indicator-yellow-fg-dark,oklch(97.3%_0.071_103.193))] ring-2 ring-[var(--zui-timeline-indicator-yellow-ring,oklch(85.2%_0.199_91.936_/_0.3))]",
  teal: "border-[color:var(--zui-timeline-indicator-teal-border,oklch(70.4%_0.14_182.503_/_0.6))] bg-[var(--zui-timeline-indicator-teal-bg,oklch(70.4%_0.14_182.503_/_0.2))] text-[color:var(--zui-timeline-indicator-teal-fg,oklch(38.6%_0.063_188.416))] dark:text-[color:var(--zui-timeline-indicator-teal-fg-dark,oklch(95.3%_0.051_180.801))] ring-2 ring-[var(--zui-timeline-indicator-teal-ring,oklch(77.7%_0.152_181.912_/_0.3))]",
  indigo:
    "border-[color:var(--zui-timeline-indicator-indigo-border,oklch(58.5%_0.233_277.117_/_0.6))] bg-[var(--zui-timeline-indicator-indigo-bg,oklch(58.5%_0.233_277.117_/_0.2))] text-[color:var(--zui-timeline-indicator-indigo-fg,oklch(35.9%_0.144_278.697))] dark:text-[color:var(--zui-timeline-indicator-indigo-fg-dark,oklch(93%_0.034_272.788))] ring-2 ring-[var(--zui-timeline-indicator-indigo-ring,oklch(67.3%_0.182_276.935_/_0.3))]",
  emerald:
    "border-[color:var(--zui-timeline-indicator-emerald-border,oklch(69.6%_0.17_162.48_/_0.6))] bg-[var(--zui-timeline-indicator-emerald-bg,oklch(69.6%_0.17_162.48_/_0.2))] text-[color:var(--zui-timeline-indicator-emerald-fg,oklch(37.8%_0.077_168.94))] dark:text-[color:var(--zui-timeline-indicator-emerald-fg-dark,oklch(95%_0.052_163.051))] ring-2 ring-[var(--zui-timeline-indicator-emerald-ring,oklch(76.5%_0.177_163.223_/_0.3))]",
  gray: "border-[color:var(--zui-timeline-indicator-gray-border,oklch(55.1%_0.027_264.364_/_0.6))] bg-[var(--zui-timeline-indicator-gray-bg,oklch(55.1%_0.027_264.364_/_0.2))] text-[color:var(--zui-timeline-indicator-gray-fg,oklch(21%_0.034_264.665))] dark:text-[color:var(--zui-timeline-indicator-gray-fg-dark,oklch(96.7%_0.003_264.542))] ring-2 ring-[var(--zui-timeline-indicator-gray-ring,oklch(70.7%_0.022_261.325_/_0.3))]",
  violet:
    "border-[color:var(--zui-timeline-indicator-violet-border,oklch(60.6%_0.25_292.717_/_0.6))] bg-[var(--zui-timeline-indicator-violet-bg,oklch(60.6%_0.25_292.717_/_0.2))] text-[color:var(--zui-timeline-indicator-violet-fg,oklch(38%_0.189_293.745))] dark:text-[color:var(--zui-timeline-indicator-violet-fg-dark,oklch(94.3%_0.029_294.588))] ring-2 ring-[var(--zui-timeline-indicator-violet-ring,oklch(70.2%_0.183_293.541_/_0.3))]",
  "gradient-blue":
    "border-transparent bg-linear-to-br from-[var(--zui-timeline-indicator-gradient-blue-from,oklch(62.3%_0.214_259.815))] dark:from-[var(--zui-timeline-indicator-gradient-blue-from-dark,oklch(42.4%_0.199_265.638))] to-[var(--zui-timeline-indicator-gradient-blue-to,oklch(54.6%_0.245_262.881))] dark:to-[var(--zui-timeline-indicator-gradient-blue-to-dark,oklch(37.9%_0.146_265.522))] text-[color:var(--zui-timeline-indicator-gradient-blue-fg,#ffffff)] dark:text-[color:var(--zui-timeline-indicator-gradient-blue-fg-dark,#ffffff)] ring-2 ring-[var(--zui-timeline-indicator-gradient-blue-ring,oklch(70.7%_0.165_254.624_/_0.3))] dark:ring-[var(--zui-timeline-indicator-gradient-blue-ring-dark,oklch(42.4%_0.199_265.638_/_0.3))]",
  "gradient-green":
    "border-transparent bg-linear-to-br from-[var(--zui-timeline-indicator-gradient-green-from,oklch(72.3%_0.219_149.579))] dark:from-[var(--zui-timeline-indicator-gradient-green-from-dark,oklch(44.8%_0.119_151.328))] to-[var(--zui-timeline-indicator-gradient-green-to,oklch(62.7%_0.194_149.214))] dark:to-[var(--zui-timeline-indicator-gradient-green-to-dark,oklch(39.3%_0.095_152.535))] text-[color:var(--zui-timeline-indicator-gradient-green-fg,#ffffff)] dark:text-[color:var(--zui-timeline-indicator-gradient-green-fg-dark,#ffffff)] ring-2 ring-[var(--zui-timeline-indicator-gradient-green-ring,oklch(79.2%_0.209_151.711_/_0.3))] dark:ring-[var(--zui-timeline-indicator-gradient-green-ring-dark,oklch(44.8%_0.119_151.328_/_0.3))]",
  "gradient-red":
    "border-transparent bg-linear-to-br from-[var(--zui-timeline-indicator-gradient-red-from,oklch(63.7%_0.237_25.331))] dark:from-[var(--zui-timeline-indicator-gradient-red-from-dark,oklch(44.4%_0.177_26.899))] to-[var(--zui-timeline-indicator-gradient-red-to,oklch(57.7%_0.245_27.325))] dark:to-[var(--zui-timeline-indicator-gradient-red-to-dark,oklch(39.6%_0.141_25.723))] text-[color:var(--zui-timeline-indicator-gradient-red-fg,#ffffff)] dark:text-[color:var(--zui-timeline-indicator-gradient-red-fg-dark,#ffffff)] ring-2 ring-[var(--zui-timeline-indicator-gradient-red-ring,oklch(70.4%_0.191_22.216_/_0.3))] dark:ring-[var(--zui-timeline-indicator-gradient-red-ring-dark,oklch(44.4%_0.177_26.899_/_0.3))]",
  "gradient-yellow":
    "border-transparent bg-linear-to-br from-[var(--zui-timeline-indicator-gradient-yellow-from,oklch(85.2%_0.199_91.936))] dark:from-[var(--zui-timeline-indicator-gradient-yellow-from-dark,oklch(47.6%_0.114_61.907))] to-[var(--zui-timeline-indicator-gradient-yellow-to,oklch(79.5%_0.184_86.047))] dark:to-[var(--zui-timeline-indicator-gradient-yellow-to-dark,oklch(42.1%_0.095_57.708))] text-[color:var(--zui-timeline-indicator-gradient-yellow-fg,oklch(42.1%_0.095_57.708))] dark:text-[color:var(--zui-timeline-indicator-gradient-yellow-fg-dark,#ffffff)] ring-2 ring-[var(--zui-timeline-indicator-gradient-yellow-ring,oklch(85.2%_0.199_91.936_/_0.3))] dark:ring-[var(--zui-timeline-indicator-gradient-yellow-ring-dark,oklch(47.6%_0.114_61.907_/_0.3))]",
  "gradient-purple":
    "border-transparent bg-linear-to-br from-[var(--zui-timeline-indicator-gradient-purple-from,oklch(71.4%_0.203_305.504))] dark:from-[var(--zui-timeline-indicator-gradient-purple-from-dark,oklch(43.8%_0.218_303.724))] to-[var(--zui-timeline-indicator-gradient-purple-to,oklch(62.7%_0.265_303.9))] dark:to-[var(--zui-timeline-indicator-gradient-purple-to-dark,oklch(38.1%_0.176_304.987))] text-[color:var(--zui-timeline-indicator-gradient-purple-fg,#ffffff)] dark:text-[color:var(--zui-timeline-indicator-gradient-purple-fg-dark,#ffffff)] ring-2 ring-[var(--zui-timeline-indicator-gradient-purple-ring,oklch(71.4%_0.203_305.504_/_0.3))] dark:ring-[var(--zui-timeline-indicator-gradient-purple-ring-dark,oklch(43.8%_0.218_303.724_/_0.3))]",
  "gradient-teal":
    "border-transparent bg-linear-to-br from-[var(--zui-timeline-indicator-gradient-teal-from,oklch(77.7%_0.152_181.912))] dark:from-[var(--zui-timeline-indicator-gradient-teal-from-dark,oklch(43.7%_0.078_188.216))] to-[var(--zui-timeline-indicator-gradient-teal-to,oklch(70.4%_0.14_182.503))] dark:to-[var(--zui-timeline-indicator-gradient-teal-to-dark,oklch(38.6%_0.063_188.416))] text-[color:var(--zui-timeline-indicator-gradient-teal-fg,#ffffff)] dark:text-[color:var(--zui-timeline-indicator-gradient-teal-fg-dark,#ffffff)] ring-2 ring-[var(--zui-timeline-indicator-gradient-teal-ring,oklch(77.7%_0.152_181.912_/_0.3))] dark:ring-[var(--zui-timeline-indicator-gradient-teal-ring-dark,oklch(43.7%_0.078_188.216_/_0.3))]",
  "gradient-indigo":
    "border-transparent bg-linear-to-br from-[var(--zui-timeline-indicator-gradient-indigo-from,oklch(67.3%_0.182_276.935))] dark:from-[var(--zui-timeline-indicator-gradient-indigo-from-dark,oklch(39.8%_0.195_277.366))] to-[var(--zui-timeline-indicator-gradient-indigo-to,oklch(58.5%_0.233_277.117))] dark:to-[var(--zui-timeline-indicator-gradient-indigo-to-dark,oklch(35.9%_0.144_278.697))] text-[color:var(--zui-timeline-indicator-gradient-indigo-fg,#ffffff)] dark:text-[color:var(--zui-timeline-indicator-gradient-indigo-fg-dark,#ffffff)] ring-2 ring-[var(--zui-timeline-indicator-gradient-indigo-ring,oklch(67.3%_0.182_276.935_/_0.3))] dark:ring-[var(--zui-timeline-indicator-gradient-indigo-ring-dark,oklch(39.8%_0.195_277.366_/_0.3))]",
  "gradient-pink":
    "border-transparent bg-linear-to-br from-[var(--zui-timeline-indicator-gradient-pink-from,oklch(71.8%_0.202_349.761))] dark:from-[var(--zui-timeline-indicator-gradient-pink-from-dark,oklch(45.9%_0.187_3.815))] to-[var(--zui-timeline-indicator-gradient-pink-to,oklch(65.6%_0.241_354.308))] dark:to-[var(--zui-timeline-indicator-gradient-pink-to-dark,oklch(40.8%_0.153_2.432))] text-[color:var(--zui-timeline-indicator-gradient-pink-fg,#ffffff)] dark:text-[color:var(--zui-timeline-indicator-gradient-pink-fg-dark,#ffffff)] ring-2 ring-[var(--zui-timeline-indicator-gradient-pink-ring,oklch(71.8%_0.202_349.761_/_0.3))] dark:ring-[var(--zui-timeline-indicator-gradient-pink-ring-dark,oklch(45.9%_0.187_3.815_/_0.3))]",
  "gradient-orange":
    "border-transparent bg-linear-to-br from-[var(--zui-timeline-indicator-gradient-orange-from,oklch(75%_0.183_55.934))] dark:from-[var(--zui-timeline-indicator-gradient-orange-from-dark,oklch(47%_0.157_37.304))] to-[var(--zui-timeline-indicator-gradient-orange-to,oklch(70.5%_0.213_47.604))] dark:to-[var(--zui-timeline-indicator-gradient-orange-to-dark,oklch(40.8%_0.123_38.172))] text-[color:var(--zui-timeline-indicator-gradient-orange-fg,#ffffff)] dark:text-[color:var(--zui-timeline-indicator-gradient-orange-fg-dark,#ffffff)] ring-2 ring-[var(--zui-timeline-indicator-gradient-orange-ring,oklch(75%_0.183_55.934_/_0.3))] dark:ring-[var(--zui-timeline-indicator-gradient-orange-ring-dark,oklch(47%_0.157_37.304_/_0.3))]",
} as const;

export const zuiTimelineIndicatorSizes = {
  sm: "size-5 text-[0.625rem]",
  md: "size-6 text-xs",
  lg: "size-7 text-sm",
} as const;

export const zuiTimelineConnectorBase =
  "pointer-events-none absolute bottom-0 w-px -translate-x-1/2 rounded-full bg-[var(--zui-timeline-connector,#0000001f)] dark:bg-[var(--zui-timeline-connector-dark,#ffffff1f)]";

export const zuiTimelineConnectorSizes = {
  sm: "left-2.5 top-6",
  md: "left-3 top-7",
  lg: "left-3.5 top-8",
} as const;

export const zuiTimelineContentBase = "min-w-0 flex-1";

export const zuiTimelineContentSizes = {
  sm: "pb-5",
  md: "pb-6",
  lg: "pb-8",
} as const;

export const zuiTimelineTitleBase =
  "font-semibold text-[color:var(--zui-timeline-title-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-timeline-title-fg-dark,#ffffff)]";

export const zuiTimelineTitleSizes = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
} as const;

export const zuiTimelineDescriptionBase =
  "text-[color:var(--zui-timeline-description-fg,oklch(44.6%_0.03_256.802))] dark:text-[color:var(--zui-timeline-description-fg-dark,oklch(70.4%_0.04_256.788))]";

export const zuiTimelineDescriptionSizes = {
  sm: "text-xs",
  md: "text-xs",
  lg: "text-sm",
} as const;
