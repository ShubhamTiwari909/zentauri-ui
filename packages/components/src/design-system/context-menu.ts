import {
  zuiDropdownItemBase,
  zuiDropdownItemVariants,
  zuiDropdownSpacing,
} from "./dropdown";

export const zuiContextMenuContentBase =
  "min-w-[220px] rounded-lg border border-[color:var(--zui-dropdown-content-border,var(--zui-border,oklch(20.8%_0.042_265.755_/_0.1)))] bg-[var(--zui-dropdown-content-bg,var(--zui-surface-muted,oklch(96.8%_0.007_247.896)))] p-2 text-[color:var(--zui-dropdown-content-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] shadow-[var(--zui-dropdown-content-shadow,var(--zui-shadow,0_10px_24px_rgba(15,23,42,0.16)))] outline-none dark:border-[color:var(--zui-dropdown-content-border-dark,var(--zui-border-dark,#ffffff1a))] dark:bg-[var(--zui-dropdown-content-bg-dark,var(--zui-surface-muted-dark,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-dropdown-content-fg-dark,var(--zui-fg-dark,oklch(96.8%_0.007_247.896)))] dark:shadow-[var(--zui-dropdown-content-shadow-dark,var(--zui-shadow-dark,0_20px_48px_rgba(15,23,42,0.5)))]";

export const zuiContextMenuItemBase = zuiDropdownItemBase;

export const zuiContextMenuItemVariants = {
  ...zuiDropdownItemVariants,
  ghost: `${zuiDropdownItemVariants.ghost} dark:bg-[var(--zui-dropdown-item-ghost-bg-dark,transparent)]`,
  sky: `${zuiDropdownItemVariants.sky} dark:bg-[var(--zui-dropdown-item-sky-bg-dark,color-mix(in oklch, var(--zui-color-sky-dark,oklch(29.3%_0.066_243.157)) 18%, transparent))] dark:text-[color:var(--zui-dropdown-item-sky-fg-dark,var(--zui-color-sky-dark,oklch(90.1%_0.058_230.902)))] dark:hover:text-[color:var(--zui-dropdown-item-sky-fg-hover-dark,var(--zui-color-sky-dark,oklch(90.1%_0.058_230.902)))]`,
  rose: `${zuiDropdownItemVariants.rose} dark:bg-[var(--zui-dropdown-item-rose-bg-dark,color-mix(in oklch, var(--zui-color-rose-dark,oklch(27.1%_0.105_12.094)) 18%, transparent))] dark:text-[color:var(--zui-dropdown-item-rose-fg-dark,var(--zui-color-rose-dark,oklch(89.2%_0.058_10.001)))] dark:hover:text-[color:var(--zui-dropdown-item-rose-fg-hover-dark,var(--zui-color-rose-dark,oklch(89.2%_0.058_10.001)))]`,
  purple: `${zuiDropdownItemVariants.purple} dark:bg-[var(--zui-dropdown-item-purple-bg-dark,color-mix(in oklch, var(--zui-color-purple-dark,oklch(29.1%_0.149_302.717)) 18%, transparent))] dark:text-[color:var(--zui-dropdown-item-purple-fg-dark,var(--zui-color-purple-dark,oklch(90.2%_0.063_306.703)))] dark:hover:text-[color:var(--zui-dropdown-item-purple-fg-hover-dark,var(--zui-color-purple-dark,oklch(90.2%_0.063_306.703)))]`,
  pink: `${zuiDropdownItemVariants.pink} dark:bg-[var(--zui-dropdown-item-pink-bg-dark,color-mix(in oklch, var(--zui-color-pink-dark,oklch(28.4%_0.109_3.907)) 18%, transparent))] dark:text-[color:var(--zui-dropdown-item-pink-fg-dark,var(--zui-color-pink-dark,oklch(89.9%_0.061_343.231)))] dark:hover:text-[color:var(--zui-dropdown-item-pink-fg-hover-dark,var(--zui-color-pink-dark,oklch(89.9%_0.061_343.231)))]`,
  orange: `${zuiDropdownItemVariants.orange} dark:bg-[var(--zui-dropdown-item-orange-bg-dark,color-mix(in oklch, var(--zui-color-orange-dark,oklch(26.6%_0.079_36.259)) 18%, transparent))] dark:text-[color:var(--zui-dropdown-item-orange-fg-dark,var(--zui-color-orange-dark,oklch(90.1%_0.076_70.697)))] dark:hover:text-[color:var(--zui-dropdown-item-orange-fg-hover-dark,var(--zui-color-orange-dark,oklch(90.1%_0.076_70.697)))]`,
  yellow: `${zuiDropdownItemVariants.yellow} dark:bg-[var(--zui-dropdown-item-yellow-bg-dark,color-mix(in oklch, var(--zui-color-yellow-dark,oklch(28.6%_0.066_53.813)) 18%, transparent))] dark:text-[color:var(--zui-dropdown-item-yellow-fg-dark,var(--zui-color-yellow-dark,oklch(94.5%_0.129_101.54)))] dark:hover:text-[color:var(--zui-dropdown-item-yellow-fg-hover-dark,var(--zui-color-yellow-dark,oklch(94.5%_0.129_101.54)))]`,
  teal: `${zuiDropdownItemVariants.teal} dark:bg-[var(--zui-dropdown-item-teal-bg-dark,color-mix(in oklch, var(--zui-color-teal-dark,oklch(27.7%_0.046_192.524)) 18%, transparent))] dark:text-[color:var(--zui-dropdown-item-teal-fg-dark,var(--zui-color-teal-dark,oklch(91%_0.096_180.426)))] dark:hover:text-[color:var(--zui-dropdown-item-teal-fg-hover-dark,var(--zui-color-teal-dark,oklch(91%_0.096_180.426)))]`,
  indigo: `${zuiDropdownItemVariants.indigo} dark:bg-[var(--zui-dropdown-item-indigo-bg-dark,color-mix(in oklch, var(--zui-color-indigo-dark,oklch(25.7%_0.09_281.288)) 18%, transparent))] dark:text-[color:var(--zui-dropdown-item-indigo-fg-dark,var(--zui-color-indigo-dark,oklch(87%_0.065_274.039)))] dark:hover:text-[color:var(--zui-dropdown-item-indigo-fg-hover-dark,var(--zui-color-indigo-dark,oklch(87%_0.065_274.039)))]`,
  emerald: `${zuiDropdownItemVariants.emerald} dark:bg-[var(--zui-dropdown-item-emerald-bg-dark,color-mix(in oklch, var(--zui-color-emerald-dark,oklch(26.2%_0.051_172.552)) 18%, transparent))] dark:text-[color:var(--zui-dropdown-item-emerald-fg-dark,var(--zui-color-emerald-dark,oklch(90.5%_0.093_164.15)))] dark:hover:text-[color:var(--zui-dropdown-item-emerald-fg-hover-dark,var(--zui-color-emerald-dark,oklch(90.5%_0.093_164.15)))]`,
  gray: `${zuiDropdownItemVariants.gray} dark:bg-[var(--zui-dropdown-item-gray-bg-dark,color-mix(in oklch, var(--zui-color-gray-dark,oklch(13%_0.028_261.692)) 18%, transparent))] dark:text-[color:var(--zui-dropdown-item-gray-fg-dark,var(--zui-color-gray-dark,oklch(92.8%_0.006_264.531)))] dark:hover:text-[color:var(--zui-dropdown-item-gray-fg-hover-dark,var(--zui-color-gray-dark,oklch(92.8%_0.006_264.531)))]`,
  amber: `${zuiDropdownItemVariants.amber} dark:bg-[var(--zui-dropdown-item-amber-bg-dark,color-mix(in oklch, var(--zui-color-amber-dark,oklch(27.9%_0.077_45.635)) 18%, transparent))] dark:text-[color:var(--zui-dropdown-item-amber-fg-dark,var(--zui-color-amber-dark,oklch(92.4%_0.12_95.746)))] dark:hover:text-[color:var(--zui-dropdown-item-amber-fg-hover-dark,var(--zui-color-amber-dark,oklch(92.4%_0.12_95.746)))]`,
  violet: `${zuiDropdownItemVariants.violet} dark:bg-[var(--zui-dropdown-item-violet-bg-dark,color-mix(in oklch, var(--zui-color-violet-dark,oklch(28.3%_0.141_291.089)) 18%, transparent))] dark:text-[color:var(--zui-dropdown-item-violet-fg-dark,var(--zui-color-violet-dark,oklch(89.4%_0.057_293.283)))] dark:hover:text-[color:var(--zui-dropdown-item-violet-fg-hover-dark,var(--zui-color-violet-dark,oklch(89.4%_0.057_293.283)))]`,
  "gradient-blue": `${zuiDropdownItemVariants["gradient-blue"]} dark:from-[var(--zui-dropdown-item-gradient-blue-from-dark,var(--zui-color-blue-dark,oklch(28.2%_0.091_267.935)))] dark:to-[var(--zui-dropdown-item-gradient-blue-to-dark,var(--zui-color-purple-dark,oklch(29.1%_0.149_302.717)))]`,
  "gradient-green": `${zuiDropdownItemVariants["gradient-green"]} dark:from-[var(--zui-dropdown-item-gradient-green-from-dark,var(--zui-color-green-dark,oklch(26.6%_0.065_152.934)))] dark:to-[var(--zui-dropdown-item-gradient-green-to-dark,var(--zui-color-lime-dark,oklch(27.4%_0.072_132.109)))]`,
  "gradient-red": `${zuiDropdownItemVariants["gradient-red"]} dark:from-[var(--zui-dropdown-item-gradient-red-from-dark,var(--zui-color-red-dark,oklch(25.8%_0.092_26.042)))] dark:to-[var(--zui-dropdown-item-gradient-red-to-dark,var(--zui-color-pink-dark,oklch(28.4%_0.109_3.907)))]`,
  "gradient-yellow": `${zuiDropdownItemVariants["gradient-yellow"]} dark:from-[var(--zui-dropdown-item-gradient-yellow-from-dark,var(--zui-color-yellow-dark,oklch(28.6%_0.066_53.813)))] dark:to-[var(--zui-dropdown-item-gradient-yellow-to-dark,var(--zui-color-orange-dark,oklch(26.6%_0.079_36.259)))]`,
  "gradient-purple": `${zuiDropdownItemVariants["gradient-purple"]} dark:from-[var(--zui-dropdown-item-gradient-purple-from-dark,var(--zui-color-purple-dark,oklch(29.1%_0.149_302.717)))] dark:to-[var(--zui-dropdown-item-gradient-purple-to-dark,var(--zui-color-pink-dark,oklch(28.4%_0.109_3.907)))]`,
  "gradient-teal": `${zuiDropdownItemVariants["gradient-teal"]} dark:from-[var(--zui-dropdown-item-gradient-teal-from-dark,var(--zui-color-teal-dark,oklch(27.7%_0.046_192.524)))] dark:to-[var(--zui-dropdown-item-gradient-teal-to-dark,var(--zui-color-cyan-dark,oklch(30.2%_0.056_229.695)))]`,
  "gradient-indigo": `${zuiDropdownItemVariants["gradient-indigo"]} dark:from-[var(--zui-dropdown-item-gradient-indigo-from-dark,var(--zui-color-indigo-dark,oklch(25.7%_0.09_281.288)))] dark:to-[var(--zui-dropdown-item-gradient-indigo-to-dark,var(--zui-color-purple-dark,oklch(29.1%_0.149_302.717)))]`,
  "gradient-pink": `${zuiDropdownItemVariants["gradient-pink"]} dark:from-[var(--zui-dropdown-item-gradient-pink-from-dark,var(--zui-color-pink-dark,oklch(28.4%_0.109_3.907)))] dark:to-[var(--zui-dropdown-item-gradient-pink-to-dark,var(--zui-color-rose-dark,oklch(27.1%_0.105_12.094)))]`,
  "gradient-orange": `${zuiDropdownItemVariants["gradient-orange"]} dark:from-[var(--zui-dropdown-item-gradient-orange-from-dark,var(--zui-color-orange-dark,oklch(26.6%_0.079_36.259)))] dark:to-[var(--zui-dropdown-item-gradient-orange-to-dark,var(--zui-color-red-dark,oklch(25.8%_0.092_26.042)))]`,
  blue: zuiDropdownItemVariants.blue,
  cyan: zuiDropdownItemVariants.cyan,
  green: zuiDropdownItemVariants.green,
  lime: zuiDropdownItemVariants.lime,
  mint: zuiDropdownItemVariants.mint,
  ocean: zuiDropdownItemVariants.ocean,
  sapphire: zuiDropdownItemVariants.sapphire,
  lavender: zuiDropdownItemVariants.lavender,
  ruby: zuiDropdownItemVariants.ruby,
  red: zuiDropdownItemVariants.red,
  slate: zuiDropdownItemVariants.slate,
  zinc: zuiDropdownItemVariants.zinc,
  stone: zuiDropdownItemVariants.stone,
  royal: zuiDropdownItemVariants.royal,
  electric: zuiDropdownItemVariants.electric,
  forest: zuiDropdownItemVariants.forest,
  sunset: zuiDropdownItemVariants.sunset,
  magenta: zuiDropdownItemVariants.magenta,
  crimson: zuiDropdownItemVariants.crimson,
  aqua: zuiDropdownItemVariants.aqua,
  plum: zuiDropdownItemVariants.plum,
} as const;

export const zuiContextMenuSpacing = zuiDropdownSpacing;

export const zuiContextMenuLabelBase =
  "px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--zui-dropdown-label-fg,var(--zui-fg-muted,oklch(55.1%_0.027_264.364)))] dark:text-[color:var(--zui-dropdown-label-fg-dark,var(--zui-fg-muted-dark,oklch(70.7%_0.022_261.325)))]";

export const zuiContextMenuSeparatorBase =
  "my-1 h-px bg-[var(--zui-dropdown-separator-bg,var(--zui-border,oklch(20.8%_0.042_265.755_/_0.12)))] dark:bg-[var(--zui-dropdown-separator-bg-dark,var(--zui-border-dark,#ffffff1a))]";
