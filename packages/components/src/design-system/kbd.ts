export const zuiKbdBase = [
  "inline-flex items-center justify-center gap-1 align-middle",
  "rounded-[var(--zui-kbd-radius,0.375rem)] font-mono font-medium leading-none select-none",
] as const;

export const zuiKbdKeyAppearances = {
  default:
    "bg-[var(--zui-kbd-default-bg,#0f172a)] dark:bg-[var(--zui-kbd-default-bg-dark,#f8fafc)] text-[color:var(--zui-kbd-default-fg,#f8fafc)] dark:text-[color:var(--zui-kbd-default-fg-dark,#020617)] shadow-[var(--zui-kbd-default-shadow,0_1px_2px_#0f172a14)] dark:shadow-[var(--zui-kbd-default-shadow-dark,0_1px_2px_#0f172a1f)]",
  secondary:
    "bg-[var(--zui-kbd-secondary-bg,#e2e8f0)] dark:bg-[var(--zui-kbd-secondary-bg-dark,#1e293b)] text-[color:var(--zui-kbd-secondary-fg,#0f172a)] dark:text-[color:var(--zui-kbd-secondary-fg-dark,#f8fafc)]",
  destructive:
    "bg-[var(--zui-kbd-destructive-bg,#f43f5e)] dark:bg-[var(--zui-kbd-destructive-bg-dark,#be123c)] text-[color:var(--zui-kbd-destructive-fg,#ffffff)] dark:text-[color:var(--zui-kbd-destructive-fg-dark,#ffffff)]",
  outline:
    "border border-[color:var(--zui-kbd-outline-border,#0000001a)] dark:border-[color:var(--zui-kbd-outline-border-dark,#ffffff1a)] bg-[var(--zui-kbd-outline-bg,#0000000d)] dark:bg-[var(--zui-kbd-outline-bg-dark,#ffffff0d)] text-[color:var(--zui-kbd-outline-fg,#0f172a)] dark:text-[color:var(--zui-kbd-outline-fg-dark,#f8fafc)]",
  ghost:
    "bg-transparent text-[color:var(--zui-kbd-ghost-fg,#334155)] dark:text-[color:var(--zui-kbd-ghost-fg-dark,#e2e8f0)]",
  glass:
    "border border-[color:var(--zui-kbd-glass-border,#00000026)] dark:border-[color:var(--zui-kbd-glass-border-dark,#ffffff26)] bg-[var(--zui-kbd-glass-bg,#0000001a)] dark:bg-[var(--zui-kbd-glass-bg-dark,#ffffff1a)] text-[color:var(--zui-kbd-glass-fg,#0f172a)] dark:text-[color:var(--zui-kbd-glass-fg-dark,#ffffff)] backdrop-blur-md",
  emerald:
    "bg-[var(--zui-kbd-emerald-bg,#10b981)] dark:bg-[var(--zui-kbd-emerald-bg-dark,#065f46)] text-[color:var(--zui-kbd-emerald-fg,#064e3b)] dark:text-[color:var(--zui-kbd-emerald-fg-dark,#064e3b)]",
  indigo:
    "bg-[var(--zui-kbd-indigo-bg,#3730a3)] dark:bg-[var(--zui-kbd-indigo-bg-dark,#4f46e5)] text-[color:var(--zui-kbd-indigo-fg,#ffffff)] dark:text-[color:var(--zui-kbd-indigo-fg-dark,#ffffff)]",
  purple:
    "bg-[var(--zui-kbd-purple-bg,#6b21a8)] dark:bg-[var(--zui-kbd-purple-bg-dark,#9333ea)] text-[color:var(--zui-kbd-purple-fg,#ffffff)] dark:text-[color:var(--zui-kbd-purple-fg-dark,#ffffff)]",
  pink: "bg-[var(--zui-kbd-pink-bg,#9d174d)] dark:bg-[var(--zui-kbd-pink-bg-dark,#db2777)] text-[color:var(--zui-kbd-pink-fg,#ffffff)] dark:text-[color:var(--zui-kbd-pink-fg-dark,#ffffff)]",
  rose: "bg-[var(--zui-kbd-rose-bg,#9f1239)] dark:bg-[var(--zui-kbd-rose-bg-dark,#e11d48)] text-[color:var(--zui-kbd-rose-fg,#ffffff)] dark:text-[color:var(--zui-kbd-rose-fg-dark,#ffffff)]",
  sky: "bg-[var(--zui-kbd-sky-bg,#0ea5e9)] dark:bg-[var(--zui-kbd-sky-bg-dark,#0369a1)] text-[color:var(--zui-kbd-sky-fg,#ffffff)] dark:text-[color:var(--zui-kbd-sky-fg-dark,#ffffff)]",
  teal: "bg-[var(--zui-kbd-teal-bg,#14b8a6)] dark:bg-[var(--zui-kbd-teal-bg-dark,#0f766e)] text-[color:var(--zui-kbd-teal-fg,#ffffff)] dark:text-[color:var(--zui-kbd-teal-fg-dark,#ffffff)]",
  yellow:
    "bg-[var(--zui-kbd-yellow-bg,#eab308)] dark:bg-[var(--zui-kbd-yellow-bg-dark,#854d0e)] text-[color:var(--zui-kbd-yellow-fg,#ffffff)] dark:text-[color:var(--zui-kbd-yellow-fg-dark,#ffffff)]",
  orange:
    "bg-[var(--zui-kbd-orange-bg,#f97316)] dark:bg-[var(--zui-kbd-orange-bg-dark,#9a3412)] text-[color:var(--zui-kbd-orange-fg,#ffffff)] dark:text-[color:var(--zui-kbd-orange-fg-dark,#ffffff)]",
  gray: "bg-[var(--zui-kbd-gray-bg,#6b7280)] dark:bg-[var(--zui-kbd-gray-bg-dark,#374151)] text-[color:var(--zui-kbd-gray-fg,#ffffff)] dark:text-[color:var(--zui-kbd-gray-fg-dark,#ffffff)]",
  amber:
    "bg-[var(--zui-kbd-amber-bg,#f59e0b)] dark:bg-[var(--zui-kbd-amber-bg-dark,#92400e)] text-[color:var(--zui-kbd-amber-fg,#ffffff)] dark:text-[color:var(--zui-kbd-amber-fg-dark,#ffffff)]",
  violet:
    "bg-[var(--zui-kbd-violet-bg,#5b21b6)] dark:bg-[var(--zui-kbd-violet-bg-dark,#7c3aed)] text-[color:var(--zui-kbd-violet-fg,#ffffff)] dark:text-[color:var(--zui-kbd-violet-fg-dark,#ffffff)]",
  "gradient-blue":
    "bg-linear-to-r from-[var(--zui-kbd-gradient-blue-from,#1e40af)] dark:from-[var(--zui-kbd-gradient-blue-from-dark,#2563eb)] to-[var(--zui-kbd-gradient-blue-to,#6b21a8)] dark:to-[var(--zui-kbd-gradient-blue-to-dark,#9333ea)] text-[color:var(--zui-kbd-gradient-blue-fg,#ffffff)] dark:text-[color:var(--zui-kbd-gradient-blue-fg-dark,#ffffff)]",
  "gradient-green":
    "bg-linear-to-r from-[var(--zui-kbd-gradient-green-from,#166534)] dark:from-[var(--zui-kbd-gradient-green-from-dark,#16a34a)] to-[var(--zui-kbd-gradient-green-to,#3f6212)] dark:to-[var(--zui-kbd-gradient-green-to-dark,#65a30d)] text-[color:var(--zui-kbd-gradient-green-fg,#ffffff)] dark:text-[color:var(--zui-kbd-gradient-green-fg-dark,#ffffff)]",
  "gradient-red":
    "bg-linear-to-r from-[var(--zui-kbd-gradient-red-from,#991b1b)] dark:from-[var(--zui-kbd-gradient-red-from-dark,#dc2626)] to-[var(--zui-kbd-gradient-red-to,#9d174d)] dark:to-[var(--zui-kbd-gradient-red-to-dark,#db2777)] text-[color:var(--zui-kbd-gradient-red-fg,#ffffff)] dark:text-[color:var(--zui-kbd-gradient-red-fg-dark,#ffffff)]",
  "gradient-yellow":
    "bg-linear-to-r from-[var(--zui-kbd-gradient-yellow-from,#854d0e)] dark:from-[var(--zui-kbd-gradient-yellow-from-dark,#ca8a04)] to-[var(--zui-kbd-gradient-yellow-to,#9a3412)] dark:to-[var(--zui-kbd-gradient-yellow-to-dark,#ea580c)] text-[color:var(--zui-kbd-gradient-yellow-fg,#ffffff)] dark:text-[color:var(--zui-kbd-gradient-yellow-fg-dark,#ffffff)]",
  "gradient-purple":
    "bg-linear-to-r from-[var(--zui-kbd-gradient-purple-from,#6b21a8)] dark:from-[var(--zui-kbd-gradient-purple-from-dark,#9333ea)] to-[var(--zui-kbd-gradient-purple-to,#9d174d)] dark:to-[var(--zui-kbd-gradient-purple-to-dark,#db2777)] text-[color:var(--zui-kbd-gradient-purple-fg,#ffffff)] dark:text-[color:var(--zui-kbd-gradient-purple-fg-dark,#ffffff)]",
  "gradient-teal":
    "bg-linear-to-r from-[var(--zui-kbd-gradient-teal-from,#115e59)] dark:from-[var(--zui-kbd-gradient-teal-from-dark,#0d9488)] to-[var(--zui-kbd-gradient-teal-to,#155e75)] dark:to-[var(--zui-kbd-gradient-teal-to-dark,#0891b2)] text-[color:var(--zui-kbd-gradient-teal-fg,#ffffff)] dark:text-[color:var(--zui-kbd-gradient-teal-fg-dark,#ffffff)]",
  "gradient-indigo":
    "bg-linear-to-r from-[var(--zui-kbd-gradient-indigo-from,#3730a3)] dark:from-[var(--zui-kbd-gradient-indigo-from-dark,#4f46e5)] to-[var(--zui-kbd-gradient-indigo-to,#6b21a8)] dark:to-[var(--zui-kbd-gradient-indigo-to-dark,#9333ea)] text-[color:var(--zui-kbd-gradient-indigo-fg,#ffffff)] dark:text-[color:var(--zui-kbd-gradient-indigo-fg-dark,#ffffff)]",
  "gradient-pink":
    "bg-linear-to-r from-[var(--zui-kbd-gradient-pink-from,#9d174d)] dark:from-[var(--zui-kbd-gradient-pink-from-dark,#db2777)] to-[var(--zui-kbd-gradient-pink-to,#9f1239)] dark:to-[var(--zui-kbd-gradient-pink-to-dark,#e11d48)] text-[color:var(--zui-kbd-gradient-pink-fg,#ffffff)] dark:text-[color:var(--zui-kbd-gradient-pink-fg-dark,#ffffff)]",
  "gradient-orange":
    "bg-linear-to-r from-[var(--zui-kbd-gradient-orange-from,#9a3412)] dark:from-[var(--zui-kbd-gradient-orange-from-dark,#ea580c)] to-[var(--zui-kbd-gradient-orange-to,#991b1b)] dark:to-[var(--zui-kbd-gradient-orange-to-dark,#dc2626)] text-[color:var(--zui-kbd-gradient-orange-fg,#ffffff)] dark:text-[color:var(--zui-kbd-gradient-orange-fg-dark,#ffffff)]",
  blue: "border border-[color:var(--zui-kbd-key-blue-border,#2563eb)] dark:border-[color:var(--zui-kbd-key-blue-border-dark,#3b82f6)] bg-[var(--zui-kbd-key-blue-bg,#2563eb)] dark:bg-[var(--zui-kbd-key-blue-bg-dark,#3b82f6)] text-[color:var(--zui-kbd-key-blue-fg,#ffffff)] dark:text-[color:var(--zui-kbd-key-blue-fg-dark,#ffffff)] hover:bg-[var(--zui-kbd-key-blue-bg-hover,#2563eb)] dark:hover:bg-[var(--zui-kbd-key-blue-bg-hover-dark,#3b82f6)]",
  cyan: "border border-[color:var(--zui-kbd-key-cyan-border,#0891b2)] dark:border-[color:var(--zui-kbd-key-cyan-border-dark,#22d3ee)] bg-[var(--zui-kbd-key-cyan-bg,#0891b2)] dark:bg-[var(--zui-kbd-key-cyan-bg-dark,#22d3ee)] text-[color:var(--zui-kbd-key-cyan-fg,#083344)] dark:text-[color:var(--zui-kbd-key-cyan-fg-dark,#083344)] hover:bg-[var(--zui-kbd-key-cyan-bg-hover,#0891b2)] dark:hover:bg-[var(--zui-kbd-key-cyan-bg-hover-dark,#22d3ee)]",
  green:
    "border border-[color:var(--zui-kbd-key-green-border,#16a34a)] dark:border-[color:var(--zui-kbd-key-green-border-dark,#22c55e)] bg-[var(--zui-kbd-key-green-bg,#16a34a)] dark:bg-[var(--zui-kbd-key-green-bg-dark,#22c55e)] text-[color:var(--zui-kbd-key-green-fg,#ffffff)] dark:text-[color:var(--zui-kbd-key-green-fg-dark,#ffffff)] hover:bg-[var(--zui-kbd-key-green-bg-hover,#16a34a)] dark:hover:bg-[var(--zui-kbd-key-green-bg-hover-dark,#22c55e)]",
  lime: "border border-[color:var(--zui-kbd-key-lime-border,#65a30d)] dark:border-[color:var(--zui-kbd-key-lime-border-dark,#a3e635)] bg-[var(--zui-kbd-key-lime-bg,#65a30d)] dark:bg-[var(--zui-kbd-key-lime-bg-dark,#a3e635)] text-[color:var(--zui-kbd-key-lime-fg,#1a2e05)] dark:text-[color:var(--zui-kbd-key-lime-fg-dark,#1a2e05)] hover:bg-[var(--zui-kbd-key-lime-bg-hover,#65a30d)] dark:hover:bg-[var(--zui-kbd-key-lime-bg-hover-dark,#a3e635)]",
  mint: "border border-[color:var(--zui-kbd-key-mint-border,#10b981)] dark:border-[color:var(--zui-kbd-key-mint-border-dark,#6ee7b7)] bg-[var(--zui-kbd-key-mint-bg,#10b981)] dark:bg-[var(--zui-kbd-key-mint-bg-dark,#6ee7b7)] text-[color:var(--zui-kbd-key-mint-fg,#064e3b)] dark:text-[color:var(--zui-kbd-key-mint-fg-dark,#064e3b)] hover:bg-[var(--zui-kbd-key-mint-bg-hover,#10b981)] dark:hover:bg-[var(--zui-kbd-key-mint-bg-hover-dark,#6ee7b7)]",
  ocean:
    "border border-[color:var(--zui-kbd-key-ocean-border,#0284c7)] dark:border-[color:var(--zui-kbd-key-ocean-border-dark,#38bdf8)] bg-[var(--zui-kbd-key-ocean-bg,#0284c7)] dark:bg-[var(--zui-kbd-key-ocean-bg-dark,#38bdf8)] text-[color:var(--zui-kbd-key-ocean-fg,#082f49)] dark:text-[color:var(--zui-kbd-key-ocean-fg-dark,#082f49)] hover:bg-[var(--zui-kbd-key-ocean-bg-hover,#0284c7)] dark:hover:bg-[var(--zui-kbd-key-ocean-bg-hover-dark,#38bdf8)]",
  sapphire:
    "border border-[color:var(--zui-kbd-key-sapphire-border,#1d4ed8)] dark:border-[color:var(--zui-kbd-key-sapphire-border-dark,#60a5fa)] bg-[var(--zui-kbd-key-sapphire-bg,#1d4ed8)] dark:bg-[var(--zui-kbd-key-sapphire-bg-dark,#60a5fa)] text-[color:var(--zui-kbd-key-sapphire-fg,#ffffff)] dark:text-[color:var(--zui-kbd-key-sapphire-fg-dark,#ffffff)] hover:bg-[var(--zui-kbd-key-sapphire-bg-hover,#1d4ed8)] dark:hover:bg-[var(--zui-kbd-key-sapphire-bg-hover-dark,#60a5fa)]",
  lavender:
    "border border-[color:var(--zui-kbd-key-lavender-border,#8b5cf6)] dark:border-[color:var(--zui-kbd-key-lavender-border-dark,#a78bfa)] bg-[var(--zui-kbd-key-lavender-bg,#8b5cf6)] dark:bg-[var(--zui-kbd-key-lavender-bg-dark,#a78bfa)] text-[color:var(--zui-kbd-key-lavender-fg,#ffffff)] dark:text-[color:var(--zui-kbd-key-lavender-fg-dark,#ffffff)] hover:bg-[var(--zui-kbd-key-lavender-bg-hover,#8b5cf6)] dark:hover:bg-[var(--zui-kbd-key-lavender-bg-hover-dark,#a78bfa)]",
  ruby: "border border-[color:var(--zui-kbd-key-ruby-border,#be123c)] dark:border-[color:var(--zui-kbd-key-ruby-border-dark,#fb7185)] bg-[var(--zui-kbd-key-ruby-bg,#be123c)] dark:bg-[var(--zui-kbd-key-ruby-bg-dark,#fb7185)] text-[color:var(--zui-kbd-key-ruby-fg,#ffffff)] dark:text-[color:var(--zui-kbd-key-ruby-fg-dark,#ffffff)] hover:bg-[var(--zui-kbd-key-ruby-bg-hover,#be123c)] dark:hover:bg-[var(--zui-kbd-key-ruby-bg-hover-dark,#fb7185)]",
  red: "border border-[color:var(--zui-kbd-key-red-border,#dc2626)] dark:border-[color:var(--zui-kbd-key-red-border-dark,#ef4444)] bg-[var(--zui-kbd-key-red-bg,#dc2626)] dark:bg-[var(--zui-kbd-key-red-bg-dark,#ef4444)] text-[color:var(--zui-kbd-key-red-fg,#ffffff)] dark:text-[color:var(--zui-kbd-key-red-fg-dark,#ffffff)] hover:bg-[var(--zui-kbd-key-red-bg-hover,#dc2626)] dark:hover:bg-[var(--zui-kbd-key-red-bg-hover-dark,#ef4444)]",
  slate:
    "border border-[color:var(--zui-kbd-key-slate-border,#475569)] dark:border-[color:var(--zui-kbd-key-slate-border-dark,#64748b)] bg-[var(--zui-kbd-key-slate-bg,#475569)] dark:bg-[var(--zui-kbd-key-slate-bg-dark,#64748b)] text-[color:var(--zui-kbd-key-slate-fg,#ffffff)] dark:text-[color:var(--zui-kbd-key-slate-fg-dark,#ffffff)] hover:bg-[var(--zui-kbd-key-slate-bg-hover,#475569)] dark:hover:bg-[var(--zui-kbd-key-slate-bg-hover-dark,#64748b)]",
  zinc: "border border-[color:var(--zui-kbd-key-zinc-border,#52525b)] dark:border-[color:var(--zui-kbd-key-zinc-border-dark,#71717a)] bg-[var(--zui-kbd-key-zinc-bg,#52525b)] dark:bg-[var(--zui-kbd-key-zinc-bg-dark,#71717a)] text-[color:var(--zui-kbd-key-zinc-fg,#ffffff)] dark:text-[color:var(--zui-kbd-key-zinc-fg-dark,#ffffff)] hover:bg-[var(--zui-kbd-key-zinc-bg-hover,#52525b)] dark:hover:bg-[var(--zui-kbd-key-zinc-bg-hover-dark,#71717a)]",
  stone:
    "border border-[color:var(--zui-kbd-key-stone-border,#57534e)] dark:border-[color:var(--zui-kbd-key-stone-border-dark,#78716c)] bg-[var(--zui-kbd-key-stone-bg,#57534e)] dark:bg-[var(--zui-kbd-key-stone-bg-dark,#78716c)] text-[color:var(--zui-kbd-key-stone-fg,#ffffff)] dark:text-[color:var(--zui-kbd-key-stone-fg-dark,#ffffff)] hover:bg-[var(--zui-kbd-key-stone-bg-hover,#57534e)] dark:hover:bg-[var(--zui-kbd-key-stone-bg-hover-dark,#78716c)]",
  royal:
    "border border-[color:var(--zui-kbd-key-royal-border,#4338ca)] dark:border-[color:var(--zui-kbd-key-royal-border-dark,#818cf8)] bg-[var(--zui-kbd-key-royal-bg,#4338ca)] dark:bg-[var(--zui-kbd-key-royal-bg-dark,#818cf8)] text-[color:var(--zui-kbd-key-royal-fg,#ffffff)] dark:text-[color:var(--zui-kbd-key-royal-fg-dark,#ffffff)] hover:bg-[var(--zui-kbd-key-royal-bg-hover,#4338ca)] dark:hover:bg-[var(--zui-kbd-key-royal-bg-hover-dark,#818cf8)]",
  electric:
    "border border-[color:var(--zui-kbd-key-electric-border,#0ea5e9)] dark:border-[color:var(--zui-kbd-key-electric-border-dark,#38bdf8)] bg-[var(--zui-kbd-key-electric-bg,#0ea5e9)] dark:bg-[var(--zui-kbd-key-electric-bg-dark,#38bdf8)] text-[color:var(--zui-kbd-key-electric-fg,#ffffff)] dark:text-[color:var(--zui-kbd-key-electric-fg-dark,#ffffff)] hover:bg-[var(--zui-kbd-key-electric-bg-hover,#0ea5e9)] dark:hover:bg-[var(--zui-kbd-key-electric-bg-hover-dark,#38bdf8)]",
  forest:
    "border border-[color:var(--zui-kbd-key-forest-border,#166534)] dark:border-[color:var(--zui-kbd-key-forest-border-dark,#4ade80)] bg-[var(--zui-kbd-key-forest-bg,#166534)] dark:bg-[var(--zui-kbd-key-forest-bg-dark,#4ade80)] text-[color:var(--zui-kbd-key-forest-fg,#ffffff)] dark:text-[color:var(--zui-kbd-key-forest-fg-dark,#ffffff)] hover:bg-[var(--zui-kbd-key-forest-bg-hover,#166534)] dark:hover:bg-[var(--zui-kbd-key-forest-bg-hover-dark,#4ade80)]",
  sunset:
    "border border-[color:var(--zui-kbd-key-sunset-border,#ea580c)] dark:border-[color:var(--zui-kbd-key-sunset-border-dark,#fb923c)] bg-[var(--zui-kbd-key-sunset-bg,#ea580c)] dark:bg-[var(--zui-kbd-key-sunset-bg-dark,#fb923c)] text-[color:var(--zui-kbd-key-sunset-fg,#ffffff)] dark:text-[color:var(--zui-kbd-key-sunset-fg-dark,#ffffff)] hover:bg-[var(--zui-kbd-key-sunset-bg-hover,#ea580c)] dark:hover:bg-[var(--zui-kbd-key-sunset-bg-hover-dark,#fb923c)]",
  magenta:
    "border border-[color:var(--zui-kbd-key-magenta-border,#c026d3)] dark:border-[color:var(--zui-kbd-key-magenta-border-dark,#e879f9)] bg-[var(--zui-kbd-key-magenta-bg,#c026d3)] dark:bg-[var(--zui-kbd-key-magenta-bg-dark,#e879f9)] text-[color:var(--zui-kbd-key-magenta-fg,#ffffff)] dark:text-[color:var(--zui-kbd-key-magenta-fg-dark,#ffffff)] hover:bg-[var(--zui-kbd-key-magenta-bg-hover,#c026d3)] dark:hover:bg-[var(--zui-kbd-key-magenta-bg-hover-dark,#e879f9)]",
  crimson:
    "border border-[color:var(--zui-kbd-key-crimson-border,#b91c1c)] dark:border-[color:var(--zui-kbd-key-crimson-border-dark,#f87171)] bg-[var(--zui-kbd-key-crimson-bg,#b91c1c)] dark:bg-[var(--zui-kbd-key-crimson-bg-dark,#f87171)] text-[color:var(--zui-kbd-key-crimson-fg,#ffffff)] dark:text-[color:var(--zui-kbd-key-crimson-fg-dark,#ffffff)] hover:bg-[var(--zui-kbd-key-crimson-bg-hover,#b91c1c)] dark:hover:bg-[var(--zui-kbd-key-crimson-bg-hover-dark,#f87171)]",
  aqua: "border border-[color:var(--zui-kbd-key-aqua-border,#0f766e)] dark:border-[color:var(--zui-kbd-key-aqua-border-dark,#2dd4bf)] bg-[var(--zui-kbd-key-aqua-bg,#0f766e)] dark:bg-[var(--zui-kbd-key-aqua-bg-dark,#2dd4bf)] text-[color:var(--zui-kbd-key-aqua-fg,#ffffff)] dark:text-[color:var(--zui-kbd-key-aqua-fg-dark,#ffffff)] hover:bg-[var(--zui-kbd-key-aqua-bg-hover,#0f766e)] dark:hover:bg-[var(--zui-kbd-key-aqua-bg-hover-dark,#2dd4bf)]",
  plum: "border border-[color:var(--zui-kbd-key-plum-border,#7e22ce)] dark:border-[color:var(--zui-kbd-key-plum-border-dark,#c084fc)] bg-[var(--zui-kbd-key-plum-bg,#7e22ce)] dark:bg-[var(--zui-kbd-key-plum-bg-dark,#c084fc)] text-[color:var(--zui-kbd-key-plum-fg,#ffffff)] dark:text-[color:var(--zui-kbd-key-plum-fg-dark,#ffffff)] hover:bg-[var(--zui-kbd-key-plum-bg-hover,#7e22ce)] dark:hover:bg-[var(--zui-kbd-key-plum-bg-hover-dark,#c084fc)]",
} as const;

export type ZuiKbdAppearance = keyof typeof zuiKbdKeyAppearances;

export const zuiKbdKeyBase = [
  "inline-flex items-center justify-center font-mono font-medium leading-none",
  "rounded-[var(--zui-kbd-radius,0.375rem)]",
  "shadow-[var(--zui-kbd-shadow,inset_0_-1px_0_#0000001f)] dark:shadow-[var(--zui-kbd-shadow-dark,inset_0_-1px_0_#0000004d)]",
] as const;

export const zuiKbdKeySizes = {
  sm: "h-5 min-w-5 px-1 text-[0.7rem]",
  md: "h-6 min-w-6 px-1.5 text-xs",
  lg: "h-7 min-w-7 px-2 text-sm",
} as const;

export type ZuiKbdSize = keyof typeof zuiKbdKeySizes;

export const zuiKbdSeparatorBase =
  "text-[color:var(--zui-kbd-separator-fg,#94a3b8)] dark:text-[color:var(--zui-kbd-separator-fg-dark,#64748b)]";

export const zuiKbdSeparatorSizes = {
  sm: "text-[0.7rem]",
  md: "text-xs",
  lg: "text-sm",
} as const;
