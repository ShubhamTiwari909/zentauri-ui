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
