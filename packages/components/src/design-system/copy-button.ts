export const zuiCopyButtonBase = [
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
  "rounded-[var(--zui-copy-button-radius,0.75rem)] font-medium",
  "ring-offset-[var(--zui-copy-button-ring-offset,#f8fafc)] dark:ring-offset-[var(--zui-copy-button-ring-offset-dark,#020617)]",
  "transition-colors select-none",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zui-copy-button-focus-ring,#475569)] dark:focus-visible:ring-[var(--zui-copy-button-focus-ring-dark,#cbd5e1)] focus-visible:ring-offset-2",
  "disabled:pointer-events-none disabled:opacity-50",
] as const;

export const zuiCopyButtonAppearances = {
  default:
    "bg-[var(--zui-copy-button-default-bg,#0f172a)] dark:bg-[var(--zui-copy-button-default-bg-dark,#f8fafc)] text-[color:var(--zui-copy-button-default-fg,#f8fafc)] dark:text-[color:var(--zui-copy-button-default-fg-dark,#020617)] shadow-[var(--zui-copy-button-default-shadow,0_1px_2px_#0f172a14)] dark:shadow-[var(--zui-copy-button-default-shadow-dark,0_1px_2px_#0f172a1f)] hover:bg-[var(--zui-copy-button-default-bg-hover,#000000)] dark:hover:bg-[var(--zui-copy-button-default-bg-hover-dark,#ffffff)]",
  secondary:
    "bg-[var(--zui-copy-button-secondary-bg,#e2e8f0)] dark:bg-[var(--zui-copy-button-secondary-bg-dark,#1e293b)] text-[color:var(--zui-copy-button-secondary-fg,#0f172a)] dark:text-[color:var(--zui-copy-button-secondary-fg-dark,#f8fafc)] hover:bg-[var(--zui-copy-button-secondary-bg-hover,#cbd5e1)] dark:hover:bg-[var(--zui-copy-button-secondary-bg-hover-dark,#334155)]",
  destructive:
    "bg-[var(--zui-copy-button-destructive-bg,#f43f5e)] dark:bg-[var(--zui-copy-button-destructive-bg-dark,#be123c)] text-[color:var(--zui-copy-button-destructive-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-destructive-fg-dark,#ffffff)] hover:bg-[var(--zui-copy-button-destructive-bg-hover,#f43f5e)] dark:hover:bg-[var(--zui-copy-button-destructive-bg-hover-dark,#9f1239)]",
  outline:
    "border border-[color:var(--zui-copy-button-outline-border,#0000001a)] dark:border-[color:var(--zui-copy-button-outline-border-dark,#ffffff1a)] bg-[var(--zui-copy-button-outline-bg,#0000000d)] dark:bg-[var(--zui-copy-button-outline-bg-dark,#ffffff0d)] text-[color:var(--zui-copy-button-outline-fg,#0f172a)] dark:text-[color:var(--zui-copy-button-outline-fg-dark,#f8fafc)] hover:bg-[var(--zui-copy-button-outline-bg-hover,#0000001a)] dark:hover:bg-[var(--zui-copy-button-outline-bg-hover-dark,#ffffff1a)]",
  ghost:
    "bg-transparent text-[color:var(--zui-copy-button-ghost-fg,#334155)] dark:text-[color:var(--zui-copy-button-ghost-fg-dark,#e2e8f0)] hover:bg-[var(--zui-copy-button-ghost-bg-hover,#0000000d)] dark:hover:bg-[var(--zui-copy-button-ghost-bg-hover-dark,#ffffff0d)]",
  glass:
    "border border-[color:var(--zui-copy-button-glass-border,#00000026)] dark:border-[color:var(--zui-copy-button-glass-border-dark,#ffffff26)] bg-[var(--zui-copy-button-glass-bg,#0000001a)] dark:bg-[var(--zui-copy-button-glass-bg-dark,#ffffff1a)] text-[color:var(--zui-copy-button-glass-fg,#0f172a)] dark:text-[color:var(--zui-copy-button-glass-fg-dark,#ffffff)] backdrop-blur-md hover:bg-[var(--zui-copy-button-glass-bg-hover,#00000026)] dark:hover:bg-[var(--zui-copy-button-glass-bg-hover-dark,#ffffff26)]",
  emerald:
    "bg-[var(--zui-copy-button-emerald-bg,#10b981)] dark:bg-[var(--zui-copy-button-emerald-bg-dark,#065f46)] text-[color:var(--zui-copy-button-emerald-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-emerald-fg-dark,#ffffff)] hover:bg-[var(--zui-copy-button-emerald-bg-hover,#10b981)] dark:hover:bg-[var(--zui-copy-button-emerald-bg-hover-dark,#064e3b)]",
  indigo:
    "bg-[var(--zui-copy-button-indigo-bg,#3730a3)] dark:bg-[var(--zui-copy-button-indigo-bg-dark,#4f46e5)] text-[color:var(--zui-copy-button-indigo-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-indigo-fg-dark,#ffffff)] hover:bg-[var(--zui-copy-button-indigo-bg-hover,#3730a3)] dark:hover:bg-[var(--zui-copy-button-indigo-bg-hover-dark,#4f46e5)]",
  purple:
    "bg-[var(--zui-copy-button-purple-bg,#6b21a8)] dark:bg-[var(--zui-copy-button-purple-bg-dark,#9333ea)] text-[color:var(--zui-copy-button-purple-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-purple-fg-dark,#ffffff)] hover:bg-[var(--zui-copy-button-purple-bg-hover,#6b21a8)] dark:hover:bg-[var(--zui-copy-button-purple-bg-hover-dark,#9333ea)]",
  pink:
    "bg-[var(--zui-copy-button-pink-bg,#9d174d)] dark:bg-[var(--zui-copy-button-pink-bg-dark,#db2777)] text-[color:var(--zui-copy-button-pink-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-pink-fg-dark,#ffffff)] hover:bg-[var(--zui-copy-button-pink-bg-hover,#9d174d)] dark:hover:bg-[var(--zui-copy-button-pink-bg-hover-dark,#db2777)]",
  rose:
    "bg-[var(--zui-copy-button-rose-bg,#9f1239)] dark:bg-[var(--zui-copy-button-rose-bg-dark,#e11d48)] text-[color:var(--zui-copy-button-rose-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-rose-fg-dark,#ffffff)] hover:bg-[var(--zui-copy-button-rose-bg-hover,#9f1239)] dark:hover:bg-[var(--zui-copy-button-rose-bg-hover-dark,#e11d48)]",
  sky:
    "bg-[var(--zui-copy-button-sky-bg,#0ea5e9)] dark:bg-[var(--zui-copy-button-sky-bg-dark,#0369a1)] text-[color:var(--zui-copy-button-sky-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-sky-fg-dark,#ffffff)] hover:bg-[var(--zui-copy-button-sky-bg-hover,#0ea5e9)] dark:hover:bg-[var(--zui-copy-button-sky-bg-hover-dark,#075985)]",
  teal:
    "bg-[var(--zui-copy-button-teal-bg,#14b8a6)] dark:bg-[var(--zui-copy-button-teal-bg-dark,#0f766e)] text-[color:var(--zui-copy-button-teal-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-teal-fg-dark,#ffffff)] hover:bg-[var(--zui-copy-button-teal-bg-hover,#14b8a6)] dark:hover:bg-[var(--zui-copy-button-teal-bg-hover-dark,#115e59)]",
  yellow:
    "bg-[var(--zui-copy-button-yellow-bg,#eab308)] dark:bg-[var(--zui-copy-button-yellow-bg-dark,#854d0e)] text-[color:var(--zui-copy-button-yellow-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-yellow-fg-dark,#ffffff)] hover:bg-[var(--zui-copy-button-yellow-bg-hover,#eab308)] dark:hover:bg-[var(--zui-copy-button-yellow-bg-hover-dark,#713f12)]",
  orange:
    "bg-[var(--zui-copy-button-orange-bg,#f97316)] dark:bg-[var(--zui-copy-button-orange-bg-dark,#9a3412)] text-[color:var(--zui-copy-button-orange-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-orange-fg-dark,#ffffff)] hover:bg-[var(--zui-copy-button-orange-bg-hover,#f97316)] dark:hover:bg-[var(--zui-copy-button-orange-bg-hover-dark,#7c2d12)]",
  gray:
    "bg-[var(--zui-copy-button-gray-bg,#6b7280)] dark:bg-[var(--zui-copy-button-gray-bg-dark,#374151)] text-[color:var(--zui-copy-button-gray-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-gray-fg-dark,#ffffff)] hover:bg-[var(--zui-copy-button-gray-bg-hover,#6b7280)] dark:hover:bg-[var(--zui-copy-button-gray-bg-hover-dark,#1f2937)]",
  amber:
    "bg-[var(--zui-copy-button-amber-bg,#f59e0b)] dark:bg-[var(--zui-copy-button-amber-bg-dark,#92400e)] text-[color:var(--zui-copy-button-amber-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-amber-fg-dark,#ffffff)] hover:bg-[var(--zui-copy-button-amber-bg-hover,#f59e0b)] dark:hover:bg-[var(--zui-copy-button-amber-bg-hover-dark,#78350f)]",
  violet:
    "bg-[var(--zui-copy-button-violet-bg,#5b21b6)] dark:bg-[var(--zui-copy-button-violet-bg-dark,#7c3aed)] text-[color:var(--zui-copy-button-violet-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-violet-fg-dark,#ffffff)] hover:bg-[var(--zui-copy-button-violet-bg-hover,#5b21b6)] dark:hover:bg-[var(--zui-copy-button-violet-bg-hover-dark,#7c3aed)]",
  "gradient-blue":
    "bg-linear-to-r from-[var(--zui-copy-button-gradient-blue-from,#1e40af)] dark:from-[var(--zui-copy-button-gradient-blue-from-dark,#2563eb)] to-[var(--zui-copy-button-gradient-blue-to,#6b21a8)] dark:to-[var(--zui-copy-button-gradient-blue-to-dark,#9333ea)] text-[color:var(--zui-copy-button-gradient-blue-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-gradient-blue-fg-dark,#ffffff)] hover:from-[var(--zui-copy-button-gradient-blue-from-hover,#1e40af)] dark:hover:from-[var(--zui-copy-button-gradient-blue-from-hover-dark,#2563eb)] hover:to-[var(--zui-copy-button-gradient-blue-to-hover,#6b21a8)] dark:hover:to-[var(--zui-copy-button-gradient-blue-to-hover-dark,#9333ea)]",
  "gradient-green":
    "bg-linear-to-r from-[var(--zui-copy-button-gradient-green-from,#166534)] dark:from-[var(--zui-copy-button-gradient-green-from-dark,#16a34a)] to-[var(--zui-copy-button-gradient-green-to,#3f6212)] dark:to-[var(--zui-copy-button-gradient-green-to-dark,#65a30d)] text-[color:var(--zui-copy-button-gradient-green-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-gradient-green-fg-dark,#ffffff)] hover:from-[var(--zui-copy-button-gradient-green-from-hover,#166534)] dark:hover:from-[var(--zui-copy-button-gradient-green-from-hover-dark,#16a34a)] hover:to-[var(--zui-copy-button-gradient-green-to-hover,#3f6212)] dark:hover:to-[var(--zui-copy-button-gradient-green-to-hover-dark,#65a30d)]",
  "gradient-red":
    "bg-linear-to-r from-[var(--zui-copy-button-gradient-red-from,#991b1b)] dark:from-[var(--zui-copy-button-gradient-red-from-dark,#dc2626)] to-[var(--zui-copy-button-gradient-red-to,#9d174d)] dark:to-[var(--zui-copy-button-gradient-red-to-dark,#db2777)] text-[color:var(--zui-copy-button-gradient-red-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-gradient-red-fg-dark,#ffffff)] hover:from-[var(--zui-copy-button-gradient-red-from-hover,#991b1b)] dark:hover:from-[var(--zui-copy-button-gradient-red-from-hover-dark,#dc2626)] hover:to-[var(--zui-copy-button-gradient-red-to-hover,#9d174d)] dark:hover:to-[var(--zui-copy-button-gradient-red-to-hover-dark,#db2777)]",
  "gradient-yellow":
    "bg-linear-to-r from-[var(--zui-copy-button-gradient-yellow-from,#854d0e)] dark:from-[var(--zui-copy-button-gradient-yellow-from-dark,#ca8a04)] to-[var(--zui-copy-button-gradient-yellow-to,#9a3412)] dark:to-[var(--zui-copy-button-gradient-yellow-to-dark,#ea580c)] text-[color:var(--zui-copy-button-gradient-yellow-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-gradient-yellow-fg-dark,#ffffff)] hover:from-[var(--zui-copy-button-gradient-yellow-from-hover,#854d0e)] dark:hover:from-[var(--zui-copy-button-gradient-yellow-from-hover-dark,#ca8a04)] hover:to-[var(--zui-copy-button-gradient-yellow-to-hover,#9a3412)] dark:hover:to-[var(--zui-copy-button-gradient-yellow-to-hover-dark,#ea580c)]",
  "gradient-purple":
    "bg-linear-to-r from-[var(--zui-copy-button-gradient-purple-from,#6b21a8)] dark:from-[var(--zui-copy-button-gradient-purple-from-dark,#9333ea)] to-[var(--zui-copy-button-gradient-purple-to,#9d174d)] dark:to-[var(--zui-copy-button-gradient-purple-to-dark,#db2777)] text-[color:var(--zui-copy-button-gradient-purple-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-gradient-purple-fg-dark,#ffffff)] hover:from-[var(--zui-copy-button-gradient-purple-from-hover,#6b21a8)] dark:hover:from-[var(--zui-copy-button-gradient-purple-from-hover-dark,#9333ea)] hover:to-[var(--zui-copy-button-gradient-purple-to-hover,#9d174d)] dark:hover:to-[var(--zui-copy-button-gradient-purple-to-hover-dark,#db2777)]",
  "gradient-teal":
    "bg-linear-to-r from-[var(--zui-copy-button-gradient-teal-from,#115e59)] dark:from-[var(--zui-copy-button-gradient-teal-from-dark,#0d9488)] to-[var(--zui-copy-button-gradient-teal-to,#155e75)] dark:to-[var(--zui-copy-button-gradient-teal-to-dark,#0891b2)] text-[color:var(--zui-copy-button-gradient-teal-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-gradient-teal-fg-dark,#ffffff)] hover:from-[var(--zui-copy-button-gradient-teal-from-hover,#115e59)] dark:hover:from-[var(--zui-copy-button-gradient-teal-from-hover-dark,#0d9488)] hover:to-[var(--zui-copy-button-gradient-teal-to-hover,#155e75)] dark:hover:to-[var(--zui-copy-button-gradient-teal-to-hover-dark,#0891b2)]",
  "gradient-indigo":
    "bg-linear-to-r from-[var(--zui-copy-button-gradient-indigo-from,#3730a3)] dark:from-[var(--zui-copy-button-gradient-indigo-from-dark,#4f46e5)] to-[var(--zui-copy-button-gradient-indigo-to,#6b21a8)] dark:to-[var(--zui-copy-button-gradient-indigo-to-dark,#9333ea)] text-[color:var(--zui-copy-button-gradient-indigo-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-gradient-indigo-fg-dark,#ffffff)] hover:from-[var(--zui-copy-button-gradient-indigo-from-hover,#3730a3)] dark:hover:from-[var(--zui-copy-button-gradient-indigo-from-hover-dark,#4f46e5)] hover:to-[var(--zui-copy-button-gradient-indigo-to-hover,#6b21a8)] dark:hover:to-[var(--zui-copy-button-gradient-indigo-to-hover-dark,#9333ea)]",
  "gradient-pink":
    "bg-linear-to-r from-[var(--zui-copy-button-gradient-pink-from,#9d174d)] dark:from-[var(--zui-copy-button-gradient-pink-from-dark,#db2777)] to-[var(--zui-copy-button-gradient-pink-to,#9f1239)] dark:to-[var(--zui-copy-button-gradient-pink-to-dark,#e11d48)] text-[color:var(--zui-copy-button-gradient-pink-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-gradient-pink-fg-dark,#ffffff)] hover:from-[var(--zui-copy-button-gradient-pink-from-hover,#9d174d)] dark:hover:from-[var(--zui-copy-button-gradient-pink-from-hover-dark,#db2777)] hover:to-[var(--zui-copy-button-gradient-pink-to-hover,#9f1239)] dark:hover:to-[var(--zui-copy-button-gradient-pink-to-hover-dark,#e11d48)]",
  "gradient-orange":
    "bg-linear-to-r from-[var(--zui-copy-button-gradient-orange-from,#9a3412)] dark:from-[var(--zui-copy-button-gradient-orange-from-dark,#ea580c)] to-[var(--zui-copy-button-gradient-orange-to,#991b1b)] dark:to-[var(--zui-copy-button-gradient-orange-to-dark,#dc2626)] text-[color:var(--zui-copy-button-gradient-orange-fg,#ffffff)] dark:text-[color:var(--zui-copy-button-gradient-orange-fg-dark,#ffffff)] hover:from-[var(--zui-copy-button-gradient-orange-from-hover,#9a3412)] dark:hover:from-[var(--zui-copy-button-gradient-orange-from-hover-dark,#ea580c)] hover:to-[var(--zui-copy-button-gradient-orange-to-hover,#991b1b)] dark:hover:to-[var(--zui-copy-button-gradient-orange-to-hover-dark,#dc2626)]",
} as const;

export type ZuiCopyButtonAppearance = keyof typeof zuiCopyButtonAppearances;

export const zuiCopyButtonSizes = {
  sm: "h-8 px-2.5 text-xs [&_svg]:size-3.5",
  md: "h-9 px-3 text-sm [&_svg]:size-4",
  lg: "h-11 px-4 text-base [&_svg]:size-5",
} as const;

export type ZuiCopyButtonSize = keyof typeof zuiCopyButtonSizes;

export const zuiCopyButtonIconOnlySizes = {
  sm: "w-8 px-0",
  md: "w-9 px-0",
  lg: "w-11 px-0",
} as const;
