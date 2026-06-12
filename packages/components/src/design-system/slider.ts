export const zuiSliderRootBase = "w-full select-none touch-none";

export const zuiSliderRootSizes = {
  sm: "py-2",
  md: "py-2.5",
  lg: "py-3",
} as const;

export const zuiSliderTrackBase =
  "relative h-2 w-full shrink-0 overflow-hidden rounded-full bg-[var(--zui-slider-track-bg,var(--zui-surface-soft,#0000001a))] dark:bg-[var(--zui-slider-track-bg-dark,var(--zui-surface-soft-dark,#ffffff1a))]";

export const zuiSliderTrackSizes = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-2.5",
} as const;

export const zuiSliderRangeBase = "absolute h-full rounded-full bg-linear-to-r";

export const zuiSliderRangeAppearances = {
  default:
    "from-[var(--zui-slider-range-default-from,var(--zui-brand,oklch(60.6%_0.25_292.717)))] dark:from-[var(--zui-slider-range-default-from-dark,var(--zui-brand-dark,oklch(60.6%_0.25_292.717)))] to-[var(--zui-slider-range-default-to,var(--zui-brand-hover,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-default-to-dark,var(--zui-brand-hover-dark,oklch(67.3%_0.182_276.935)))]",
  sky: "from-[var(--zui-slider-range-sky-from,var(--zui-color-sky,oklch(68.5%_0.169_237.323)))] dark:from-[var(--zui-slider-range-sky-from-dark,var(--zui-color-sky-dark,oklch(68.5%_0.169_237.323)))] to-[var(--zui-slider-range-sky-to,var(--zui-color-sky,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-sky-to-dark,var(--zui-color-sky-dark,oklch(67.3%_0.182_276.935)))]",
  rose: "from-[var(--zui-slider-range-rose-from,var(--zui-color-rose,oklch(64.5%_0.246_16.439)))] dark:from-[var(--zui-slider-range-rose-from-dark,var(--zui-color-rose-dark,oklch(64.5%_0.246_16.439)))] to-[var(--zui-slider-range-rose-to,var(--zui-color-rose,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-rose-to-dark,var(--zui-color-rose-dark,oklch(67.3%_0.182_276.935)))]",
  purple:
    "from-[var(--zui-slider-range-purple-from,var(--zui-color-purple,oklch(62.7%_0.265_303.9)))] dark:from-[var(--zui-slider-range-purple-from-dark,var(--zui-color-purple-dark,oklch(62.7%_0.265_303.9)))] to-[var(--zui-slider-range-purple-to,var(--zui-color-purple,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-purple-to-dark,var(--zui-color-purple-dark,oklch(67.3%_0.182_276.935)))]",
  pink: "from-[var(--zui-slider-range-pink-from,var(--zui-color-pink,oklch(65.6%_0.241_354.308)))] dark:from-[var(--zui-slider-range-pink-from-dark,var(--zui-color-pink-dark,oklch(65.6%_0.241_354.308)))] to-[var(--zui-slider-range-pink-to,var(--zui-color-pink,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-pink-to-dark,var(--zui-color-pink-dark,oklch(67.3%_0.182_276.935)))]",
  orange:
    "from-[var(--zui-slider-range-orange-from,var(--zui-color-orange,oklch(70.5%_0.213_47.604)))] dark:from-[var(--zui-slider-range-orange-from-dark,var(--zui-color-orange-dark,oklch(70.5%_0.213_47.604)))] to-[var(--zui-slider-range-orange-to,var(--zui-color-orange,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-orange-to-dark,var(--zui-color-orange-dark,oklch(67.3%_0.182_276.935)))]",
  yellow:
    "from-[var(--zui-slider-range-yellow-from,var(--zui-color-yellow,oklch(79.5%_0.184_86.047)))] dark:from-[var(--zui-slider-range-yellow-from-dark,var(--zui-color-yellow-dark,oklch(79.5%_0.184_86.047)))] to-[var(--zui-slider-range-yellow-to,var(--zui-color-yellow,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-yellow-to-dark,var(--zui-color-yellow-dark,oklch(67.3%_0.182_276.935)))]",
  teal: "from-[var(--zui-slider-range-teal-from,var(--zui-color-teal,oklch(70.4%_0.14_182.503)))] dark:from-[var(--zui-slider-range-teal-from-dark,var(--zui-color-teal-dark,oklch(70.4%_0.14_182.503)))] to-[var(--zui-slider-range-teal-to,var(--zui-color-teal,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-teal-to-dark,var(--zui-color-teal-dark,oklch(67.3%_0.182_276.935)))]",
  indigo:
    "from-[var(--zui-slider-range-indigo-from,var(--zui-color-indigo,oklch(58.5%_0.233_277.117)))] dark:from-[var(--zui-slider-range-indigo-from-dark,var(--zui-color-indigo-dark,oklch(58.5%_0.233_277.117)))] to-[var(--zui-slider-range-indigo-to,var(--zui-color-indigo,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-indigo-to-dark,var(--zui-color-indigo-dark,oklch(67.3%_0.182_276.935)))]",
  emerald:
    "from-[var(--zui-slider-range-emerald-from,var(--zui-color-emerald,oklch(69.6%_0.17_162.48)))] dark:from-[var(--zui-slider-range-emerald-from-dark,var(--zui-color-emerald-dark,oklch(69.6%_0.17_162.48)))] to-[var(--zui-slider-range-emerald-to,var(--zui-color-emerald,oklch(60%_0.118_184.704)))] dark:to-[var(--zui-slider-range-emerald-to-dark,var(--zui-color-emerald-dark,oklch(77.7%_0.152_181.912)))]",
  amber:
    "from-[var(--zui-slider-range-amber-from,var(--zui-color-amber,oklch(76.9%_0.188_70.08)))] dark:from-[var(--zui-slider-range-amber-from-dark,var(--zui-color-amber-dark,oklch(76.9%_0.188_70.08)))] to-[var(--zui-slider-range-amber-to,var(--zui-color-amber,oklch(64.6%_0.222_41.116)))] dark:to-[var(--zui-slider-range-amber-to-dark,var(--zui-color-amber-dark,oklch(75%_0.183_55.934)))]",
  gray: "from-[var(--zui-slider-range-gray-from,var(--zui-color-gray,oklch(55.1%_0.027_264.364)))] dark:from-[var(--zui-slider-range-gray-from-dark,var(--zui-color-gray-dark,oklch(55.1%_0.027_264.364)))] to-[var(--zui-slider-range-gray-to,var(--zui-color-gray,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-gray-to-dark,var(--zui-color-gray-dark,oklch(67.3%_0.182_276.935)))]",
  violet:
    "from-[var(--zui-slider-range-violet-from,var(--zui-color-violet,oklch(60.6%_0.25_292.717)))] dark:from-[var(--zui-slider-range-violet-from-dark,var(--zui-color-violet-dark,oklch(60.6%_0.25_292.717)))] to-[var(--zui-slider-range-violet-to,var(--zui-color-violet,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-violet-to-dark,var(--zui-color-violet-dark,oklch(67.3%_0.182_276.935)))]",
  "gradient-blue":
    "from-[var(--zui-slider-range-gradient-blue-from,var(--zui-color-blue,oklch(62.3%_0.214_259.815)))] dark:from-[var(--zui-slider-range-gradient-blue-from-dark,var(--zui-color-blue-dark,oklch(62.3%_0.214_259.815)))] to-[var(--zui-slider-range-gradient-blue-to,var(--zui-color-purple,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-gradient-blue-to-dark,var(--zui-color-purple-dark,oklch(67.3%_0.182_276.935)))]",
  "gradient-green":
    "from-[var(--zui-slider-range-gradient-green-from,var(--zui-color-green,oklch(72.3%_0.219_149.579)))] dark:from-[var(--zui-slider-range-gradient-green-from-dark,var(--zui-color-green-dark,oklch(72.3%_0.219_149.579)))] to-[var(--zui-slider-range-gradient-green-to,var(--zui-color-lime,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-gradient-green-to-dark,var(--zui-color-lime-dark,oklch(67.3%_0.182_276.935)))]",
  "gradient-red":
    "from-[var(--zui-slider-range-gradient-red-from,var(--zui-color-red,oklch(63.7%_0.237_25.331)))] dark:from-[var(--zui-slider-range-gradient-red-from-dark,var(--zui-color-red-dark,oklch(63.7%_0.237_25.331)))] to-[var(--zui-slider-range-gradient-red-to,var(--zui-color-pink,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-gradient-red-to-dark,var(--zui-color-pink-dark,oklch(67.3%_0.182_276.935)))]",
  "gradient-yellow":
    "from-[var(--zui-slider-range-gradient-yellow-from,var(--zui-color-yellow,oklch(79.5%_0.184_86.047)))] dark:from-[var(--zui-slider-range-gradient-yellow-from-dark,var(--zui-color-yellow-dark,oklch(79.5%_0.184_86.047)))] to-[var(--zui-slider-range-gradient-yellow-to,var(--zui-color-orange,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-gradient-yellow-to-dark,var(--zui-color-orange-dark,oklch(67.3%_0.182_276.935)))]",
  "gradient-purple":
    "from-[var(--zui-slider-range-gradient-purple-from,var(--zui-color-purple,oklch(62.7%_0.265_303.9)))] dark:from-[var(--zui-slider-range-gradient-purple-from-dark,var(--zui-color-purple-dark,oklch(62.7%_0.265_303.9)))] to-[var(--zui-slider-range-gradient-purple-to,var(--zui-color-pink,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-gradient-purple-to-dark,var(--zui-color-pink-dark,oklch(67.3%_0.182_276.935)))]",
  "gradient-teal":
    "from-[var(--zui-slider-range-gradient-teal-from,var(--zui-color-teal,oklch(70.4%_0.14_182.503)))] dark:from-[var(--zui-slider-range-gradient-teal-from-dark,var(--zui-color-teal-dark,oklch(70.4%_0.14_182.503)))] to-[var(--zui-slider-range-gradient-teal-to,var(--zui-color-cyan,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-gradient-teal-to-dark,var(--zui-color-cyan-dark,oklch(67.3%_0.182_276.935)))]",
  "gradient-indigo":
    "from-[var(--zui-slider-range-gradient-indigo-from,var(--zui-color-indigo,oklch(58.5%_0.233_277.117)))] dark:from-[var(--zui-slider-range-gradient-indigo-from-dark,var(--zui-color-indigo-dark,oklch(58.5%_0.233_277.117)))] to-[var(--zui-slider-range-gradient-indigo-to,var(--zui-color-purple,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-gradient-indigo-to-dark,var(--zui-color-purple-dark,oklch(67.3%_0.182_276.935)))]",
  "gradient-pink":
    "from-[var(--zui-slider-range-gradient-pink-from,var(--zui-color-pink,oklch(65.6%_0.241_354.308)))] dark:from-[var(--zui-slider-range-gradient-pink-from-dark,var(--zui-color-pink-dark,oklch(65.6%_0.241_354.308)))] to-[var(--zui-slider-range-gradient-pink-to,var(--zui-color-rose,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-gradient-pink-to-dark,var(--zui-color-rose-dark,oklch(67.3%_0.182_276.935)))]",
  "gradient-orange":
    "from-[var(--zui-slider-range-gradient-orange-from,var(--zui-color-orange,oklch(70.5%_0.213_47.604)))] dark:from-[var(--zui-slider-range-gradient-orange-from-dark,var(--zui-color-orange-dark,oklch(70.5%_0.213_47.604)))] to-[var(--zui-slider-range-gradient-orange-to,var(--zui-color-red,oklch(51.1%_0.262_276.966)))] dark:to-[var(--zui-slider-range-gradient-orange-to-dark,var(--zui-color-red-dark,oklch(67.3%_0.182_276.935)))]",
  blue: "from-[var(--zui-slider-range-blue-from,var(--zui-color-blue,#2563eb))] dark:from-[var(--zui-slider-range-blue-from-dark,var(--zui-color-blue-dark,#3b82f6))] to-[var(--zui-slider-range-blue-to,var(--zui-color-blue,#2563eb))] dark:to-[var(--zui-slider-range-blue-to-dark,var(--zui-color-blue-dark,#3b82f6))]",
  cyan: "from-[var(--zui-slider-range-cyan-from,var(--zui-color-cyan,#0891b2))] dark:from-[var(--zui-slider-range-cyan-from-dark,var(--zui-color-cyan-dark,#22d3ee))] to-[var(--zui-slider-range-cyan-to,var(--zui-color-cyan,#0891b2))] dark:to-[var(--zui-slider-range-cyan-to-dark,var(--zui-color-cyan-dark,#22d3ee))]",
  green:
    "from-[var(--zui-slider-range-green-from,var(--zui-color-green,#16a34a))] dark:from-[var(--zui-slider-range-green-from-dark,var(--zui-color-green-dark,#22c55e))] to-[var(--zui-slider-range-green-to,var(--zui-color-green,#16a34a))] dark:to-[var(--zui-slider-range-green-to-dark,var(--zui-color-green-dark,#22c55e))]",
  lime: "from-[var(--zui-slider-range-lime-from,var(--zui-color-lime,#65a30d))] dark:from-[var(--zui-slider-range-lime-from-dark,var(--zui-color-lime-dark,#a3e635))] to-[var(--zui-slider-range-lime-to,var(--zui-color-lime,#65a30d))] dark:to-[var(--zui-slider-range-lime-to-dark,var(--zui-color-lime-dark,#a3e635))]",
  mint: "from-[var(--zui-slider-range-mint-from,var(--zui-color-mint,#10b981))] dark:from-[var(--zui-slider-range-mint-from-dark,var(--zui-color-mint-dark,#6ee7b7))] to-[var(--zui-slider-range-mint-to,var(--zui-color-mint,#10b981))] dark:to-[var(--zui-slider-range-mint-to-dark,var(--zui-color-mint-dark,#6ee7b7))]",
  ocean:
    "from-[var(--zui-slider-range-ocean-from,var(--zui-color-ocean,#0284c7))] dark:from-[var(--zui-slider-range-ocean-from-dark,var(--zui-color-ocean-dark,#38bdf8))] to-[var(--zui-slider-range-ocean-to,var(--zui-color-ocean,#0284c7))] dark:to-[var(--zui-slider-range-ocean-to-dark,var(--zui-color-ocean-dark,#38bdf8))]",
  sapphire:
    "from-[var(--zui-slider-range-sapphire-from,var(--zui-color-sapphire,#1d4ed8))] dark:from-[var(--zui-slider-range-sapphire-from-dark,var(--zui-color-sapphire-dark,#60a5fa))] to-[var(--zui-slider-range-sapphire-to,var(--zui-color-sapphire,#1d4ed8))] dark:to-[var(--zui-slider-range-sapphire-to-dark,var(--zui-color-sapphire-dark,#60a5fa))]",
  lavender:
    "from-[var(--zui-slider-range-lavender-from,var(--zui-color-lavender,#8b5cf6))] dark:from-[var(--zui-slider-range-lavender-from-dark,var(--zui-color-lavender-dark,#a78bfa))] to-[var(--zui-slider-range-lavender-to,var(--zui-color-lavender,#8b5cf6))] dark:to-[var(--zui-slider-range-lavender-to-dark,var(--zui-color-lavender-dark,#a78bfa))]",
  ruby: "from-[var(--zui-slider-range-ruby-from,var(--zui-color-ruby,#be123c))] dark:from-[var(--zui-slider-range-ruby-from-dark,var(--zui-color-ruby-dark,#fb7185))] to-[var(--zui-slider-range-ruby-to,var(--zui-color-ruby,#be123c))] dark:to-[var(--zui-slider-range-ruby-to-dark,var(--zui-color-ruby-dark,#fb7185))]",
  red: "from-[var(--zui-slider-range-red-from,var(--zui-color-red,#dc2626))] dark:from-[var(--zui-slider-range-red-from-dark,var(--zui-color-red-dark,#ef4444))] to-[var(--zui-slider-range-red-to,var(--zui-color-red,#dc2626))] dark:to-[var(--zui-slider-range-red-to-dark,var(--zui-color-red-dark,#ef4444))]",
  slate:
    "from-[var(--zui-slider-range-slate-from,var(--zui-color-slate,#475569))] dark:from-[var(--zui-slider-range-slate-from-dark,var(--zui-color-slate-dark,#64748b))] to-[var(--zui-slider-range-slate-to,var(--zui-color-slate,#475569))] dark:to-[var(--zui-slider-range-slate-to-dark,var(--zui-color-slate-dark,#64748b))]",
  zinc: "from-[var(--zui-slider-range-zinc-from,var(--zui-color-zinc,#52525b))] dark:from-[var(--zui-slider-range-zinc-from-dark,var(--zui-color-zinc-dark,#71717a))] to-[var(--zui-slider-range-zinc-to,var(--zui-color-zinc,#52525b))] dark:to-[var(--zui-slider-range-zinc-to-dark,var(--zui-color-zinc-dark,#71717a))]",
  stone:
    "from-[var(--zui-slider-range-stone-from,var(--zui-color-stone,#57534e))] dark:from-[var(--zui-slider-range-stone-from-dark,var(--zui-color-stone-dark,#78716c))] to-[var(--zui-slider-range-stone-to,var(--zui-color-stone,#57534e))] dark:to-[var(--zui-slider-range-stone-to-dark,var(--zui-color-stone-dark,#78716c))]",
  royal:
    "from-[var(--zui-slider-range-royal-from,var(--zui-color-royal,#4338ca))] dark:from-[var(--zui-slider-range-royal-from-dark,var(--zui-color-royal-dark,#818cf8))] to-[var(--zui-slider-range-royal-to,var(--zui-color-royal,#4338ca))] dark:to-[var(--zui-slider-range-royal-to-dark,var(--zui-color-royal-dark,#818cf8))]",
  electric:
    "from-[var(--zui-slider-range-electric-from,var(--zui-color-electric,#0ea5e9))] dark:from-[var(--zui-slider-range-electric-from-dark,var(--zui-color-electric-dark,#38bdf8))] to-[var(--zui-slider-range-electric-to,var(--zui-color-electric,#0ea5e9))] dark:to-[var(--zui-slider-range-electric-to-dark,var(--zui-color-electric-dark,#38bdf8))]",
  forest:
    "from-[var(--zui-slider-range-forest-from,var(--zui-color-forest,#166534))] dark:from-[var(--zui-slider-range-forest-from-dark,var(--zui-color-forest-dark,#4ade80))] to-[var(--zui-slider-range-forest-to,var(--zui-color-forest,#166534))] dark:to-[var(--zui-slider-range-forest-to-dark,var(--zui-color-forest-dark,#4ade80))]",
  sunset:
    "from-[var(--zui-slider-range-sunset-from,var(--zui-color-sunset,#ea580c))] dark:from-[var(--zui-slider-range-sunset-from-dark,var(--zui-color-sunset-dark,#fb923c))] to-[var(--zui-slider-range-sunset-to,var(--zui-color-sunset,#ea580c))] dark:to-[var(--zui-slider-range-sunset-to-dark,var(--zui-color-sunset-dark,#fb923c))]",
  magenta:
    "from-[var(--zui-slider-range-magenta-from,var(--zui-color-magenta,#c026d3))] dark:from-[var(--zui-slider-range-magenta-from-dark,var(--zui-color-magenta-dark,#e879f9))] to-[var(--zui-slider-range-magenta-to,var(--zui-color-magenta,#c026d3))] dark:to-[var(--zui-slider-range-magenta-to-dark,var(--zui-color-magenta-dark,#e879f9))]",
  crimson:
    "from-[var(--zui-slider-range-crimson-from,var(--zui-color-crimson,#b91c1c))] dark:from-[var(--zui-slider-range-crimson-from-dark,var(--zui-color-crimson-dark,#f87171))] to-[var(--zui-slider-range-crimson-to,var(--zui-color-crimson,#b91c1c))] dark:to-[var(--zui-slider-range-crimson-to-dark,var(--zui-color-crimson-dark,#f87171))]",
  aqua: "from-[var(--zui-slider-range-aqua-from,var(--zui-color-aqua,#0f766e))] dark:from-[var(--zui-slider-range-aqua-from-dark,var(--zui-color-aqua-dark,#2dd4bf))] to-[var(--zui-slider-range-aqua-to,var(--zui-color-aqua,#0f766e))] dark:to-[var(--zui-slider-range-aqua-to-dark,var(--zui-color-aqua-dark,#2dd4bf))]",
  plum: "from-[var(--zui-slider-range-plum-from,var(--zui-color-plum,#7e22ce))] dark:from-[var(--zui-slider-range-plum-from-dark,var(--zui-color-plum-dark,#c084fc))] to-[var(--zui-slider-range-plum-to,var(--zui-color-plum,#7e22ce))] dark:to-[var(--zui-slider-range-plum-to-dark,var(--zui-color-plum-dark,#c084fc))]",
} as const;

export const zuiSliderThumbBase =
  "block size-4 rounded-full border border-[color:var(--zui-slider-thumb-border,var(--zui-border,#00000033))] dark:border-[color:var(--zui-slider-thumb-border-dark,var(--zui-border-dark,#ffffff33))] bg-[var(--zui-slider-thumb-bg,var(--zui-surface-muted,#000000))] dark:bg-[var(--zui-slider-thumb-bg-dark,var(--zui-surface-muted-dark,#ffffff))] shadow-[var(--zui-slider-thumb-shadow,var(--zui-shadow,0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)))] dark:shadow-[var(--zui-slider-thumb-shadow-dark,var(--zui-shadow-dark,0_4px_6px_-1px_rgb(0_0_0_/_0.35),0_2px_4px_-2px_rgb(0_0_0_/_0.28)))] ring-offset-2 ring-offset-[var(--zui-slider-thumb-ring-offset,var(--zui-ring-offset,oklch(98.4%_0.003_247.858)))] dark:ring-offset-[var(--zui-slider-thumb-ring-offset-dark,var(--zui-ring-offset-dark,oklch(12.9%_0.042_264.695)))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zui-slider-thumb-ring-focus,var(--zui-focus-ring,#00000066))] dark:focus-visible:ring-[var(--zui-slider-thumb-ring-focus-dark,var(--zui-focus-ring-dark,#ffffff66))] disabled:pointer-events-none disabled:opacity-40";

export const zuiSliderThumbSizes = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
} as const;
