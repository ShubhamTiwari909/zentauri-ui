export const zuiWizardBase = "flex w-full flex-col gap-6";

export const zuiWizardAppearances = {
  default:
    "rounded-xl border border-[color:var(--zui-wizard-default-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-wizard-default-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-wizard-default-bg,var(--zui-surface,#ffffff))] dark:bg-[var(--zui-wizard-default-bg-dark,var(--zui-surface-dark,oklch(14.5%_0.019_265.755)))] p-6",
  outline:
    "rounded-xl border border-[color:var(--zui-wizard-outline-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-wizard-outline-border-dark,var(--zui-border-dark,#ffffff1a))] bg-transparent p-6",
  ghost: "bg-transparent",
  card: "rounded-2xl border border-[color:var(--zui-wizard-card-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-wizard-card-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-wizard-card-bg,var(--zui-surface,#ffffff))] dark:bg-[var(--zui-wizard-card-bg-dark,var(--zui-surface-dark,oklch(14.5%_0.019_265.755)))] p-8 shadow-[var(--zui-wizard-card-shadow,0_1px_3px_0_rgb(0_0_0_/_0.1))] dark:shadow-[var(--zui-wizard-card-shadow-dark,0_1px_3px_0_rgb(0_0_0_/_0.3))]",
  separated: "gap-8!",
  blue: "rounded-xl border border-[color:var(--zui-wizard-blue-border,var(--zui-color-blue,#2563eb))] dark:border-[color:var(--zui-wizard-blue-border-dark,var(--zui-color-blue-dark,#3b82f6))] bg-[var(--zui-wizard-blue-bg,color-mix(in oklch, var(--zui-color-blue,#2563eb) 10%, transparent))] dark:bg-[var(--zui-wizard-blue-bg-dark,color-mix(in oklch, var(--zui-color-blue-dark,#3b82f6) 18%, transparent))] p-6",
  cyan: "rounded-xl border border-[color:var(--zui-wizard-cyan-border,var(--zui-color-cyan,#0891b2))] dark:border-[color:var(--zui-wizard-cyan-border-dark,var(--zui-color-cyan-dark,#22d3ee))] bg-[var(--zui-wizard-cyan-bg,color-mix(in oklch, var(--zui-color-cyan,#0891b2) 10%, transparent))] dark:bg-[var(--zui-wizard-cyan-bg-dark,color-mix(in oklch, var(--zui-color-cyan-dark,#22d3ee) 18%, transparent))] p-6",
  green:
    "rounded-xl border border-[color:var(--zui-wizard-green-border,var(--zui-color-green,#16a34a))] dark:border-[color:var(--zui-wizard-green-border-dark,var(--zui-color-green-dark,#22c55e))] bg-[var(--zui-wizard-green-bg,color-mix(in oklch, var(--zui-color-green,#16a34a) 10%, transparent))] dark:bg-[var(--zui-wizard-green-bg-dark,color-mix(in oklch, var(--zui-color-green-dark,#22c55e) 18%, transparent))] p-6",
  lime: "rounded-xl border border-[color:var(--zui-wizard-lime-border,var(--zui-color-lime,#65a30d))] dark:border-[color:var(--zui-wizard-lime-border-dark,var(--zui-color-lime-dark,#a3e635))] bg-[var(--zui-wizard-lime-bg,color-mix(in oklch, var(--zui-color-lime,#65a30d) 10%, transparent))] dark:bg-[var(--zui-wizard-lime-bg-dark,color-mix(in oklch, var(--zui-color-lime-dark,#a3e635) 18%, transparent))] p-6",
  mint: "rounded-xl border border-[color:var(--zui-wizard-mint-border,var(--zui-color-mint,#10b981))] dark:border-[color:var(--zui-wizard-mint-border-dark,var(--zui-color-mint-dark,#6ee7b7))] bg-[var(--zui-wizard-mint-bg,color-mix(in oklch, var(--zui-color-mint,#10b981) 10%, transparent))] dark:bg-[var(--zui-wizard-mint-bg-dark,color-mix(in oklch, var(--zui-color-mint-dark,#6ee7b7) 18%, transparent))] p-6",
  ocean:
    "rounded-xl border border-[color:var(--zui-wizard-ocean-border,var(--zui-color-ocean,#0284c7))] dark:border-[color:var(--zui-wizard-ocean-border-dark,var(--zui-color-ocean-dark,#38bdf8))] bg-[var(--zui-wizard-ocean-bg,color-mix(in oklch, var(--zui-color-ocean,#0284c7) 10%, transparent))] dark:bg-[var(--zui-wizard-ocean-bg-dark,color-mix(in oklch, var(--zui-color-ocean-dark,#38bdf8) 18%, transparent))] p-6",
  sapphire:
    "rounded-xl border border-[color:var(--zui-wizard-sapphire-border,var(--zui-color-sapphire,#1d4ed8))] dark:border-[color:var(--zui-wizard-sapphire-border-dark,var(--zui-color-sapphire-dark,#60a5fa))] bg-[var(--zui-wizard-sapphire-bg,color-mix(in oklch, var(--zui-color-sapphire,#1d4ed8) 10%, transparent))] dark:bg-[var(--zui-wizard-sapphire-bg-dark,color-mix(in oklch, var(--zui-color-sapphire-dark,#60a5fa) 18%, transparent))] p-6",
  lavender:
    "rounded-xl border border-[color:var(--zui-wizard-lavender-border,var(--zui-color-lavender,#8b5cf6))] dark:border-[color:var(--zui-wizard-lavender-border-dark,var(--zui-color-lavender-dark,#a78bfa))] bg-[var(--zui-wizard-lavender-bg,color-mix(in oklch, var(--zui-color-lavender,#8b5cf6) 10%, transparent))] dark:bg-[var(--zui-wizard-lavender-bg-dark,color-mix(in oklch, var(--zui-color-lavender-dark,#a78bfa) 18%, transparent))] p-6",
  ruby: "rounded-xl border border-[color:var(--zui-wizard-ruby-border,var(--zui-color-ruby,#be123c))] dark:border-[color:var(--zui-wizard-ruby-border-dark,var(--zui-color-ruby-dark,#fb7185))] bg-[var(--zui-wizard-ruby-bg,color-mix(in oklch, var(--zui-color-ruby,#be123c) 10%, transparent))] dark:bg-[var(--zui-wizard-ruby-bg-dark,color-mix(in oklch, var(--zui-color-ruby-dark,#fb7185) 18%, transparent))] p-6",
  red: "rounded-xl border border-[color:var(--zui-wizard-red-border,var(--zui-color-red,#dc2626))] dark:border-[color:var(--zui-wizard-red-border-dark,var(--zui-color-red-dark,#ef4444))] bg-[var(--zui-wizard-red-bg,color-mix(in oklch, var(--zui-color-red,#dc2626) 10%, transparent))] dark:bg-[var(--zui-wizard-red-bg-dark,color-mix(in oklch, var(--zui-color-red-dark,#ef4444) 18%, transparent))] p-6",
  slate:
    "rounded-xl border border-[color:var(--zui-wizard-slate-border,var(--zui-color-slate,#475569))] dark:border-[color:var(--zui-wizard-slate-border-dark,var(--zui-color-slate-dark,#64748b))] bg-[var(--zui-wizard-slate-bg,color-mix(in oklch, var(--zui-color-slate,#475569) 10%, transparent))] dark:bg-[var(--zui-wizard-slate-bg-dark,color-mix(in oklch, var(--zui-color-slate-dark,#64748b) 18%, transparent))] p-6",
  zinc: "rounded-xl border border-[color:var(--zui-wizard-zinc-border,var(--zui-color-zinc,#52525b))] dark:border-[color:var(--zui-wizard-zinc-border-dark,var(--zui-color-zinc-dark,#71717a))] bg-[var(--zui-wizard-zinc-bg,color-mix(in oklch, var(--zui-color-zinc,#52525b) 10%, transparent))] dark:bg-[var(--zui-wizard-zinc-bg-dark,color-mix(in oklch, var(--zui-color-zinc-dark,#71717a) 18%, transparent))] p-6",
  stone:
    "rounded-xl border border-[color:var(--zui-wizard-stone-border,var(--zui-color-stone,#57534e))] dark:border-[color:var(--zui-wizard-stone-border-dark,var(--zui-color-stone-dark,#78716c))] bg-[var(--zui-wizard-stone-bg,color-mix(in oklch, var(--zui-color-stone,#57534e) 10%, transparent))] dark:bg-[var(--zui-wizard-stone-bg-dark,color-mix(in oklch, var(--zui-color-stone-dark,#78716c) 18%, transparent))] p-6",
  royal:
    "rounded-xl border border-[color:var(--zui-wizard-royal-border,var(--zui-color-royal,#4338ca))] dark:border-[color:var(--zui-wizard-royal-border-dark,var(--zui-color-royal-dark,#818cf8))] bg-[var(--zui-wizard-royal-bg,color-mix(in oklch, var(--zui-color-royal,#4338ca) 10%, transparent))] dark:bg-[var(--zui-wizard-royal-bg-dark,color-mix(in oklch, var(--zui-color-royal-dark,#818cf8) 18%, transparent))] p-6",
  electric:
    "rounded-xl border border-[color:var(--zui-wizard-electric-border,var(--zui-color-electric,#0ea5e9))] dark:border-[color:var(--zui-wizard-electric-border-dark,var(--zui-color-electric-dark,#38bdf8))] bg-[var(--zui-wizard-electric-bg,color-mix(in oklch, var(--zui-color-electric,#0ea5e9) 10%, transparent))] dark:bg-[var(--zui-wizard-electric-bg-dark,color-mix(in oklch, var(--zui-color-electric-dark,#38bdf8) 18%, transparent))] p-6",
  forest:
    "rounded-xl border border-[color:var(--zui-wizard-forest-border,var(--zui-color-forest,#166534))] dark:border-[color:var(--zui-wizard-forest-border-dark,var(--zui-color-forest-dark,#4ade80))] bg-[var(--zui-wizard-forest-bg,color-mix(in oklch, var(--zui-color-forest,#166534) 10%, transparent))] dark:bg-[var(--zui-wizard-forest-bg-dark,color-mix(in oklch, var(--zui-color-forest-dark,#4ade80) 18%, transparent))] p-6",
  sunset:
    "rounded-xl border border-[color:var(--zui-wizard-sunset-border,var(--zui-color-sunset,#ea580c))] dark:border-[color:var(--zui-wizard-sunset-border-dark,var(--zui-color-sunset-dark,#fb923c))] bg-[var(--zui-wizard-sunset-bg,color-mix(in oklch, var(--zui-color-sunset,#ea580c) 10%, transparent))] dark:bg-[var(--zui-wizard-sunset-bg-dark,color-mix(in oklch, var(--zui-color-sunset-dark,#fb923c) 18%, transparent))] p-6",
  magenta:
    "rounded-xl border border-[color:var(--zui-wizard-magenta-border,var(--zui-color-magenta,#c026d3))] dark:border-[color:var(--zui-wizard-magenta-border-dark,var(--zui-color-magenta-dark,#e879f9))] bg-[var(--zui-wizard-magenta-bg,color-mix(in oklch, var(--zui-color-magenta,#c026d3) 10%, transparent))] dark:bg-[var(--zui-wizard-magenta-bg-dark,color-mix(in oklch, var(--zui-color-magenta-dark,#e879f9) 18%, transparent))] p-6",
  crimson:
    "rounded-xl border border-[color:var(--zui-wizard-crimson-border,var(--zui-color-crimson,#b91c1c))] dark:border-[color:var(--zui-wizard-crimson-border-dark,var(--zui-color-crimson-dark,#f87171))] bg-[var(--zui-wizard-crimson-bg,color-mix(in oklch, var(--zui-color-crimson,#b91c1c) 10%, transparent))] dark:bg-[var(--zui-wizard-crimson-bg-dark,color-mix(in oklch, var(--zui-color-crimson-dark,#f87171) 18%, transparent))] p-6",
  aqua: "rounded-xl border border-[color:var(--zui-wizard-aqua-border,var(--zui-color-aqua,#0f766e))] dark:border-[color:var(--zui-wizard-aqua-border-dark,var(--zui-color-aqua-dark,#2dd4bf))] bg-[var(--zui-wizard-aqua-bg,color-mix(in oklch, var(--zui-color-aqua,#0f766e) 10%, transparent))] dark:bg-[var(--zui-wizard-aqua-bg-dark,color-mix(in oklch, var(--zui-color-aqua-dark,#2dd4bf) 18%, transparent))] p-6",
  plum: "rounded-xl border border-[color:var(--zui-wizard-plum-border,var(--zui-color-plum,#7e22ce))] dark:border-[color:var(--zui-wizard-plum-border-dark,var(--zui-color-plum-dark,#c084fc))] bg-[var(--zui-wizard-plum-bg,color-mix(in oklch, var(--zui-color-plum,#7e22ce) 10%, transparent))] dark:bg-[var(--zui-wizard-plum-bg-dark,color-mix(in oklch, var(--zui-color-plum-dark,#c084fc) 18%, transparent))] p-6",
  sky: "rounded-xl border border-[color:var(--zui-wizard-sky-border,var(--zui-color-sky,oklch(44.3%_0.11_240.79)))] dark:border-[color:var(--zui-wizard-sky-border-dark,var(--zui-color-sky-dark,oklch(58.8%_0.158_241.966)))] bg-[var(--zui-wizard-sky-bg,color-mix(in oklch, var(--zui-color-sky,oklch(97.7%_0.013_236.62)) 10%, transparent))] dark:bg-[var(--zui-wizard-sky-bg-dark,color-mix(in oklch, var(--zui-color-sky-dark,oklch(29.3%_0.066_243.157)) 18%, transparent))] p-6",
  rose: "rounded-xl border border-[color:var(--zui-wizard-rose-border,var(--zui-color-rose,oklch(45.5%_0.188_13.697)))] dark:border-[color:var(--zui-wizard-rose-border-dark,var(--zui-color-rose-dark,oklch(58.6%_0.253_17.585)))] bg-[var(--zui-wizard-rose-bg,color-mix(in oklch, var(--zui-color-rose,oklch(96.9%_0.015_12.422)) 10%, transparent))] dark:bg-[var(--zui-wizard-rose-bg-dark,color-mix(in oklch, var(--zui-color-rose-dark,oklch(27.1%_0.105_12.094)) 18%, transparent))] p-6",
  purple:
    "rounded-xl border border-[color:var(--zui-wizard-purple-border,var(--zui-color-purple,oklch(43.8%_0.218_303.724)))] dark:border-[color:var(--zui-wizard-purple-border-dark,var(--zui-color-purple-dark,oklch(55.8%_0.288_302.321)))] bg-[var(--zui-wizard-purple-bg,color-mix(in oklch, var(--zui-color-purple,oklch(97.7%_0.014_308.299)) 10%, transparent))] dark:bg-[var(--zui-wizard-purple-bg-dark,color-mix(in oklch, var(--zui-color-purple-dark,oklch(29.1%_0.149_302.717)) 18%, transparent))] p-6",
  pink: "rounded-xl border border-[color:var(--zui-wizard-pink-border,var(--zui-color-pink,oklch(45.9%_0.187_3.815)))] dark:border-[color:var(--zui-wizard-pink-border-dark,var(--zui-color-pink-dark,oklch(59.2%_0.249_0.584)))] bg-[var(--zui-wizard-pink-bg,color-mix(in oklch, var(--zui-color-pink,oklch(97.1%_0.014_343.198)) 10%, transparent))] dark:bg-[var(--zui-wizard-pink-bg-dark,color-mix(in oklch, var(--zui-color-pink-dark,oklch(28.4%_0.109_3.907)) 18%, transparent))] p-6",
  orange:
    "rounded-xl border border-[color:var(--zui-wizard-orange-border,var(--zui-color-orange,oklch(47%_0.157_37.304)))] dark:border-[color:var(--zui-wizard-orange-border-dark,var(--zui-color-orange-dark,oklch(64.6%_0.222_41.116)))] bg-[var(--zui-wizard-orange-bg,color-mix(in oklch, var(--zui-color-orange,oklch(98%_0.016_73.684)) 10%, transparent))] dark:bg-[var(--zui-wizard-orange-bg-dark,color-mix(in oklch, var(--zui-color-orange-dark,oklch(26.6%_0.079_36.259)) 18%, transparent))] p-6",
  yellow:
    "rounded-xl border border-[color:var(--zui-wizard-yellow-border,var(--zui-color-yellow,oklch(47.6%_0.114_61.907)))] dark:border-[color:var(--zui-wizard-yellow-border-dark,var(--zui-color-yellow-dark,oklch(68.1%_0.162_75.834)))] bg-[var(--zui-wizard-yellow-bg,color-mix(in oklch, var(--zui-color-yellow,oklch(98.7%_0.026_102.212)) 10%, transparent))] dark:bg-[var(--zui-wizard-yellow-bg-dark,color-mix(in oklch, var(--zui-color-yellow-dark,oklch(28.6%_0.066_53.813)) 18%, transparent))] p-6",
  teal: "rounded-xl border border-[color:var(--zui-wizard-teal-border,var(--zui-color-teal,oklch(43.7%_0.078_188.216)))] dark:border-[color:var(--zui-wizard-teal-border-dark,var(--zui-color-teal-dark,oklch(60%_0.118_184.704)))] bg-[var(--zui-wizard-teal-bg,color-mix(in oklch, var(--zui-color-teal,oklch(98.4%_0.014_180.72)) 10%, transparent))] dark:bg-[var(--zui-wizard-teal-bg-dark,color-mix(in oklch, var(--zui-color-teal-dark,oklch(27.7%_0.046_192.524)) 18%, transparent))] p-6",
  indigo:
    "rounded-xl border border-[color:var(--zui-wizard-indigo-border,var(--zui-color-indigo,oklch(39.8%_0.195_277.366)))] dark:border-[color:var(--zui-wizard-indigo-border-dark,var(--zui-color-indigo-dark,oklch(51.1%_0.262_276.966)))] bg-[var(--zui-wizard-indigo-bg,color-mix(in oklch, var(--zui-color-indigo,oklch(96.2%_0.018_272.314)) 10%, transparent))] dark:bg-[var(--zui-wizard-indigo-bg-dark,color-mix(in oklch, var(--zui-color-indigo-dark,oklch(25.7%_0.09_281.288)) 18%, transparent))] p-6",
  emerald:
    "rounded-xl border border-[color:var(--zui-wizard-emerald-border,var(--zui-color-emerald,oklch(43.2%_0.095_166.913)))] dark:border-[color:var(--zui-wizard-emerald-border-dark,var(--zui-color-emerald-dark,oklch(59.6%_0.145_163.225)))] bg-[var(--zui-wizard-emerald-bg,color-mix(in oklch, var(--zui-color-emerald,oklch(97.9%_0.021_166.113)) 10%, transparent))] dark:bg-[var(--zui-wizard-emerald-bg-dark,color-mix(in oklch, var(--zui-color-emerald-dark,oklch(26.2%_0.051_172.552)) 18%, transparent))] p-6",
  "gradient-blue":
    "rounded-xl border border-[color:var(--zui-wizard-gradient-blue-border,var(--zui-color-blue,oklch(42.4%_0.199_265.638)))] dark:border-[color:var(--zui-wizard-gradient-blue-border-dark,var(--zui-color-blue-dark,oklch(54.6%_0.245_262.881)))] bg-linear-to-r from-[var(--zui-wizard-gradient-blue-from,var(--zui-color-blue,oklch(97%_0.014_254.604)))] dark:from-[var(--zui-wizard-gradient-blue-from-dark,var(--zui-color-blue-dark,oklch(28.2%_0.091_267.935_/_0.7)))] to-[var(--zui-wizard-gradient-blue-to,var(--zui-color-purple,oklch(97.7%_0.014_308.299)))] dark:to-[var(--zui-wizard-gradient-blue-to-dark,var(--zui-color-purple-dark,oklch(29.1%_0.149_302.717_/_0.7)))] p-6",
  "gradient-green":
    "rounded-xl border border-[color:var(--zui-wizard-gradient-green-border,var(--zui-color-green,oklch(44.8%_0.119_151.328)))] dark:border-[color:var(--zui-wizard-gradient-green-border-dark,var(--zui-color-green-dark,oklch(62.7%_0.194_149.214)))] bg-linear-to-r from-[var(--zui-wizard-gradient-green-from,var(--zui-color-green,oklch(98.2%_0.018_155.826)))] dark:from-[var(--zui-wizard-gradient-green-from-dark,var(--zui-color-green-dark,oklch(26.6%_0.065_152.934_/_0.7)))] to-[var(--zui-wizard-gradient-green-to,var(--zui-color-lime,oklch(98.6%_0.031_120.757)))] dark:to-[var(--zui-wizard-gradient-green-to-dark,var(--zui-color-lime-dark,oklch(27.4%_0.072_132.109_/_0.7)))] p-6",
  "gradient-red":
    "rounded-xl border border-[color:var(--zui-wizard-gradient-red-border,var(--zui-color-red,oklch(44.4%_0.177_26.899)))] dark:border-[color:var(--zui-wizard-gradient-red-border-dark,var(--zui-color-red-dark,oklch(57.7%_0.245_27.325)))] bg-linear-to-r from-[var(--zui-wizard-gradient-red-from,var(--zui-color-red,oklch(97.1%_0.013_17.38)))] dark:from-[var(--zui-wizard-gradient-red-from-dark,var(--zui-color-red-dark,oklch(25.8%_0.092_26.042_/_0.7)))] to-[var(--zui-wizard-gradient-red-to,var(--zui-color-pink,oklch(97.1%_0.014_343.198)))] dark:to-[var(--zui-wizard-gradient-red-to-dark,var(--zui-color-pink-dark,oklch(28.4%_0.109_3.907_/_0.7)))] p-6",
  "gradient-yellow":
    "rounded-xl border border-[color:var(--zui-wizard-gradient-yellow-border,var(--zui-color-yellow,oklch(47.6%_0.114_61.907)))] dark:border-[color:var(--zui-wizard-gradient-yellow-border-dark,var(--zui-color-yellow-dark,oklch(68.1%_0.162_75.834)))] bg-linear-to-r from-[var(--zui-wizard-gradient-yellow-from,var(--zui-color-yellow,oklch(98.7%_0.026_102.212)))] dark:from-[var(--zui-wizard-gradient-yellow-from-dark,var(--zui-color-yellow-dark,oklch(28.6%_0.066_53.813_/_0.7)))] to-[var(--zui-wizard-gradient-yellow-to,var(--zui-color-orange,oklch(98%_0.016_73.684)))] dark:to-[var(--zui-wizard-gradient-yellow-to-dark,var(--zui-color-orange-dark,oklch(26.6%_0.079_36.259_/_0.7)))] p-6",
  "gradient-purple":
    "rounded-xl border border-[color:var(--zui-wizard-gradient-purple-border,var(--zui-color-purple,oklch(43.8%_0.218_303.724)))] dark:border-[color:var(--zui-wizard-gradient-purple-border-dark,var(--zui-color-purple-dark,oklch(55.8%_0.288_302.321)))] bg-linear-to-r from-[var(--zui-wizard-gradient-purple-from,var(--zui-color-purple,oklch(97.7%_0.014_308.299)))] dark:from-[var(--zui-wizard-gradient-purple-from-dark,var(--zui-color-purple-dark,oklch(29.1%_0.149_302.717_/_0.7)))] to-[var(--zui-wizard-gradient-purple-to,var(--zui-color-pink,oklch(97.1%_0.014_343.198)))] dark:to-[var(--zui-wizard-gradient-purple-to-dark,var(--zui-color-pink-dark,oklch(28.4%_0.109_3.907_/_0.7)))] p-6",
  "gradient-teal":
    "rounded-xl border border-[color:var(--zui-wizard-gradient-teal-border,var(--zui-color-teal,oklch(43.7%_0.078_188.216)))] dark:border-[color:var(--zui-wizard-gradient-teal-border-dark,var(--zui-color-teal-dark,oklch(60%_0.118_184.704)))] bg-linear-to-r from-[var(--zui-wizard-gradient-teal-from,var(--zui-color-teal,oklch(98.4%_0.014_180.72)))] dark:from-[var(--zui-wizard-gradient-teal-from-dark,var(--zui-color-teal-dark,oklch(27.7%_0.046_192.524_/_0.7)))] to-[var(--zui-wizard-gradient-teal-to,var(--zui-color-cyan,oklch(98.4%_0.019_200.873)))] dark:to-[var(--zui-wizard-gradient-teal-to-dark,var(--zui-color-cyan-dark,oklch(30.2%_0.056_229.695_/_0.7)))] p-6",
  "gradient-indigo":
    "rounded-xl border border-[color:var(--zui-wizard-gradient-indigo-border,var(--zui-color-indigo,oklch(39.8%_0.195_277.366)))] dark:border-[color:var(--zui-wizard-gradient-indigo-border-dark,var(--zui-color-indigo-dark,oklch(51.1%_0.262_276.966)))] bg-linear-to-r from-[var(--zui-wizard-gradient-indigo-from,var(--zui-color-indigo,oklch(96.2%_0.018_272.314)))] dark:from-[var(--zui-wizard-gradient-indigo-from-dark,var(--zui-color-indigo-dark,oklch(25.7%_0.09_281.288_/_0.7)))] to-[var(--zui-wizard-gradient-indigo-to,var(--zui-color-purple,oklch(97.7%_0.014_308.299)))] dark:to-[var(--zui-wizard-gradient-indigo-to-dark,var(--zui-color-purple-dark,oklch(29.1%_0.149_302.717_/_0.7)))] p-6",
  "gradient-pink":
    "rounded-xl border border-[color:var(--zui-wizard-gradient-pink-border,var(--zui-color-pink,oklch(45.9%_0.187_3.815)))] dark:border-[color:var(--zui-wizard-gradient-pink-border-dark,var(--zui-color-pink-dark,oklch(59.2%_0.249_0.584)))] bg-linear-to-r from-[var(--zui-wizard-gradient-pink-from,var(--zui-color-pink,oklch(97.1%_0.014_343.198)))] dark:from-[var(--zui-wizard-gradient-pink-from-dark,var(--zui-color-pink-dark,oklch(28.4%_0.109_3.907_/_0.7)))] to-[var(--zui-wizard-gradient-pink-to,var(--zui-color-rose,oklch(96.9%_0.015_12.422)))] dark:to-[var(--zui-wizard-gradient-pink-to-dark,var(--zui-color-rose-dark,oklch(27.1%_0.105_12.094_/_0.7)))] p-6",
  "gradient-orange":
    "rounded-xl border border-[color:var(--zui-wizard-gradient-orange-border,var(--zui-color-orange,oklch(47%_0.157_37.304)))] dark:border-[color:var(--zui-wizard-gradient-orange-border-dark,var(--zui-color-orange-dark,oklch(64.6%_0.222_41.116)))] bg-linear-to-r from-[var(--zui-wizard-gradient-orange-from,var(--zui-color-orange,oklch(98%_0.016_73.684)))] dark:from-[var(--zui-wizard-gradient-orange-from-dark,var(--zui-color-orange-dark,oklch(26.6%_0.079_36.259_/_0.7)))] to-[var(--zui-wizard-gradient-orange-to,var(--zui-color-red,oklch(97.1%_0.013_17.38)))] dark:to-[var(--zui-wizard-gradient-orange-to-dark,var(--zui-color-red-dark,oklch(25.8%_0.092_26.042_/_0.7)))] p-6",
} as const;

export const zuiWizardSizes = {
  sm: "gap-4 p-4",
  md: "gap-6 p-6",
  lg: "gap-8 p-8",
} as const;

export const zuiWizardHeaderBase =
  "text-[color:var(--zui-wizard-header-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-wizard-header-fg-dark,var(--zui-fg-dark,oklch(92.9%_0.013_255.508)))]";

export const zuiWizardHeaderSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

export const zuiWizardContentBase =
  "text-[color:var(--zui-wizard-content-fg,var(--zui-fg,oklch(37.2%_0.044_257.287)))] dark:text-[color:var(--zui-wizard-content-fg-dark,var(--zui-fg-dark,oklch(92.9%_0.013_255.508)))]";

export const zuiWizardProgressBase = "w-full";

export const zuiWizardProgressBarBase =
  "h-2 overflow-hidden rounded-full bg-[var(--zui-wizard-progress-track-bg,var(--zui-surface-muted,oklch(55.4%_0.046_257.417_/_0.25)))] dark:bg-[var(--zui-wizard-progress-track-bg-dark,var(--zui-surface-muted-dark,oklch(55.4%_0.046_257.417_/_0.25)))]";

export const zuiWizardProgressFillBase =
  "h-full rounded-full bg-[var(--zui-wizard-progress-fill-bg,var(--zui-color-blue,#2563eb))] dark:bg-[var(--zui-wizard-progress-fill-bg-dark,var(--zui-color-blue-dark,#3b82f6))] transition-all duration-300";

export const zuiWizardProgressDotsBase = "flex items-center gap-2";

export const zuiWizardProgressDotBase =
  "size-2.5 rounded-full bg-[var(--zui-wizard-progress-dot-bg,var(--zui-surface-muted,oklch(55.4%_0.046_257.417_/_0.25)))] dark:bg-[var(--zui-wizard-progress-dot-bg-dark,var(--zui-surface-muted-dark,oklch(55.4%_0.046_257.417_/_0.25)))]";

export const zuiWizardProgressDotActiveBase =
  "bg-[var(--zui-wizard-progress-dot-active-bg,var(--zui-color-blue,#2563eb))] dark:bg-[var(--zui-wizard-progress-dot-active-bg-dark,var(--zui-color-blue-dark,#3b82f6))]";

export const zuiWizardProgressDotCompletedBase =
  "bg-[var(--zui-wizard-progress-dot-completed-bg,var(--zui-color-emerald,#059669))] dark:bg-[var(--zui-wizard-progress-dot-completed-bg-dark,var(--zui-color-emerald-dark,#34d399))]";

export const zuiWizardNavigationBase =
  "flex items-center justify-between gap-4";

export const zuiWizardNavigationSizes = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
} as const;

export const zuiWizardSidebarBase =
  "flex flex-col gap-2 border-r border-[color:var(--zui-wizard-sidebar-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-wizard-sidebar-border-dark,var(--zui-border-dark,#ffffff1a))] pr-6";

export const zuiWizardSidebarStepBase =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[color:var(--zui-wizard-sidebar-step-fg,var(--zui-fg-muted,oklch(55.4%_0.046_257.417)))] dark:text-[color:var(--zui-wizard-sidebar-step-fg-dark,var(--zui-fg-muted-dark,oklch(70.4%_0.04_256.788)))] transition-colors hover:bg-[var(--zui-wizard-sidebar-step-bg-hover,var(--zui-surface-hover,oklch(55.4%_0.046_257.417_/_0.1)))] dark:hover:bg-[var(--zui-wizard-sidebar-step-bg-hover-dark,var(--zui-surface-hover-dark,oklch(55.4%_0.046_257.417_/_0.1)))]";

export const zuiWizardSidebarStepActiveBase =
  "bg-[var(--zui-wizard-sidebar-step-active-bg,var(--zui-color-blue,#2563eb_/_0.1))] dark:bg-[var(--zui-wizard-sidebar-step-active-bg-dark,var(--zui-color-blue-dark,#3b82f6_/_0.15))] text-[color:var(--zui-wizard-sidebar-step-active-fg,var(--zui-color-blue,#2563eb))] dark:text-[color:var(--zui-wizard-sidebar-step-active-fg-dark,var(--zui-color-blue-dark,#60a5fa))]";

export const zuiWizardSidebarStepCompletedBase =
  "text-[color:var(--zui-wizard-sidebar-step-completed-fg,var(--zui-color-emerald,#059669))] dark:text-[color:var(--zui-wizard-sidebar-step-completed-fg-dark,var(--zui-color-emerald-dark,#34d399))]";

export const zuiWizardStepIndicatorBase =
  "grid size-8 shrink-0 place-items-center rounded-full border text-xs font-semibold";

export const zuiWizardStepIndicatorStates = {
  upcoming:
    "border-[color:var(--zui-wizard-step-indicator-upcoming-border,var(--zui-border,#00000026))] dark:border-[color:var(--zui-wizard-step-indicator-upcoming-border-dark,var(--zui-border-dark,#ffffff26))] bg-[var(--zui-wizard-step-indicator-upcoming-bg,transparent)] dark:bg-[var(--zui-wizard-step-indicator-upcoming-bg-dark,transparent)] text-[color:var(--zui-wizard-step-indicator-upcoming-fg,var(--zui-fg-muted,oklch(55.4%_0.046_257.417)))] dark:text-[color:var(--zui-wizard-step-indicator-upcoming-fg-dark,var(--zui-fg-muted-dark,oklch(70.4%_0.04_256.788)))]",
  current:
    "border-[color:var(--zui-wizard-step-indicator-current-border,var(--zui-color-blue,#2563eb))] dark:border-[color:var(--zui-wizard-step-indicator-current-border-dark,var(--zui-color-blue-dark,#3b82f6))] bg-[var(--zui-wizard-step-indicator-current-bg,var(--zui-color-blue,#2563eb))] dark:bg-[var(--zui-wizard-step-indicator-current-bg-dark,var(--zui-color-blue-dark,#3b82f6))] text-white",
  completed:
    "border-[color:var(--zui-wizard-step-indicator-completed-border,var(--zui-color-emerald,#059669))] dark:border-[color:var(--zui-wizard-step-indicator-completed-border-dark,var(--zui-color-emerald-dark,#34d399))] bg-[var(--zui-wizard-step-indicator-completed-bg,var(--zui-color-emerald,#059669))] dark:bg-[var(--zui-wizard-step-indicator-completed-bg-dark,var(--zui-color-emerald-dark,#34d399))] text-white",
} as const;

export type ZuiWizardStepIndicatorState =
  keyof typeof zuiWizardStepIndicatorStates;

export const zuiWizardFooterBase =
  "border-t border-[color:var(--zui-wizard-footer-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-wizard-footer-border-dark,var(--zui-border-dark,#ffffff1a))] pt-6";
