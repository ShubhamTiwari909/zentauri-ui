export const zuiSecretRevealContainerBase =
  "inline-flex items-center gap-2 rounded-xl border px-3 py-2 max-w-full min-w-0";

export const zuiSecretRevealLabelBase = "font-medium";

export const zuiSecretRevealValueBase = "font-mono tracking-wider select-all";

export const zuiSecretRevealToggleBase =
  "inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500";

const zuiSecretRevealFg =
  "text-[color:var(--zui-secret-reveal-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-secret-reveal-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]";

const zuiSecretRevealInvertedFg =
  "text-[color:var(--zui-secret-reveal-fg,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))] dark:text-[color:var(--zui-secret-reveal-fg-dark,var(--zui-fg,oklch(20.8%_0.042_265.755)))]";

const zuiSecretRevealGradientFg =
  "text-[color:var(--zui-secret-reveal-fg,var(--zui-brand-fg,oklch(96.8%_0.007_247.896)))] dark:text-[color:var(--zui-secret-reveal-fg-dark,var(--zui-brand-fg-dark,oklch(98.4%_0.003_247.858)))]";

export const zuiSecretRevealAppearances = {
  default: `border-[var(--zui-secret-reveal-default-border,var(--zui-border,oklch(87.5%_0.01_258.338)))] dark:border-[var(--zui-secret-reveal-default-border-dark,var(--zui-border-dark,oklch(27.9%_0.041_260.031)))] bg-[var(--zui-secret-reveal-default-bg,var(--zui-surface,oklch(96.8%_0.003_264.542)))] dark:bg-[var(--zui-secret-reveal-default-bg-dark,var(--zui-surface-dark,oklch(21.6%_0.036_260.031)))] ${zuiSecretRevealFg}`,
  subtle: `border-transparent bg-[var(--zui-secret-reveal-subtle-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-secret-reveal-subtle-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] ${zuiSecretRevealFg}`,
  muted: `border-transparent bg-[var(--zui-secret-reveal-muted-bg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:bg-[var(--zui-secret-reveal-muted-bg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))] ${zuiSecretRevealInvertedFg}`,
  primary: `border-[var(--zui-secret-reveal-primary-border,var(--zui-brand,oklch(20.8%_0.042_265.755)))] dark:border-[var(--zui-secret-reveal-primary-border-dark,var(--zui-brand-dark,oklch(98.4%_0.003_247.858)))] bg-[var(--zui-secret-reveal-primary-bg,var(--zui-brand,oklch(20.8%_0.042_265.755)))] dark:bg-[var(--zui-secret-reveal-primary-bg-dark,var(--zui-brand-dark,oklch(98.4%_0.003_247.858)))] ${zuiSecretRevealInvertedFg}`,
  blue: `border-[var(--zui-secret-reveal-blue-border,var(--zui-color-blue,#2563eb))] dark:border-[var(--zui-secret-reveal-blue-border-dark,var(--zui-color-blue-dark,#3b82f6))] bg-[var(--zui-secret-reveal-blue-bg,oklch(93.5%_0.055_262.881))] dark:bg-[var(--zui-secret-reveal-blue-bg-dark,oklch(30.6%_0.126_262.881))] ${zuiSecretRevealFg}`,
  cyan: `border-[var(--zui-secret-reveal-cyan-border,var(--zui-color-cyan,#0891b2))] dark:border-[var(--zui-secret-reveal-cyan-border-dark,var(--zui-color-cyan-dark,#22d3ee))] bg-[var(--zui-secret-reveal-cyan-bg,oklch(95%_0.025_236.42))] dark:bg-[var(--zui-secret-reveal-cyan-bg-dark,oklch(31.1%_0.085_231.74))] ${zuiSecretRevealFg}`,
  green: `border-[var(--zui-secret-reveal-green-border,var(--zui-color-green,#16a34a))] dark:border-[var(--zui-secret-reveal-green-border-dark,var(--zui-color-green-dark,#22c55e))] bg-[var(--zui-secret-reveal-green-bg,oklch(94.2%_0.053_146.17))] dark:bg-[var(--zui-secret-reveal-green-bg-dark,oklch(30.8%_0.085_149.21))] ${zuiSecretRevealFg}`,
  lime: `border-[var(--zui-secret-reveal-lime-border,var(--zui-color-lime,#65a30d))] dark:border-[var(--zui-secret-reveal-lime-border-dark,var(--zui-color-lime-dark,#a3e635))] bg-[var(--zui-secret-reveal-lime-bg,oklch(93.9%_0.077_125.02))] dark:bg-[var(--zui-secret-reveal-lime-bg-dark,oklch(33.1%_0.098_131.68))] ${zuiSecretRevealFg}`,
  emerald: `border-[var(--zui-secret-reveal-emerald-border,var(--zui-color-emerald,oklch(69.6%_0.17_162.48)))] dark:border-[var(--zui-secret-reveal-emerald-border-dark,var(--zui-color-emerald-dark,oklch(43.2%_0.095_166.913)))] bg-[var(--zui-secret-reveal-emerald-bg,oklch(93.5%_0.062_163.17))] dark:bg-[var(--zui-secret-reveal-emerald-bg-dark,oklch(25.4%_0.065_166.91))] ${zuiSecretRevealFg}`,
  indigo: `border-[var(--zui-secret-reveal-indigo-border,var(--zui-color-indigo,oklch(39.8%_0.195_277.366)))] dark:border-[var(--zui-secret-reveal-indigo-border-dark,var(--zui-color-indigo-dark,oklch(51.1%_0.262_276.966)))] bg-[var(--zui-secret-reveal-indigo-bg,oklch(92.8%_0.067_276.37))] dark:bg-[var(--zui-secret-reveal-indigo-bg-dark,oklch(27.5%_0.153_276.97))] ${zuiSecretRevealFg}`,
  purple: `border-[var(--zui-secret-reveal-purple-border,var(--zui-color-purple,oklch(43.8%_0.218_303.724)))] dark:border-[var(--zui-secret-reveal-purple-border-dark,var(--zui-color-purple-dark,oklch(55.8%_0.288_302.321)))] bg-[var(--zui-secret-reveal-purple-bg,oklch(92.4%_0.075_302.32))] dark:bg-[var(--zui-secret-reveal-purple-bg-dark,oklch(27.8%_0.171_302.32))] ${zuiSecretRevealFg}`,
  pink: `border-[var(--zui-secret-reveal-pink-border,var(--zui-color-pink,oklch(45.9%_0.187_3.815)))] dark:border-[var(--zui-secret-reveal-pink-border-dark,var(--zui-color-pink-dark,oklch(59.2%_0.249_0.584)))] bg-[var(--zui-secret-reveal-pink-bg,oklch(93.5%_0.048_3.82))] dark:bg-[var(--zui-secret-reveal-pink-bg-dark,oklch(29.1%_0.134_0.58))] ${zuiSecretRevealFg}`,
  rose: `border-[var(--zui-secret-reveal-rose-border,var(--zui-color-rose,oklch(64.5%_0.246_16.439)))] dark:border-[var(--zui-secret-reveal-rose-border-dark,var(--zui-color-rose-dark,oklch(51.4%_0.222_16.935)))] bg-[var(--zui-secret-reveal-rose-bg,oklch(93.2%_0.065_16.44))] dark:bg-[var(--zui-secret-reveal-rose-bg-dark,oklch(30.2%_0.157_16.94))] ${zuiSecretRevealFg}`,
  sky: `border-[var(--zui-secret-reveal-sky-border,var(--zui-color-sky,oklch(68.5%_0.169_237.323)))] dark:border-[var(--zui-secret-reveal-sky-border-dark,var(--zui-color-sky-dark,oklch(50%_0.134_242.749)))] bg-[var(--zui-secret-reveal-sky-bg,oklch(94.5%_0.041_237.32))] dark:bg-[var(--zui-secret-reveal-sky-bg-dark,oklch(29.4%_0.108_242.75))] ${zuiSecretRevealFg}`,
  teal: `border-[var(--zui-secret-reveal-teal-border,var(--zui-color-teal,oklch(70.4%_0.14_182.503)))] dark:border-[var(--zui-secret-reveal-teal-border-dark,var(--zui-color-teal-dark,oklch(51.1%_0.096_186.391)))] bg-[var(--zui-secret-reveal-teal-bg,oklch(94.1%_0.046_182.5))] dark:bg-[var(--zui-secret-reveal-teal-bg-dark,oklch(30.2%_0.075_186.4))] ${zuiSecretRevealFg}`,
  yellow: `border-[var(--zui-secret-reveal-yellow-border,var(--zui-color-yellow,oklch(79.5%_0.184_86.047)))] dark:border-[var(--zui-secret-reveal-yellow-border-dark,var(--zui-color-yellow-dark,oklch(47.6%_0.114_61.907)))] bg-[var(--zui-secret-reveal-yellow-bg,oklch(94.1%_0.06_86.05))] dark:bg-[var(--zui-secret-reveal-yellow-bg-dark,oklch(31.5%_0.084_61.91))] ${zuiSecretRevealFg}`,
  orange: `border-[var(--zui-secret-reveal-orange-border,var(--zui-color-orange,oklch(70.5%_0.213_47.604)))] dark:border-[var(--zui-secret-reveal-orange-border-dark,var(--zui-color-orange-dark,oklch(47%_0.157_37.304)))] bg-[var(--zui-secret-reveal-orange-bg,oklch(93.5%_0.076_47.6))] dark:bg-[var(--zui-secret-reveal-orange-bg-dark,oklch(30.1%_0.129_37.3))] ${zuiSecretRevealFg}`,
  red: `border-[var(--zui-secret-reveal-red-border,var(--zui-color-red,#dc2626))] dark:border-[var(--zui-secret-reveal-red-border-dark,var(--zui-color-red-dark,#ef4444))] bg-[var(--zui-secret-reveal-red-bg,oklch(93.9%_0.053_19.85))] dark:bg-[var(--zui-secret-reveal-red-bg-dark,oklch(32.1%_0.111_19.85))] ${zuiSecretRevealFg}`,
  slate: `border-[var(--zui-secret-reveal-slate-border,var(--zui-color-slate,#475569))] dark:border-[var(--zui-secret-reveal-slate-border-dark,var(--zui-color-slate-dark,#64748b))] bg-[var(--zui-secret-reveal-slate-bg,oklch(92.8%_0.011_262.88))] dark:bg-[var(--zui-secret-reveal-slate-bg-dark,oklch(29.6%_0.036_262.88))] ${zuiSecretRevealFg}`,
  gray: `border-[var(--zui-secret-reveal-gray-border,var(--zui-color-gray,oklch(55.1%_0.027_264.364)))] dark:border-[var(--zui-secret-reveal-gray-border-dark,var(--zui-color-gray-dark,oklch(55.1%_0.027_264.364)))] bg-[var(--zui-secret-reveal-gray-bg,oklch(92.8%_0.007_264.36))] dark:bg-[var(--zui-secret-reveal-gray-bg-dark,oklch(29.4%_0.018_264.36))] ${zuiSecretRevealFg}`,
  zinc: `border-[var(--zui-secret-reveal-zinc-border,var(--zui-color-zinc,#52525b))] dark:border-[var(--zui-secret-reveal-zinc-border-dark,var(--zui-color-zinc-dark,#71717a))] bg-[var(--zui-secret-reveal-zinc-bg,oklch(92.9%_0.004_262.88))] dark:bg-[var(--zui-secret-reveal-zinc-bg-dark,oklch(29.4%_0.014_262.88))] ${zuiSecretRevealFg}`,
  "gradient-blue": `border-transparent bg-linear-to-r from-[var(--zui-secret-reveal-gradient-blue-from,var(--zui-color-blue,oklch(42.4%_0.199_265.638)))] dark:from-[var(--zui-secret-reveal-gradient-blue-from-dark,var(--zui-color-blue-dark,oklch(54.6%_0.245_262.881)))] to-[var(--zui-secret-reveal-gradient-blue-to,var(--zui-color-purple,oklch(43.8%_0.218_303.724)))] dark:to-[var(--zui-secret-reveal-gradient-blue-to-dark,var(--zui-color-purple-dark,oklch(55.8%_0.288_302.321)))] ${zuiSecretRevealGradientFg}`,
  "gradient-green": `border-transparent bg-linear-to-r from-[var(--zui-secret-reveal-gradient-green-from,var(--zui-color-green,oklch(44.8%_0.119_151.328)))] dark:from-[var(--zui-secret-reveal-gradient-green-from-dark,var(--zui-color-green-dark,oklch(62.7%_0.194_149.214)))] to-[var(--zui-secret-reveal-gradient-green-to,var(--zui-color-lime,oklch(45.3%_0.124_130.933)))] dark:to-[var(--zui-secret-reveal-gradient-green-to-dark,var(--zui-color-lime-dark,oklch(64.8%_0.2_131.684)))] ${zuiSecretRevealGradientFg}`,
  "gradient-red": `border-transparent bg-linear-to-r from-[var(--zui-secret-reveal-gradient-red-from,var(--zui-color-red,oklch(44.4%_0.177_26.899)))] dark:from-[var(--zui-secret-reveal-gradient-red-from-dark,var(--zui-color-red-dark,oklch(57.7%_0.245_27.325)))] to-[var(--zui-secret-reveal-gradient-red-to,var(--zui-color-pink,oklch(45.9%_0.187_3.815)))] dark:to-[var(--zui-secret-reveal-gradient-red-to-dark,var(--zui-color-pink-dark,oklch(59.2%_0.249_0.584)))] ${zuiSecretRevealGradientFg}`,
  "gradient-yellow": `border-transparent bg-linear-to-r from-[var(--zui-secret-reveal-gradient-yellow-from,var(--zui-color-yellow,oklch(47.6%_0.114_61.907)))] dark:from-[var(--zui-secret-reveal-gradient-yellow-from-dark,var(--zui-color-yellow-dark,oklch(68.1%_0.162_75.834)))] to-[var(--zui-secret-reveal-gradient-yellow-to,var(--zui-color-orange,oklch(47%_0.157_37.304)))] dark:to-[var(--zui-secret-reveal-gradient-yellow-to-dark,var(--zui-color-orange-dark,oklch(64.6%_0.222_41.116)))] ${zuiSecretRevealGradientFg}`,
  "gradient-purple": `border-transparent bg-linear-to-r from-[var(--zui-secret-reveal-gradient-purple-from,var(--zui-color-purple,oklch(43.8%_0.218_303.724)))] dark:from-[var(--zui-secret-reveal-gradient-purple-from-dark,var(--zui-color-purple-dark,oklch(55.8%_0.288_302.321)))] to-[var(--zui-secret-reveal-gradient-purple-to,var(--zui-color-pink,oklch(45.9%_0.187_3.815)))] dark:to-[var(--zui-secret-reveal-gradient-purple-to-dark,var(--zui-color-pink-dark,oklch(59.2%_0.249_0.584)))] ${zuiSecretRevealGradientFg}`,
  "gradient-teal": `border-transparent bg-linear-to-r from-[var(--zui-secret-reveal-gradient-teal-from,var(--zui-color-teal,oklch(43.7%_0.078_188.216)))] dark:from-[var(--zui-secret-reveal-gradient-teal-from-dark,var(--zui-color-teal-dark,oklch(60%_0.118_184.704)))] to-[var(--zui-secret-reveal-gradient-teal-to,var(--zui-color-cyan,oklch(45%_0.085_224.283)))] dark:to-[var(--zui-secret-reveal-gradient-teal-to-dark,var(--zui-color-cyan-dark,oklch(60.9%_0.126_221.723)))] ${zuiSecretRevealGradientFg}`,
  "gradient-indigo": `border-transparent bg-linear-to-r from-[var(--zui-secret-reveal-gradient-indigo-from,var(--zui-color-indigo,oklch(39.8%_0.195_277.366)))] dark:from-[var(--zui-secret-reveal-gradient-indigo-from-dark,var(--zui-color-indigo-dark,oklch(51.1%_0.262_276.966)))] to-[var(--zui-secret-reveal-gradient-indigo-to,var(--zui-color-purple,oklch(43.8%_0.218_303.724)))] dark:to-[var(--zui-secret-reveal-gradient-indigo-to-dark,var(--zui-color-purple-dark,oklch(55.8%_0.288_302.321)))] ${zuiSecretRevealGradientFg}`,
  "gradient-pink": `border-transparent bg-linear-to-r from-[var(--zui-secret-reveal-gradient-pink-from,var(--zui-color-pink,oklch(45.9%_0.187_3.815)))] dark:from-[var(--zui-secret-reveal-gradient-pink-from-dark,var(--zui-color-pink-dark,oklch(59.2%_0.249_0.584)))] to-[var(--zui-secret-reveal-gradient-pink-to,var(--zui-color-rose,oklch(45.5%_0.188_13.697)))] dark:to-[var(--zui-secret-reveal-gradient-pink-to-dark,var(--zui-color-rose-dark,oklch(58.6%_0.253_17.585)))] ${zuiSecretRevealGradientFg}`,
  "gradient-orange": `border-transparent bg-linear-to-r from-[var(--zui-secret-reveal-gradient-orange-from,var(--zui-color-orange,oklch(47%_0.157_37.304)))] dark:from-[var(--zui-secret-reveal-gradient-orange-from-dark,var(--zui-color-orange-dark,oklch(64.6%_0.222_41.116)))] to-[var(--zui-secret-reveal-gradient-orange-to,var(--zui-color-red,oklch(44.4%_0.177_26.899)))] dark:to-[var(--zui-secret-reveal-gradient-orange-to-dark,var(--zui-color-red-dark,oklch(57.7%_0.245_27.325)))] ${zuiSecretRevealGradientFg}`,
} as const;

export const zuiSecretRevealSizes = {
  sm: "gap-1.5 px-2 py-1.5 text-xs",
  md: "gap-2 px-3 py-2 text-sm",
  lg: "gap-2.5 px-4 py-2.5 text-base",
} as const;

export const zuiSecretRevealLabelSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

export const zuiSecretRevealValueSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

export const zuiSecretRevealToggleSizes = {
  sm: "size-6 [&_svg]:size-3.5",
  md: "size-7 [&_svg]:size-4",
  lg: "size-8 [&_svg]:size-5",
} as const;
