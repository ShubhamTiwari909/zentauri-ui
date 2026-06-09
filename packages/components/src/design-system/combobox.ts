export const zuiComboboxTriggerBase =
  "flex items-center cursor-pointer justify-between rounded-md border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zui-combobox-trigger-ring-focus,oklch(44.6%_0.03_256.802))] dark:focus-visible:ring-[var(--zui-combobox-trigger-ring-focus-dark,oklch(70.7%_0.022_261.325))] focus-visible:ring-offset-2";

export const zuiComboboxTriggerVariants = {
  default:
    "border-[color:var(--zui-combobox-trigger-default-border,oklch(87.2%_0.01_258.338))] dark:border-[color:var(--zui-combobox-trigger-default-border-dark,oklch(87.2%_0.01_258.338))] bg-[var(--zui-combobox-trigger-default-bg,#ffffff)] dark:bg-[var(--zui-combobox-trigger-default-bg-dark,#000000)] text-[color:var(--zui-combobox-trigger-default-fg,oklch(13%_0.028_261.692))] dark:text-[color:var(--zui-combobox-trigger-default-fg-dark,#ffffff)]",
  outline:
    "border-2 border-[color:var(--zui-combobox-trigger-outline-border,oklch(55.1%_0.027_264.364))] dark:border-[color:var(--zui-combobox-trigger-outline-border-dark,oklch(55.1%_0.027_264.364))] text-[color:var(--zui-combobox-trigger-outline-fg,oklch(13%_0.028_261.692))] dark:text-[color:var(--zui-combobox-trigger-outline-fg-dark,oklch(96.7%_0.003_264.542))]",
  ghost:
    "border-[color:var(--zui-combobox-trigger-ghost-border,transparent)] dark:border-[color:var(--zui-combobox-trigger-ghost-border-dark,transparent)] text-[color:var(--zui-combobox-trigger-ghost-fg,oklch(13%_0.028_261.692))] dark:text-[color:var(--zui-combobox-trigger-ghost-fg-dark,oklch(96.7%_0.003_264.542))]",
  sky: "border-[color:var(--zui-combobox-trigger-sky-border,oklch(44.3%_0.11_240.79))] dark:border-[color:var(--zui-combobox-trigger-sky-border-dark,oklch(58.8%_0.158_241.966))] text-[color:var(--zui-combobox-trigger-sky-fg,oklch(29.3%_0.066_243.157))] dark:text-[color:var(--zui-combobox-trigger-sky-fg-dark,oklch(58.8%_0.158_241.966))]",
  rose: "border-[color:var(--zui-combobox-trigger-rose-border,oklch(45.5%_0.188_13.697))] dark:border-[color:var(--zui-combobox-trigger-rose-border-dark,oklch(58.6%_0.253_17.585))] text-[color:var(--zui-combobox-trigger-rose-fg,oklch(27.1%_0.105_12.094))] dark:text-[color:var(--zui-combobox-trigger-rose-fg-dark,oklch(58.6%_0.253_17.585))]",
  purple:
    "border-[color:var(--zui-combobox-trigger-purple-border,oklch(43.8%_0.218_303.724))] dark:border-[color:var(--zui-combobox-trigger-purple-border-dark,oklch(55.8%_0.288_302.321))] text-[color:var(--zui-combobox-trigger-purple-fg,oklch(29.1%_0.149_302.717))] dark:text-[color:var(--zui-combobox-trigger-purple-fg-dark,oklch(55.8%_0.288_302.321))]",
  pink: "border-[color:var(--zui-combobox-trigger-pink-border,oklch(45.9%_0.187_3.815))] dark:border-[color:var(--zui-combobox-trigger-pink-border-dark,oklch(59.2%_0.249_0.584))] text-[color:var(--zui-combobox-trigger-pink-fg,oklch(28.4%_0.109_3.907))] dark:text-[color:var(--zui-combobox-trigger-pink-fg-dark,oklch(59.2%_0.249_0.584))]",
  orange:
    "border-[color:var(--zui-combobox-trigger-orange-border,oklch(47%_0.157_37.304))] dark:border-[color:var(--zui-combobox-trigger-orange-border-dark,oklch(64.6%_0.222_41.116))] text-[color:var(--zui-combobox-trigger-orange-fg,oklch(26.6%_0.079_36.259))] dark:text-[color:var(--zui-combobox-trigger-orange-fg-dark,oklch(64.6%_0.222_41.116))]",
  yellow:
    "border-[color:var(--zui-combobox-trigger-yellow-border,oklch(47.6%_0.114_61.907))] dark:border-[color:var(--zui-combobox-trigger-yellow-border-dark,oklch(68.1%_0.162_75.834))] text-[color:var(--zui-combobox-trigger-yellow-fg,oklch(28.6%_0.066_53.813))] dark:text-[color:var(--zui-combobox-trigger-yellow-fg-dark,oklch(68.1%_0.162_75.834))]",
  teal: "border-[color:var(--zui-combobox-trigger-teal-border,oklch(43.7%_0.078_188.216))] dark:border-[color:var(--zui-combobox-trigger-teal-border-dark,oklch(60%_0.118_184.704))] text-[color:var(--zui-combobox-trigger-teal-fg,oklch(27.7%_0.046_192.524))] dark:text-[color:var(--zui-combobox-trigger-teal-fg-dark,oklch(60%_0.118_184.704))]",
  indigo:
    "border-[color:var(--zui-combobox-trigger-indigo-border,oklch(58.5%_0.233_277.117))] dark:border-[color:var(--zui-combobox-trigger-indigo-border-dark,oklch(58.5%_0.233_277.117))] text-[color:var(--zui-combobox-trigger-indigo-fg,oklch(25.7%_0.09_281.288))] dark:text-[color:var(--zui-combobox-trigger-indigo-fg-dark,oklch(58.5%_0.233_277.117))]",
  emerald:
    "border-[color:var(--zui-combobox-trigger-emerald-border,oklch(43.2%_0.095_166.913))] dark:border-[color:var(--zui-combobox-trigger-emerald-border-dark,oklch(59.6%_0.145_163.225))] text-[color:var(--zui-combobox-trigger-emerald-fg,oklch(26.2%_0.051_172.552))] dark:text-[color:var(--zui-combobox-trigger-emerald-fg-dark,oklch(59.6%_0.145_163.225))]",
  glass:
    "border-[color:var(--zui-combobox-trigger-glass-border,#00000026)] dark:border-[color:var(--zui-combobox-trigger-glass-border-dark,#ffffff26)] bg-[var(--zui-combobox-trigger-glass-bg,#0000001a)] dark:bg-[var(--zui-combobox-trigger-glass-bg-dark,#ffffff1a)] text-[color:var(--zui-combobox-trigger-glass-fg,oklch(13%_0.028_261.692))] dark:text-[color:var(--zui-combobox-trigger-glass-fg-dark,#ffffff)] backdrop-blur-md",
  "gradient-blue":
    "bg-linear-to-r from-[var(--zui-combobox-trigger-gradient-blue-from,oklch(37.9%_0.146_265.522))] dark:from-[var(--zui-combobox-trigger-gradient-blue-from-dark,oklch(54.6%_0.245_262.881))] to-[var(--zui-combobox-trigger-gradient-blue-to,oklch(38.1%_0.176_304.987))] dark:to-[var(--zui-combobox-trigger-gradient-blue-to-dark,oklch(55.8%_0.288_302.321))] backdrop-blur-xl text-[color:var(--zui-combobox-trigger-gradient-blue-fg,#ffffff)] dark:text-[color:var(--zui-combobox-trigger-gradient-blue-fg-dark,#ffffff)]",
  "gradient-green":
    "bg-linear-to-r from-[var(--zui-combobox-trigger-gradient-green-from,oklch(39.3%_0.095_152.535))] dark:from-[var(--zui-combobox-trigger-gradient-green-from-dark,oklch(62.7%_0.194_149.214))] to-[var(--zui-combobox-trigger-gradient-green-to,oklch(40.5%_0.101_131.063))] dark:to-[var(--zui-combobox-trigger-gradient-green-to-dark,oklch(64.8%_0.2_131.684))] backdrop-blur-xl text-[color:var(--zui-combobox-trigger-gradient-green-fg,#ffffff)] dark:text-[color:var(--zui-combobox-trigger-gradient-green-fg-dark,#ffffff)]",
  "gradient-red":
    "bg-linear-to-r from-[var(--zui-combobox-trigger-gradient-red-from,oklch(39.6%_0.141_25.723))] dark:from-[var(--zui-combobox-trigger-gradient-red-from-dark,oklch(57.7%_0.245_27.325))] to-[var(--zui-combobox-trigger-gradient-red-to,oklch(40.8%_0.153_2.432))] dark:to-[var(--zui-combobox-trigger-gradient-red-to-dark,oklch(59.2%_0.249_0.584))] backdrop-blur-xl text-[color:var(--zui-combobox-trigger-gradient-red-fg,#ffffff)] dark:text-[color:var(--zui-combobox-trigger-gradient-red-fg-dark,#ffffff)]",
  "gradient-yellow":
    "bg-linear-to-r from-[var(--zui-combobox-trigger-gradient-yellow-from,oklch(42.1%_0.095_57.708))] dark:from-[var(--zui-combobox-trigger-gradient-yellow-from-dark,oklch(68.1%_0.162_75.834))] to-[var(--zui-combobox-trigger-gradient-yellow-to,oklch(40.8%_0.123_38.172))] dark:to-[var(--zui-combobox-trigger-gradient-yellow-to-dark,oklch(64.6%_0.222_41.116))] backdrop-blur-xl text-[color:var(--zui-combobox-trigger-gradient-yellow-fg,#ffffff)] dark:text-[color:var(--zui-combobox-trigger-gradient-yellow-fg-dark,#ffffff)]",
  "gradient-purple":
    "bg-linear-to-r from-[var(--zui-combobox-trigger-gradient-purple-from,oklch(38.1%_0.176_304.987))] dark:from-[var(--zui-combobox-trigger-gradient-purple-from-dark,oklch(55.8%_0.288_302.321))] to-[var(--zui-combobox-trigger-gradient-purple-to,oklch(40.8%_0.153_2.432))] dark:to-[var(--zui-combobox-trigger-gradient-purple-to-dark,oklch(59.2%_0.249_0.584))] backdrop-blur-xl text-[color:var(--zui-combobox-trigger-gradient-purple-fg,#ffffff)] dark:text-[color:var(--zui-combobox-trigger-gradient-purple-fg-dark,#ffffff)]",
  "gradient-teal":
    "bg-linear-to-r from-[var(--zui-combobox-trigger-gradient-teal-from,oklch(38.6%_0.063_188.416))] dark:from-[var(--zui-combobox-trigger-gradient-teal-from-dark,oklch(60%_0.118_184.704))] to-[var(--zui-combobox-trigger-gradient-teal-to,oklch(39.8%_0.07_227.392))] dark:to-[var(--zui-combobox-trigger-gradient-teal-to-dark,oklch(60.9%_0.126_221.723))] backdrop-blur-xl text-[color:var(--zui-combobox-trigger-gradient-teal-fg,#ffffff)] dark:text-[color:var(--zui-combobox-trigger-gradient-teal-fg-dark,#ffffff)]",
  "gradient-indigo":
    "bg-linear-to-r from-[var(--zui-combobox-trigger-gradient-indigo-from,oklch(35.9%_0.144_278.697))] dark:from-[var(--zui-combobox-trigger-gradient-indigo-from-dark,oklch(51.1%_0.262_276.966))] to-[var(--zui-combobox-trigger-gradient-indigo-to,oklch(38.1%_0.176_304.987))] dark:to-[var(--zui-combobox-trigger-gradient-indigo-to-dark,oklch(55.8%_0.288_302.321))] backdrop-blur-xl text-[color:var(--zui-combobox-trigger-gradient-indigo-fg,#ffffff)] dark:text-[color:var(--zui-combobox-trigger-gradient-indigo-fg-dark,#ffffff)]",
  "gradient-pink":
    "bg-linear-to-r from-[var(--zui-combobox-trigger-gradient-pink-from,oklch(40.8%_0.153_2.432))] dark:from-[var(--zui-combobox-trigger-gradient-pink-from-dark,oklch(59.2%_0.249_0.584))] to-[var(--zui-combobox-trigger-gradient-pink-to,oklch(41%_0.159_10.272))] dark:to-[var(--zui-combobox-trigger-gradient-pink-to-dark,oklch(58.6%_0.253_17.585))] backdrop-blur-xl text-[color:var(--zui-combobox-trigger-gradient-pink-fg,#ffffff)] dark:text-[color:var(--zui-combobox-trigger-gradient-pink-fg-dark,#ffffff)]",
  "gradient-orange":
    "bg-linear-to-r from-[var(--zui-combobox-trigger-gradient-orange-from,oklch(40.8%_0.123_38.172))] dark:from-[var(--zui-combobox-trigger-gradient-orange-from-dark,oklch(64.6%_0.222_41.116))] to-[var(--zui-combobox-trigger-gradient-orange-to,oklch(39.6%_0.141_25.723))] dark:to-[var(--zui-combobox-trigger-gradient-orange-to-dark,oklch(57.7%_0.245_27.325))] backdrop-blur-xl text-[color:var(--zui-combobox-trigger-gradient-orange-fg,#ffffff)] dark:text-[color:var(--zui-combobox-trigger-gradient-orange-fg-dark,#ffffff)]",
  blue: "border border-[color:var(--zui-combobox-trigger-blue-border,#2563eb)] dark:border-[color:var(--zui-combobox-trigger-blue-border-dark,#3b82f6)] text-[color:var(--zui-combobox-trigger-blue-fg,#2563eb)] dark:text-[color:var(--zui-combobox-trigger-blue-fg-dark,#3b82f6)] hover:bg-[var(--zui-combobox-trigger-blue-bg-hover,#2563eb14)] dark:hover:bg-[var(--zui-combobox-trigger-blue-bg-hover-dark,#3b82f624)]",
  cyan: "border border-[color:var(--zui-combobox-trigger-cyan-border,#0891b2)] dark:border-[color:var(--zui-combobox-trigger-cyan-border-dark,#22d3ee)] text-[color:var(--zui-combobox-trigger-cyan-fg,#0891b2)] dark:text-[color:var(--zui-combobox-trigger-cyan-fg-dark,#22d3ee)] hover:bg-[var(--zui-combobox-trigger-cyan-bg-hover,#0891b214)] dark:hover:bg-[var(--zui-combobox-trigger-cyan-bg-hover-dark,#22d3ee24)]",
  green:
    "border border-[color:var(--zui-combobox-trigger-green-border,#16a34a)] dark:border-[color:var(--zui-combobox-trigger-green-border-dark,#22c55e)] text-[color:var(--zui-combobox-trigger-green-fg,#16a34a)] dark:text-[color:var(--zui-combobox-trigger-green-fg-dark,#22c55e)] hover:bg-[var(--zui-combobox-trigger-green-bg-hover,#16a34a14)] dark:hover:bg-[var(--zui-combobox-trigger-green-bg-hover-dark,#22c55e24)]",
  lime: "border border-[color:var(--zui-combobox-trigger-lime-border,#65a30d)] dark:border-[color:var(--zui-combobox-trigger-lime-border-dark,#a3e635)] text-[color:var(--zui-combobox-trigger-lime-fg,#65a30d)] dark:text-[color:var(--zui-combobox-trigger-lime-fg-dark,#a3e635)] hover:bg-[var(--zui-combobox-trigger-lime-bg-hover,#65a30d14)] dark:hover:bg-[var(--zui-combobox-trigger-lime-bg-hover-dark,#a3e63524)]",
  mint: "border border-[color:var(--zui-combobox-trigger-mint-border,#10b981)] dark:border-[color:var(--zui-combobox-trigger-mint-border-dark,#6ee7b7)] text-[color:var(--zui-combobox-trigger-mint-fg,#10b981)] dark:text-[color:var(--zui-combobox-trigger-mint-fg-dark,#6ee7b7)] hover:bg-[var(--zui-combobox-trigger-mint-bg-hover,#10b98114)] dark:hover:bg-[var(--zui-combobox-trigger-mint-bg-hover-dark,#6ee7b724)]",
  ocean:
    "border border-[color:var(--zui-combobox-trigger-ocean-border,#0284c7)] dark:border-[color:var(--zui-combobox-trigger-ocean-border-dark,#38bdf8)] text-[color:var(--zui-combobox-trigger-ocean-fg,#0284c7)] dark:text-[color:var(--zui-combobox-trigger-ocean-fg-dark,#38bdf8)] hover:bg-[var(--zui-combobox-trigger-ocean-bg-hover,#0284c714)] dark:hover:bg-[var(--zui-combobox-trigger-ocean-bg-hover-dark,#38bdf824)]",
  sapphire:
    "border border-[color:var(--zui-combobox-trigger-sapphire-border,#1d4ed8)] dark:border-[color:var(--zui-combobox-trigger-sapphire-border-dark,#60a5fa)] text-[color:var(--zui-combobox-trigger-sapphire-fg,#1d4ed8)] dark:text-[color:var(--zui-combobox-trigger-sapphire-fg-dark,#60a5fa)] hover:bg-[var(--zui-combobox-trigger-sapphire-bg-hover,#1d4ed814)] dark:hover:bg-[var(--zui-combobox-trigger-sapphire-bg-hover-dark,#60a5fa24)]",
  lavender:
    "border border-[color:var(--zui-combobox-trigger-lavender-border,#8b5cf6)] dark:border-[color:var(--zui-combobox-trigger-lavender-border-dark,#a78bfa)] text-[color:var(--zui-combobox-trigger-lavender-fg,#8b5cf6)] dark:text-[color:var(--zui-combobox-trigger-lavender-fg-dark,#a78bfa)] hover:bg-[var(--zui-combobox-trigger-lavender-bg-hover,#8b5cf614)] dark:hover:bg-[var(--zui-combobox-trigger-lavender-bg-hover-dark,#a78bfa24)]",
  ruby: "border border-[color:var(--zui-combobox-trigger-ruby-border,#be123c)] dark:border-[color:var(--zui-combobox-trigger-ruby-border-dark,#fb7185)] text-[color:var(--zui-combobox-trigger-ruby-fg,#be123c)] dark:text-[color:var(--zui-combobox-trigger-ruby-fg-dark,#fb7185)] hover:bg-[var(--zui-combobox-trigger-ruby-bg-hover,#be123c14)] dark:hover:bg-[var(--zui-combobox-trigger-ruby-bg-hover-dark,#fb718524)]",
  red: "border border-[color:var(--zui-combobox-trigger-red-border,#dc2626)] dark:border-[color:var(--zui-combobox-trigger-red-border-dark,#ef4444)] text-[color:var(--zui-combobox-trigger-red-fg,#dc2626)] dark:text-[color:var(--zui-combobox-trigger-red-fg-dark,#ef4444)] hover:bg-[var(--zui-combobox-trigger-red-bg-hover,#dc262614)] dark:hover:bg-[var(--zui-combobox-trigger-red-bg-hover-dark,#ef444424)]",
  slate:
    "border border-[color:var(--zui-combobox-trigger-slate-border,#475569)] dark:border-[color:var(--zui-combobox-trigger-slate-border-dark,#64748b)] text-[color:var(--zui-combobox-trigger-slate-fg,#475569)] dark:text-[color:var(--zui-combobox-trigger-slate-fg-dark,#64748b)] hover:bg-[var(--zui-combobox-trigger-slate-bg-hover,#47556914)] dark:hover:bg-[var(--zui-combobox-trigger-slate-bg-hover-dark,#64748b24)]",
  zinc: "border border-[color:var(--zui-combobox-trigger-zinc-border,#52525b)] dark:border-[color:var(--zui-combobox-trigger-zinc-border-dark,#71717a)] text-[color:var(--zui-combobox-trigger-zinc-fg,#52525b)] dark:text-[color:var(--zui-combobox-trigger-zinc-fg-dark,#71717a)] hover:bg-[var(--zui-combobox-trigger-zinc-bg-hover,#52525b14)] dark:hover:bg-[var(--zui-combobox-trigger-zinc-bg-hover-dark,#71717a24)]",
  stone:
    "border border-[color:var(--zui-combobox-trigger-stone-border,#57534e)] dark:border-[color:var(--zui-combobox-trigger-stone-border-dark,#78716c)] text-[color:var(--zui-combobox-trigger-stone-fg,#57534e)] dark:text-[color:var(--zui-combobox-trigger-stone-fg-dark,#78716c)] hover:bg-[var(--zui-combobox-trigger-stone-bg-hover,#57534e14)] dark:hover:bg-[var(--zui-combobox-trigger-stone-bg-hover-dark,#78716c24)]",
  royal:
    "border border-[color:var(--zui-combobox-trigger-royal-border,#4338ca)] dark:border-[color:var(--zui-combobox-trigger-royal-border-dark,#818cf8)] text-[color:var(--zui-combobox-trigger-royal-fg,#4338ca)] dark:text-[color:var(--zui-combobox-trigger-royal-fg-dark,#818cf8)] hover:bg-[var(--zui-combobox-trigger-royal-bg-hover,#4338ca14)] dark:hover:bg-[var(--zui-combobox-trigger-royal-bg-hover-dark,#818cf824)]",
  electric:
    "border border-[color:var(--zui-combobox-trigger-electric-border,#0ea5e9)] dark:border-[color:var(--zui-combobox-trigger-electric-border-dark,#38bdf8)] text-[color:var(--zui-combobox-trigger-electric-fg,#0ea5e9)] dark:text-[color:var(--zui-combobox-trigger-electric-fg-dark,#38bdf8)] hover:bg-[var(--zui-combobox-trigger-electric-bg-hover,#0ea5e914)] dark:hover:bg-[var(--zui-combobox-trigger-electric-bg-hover-dark,#38bdf824)]",
  forest:
    "border border-[color:var(--zui-combobox-trigger-forest-border,#166534)] dark:border-[color:var(--zui-combobox-trigger-forest-border-dark,#4ade80)] text-[color:var(--zui-combobox-trigger-forest-fg,#166534)] dark:text-[color:var(--zui-combobox-trigger-forest-fg-dark,#4ade80)] hover:bg-[var(--zui-combobox-trigger-forest-bg-hover,#16653414)] dark:hover:bg-[var(--zui-combobox-trigger-forest-bg-hover-dark,#4ade8024)]",
  sunset:
    "border border-[color:var(--zui-combobox-trigger-sunset-border,#ea580c)] dark:border-[color:var(--zui-combobox-trigger-sunset-border-dark,#fb923c)] text-[color:var(--zui-combobox-trigger-sunset-fg,#ea580c)] dark:text-[color:var(--zui-combobox-trigger-sunset-fg-dark,#fb923c)] hover:bg-[var(--zui-combobox-trigger-sunset-bg-hover,#ea580c14)] dark:hover:bg-[var(--zui-combobox-trigger-sunset-bg-hover-dark,#fb923c24)]",
  magenta:
    "border border-[color:var(--zui-combobox-trigger-magenta-border,#c026d3)] dark:border-[color:var(--zui-combobox-trigger-magenta-border-dark,#e879f9)] text-[color:var(--zui-combobox-trigger-magenta-fg,#c026d3)] dark:text-[color:var(--zui-combobox-trigger-magenta-fg-dark,#e879f9)] hover:bg-[var(--zui-combobox-trigger-magenta-bg-hover,#c026d314)] dark:hover:bg-[var(--zui-combobox-trigger-magenta-bg-hover-dark,#e879f924)]",
  crimson:
    "border border-[color:var(--zui-combobox-trigger-crimson-border,#b91c1c)] dark:border-[color:var(--zui-combobox-trigger-crimson-border-dark,#f87171)] text-[color:var(--zui-combobox-trigger-crimson-fg,#b91c1c)] dark:text-[color:var(--zui-combobox-trigger-crimson-fg-dark,#f87171)] hover:bg-[var(--zui-combobox-trigger-crimson-bg-hover,#b91c1c14)] dark:hover:bg-[var(--zui-combobox-trigger-crimson-bg-hover-dark,#f8717124)]",
  aqua: "border border-[color:var(--zui-combobox-trigger-aqua-border,#0f766e)] dark:border-[color:var(--zui-combobox-trigger-aqua-border-dark,#2dd4bf)] text-[color:var(--zui-combobox-trigger-aqua-fg,#0f766e)] dark:text-[color:var(--zui-combobox-trigger-aqua-fg-dark,#2dd4bf)] hover:bg-[var(--zui-combobox-trigger-aqua-bg-hover,#0f766e14)] dark:hover:bg-[var(--zui-combobox-trigger-aqua-bg-hover-dark,#2dd4bf24)]",
  plum: "border border-[color:var(--zui-combobox-trigger-plum-border,#7e22ce)] dark:border-[color:var(--zui-combobox-trigger-plum-border-dark,#c084fc)] text-[color:var(--zui-combobox-trigger-plum-fg,#7e22ce)] dark:text-[color:var(--zui-combobox-trigger-plum-fg-dark,#c084fc)] hover:bg-[var(--zui-combobox-trigger-plum-bg-hover,#7e22ce14)] dark:hover:bg-[var(--zui-combobox-trigger-plum-bg-hover-dark,#c084fc24)]",
} as const;

export const zuiComboboxSizes = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2",
  lg: "px-4 py-3 text-lg",
} as const;

export const zuiComboboxItemBase =
  "cursor-pointer px-3 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zui-combobox-item-ring-focus,oklch(44.6%_0.03_256.802))] dark:focus-visible:ring-[var(--zui-combobox-item-ring-focus-dark,oklch(70.7%_0.022_261.325))] focus-visible:ring-inset";

export const zuiComboboxItemAppearances = {
  default:
    "bg-[var(--zui-combobox-item-default-bg,#ffffff)] dark:bg-[var(--zui-combobox-item-default-bg-dark,#000000)] text-[color:var(--zui-combobox-item-default-fg,oklch(21%_0.034_264.665))] dark:text-[color:var(--zui-combobox-item-default-fg-dark,oklch(92.8%_0.006_264.531))] data-[selected=true]:bg-[var(--zui-combobox-item-default-selected-bg,oklch(92.8%_0.006_264.531))] dark:data-[selected=true]:bg-[var(--zui-combobox-item-default-selected-bg-dark,oklch(27%_0.006_264.531))] data-[selected=true]:text-[color:var(--zui-combobox-item-default-selected-fg,oklch(37.3%_0.034_259.733))] dark:data-[selected=true]:text-[color:var(--zui-combobox-item-default-selected-fg-dark,oklch(92.8%_0.006_264.531))]",
  glass:
    "bg-[var(--zui-combobox-item-glass-bg,#0000001a)] dark:bg-[var(--zui-combobox-item-glass-bg-dark,#ffffff1a)] text-[color:var(--zui-combobox-item-glass-fg,oklch(37.3%_0.034_259.733))] dark:text-[color:var(--zui-combobox-item-glass-fg-dark,oklch(92.8%_0.006_264.531))]",
  outline:
    "border-2 border-[color:var(--zui-combobox-item-outline-border,oklch(55.1%_0.027_264.364))] dark:border-[color:var(--zui-combobox-item-outline-border-dark,oklch(55.1%_0.027_264.364))] text-[color:var(--zui-combobox-item-outline-fg,oklch(21%_0.034_264.665))] dark:text-[color:var(--zui-combobox-item-outline-fg-dark,oklch(96.7%_0.003_264.542))]",
  ghost:
    "border-[color:var(--zui-combobox-item-ghost-border,transparent)] dark:border-[color:var(--zui-combobox-item-ghost-border-dark,transparent)] text-[color:var(--zui-combobox-item-ghost-fg,oklch(21%_0.034_264.665))] dark:text-[color:var(--zui-combobox-item-ghost-fg-dark,oklch(96.7%_0.003_264.542))]",
  sky: "text-[color:var(--zui-combobox-item-sky-fg,oklch(39.1%_0.09_240.876))] dark:text-[color:var(--zui-combobox-item-sky-fg-dark,oklch(90.1%_0.058_230.902))] hover:bg-[var(--zui-combobox-item-sky-bg-hover,oklch(90.1%_0.058_230.902))] dark:hover:bg-[var(--zui-combobox-item-sky-bg-hover-dark,oklch(28%_0.04_232))]",
  rose: "text-[color:var(--zui-combobox-item-rose-fg,oklch(41%_0.159_10.272))] dark:text-[color:var(--zui-combobox-item-rose-fg-dark,oklch(89.2%_0.058_10.001))] hover:bg-[var(--zui-combobox-item-rose-bg-hover,oklch(89.2%_0.058_10.001))] dark:hover:bg-[var(--zui-combobox-item-rose-bg-hover-dark,oklch(27%_0.05_10))]",
  purple:
    "text-[color:var(--zui-combobox-item-purple-fg,oklch(38.1%_0.176_304.987))] dark:text-[color:var(--zui-combobox-item-purple-fg-dark,oklch(90.2%_0.063_306.703))] hover:bg-[var(--zui-combobox-item-purple-bg-hover,oklch(90.2%_0.063_306.703))] dark:hover:bg-[var(--zui-combobox-item-purple-bg-hover-dark,oklch(26%_0.06_304))]",
  pink: "text-[color:var(--zui-combobox-item-pink-fg,oklch(40.8%_0.153_2.432))] dark:text-[color:var(--zui-combobox-item-pink-fg-dark,oklch(89.9%_0.061_343.231))] hover:bg-[var(--zui-combobox-item-pink-bg-hover,oklch(89.9%_0.061_343.231))] dark:hover:bg-[var(--zui-combobox-item-pink-bg-hover-dark,oklch(27%_0.05_343))]",
  orange:
    "text-[color:var(--zui-combobox-item-orange-fg,oklch(40.8%_0.123_38.172))] dark:text-[color:var(--zui-combobox-item-orange-fg-dark,oklch(90.1%_0.076_70.697))] hover:bg-[var(--zui-combobox-item-orange-bg-hover,oklch(90.1%_0.076_70.697))] dark:hover:bg-[var(--zui-combobox-item-orange-bg-hover-dark,oklch(27%_0.04_38))]",
  yellow:
    "text-[color:var(--zui-combobox-item-yellow-fg,oklch(42.1%_0.095_57.708))] dark:text-[color:var(--zui-combobox-item-yellow-fg-dark,oklch(94.5%_0.129_101.54))] hover:bg-[var(--zui-combobox-item-yellow-bg-hover,oklch(94.5%_0.129_101.54))] dark:hover:bg-[var(--zui-combobox-item-yellow-bg-hover-dark,oklch(28%_0.05_58))]",
  teal: "text-[color:var(--zui-combobox-item-teal-fg,oklch(38.6%_0.063_188.416))] dark:text-[color:var(--zui-combobox-item-teal-fg-dark,oklch(91%_0.096_180.426))] hover:bg-[var(--zui-combobox-item-teal-bg-hover,oklch(91%_0.096_180.426))] dark:hover:bg-[var(--zui-combobox-item-teal-bg-hover-dark,oklch(26%_0.04_188))]",
  indigo:
    "text-[color:var(--zui-combobox-item-indigo-fg,oklch(35.9%_0.144_278.697))] dark:text-[color:var(--zui-combobox-item-indigo-fg-dark,oklch(87%_0.065_274.039))] hover:bg-[var(--zui-combobox-item-indigo-bg-hover,oklch(87%_0.065_274.039))] dark:hover:bg-[var(--zui-combobox-item-indigo-bg-hover-dark,oklch(25%_0.06_278))]",
  emerald:
    "text-[color:var(--zui-combobox-item-emerald-fg,oklch(37.8%_0.077_168.94))] dark:text-[color:var(--zui-combobox-item-emerald-fg-dark,oklch(90.5%_0.093_164.15))] hover:bg-[var(--zui-combobox-item-emerald-bg-hover,oklch(90.5%_0.093_164.15))] dark:hover:bg-[var(--zui-combobox-item-emerald-bg-hover-dark,oklch(26%_0.04_167))]",
  blue: "hover:bg-[var(--zui-combobox-item-blue-bg-hover,#2563eb18)] dark:hover:bg-[var(--zui-combobox-item-blue-bg-hover-dark,#3b82f62e)] hover:text-[color:var(--zui-combobox-item-blue-fg-hover,#2563eb)] dark:hover:text-[color:var(--zui-combobox-item-blue-fg-hover-dark,#3b82f6)] bg-[var(--zui-combobox-item-blue-bg,#2563eb10)] dark:bg-[var(--zui-combobox-item-blue-bg-dark,#3b82f61f)] text-[color:var(--zui-combobox-item-blue-fg,#2563eb)] dark:text-[color:var(--zui-combobox-item-blue-fg-dark,#3b82f6)]",
  cyan: "hover:bg-[var(--zui-combobox-item-cyan-bg-hover,#0891b218)] dark:hover:bg-[var(--zui-combobox-item-cyan-bg-hover-dark,#22d3ee2e)] hover:text-[color:var(--zui-combobox-item-cyan-fg-hover,#0891b2)] dark:hover:text-[color:var(--zui-combobox-item-cyan-fg-hover-dark,#22d3ee)] bg-[var(--zui-combobox-item-cyan-bg,#0891b210)] dark:bg-[var(--zui-combobox-item-cyan-bg-dark,#22d3ee1f)] text-[color:var(--zui-combobox-item-cyan-fg,#0891b2)] dark:text-[color:var(--zui-combobox-item-cyan-fg-dark,#22d3ee)]",
  green:
    "hover:bg-[var(--zui-combobox-item-green-bg-hover,#16a34a18)] dark:hover:bg-[var(--zui-combobox-item-green-bg-hover-dark,#22c55e2e)] hover:text-[color:var(--zui-combobox-item-green-fg-hover,#16a34a)] dark:hover:text-[color:var(--zui-combobox-item-green-fg-hover-dark,#22c55e)] bg-[var(--zui-combobox-item-green-bg,#16a34a10)] dark:bg-[var(--zui-combobox-item-green-bg-dark,#22c55e1f)] text-[color:var(--zui-combobox-item-green-fg,#16a34a)] dark:text-[color:var(--zui-combobox-item-green-fg-dark,#22c55e)]",
  lavender:
    "hover:bg-[var(--zui-combobox-item-lavender-bg-hover,#8b5cf618)] dark:hover:bg-[var(--zui-combobox-item-lavender-bg-hover-dark,#a78bfa2e)] hover:text-[color:var(--zui-combobox-item-lavender-fg-hover,#8b5cf6)] dark:hover:text-[color:var(--zui-combobox-item-lavender-fg-hover-dark,#a78bfa)] bg-[var(--zui-combobox-item-lavender-bg,#8b5cf610)] dark:bg-[var(--zui-combobox-item-lavender-bg-dark,#a78bfa1f)] text-[color:var(--zui-combobox-item-lavender-fg,#8b5cf6)] dark:text-[color:var(--zui-combobox-item-lavender-fg-dark,#a78bfa)]",
  red: "hover:bg-[var(--zui-combobox-item-red-bg-hover,#dc262618)] dark:hover:bg-[var(--zui-combobox-item-red-bg-hover-dark,#ef44442e)] hover:text-[color:var(--zui-combobox-item-red-fg-hover,#dc2626)] dark:hover:text-[color:var(--zui-combobox-item-red-fg-hover-dark,#ef4444)] bg-[var(--zui-combobox-item-red-bg,#dc262610)] dark:bg-[var(--zui-combobox-item-red-bg-dark,#ef44441f)] text-[color:var(--zui-combobox-item-red-fg,#dc2626)] dark:text-[color:var(--zui-combobox-item-red-fg-dark,#ef4444)]",
} as const;

export const zuiComboboxDisabled = {
  true: "opacity-50 cursor-not-allowed",
} as const;

export const zuiComboboxContentBase =
  "absolute z-10 mt-2 w-full rounded-md border bg-[var(--zui-combobox-content-bg,#ffffff)] dark:bg-[var(--zui-combobox-content-bg-dark,#000000)] shadow-md overflow-hidden";

export const zuiComboboxContentAppearances = {
  default:
    "bg-[var(--zui-combobox-content-default-bg,#ffffff)] dark:bg-[var(--zui-combobox-content-default-bg-dark,#000000)] shadow-md",
  glass:
    "bg-[var(--zui-combobox-content-glass-bg,#0000001a)] dark:bg-[var(--zui-combobox-content-glass-bg-dark,#ffffff1a)] backdrop-blur-md",
  outline:
    "border-2 border-[color:var(--zui-combobox-content-outline-border,oklch(55.1%_0.027_264.364))] dark:border-[color:var(--zui-combobox-content-outline-border-dark,oklch(55.1%_0.027_264.364))]",
  ghost:
    "border-[color:var(--zui-combobox-content-ghost-border,transparent)] dark:border-[color:var(--zui-combobox-content-ghost-border-dark,transparent)]",
  sky: "border-[color:var(--zui-combobox-content-sky-border,oklch(39.1%_0.09_240.876))] dark:border-[color:var(--zui-combobox-content-sky-border-dark,oklch(58.8%_0.158_241.966))]",
  rose: "border-[color:var(--zui-combobox-content-rose-border,oklch(41%_0.159_10.272))] dark:border-[color:var(--zui-combobox-content-rose-border-dark,oklch(58.6%_0.253_17.585))]",
  purple:
    "border-[color:var(--zui-combobox-content-purple-border,oklch(38.1%_0.176_304.987))] dark:border-[color:var(--zui-combobox-content-purple-border-dark,oklch(55.8%_0.288_302.321))]",
  pink: "border-[color:var(--zui-combobox-content-pink-border,oklch(40.8%_0.153_2.432))] dark:border-[color:var(--zui-combobox-content-pink-border-dark,oklch(59.2%_0.249_0.584))]",
  orange:
    "border-[color:var(--zui-combobox-content-orange-border,oklch(40.8%_0.123_38.172))] dark:border-[color:var(--zui-combobox-content-orange-border-dark,oklch(64.6%_0.222_41.116))]",
  yellow:
    "border-[color:var(--zui-combobox-content-yellow-border,oklch(42.1%_0.095_57.708))] dark:border-[color:var(--zui-combobox-content-yellow-border-dark,oklch(68.1%_0.162_75.834))]",
  teal: "border-[color:var(--zui-combobox-content-teal-border,oklch(38.6%_0.063_188.416))] dark:border-[color:var(--zui-combobox-content-teal-border-dark,oklch(60%_0.118_184.704))]",
  indigo:
    "border-[color:var(--zui-combobox-content-indigo-border,oklch(35.9%_0.144_278.697))] dark:border-[color:var(--zui-combobox-content-indigo-border-dark,oklch(51.1%_0.262_276.966))]",
  emerald:
    "border-[color:var(--zui-combobox-content-emerald-border,oklch(37.8%_0.077_168.94))] dark:border-[color:var(--zui-combobox-content-emerald-border-dark,oklch(59.6%_0.145_163.225))]",
  blue: "border border-[color:var(--zui-combobox-content-blue-border,#2563eb)] dark:border-[color:var(--zui-combobox-content-blue-border-dark,#3b82f6)] bg-[var(--zui-combobox-content-blue-bg,#2563eb14)] dark:bg-[var(--zui-combobox-content-blue-bg-dark,#3b82f624)]",
  red: "border border-[color:var(--zui-combobox-content-red-border,#dc2626)] dark:border-[color:var(--zui-combobox-content-red-border-dark,#ef4444)] bg-[var(--zui-combobox-content-red-bg,#dc262614)] dark:bg-[var(--zui-combobox-content-red-bg-dark,#ef444424)]",
} as const;

export const zuiComboboxSpacing = {
  none: "space-y-0",
  default: "space-y-1",
  sm: "space-y-2",
  md: "space-y-3",
  lg: "space-y-4",
  xl: "space-y-5",
} as const;

export const zuiComboboxSearchRowBase =
  "flex items-center gap-2 border-b px-3 py-2 border-[color:var(--zui-combobox-search-border,oklch(87.2%_0.01_258.338))] dark:border-[color:var(--zui-combobox-search-border-dark,oklch(27%_0.006_264.531))]";

export const zuiComboboxSearchInputBase =
  "w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--zui-combobox-search-placeholder,oklch(55.1%_0.027_264.364))] dark:placeholder:text-[color:var(--zui-combobox-search-placeholder-dark,oklch(55.1%_0.027_264.364))] text-[color:var(--zui-combobox-search-fg,oklch(13%_0.028_261.692))] dark:text-[color:var(--zui-combobox-search-fg-dark,#ffffff)]";

export const zuiComboboxSearchIconBase =
  "size-4 shrink-0 opacity-50 text-[color:var(--zui-combobox-search-icon,currentColor)]";

export const zuiComboboxListBase =
  "max-h-60 overflow-y-auto py-1 rounded-md border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1";

export const zuiComboboxListAppearances = {
  default:
    "border-[color:var(--zui-combobox-list-default-border,oklch(87.2%_0.01_258.338))] dark:border-[color:var(--zui-combobox-list-default-border-dark,oklch(27%_0.006_264.531))] focus-visible:ring-[color:var(--zui-combobox-list-default-ring,oklch(44.6%_0.03_256.802))] dark:focus-visible:ring-[color:var(--zui-combobox-list-default-ring-dark,oklch(70.7%_0.022_261.325))]",
  glass:
    "border-[color:var(--zui-combobox-list-glass-border,#0000001a)] dark:border-[color:var(--zui-combobox-list-glass-border-dark,#ffffff1a)] focus-visible:ring-[color:var(--zui-combobox-list-glass-ring,oklch(44.6%_0.03_256.802))] dark:focus-visible:ring-[color:var(--zui-combobox-list-glass-ring-dark,oklch(70.7%_0.022_261.325))]",
  outline:
    "border-[color:var(--zui-combobox-list-outline-border,oklch(55.1%_0.027_264.364))] dark:border-[color:var(--zui-combobox-list-outline-border-dark,oklch(55.1%_0.027_264.364))] focus-visible:ring-[color:var(--zui-combobox-list-outline-ring,oklch(55.1%_0.027_264.364))] dark:focus-visible:ring-[color:var(--zui-combobox-list-outline-ring-dark,oklch(55.1%_0.027_264.364))]",
  ghost:
    "border-transparent focus-visible:ring-[color:var(--zui-combobox-list-ghost-ring,oklch(44.6%_0.03_256.802))] dark:focus-visible:ring-[color:var(--zui-combobox-list-ghost-ring-dark,oklch(70.7%_0.022_261.325))]",
  sky: "border-[color:var(--zui-combobox-list-sky-border,oklch(39.1%_0.09_240.876))] dark:border-[color:var(--zui-combobox-list-sky-border-dark,oklch(58.8%_0.158_241.966))] focus-visible:ring-[color:var(--zui-combobox-list-sky-ring,oklch(39.1%_0.09_240.876))] dark:focus-visible:ring-[color:var(--zui-combobox-list-sky-ring-dark,oklch(58.8%_0.158_241.966))]",
  rose: "border-[color:var(--zui-combobox-list-rose-border,oklch(41%_0.159_10.272))] dark:border-[color:var(--zui-combobox-list-rose-border-dark,oklch(58.6%_0.253_17.585))] focus-visible:ring-[color:var(--zui-combobox-list-rose-ring,oklch(41%_0.159_10.272))] dark:focus-visible:ring-[color:var(--zui-combobox-list-rose-ring-dark,oklch(58.6%_0.253_17.585))]",
  purple:
    "border-[color:var(--zui-combobox-list-purple-border,oklch(38.1%_0.176_304.987))] dark:border-[color:var(--zui-combobox-list-purple-border-dark,oklch(55.8%_0.288_302.321))] focus-visible:ring-[color:var(--zui-combobox-list-purple-ring,oklch(38.1%_0.176_304.987))] dark:focus-visible:ring-[color:var(--zui-combobox-list-purple-ring-dark,oklch(55.8%_0.288_302.321))]",
  pink: "border-[color:var(--zui-combobox-list-pink-border,oklch(40.8%_0.153_2.432))] dark:border-[color:var(--zui-combobox-list-pink-border-dark,oklch(59.2%_0.249_0.584))] focus-visible:ring-[color:var(--zui-combobox-list-pink-ring,oklch(40.8%_0.153_2.432))] dark:focus-visible:ring-[color:var(--zui-combobox-list-pink-ring-dark,oklch(59.2%_0.249_0.584))]",
  orange:
    "border-[color:var(--zui-combobox-list-orange-border,oklch(40.8%_0.123_38.172))] dark:border-[color:var(--zui-combobox-list-orange-border-dark,oklch(64.6%_0.222_41.116))] focus-visible:ring-[color:var(--zui-combobox-list-orange-ring,oklch(40.8%_0.123_38.172))] dark:focus-visible:ring-[color:var(--zui-combobox-list-orange-ring-dark,oklch(64.6%_0.222_41.116))]",
  yellow:
    "border-[color:var(--zui-combobox-list-yellow-border,oklch(42.1%_0.095_57.708))] dark:border-[color:var(--zui-combobox-list-yellow-border-dark,oklch(68.1%_0.162_75.834))] focus-visible:ring-[color:var(--zui-combobox-list-yellow-ring,oklch(42.1%_0.095_57.708))] dark:focus-visible:ring-[color:var(--zui-combobox-list-yellow-ring-dark,oklch(68.1%_0.162_75.834))]",
  teal: "border-[color:var(--zui-combobox-list-teal-border,oklch(38.6%_0.063_188.416))] dark:border-[color:var(--zui-combobox-list-teal-border-dark,oklch(60%_0.118_184.704))] focus-visible:ring-[color:var(--zui-combobox-list-teal-ring,oklch(38.6%_0.063_188.416))] dark:focus-visible:ring-[color:var(--zui-combobox-list-teal-ring-dark,oklch(60%_0.118_184.704))]",
  indigo:
    "border-[color:var(--zui-combobox-list-indigo-border,oklch(35.9%_0.144_278.697))] dark:border-[color:var(--zui-combobox-list-indigo-border-dark,oklch(51.1%_0.262_276.966))] focus-visible:ring-[color:var(--zui-combobox-list-indigo-ring,oklch(35.9%_0.144_278.697))] dark:focus-visible:ring-[color:var(--zui-combobox-list-indigo-ring-dark,oklch(51.1%_0.262_276.966))]",
  emerald:
    "border-[color:var(--zui-combobox-list-emerald-border,oklch(37.8%_0.077_168.94))] dark:border-[color:var(--zui-combobox-list-emerald-border-dark,oklch(59.6%_0.145_163.225))] focus-visible:ring-[color:var(--zui-combobox-list-emerald-ring,oklch(37.8%_0.077_168.94))] dark:focus-visible:ring-[color:var(--zui-combobox-list-emerald-ring-dark,oklch(59.6%_0.145_163.225))]",
  blue: "border-[color:var(--zui-combobox-list-blue-border,#2563eb)] dark:border-[color:var(--zui-combobox-list-blue-border-dark,#3b82f6)] focus-visible:ring-[color:var(--zui-combobox-list-blue-ring,#2563eb)] dark:focus-visible:ring-[color:var(--zui-combobox-list-blue-ring-dark,#3b82f6)]",
  red: "border-[color:var(--zui-combobox-list-red-border,#dc2626)] dark:border-[color:var(--zui-combobox-list-red-border-dark,#ef4444)] focus-visible:ring-[color:var(--zui-combobox-list-red-ring,#dc2626)] dark:focus-visible:ring-[color:var(--zui-combobox-list-red-ring-dark,#ef4444)]",
} as const;

export const zuiComboboxEmptyBase =
  "px-3 py-6 text-center text-sm text-[color:var(--zui-combobox-empty-fg,oklch(55.1%_0.027_264.364))] dark:text-[color:var(--zui-combobox-empty-fg-dark,oklch(55.1%_0.027_264.364))]";
