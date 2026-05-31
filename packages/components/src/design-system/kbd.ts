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
    "bg-[var(--zui-kbd-emerald-bg,#10b981)] dark:bg-[var(--zui-kbd-emerald-bg-dark,#065f46)] text-[color:var(--zui-kbd-emerald-fg,#ffffff)] dark:text-[color:var(--zui-kbd-emerald-fg-dark,#ffffff)]",
  indigo:
    "bg-[var(--zui-kbd-indigo-bg,#3730a3)] dark:bg-[var(--zui-kbd-indigo-bg-dark,#4f46e5)] text-[color:var(--zui-kbd-indigo-fg,#ffffff)] dark:text-[color:var(--zui-kbd-indigo-fg-dark,#ffffff)]",
  purple:
    "bg-[var(--zui-kbd-purple-bg,#6b21a8)] dark:bg-[var(--zui-kbd-purple-bg-dark,#9333ea)] text-[color:var(--zui-kbd-purple-fg,#ffffff)] dark:text-[color:var(--zui-kbd-purple-fg-dark,#ffffff)]",
  pink:
    "bg-[var(--zui-kbd-pink-bg,#9d174d)] dark:bg-[var(--zui-kbd-pink-bg-dark,#db2777)] text-[color:var(--zui-kbd-pink-fg,#ffffff)] dark:text-[color:var(--zui-kbd-pink-fg-dark,#ffffff)]",
  rose:
    "bg-[var(--zui-kbd-rose-bg,#9f1239)] dark:bg-[var(--zui-kbd-rose-bg-dark,#e11d48)] text-[color:var(--zui-kbd-rose-fg,#ffffff)] dark:text-[color:var(--zui-kbd-rose-fg-dark,#ffffff)]",
  sky:
    "bg-[var(--zui-kbd-sky-bg,#0ea5e9)] dark:bg-[var(--zui-kbd-sky-bg-dark,#0369a1)] text-[color:var(--zui-kbd-sky-fg,#ffffff)] dark:text-[color:var(--zui-kbd-sky-fg-dark,#ffffff)]",
  teal:
    "bg-[var(--zui-kbd-teal-bg,#14b8a6)] dark:bg-[var(--zui-kbd-teal-bg-dark,#0f766e)] text-[color:var(--zui-kbd-teal-fg,#ffffff)] dark:text-[color:var(--zui-kbd-teal-fg-dark,#ffffff)]",
  yellow:
    "bg-[var(--zui-kbd-yellow-bg,#eab308)] dark:bg-[var(--zui-kbd-yellow-bg-dark,#854d0e)] text-[color:var(--zui-kbd-yellow-fg,#ffffff)] dark:text-[color:var(--zui-kbd-yellow-fg-dark,#ffffff)]",
  orange:
    "bg-[var(--zui-kbd-orange-bg,#f97316)] dark:bg-[var(--zui-kbd-orange-bg-dark,#9a3412)] text-[color:var(--zui-kbd-orange-fg,#ffffff)] dark:text-[color:var(--zui-kbd-orange-fg-dark,#ffffff)]",
  gray:
    "bg-[var(--zui-kbd-gray-bg,#6b7280)] dark:bg-[var(--zui-kbd-gray-bg-dark,#374151)] text-[color:var(--zui-kbd-gray-fg,#ffffff)] dark:text-[color:var(--zui-kbd-gray-fg-dark,#ffffff)]",
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

export const zuiKbdSeparatorSizes = {
  sm: "text-[0.7rem]",
  md: "text-xs",
  lg: "text-sm",
} as const;
