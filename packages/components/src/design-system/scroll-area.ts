export const zuiScrollAreaBase =
  "relative min-w-0 rounded-xl outline-none transition-[background-color,border-color,box-shadow,scrollbar-color] duration-200 [scrollbar-color:var(--zui-scroll-area-thumb,#94a3b8)_var(--zui-scroll-area-track,transparent)] [scrollbar-width:thin] focus-visible:ring-2 focus-visible:ring-[var(--zui-scroll-area-ring-focus,oklch(54.6%_0.245_262.881_/_0.28))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--zui-scroll-area-ring-offset-focus,#ffffff)] dark:focus-visible:ring-[var(--zui-scroll-area-ring-focus-dark,oklch(70.7%_0.165_254.624_/_0.28))] dark:focus-visible:ring-offset-[var(--zui-scroll-area-ring-offset-focus-dark,oklch(12.9%_0.042_264.695))] [&::-webkit-scrollbar]:h-[var(--zui-scroll-area-size,0.625rem)] [&::-webkit-scrollbar]:w-[var(--zui-scroll-area-size,0.625rem)] [&::-webkit-scrollbar-corner]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-[var(--zui-scroll-area-thumb-border,transparent)] [&::-webkit-scrollbar-thumb]:bg-[var(--zui-scroll-area-thumb,#94a3b8)] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[var(--zui-scroll-area-track,transparent)]";

export const zuiScrollAreaAppearances = {
  default:
    "[--zui-scroll-area-thumb:#94a3b8] [--zui-scroll-area-thumb-border:#f8fafc] [--zui-scroll-area-track:#e2e8f0] dark:[--zui-scroll-area-thumb:#64748b] dark:[--zui-scroll-area-thumb-border:#020617] dark:[--zui-scroll-area-track:#1e293b]",
  muted:
    "[--zui-scroll-area-thumb:#cbd5e1] [--zui-scroll-area-thumb-border:#f8fafc] [--zui-scroll-area-track:#f1f5f9] dark:[--zui-scroll-area-thumb:#475569] dark:[--zui-scroll-area-thumb-border:#020617] dark:[--zui-scroll-area-track:#0f172a]",
  outline:
    "border border-[color:var(--zui-scroll-area-outline-border,#cbd5e1)] [--zui-scroll-area-thumb:#64748b] [--zui-scroll-area-thumb-border:#ffffff] [--zui-scroll-area-track:#e2e8f0] dark:border-[color:var(--zui-scroll-area-outline-border-dark,#334155)] dark:[--zui-scroll-area-thumb:#94a3b8] dark:[--zui-scroll-area-thumb-border:#020617] dark:[--zui-scroll-area-track:#1e293b]",
  glass:
    "border border-[color:var(--zui-scroll-area-glass-border,#ffffff80)] bg-[var(--zui-scroll-area-glass-bg,#ffffff99)] backdrop-blur-md [--zui-scroll-area-thumb:oklch(70.7%_0.165_254.624_/_0.9)] [--zui-scroll-area-thumb-border:#ffffff66] [--zui-scroll-area-track:#ffffff33] dark:border-[color:var(--zui-scroll-area-glass-border-dark,#ffffff1f)] dark:bg-[var(--zui-scroll-area-glass-bg-dark,#0f172acc)] dark:[--zui-scroll-area-thumb:oklch(78.9%_0.154_211.53_/_0.8)] dark:[--zui-scroll-area-thumb-border:#02061766] dark:[--zui-scroll-area-track:#ffffff12]",
  sky: "border border-[color:var(--zui-scroll-area-sky-border,oklch(62.3%_0.214_259.815_/_0.35))] [--zui-scroll-area-thumb:oklch(54.6%_0.245_262.881)] [--zui-scroll-area-thumb-border:#eff6ff] [--zui-scroll-area-track:#dbeafe] dark:border-[color:var(--zui-scroll-area-sky-border-dark,oklch(70.7%_0.165_254.624_/_0.35))] dark:[--zui-scroll-area-thumb:oklch(70.7%_0.165_254.624)] dark:[--zui-scroll-area-thumb-border:#020617] dark:[--zui-scroll-area-track:#172554]",
  emerald:
    "border border-[color:var(--zui-scroll-area-emerald-border,oklch(59.6%_0.145_163.225_/_0.35))] [--zui-scroll-area-thumb:oklch(59.6%_0.145_163.225)] [--zui-scroll-area-thumb-border:#ecfdf5] [--zui-scroll-area-track:#d1fae5] dark:border-[color:var(--zui-scroll-area-emerald-border-dark,oklch(69.6%_0.17_162.48_/_0.35))] dark:[--zui-scroll-area-thumb:oklch(69.6%_0.17_162.48)] dark:[--zui-scroll-area-thumb-border:#020617] dark:[--zui-scroll-area-track:#064e3b]",
  rose: "border border-[color:var(--zui-scroll-area-rose-border,oklch(58.6%_0.253_17.585_/_0.3))] [--zui-scroll-area-thumb:oklch(58.6%_0.253_17.585)] [--zui-scroll-area-thumb-border:#fff1f2] [--zui-scroll-area-track:#ffe4e6] dark:border-[color:var(--zui-scroll-area-rose-border-dark,oklch(71.2%_0.194_13.428_/_0.35))] dark:[--zui-scroll-area-thumb:oklch(71.2%_0.194_13.428)] dark:[--zui-scroll-area-thumb-border:#020617] dark:[--zui-scroll-area-track:#4c0519]",
  amber:
    "border border-[color:var(--zui-scroll-area-amber-border,oklch(76.9%_0.188_70.08_/_0.35))] [--zui-scroll-area-thumb:oklch(66.6%_0.179_58.318)] [--zui-scroll-area-thumb-border:#fffbeb] [--zui-scroll-area-track:#fef3c7] dark:border-[color:var(--zui-scroll-area-amber-border-dark,oklch(82.8%_0.189_84.429_/_0.35))] dark:[--zui-scroll-area-thumb:oklch(82.8%_0.189_84.429)] dark:[--zui-scroll-area-thumb-border:#020617] dark:[--zui-scroll-area-track:#451a03]",
  violet:
    "border border-[color:var(--zui-scroll-area-violet-border,oklch(60.6%_0.25_292.717_/_0.35))] [--zui-scroll-area-thumb:oklch(54.1%_0.281_293.009)] [--zui-scroll-area-thumb-border:#f5f3ff] [--zui-scroll-area-track:#ede9fe] dark:border-[color:var(--zui-scroll-area-violet-border-dark,oklch(70.2%_0.183_293.541_/_0.35))] dark:[--zui-scroll-area-thumb:oklch(70.2%_0.183_293.541)] dark:[--zui-scroll-area-thumb-border:#020617] dark:[--zui-scroll-area-track:#2e1065]",
  blue: "border border-[color:var(--zui-scroll-area-blue-border,#2563eb66)] dark:border-[color:var(--zui-scroll-area-blue-border-dark,#3b82f666)] [--zui-scroll-area-thumb:var(--zui-scroll-area-blue-thumb,#2563eb)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-blue-thumb-dark,#3b82f6)] [--zui-scroll-area-track:var(--zui-scroll-area-blue-track,#2563eb14)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-blue-track-dark,#3b82f624)]",
  cyan: "border border-[color:var(--zui-scroll-area-cyan-border,#0891b266)] dark:border-[color:var(--zui-scroll-area-cyan-border-dark,#22d3ee66)] [--zui-scroll-area-thumb:var(--zui-scroll-area-cyan-thumb,#0891b2)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-cyan-thumb-dark,#22d3ee)] [--zui-scroll-area-track:var(--zui-scroll-area-cyan-track,#0891b214)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-cyan-track-dark,#22d3ee24)]",
  green:
    "border border-[color:var(--zui-scroll-area-green-border,#16a34a66)] dark:border-[color:var(--zui-scroll-area-green-border-dark,#22c55e66)] [--zui-scroll-area-thumb:var(--zui-scroll-area-green-thumb,#16a34a)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-green-thumb-dark,#22c55e)] [--zui-scroll-area-track:var(--zui-scroll-area-green-track,#16a34a14)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-green-track-dark,#22c55e24)]",
  lime: "border border-[color:var(--zui-scroll-area-lime-border,#65a30d66)] dark:border-[color:var(--zui-scroll-area-lime-border-dark,#a3e63566)] [--zui-scroll-area-thumb:var(--zui-scroll-area-lime-thumb,#65a30d)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-lime-thumb-dark,#a3e635)] [--zui-scroll-area-track:var(--zui-scroll-area-lime-track,#65a30d14)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-lime-track-dark,#a3e63524)]",
  mint: "border border-[color:var(--zui-scroll-area-mint-border,#10b98166)] dark:border-[color:var(--zui-scroll-area-mint-border-dark,#6ee7b766)] [--zui-scroll-area-thumb:var(--zui-scroll-area-mint-thumb,#10b981)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-mint-thumb-dark,#6ee7b7)] [--zui-scroll-area-track:var(--zui-scroll-area-mint-track,#10b98114)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-mint-track-dark,#6ee7b724)]",
  ocean:
    "border border-[color:var(--zui-scroll-area-ocean-border,#0284c766)] dark:border-[color:var(--zui-scroll-area-ocean-border-dark,#38bdf866)] [--zui-scroll-area-thumb:var(--zui-scroll-area-ocean-thumb,#0284c7)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-ocean-thumb-dark,#38bdf8)] [--zui-scroll-area-track:var(--zui-scroll-area-ocean-track,#0284c714)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-ocean-track-dark,#38bdf824)]",
  sapphire:
    "border border-[color:var(--zui-scroll-area-sapphire-border,#1d4ed866)] dark:border-[color:var(--zui-scroll-area-sapphire-border-dark,#60a5fa66)] [--zui-scroll-area-thumb:var(--zui-scroll-area-sapphire-thumb,#1d4ed8)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-sapphire-thumb-dark,#60a5fa)] [--zui-scroll-area-track:var(--zui-scroll-area-sapphire-track,#1d4ed814)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-sapphire-track-dark,#60a5fa24)]",
  lavender:
    "border border-[color:var(--zui-scroll-area-lavender-border,#8b5cf666)] dark:border-[color:var(--zui-scroll-area-lavender-border-dark,#a78bfa66)] [--zui-scroll-area-thumb:var(--zui-scroll-area-lavender-thumb,#8b5cf6)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-lavender-thumb-dark,#a78bfa)] [--zui-scroll-area-track:var(--zui-scroll-area-lavender-track,#8b5cf614)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-lavender-track-dark,#a78bfa24)]",
  ruby: "border border-[color:var(--zui-scroll-area-ruby-border,#be123c66)] dark:border-[color:var(--zui-scroll-area-ruby-border-dark,#fb718566)] [--zui-scroll-area-thumb:var(--zui-scroll-area-ruby-thumb,#be123c)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-ruby-thumb-dark,#fb7185)] [--zui-scroll-area-track:var(--zui-scroll-area-ruby-track,#be123c14)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-ruby-track-dark,#fb718524)]",
  red: "border border-[color:var(--zui-scroll-area-red-border,#dc262666)] dark:border-[color:var(--zui-scroll-area-red-border-dark,#ef444466)] [--zui-scroll-area-thumb:var(--zui-scroll-area-red-thumb,#dc2626)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-red-thumb-dark,#ef4444)] [--zui-scroll-area-track:var(--zui-scroll-area-red-track,#dc262614)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-red-track-dark,#ef444424)]",
  slate:
    "border border-[color:var(--zui-scroll-area-slate-border,#47556966)] dark:border-[color:var(--zui-scroll-area-slate-border-dark,#64748b66)] [--zui-scroll-area-thumb:var(--zui-scroll-area-slate-thumb,#475569)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-slate-thumb-dark,#64748b)] [--zui-scroll-area-track:var(--zui-scroll-area-slate-track,#47556914)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-slate-track-dark,#64748b24)]",
  zinc: "border border-[color:var(--zui-scroll-area-zinc-border,#52525b66)] dark:border-[color:var(--zui-scroll-area-zinc-border-dark,#71717a66)] [--zui-scroll-area-thumb:var(--zui-scroll-area-zinc-thumb,#52525b)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-zinc-thumb-dark,#71717a)] [--zui-scroll-area-track:var(--zui-scroll-area-zinc-track,#52525b14)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-zinc-track-dark,#71717a24)]",
  stone:
    "border border-[color:var(--zui-scroll-area-stone-border,#57534e66)] dark:border-[color:var(--zui-scroll-area-stone-border-dark,#78716c66)] [--zui-scroll-area-thumb:var(--zui-scroll-area-stone-thumb,#57534e)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-stone-thumb-dark,#78716c)] [--zui-scroll-area-track:var(--zui-scroll-area-stone-track,#57534e14)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-stone-track-dark,#78716c24)]",
  royal:
    "border border-[color:var(--zui-scroll-area-royal-border,#4338ca66)] dark:border-[color:var(--zui-scroll-area-royal-border-dark,#818cf866)] [--zui-scroll-area-thumb:var(--zui-scroll-area-royal-thumb,#4338ca)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-royal-thumb-dark,#818cf8)] [--zui-scroll-area-track:var(--zui-scroll-area-royal-track,#4338ca14)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-royal-track-dark,#818cf824)]",
  electric:
    "border border-[color:var(--zui-scroll-area-electric-border,#0ea5e966)] dark:border-[color:var(--zui-scroll-area-electric-border-dark,#38bdf866)] [--zui-scroll-area-thumb:var(--zui-scroll-area-electric-thumb,#0ea5e9)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-electric-thumb-dark,#38bdf8)] [--zui-scroll-area-track:var(--zui-scroll-area-electric-track,#0ea5e914)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-electric-track-dark,#38bdf824)]",
  forest:
    "border border-[color:var(--zui-scroll-area-forest-border,#16653466)] dark:border-[color:var(--zui-scroll-area-forest-border-dark,#4ade8066)] [--zui-scroll-area-thumb:var(--zui-scroll-area-forest-thumb,#166534)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-forest-thumb-dark,#4ade80)] [--zui-scroll-area-track:var(--zui-scroll-area-forest-track,#16653414)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-forest-track-dark,#4ade8024)]",
  sunset:
    "border border-[color:var(--zui-scroll-area-sunset-border,#ea580c66)] dark:border-[color:var(--zui-scroll-area-sunset-border-dark,#fb923c66)] [--zui-scroll-area-thumb:var(--zui-scroll-area-sunset-thumb,#ea580c)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-sunset-thumb-dark,#fb923c)] [--zui-scroll-area-track:var(--zui-scroll-area-sunset-track,#ea580c14)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-sunset-track-dark,#fb923c24)]",
  magenta:
    "border border-[color:var(--zui-scroll-area-magenta-border,#c026d366)] dark:border-[color:var(--zui-scroll-area-magenta-border-dark,#e879f966)] [--zui-scroll-area-thumb:var(--zui-scroll-area-magenta-thumb,#c026d3)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-magenta-thumb-dark,#e879f9)] [--zui-scroll-area-track:var(--zui-scroll-area-magenta-track,#c026d314)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-magenta-track-dark,#e879f924)]",
  crimson:
    "border border-[color:var(--zui-scroll-area-crimson-border,#b91c1c66)] dark:border-[color:var(--zui-scroll-area-crimson-border-dark,#f8717166)] [--zui-scroll-area-thumb:var(--zui-scroll-area-crimson-thumb,#b91c1c)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-crimson-thumb-dark,#f87171)] [--zui-scroll-area-track:var(--zui-scroll-area-crimson-track,#b91c1c14)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-crimson-track-dark,#f8717124)]",
  aqua: "border border-[color:var(--zui-scroll-area-aqua-border,#0f766e66)] dark:border-[color:var(--zui-scroll-area-aqua-border-dark,#2dd4bf66)] [--zui-scroll-area-thumb:var(--zui-scroll-area-aqua-thumb,#0f766e)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-aqua-thumb-dark,#2dd4bf)] [--zui-scroll-area-track:var(--zui-scroll-area-aqua-track,#0f766e14)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-aqua-track-dark,#2dd4bf24)]",
  plum: "border border-[color:var(--zui-scroll-area-plum-border,#7e22ce66)] dark:border-[color:var(--zui-scroll-area-plum-border-dark,#c084fc66)] [--zui-scroll-area-thumb:var(--zui-scroll-area-plum-thumb,#7e22ce)] dark:[--zui-scroll-area-thumb:var(--zui-scroll-area-plum-thumb-dark,#c084fc)] [--zui-scroll-area-track:var(--zui-scroll-area-plum-track,#7e22ce14)] dark:[--zui-scroll-area-track:var(--zui-scroll-area-plum-track-dark,#c084fc24)]",
} as const;

export const zuiScrollAreaSizes = {
  sm: "[--zui-scroll-area-size:0.375rem]",
  md: "[--zui-scroll-area-size:0.625rem]",
  lg: "[--zui-scroll-area-size:0.875rem]",
} as const;

export const zuiScrollAreaOrientations = {
  vertical: "overflow-x-hidden overflow-y-auto",
  horizontal: "overflow-x-auto overflow-y-hidden",
  both: "overflow-auto",
} as const;

export const zuiScrollAreaVisibility = {
  auto: "",
  hover:
    "[scrollbar-color:transparent_transparent] hover:[scrollbar-color:var(--zui-scroll-area-thumb,#94a3b8)_var(--zui-scroll-area-track,transparent)] [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-[var(--zui-scroll-area-thumb,#94a3b8)] [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-track]:bg-[var(--zui-scroll-area-track,transparent)]",
  always: "",
  hidden:
    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0",
} as const;

export const zuiScrollAreaShadows = {
  false: "",
  true: "[box-shadow:inset_0_2px_12px_rgb(15_23_42_/_0.08)] dark:[box-shadow:inset_0_2px_12px_rgb(0_0_0_/_0.3)]",
} as const;
