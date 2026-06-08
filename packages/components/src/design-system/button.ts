import { zuiDisabledState, zuiInteractiveBase } from "./tokens";

export const zuiButtonBase = [
  "inline-flex items-center justify-center gap-2 whitespace-nowrap",
  "rounded-[var(--zui-button-radius,0.75rem)]",
  "text-sm font-medium",
  "ring-offset-[var(--zui-button-ring-offset,#f8fafc)] dark:ring-offset-[var(--zui-button-ring-offset-dark,#020617)]",
  ...zuiInteractiveBase,
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zui-button-focus-ring,#475569)] dark:focus-visible:ring-[var(--zui-button-focus-ring-dark,#cbd5e1)] focus-visible:ring-offset-2",
  zuiDisabledState.default,
] as const;

export const zuiButtonAppearances = {
  default:
    "bg-[var(--zui-button-default-bg,#0f172a)] dark:bg-[var(--zui-button-default-bg-dark,#f8fafc)] text-[color:var(--zui-button-default-fg,#f8fafc)] dark:text-[color:var(--zui-button-default-fg-dark,#020617)] shadow-[var(--zui-button-default-shadow,0_1px_2px_#0f172a14)] dark:shadow-[var(--zui-button-default-shadow-dark,0_1px_2px_#0f172a1f)] hover:bg-[var(--zui-button-default-bg-hover,#000000)] dark:hover:bg-[var(--zui-button-default-bg-hover-dark,#ffffff)]",
  secondary:
    "bg-[var(--zui-button-secondary-bg,#e2e8f0)] dark:bg-[var(--zui-button-secondary-bg-dark,#1e293b)] text-[color:var(--zui-button-secondary-fg,#0f172a)] dark:text-[color:var(--zui-button-secondary-fg-dark,#f8fafc)] hover:bg-[var(--zui-button-secondary-bg-hover,#cbd5e1)] dark:hover:bg-[var(--zui-button-secondary-bg-hover-dark,#334155)]",
  destructive:
    "bg-[var(--zui-button-destructive-bg,#f43f5e)] dark:bg-[var(--zui-button-destructive-bg-dark,#be123c)] text-[color:var(--zui-button-destructive-fg,#ffffff)] dark:text-[color:var(--zui-button-destructive-fg-dark,#ffffff)] hover:bg-[var(--zui-button-destructive-bg-hover,#f43f5e)] dark:hover:bg-[var(--zui-button-destructive-bg-hover-dark,#9f1239)]",
  outline:
    "border border-[color:var(--zui-button-outline-border,#0000001a)] dark:border-[color:var(--zui-button-outline-border-dark,#ffffff1a)] bg-[var(--zui-button-outline-bg,#0000000d)] dark:bg-[var(--zui-button-outline-bg-dark,#ffffff0d)] text-[color:var(--zui-button-outline-fg,#0f172a)] dark:text-[color:var(--zui-button-outline-fg-dark,#f8fafc)] hover:bg-[var(--zui-button-outline-bg-hover,#0000001a)] dark:hover:bg-[var(--zui-button-outline-bg-hover-dark,#ffffff1a)]",
  ghost:
    "bg-transparent text-[color:var(--zui-button-ghost-fg,#334155)] dark:text-[color:var(--zui-button-ghost-fg-dark,#e2e8f0)] hover:bg-[var(--zui-button-ghost-bg-hover,#0000000d)] dark:hover:bg-[var(--zui-button-ghost-bg-hover-dark,#ffffff0d)]",
  link: "bg-transparent text-[color:var(--zui-button-link-fg,#0e7490)] dark:text-[color:var(--zui-button-link-fg-dark,#67e8f9)] underline-offset-4 hover:underline",
  glass:
    "border border-[color:var(--zui-button-glass-border,#00000026)] dark:border-[color:var(--zui-button-glass-border-dark,#ffffff26)] bg-[var(--zui-button-glass-bg,#0000001a)] dark:bg-[var(--zui-button-glass-bg-dark,#ffffff1a)] text-[color:var(--zui-button-glass-fg,#0f172a)] dark:text-[color:var(--zui-button-glass-fg-dark,#ffffff)] backdrop-blur-md hover:bg-[var(--zui-button-glass-bg-hover,#00000026)] dark:hover:bg-[var(--zui-button-glass-bg-hover-dark,#ffffff26)]",
  blue: "bg-[var(--zui-button-blue-bg,#2563eb)] dark:bg-[var(--zui-button-blue-bg-dark,#3b82f6)] text-[color:var(--zui-button-blue-fg,#ffffff)] dark:text-[color:var(--zui-button-blue-fg-dark,#ffffff)] hover:bg-[var(--zui-button-blue-bg-hover,#2563eb)] dark:hover:bg-[var(--zui-button-blue-bg-hover-dark,#3b82f6)]",
  cyan: "bg-[var(--zui-button-cyan-bg,#0891b2)] dark:bg-[var(--zui-button-cyan-bg-dark,#22d3ee)] text-[color:var(--zui-button-cyan-fg,#083344)] dark:text-[color:var(--zui-button-cyan-fg-dark,#083344)] hover:bg-[var(--zui-button-cyan-bg-hover,#0891b2)] dark:hover:bg-[var(--zui-button-cyan-bg-hover-dark,#22d3ee)]",
  green:
    "bg-[var(--zui-button-green-bg,#16a34a)] dark:bg-[var(--zui-button-green-bg-dark,#22c55e)] text-[color:var(--zui-button-green-fg,#ffffff)] dark:text-[color:var(--zui-button-green-fg-dark,#052e16)] hover:bg-[var(--zui-button-green-bg-hover,#16a34a)] dark:hover:bg-[var(--zui-button-green-bg-hover-dark,#22c55e)]",
  lime: "bg-[var(--zui-button-lime-bg,#65a30d)] dark:bg-[var(--zui-button-lime-bg-dark,#a3e635)] text-[color:var(--zui-button-lime-fg,#1a2e05)] dark:text-[color:var(--zui-button-lime-fg-dark,#1a2e05)] hover:bg-[var(--zui-button-lime-bg-hover,#65a30d)] dark:hover:bg-[var(--zui-button-lime-bg-hover-dark,#a3e635)]",
  mint: "bg-[var(--zui-button-mint-bg,#10b981)] dark:bg-[var(--zui-button-mint-bg-dark,#6ee7b7)] text-[color:var(--zui-button-mint-fg,#064e3b)] dark:text-[color:var(--zui-button-mint-fg-dark,#064e3b)] hover:bg-[var(--zui-button-mint-bg-hover,#10b981)] dark:hover:bg-[var(--zui-button-mint-bg-hover-dark,#6ee7b7)]",
  ocean:
    "bg-[var(--zui-button-ocean-bg,#0284c7)] dark:bg-[var(--zui-button-ocean-bg-dark,#38bdf8)] text-[color:var(--zui-button-ocean-fg,#082f49)] dark:text-[color:var(--zui-button-ocean-fg-dark,#082f49)] hover:bg-[var(--zui-button-ocean-bg-hover,#0284c7)] dark:hover:bg-[var(--zui-button-ocean-bg-hover-dark,#38bdf8)]",
  sapphire:
    "bg-[var(--zui-button-sapphire-bg,#1d4ed8)] dark:bg-[var(--zui-button-sapphire-bg-dark,#60a5fa)] text-[color:var(--zui-button-sapphire-fg,#ffffff)] dark:text-[color:var(--zui-button-sapphire-fg-dark,#0f172a)] hover:bg-[var(--zui-button-sapphire-bg-hover,#1d4ed8)] dark:hover:bg-[var(--zui-button-sapphire-bg-hover-dark,#60a5fa)]",
  lavender:
    "bg-[var(--zui-button-lavender-bg,#8b5cf6)] dark:bg-[var(--zui-button-lavender-bg-dark,#a78bfa)] text-[color:var(--zui-button-lavender-fg,#ffffff)] dark:text-[color:var(--zui-button-lavender-fg-dark,#1e1b4b)] hover:bg-[var(--zui-button-lavender-bg-hover,#8b5cf6)] dark:hover:bg-[var(--zui-button-lavender-bg-hover-dark,#a78bfa)]",
  ruby: "bg-[var(--zui-button-ruby-bg,#be123c)] dark:bg-[var(--zui-button-ruby-bg-dark,#fb7185)] text-[color:var(--zui-button-ruby-fg,#ffffff)] dark:text-[color:var(--zui-button-ruby-fg-dark,#450a0a)] hover:bg-[var(--zui-button-ruby-bg-hover,#be123c)] dark:hover:bg-[var(--zui-button-ruby-bg-hover-dark,#fb7185)]",
  red: "bg-[var(--zui-button-red-bg,#dc2626)] dark:bg-[var(--zui-button-red-bg-dark,#ef4444)] text-[color:var(--zui-button-red-fg,#ffffff)] dark:text-[color:var(--zui-button-red-fg-dark,#ffffff)] hover:bg-[var(--zui-button-red-bg-hover,#dc2626)] dark:hover:bg-[var(--zui-button-red-bg-hover-dark,#ef4444)]",
  slate:
    "bg-[var(--zui-button-slate-bg,#475569)] dark:bg-[var(--zui-button-slate-bg-dark,#64748b)] text-[color:var(--zui-button-slate-fg,#ffffff)] dark:text-[color:var(--zui-button-slate-fg-dark,#ffffff)] hover:bg-[var(--zui-button-slate-bg-hover,#475569)] dark:hover:bg-[var(--zui-button-slate-bg-hover-dark,#64748b)]",
  zinc: "bg-[var(--zui-button-zinc-bg,#52525b)] dark:bg-[var(--zui-button-zinc-bg-dark,#71717a)] text-[color:var(--zui-button-zinc-fg,#ffffff)] dark:text-[color:var(--zui-button-zinc-fg-dark,#ffffff)] hover:bg-[var(--zui-button-zinc-bg-hover,#52525b)] dark:hover:bg-[var(--zui-button-zinc-bg-hover-dark,#71717a)]",
  stone:
    "bg-[var(--zui-button-stone-bg,#57534e)] dark:bg-[var(--zui-button-stone-bg-dark,#78716c)] text-[color:var(--zui-button-stone-fg,#ffffff)] dark:text-[color:var(--zui-button-stone-fg-dark,#ffffff)] hover:bg-[var(--zui-button-stone-bg-hover,#57534e)] dark:hover:bg-[var(--zui-button-stone-bg-hover-dark,#78716c)]",
  royal:
    "bg-[var(--zui-button-royal-bg,#4338ca)] dark:bg-[var(--zui-button-royal-bg-dark,#818cf8)] text-[color:var(--zui-button-royal-fg,#ffffff)] dark:text-[color:var(--zui-button-royal-fg-dark,#1e1b4b)] hover:bg-[var(--zui-button-royal-bg-hover,#4338ca)] dark:hover:bg-[var(--zui-button-royal-bg-hover-dark,#818cf8)]",
  electric:
    "bg-[var(--zui-button-electric-bg,#0ea5e9)] dark:bg-[var(--zui-button-electric-bg-dark,#38bdf8)] text-[color:var(--zui-button-electric-fg,#ffffff)] dark:text-[color:var(--zui-button-electric-fg-dark,#082f49)] hover:bg-[var(--zui-button-electric-bg-hover,#0ea5e9)] dark:hover:bg-[var(--zui-button-electric-bg-hover-dark,#38bdf8)]",
  forest:
    "bg-[var(--zui-button-forest-bg,#166534)] dark:bg-[var(--zui-button-forest-bg-dark,#4ade80)] text-[color:var(--zui-button-forest-fg,#ffffff)] dark:text-[color:var(--zui-button-forest-fg-dark,#052e16)] hover:bg-[var(--zui-button-forest-bg-hover,#166534)] dark:hover:bg-[var(--zui-button-forest-bg-hover-dark,#4ade80)]",
  sunset:
    "bg-[var(--zui-button-sunset-bg,#ea580c)] dark:bg-[var(--zui-button-sunset-bg-dark,#fb923c)] text-[color:var(--zui-button-sunset-fg,#ffffff)] dark:text-[color:var(--zui-button-sunset-fg-dark,#431407)] hover:bg-[var(--zui-button-sunset-bg-hover,#ea580c)] dark:hover:bg-[var(--zui-button-sunset-bg-hover-dark,#fb923c)]",
  magenta:
    "bg-[var(--zui-button-magenta-bg,#c026d3)] dark:bg-[var(--zui-button-magenta-bg-dark,#e879f9)] text-[color:var(--zui-button-magenta-fg,#ffffff)] dark:text-[color:var(--zui-button-magenta-fg-dark,#4a044e)] hover:bg-[var(--zui-button-magenta-bg-hover,#c026d3)] dark:hover:bg-[var(--zui-button-magenta-bg-hover-dark,#e879f9)]",
  crimson:
    "bg-[var(--zui-button-crimson-bg,#b91c1c)] dark:bg-[var(--zui-button-crimson-bg-dark,#f87171)] text-[color:var(--zui-button-crimson-fg,#ffffff)] dark:text-[color:var(--zui-button-crimson-fg-dark,#450a0a)] hover:bg-[var(--zui-button-crimson-bg-hover,#b91c1c)] dark:hover:bg-[var(--zui-button-crimson-bg-hover-dark,#f87171)]",
  aqua: "bg-[var(--zui-button-aqua-bg,#0f766e)] dark:bg-[var(--zui-button-aqua-bg-dark,#2dd4bf)] text-[color:var(--zui-button-aqua-fg,#ffffff)] dark:text-[color:var(--zui-button-aqua-fg-dark,#042f2e)] hover:bg-[var(--zui-button-aqua-bg-hover,#0f766e)] dark:hover:bg-[var(--zui-button-aqua-bg-hover-dark,#2dd4bf)]",
  plum: "bg-[var(--zui-button-plum-bg,#7e22ce)] dark:bg-[var(--zui-button-plum-bg-dark,#c084fc)] text-[color:var(--zui-button-plum-fg,#ffffff)] dark:text-[color:var(--zui-button-plum-fg-dark,#3b0764)] hover:bg-[var(--zui-button-plum-bg-hover,#7e22ce)] dark:hover:bg-[var(--zui-button-plum-bg-hover-dark,#c084fc)]",
  emerald:
    "bg-[var(--zui-button-emerald-bg,#10b981)] dark:bg-[var(--zui-button-emerald-bg-dark,#065f46)] text-[color:var(--zui-button-emerald-fg,#064e3b)] dark:text-[color:var(--zui-button-emerald-fg-dark,#064e3b)] hover:bg-[var(--zui-button-emerald-bg-hover,#10b981)] dark:hover:bg-[var(--zui-button-emerald-bg-hover-dark,#064e3b)]",
  indigo:
    "bg-[var(--zui-button-indigo-bg,#3730a3)] dark:bg-[var(--zui-button-indigo-bg-dark,#4f46e5)] text-[color:var(--zui-button-indigo-fg,#ffffff)] dark:text-[color:var(--zui-button-indigo-fg-dark,#ffffff)] hover:bg-[var(--zui-button-indigo-bg-hover,#3730a3)] dark:hover:bg-[var(--zui-button-indigo-bg-hover-dark,#4f46e5)]",
  purple:
    "bg-[var(--zui-button-purple-bg,#6b21a8)] dark:bg-[var(--zui-button-purple-bg-dark,#9333ea)] text-[color:var(--zui-button-purple-fg,#ffffff)] dark:text-[color:var(--zui-button-purple-fg-dark,#ffffff)] hover:bg-[var(--zui-button-purple-bg-hover,#6b21a8)] dark:hover:bg-[var(--zui-button-purple-bg-hover-dark,#9333ea)]",
  pink: "bg-[var(--zui-button-pink-bg,#9d174d)] dark:bg-[var(--zui-button-pink-bg-dark,#db2777)] text-[color:var(--zui-button-pink-fg,#ffffff)] dark:text-[color:var(--zui-button-pink-fg-dark,#ffffff)] hover:bg-[var(--zui-button-pink-bg-hover,#9d174d)] dark:hover:bg-[var(--zui-button-pink-bg-hover-dark,#db2777)]",
  rose: "bg-[var(--zui-button-rose-bg,#9f1239)] dark:bg-[var(--zui-button-rose-bg-dark,#e11d48)] text-[color:var(--zui-button-rose-fg,#ffffff)] dark:text-[color:var(--zui-button-rose-fg-dark,#ffffff)] hover:bg-[var(--zui-button-rose-bg-hover,#9f1239)] dark:hover:bg-[var(--zui-button-rose-bg-hover-dark,#e11d48)]",
  sky: "bg-[var(--zui-button-sky-bg,#0ea5e9)] dark:bg-[var(--zui-button-sky-bg-dark,#0369a1)] text-[color:var(--zui-button-sky-fg,#ffffff)] dark:text-[color:var(--zui-button-sky-fg-dark,#ffffff)] hover:bg-[var(--zui-button-sky-bg-hover,#0ea5e9)] dark:hover:bg-[var(--zui-button-sky-bg-hover-dark,#075985)]",
  teal: "bg-[var(--zui-button-teal-bg,#14b8a6)] dark:bg-[var(--zui-button-teal-bg-dark,#0f766e)] text-[color:var(--zui-button-teal-fg,#ffffff)] dark:text-[color:var(--zui-button-teal-fg-dark,#ffffff)] hover:bg-[var(--zui-button-teal-bg-hover,#14b8a6)] dark:hover:bg-[var(--zui-button-teal-bg-hover-dark,#115e59)]",
  yellow:
    "bg-[var(--zui-button-yellow-bg,#eab308)] dark:bg-[var(--zui-button-yellow-bg-dark,#854d0e)] text-[color:var(--zui-button-yellow-fg,#ffffff)] dark:text-[color:var(--zui-button-yellow-fg-dark,#ffffff)] hover:bg-[var(--zui-button-yellow-bg-hover,#eab308)] dark:hover:bg-[var(--zui-button-yellow-bg-hover-dark,#713f12)]",
  orange:
    "bg-[var(--zui-button-orange-bg,#f97316)] dark:bg-[var(--zui-button-orange-bg-dark,#9a3412)] text-[color:var(--zui-button-orange-fg,#ffffff)] dark:text-[color:var(--zui-button-orange-fg-dark,#ffffff)] hover:bg-[var(--zui-button-orange-bg-hover,#f97316)] dark:hover:bg-[var(--zui-button-orange-bg-hover-dark,#7c2d12)]",
  gray: "bg-[var(--zui-button-gray-bg,#6b7280)] dark:bg-[var(--zui-button-gray-bg-dark,#374151)] text-[color:var(--zui-button-gray-fg,#ffffff)] dark:text-[color:var(--zui-button-gray-fg-dark,#ffffff)] hover:bg-[var(--zui-button-gray-bg-hover,#6b7280)] dark:hover:bg-[var(--zui-button-gray-bg-hover-dark,#1f2937)]",
  amber:
    "bg-[var(--zui-button-amber-bg,#f59e0b)] dark:bg-[var(--zui-button-amber-bg-dark,#92400e)] text-[color:var(--zui-button-amber-fg,#ffffff)] dark:text-[color:var(--zui-button-amber-fg-dark,#ffffff)] hover:bg-[var(--zui-button-amber-bg-hover,#f59e0b)] dark:hover:bg-[var(--zui-button-amber-bg-hover-dark,#78350f)]",
  violet:
    "bg-[var(--zui-button-violet-bg,#5b21b6)] dark:bg-[var(--zui-button-violet-bg-dark,#7c3aed)] text-[color:var(--zui-button-violet-fg,#ffffff)] dark:text-[color:var(--zui-button-violet-fg-dark,#ffffff)] hover:bg-[var(--zui-button-violet-bg-hover,#5b21b6)] dark:hover:bg-[var(--zui-button-violet-bg-hover-dark,#7c3aed)]",
  "gradient-blue":
    "bg-linear-to-r from-[var(--zui-button-gradient-blue-from,#1e40af)] dark:from-[var(--zui-button-gradient-blue-from-dark,#2563eb)] to-[var(--zui-button-gradient-blue-to,#6b21a8)] dark:to-[var(--zui-button-gradient-blue-to-dark,#9333ea)] text-[color:var(--zui-button-gradient-blue-fg,#ffffff)] dark:text-[color:var(--zui-button-gradient-blue-fg-dark,#ffffff)] hover:from-[var(--zui-button-gradient-blue-from-hover,#1e40af)] dark:hover:from-[var(--zui-button-gradient-blue-from-hover-dark,#2563eb)] hover:to-[var(--zui-button-gradient-blue-to-hover,#6b21a8)] dark:hover:to-[var(--zui-button-gradient-blue-to-hover-dark,#9333ea)]",
  "gradient-green":
    "bg-linear-to-r from-[var(--zui-button-gradient-green-from,#166534)] dark:from-[var(--zui-button-gradient-green-from-dark,#16a34a)] to-[var(--zui-button-gradient-green-to,#3f6212)] dark:to-[var(--zui-button-gradient-green-to-dark,#65a30d)] text-[color:var(--zui-button-gradient-green-fg,#ffffff)] dark:text-[color:var(--zui-button-gradient-green-fg-dark,#ffffff)] hover:from-[var(--zui-button-gradient-green-from-hover,#166534)] dark:hover:from-[var(--zui-button-gradient-green-from-hover-dark,#16a34a)] hover:to-[var(--zui-button-gradient-green-to-hover,#3f6212)] dark:hover:to-[var(--zui-button-gradient-green-to-hover-dark,#65a30d)]",
  "gradient-red":
    "bg-linear-to-r from-[var(--zui-button-gradient-red-from,#991b1b)] dark:from-[var(--zui-button-gradient-red-from-dark,#dc2626)] to-[var(--zui-button-gradient-red-to,#9d174d)] dark:to-[var(--zui-button-gradient-red-to-dark,#db2777)] text-[color:var(--zui-button-gradient-red-fg,#ffffff)] dark:text-[color:var(--zui-button-gradient-red-fg-dark,#ffffff)] hover:from-[var(--zui-button-gradient-red-from-hover,#991b1b)] dark:hover:from-[var(--zui-button-gradient-red-from-hover-dark,#dc2626)] hover:to-[var(--zui-button-gradient-red-to-hover,#9d174d)] dark:hover:to-[var(--zui-button-gradient-red-to-hover-dark,#db2777)]",
  "gradient-yellow":
    "bg-linear-to-r from-[var(--zui-button-gradient-yellow-from,#854d0e)] dark:from-[var(--zui-button-gradient-yellow-from-dark,#ca8a04)] to-[var(--zui-button-gradient-yellow-to,#9a3412)] dark:to-[var(--zui-button-gradient-yellow-to-dark,#ea580c)] text-[color:var(--zui-button-gradient-yellow-fg,#ffffff)] dark:text-[color:var(--zui-button-gradient-yellow-fg-dark,#ffffff)] hover:from-[var(--zui-button-gradient-yellow-from-hover,#854d0e)] dark:hover:from-[var(--zui-button-gradient-yellow-from-hover-dark,#ca8a04)] hover:to-[var(--zui-button-gradient-yellow-to-hover,#9a3412)] dark:hover:to-[var(--zui-button-gradient-yellow-to-hover-dark,#ea580c)]",
  "gradient-purple":
    "bg-linear-to-r from-[var(--zui-button-gradient-purple-from,#6b21a8)] dark:from-[var(--zui-button-gradient-purple-from-dark,#9333ea)] to-[var(--zui-button-gradient-purple-to,#9d174d)] dark:to-[var(--zui-button-gradient-purple-to-dark,#db2777)] text-[color:var(--zui-button-gradient-purple-fg,#ffffff)] dark:text-[color:var(--zui-button-gradient-purple-fg-dark,#ffffff)] hover:from-[var(--zui-button-gradient-purple-from-hover,#6b21a8)] dark:hover:from-[var(--zui-button-gradient-purple-from-hover-dark,#9333ea)] hover:to-[var(--zui-button-gradient-purple-to-hover,#9d174d)] dark:hover:to-[var(--zui-button-gradient-purple-to-hover-dark,#db2777)]",
  "gradient-teal":
    "bg-linear-to-r from-[var(--zui-button-gradient-teal-from,#115e59)] dark:from-[var(--zui-button-gradient-teal-from-dark,#0d9488)] to-[var(--zui-button-gradient-teal-to,#155e75)] dark:to-[var(--zui-button-gradient-teal-to-dark,#0891b2)] text-[color:var(--zui-button-gradient-teal-fg,#ffffff)] dark:text-[color:var(--zui-button-gradient-teal-fg-dark,#ffffff)] hover:from-[var(--zui-button-gradient-teal-from-hover,#115e59)] dark:hover:from-[var(--zui-button-gradient-teal-from-hover-dark,#0d9488)] hover:to-[var(--zui-button-gradient-teal-to-hover,#155e75)] dark:hover:to-[var(--zui-button-gradient-teal-to-hover-dark,#0891b2)]",
  "gradient-indigo":
    "bg-linear-to-r from-[var(--zui-button-gradient-indigo-from,#3730a3)] dark:from-[var(--zui-button-gradient-indigo-from-dark,#4f46e5)] to-[var(--zui-button-gradient-indigo-to,#6b21a8)] dark:to-[var(--zui-button-gradient-indigo-to-dark,#9333ea)] text-[color:var(--zui-button-gradient-indigo-fg,#ffffff)] dark:text-[color:var(--zui-button-gradient-indigo-fg-dark,#ffffff)] hover:from-[var(--zui-button-gradient-indigo-from-hover,#3730a3)] dark:hover:from-[var(--zui-button-gradient-indigo-from-hover-dark,#4f46e5)] hover:to-[var(--zui-button-gradient-indigo-to-hover,#6b21a8)] dark:hover:to-[var(--zui-button-gradient-indigo-to-hover-dark,#9333ea)]",
  "gradient-pink":
    "bg-linear-to-r from-[var(--zui-button-gradient-pink-from,#9d174d)] dark:from-[var(--zui-button-gradient-pink-from-dark,#db2777)] to-[var(--zui-button-gradient-pink-to,#9f1239)] dark:to-[var(--zui-button-gradient-pink-to-dark,#e11d48)] text-[color:var(--zui-button-gradient-pink-fg,#ffffff)] dark:text-[color:var(--zui-button-gradient-pink-fg-dark,#ffffff)] hover:from-[var(--zui-button-gradient-pink-from-hover,#9d174d)] dark:hover:from-[var(--zui-button-gradient-pink-from-hover-dark,#db2777)] hover:to-[var(--zui-button-gradient-pink-to-hover,#9f1239)] dark:hover:to-[var(--zui-button-gradient-pink-to-hover-dark,#e11d48)]",
  "gradient-orange":
    "bg-linear-to-r from-[var(--zui-button-gradient-orange-from,#9a3412)] dark:from-[var(--zui-button-gradient-orange-from-dark,#ea580c)] to-[var(--zui-button-gradient-orange-to,#991b1b)] dark:to-[var(--zui-button-gradient-orange-to-dark,#dc2626)] text-[color:var(--zui-button-gradient-orange-fg,#ffffff)] dark:text-[color:var(--zui-button-gradient-orange-fg-dark,#ffffff)] hover:from-[var(--zui-button-gradient-orange-from-hover,#9a3412)] dark:hover:from-[var(--zui-button-gradient-orange-from-hover-dark,#ea580c)] hover:to-[var(--zui-button-gradient-orange-to-hover,#991b1b)] dark:hover:to-[var(--zui-button-gradient-orange-to-hover-dark,#dc2626)]",
} as const;

export const zuiButtonSizes = {
  sm: "h-7 md:h-9 px-3 text-xs",
  md: "h-9 md:h-11 px-4",
  lg: "h-10 md:h-12 px-5 text-base",
  xl: "h-12 md:h-14 px-6 text-lg",
  "2xl": "h-14 md:h-16 px-6 md:px-8 text-xl",
  "3xl": "h-16 md:h-18 px-8 md:px-10 text-2xl",
  "4xl": "h-18 md:h-20 px-10 md:px-12 text-2xl",
  "5xl": "h-20 md:h-22 px-12 md:px-14 text-2xl",
  "6xl": "h-22 md:h-24 px-14 md:px-16 text-2xl",
  "7xl": "h-24 md:h-26 px-16 md:px-18 text-2xl",
  "8xl": "h-26 md:h-28 px-20 text-2xl",
  "9xl": "h-24 md:h-30 px-18 md:px-22 text-2xl",
  "10xl": "h-26 md:h-32 px-20 md:px-24 text-2xl",
  icon: "h-10 w-10",
} as const;
