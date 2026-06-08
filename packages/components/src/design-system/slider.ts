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

export const zuiSliderRangeBase = "absolute h-full rounded-full bg-linear-to-r";

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
  blue: "from-[var(--zui-slider-range-blue-from,#2563eb)] dark:from-[var(--zui-slider-range-blue-from-dark,#3b82f6)] to-[var(--zui-slider-range-blue-to,#2563eb)] dark:to-[var(--zui-slider-range-blue-to-dark,#3b82f6)]",
  cyan: "from-[var(--zui-slider-range-cyan-from,#0891b2)] dark:from-[var(--zui-slider-range-cyan-from-dark,#22d3ee)] to-[var(--zui-slider-range-cyan-to,#0891b2)] dark:to-[var(--zui-slider-range-cyan-to-dark,#22d3ee)]",
  green:
    "from-[var(--zui-slider-range-green-from,#16a34a)] dark:from-[var(--zui-slider-range-green-from-dark,#22c55e)] to-[var(--zui-slider-range-green-to,#16a34a)] dark:to-[var(--zui-slider-range-green-to-dark,#22c55e)]",
  lime: "from-[var(--zui-slider-range-lime-from,#65a30d)] dark:from-[var(--zui-slider-range-lime-from-dark,#a3e635)] to-[var(--zui-slider-range-lime-to,#65a30d)] dark:to-[var(--zui-slider-range-lime-to-dark,#a3e635)]",
  mint: "from-[var(--zui-slider-range-mint-from,#10b981)] dark:from-[var(--zui-slider-range-mint-from-dark,#6ee7b7)] to-[var(--zui-slider-range-mint-to,#10b981)] dark:to-[var(--zui-slider-range-mint-to-dark,#6ee7b7)]",
  ocean:
    "from-[var(--zui-slider-range-ocean-from,#0284c7)] dark:from-[var(--zui-slider-range-ocean-from-dark,#38bdf8)] to-[var(--zui-slider-range-ocean-to,#0284c7)] dark:to-[var(--zui-slider-range-ocean-to-dark,#38bdf8)]",
  sapphire:
    "from-[var(--zui-slider-range-sapphire-from,#1d4ed8)] dark:from-[var(--zui-slider-range-sapphire-from-dark,#60a5fa)] to-[var(--zui-slider-range-sapphire-to,#1d4ed8)] dark:to-[var(--zui-slider-range-sapphire-to-dark,#60a5fa)]",
  lavender:
    "from-[var(--zui-slider-range-lavender-from,#8b5cf6)] dark:from-[var(--zui-slider-range-lavender-from-dark,#a78bfa)] to-[var(--zui-slider-range-lavender-to,#8b5cf6)] dark:to-[var(--zui-slider-range-lavender-to-dark,#a78bfa)]",
  ruby: "from-[var(--zui-slider-range-ruby-from,#be123c)] dark:from-[var(--zui-slider-range-ruby-from-dark,#fb7185)] to-[var(--zui-slider-range-ruby-to,#be123c)] dark:to-[var(--zui-slider-range-ruby-to-dark,#fb7185)]",
  red: "from-[var(--zui-slider-range-red-from,#dc2626)] dark:from-[var(--zui-slider-range-red-from-dark,#ef4444)] to-[var(--zui-slider-range-red-to,#dc2626)] dark:to-[var(--zui-slider-range-red-to-dark,#ef4444)]",
  slate:
    "from-[var(--zui-slider-range-slate-from,#475569)] dark:from-[var(--zui-slider-range-slate-from-dark,#64748b)] to-[var(--zui-slider-range-slate-to,#475569)] dark:to-[var(--zui-slider-range-slate-to-dark,#64748b)]",
  zinc: "from-[var(--zui-slider-range-zinc-from,#52525b)] dark:from-[var(--zui-slider-range-zinc-from-dark,#71717a)] to-[var(--zui-slider-range-zinc-to,#52525b)] dark:to-[var(--zui-slider-range-zinc-to-dark,#71717a)]",
  stone:
    "from-[var(--zui-slider-range-stone-from,#57534e)] dark:from-[var(--zui-slider-range-stone-from-dark,#78716c)] to-[var(--zui-slider-range-stone-to,#57534e)] dark:to-[var(--zui-slider-range-stone-to-dark,#78716c)]",
  royal:
    "from-[var(--zui-slider-range-royal-from,#4338ca)] dark:from-[var(--zui-slider-range-royal-from-dark,#818cf8)] to-[var(--zui-slider-range-royal-to,#4338ca)] dark:to-[var(--zui-slider-range-royal-to-dark,#818cf8)]",
  electric:
    "from-[var(--zui-slider-range-electric-from,#0ea5e9)] dark:from-[var(--zui-slider-range-electric-from-dark,#38bdf8)] to-[var(--zui-slider-range-electric-to,#0ea5e9)] dark:to-[var(--zui-slider-range-electric-to-dark,#38bdf8)]",
  forest:
    "from-[var(--zui-slider-range-forest-from,#166534)] dark:from-[var(--zui-slider-range-forest-from-dark,#4ade80)] to-[var(--zui-slider-range-forest-to,#166534)] dark:to-[var(--zui-slider-range-forest-to-dark,#4ade80)]",
  sunset:
    "from-[var(--zui-slider-range-sunset-from,#ea580c)] dark:from-[var(--zui-slider-range-sunset-from-dark,#fb923c)] to-[var(--zui-slider-range-sunset-to,#ea580c)] dark:to-[var(--zui-slider-range-sunset-to-dark,#fb923c)]",
  magenta:
    "from-[var(--zui-slider-range-magenta-from,#c026d3)] dark:from-[var(--zui-slider-range-magenta-from-dark,#e879f9)] to-[var(--zui-slider-range-magenta-to,#c026d3)] dark:to-[var(--zui-slider-range-magenta-to-dark,#e879f9)]",
  crimson:
    "from-[var(--zui-slider-range-crimson-from,#b91c1c)] dark:from-[var(--zui-slider-range-crimson-from-dark,#f87171)] to-[var(--zui-slider-range-crimson-to,#b91c1c)] dark:to-[var(--zui-slider-range-crimson-to-dark,#f87171)]",
  aqua: "from-[var(--zui-slider-range-aqua-from,#0f766e)] dark:from-[var(--zui-slider-range-aqua-from-dark,#2dd4bf)] to-[var(--zui-slider-range-aqua-to,#0f766e)] dark:to-[var(--zui-slider-range-aqua-to-dark,#2dd4bf)]",
  plum: "from-[var(--zui-slider-range-plum-from,#7e22ce)] dark:from-[var(--zui-slider-range-plum-from-dark,#c084fc)] to-[var(--zui-slider-range-plum-to,#7e22ce)] dark:to-[var(--zui-slider-range-plum-to-dark,#c084fc)]",
} as const;

export const zuiSliderThumbBase =
  "block size-4 rounded-full border border-[color:var(--zui-slider-thumb-border,#00000033)] dark:border-[color:var(--zui-slider-thumb-border-dark,#ffffff33)] bg-[var(--zui-slider-thumb-bg,#000000)] dark:bg-[var(--zui-slider-thumb-bg-dark,#ffffff)] shadow-md ring-offset-2 ring-offset-[var(--zui-slider-thumb-ring-offset,oklch(98.4%_0.003_247.858))] dark:ring-offset-[var(--zui-slider-thumb-ring-offset-dark,oklch(12.9%_0.042_264.695))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zui-slider-thumb-ring-focus,#00000066)] dark:focus-visible:ring-[var(--zui-slider-thumb-ring-focus-dark,#ffffff66)] disabled:pointer-events-none disabled:opacity-40";

export const zuiSliderThumbSizes = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
} as const;
