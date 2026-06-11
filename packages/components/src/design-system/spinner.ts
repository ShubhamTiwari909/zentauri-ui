export const zuiSpinnerBase = "inline-flex items-center justify-center";

export const zuiSpinnerAppearances = {
  default:
    "text-[color:var(--zui-spinner-default-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-spinner-default-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
  secondary:
    "text-[color:var(--zui-spinner-secondary-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-spinner-secondary-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]",
  destructive:
    "text-[color:var(--zui-spinner-destructive-fg,var(--zui-status-error,oklch(58.6%_0.253_17.585)))] dark:text-[color:var(--zui-spinner-destructive-fg-dark,var(--zui-status-error-dark,oklch(71.2%_0.194_13.428)))]",
  ghost:
    "text-[color:var(--zui-spinner-ghost-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-spinner-ghost-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]",
  emerald:
    "text-[color:var(--zui-spinner-emerald-fg,var(--zui-color-emerald,oklch(59.6%_0.145_163.225)))] dark:text-[color:var(--zui-spinner-emerald-fg-dark,var(--zui-color-emerald-dark,oklch(76.5%_0.177_163.223)))]",
  indigo:
    "text-[color:var(--zui-spinner-indigo-fg,var(--zui-color-indigo,oklch(51.1%_0.262_276.966)))] dark:text-[color:var(--zui-spinner-indigo-fg-dark,var(--zui-color-indigo-dark,oklch(67.3%_0.182_276.935)))]",
  purple:
    "text-[color:var(--zui-spinner-purple-fg,var(--zui-color-purple,oklch(55.8%_0.288_302.321)))] dark:text-[color:var(--zui-spinner-purple-fg-dark,var(--zui-color-purple-dark,oklch(71.4%_0.203_305.504)))]",
  pink: "text-[color:var(--zui-spinner-pink-fg,var(--zui-color-pink,oklch(59.2%_0.249_0.584)))] dark:text-[color:var(--zui-spinner-pink-fg-dark,var(--zui-color-pink-dark,oklch(71.8%_0.202_349.761)))]",
  rose: "text-[color:var(--zui-spinner-rose-fg,var(--zui-color-rose,oklch(58.6%_0.253_17.585)))] dark:text-[color:var(--zui-spinner-rose-fg-dark,var(--zui-color-rose-dark,oklch(71.2%_0.194_13.428)))]",
  sky: "text-[color:var(--zui-spinner-sky-fg,var(--zui-color-sky,oklch(58.8%_0.158_241.966)))] dark:text-[color:var(--zui-spinner-sky-fg-dark,var(--zui-color-sky-dark,oklch(74.6%_0.16_232.661)))]",
  teal: "text-[color:var(--zui-spinner-teal-fg,var(--zui-color-teal,oklch(60%_0.118_184.704)))] dark:text-[color:var(--zui-spinner-teal-fg-dark,var(--zui-color-teal-dark,oklch(77.7%_0.152_181.912)))]",
  yellow:
    "text-[color:var(--zui-spinner-yellow-fg,var(--zui-color-yellow,oklch(68.1%_0.162_75.834)))] dark:text-[color:var(--zui-spinner-yellow-fg-dark,var(--zui-color-yellow-dark,oklch(85.2%_0.199_91.936)))]",
  orange:
    "text-[color:var(--zui-spinner-orange-fg,var(--zui-color-orange,oklch(64.6%_0.222_41.116)))] dark:text-[color:var(--zui-spinner-orange-fg-dark,var(--zui-color-orange-dark,oklch(75%_0.183_55.934)))]",
  "gradient-blue":
    "text-[color:var(--zui-spinner-gradient-blue-fg,var(--zui-color-blue,oklch(54.6%_0.245_262.881)))] dark:text-[color:var(--zui-spinner-gradient-blue-fg-dark,var(--zui-color-blue-dark,oklch(70.7%_0.165_254.624)))]",
  "gradient-green":
    "text-[color:var(--zui-spinner-gradient-green-fg,var(--zui-color-green,oklch(62.7%_0.194_149.214)))] dark:text-[color:var(--zui-spinner-gradient-green-fg-dark,var(--zui-color-green-dark,oklch(79.2%_0.209_151.711)))]",
  "gradient-red":
    "text-[color:var(--zui-spinner-gradient-red-fg,var(--zui-color-red,oklch(57.7%_0.245_27.325)))] dark:text-[color:var(--zui-spinner-gradient-red-fg-dark,var(--zui-color-red-dark,oklch(70.4%_0.191_22.216)))]",
  "gradient-yellow":
    "text-[color:var(--zui-spinner-gradient-yellow-fg,var(--zui-color-yellow,oklch(68.1%_0.162_75.834)))] dark:text-[color:var(--zui-spinner-gradient-yellow-fg-dark,var(--zui-color-yellow-dark,oklch(85.2%_0.199_91.936)))]",
  "gradient-purple":
    "text-[color:var(--zui-spinner-gradient-purple-fg,var(--zui-color-purple,oklch(55.8%_0.288_302.321)))] dark:text-[color:var(--zui-spinner-gradient-purple-fg-dark,var(--zui-color-purple-dark,oklch(71.4%_0.203_305.504)))]",
  "gradient-teal":
    "text-[color:var(--zui-spinner-gradient-teal-fg,var(--zui-color-teal,oklch(60%_0.118_184.704)))] dark:text-[color:var(--zui-spinner-gradient-teal-fg-dark,var(--zui-color-teal-dark,oklch(77.7%_0.152_181.912)))]",
  "gradient-indigo":
    "text-[color:var(--zui-spinner-gradient-indigo-fg,var(--zui-color-indigo,oklch(51.1%_0.262_276.966)))] dark:text-[color:var(--zui-spinner-gradient-indigo-fg-dark,var(--zui-color-indigo-dark,oklch(67.3%_0.182_276.935)))]",
  "gradient-pink":
    "text-[color:var(--zui-spinner-gradient-pink-fg,var(--zui-color-pink,oklch(59.2%_0.249_0.584)))] dark:text-[color:var(--zui-spinner-gradient-pink-fg-dark,var(--zui-color-pink-dark,oklch(71.8%_0.202_349.761)))]",
  "gradient-orange":
    "text-[color:var(--zui-spinner-gradient-orange-fg,var(--zui-color-orange,oklch(64.6%_0.222_41.116)))] dark:text-[color:var(--zui-spinner-gradient-orange-fg-dark,var(--zui-color-orange-dark,oklch(75%_0.183_55.934)))]",
  blue: "text-[color:var(--zui-spinner-blue-fg,var(--zui-color-blue,#2563eb))] dark:text-[color:var(--zui-spinner-blue-fg-dark,var(--zui-color-blue-dark,#3b82f6))]",
  cyan: "text-[color:var(--zui-spinner-cyan-fg,var(--zui-color-cyan,#0891b2))] dark:text-[color:var(--zui-spinner-cyan-fg-dark,var(--zui-color-cyan-dark,#22d3ee))]",
  green:
    "text-[color:var(--zui-spinner-green-fg,var(--zui-color-green,#16a34a))] dark:text-[color:var(--zui-spinner-green-fg-dark,var(--zui-color-green-dark,#22c55e))]",
  lime: "text-[color:var(--zui-spinner-lime-fg,var(--zui-color-lime,#65a30d))] dark:text-[color:var(--zui-spinner-lime-fg-dark,var(--zui-color-lime-dark,#a3e635))]",
  mint: "text-[color:var(--zui-spinner-mint-fg,var(--zui-color-mint,#10b981))] dark:text-[color:var(--zui-spinner-mint-fg-dark,var(--zui-color-mint-dark,#6ee7b7))]",
  ocean:
    "text-[color:var(--zui-spinner-ocean-fg,var(--zui-color-ocean,#0284c7))] dark:text-[color:var(--zui-spinner-ocean-fg-dark,var(--zui-color-ocean-dark,#38bdf8))]",
  sapphire:
    "text-[color:var(--zui-spinner-sapphire-fg,var(--zui-color-sapphire,#1d4ed8))] dark:text-[color:var(--zui-spinner-sapphire-fg-dark,var(--zui-color-sapphire-dark,#60a5fa))]",
  lavender:
    "text-[color:var(--zui-spinner-lavender-fg,var(--zui-color-lavender,#8b5cf6))] dark:text-[color:var(--zui-spinner-lavender-fg-dark,var(--zui-color-lavender-dark,#a78bfa))]",
  ruby: "text-[color:var(--zui-spinner-ruby-fg,var(--zui-color-ruby,#be123c))] dark:text-[color:var(--zui-spinner-ruby-fg-dark,var(--zui-color-ruby-dark,#fb7185))]",
  red: "text-[color:var(--zui-spinner-red-fg,var(--zui-color-red,#dc2626))] dark:text-[color:var(--zui-spinner-red-fg-dark,var(--zui-color-red-dark,#ef4444))]",
  slate:
    "text-[color:var(--zui-spinner-slate-fg,var(--zui-color-slate,#475569))] dark:text-[color:var(--zui-spinner-slate-fg-dark,var(--zui-color-slate-dark,#64748b))]",
  zinc: "text-[color:var(--zui-spinner-zinc-fg,var(--zui-color-zinc,#52525b))] dark:text-[color:var(--zui-spinner-zinc-fg-dark,var(--zui-color-zinc-dark,#71717a))]",
  stone:
    "text-[color:var(--zui-spinner-stone-fg,var(--zui-color-stone,#57534e))] dark:text-[color:var(--zui-spinner-stone-fg-dark,var(--zui-color-stone-dark,#78716c))]",
  royal:
    "text-[color:var(--zui-spinner-royal-fg,var(--zui-color-royal,#4338ca))] dark:text-[color:var(--zui-spinner-royal-fg-dark,var(--zui-color-royal-dark,#818cf8))]",
  electric:
    "text-[color:var(--zui-spinner-electric-fg,var(--zui-color-electric,#0ea5e9))] dark:text-[color:var(--zui-spinner-electric-fg-dark,var(--zui-color-electric-dark,#38bdf8))]",
  forest:
    "text-[color:var(--zui-spinner-forest-fg,var(--zui-color-forest,#166534))] dark:text-[color:var(--zui-spinner-forest-fg-dark,var(--zui-color-forest-dark,#4ade80))]",
  sunset:
    "text-[color:var(--zui-spinner-sunset-fg,var(--zui-color-sunset,#ea580c))] dark:text-[color:var(--zui-spinner-sunset-fg-dark,var(--zui-color-sunset-dark,#fb923c))]",
  magenta:
    "text-[color:var(--zui-spinner-magenta-fg,var(--zui-color-magenta,#c026d3))] dark:text-[color:var(--zui-spinner-magenta-fg-dark,var(--zui-color-magenta-dark,#e879f9))]",
  crimson:
    "text-[color:var(--zui-spinner-crimson-fg,var(--zui-color-crimson,#b91c1c))] dark:text-[color:var(--zui-spinner-crimson-fg-dark,var(--zui-color-crimson-dark,#f87171))]",
  aqua: "text-[color:var(--zui-spinner-aqua-fg,var(--zui-color-aqua,#0f766e))] dark:text-[color:var(--zui-spinner-aqua-fg-dark,var(--zui-color-aqua-dark,#2dd4bf))]",
  plum: "text-[color:var(--zui-spinner-plum-fg,var(--zui-color-plum,#7e22ce))] dark:text-[color:var(--zui-spinner-plum-fg-dark,var(--zui-color-plum-dark,#c084fc))]",
} as const;

export const zuiSpinnerSizes = {
  xs: "size-3",
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-10",
} as const;

export const zuiSpinnerVariants = {
  ring: "",
  dots: "",
  pulse: "",
  bars: "",
} as const;
