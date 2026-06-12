export const zuiProgressBase =
  "w-full text-[color:var(--zui-progress-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-progress-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]";

export const zuiProgressAppearances = {
  default:
    "[--progress-fill:var(--zui-progress-default-fill,var(--zui-brand,oklch(20.8%_0.042_265.755)))] dark:[--progress-fill:var(--zui-progress-default-fill-dark,var(--zui-brand-dark,oklch(98.4%_0.003_247.858)))]",
  secondary:
    "[--progress-fill:var(--zui-progress-secondary-fill,var(--zui-fg,oklch(44.6%_0.043_257.281)))] dark:[--progress-fill:var(--zui-progress-secondary-fill-dark,var(--zui-fg-dark,oklch(86.9%_0.022_252.894)))]",
  destructive:
    "[--progress-fill:var(--zui-progress-destructive-fill,var(--zui-status-error,oklch(45.5%_0.188_13.697)))] dark:[--progress-fill:var(--zui-progress-destructive-fill-dark,var(--zui-status-error-dark,oklch(71.2%_0.194_13.428)))]",
  emerald:
    "[--progress-fill:var(--zui-progress-emerald-fill,var(--zui-color-emerald,oklch(43.2%_0.095_166.913)))] dark:[--progress-fill:var(--zui-progress-emerald-fill-dark,var(--zui-color-emerald-dark,oklch(76.5%_0.177_163.223)))]",
  indigo:
    "[--progress-fill:var(--zui-progress-indigo-fill,var(--zui-color-indigo,oklch(39.8%_0.195_277.366)))] dark:[--progress-fill:var(--zui-progress-indigo-fill-dark,var(--zui-color-indigo-dark,oklch(67.3%_0.182_276.935)))]",
  purple:
    "[--progress-fill:var(--zui-progress-purple-fill,var(--zui-color-purple,oklch(43.8%_0.218_303.724)))] dark:[--progress-fill:var(--zui-progress-purple-fill-dark,var(--zui-color-purple-dark,oklch(71.4%_0.203_305.504)))]",
  pink: "[--progress-fill:var(--zui-progress-pink-fill,var(--zui-color-pink,oklch(45.9%_0.187_3.815)))] dark:[--progress-fill:var(--zui-progress-pink-fill-dark,var(--zui-color-pink-dark,oklch(71.8%_0.202_349.761)))]",
  rose: "[--progress-fill:var(--zui-progress-rose-fill,var(--zui-color-rose,oklch(45.5%_0.188_13.697)))] dark:[--progress-fill:var(--zui-progress-rose-fill-dark,var(--zui-color-rose-dark,oklch(71.2%_0.194_13.428)))]",
  sky: "[--progress-fill:var(--zui-progress-sky-fill,var(--zui-color-sky,oklch(44.3%_0.11_240.79)))] dark:[--progress-fill:var(--zui-progress-sky-fill-dark,var(--zui-color-sky-dark,oklch(74.6%_0.16_232.661)))]",
  teal: "[--progress-fill:var(--zui-progress-teal-fill,var(--zui-color-teal,oklch(43.7%_0.078_188.216)))] dark:[--progress-fill:var(--zui-progress-teal-fill-dark,var(--zui-color-teal-dark,oklch(77.7%_0.152_181.912)))]",
  yellow:
    "[--progress-fill:var(--zui-progress-yellow-fill,var(--zui-color-yellow,oklch(47.6%_0.114_61.907)))] dark:[--progress-fill:var(--zui-progress-yellow-fill-dark,var(--zui-color-yellow-dark,oklch(85.2%_0.199_91.936)))]",
  orange:
    "[--progress-fill:var(--zui-progress-orange-fill,var(--zui-color-orange,oklch(47%_0.157_37.304)))] dark:[--progress-fill:var(--zui-progress-orange-fill-dark,var(--zui-color-orange-dark,oklch(75%_0.183_55.934)))]",
  outline:
    "[--progress-fill:var(--zui-progress-outline-fill,var(--zui-fg,oklch(52%_0.105_223.128)))] dark:[--progress-fill:var(--zui-progress-outline-fill-dark,var(--zui-fg-dark,oklch(86.5%_0.127_207.078)))]",
  ghost:
    "[--progress-fill:var(--zui-progress-ghost-fill,var(--zui-fg,oklch(27.9%_0.041_260.031)))] dark:[--progress-fill:var(--zui-progress-ghost-fill-dark,var(--zui-fg-dark,oklch(92.9%_0.013_255.508)))]",
  glass:
    "[--progress-fill:var(--zui-progress-glass-fill,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:[--progress-fill:var(--zui-progress-glass-fill-dark,var(--zui-fg-dark,#ffffff))]",
  "gradient-blue":
    "[--progress-fill:var(--zui-progress-gradient-blue-fill,var(--zui-color-blue,linear-gradient(90deg,oklch(62.3%_0.214_259.815)),oklch(62.7%_0.265_303.9)))] dark:[--progress-fill:var(--zui-progress-gradient-blue-fill-dark,var(--zui-color-blue-dark,linear-gradient(90deg,oklch(62.3%_0.214_259.815)),oklch(62.7%_0.265_303.9)))]",
  "gradient-green":
    "[--progress-fill:var(--zui-progress-gradient-green-fill,var(--zui-color-green,linear-gradient(90deg,oklch(72.3%_0.219_149.579)),oklch(76.8%_0.233_130.85)))] dark:[--progress-fill:var(--zui-progress-gradient-green-fill-dark,var(--zui-color-green-dark,linear-gradient(90deg,oklch(72.3%_0.219_149.579)),oklch(76.8%_0.233_130.85)))]",
  "gradient-red":
    "[--progress-fill:var(--zui-progress-gradient-red-fill,var(--zui-color-red,linear-gradient(90deg,oklch(63.7%_0.237_25.331)),oklch(65.6%_0.241_354.308)))] dark:[--progress-fill:var(--zui-progress-gradient-red-fill-dark,var(--zui-color-red-dark,linear-gradient(90deg,oklch(63.7%_0.237_25.331)),oklch(65.6%_0.241_354.308)))]",
  "gradient-yellow":
    "[--progress-fill:var(--zui-progress-gradient-yellow-fill,var(--zui-color-yellow,linear-gradient(90deg,oklch(79.5%_0.184_86.047)),oklch(70.5%_0.213_47.604)))] dark:[--progress-fill:var(--zui-progress-gradient-yellow-fill-dark,var(--zui-color-yellow-dark,linear-gradient(90deg,oklch(79.5%_0.184_86.047)),oklch(70.5%_0.213_47.604)))]",
  "gradient-purple":
    "[--progress-fill:var(--zui-progress-gradient-purple-fill,var(--zui-color-purple,linear-gradient(90deg,oklch(62.7%_0.265_303.9)),oklch(65.6%_0.241_354.308)))] dark:[--progress-fill:var(--zui-progress-gradient-purple-fill-dark,var(--zui-color-purple-dark,linear-gradient(90deg,oklch(62.7%_0.265_303.9)),oklch(65.6%_0.241_354.308)))]",
  "gradient-teal":
    "[--progress-fill:var(--zui-progress-gradient-teal-fill,var(--zui-color-teal,linear-gradient(90deg,oklch(70.4%_0.14_182.503)),oklch(71.5%_0.143_215.221)))] dark:[--progress-fill:var(--zui-progress-gradient-teal-fill-dark,var(--zui-color-teal-dark,linear-gradient(90deg,oklch(70.4%_0.14_182.503)),oklch(71.5%_0.143_215.221)))]",
  "gradient-indigo":
    "[--progress-fill:var(--zui-progress-gradient-indigo-fill,var(--zui-color-indigo,linear-gradient(90deg,oklch(58.5%_0.233_277.117)),oklch(62.7%_0.265_303.9)))] dark:[--progress-fill:var(--zui-progress-gradient-indigo-fill-dark,var(--zui-color-indigo-dark,linear-gradient(90deg,oklch(58.5%_0.233_277.117)),oklch(62.7%_0.265_303.9)))]",
  "gradient-pink":
    "[--progress-fill:var(--zui-progress-gradient-pink-fill,var(--zui-color-pink,linear-gradient(90deg,oklch(65.6%_0.241_354.308)),oklch(64.5%_0.246_16.439)))] dark:[--progress-fill:var(--zui-progress-gradient-pink-fill-dark,var(--zui-color-pink-dark,linear-gradient(90deg,oklch(65.6%_0.241_354.308)),oklch(64.5%_0.246_16.439)))]",
  "gradient-orange":
    "[--progress-fill:var(--zui-progress-gradient-orange-fill,var(--zui-color-orange,linear-gradient(90deg,oklch(70.5%_0.213_47.604)),oklch(63.7%_0.237_25.331)))] dark:[--progress-fill:var(--zui-progress-gradient-orange-fill-dark,var(--zui-color-orange-dark,linear-gradient(90deg,oklch(70.5%_0.213_47.604)),oklch(63.7%_0.237_25.331)))]",
  blue: "[--progress-fill:var(--zui-progress-blue-fill,var(--zui-color-blue,#2563eb))] dark:[--progress-fill:var(--zui-progress-blue-fill-dark,var(--zui-color-blue-dark,#3b82f6))]",
  cyan: "[--progress-fill:var(--zui-progress-cyan-fill,var(--zui-color-cyan,#0891b2))] dark:[--progress-fill:var(--zui-progress-cyan-fill-dark,var(--zui-color-cyan-dark,#22d3ee))]",
  green:
    "[--progress-fill:var(--zui-progress-green-fill,var(--zui-color-green,#16a34a))] dark:[--progress-fill:var(--zui-progress-green-fill-dark,var(--zui-color-green-dark,#22c55e))]",
  lime: "[--progress-fill:var(--zui-progress-lime-fill,var(--zui-color-lime,#65a30d))] dark:[--progress-fill:var(--zui-progress-lime-fill-dark,var(--zui-color-lime-dark,#a3e635))]",
  mint: "[--progress-fill:var(--zui-progress-mint-fill,var(--zui-color-mint,#10b981))] dark:[--progress-fill:var(--zui-progress-mint-fill-dark,var(--zui-color-mint-dark,#6ee7b7))]",
  ocean:
    "[--progress-fill:var(--zui-progress-ocean-fill,var(--zui-color-ocean,#0284c7))] dark:[--progress-fill:var(--zui-progress-ocean-fill-dark,var(--zui-color-ocean-dark,#38bdf8))]",
  sapphire:
    "[--progress-fill:var(--zui-progress-sapphire-fill,var(--zui-color-sapphire,#1d4ed8))] dark:[--progress-fill:var(--zui-progress-sapphire-fill-dark,var(--zui-color-sapphire-dark,#60a5fa))]",
  lavender:
    "[--progress-fill:var(--zui-progress-lavender-fill,var(--zui-color-lavender,#8b5cf6))] dark:[--progress-fill:var(--zui-progress-lavender-fill-dark,var(--zui-color-lavender-dark,#a78bfa))]",
  ruby: "[--progress-fill:var(--zui-progress-ruby-fill,var(--zui-color-ruby,#be123c))] dark:[--progress-fill:var(--zui-progress-ruby-fill-dark,var(--zui-color-ruby-dark,#fb7185))]",
  red: "[--progress-fill:var(--zui-progress-red-fill,var(--zui-color-red,#dc2626))] dark:[--progress-fill:var(--zui-progress-red-fill-dark,var(--zui-color-red-dark,#ef4444))]",
  slate:
    "[--progress-fill:var(--zui-progress-slate-fill,var(--zui-color-slate,#475569))] dark:[--progress-fill:var(--zui-progress-slate-fill-dark,var(--zui-color-slate-dark,#64748b))]",
  zinc: "[--progress-fill:var(--zui-progress-zinc-fill,var(--zui-color-zinc,#52525b))] dark:[--progress-fill:var(--zui-progress-zinc-fill-dark,var(--zui-color-zinc-dark,#71717a))]",
  stone:
    "[--progress-fill:var(--zui-progress-stone-fill,var(--zui-color-stone,#57534e))] dark:[--progress-fill:var(--zui-progress-stone-fill-dark,var(--zui-color-stone-dark,#78716c))]",
  royal:
    "[--progress-fill:var(--zui-progress-royal-fill,var(--zui-color-royal,#4338ca))] dark:[--progress-fill:var(--zui-progress-royal-fill-dark,var(--zui-color-royal-dark,#818cf8))]",
  electric:
    "[--progress-fill:var(--zui-progress-electric-fill,var(--zui-color-electric,#0ea5e9))] dark:[--progress-fill:var(--zui-progress-electric-fill-dark,var(--zui-color-electric-dark,#38bdf8))]",
  forest:
    "[--progress-fill:var(--zui-progress-forest-fill,var(--zui-color-forest,#166534))] dark:[--progress-fill:var(--zui-progress-forest-fill-dark,var(--zui-color-forest-dark,#4ade80))]",
  sunset:
    "[--progress-fill:var(--zui-progress-sunset-fill,var(--zui-color-sunset,#ea580c))] dark:[--progress-fill:var(--zui-progress-sunset-fill-dark,var(--zui-color-sunset-dark,#fb923c))]",
  magenta:
    "[--progress-fill:var(--zui-progress-magenta-fill,var(--zui-color-magenta,#c026d3))] dark:[--progress-fill:var(--zui-progress-magenta-fill-dark,var(--zui-color-magenta-dark,#e879f9))]",
  crimson:
    "[--progress-fill:var(--zui-progress-crimson-fill,var(--zui-color-crimson,#b91c1c))] dark:[--progress-fill:var(--zui-progress-crimson-fill-dark,var(--zui-color-crimson-dark,#f87171))]",
  aqua: "[--progress-fill:var(--zui-progress-aqua-fill,var(--zui-color-aqua,#0f766e))] dark:[--progress-fill:var(--zui-progress-aqua-fill-dark,var(--zui-color-aqua-dark,#2dd4bf))]",
  plum: "[--progress-fill:var(--zui-progress-plum-fill,var(--zui-color-plum,#7e22ce))] dark:[--progress-fill:var(--zui-progress-plum-fill-dark,var(--zui-color-plum-dark,#c084fc))]",
} as const;

export const zuiProgressSizes = {
  xs: "text-[0.65rem]",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
} as const;

export const zuiProgressShapes = {
  flat: "rounded-none",
  rounded: "rounded-md",
  pill: "rounded-full",
} as const;

export const zuiProgressBoolean = {
  true: "",
  false: "",
} as const;

export const zuiProgressTrackBase =
  "relative w-full overflow-hidden bg-[var(--zui-progress-track-bg,var(--zui-surface-muted,#0000001a))] dark:bg-[var(--zui-progress-track-bg-dark,var(--zui-surface-muted-dark,#ffffff1a))]";

export const zuiProgressTrackSizes = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
  xl: "h-4",
} as const;

export const zuiProgressBarBase = "h-full w-full origin-left rounded-[inherit]";

export const zuiProgressBarStriped = {
  true: "[background:var(--zui-progress-bar-bg-striped,repeating-linear-gradient(135deg,rgba(255,255,255,0.28)_0,rgba(255,255,255,0.28)_10px,transparent_10px,transparent_20px)),var(--progress-fill)] dark:[background:var(--zui-progress-bar-bg-striped-dark,repeating-linear-gradient(135deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_10px,transparent_10px,transparent_20px)),var(--progress-fill)]",
  false: "[background:var(--progress-fill)]",
} as const;
