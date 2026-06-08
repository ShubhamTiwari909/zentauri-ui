export const zuiTooltipBase =
  "absolute z-50 rounded-md shadow-md transition-all duration-200 pointer-events-none";

export const zuiTooltipVariants = {
  default:
    "bg-[var(--zui-tooltip-default-bg,#ffffff)] dark:bg-[var(--zui-tooltip-default-bg-dark,#000000)] text-[color:var(--zui-tooltip-default-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-tooltip-default-fg-dark,#ffffff)]",
  outline:
    "border bg-[var(--zui-tooltip-outline-bg,#000000)] dark:bg-[var(--zui-tooltip-outline-bg-dark,#ffffff)] text-[color:var(--zui-tooltip-outline-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-outline-fg-dark,#000000)]",
  ghost:
    "bg-[var(--zui-tooltip-ghost-bg,oklch(27.8%_0.033_256.848))] dark:bg-[var(--zui-tooltip-ghost-bg-dark,oklch(27.8%_0.033_256.848))] text-[color:var(--zui-tooltip-ghost-fg,#ffffffe6)] dark:text-[color:var(--zui-tooltip-ghost-fg-dark,#ffffffe6)]",
  glass:
    "border border-[color:var(--zui-tooltip-glass-border,#00000026)] dark:border-[color:var(--zui-tooltip-glass-border-dark,#ffffff26)] bg-[var(--zui-tooltip-glass-bg,#0000001a)] dark:bg-[var(--zui-tooltip-glass-bg-dark,#ffffff1a)] text-[color:var(--zui-tooltip-glass-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-tooltip-glass-fg-dark,#ffffff)] backdrop-blur-md",
  emerald:
    "bg-[var(--zui-tooltip-emerald-bg,oklch(43.2%_0.095_166.913))] dark:bg-[var(--zui-tooltip-emerald-bg-dark,oklch(43.2%_0.095_166.913))] text-[color:var(--zui-tooltip-emerald-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-emerald-fg-dark,#ffffff)]",
  indigo:
    "bg-[var(--zui-tooltip-indigo-bg,oklch(39.8%_0.195_277.366))] dark:bg-[var(--zui-tooltip-indigo-bg-dark,oklch(39.8%_0.195_277.366))] text-[color:var(--zui-tooltip-indigo-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-indigo-fg-dark,#ffffff)]",
  purple:
    "bg-[var(--zui-tooltip-purple-bg,oklch(43.8%_0.218_303.724))] dark:bg-[var(--zui-tooltip-purple-bg-dark,oklch(43.8%_0.218_303.724))] text-[color:var(--zui-tooltip-purple-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-purple-fg-dark,#ffffff)]",
  pink: "bg-[var(--zui-tooltip-pink-bg,oklch(45.9%_0.187_3.815))] dark:bg-[var(--zui-tooltip-pink-bg-dark,oklch(45.9%_0.187_3.815))] text-[color:var(--zui-tooltip-pink-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-pink-fg-dark,#ffffff)]",
  rose: "bg-[var(--zui-tooltip-rose-bg,oklch(45.5%_0.188_13.697))] dark:bg-[var(--zui-tooltip-rose-bg-dark,oklch(45.5%_0.188_13.697))] text-[color:var(--zui-tooltip-rose-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-rose-fg-dark,#ffffff)]",
  sky: "bg-[var(--zui-tooltip-sky-bg,oklch(50%_0.134_242.749))] dark:bg-[var(--zui-tooltip-sky-bg-dark,oklch(50%_0.134_242.749))] text-[color:var(--zui-tooltip-sky-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-sky-fg-dark,#ffffff)]",
  teal: "bg-[var(--zui-tooltip-teal-bg,oklch(43.7%_0.078_188.216))] dark:bg-[var(--zui-tooltip-teal-bg-dark,oklch(43.7%_0.078_188.216))] text-[color:var(--zui-tooltip-teal-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-teal-fg-dark,#ffffff)]",
  yellow:
    "bg-[var(--zui-tooltip-yellow-bg,oklch(47.6%_0.114_61.907))] dark:bg-[var(--zui-tooltip-yellow-bg-dark,oklch(47.6%_0.114_61.907))] text-[color:var(--zui-tooltip-yellow-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-yellow-fg-dark,#ffffff)]",
  orange:
    "bg-[var(--zui-tooltip-orange-bg,oklch(47%_0.157_37.304))] dark:bg-[var(--zui-tooltip-orange-bg-dark,oklch(47%_0.157_37.304))] text-[color:var(--zui-tooltip-orange-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-orange-fg-dark,#ffffff)]",
  green:
    "bg-[var(--zui-tooltip-green-bg,oklch(44.8%_0.119_151.328))] dark:bg-[var(--zui-tooltip-green-bg-dark,oklch(44.8%_0.119_151.328))] text-[color:var(--zui-tooltip-green-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-green-fg-dark,#ffffff)]",
  "gradient-blue":
    "bg-linear-to-r from-[var(--zui-tooltip-gradient-blue-from,oklch(42.4%_0.199_265.638))] dark:from-[var(--zui-tooltip-gradient-blue-from-dark,oklch(42.4%_0.199_265.638))] to-[var(--zui-tooltip-gradient-blue-to,oklch(43.8%_0.218_303.724))] dark:to-[var(--zui-tooltip-gradient-blue-to-dark,oklch(43.8%_0.218_303.724))] text-[color:var(--zui-tooltip-gradient-blue-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-gradient-blue-fg-dark,#ffffff)]",
  "gradient-green":
    "bg-linear-to-r from-[var(--zui-tooltip-gradient-green-from,oklch(44.8%_0.119_151.328))] dark:from-[var(--zui-tooltip-gradient-green-from-dark,oklch(44.8%_0.119_151.328))] to-[var(--zui-tooltip-gradient-green-to,oklch(45.3%_0.124_130.933))] dark:to-[var(--zui-tooltip-gradient-green-to-dark,oklch(45.3%_0.124_130.933))] text-[color:var(--zui-tooltip-gradient-green-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-gradient-green-fg-dark,#ffffff)]",
  "gradient-red":
    "bg-linear-to-r from-[var(--zui-tooltip-gradient-red-from,oklch(44.4%_0.177_26.899))] dark:from-[var(--zui-tooltip-gradient-red-from-dark,oklch(44.4%_0.177_26.899))] to-[var(--zui-tooltip-gradient-red-to,oklch(45.9%_0.187_3.815))] dark:to-[var(--zui-tooltip-gradient-red-to-dark,oklch(45.9%_0.187_3.815))] text-[color:var(--zui-tooltip-gradient-red-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-gradient-red-fg-dark,#ffffff)]",
  "gradient-yellow":
    "bg-linear-to-r from-[var(--zui-tooltip-gradient-yellow-from,oklch(47.6%_0.114_61.907))] dark:from-[var(--zui-tooltip-gradient-yellow-from-dark,oklch(47.6%_0.114_61.907))] to-[var(--zui-tooltip-gradient-yellow-to,oklch(47%_0.157_37.304))] dark:to-[var(--zui-tooltip-gradient-yellow-to-dark,oklch(47%_0.157_37.304))] text-[color:var(--zui-tooltip-gradient-yellow-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-gradient-yellow-fg-dark,#ffffff)]",
  "gradient-purple":
    "bg-linear-to-r from-[var(--zui-tooltip-gradient-purple-from,oklch(43.8%_0.218_303.724))] dark:from-[var(--zui-tooltip-gradient-purple-from-dark,oklch(43.8%_0.218_303.724))] to-[var(--zui-tooltip-gradient-purple-to,oklch(45.9%_0.187_3.815))] dark:to-[var(--zui-tooltip-gradient-purple-to-dark,oklch(45.9%_0.187_3.815))] text-[color:var(--zui-tooltip-gradient-purple-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-gradient-purple-fg-dark,#ffffff)]",
  "gradient-teal":
    "bg-linear-to-r from-[var(--zui-tooltip-gradient-teal-from,oklch(43.7%_0.078_188.216))] dark:from-[var(--zui-tooltip-gradient-teal-from-dark,oklch(43.7%_0.078_188.216))] to-[var(--zui-tooltip-gradient-teal-to,oklch(45%_0.085_224.283))] dark:to-[var(--zui-tooltip-gradient-teal-to-dark,oklch(45%_0.085_224.283))] text-[color:var(--zui-tooltip-gradient-teal-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-gradient-teal-fg-dark,#ffffff)]",
  "gradient-indigo":
    "bg-linear-to-r from-[var(--zui-tooltip-gradient-indigo-from,oklch(39.8%_0.195_277.366))] dark:from-[var(--zui-tooltip-gradient-indigo-from-dark,oklch(39.8%_0.195_277.366))] to-[var(--zui-tooltip-gradient-indigo-to,oklch(43.8%_0.218_303.724))] dark:to-[var(--zui-tooltip-gradient-indigo-to-dark,oklch(43.8%_0.218_303.724))] text-[color:var(--zui-tooltip-gradient-indigo-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-gradient-indigo-fg-dark,#ffffff)]",
  "gradient-pink":
    "bg-linear-to-r from-[var(--zui-tooltip-gradient-pink-from,oklch(45.9%_0.187_3.815))] dark:from-[var(--zui-tooltip-gradient-pink-from-dark,oklch(45.9%_0.187_3.815))] to-[var(--zui-tooltip-gradient-pink-to,oklch(45.5%_0.188_13.697))] dark:to-[var(--zui-tooltip-gradient-pink-to-dark,oklch(45.5%_0.188_13.697))] text-[color:var(--zui-tooltip-gradient-pink-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-gradient-pink-fg-dark,#ffffff)]",
  "gradient-orange":
    "bg-linear-to-r from-[var(--zui-tooltip-gradient-orange-from,oklch(47%_0.157_37.304))] dark:from-[var(--zui-tooltip-gradient-orange-from-dark,oklch(47%_0.157_37.304))] to-[var(--zui-tooltip-gradient-orange-to,oklch(44.4%_0.177_26.899))] dark:to-[var(--zui-tooltip-gradient-orange-to-dark,oklch(44.4%_0.177_26.899))] text-[color:var(--zui-tooltip-gradient-orange-fg,#ffffff)] dark:text-[color:var(--zui-tooltip-gradient-orange-fg-dark,#ffffff)]",
  blue: "border border-[color:var(--zui-tooltip-blue-border,#2563eb)] dark:border-[color:var(--zui-tooltip-blue-border-dark,#3b82f6)] bg-[var(--zui-tooltip-blue-bg,#2563eb14)] dark:bg-[var(--zui-tooltip-blue-bg-dark,#3b82f624)] text-[color:var(--zui-tooltip-blue-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-blue-fg-dark,#f8fafc)]",
  cyan: "border border-[color:var(--zui-tooltip-cyan-border,#0891b2)] dark:border-[color:var(--zui-tooltip-cyan-border-dark,#22d3ee)] bg-[var(--zui-tooltip-cyan-bg,#0891b214)] dark:bg-[var(--zui-tooltip-cyan-bg-dark,#22d3ee24)] text-[color:var(--zui-tooltip-cyan-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-cyan-fg-dark,#f8fafc)]",
  lime: "border border-[color:var(--zui-tooltip-lime-border,#65a30d)] dark:border-[color:var(--zui-tooltip-lime-border-dark,#a3e635)] bg-[var(--zui-tooltip-lime-bg,#65a30d14)] dark:bg-[var(--zui-tooltip-lime-bg-dark,#a3e63524)] text-[color:var(--zui-tooltip-lime-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-lime-fg-dark,#f8fafc)]",
  mint: "border border-[color:var(--zui-tooltip-mint-border,#10b981)] dark:border-[color:var(--zui-tooltip-mint-border-dark,#6ee7b7)] bg-[var(--zui-tooltip-mint-bg,#10b98114)] dark:bg-[var(--zui-tooltip-mint-bg-dark,#6ee7b724)] text-[color:var(--zui-tooltip-mint-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-mint-fg-dark,#f8fafc)]",
  ocean:
    "border border-[color:var(--zui-tooltip-ocean-border,#0284c7)] dark:border-[color:var(--zui-tooltip-ocean-border-dark,#38bdf8)] bg-[var(--zui-tooltip-ocean-bg,#0284c714)] dark:bg-[var(--zui-tooltip-ocean-bg-dark,#38bdf824)] text-[color:var(--zui-tooltip-ocean-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-ocean-fg-dark,#f8fafc)]",
  sapphire:
    "border border-[color:var(--zui-tooltip-sapphire-border,#1d4ed8)] dark:border-[color:var(--zui-tooltip-sapphire-border-dark,#60a5fa)] bg-[var(--zui-tooltip-sapphire-bg,#1d4ed814)] dark:bg-[var(--zui-tooltip-sapphire-bg-dark,#60a5fa24)] text-[color:var(--zui-tooltip-sapphire-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-sapphire-fg-dark,#f8fafc)]",
  lavender:
    "border border-[color:var(--zui-tooltip-lavender-border,#8b5cf6)] dark:border-[color:var(--zui-tooltip-lavender-border-dark,#a78bfa)] bg-[var(--zui-tooltip-lavender-bg,#8b5cf614)] dark:bg-[var(--zui-tooltip-lavender-bg-dark,#a78bfa24)] text-[color:var(--zui-tooltip-lavender-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-lavender-fg-dark,#f8fafc)]",
  ruby: "border border-[color:var(--zui-tooltip-ruby-border,#be123c)] dark:border-[color:var(--zui-tooltip-ruby-border-dark,#fb7185)] bg-[var(--zui-tooltip-ruby-bg,#be123c14)] dark:bg-[var(--zui-tooltip-ruby-bg-dark,#fb718524)] text-[color:var(--zui-tooltip-ruby-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-ruby-fg-dark,#f8fafc)]",
  red: "border border-[color:var(--zui-tooltip-red-border,#dc2626)] dark:border-[color:var(--zui-tooltip-red-border-dark,#ef4444)] bg-[var(--zui-tooltip-red-bg,#dc262614)] dark:bg-[var(--zui-tooltip-red-bg-dark,#ef444424)] text-[color:var(--zui-tooltip-red-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-red-fg-dark,#f8fafc)]",
  slate:
    "border border-[color:var(--zui-tooltip-slate-border,#475569)] dark:border-[color:var(--zui-tooltip-slate-border-dark,#64748b)] bg-[var(--zui-tooltip-slate-bg,#47556914)] dark:bg-[var(--zui-tooltip-slate-bg-dark,#64748b24)] text-[color:var(--zui-tooltip-slate-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-slate-fg-dark,#f8fafc)]",
  zinc: "border border-[color:var(--zui-tooltip-zinc-border,#52525b)] dark:border-[color:var(--zui-tooltip-zinc-border-dark,#71717a)] bg-[var(--zui-tooltip-zinc-bg,#52525b14)] dark:bg-[var(--zui-tooltip-zinc-bg-dark,#71717a24)] text-[color:var(--zui-tooltip-zinc-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-zinc-fg-dark,#f8fafc)]",
  stone:
    "border border-[color:var(--zui-tooltip-stone-border,#57534e)] dark:border-[color:var(--zui-tooltip-stone-border-dark,#78716c)] bg-[var(--zui-tooltip-stone-bg,#57534e14)] dark:bg-[var(--zui-tooltip-stone-bg-dark,#78716c24)] text-[color:var(--zui-tooltip-stone-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-stone-fg-dark,#f8fafc)]",
  royal:
    "border border-[color:var(--zui-tooltip-royal-border,#4338ca)] dark:border-[color:var(--zui-tooltip-royal-border-dark,#818cf8)] bg-[var(--zui-tooltip-royal-bg,#4338ca14)] dark:bg-[var(--zui-tooltip-royal-bg-dark,#818cf824)] text-[color:var(--zui-tooltip-royal-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-royal-fg-dark,#f8fafc)]",
  electric:
    "border border-[color:var(--zui-tooltip-electric-border,#0ea5e9)] dark:border-[color:var(--zui-tooltip-electric-border-dark,#38bdf8)] bg-[var(--zui-tooltip-electric-bg,#0ea5e914)] dark:bg-[var(--zui-tooltip-electric-bg-dark,#38bdf824)] text-[color:var(--zui-tooltip-electric-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-electric-fg-dark,#f8fafc)]",
  forest:
    "border border-[color:var(--zui-tooltip-forest-border,#166534)] dark:border-[color:var(--zui-tooltip-forest-border-dark,#4ade80)] bg-[var(--zui-tooltip-forest-bg,#16653414)] dark:bg-[var(--zui-tooltip-forest-bg-dark,#4ade8024)] text-[color:var(--zui-tooltip-forest-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-forest-fg-dark,#f8fafc)]",
  sunset:
    "border border-[color:var(--zui-tooltip-sunset-border,#ea580c)] dark:border-[color:var(--zui-tooltip-sunset-border-dark,#fb923c)] bg-[var(--zui-tooltip-sunset-bg,#ea580c14)] dark:bg-[var(--zui-tooltip-sunset-bg-dark,#fb923c24)] text-[color:var(--zui-tooltip-sunset-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-sunset-fg-dark,#f8fafc)]",
  magenta:
    "border border-[color:var(--zui-tooltip-magenta-border,#c026d3)] dark:border-[color:var(--zui-tooltip-magenta-border-dark,#e879f9)] bg-[var(--zui-tooltip-magenta-bg,#c026d314)] dark:bg-[var(--zui-tooltip-magenta-bg-dark,#e879f924)] text-[color:var(--zui-tooltip-magenta-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-magenta-fg-dark,#f8fafc)]",
  crimson:
    "border border-[color:var(--zui-tooltip-crimson-border,#b91c1c)] dark:border-[color:var(--zui-tooltip-crimson-border-dark,#f87171)] bg-[var(--zui-tooltip-crimson-bg,#b91c1c14)] dark:bg-[var(--zui-tooltip-crimson-bg-dark,#f8717124)] text-[color:var(--zui-tooltip-crimson-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-crimson-fg-dark,#f8fafc)]",
  aqua: "border border-[color:var(--zui-tooltip-aqua-border,#0f766e)] dark:border-[color:var(--zui-tooltip-aqua-border-dark,#2dd4bf)] bg-[var(--zui-tooltip-aqua-bg,#0f766e14)] dark:bg-[var(--zui-tooltip-aqua-bg-dark,#2dd4bf24)] text-[color:var(--zui-tooltip-aqua-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-aqua-fg-dark,#f8fafc)]",
  plum: "border border-[color:var(--zui-tooltip-plum-border,#7e22ce)] dark:border-[color:var(--zui-tooltip-plum-border-dark,#c084fc)] bg-[var(--zui-tooltip-plum-bg,#7e22ce14)] dark:bg-[var(--zui-tooltip-plum-bg-dark,#c084fc24)] text-[color:var(--zui-tooltip-plum-fg,#0f172a)] dark:text-[color:var(--zui-tooltip-plum-fg-dark,#f8fafc)]",
} as const;

export const zuiTooltipSizes = {
  sm: "text-xs px-2 py-1",
  md: "text-sm px-3 py-1.5",
  lg: "text-base px-4 py-2",
} as const;

export const zuiTooltipWidths = {
  fit: "min-w-75 md:min-w-fit",
  xs: "min-w-75 md:min-w-xs",
  sm: "min-w-75 md:min-w-sm",
  md: "min-w-75 md:min-w-md",
  lg: "min-w-75 md:min-w-lg",
  xl: "min-w-75 md:min-w-xl",
  "2xl": "min-w-75 md:min-w-2xl",
} as const;
