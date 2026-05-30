export const zuiToggleTrackBase =
  "relative inline-flex shrink-0 cursor-pointer rounded-full border border-[color:var(--zui-toggle-track-border,#0000001a)] dark:border-[color:var(--zui-toggle-track-border-dark,#ffffff1a)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zui-toggle-track-ring-focus,oklch(44.6%_0.043_257.281))] dark:focus-visible:ring-[var(--zui-toggle-track-ring-focus-dark,oklch(86.9%_0.022_252.894))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--zui-toggle-track-ring-offset-focus,oklch(98.4%_0.003_247.858))] dark:focus-visible:ring-offset-[var(--zui-toggle-track-ring-offset-focus-dark,oklch(12.9%_0.042_264.695))] data-[state=checked]:border-[color:var(--zui-toggle-track-border-checked,oklch(71.5%_0.143_215.221_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-border-checked-dark,oklch(71.5%_0.143_215.221_/_0.4))] disabled:cursor-not-allowed disabled:opacity-50";

export const zuiToggleTrackSizes = {
  sm: "h-5 w-9",
  md: "h-6 w-11",
  lg: "h-7 w-[3.25rem]",
} as const;

export const zuiToggleTrackAppearances = {
  default:
    "data-[state=checked]:bg-[var(--zui-toggle-track-default-bg-checked,oklch(78.9%_0.154_211.53_/_0.7))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-default-bg-checked-dark,oklch(60.9%_0.126_221.723_/_0.9))]",
  success:
    "data-[state=checked]:border-[color:var(--zui-toggle-track-success-border-checked,oklch(69.6%_0.17_162.48_/_0.7))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-success-border-checked-dark,oklch(69.6%_0.17_162.48_/_0.7))] data-[state=checked]:bg-[var(--zui-toggle-track-success-bg-checked,oklch(76.5%_0.177_163.223_/_0.8))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-success-bg-checked-dark,oklch(59.6%_0.145_163.225_/_0.8))]",
  destructive:
    "data-[state=checked]:border-[color:var(--zui-toggle-track-destructive-border-checked,oklch(64.5%_0.246_16.439_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-destructive-border-checked-dark,oklch(64.5%_0.246_16.439_/_0.4))] data-[state=checked]:bg-[var(--zui-toggle-track-destructive-bg-checked,oklch(71.2%_0.194_13.428_/_0.8))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-destructive-bg-checked-dark,oklch(58.6%_0.253_17.585_/_0.8))]",
  neutral:
    "data-[state=checked]:border-[color:var(--zui-toggle-track-neutral-border-checked,oklch(55.4%_0.046_257.417_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-neutral-border-checked-dark,oklch(70.4%_0.04_256.788_/_0.4))] data-[state=checked]:bg-[var(--zui-toggle-track-neutral-bg-checked,oklch(70.4%_0.04_256.788_/_0.9))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-neutral-bg-checked-dark,oklch(44.6%_0.043_257.281_/_0.9))]",
  indigo:
    "data-[state=checked]:border-[color:var(--zui-toggle-track-indigo-border-checked,oklch(58.5%_0.233_277.117_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-indigo-border-checked-dark,oklch(58.5%_0.233_277.117_/_0.4))] data-[state=checked]:bg-[var(--zui-toggle-track-indigo-bg-checked,oklch(67.3%_0.182_276.935_/_0.8))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-indigo-bg-checked-dark,oklch(51.1%_0.262_276.966_/_0.8))]",
  purple:
    "data-[state=checked]:border-[color:var(--zui-toggle-track-purple-border-checked,oklch(62.7%_0.265_303.9_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-purple-border-checked-dark,oklch(62.7%_0.265_303.9_/_0.4))] data-[state=checked]:bg-[var(--zui-toggle-track-purple-bg-checked,oklch(71.4%_0.203_305.504_/_0.8))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-purple-bg-checked-dark,oklch(55.8%_0.288_302.321_/_0.8))]",
  pink: "data-[state=checked]:border-[color:var(--zui-toggle-track-pink-border-checked,oklch(65.6%_0.241_354.308_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-pink-border-checked-dark,oklch(65.6%_0.241_354.308_/_0.4))] data-[state=checked]:bg-[var(--zui-toggle-track-pink-bg-checked,oklch(71.8%_0.202_349.761_/_0.8))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-pink-bg-checked-dark,oklch(59.2%_0.249_0.584_/_0.8))]",
  orange:
    "data-[state=checked]:border-[color:var(--zui-toggle-track-orange-border-checked,oklch(70.5%_0.213_47.604_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-orange-border-checked-dark,oklch(70.5%_0.213_47.604_/_0.4))] data-[state=checked]:bg-[var(--zui-toggle-track-orange-bg-checked,oklch(75%_0.183_55.934_/_0.8))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-orange-bg-checked-dark,oklch(64.6%_0.222_41.116_/_0.8))]",
  yellow:
    "data-[state=checked]:border-[color:var(--zui-toggle-track-yellow-border-checked,oklch(79.5%_0.184_86.047_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-yellow-border-checked-dark,oklch(79.5%_0.184_86.047_/_0.4))] data-[state=checked]:bg-[var(--zui-toggle-track-yellow-bg-checked,oklch(85.2%_0.199_91.936_/_0.8))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-yellow-bg-checked-dark,oklch(68.1%_0.162_75.834_/_0.8))]",
  green:
    "data-[state=checked]:border-[color:var(--zui-toggle-track-green-border-checked,oklch(72.3%_0.219_149.579_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-green-border-checked-dark,oklch(72.3%_0.219_149.579_/_0.4))] data-[state=checked]:bg-[var(--zui-toggle-track-green-bg-checked,oklch(79.2%_0.209_151.711_/_0.8))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-green-bg-checked-dark,oklch(62.7%_0.194_149.214_/_0.8))]",
  teal: "data-[state=checked]:border-[color:var(--zui-toggle-track-teal-border-checked,oklch(70.4%_0.14_182.503_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-teal-border-checked-dark,oklch(70.4%_0.14_182.503_/_0.4))] data-[state=checked]:bg-[var(--zui-toggle-track-teal-bg-checked,oklch(77.7%_0.152_181.912_/_0.8))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-teal-bg-checked-dark,oklch(60%_0.118_184.704_/_0.8))]",
  cyan: "data-[state=checked]:border-[color:var(--zui-toggle-track-cyan-border-checked,oklch(71.5%_0.143_215.221_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-cyan-border-checked-dark,oklch(71.5%_0.143_215.221_/_0.4))] data-[state=checked]:bg-[var(--zui-toggle-track-cyan-bg-checked,oklch(78.9%_0.154_211.53_/_0.8))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-cyan-bg-checked-dark,oklch(60.9%_0.126_221.723_/_0.8))]",
  lime: "data-[state=checked]:border-[color:var(--zui-toggle-track-lime-border-checked,oklch(76.8%_0.233_130.85_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-lime-border-checked-dark,oklch(76.8%_0.233_130.85_/_0.4))] data-[state=checked]:bg-[var(--zui-toggle-track-lime-bg-checked,oklch(84.1%_0.238_128.85_/_0.8))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-lime-bg-checked-dark,oklch(64.8%_0.2_131.684_/_0.8))]",
  emerald:
    "data-[state=checked]:border-[color:var(--zui-toggle-track-emerald-border-checked,oklch(69.6%_0.17_162.48_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-emerald-border-checked-dark,oklch(69.6%_0.17_162.48_/_0.4))] data-[state=checked]:bg-[var(--zui-toggle-track-emerald-bg-checked,oklch(76.5%_0.177_163.223_/_0.8))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-emerald-bg-checked-dark,oklch(59.6%_0.145_163.225_/_0.8))]",
  rose: "data-[state=checked]:border-[color:var(--zui-toggle-track-rose-border-checked,oklch(64.5%_0.246_16.439_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-rose-border-checked-dark,oklch(64.5%_0.246_16.439_/_0.4))] data-[state=checked]:bg-[var(--zui-toggle-track-rose-bg-checked,oklch(71.2%_0.194_13.428_/_0.8))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-rose-bg-checked-dark,oklch(58.6%_0.253_17.585_/_0.8))]",
  slate:
    "data-[state=checked]:border-[color:var(--zui-toggle-track-slate-border-checked,oklch(55.4%_0.046_257.417_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-slate-border-checked-dark,oklch(70.4%_0.04_256.788_/_0.4))] data-[state=checked]:bg-[var(--zui-toggle-track-slate-bg-checked,oklch(70.4%_0.04_256.788_/_0.9))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-slate-bg-checked-dark,oklch(44.6%_0.043_257.281_/_0.9))]",
  zinc: "data-[state=checked]:border-[color:var(--zui-toggle-track-zinc-border-checked,oklch(70.5%_0.015_286.067_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-zinc-border-checked-dark,oklch(70.5%_0.015_286.067_/_0.4))] data-[state=checked]:bg-[var(--zui-toggle-track-zinc-bg-checked,oklch(44.2%_0.017_285.786_/_0.9))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-zinc-bg-checked-dark,oklch(44.2%_0.017_285.786_/_0.9))]",
  gray: "data-[state=checked]:border-[color:var(--zui-toggle-track-gray-border-checked,oklch(70.7%_0.022_261.325_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-gray-border-checked-dark,oklch(70.7%_0.022_261.325_/_0.4))] data-[state=checked]:bg-[var(--zui-toggle-track-gray-bg-checked,oklch(70.7%_0.022_261.325_/_0.8))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-gray-bg-checked-dark,oklch(44.6%_0.03_256.802_/_0.9))]",
  stone:
    "bg-[var(--zui-toggle-track-stone-bg,oklch(86.9%_0.005_56.366))] dark:bg-[var(--zui-toggle-track-stone-bg-dark,oklch(86.9%_0.005_56.366))] data-[state=checked]:border-[color:var(--zui-toggle-track-stone-border-checked,oklch(70.9%_0.01_56.259_/_0.4))] dark:data-[state=checked]:border-[color:var(--zui-toggle-track-stone-border-checked-dark,oklch(70.9%_0.01_56.259_/_0.4))] data-[state=checked]:bg-[var(--zui-toggle-track-stone-bg-checked,oklch(44.4%_0.011_73.639_/_0.9))] dark:data-[state=checked]:bg-[var(--zui-toggle-track-stone-bg-checked-dark,oklch(44.4%_0.011_73.639_/_0.9))]",
  "gradient-blue":
    "bg-[var(--zui-toggle-track-gradient-blue-bg,oklch(80.9%_0.105_251.813))] dark:bg-[var(--zui-toggle-track-gradient-blue-bg-dark,oklch(80.9%_0.105_251.813))] data-[state=checked]:bg-linear-to-r from-[var(--zui-toggle-track-gradient-blue-from,oklch(42.4%_0.199_265.638))] dark:from-[var(--zui-toggle-track-gradient-blue-from-dark,oklch(54.6%_0.245_262.881))] to-[var(--zui-toggle-track-gradient-blue-to,oklch(43.8%_0.218_303.724))] dark:to-[var(--zui-toggle-track-gradient-blue-to-dark,oklch(55.8%_0.288_302.321))]",
  "gradient-green":
    "bg-[var(--zui-toggle-track-gradient-green-bg,oklch(87.1%_0.15_154.449))] dark:bg-[var(--zui-toggle-track-gradient-green-bg-dark,oklch(87.1%_0.15_154.449))] data-[state=checked]:bg-linear-to-r from-[var(--zui-toggle-track-gradient-green-from,oklch(44.8%_0.119_151.328))] dark:from-[var(--zui-toggle-track-gradient-green-from-dark,oklch(62.7%_0.194_149.214))] to-[var(--zui-toggle-track-gradient-green-to,oklch(45.3%_0.124_130.933))] dark:to-[var(--zui-toggle-track-gradient-green-to-dark,oklch(64.8%_0.2_131.684))]",
  "gradient-red":
    "bg-[var(--zui-toggle-track-gradient-red-bg,oklch(80.8%_0.114_19.571))] dark:bg-[var(--zui-toggle-track-gradient-red-bg-dark,oklch(80.8%_0.114_19.571))] data-[state=checked]:bg-linear-to-r from-[var(--zui-toggle-track-gradient-red-from,oklch(44.4%_0.177_26.899))] dark:from-[var(--zui-toggle-track-gradient-red-from-dark,oklch(57.7%_0.245_27.325))] to-[var(--zui-toggle-track-gradient-red-to,oklch(45.9%_0.187_3.815))] dark:to-[var(--zui-toggle-track-gradient-red-to-dark,oklch(59.2%_0.249_0.584))]",
  "gradient-yellow":
    "bg-[var(--zui-toggle-track-gradient-yellow-bg,oklch(90.5%_0.182_98.111))] dark:bg-[var(--zui-toggle-track-gradient-yellow-bg-dark,oklch(90.5%_0.182_98.111))] data-[state=checked]:bg-linear-to-r from-[var(--zui-toggle-track-gradient-yellow-from,oklch(47.6%_0.114_61.907))] dark:from-[var(--zui-toggle-track-gradient-yellow-from-dark,oklch(68.1%_0.162_75.834))] to-[var(--zui-toggle-track-gradient-yellow-to,oklch(47%_0.157_37.304))] dark:to-[var(--zui-toggle-track-gradient-yellow-to-dark,oklch(64.6%_0.222_41.116))]",
  "gradient-purple":
    "bg-[var(--zui-toggle-track-gradient-purple-bg,oklch(82.7%_0.119_306.383))] dark:bg-[var(--zui-toggle-track-gradient-purple-bg-dark,oklch(82.7%_0.119_306.383))] data-[state=checked]:bg-linear-to-r from-[var(--zui-toggle-track-gradient-purple-from,oklch(43.8%_0.218_303.724))] dark:from-[var(--zui-toggle-track-gradient-purple-from-dark,oklch(55.8%_0.288_302.321))] to-[var(--zui-toggle-track-gradient-purple-to,oklch(45.9%_0.187_3.815))] dark:to-[var(--zui-toggle-track-gradient-purple-to-dark,oklch(59.2%_0.249_0.584))]",
  "gradient-teal":
    "bg-[var(--zui-toggle-track-gradient-teal-bg,oklch(85.5%_0.138_181.071))] dark:bg-[var(--zui-toggle-track-gradient-teal-bg-dark,oklch(85.5%_0.138_181.071))] data-[state=checked]:bg-linear-to-r from-[var(--zui-toggle-track-gradient-teal-from,oklch(43.7%_0.078_188.216))] dark:from-[var(--zui-toggle-track-gradient-teal-from-dark,oklch(60%_0.118_184.704))] to-[var(--zui-toggle-track-gradient-teal-to,oklch(45%_0.085_224.283))] dark:to-[var(--zui-toggle-track-gradient-teal-to-dark,oklch(60.9%_0.126_221.723))]",
  "gradient-indigo":
    "bg-[var(--zui-toggle-track-gradient-indigo-bg,oklch(78.5%_0.115_274.713))] dark:bg-[var(--zui-toggle-track-gradient-indigo-bg-dark,oklch(78.5%_0.115_274.713))] data-[state=checked]:bg-linear-to-r from-[var(--zui-toggle-track-gradient-indigo-from,oklch(39.8%_0.195_277.366))] dark:from-[var(--zui-toggle-track-gradient-indigo-from-dark,oklch(51.1%_0.262_276.966))] to-[var(--zui-toggle-track-gradient-indigo-to,oklch(43.8%_0.218_303.724))] dark:to-[var(--zui-toggle-track-gradient-indigo-to-dark,oklch(55.8%_0.288_302.321))]",
  "gradient-pink":
    "bg-[var(--zui-toggle-track-gradient-pink-bg,oklch(82.3%_0.12_346.018))] dark:bg-[var(--zui-toggle-track-gradient-pink-bg-dark,oklch(82.3%_0.12_346.018))] data-[state=checked]:bg-linear-to-r from-[var(--zui-toggle-track-gradient-pink-from,oklch(45.9%_0.187_3.815))] dark:from-[var(--zui-toggle-track-gradient-pink-from-dark,oklch(59.2%_0.249_0.584))] to-[var(--zui-toggle-track-gradient-pink-to,oklch(45.5%_0.188_13.697))] dark:to-[var(--zui-toggle-track-gradient-pink-to-dark,oklch(58.6%_0.253_17.585))]",
  "gradient-orange":
    "bg-[var(--zui-toggle-track-gradient-orange-bg,oklch(83.7%_0.128_66.29))] dark:bg-[var(--zui-toggle-track-gradient-orange-bg-dark,oklch(83.7%_0.128_66.29))] data-[state=checked]:bg-linear-to-r from-[var(--zui-toggle-track-gradient-orange-from,oklch(47%_0.157_37.304))] dark:from-[var(--zui-toggle-track-gradient-orange-from-dark,oklch(64.6%_0.222_41.116))] to-[var(--zui-toggle-track-gradient-orange-to,oklch(44.4%_0.177_26.899))] dark:to-[var(--zui-toggle-track-gradient-orange-to-dark,oklch(57.7%_0.245_27.325))]",
} as const;

export const zuiToggleThumbBase =
  "pointer-events-none block rounded-full border border-[color:var(--zui-toggle-thumb-border,oklch(20.8%_0.042_265.755_/_0.3))] dark:border-[color:var(--zui-toggle-thumb-border-dark,#ffffff1a)] shadow-[var(--zui-toggle-thumb-shadow,0_1px_2px_rgba(15,23,42,0.12))] dark:shadow-[var(--zui-toggle-thumb-shadow-dark,0_1px_2px_rgba(15,23,42,0.35))] ring-0";

export const zuiToggleThumbSizes = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
} as const;

export const zuiToggleThumbColors = {
  default:
    "bg-[var(--zui-toggle-thumb-colors-default-bg,#ffffff)] dark:bg-[var(--zui-toggle-thumb-colors-default-bg-dark,#ffffff)]",
  success:
    "bg-[var(--zui-toggle-thumb-colors-success-bg,oklch(69.6%_0.17_162.48))] dark:bg-[var(--zui-toggle-thumb-colors-success-bg-dark,oklch(69.6%_0.17_162.48))]",
  destructive:
    "bg-[var(--zui-toggle-thumb-colors-destructive-bg,oklch(64.5%_0.246_16.439))] dark:bg-[var(--zui-toggle-thumb-colors-destructive-bg-dark,oklch(64.5%_0.246_16.439))]",
  neutral:
    "bg-[var(--zui-toggle-thumb-colors-neutral-bg,oklch(55.4%_0.046_257.417))] dark:bg-[var(--zui-toggle-thumb-colors-neutral-bg-dark,oklch(55.4%_0.046_257.417))]",
  indigo:
    "bg-[var(--zui-toggle-thumb-colors-indigo-bg,oklch(58.5%_0.233_277.117))] dark:bg-[var(--zui-toggle-thumb-colors-indigo-bg-dark,oklch(58.5%_0.233_277.117))]",
  purple:
    "bg-[var(--zui-toggle-thumb-colors-purple-bg,oklch(62.7%_0.265_303.9))] dark:bg-[var(--zui-toggle-thumb-colors-purple-bg-dark,oklch(62.7%_0.265_303.9))]",
  pink: "bg-[var(--zui-toggle-thumb-colors-pink-bg,oklch(65.6%_0.241_354.308))] dark:bg-[var(--zui-toggle-thumb-colors-pink-bg-dark,oklch(65.6%_0.241_354.308))]",
  orange:
    "bg-[var(--zui-toggle-thumb-colors-orange-bg,oklch(70.5%_0.213_47.604))] dark:bg-[var(--zui-toggle-thumb-colors-orange-bg-dark,oklch(70.5%_0.213_47.604))]",
  yellow:
    "bg-[var(--zui-toggle-thumb-colors-yellow-bg,oklch(79.5%_0.184_86.047))] dark:bg-[var(--zui-toggle-thumb-colors-yellow-bg-dark,oklch(79.5%_0.184_86.047))]",
  green:
    "bg-[var(--zui-toggle-thumb-colors-green-bg,oklch(72.3%_0.219_149.579))] dark:bg-[var(--zui-toggle-thumb-colors-green-bg-dark,oklch(72.3%_0.219_149.579))]",
  teal: "bg-[var(--zui-toggle-thumb-colors-teal-bg,oklch(70.4%_0.14_182.503))] dark:bg-[var(--zui-toggle-thumb-colors-teal-bg-dark,oklch(70.4%_0.14_182.503))]",
  cyan: "bg-[var(--zui-toggle-thumb-colors-cyan-bg,oklch(71.5%_0.143_215.221))] dark:bg-[var(--zui-toggle-thumb-colors-cyan-bg-dark,oklch(71.5%_0.143_215.221))]",
  lime: "bg-[var(--zui-toggle-thumb-colors-lime-bg,oklch(76.8%_0.233_130.85))] dark:bg-[var(--zui-toggle-thumb-colors-lime-bg-dark,oklch(76.8%_0.233_130.85))]",
  emerald:
    "bg-[var(--zui-toggle-thumb-colors-emerald-bg,oklch(69.6%_0.17_162.48))] dark:bg-[var(--zui-toggle-thumb-colors-emerald-bg-dark,oklch(69.6%_0.17_162.48))]",
  rose: "bg-[var(--zui-toggle-thumb-colors-rose-bg,oklch(64.5%_0.246_16.439))] dark:bg-[var(--zui-toggle-thumb-colors-rose-bg-dark,oklch(64.5%_0.246_16.439))]",
  slate:
    "bg-[var(--zui-toggle-thumb-colors-slate-bg,oklch(55.4%_0.046_257.417))] dark:bg-[var(--zui-toggle-thumb-colors-slate-bg-dark,oklch(55.4%_0.046_257.417))]",
  zinc: "bg-[var(--zui-toggle-thumb-colors-zinc-bg,oklch(55.2%_0.016_285.938))] dark:bg-[var(--zui-toggle-thumb-colors-zinc-bg-dark,oklch(55.2%_0.016_285.938))]",
  gray: "bg-[var(--zui-toggle-thumb-colors-gray-bg,oklch(55.1%_0.027_264.364))] dark:bg-[var(--zui-toggle-thumb-colors-gray-bg-dark,oklch(55.1%_0.027_264.364))]",
  stone:
    "bg-[var(--zui-toggle-thumb-colors-stone-bg,oklch(55.3%_0.013_58.071))] dark:bg-[var(--zui-toggle-thumb-colors-stone-bg-dark,oklch(55.3%_0.013_58.071))]",
  "gradient-blue":
    "bg-[var(--zui-toggle-thumb-colors-gradient-blue-bg,oklch(62.3%_0.214_259.815))] dark:bg-[var(--zui-toggle-thumb-colors-gradient-blue-bg-dark,oklch(62.3%_0.214_259.815))]",
  "gradient-green":
    "bg-[var(--zui-toggle-thumb-colors-gradient-green-bg,oklch(72.3%_0.219_149.579))] dark:bg-[var(--zui-toggle-thumb-colors-gradient-green-bg-dark,oklch(72.3%_0.219_149.579))]",
  "gradient-red":
    "bg-[var(--zui-toggle-thumb-colors-gradient-red-bg,oklch(63.7%_0.237_25.331))] dark:bg-[var(--zui-toggle-thumb-colors-gradient-red-bg-dark,oklch(63.7%_0.237_25.331))]",
  "gradient-yellow":
    "bg-[var(--zui-toggle-thumb-colors-gradient-yellow-bg,oklch(79.5%_0.184_86.047))] dark:bg-[var(--zui-toggle-thumb-colors-gradient-yellow-bg-dark,oklch(79.5%_0.184_86.047))]",
  "gradient-purple":
    "bg-[var(--zui-toggle-thumb-colors-gradient-purple-bg,oklch(62.7%_0.265_303.9))] dark:bg-[var(--zui-toggle-thumb-colors-gradient-purple-bg-dark,oklch(62.7%_0.265_303.9))]",
  "gradient-teal":
    "bg-[var(--zui-toggle-thumb-colors-gradient-teal-bg,oklch(70.4%_0.14_182.503))] dark:bg-[var(--zui-toggle-thumb-colors-gradient-teal-bg-dark,oklch(70.4%_0.14_182.503))]",
  "gradient-indigo":
    "bg-[var(--zui-toggle-thumb-colors-gradient-indigo-bg,oklch(58.5%_0.233_277.117))] dark:bg-[var(--zui-toggle-thumb-colors-gradient-indigo-bg-dark,oklch(58.5%_0.233_277.117))]",
  "gradient-pink":
    "bg-[var(--zui-toggle-thumb-colors-gradient-pink-bg,oklch(65.6%_0.241_354.308))] dark:bg-[var(--zui-toggle-thumb-colors-gradient-pink-bg-dark,oklch(65.6%_0.241_354.308))]",
  "gradient-orange":
    "bg-[var(--zui-toggle-thumb-colors-gradient-orange-bg,oklch(70.5%_0.213_47.604))] dark:bg-[var(--zui-toggle-thumb-colors-gradient-orange-bg-dark,oklch(70.5%_0.213_47.604))]",
} as const;
