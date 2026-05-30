export const zuiSliderRootBase = "w-full select-none touch-none";

export const zuiSliderRootSizes = {
  sm: "py-2",
  md: "py-2.5",
  lg: "py-3",
} as const;

export const zuiSliderTrackBase =
  "relative h-2 w-full shrink-0 overflow-hidden rounded-full bg-[var(--zui-slider-track-bg,#0000001a)] dark:bg-[var(--zui-slider-track-bg-dark,#ffffff1a)]";

export const zuiSliderTrackSizes = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-2.5",
} as const;

export const zuiSliderRangeBase =
  "absolute h-full rounded-full bg-linear-to-r from-[var(--zui-slider-range-from,oklch(60.6%_0.25_292.717))] dark:from-[var(--zui-slider-range-from-dark,oklch(60.6%_0.25_292.717))] to-[var(--zui-slider-range-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-to-dark,oklch(67.3%_0.182_276.935))]";

export const zuiSliderRangeAppearances = {
  default:
    "from-[var(--zui-slider-range-default-from,oklch(60.6%_0.25_292.717))] dark:from-[var(--zui-slider-range-default-from-dark,oklch(60.6%_0.25_292.717))] to-[var(--zui-slider-range-default-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-default-to-dark,oklch(67.3%_0.182_276.935))]",
  sky: "from-[var(--zui-slider-range-sky-from,oklch(68.5%_0.169_237.323))] dark:from-[var(--zui-slider-range-sky-from-dark,oklch(68.5%_0.169_237.323))] to-[var(--zui-slider-range-sky-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-sky-to-dark,oklch(67.3%_0.182_276.935))]",
  rose: "from-[var(--zui-slider-range-rose-from,oklch(64.5%_0.246_16.439))] dark:from-[var(--zui-slider-range-rose-from-dark,oklch(64.5%_0.246_16.439))] to-[var(--zui-slider-range-rose-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-rose-to-dark,oklch(67.3%_0.182_276.935))]",
  purple:
    "from-[var(--zui-slider-range-purple-from,oklch(62.7%_0.265_303.9))] dark:from-[var(--zui-slider-range-purple-from-dark,oklch(62.7%_0.265_303.9))] to-[var(--zui-slider-range-purple-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-purple-to-dark,oklch(67.3%_0.182_276.935))]",
  pink: "from-[var(--zui-slider-range-pink-from,oklch(65.6%_0.241_354.308))] dark:from-[var(--zui-slider-range-pink-from-dark,oklch(65.6%_0.241_354.308))] to-[var(--zui-slider-range-pink-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-pink-to-dark,oklch(67.3%_0.182_276.935))]",
  orange:
    "from-[var(--zui-slider-range-orange-from,oklch(70.5%_0.213_47.604))] dark:from-[var(--zui-slider-range-orange-from-dark,oklch(70.5%_0.213_47.604))] to-[var(--zui-slider-range-orange-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-orange-to-dark,oklch(67.3%_0.182_276.935))]",
  yellow:
    "from-[var(--zui-slider-range-yellow-from,oklch(79.5%_0.184_86.047))] dark:from-[var(--zui-slider-range-yellow-from-dark,oklch(79.5%_0.184_86.047))] to-[var(--zui-slider-range-yellow-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-yellow-to-dark,oklch(67.3%_0.182_276.935))]",
  teal: "from-[var(--zui-slider-range-teal-from,oklch(70.4%_0.14_182.503))] dark:from-[var(--zui-slider-range-teal-from-dark,oklch(70.4%_0.14_182.503))] to-[var(--zui-slider-range-teal-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-teal-to-dark,oklch(67.3%_0.182_276.935))]",
  indigo:
    "from-[var(--zui-slider-range-indigo-from,oklch(58.5%_0.233_277.117))] dark:from-[var(--zui-slider-range-indigo-from-dark,oklch(58.5%_0.233_277.117))] to-[var(--zui-slider-range-indigo-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-indigo-to-dark,oklch(67.3%_0.182_276.935))]",
  emerald:
    "from-[var(--zui-slider-range-emerald-from,oklch(69.6%_0.17_162.48))] dark:from-[var(--zui-slider-range-emerald-from-dark,oklch(69.6%_0.17_162.48))] to-[var(--zui-slider-range-emerald-to,oklch(60%_0.118_184.704))] dark:to-[var(--zui-slider-range-emerald-to-dark,oklch(77.7%_0.152_181.912))]",
  amber:
    "from-[var(--zui-slider-range-amber-from,oklch(76.9%_0.188_70.08))] dark:from-[var(--zui-slider-range-amber-from-dark,oklch(76.9%_0.188_70.08))] to-[var(--zui-slider-range-amber-to,oklch(64.6%_0.222_41.116))] dark:to-[var(--zui-slider-range-amber-to-dark,oklch(75%_0.183_55.934))]",
  gray: "from-[var(--zui-slider-range-gray-from,oklch(55.1%_0.027_264.364))] dark:from-[var(--zui-slider-range-gray-from-dark,oklch(55.1%_0.027_264.364))] to-[var(--zui-slider-range-gray-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-gray-to-dark,oklch(67.3%_0.182_276.935))]",
  violet:
    "from-[var(--zui-slider-range-violet-from,oklch(60.6%_0.25_292.717))] dark:from-[var(--zui-slider-range-violet-from-dark,oklch(60.6%_0.25_292.717))] to-[var(--zui-slider-range-violet-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-violet-to-dark,oklch(67.3%_0.182_276.935))]",
  "gradient-blue":
    "from-[var(--zui-slider-range-gradient-blue-from,oklch(62.3%_0.214_259.815))] dark:from-[var(--zui-slider-range-gradient-blue-from-dark,oklch(62.3%_0.214_259.815))] to-[var(--zui-slider-range-gradient-blue-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-gradient-blue-to-dark,oklch(67.3%_0.182_276.935))]",
  "gradient-green":
    "from-[var(--zui-slider-range-gradient-green-from,oklch(72.3%_0.219_149.579))] dark:from-[var(--zui-slider-range-gradient-green-from-dark,oklch(72.3%_0.219_149.579))] to-[var(--zui-slider-range-gradient-green-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-gradient-green-to-dark,oklch(67.3%_0.182_276.935))]",
  "gradient-red":
    "from-[var(--zui-slider-range-gradient-red-from,oklch(63.7%_0.237_25.331))] dark:from-[var(--zui-slider-range-gradient-red-from-dark,oklch(63.7%_0.237_25.331))] to-[var(--zui-slider-range-gradient-red-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-gradient-red-to-dark,oklch(67.3%_0.182_276.935))]",
  "gradient-yellow":
    "from-[var(--zui-slider-range-gradient-yellow-from,oklch(79.5%_0.184_86.047))] dark:from-[var(--zui-slider-range-gradient-yellow-from-dark,oklch(79.5%_0.184_86.047))] to-[var(--zui-slider-range-gradient-yellow-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-gradient-yellow-to-dark,oklch(67.3%_0.182_276.935))]",
  "gradient-purple":
    "from-[var(--zui-slider-range-gradient-purple-from,oklch(62.7%_0.265_303.9))] dark:from-[var(--zui-slider-range-gradient-purple-from-dark,oklch(62.7%_0.265_303.9))] to-[var(--zui-slider-range-gradient-purple-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-gradient-purple-to-dark,oklch(67.3%_0.182_276.935))]",
  "gradient-teal":
    "from-[var(--zui-slider-range-gradient-teal-from,oklch(70.4%_0.14_182.503))] dark:from-[var(--zui-slider-range-gradient-teal-from-dark,oklch(70.4%_0.14_182.503))] to-[var(--zui-slider-range-gradient-teal-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-gradient-teal-to-dark,oklch(67.3%_0.182_276.935))]",
  "gradient-indigo":
    "from-[var(--zui-slider-range-gradient-indigo-from,oklch(58.5%_0.233_277.117))] dark:from-[var(--zui-slider-range-gradient-indigo-from-dark,oklch(58.5%_0.233_277.117))] to-[var(--zui-slider-range-gradient-indigo-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-gradient-indigo-to-dark,oklch(67.3%_0.182_276.935))]",
  "gradient-pink":
    "from-[var(--zui-slider-range-gradient-pink-from,oklch(65.6%_0.241_354.308))] dark:from-[var(--zui-slider-range-gradient-pink-from-dark,oklch(65.6%_0.241_354.308))] to-[var(--zui-slider-range-gradient-pink-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-gradient-pink-to-dark,oklch(67.3%_0.182_276.935))]",
  "gradient-orange":
    "from-[var(--zui-slider-range-gradient-orange-from,oklch(70.5%_0.213_47.604))] dark:from-[var(--zui-slider-range-gradient-orange-from-dark,oklch(70.5%_0.213_47.604))] to-[var(--zui-slider-range-gradient-orange-to,oklch(51.1%_0.262_276.966))] dark:to-[var(--zui-slider-range-gradient-orange-to-dark,oklch(67.3%_0.182_276.935))]",
} as const;

export const zuiSliderThumbBase =
  "block size-4 rounded-full border border-[color:var(--zui-slider-thumb-border,#00000033)] dark:border-[color:var(--zui-slider-thumb-border-dark,#ffffff33)] bg-[var(--zui-slider-thumb-bg,#000000)] dark:bg-[var(--zui-slider-thumb-bg-dark,#ffffff)] shadow-md ring-offset-2 ring-offset-[var(--zui-slider-thumb-ring-offset,oklch(98.4%_0.003_247.858))] dark:ring-offset-[var(--zui-slider-thumb-ring-offset-dark,oklch(12.9%_0.042_264.695))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zui-slider-thumb-ring-focus,#00000066)] dark:focus-visible:ring-[var(--zui-slider-thumb-ring-focus-dark,#ffffff66)] disabled:pointer-events-none disabled:opacity-40";

export const zuiSliderThumbSizes = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
} as const;
