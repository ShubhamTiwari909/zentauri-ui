export const zuiCardBase = [
  "relative flex w-full flex-col overflow-hidden text-[color:var(--zui-card-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-card-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
  "ring-offset-[var(--zui-card-ring-offset,var(--zui-ring-offset,oklch(98.4%_0.003_247.858)))] dark:ring-offset-[var(--zui-card-ring-offset-dark,var(--zui-ring-offset-dark,oklch(12.9%_0.042_264.695)))] transition-colors",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zui-card-ring-focus,var(--zui-focus-ring,oklch(44.6%_0.043_257.281)))] dark:focus-visible:ring-[var(--zui-card-ring-focus-dark,var(--zui-focus-ring-dark,oklch(86.9%_0.022_252.894)))] focus-visible:ring-offset-2",
] as const;

export const zuiCardAppearances = {
  default:
    "border border-[color:var(--zui-card-default-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-card-default-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-card-default-bg,var(--zui-surface-muted,#0000000d))] dark:bg-[var(--zui-card-default-bg-dark,var(--zui-surface-muted-dark,#ffffff0d))] shadow-[var(--zui-card-default-shadow,var(--zui-shadow,0_1px_2px_rgba(15,23,42,0.08)))] dark:shadow-[var(--zui-card-default-shadow-dark,var(--zui-shadow-dark,0_1px_2px_rgba(15,23,42,0.12)))]",
  glass:
    "border border-[color:var(--zui-card-glass-border,var(--zui-border,#00000026))] dark:border-[color:var(--zui-card-glass-border-dark,var(--zui-border-dark,#ffffff26))] bg-[var(--zui-card-glass-bg,var(--zui-surface-soft,#0000001a))] dark:bg-[var(--zui-card-glass-bg-dark,var(--zui-surface-soft-dark,#ffffff1a))] backdrop-blur-md shadow-[var(--zui-card-glass-shadow,var(--zui-shadow,0_8px_24px_rgba(15,23,42,0.12)))] dark:shadow-[var(--zui-card-glass-shadow-dark,var(--zui-shadow-dark,0_18px_48px_rgba(15,23,42,0.35)))]",
  outline:
    "border border-[color:var(--zui-card-outline-border,var(--zui-border,#00000026))] dark:border-[color:var(--zui-card-outline-border-dark,var(--zui-border-dark,#ffffff26))] bg-[var(--zui-card-outline-bg,var(--zui-surface-soft,transparent))] dark:bg-[var(--zui-card-outline-bg-dark,var(--zui-surface-soft-dark,transparent))]",
  ghost:
    "border border-[color:var(--zui-card-ghost-border,var(--zui-border,transparent))] dark:border-[color:var(--zui-card-ghost-border-dark,var(--zui-border-dark,transparent))] bg-[var(--zui-card-ghost-bg,var(--zui-surface-soft,transparent))] dark:bg-[var(--zui-card-ghost-bg-dark,var(--zui-surface-soft-dark,transparent))]",
  elevated:
    "border border-[color:var(--zui-card-elevated-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-card-elevated-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-card-elevated-bg,var(--zui-surface-soft,oklch(96.8%_0.007_247.896_/_0.8)))] dark:bg-[var(--zui-card-elevated-bg-dark,var(--zui-surface-soft-dark,oklch(20.8%_0.042_265.755_/_0.8)))] shadow-[var(--zui-card-elevated-shadow,var(--zui-shadow,0_12px_32px_rgba(15,23,42,0.12)))] dark:shadow-[var(--zui-card-elevated-shadow-dark,var(--zui-shadow-dark,0_24px_64px_rgba(15,23,42,0.45)))]",
  blue: "border border-[color:var(--zui-card-blue-border,var(--zui-color-blue,#2563eb))] dark:border-[color:var(--zui-card-blue-border-dark,var(--zui-color-blue-dark,#3b82f6))] bg-[var(--zui-card-blue-bg,color-mix(in oklch, var(--zui-color-blue,#2563eb) 10%, transparent))] dark:bg-[var(--zui-card-blue-bg-dark,color-mix(in oklch, var(--zui-color-blue-dark,#3b82f6) 18%, transparent))] backdrop-blur-xl",
  cyan: "border border-[color:var(--zui-card-cyan-border,var(--zui-color-cyan,#0891b2))] dark:border-[color:var(--zui-card-cyan-border-dark,var(--zui-color-cyan-dark,#22d3ee))] bg-[var(--zui-card-cyan-bg,color-mix(in oklch, var(--zui-color-cyan,#0891b2) 10%, transparent))] dark:bg-[var(--zui-card-cyan-bg-dark,color-mix(in oklch, var(--zui-color-cyan-dark,#22d3ee) 18%, transparent))] backdrop-blur-xl",
  green:
    "border border-[color:var(--zui-card-green-border,var(--zui-color-green,#16a34a))] dark:border-[color:var(--zui-card-green-border-dark,var(--zui-color-green-dark,#22c55e))] bg-[var(--zui-card-green-bg,color-mix(in oklch, var(--zui-color-green,#16a34a) 10%, transparent))] dark:bg-[var(--zui-card-green-bg-dark,color-mix(in oklch, var(--zui-color-green-dark,#22c55e) 18%, transparent))] backdrop-blur-xl",
  lime: "border border-[color:var(--zui-card-lime-border,var(--zui-color-lime,#65a30d))] dark:border-[color:var(--zui-card-lime-border-dark,var(--zui-color-lime-dark,#a3e635))] bg-[var(--zui-card-lime-bg,color-mix(in oklch, var(--zui-color-lime,#65a30d) 10%, transparent))] dark:bg-[var(--zui-card-lime-bg-dark,color-mix(in oklch, var(--zui-color-lime-dark,#a3e635) 18%, transparent))] backdrop-blur-xl",
  mint: "border border-[color:var(--zui-card-mint-border,var(--zui-color-mint,#10b981))] dark:border-[color:var(--zui-card-mint-border-dark,var(--zui-color-mint-dark,#6ee7b7))] bg-[var(--zui-card-mint-bg,color-mix(in oklch, var(--zui-color-mint,#10b981) 10%, transparent))] dark:bg-[var(--zui-card-mint-bg-dark,color-mix(in oklch, var(--zui-color-mint-dark,#6ee7b7) 18%, transparent))] backdrop-blur-xl",
  ocean:
    "border border-[color:var(--zui-card-ocean-border,var(--zui-color-ocean,#0284c7))] dark:border-[color:var(--zui-card-ocean-border-dark,var(--zui-color-ocean-dark,#38bdf8))] bg-[var(--zui-card-ocean-bg,color-mix(in oklch, var(--zui-color-ocean,#0284c7) 10%, transparent))] dark:bg-[var(--zui-card-ocean-bg-dark,color-mix(in oklch, var(--zui-color-ocean-dark,#38bdf8) 18%, transparent))] backdrop-blur-xl",
  sapphire:
    "border border-[color:var(--zui-card-sapphire-border,var(--zui-color-sapphire,#1d4ed8))] dark:border-[color:var(--zui-card-sapphire-border-dark,var(--zui-color-sapphire-dark,#60a5fa))] bg-[var(--zui-card-sapphire-bg,color-mix(in oklch, var(--zui-color-sapphire,#1d4ed8) 10%, transparent))] dark:bg-[var(--zui-card-sapphire-bg-dark,color-mix(in oklch, var(--zui-color-sapphire-dark,#60a5fa) 18%, transparent))] backdrop-blur-xl",
  lavender:
    "border border-[color:var(--zui-card-lavender-border,var(--zui-color-lavender,#8b5cf6))] dark:border-[color:var(--zui-card-lavender-border-dark,var(--zui-color-lavender-dark,#a78bfa))] bg-[var(--zui-card-lavender-bg,color-mix(in oklch, var(--zui-color-lavender,#8b5cf6) 10%, transparent))] dark:bg-[var(--zui-card-lavender-bg-dark,color-mix(in oklch, var(--zui-color-lavender-dark,#a78bfa) 18%, transparent))] backdrop-blur-xl",
  ruby: "border border-[color:var(--zui-card-ruby-border,var(--zui-color-ruby,#be123c))] dark:border-[color:var(--zui-card-ruby-border-dark,var(--zui-color-ruby-dark,#fb7185))] bg-[var(--zui-card-ruby-bg,color-mix(in oklch, var(--zui-color-ruby,#be123c) 10%, transparent))] dark:bg-[var(--zui-card-ruby-bg-dark,color-mix(in oklch, var(--zui-color-ruby-dark,#fb7185) 18%, transparent))] backdrop-blur-xl",
  red: "border border-[color:var(--zui-card-red-border,var(--zui-color-red,#dc2626))] dark:border-[color:var(--zui-card-red-border-dark,var(--zui-color-red-dark,#ef4444))] bg-[var(--zui-card-red-bg,color-mix(in oklch, var(--zui-color-red,#dc2626) 10%, transparent))] dark:bg-[var(--zui-card-red-bg-dark,color-mix(in oklch, var(--zui-color-red-dark,#ef4444) 18%, transparent))] backdrop-blur-xl",
  slate:
    "border border-[color:var(--zui-card-slate-border,var(--zui-color-slate,#475569))] dark:border-[color:var(--zui-card-slate-border-dark,var(--zui-color-slate-dark,#64748b))] bg-[var(--zui-card-slate-bg,color-mix(in oklch, var(--zui-color-slate,#475569) 10%, transparent))] dark:bg-[var(--zui-card-slate-bg-dark,color-mix(in oklch, var(--zui-color-slate-dark,#64748b) 18%, transparent))] backdrop-blur-xl",
  zinc: "border border-[color:var(--zui-card-zinc-border,var(--zui-color-zinc,#52525b))] dark:border-[color:var(--zui-card-zinc-border-dark,var(--zui-color-zinc-dark,#71717a))] bg-[var(--zui-card-zinc-bg,color-mix(in oklch, var(--zui-color-zinc,#52525b) 10%, transparent))] dark:bg-[var(--zui-card-zinc-bg-dark,color-mix(in oklch, var(--zui-color-zinc-dark,#71717a) 18%, transparent))] backdrop-blur-xl",
  stone:
    "border border-[color:var(--zui-card-stone-border,var(--zui-color-stone,#57534e))] dark:border-[color:var(--zui-card-stone-border-dark,var(--zui-color-stone-dark,#78716c))] bg-[var(--zui-card-stone-bg,color-mix(in oklch, var(--zui-color-stone,#57534e) 10%, transparent))] dark:bg-[var(--zui-card-stone-bg-dark,color-mix(in oklch, var(--zui-color-stone-dark,#78716c) 18%, transparent))] backdrop-blur-xl",
  royal:
    "border border-[color:var(--zui-card-royal-border,var(--zui-color-royal,#4338ca))] dark:border-[color:var(--zui-card-royal-border-dark,var(--zui-color-royal-dark,#818cf8))] bg-[var(--zui-card-royal-bg,color-mix(in oklch, var(--zui-color-royal,#4338ca) 10%, transparent))] dark:bg-[var(--zui-card-royal-bg-dark,color-mix(in oklch, var(--zui-color-royal-dark,#818cf8) 18%, transparent))] backdrop-blur-xl",
  electric:
    "border border-[color:var(--zui-card-electric-border,var(--zui-color-electric,#0ea5e9))] dark:border-[color:var(--zui-card-electric-border-dark,var(--zui-color-electric-dark,#38bdf8))] bg-[var(--zui-card-electric-bg,color-mix(in oklch, var(--zui-color-electric,#0ea5e9) 10%, transparent))] dark:bg-[var(--zui-card-electric-bg-dark,color-mix(in oklch, var(--zui-color-electric-dark,#38bdf8) 18%, transparent))] backdrop-blur-xl",
  forest:
    "border border-[color:var(--zui-card-forest-border,var(--zui-color-forest,#166534))] dark:border-[color:var(--zui-card-forest-border-dark,var(--zui-color-forest-dark,#4ade80))] bg-[var(--zui-card-forest-bg,color-mix(in oklch, var(--zui-color-forest,#166534) 10%, transparent))] dark:bg-[var(--zui-card-forest-bg-dark,color-mix(in oklch, var(--zui-color-forest-dark,#4ade80) 18%, transparent))] backdrop-blur-xl",
  sunset:
    "border border-[color:var(--zui-card-sunset-border,var(--zui-color-sunset,#ea580c))] dark:border-[color:var(--zui-card-sunset-border-dark,var(--zui-color-sunset-dark,#fb923c))] bg-[var(--zui-card-sunset-bg,color-mix(in oklch, var(--zui-color-sunset,#ea580c) 10%, transparent))] dark:bg-[var(--zui-card-sunset-bg-dark,color-mix(in oklch, var(--zui-color-sunset-dark,#fb923c) 18%, transparent))] backdrop-blur-xl",
  magenta:
    "border border-[color:var(--zui-card-magenta-border,var(--zui-color-magenta,#c026d3))] dark:border-[color:var(--zui-card-magenta-border-dark,var(--zui-color-magenta-dark,#e879f9))] bg-[var(--zui-card-magenta-bg,color-mix(in oklch, var(--zui-color-magenta,#c026d3) 10%, transparent))] dark:bg-[var(--zui-card-magenta-bg-dark,color-mix(in oklch, var(--zui-color-magenta-dark,#e879f9) 18%, transparent))] backdrop-blur-xl",
  crimson:
    "border border-[color:var(--zui-card-crimson-border,var(--zui-color-crimson,#b91c1c))] dark:border-[color:var(--zui-card-crimson-border-dark,var(--zui-color-crimson-dark,#f87171))] bg-[var(--zui-card-crimson-bg,color-mix(in oklch, var(--zui-color-crimson,#b91c1c) 10%, transparent))] dark:bg-[var(--zui-card-crimson-bg-dark,color-mix(in oklch, var(--zui-color-crimson-dark,#f87171) 18%, transparent))] backdrop-blur-xl",
  aqua: "border border-[color:var(--zui-card-aqua-border,var(--zui-color-aqua,#0f766e))] dark:border-[color:var(--zui-card-aqua-border-dark,var(--zui-color-aqua-dark,#2dd4bf))] bg-[var(--zui-card-aqua-bg,color-mix(in oklch, var(--zui-color-aqua,#0f766e) 10%, transparent))] dark:bg-[var(--zui-card-aqua-bg-dark,color-mix(in oklch, var(--zui-color-aqua-dark,#2dd4bf) 18%, transparent))] backdrop-blur-xl",
  plum: "border border-[color:var(--zui-card-plum-border,var(--zui-color-plum,#7e22ce))] dark:border-[color:var(--zui-card-plum-border-dark,var(--zui-color-plum-dark,#c084fc))] bg-[var(--zui-card-plum-bg,color-mix(in oklch, var(--zui-color-plum,#7e22ce) 10%, transparent))] dark:bg-[var(--zui-card-plum-bg-dark,color-mix(in oklch, var(--zui-color-plum-dark,#c084fc) 18%, transparent))] backdrop-blur-xl",
  sky: "border border-[color:var(--zui-card-sky-border,var(--zui-color-sky,oklch(44.3%_0.11_240.79)))] dark:border-[color:var(--zui-card-sky-border-dark,var(--zui-color-sky-dark,oklch(58.8%_0.158_241.966)))] bg-[var(--zui-card-sky-bg,color-mix(in oklch, var(--zui-color-sky,oklch(97.7%_0.013_236.62)) 10%, transparent))] dark:bg-[var(--zui-card-sky-bg-dark,color-mix(in oklch, var(--zui-color-sky-dark,oklch(29.3%_0.066_243.157)) 18%, transparent))] backdrop-blur-xl",
  rose: "border border-[color:var(--zui-card-rose-border,var(--zui-color-rose,oklch(45.5%_0.188_13.697)))] dark:border-[color:var(--zui-card-rose-border-dark,var(--zui-color-rose-dark,oklch(58.6%_0.253_17.585)))] bg-[var(--zui-card-rose-bg,color-mix(in oklch, var(--zui-color-rose,oklch(96.9%_0.015_12.422)) 10%, transparent))] dark:bg-[var(--zui-card-rose-bg-dark,color-mix(in oklch, var(--zui-color-rose-dark,oklch(27.1%_0.105_12.094)) 18%, transparent))] backdrop-blur-xl",
  purple:
    "border border-[color:var(--zui-card-purple-border,var(--zui-color-purple,oklch(43.8%_0.218_303.724)))] dark:border-[color:var(--zui-card-purple-border-dark,var(--zui-color-purple-dark,oklch(55.8%_0.288_302.321)))] bg-[var(--zui-card-purple-bg,color-mix(in oklch, var(--zui-color-purple,oklch(97.7%_0.014_308.299)) 10%, transparent))] dark:bg-[var(--zui-card-purple-bg-dark,color-mix(in oklch, var(--zui-color-purple-dark,oklch(29.1%_0.149_302.717)) 18%, transparent))] backdrop-blur-xl",
  pink: "border border-[color:var(--zui-card-pink-border,var(--zui-color-pink,oklch(45.9%_0.187_3.815)))] dark:border-[color:var(--zui-card-pink-border-dark,var(--zui-color-pink-dark,oklch(59.2%_0.249_0.584)))] bg-[var(--zui-card-pink-bg,color-mix(in oklch, var(--zui-color-pink,oklch(97.1%_0.014_343.198)) 10%, transparent))] dark:bg-[var(--zui-card-pink-bg-dark,color-mix(in oklch, var(--zui-color-pink-dark,oklch(28.4%_0.109_3.907)) 18%, transparent))] backdrop-blur-xl",
  orange:
    "border border-[color:var(--zui-card-orange-border,var(--zui-color-orange,oklch(47%_0.157_37.304)))] dark:border-[color:var(--zui-card-orange-border-dark,var(--zui-color-orange-dark,oklch(64.6%_0.222_41.116)))] bg-[var(--zui-card-orange-bg,color-mix(in oklch, var(--zui-color-orange,oklch(98%_0.016_73.684)) 10%, transparent))] dark:bg-[var(--zui-card-orange-bg-dark,color-mix(in oklch, var(--zui-color-orange-dark,oklch(26.6%_0.079_36.259)) 18%, transparent))] backdrop-blur-xl",
  yellow:
    "border border-[color:var(--zui-card-yellow-border,var(--zui-color-yellow,oklch(47.6%_0.114_61.907)))] dark:border-[color:var(--zui-card-yellow-border-dark,var(--zui-color-yellow-dark,oklch(68.1%_0.162_75.834)))] bg-[var(--zui-card-yellow-bg,color-mix(in oklch, var(--zui-color-yellow,oklch(98.7%_0.026_102.212)) 10%, transparent))] dark:bg-[var(--zui-card-yellow-bg-dark,color-mix(in oklch, var(--zui-color-yellow-dark,oklch(28.6%_0.066_53.813)) 18%, transparent))] backdrop-blur-xl",
  teal: "border border-[color:var(--zui-card-teal-border,var(--zui-color-teal,oklch(43.7%_0.078_188.216)))] dark:border-[color:var(--zui-card-teal-border-dark,var(--zui-color-teal-dark,oklch(60%_0.118_184.704)))] bg-[var(--zui-card-teal-bg,color-mix(in oklch, var(--zui-color-teal,oklch(98.4%_0.014_180.72)) 10%, transparent))] dark:bg-[var(--zui-card-teal-bg-dark,color-mix(in oklch, var(--zui-color-teal-dark,oklch(27.7%_0.046_192.524)) 18%, transparent))] backdrop-blur-xl",
  indigo:
    "border border-[color:var(--zui-card-indigo-border,var(--zui-color-indigo,oklch(39.8%_0.195_277.366)))] dark:border-[color:var(--zui-card-indigo-border-dark,var(--zui-color-indigo-dark,oklch(51.1%_0.262_276.966)))] bg-[var(--zui-card-indigo-bg,color-mix(in oklch, var(--zui-color-indigo,oklch(96.2%_0.018_272.314)) 10%, transparent))] dark:bg-[var(--zui-card-indigo-bg-dark,color-mix(in oklch, var(--zui-color-indigo-dark,oklch(25.7%_0.09_281.288)) 18%, transparent))] backdrop-blur-xl",
  emerald:
    "border border-[color:var(--zui-card-emerald-border,var(--zui-color-emerald,oklch(43.2%_0.095_166.913)))] dark:border-[color:var(--zui-card-emerald-border-dark,var(--zui-color-emerald-dark,oklch(59.6%_0.145_163.225)))] bg-[var(--zui-card-emerald-bg,color-mix(in oklch, var(--zui-color-emerald,oklch(97.9%_0.021_166.113)) 10%, transparent))] dark:bg-[var(--zui-card-emerald-bg-dark,color-mix(in oklch, var(--zui-color-emerald-dark,oklch(26.2%_0.051_172.552)) 18%, transparent))] backdrop-blur-xl",
  gray: "border border-[color:var(--zui-card-gray-border,var(--zui-color-gray,oklch(27.8%_0.033_256.848)))] dark:border-[color:var(--zui-card-gray-border-dark,var(--zui-color-gray-dark,oklch(44.6%_0.03_256.802)))] bg-[var(--zui-card-gray-bg,color-mix(in oklch, var(--zui-color-gray,oklch(98.5%_0.002_247.839)) 10%, transparent))] dark:bg-[var(--zui-card-gray-bg-dark,color-mix(in oklch, var(--zui-color-gray-dark,oklch(13%_0.028_261.692)) 18%, transparent))] backdrop-blur-xl",
  amber:
    "border border-[color:var(--zui-card-amber-border,var(--zui-color-amber,oklch(47.3%_0.137_46.201)))] dark:border-[color:var(--zui-card-amber-border-dark,var(--zui-color-amber-dark,oklch(66.6%_0.179_58.318)))] bg-[var(--zui-card-amber-bg,color-mix(in oklch, var(--zui-color-amber,oklch(98.7%_0.022_95.277)) 10%, transparent))] dark:bg-[var(--zui-card-amber-bg-dark,color-mix(in oklch, var(--zui-color-amber-dark,oklch(27.9%_0.077_45.635)) 18%, transparent))] backdrop-blur-xl",
  violet:
    "border border-[color:var(--zui-card-violet-border,var(--zui-color-violet,oklch(43.2%_0.232_292.759)))] dark:border-[color:var(--zui-card-violet-border-dark,var(--zui-color-violet-dark,oklch(54.1%_0.281_293.009)))] bg-[var(--zui-card-violet-bg,color-mix(in oklch, var(--zui-color-violet,oklch(96.9%_0.016_293.756)) 10%, transparent))] dark:bg-[var(--zui-card-violet-bg-dark,color-mix(in oklch, var(--zui-color-violet-dark,oklch(28.3%_0.141_291.089)) 18%, transparent))] backdrop-blur-xl",
  "gradient-blue":
    "border border-[color:var(--zui-card-gradient-blue-border,var(--zui-color-blue,oklch(42.4%_0.199_265.638)))] dark:border-[color:var(--zui-card-gradient-blue-border-dark,var(--zui-color-blue-dark,oklch(54.6%_0.245_262.881)))] bg-linear-to-r from-[var(--zui-card-gradient-blue-from,var(--zui-color-blue,oklch(97%_0.014_254.604)))] dark:from-[var(--zui-card-gradient-blue-from-dark,var(--zui-color-blue-dark,oklch(28.2%_0.091_267.935_/_0.7)))] to-[var(--zui-card-gradient-blue-to,var(--zui-color-purple,oklch(97.7%_0.014_308.299)))] dark:to-[var(--zui-card-gradient-blue-to-dark,var(--zui-color-purple-dark,oklch(29.1%_0.149_302.717_/_0.7)))] backdrop-blur-xl",
  "gradient-green":
    "border border-[color:var(--zui-card-gradient-green-border,var(--zui-color-green,oklch(44.8%_0.119_151.328)))] dark:border-[color:var(--zui-card-gradient-green-border-dark,var(--zui-color-green-dark,oklch(62.7%_0.194_149.214)))] bg-linear-to-r from-[var(--zui-card-gradient-green-from,var(--zui-color-green,oklch(98.2%_0.018_155.826)))] dark:from-[var(--zui-card-gradient-green-from-dark,var(--zui-color-green-dark,oklch(26.6%_0.065_152.934_/_0.7)))] to-[var(--zui-card-gradient-green-to,var(--zui-color-lime,oklch(98.6%_0.031_120.757)))] dark:to-[var(--zui-card-gradient-green-to-dark,var(--zui-color-lime-dark,oklch(27.4%_0.072_132.109_/_0.7)))] backdrop-blur-xl",
  "gradient-red":
    "border border-[color:var(--zui-card-gradient-red-border,var(--zui-color-red,oklch(44.4%_0.177_26.899)))] dark:border-[color:var(--zui-card-gradient-red-border-dark,var(--zui-color-red-dark,oklch(57.7%_0.245_27.325)))] bg-linear-to-r from-[var(--zui-card-gradient-red-from,var(--zui-color-red,oklch(97.1%_0.013_17.38)))] dark:from-[var(--zui-card-gradient-red-from-dark,var(--zui-color-red-dark,oklch(25.8%_0.092_26.042_/_0.7)))] to-[var(--zui-card-gradient-red-to,var(--zui-color-pink,oklch(97.1%_0.014_343.198)))] dark:to-[var(--zui-card-gradient-red-to-dark,var(--zui-color-pink-dark,oklch(28.4%_0.109_3.907_/_0.7)))] backdrop-blur-xl",
  "gradient-yellow":
    "border border-[color:var(--zui-card-gradient-yellow-border,var(--zui-color-yellow,oklch(47.6%_0.114_61.907)))] dark:border-[color:var(--zui-card-gradient-yellow-border-dark,var(--zui-color-yellow-dark,oklch(68.1%_0.162_75.834)))] bg-linear-to-r from-[var(--zui-card-gradient-yellow-from,var(--zui-color-yellow,oklch(98.7%_0.026_102.212)))] dark:from-[var(--zui-card-gradient-yellow-from-dark,var(--zui-color-yellow-dark,oklch(28.6%_0.066_53.813_/_0.7)))] to-[var(--zui-card-gradient-yellow-to,var(--zui-color-orange,oklch(98%_0.016_73.684)))] dark:to-[var(--zui-card-gradient-yellow-to-dark,var(--zui-color-orange-dark,oklch(26.6%_0.079_36.259_/_0.7)))] backdrop-blur-xl",
  "gradient-purple":
    "border border-[color:var(--zui-card-gradient-purple-border,var(--zui-color-purple,oklch(43.8%_0.218_303.724)))] dark:border-[color:var(--zui-card-gradient-purple-border-dark,var(--zui-color-purple-dark,oklch(55.8%_0.288_302.321)))] bg-linear-to-r from-[var(--zui-card-gradient-purple-from,var(--zui-color-purple,oklch(97.7%_0.014_308.299)))] dark:from-[var(--zui-card-gradient-purple-from-dark,var(--zui-color-purple-dark,oklch(29.1%_0.149_302.717_/_0.7)))] to-[var(--zui-card-gradient-purple-to,var(--zui-color-pink,oklch(97.1%_0.014_343.198)))] dark:to-[var(--zui-card-gradient-purple-to-dark,var(--zui-color-pink-dark,oklch(28.4%_0.109_3.907_/_0.7)))] backdrop-blur-xl",
  "gradient-teal":
    "border border-[color:var(--zui-card-gradient-teal-border,var(--zui-color-teal,oklch(43.7%_0.078_188.216)))] dark:border-[color:var(--zui-card-gradient-teal-border-dark,var(--zui-color-teal-dark,oklch(60%_0.118_184.704)))] bg-linear-to-r from-[var(--zui-card-gradient-teal-from,var(--zui-color-teal,oklch(98.4%_0.014_180.72)))] dark:from-[var(--zui-card-gradient-teal-from-dark,var(--zui-color-teal-dark,oklch(27.7%_0.046_192.524_/_0.7)))] to-[var(--zui-card-gradient-teal-to,var(--zui-color-cyan,oklch(98.4%_0.019_200.873)))] dark:to-[var(--zui-card-gradient-teal-to-dark,var(--zui-color-cyan-dark,oklch(30.2%_0.056_229.695_/_0.7)))] backdrop-blur-xl",
  "gradient-indigo":
    "border border-[color:var(--zui-card-gradient-indigo-border,var(--zui-color-indigo,oklch(39.8%_0.195_277.366)))] dark:border-[color:var(--zui-card-gradient-indigo-border-dark,var(--zui-color-indigo-dark,oklch(51.1%_0.262_276.966)))] bg-linear-to-r from-[var(--zui-card-gradient-indigo-from,var(--zui-color-indigo,oklch(96.2%_0.018_272.314)))] dark:from-[var(--zui-card-gradient-indigo-from-dark,var(--zui-color-indigo-dark,oklch(25.7%_0.09_281.288_/_0.7)))] to-[var(--zui-card-gradient-indigo-to,var(--zui-color-purple,oklch(97.7%_0.014_308.299)))] dark:to-[var(--zui-card-gradient-indigo-to-dark,var(--zui-color-purple-dark,oklch(29.1%_0.149_302.717_/_0.7)))] backdrop-blur-xl",
  "gradient-pink":
    "border border-[color:var(--zui-card-gradient-pink-border,var(--zui-color-pink,oklch(45.9%_0.187_3.815)))] dark:border-[color:var(--zui-card-gradient-pink-border-dark,var(--zui-color-pink-dark,oklch(59.2%_0.249_0.584)))] bg-linear-to-r from-[var(--zui-card-gradient-pink-from,var(--zui-color-pink,oklch(97.1%_0.014_343.198)))] dark:from-[var(--zui-card-gradient-pink-from-dark,var(--zui-color-pink-dark,oklch(28.4%_0.109_3.907_/_0.7)))] to-[var(--zui-card-gradient-pink-to,var(--zui-color-rose,oklch(96.9%_0.015_12.422)))] dark:to-[var(--zui-card-gradient-pink-to-dark,var(--zui-color-rose-dark,oklch(27.1%_0.105_12.094_/_0.7)))] backdrop-blur-xl",
  "gradient-orange":
    "border border-[color:var(--zui-card-gradient-orange-border,var(--zui-color-orange,oklch(47%_0.157_37.304)))] dark:border-[color:var(--zui-card-gradient-orange-border-dark,var(--zui-color-orange-dark,oklch(64.6%_0.222_41.116)))] bg-linear-to-r from-[var(--zui-card-gradient-orange-from,var(--zui-color-orange,oklch(98%_0.016_73.684)))] dark:from-[var(--zui-card-gradient-orange-from-dark,var(--zui-color-orange-dark,oklch(26.6%_0.079_36.259_/_0.7)))] to-[var(--zui-card-gradient-orange-to,var(--zui-color-red,oklch(97.1%_0.013_17.38)))] dark:to-[var(--zui-card-gradient-orange-to-dark,var(--zui-color-red-dark,oklch(25.8%_0.092_26.042_/_0.7)))] backdrop-blur-xl",
} as const;

export const zuiCardBgAppearances = {
  default:
    "bg-[color:var(--zui-card-default-bg,var(--zui-bg,#0000001a))] dark:bg-[color:var(--zui-card-default-bg-dark,var(--zui-bg-dark,#ffffff1a))] shadow-[var(--zui-card-default-shadow,var(--zui-shadow,0_1px_2px_rgba(15,23,42,0.08)))] dark:shadow-[var(--zui-card-default-shadow-dark,var(--zui-shadow-dark,0_1px_2px_rgba(15,23,42,0.12)))]",
  outline:
    "border bg-transparent border-[color:var(--zui-card-outline-border,var(--zui-border,#00000026))] dark:border-[color:var(--zui-card-outline-border-dark,var(--zui-border-dark,#ffffff26))]",
  glass:
    "bg-[color:var(--zui-card-glass-bg,var(--zui-bg,#00000026))] dark:bg-[color:var(--zui-card-glass-bg-dark,var(--zui-bg-dark,#ffffff26))] backdrop-blur-md shadow-[var(--zui-card-glass-shadow,var(--zui-shadow,0_8px_24px_rgba(15,23,42,0.12)))] dark:shadow-[var(--zui-card-glass-shadow-dark,var(--zui-shadow-dark,0_18px_48px_rgba(15,23,42,0.35)))]",
  ghost:
    "bg-[color:var(--zui-card-ghost-bg,var(--zui-bg,transparent))] dark:bg-[color:var(--zui-card-ghost-bg-dark,var(--zui-bg-dark,transparent))]",
  elevated:
    "bg-[color:var(--zui-card-elevated-bg,var(--zui-bg,#0000001a))] dark:bg-[color:var(--zui-card-elevated-bg-dark,var(--zui-bg-dark,#ffffff1a))] shadow-[var(--zui-card-elevated-shadow,var(--zui-shadow,0_12px_32px_rgba(15,23,42,0.12)))] dark:shadow-[var(--zui-card-elevated-shadow-dark,var(--zui-shadow-dark,0_24px_64px_rgba(15,23,42,0.45)))]",
  blue: "bg-[color:var(--zui-card-blue-bg,var(--zui-color-blue,#2563eb))] dark:bg-[color:var(--zui-card-blue-bg-dark,var(--zui-color-blue-dark,#3b82f6))] backdrop-blur-xl",
  cyan: "bg-[color:var(--zui-card-cyan-bg,var(--zui-color-cyan,#0891b2))] dark:bg-[color:var(--zui-card-cyan-bg-dark,var(--zui-color-cyan-dark,#22d3ee))] backdrop-blur-xl",
  green:
    "bg-[color:var(--zui-card-green-bg,var(--zui-color-green,#16a34a))] dark:bg-[color:var(--zui-card-green-bg-dark,var(--zui-color-green-dark,#22c55e))] backdrop-blur-xl",
  lime: "bg-[color:var(--zui-card-lime-bg,var(--zui-color-lime,#65a30d))] dark:bg-[color:var(--zui-card-lime-bg-dark,var(--zui-color-lime-dark,#a3e635))] backdrop-blur-xl",
  mint: "bg-[color:var(--zui-card-mint-bg,var(--zui-color-mint,#10b981))] dark:bg-[color:var(--zui-card-mint-bg-dark,var(--zui-color-mint-dark,#6ee7b7))] backdrop-blur-xl",
  ocean:
    "bg-[color:var(--zui-card-ocean-bg,var(--zui-color-ocean,#0284c7))] dark:bg-[color:var(--zui-card-ocean-bg-dark,var(--zui-color-ocean-dark,#38bdf8))] backdrop-blur-xl",
  sapphire:
    "bg-[color:var(--zui-card-sapphire-bg,var(--zui-color-sapphire,#1d4ed8))] dark:bg-[color:var(--zui-card-sapphire-bg-dark,var(--zui-color-sapphire-dark,#60a5fa))] backdrop-blur-xl",
  lavender:
    "bg-[color:var(--zui-card-lavender-bg,var(--zui-color-lavender,#8b5cf6))] dark:bg-[color:var(--zui-card-lavender-bg-dark,var(--zui-color-lavender-dark,#a78bfa))] backdrop-blur-xl",
  ruby: "bg-[color:var(--zui-card-ruby-bg,var(--zui-color-ruby,#be123c))] dark:bg-[color:var(--zui-card-ruby-bg-dark,var(--zui-color-ruby-dark,#fb7185))] backdrop-blur-xl",
  red: "bg-[color:var(--zui-card-red-bg,var(--zui-color-red,#dc2626))] dark:bg-[color:var(--zui-card-red-bg-dark,var(--zui-color-red-dark,#ef4444))] backdrop-blur-xl",
  slate:
    "bg-[color:var(--zui-card-slate-bg,var(--zui-color-slate,#475569))] dark:bg-[color:var(--zui-card-slate-bg-dark,var(--zui-color-slate-dark,#64748b))] backdrop-blur-xl",
  zinc: "bg-[color:var(--zui-card-zinc-bg,var(--zui-color-zinc,#52525b))] dark:bg-[color:var(--zui-card-zinc-bg-dark,var(--zui-color-zinc-dark,#71717a))] backdrop-blur-xl",
  stone:
    "bg-[color:var(--zui-card-stone-bg,var(--zui-color-stone,#57534e))] dark:bg-[color:var(--zui-card-stone-bg-dark,var(--zui-color-stone-dark,#78716c))] backdrop-blur-xl",
  royal:
    "bg-[color:var(--zui-card-royal-bg,var(--zui-color-royal,#4338ca))] dark:bg-[color:var(--zui-card-royal-bg-dark,var(--zui-color-royal-dark,#818cf8))] backdrop-blur-xl",
  electric:
    "bg-[color:var(--zui-card-electric-bg,var(--zui-color-electric,#0ea5e9))] dark:bg-[color:var(--zui-card-electric-bg-dark,var(--zui-color-electric-dark,#38bdf8))] backdrop-blur-xl",
  forest:
    "bg-[color:var(--zui-card-forest-bg,var(--zui-color-forest,#166534))] dark:bg-[color:var(--zui-card-forest-bg-dark,var(--zui-color-forest-dark,#4ade80))] backdrop-blur-xl",
  sunset:
    "bg-[color:var(--zui-card-sunset-bg,var(--zui-color-sunset,#ea580c))] dark:bg-[color:var(--zui-card-sunset-bg-dark,var(--zui-color-sunset-dark,#fb923c))] backdrop-blur-xl",
  magenta:
    "bg-[color:var(--zui-card-magenta-bg,var(--zui-color-magenta,#c026d3))] dark:bg-[color:var(--zui-card-magenta-bg-dark,var(--zui-color-magenta-dark,#e879f9))] backdrop-blur-xl",
  crimson:
    "bg-[color:var(--zui-card-crimson-bg,var(--zui-color-crimson,#b91c1c))] dark:bg-[color:var(--zui-card-crimson-bg-dark,var(--zui-color-crimson-dark,#f87171))] backdrop-blur-xl",
  aqua: "bg-[color:var(--zui-card-aqua-bg,var(--zui-color-aqua,#0f766e))] dark:bg-[color:var(--zui-card-aqua-bg-dark,var(--zui-color-aqua-dark,#2dd4bf))] backdrop-blur-xl",
  plum: "bg-[color:var(--zui-card-plum-bg,var(--zui-color-plum,#7e22ce))] dark:bg-[color:var(--zui-card-plum-bg-dark,var(--zui-color-plum-dark,#c084fc))] backdrop-blur-xl",
  sky: "bg-[color:var(--zui-card-sky-bg,var(--zui-color-sky,oklch(44.3%_0.11_240.79)))] dark:bg-[color:var(--zui-card-sky-bg-dark,var(--zui-color-sky-dark,oklch(58.8%_0.158_241.966)))] backdrop-blur-xl",
  rose: "bg-[color:var(--zui-card-rose-bg,var(--zui-color-rose,oklch(45.5%_0.188_13.697)))] dark:bg-[color:var(--zui-card-rose-bg-dark,var(--zui-color-rose-dark,oklch(58.6%_0.253_17.585)))] backdrop-blur-xl",
  purple:
    "bg-[color:var(--zui-card-purple-bg,var(--zui-color-purple,oklch(43.8%_0.218_303.724)))] dark:bg-[color:var(--zui-card-purple-bg-dark,var(--zui-color-purple-dark,oklch(55.8%_0.288_302.321)))] backdrop-blur-xl",
  pink: "bg-[color:var(--zui-card-pink-bg,var(--zui-color-pink,oklch(45.9%_0.187_3.815)))] dark:bg-[color:var(--zui-card-pink-bg-dark,var(--zui-color-pink-dark,oklch(59.2%_0.249_0.584)))] backdrop-blur-xl",
  orange:
    "bg-[color:var(--zui-card-orange-bg,var(--zui-color-orange,oklch(47%_0.157_37.304)))] dark:bg-[color:var(--zui-card-orange-bg-dark,var(--zui-color-orange-dark,oklch(64.6%_0.222_41.116)))] backdrop-blur-xl",
  yellow:
    "bg-[color:var(--zui-card-yellow-bg,var(--zui-color-yellow,oklch(47.6%_0.114_61.907)))] dark:bg-[color:var(--zui-card-yellow-bg-dark,var(--zui-color-yellow-dark,oklch(68.1%_0.162_75.834)))] backdrop-blur-xl",
  teal: "bg-[color:var(--zui-card-teal-bg,var(--zui-color-teal,oklch(43.7%_0.078_188.216)))] dark:bg-[color:var(--zui-card-teal-bg-dark,var(--zui-color-teal-dark,oklch(60%_0.118_184.704)))] backdrop-blur-xl",
  indigo:
    "bg-[color:var(--zui-card-indigo-bg,var(--zui-color-indigo,oklch(39.8%_0.195_277.366)))] dark:bg-[color:var(--zui-card-indigo-bg-dark,var(--zui-color-indigo-dark,oklch(51.1%_0.262_276.966)))] backdrop-blur-xl",
  emerald:
    "bg-[color:var(--zui-card-emerald-bg,var(--zui-color-emerald,oklch(43.2%_0.095_166.913)))] dark:bg-[color:var(--zui-card-emerald-bg-dark,var(--zui-color-emerald-dark,oklch(59.6%_0.145_163.225)))] backdrop-blur-xl",
  gray: "bg-[color:var(--zui-card-gray-bg,var(--zui-color-gray,oklch(27.8%_0.033_256.848)))] dark:bg-[color:var(--zui-card-gray-bg-dark,var(--zui-color-gray-dark,oklch(44.6%_0.03_256.802)))] backdrop-blur-xl",
  amber:
    "bg-[color:var(--zui-card-amber-bg,var(--zui-color-amber,oklch(47.3%_0.137_46.201)))] dark:bg-[color:var(--zui-card-amber-bg-dark,var(--zui-color-amber-dark,oklch(66.6%_0.179_58.318)))] backdrop-blur-xl",
  violet:
    "bg-[color:var(--zui-card-violet-bg,var(--zui-color-violet,oklch(43.2%_0.232_292.759)))] dark:bg-[color:var(--zui-card-violet-bg-dark,var(--zui-color-violet-dark,oklch(54.1%_0.281_293.009)))] backdrop-blur-xl",
  "gradient-blue":
    "bg-linear-to-r from-[var(--zui-card-gradient-blue-from,var(--zui-color-blue,#1e40af))] dark:from-[var(--zui-card-gradient-blue-from-dark,var(--zui-color-blue-dark,#2563eb))] to-[var(--zui-card-gradient-blue-to,var(--zui-color-purple,#6b21a8))] dark:to-[var(--zui-card-gradient-blue-to-dark,var(--zui-color-purple-dark,#9333ea))] text-[color:var(--zui-card-gradient-blue-fg,var(--zui-brand-fg,#ffffff))] dark:text-[color:var(--zui-card-gradient-blue-fg-dark,var(--zui-brand-fg-dark,#ffffff))]",
  "gradient-green":
    "bg-linear-to-r from-[var(--zui-card-gradient-green-from,var(--zui-color-green,#166534))] dark:from-[var(--zui-card-gradient-green-from-dark,var(--zui-color-green-dark,#16a34a))] to-[var(--zui-card-gradient-green-to,var(--zui-color-lime,#3f6212))] dark:to-[var(--zui-card-gradient-green-to-dark,var(--zui-color-lime-dark,#65a30d))] text-[color:var(--zui-card-gradient-green-fg,var(--zui-brand-fg,#ffffff))] dark:text-[color:var(--zui-card-gradient-green-fg-dark,var(--zui-brand-fg-dark,#ffffff))]",
  "gradient-red":
    "bg-linear-to-r from-[var(--zui-card-gradient-red-from,var(--zui-color-red,#991b1b))] dark:from-[var(--zui-card-gradient-red-from-dark,var(--zui-color-red-dark,#dc2626))] to-[var(--zui-card-gradient-red-to,var(--zui-color-pink,#9d174d))] dark:to-[var(--zui-card-gradient-red-to-dark,var(--zui-color-pink-dark,#db2777))] text-[color:var(--zui-card-gradient-red-fg,var(--zui-brand-fg,#ffffff))] dark:text-[color:var(--zui-card-gradient-red-fg-dark,var(--zui-brand-fg-dark,#ffffff))]",
  "gradient-yellow":
    "bg-linear-to-r from-[var(--zui-card-gradient-yellow-from,var(--zui-color-yellow,#854d0e))] dark:from-[var(--zui-card-gradient-yellow-from-dark,var(--zui-color-yellow-dark,#ca8a04))] to-[var(--zui-card-gradient-yellow-to,var(--zui-color-orange,#9a3412))] dark:to-[var(--zui-card-gradient-yellow-to-dark,var(--zui-color-orange-dark,#ea580c))] text-[color:var(--zui-card-gradient-yellow-fg,var(--zui-brand-fg,#ffffff))] dark:text-[color:var(--zui-card-gradient-yellow-fg-dark,var(--zui-brand-fg-dark,#ffffff))]",
  "gradient-purple":
    "bg-linear-to-r from-[var(--zui-card-gradient-purple-from,var(--zui-color-purple,#6b21a8))] dark:from-[var(--zui-card-gradient-purple-from-dark,var(--zui-color-purple-dark,#9333ea))] to-[var(--zui-card-gradient-purple-to,var(--zui-color-pink,#9d174d))] dark:to-[var(--zui-card-gradient-purple-to-dark,var(--zui-color-pink-dark,#db2777))] text-[color:var(--zui-card-gradient-purple-fg,var(--zui-brand-fg,#ffffff))] dark:text-[color:var(--zui-card-gradient-purple-fg-dark,var(--zui-brand-fg-dark,#ffffff))]",
  "gradient-teal":
    "bg-linear-to-r from-[var(--zui-card-gradient-teal-from,var(--zui-color-teal,#115e59))] dark:from-[var(--zui-card-gradient-teal-from-dark,var(--zui-color-teal-dark,#0d9488))] to-[var(--zui-card-gradient-teal-to,var(--zui-color-cyan,#155e75))] dark:to-[var(--zui-card-gradient-teal-to-dark,var(--zui-color-cyan-dark,#0891b2))] text-[color:var(--zui-card-gradient-teal-fg,var(--zui-brand-fg,#ffffff))] dark:text-[color:var(--zui-card-gradient-teal-fg-dark,var(--zui-brand-fg-dark,#ffffff))]",
  "gradient-indigo":
    "bg-linear-to-r from-[var(--zui-card-gradient-indigo-from,var(--zui-color-indigo,#3730a3))] dark:from-[var(--zui-card-gradient-indigo-from-dark,var(--zui-color-indigo-dark,#4f46e5))] to-[var(--zui-card-gradient-indigo-to,var(--zui-color-purple,#6b21a8))] dark:to-[var(--zui-card-gradient-indigo-to-dark,var(--zui-color-purple-dark,#9333ea))] text-[color:var(--zui-card-gradient-indigo-fg,var(--zui-brand-fg,#ffffff))] dark:text-[color:var(--zui-card-gradient-indigo-fg-dark,var(--zui-brand-fg-dark,#ffffff))]",
  "gradient-pink":
    "bg-linear-to-r from-[var(--zui-card-gradient-pink-from,var(--zui-color-pink,#9d174d))] dark:from-[var(--zui-card-gradient-pink-from-dark,var(--zui-color-pink-dark,#db2777))] to-[var(--zui-card-gradient-pink-to,var(--zui-color-rose,#9f1239))] dark:to-[var(--zui-card-gradient-pink-to-dark,var(--zui-color-rose-dark,#e11d48))] text-[color:var(--zui-card-gradient-pink-fg,var(--zui-brand-fg,#ffffff))] dark:text-[color:var(--zui-card-gradient-pink-fg-dark,var(--zui-brand-fg-dark,#ffffff))]",
  "gradient-orange":
    "bg-linear-to-r from-[var(--zui-card-gradient-orange-from,var(--zui-color-orange,#9a3412))] dark:from-[var(--zui-card-gradient-orange-from-dark,var(--zui-color-orange-dark,#ea580c))] to-[var(--zui-card-gradient-orange-to,var(--zui-color-red,#991b1b))] dark:to-[var(--zui-card-gradient-orange-to-dark,var(--zui-color-red-dark,#dc2626))] text-[color:var(--zui-card-gradient-orange-fg,var(--zui-brand-fg,#ffffff))] dark:text-[color:var(--zui-card-gradient-orange-fg-dark,var(--zui-brand-fg-dark,#ffffff))]",
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
  "flex flex-col gap-1 border-b border-[color:var(--zui-card-header-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-card-header-border-dark,var(--zui-border-dark,#ffffff1a))] pb-3";

export const zuiCardHeaderSizes = {
  sm: "pb-2",
  md: "pb-3",
  lg: "pb-4",
} as const;

export const zuiCardFooterBase =
  "flex flex-col gap-2 border-t border-[color:var(--zui-card-footer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-card-footer-border-dark,var(--zui-border-dark,#ffffff1a))] pt-3";

export const zuiCardFooterSizes = {
  sm: "pt-2",
  md: "pt-3",
  lg: "pt-4",
} as const;

export const zuiCardTitleBase =
  "font-semibold tracking-tight text-[color:var(--zui-card-title-fg,var(--zui-fg,oklch(12.9%_0.042_264.695)))] dark:text-[color:var(--zui-card-title-fg-dark,var(--zui-fg-dark,#ffffff))]";

export const zuiCardTitleSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

export const zuiCardDescriptionBase =
  "text-[color:var(--zui-card-description-fg,var(--zui-fg-muted,oklch(55.4%_0.046_257.417)))] dark:text-[color:var(--zui-card-description-fg-dark,var(--zui-fg-muted-dark,oklch(98.4%_0.003_247.858)))]";

export const zuiCardDescriptionSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;
