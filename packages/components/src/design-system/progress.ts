export const zuiProgressBase =
  "w-full text-[color:var(--zui-progress-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-progress-fg-dark,oklch(98.4%_0.003_247.858))]";

export const zuiProgressAppearances = {
  default:
    "[--progress-fill:var(--zui-progress-default-fill,oklch(20.8%_0.042_265.755))] dark:[--progress-fill:var(--zui-progress-default-fill-dark,oklch(98.4%_0.003_247.858))]",
  secondary:
    "[--progress-fill:var(--zui-progress-secondary-fill,oklch(44.6%_0.043_257.281))] dark:[--progress-fill:var(--zui-progress-secondary-fill-dark,oklch(86.9%_0.022_252.894))]",
  destructive:
    "[--progress-fill:var(--zui-progress-destructive-fill,oklch(45.5%_0.188_13.697))] dark:[--progress-fill:var(--zui-progress-destructive-fill-dark,oklch(71.2%_0.194_13.428))]",
  emerald:
    "[--progress-fill:var(--zui-progress-emerald-fill,oklch(43.2%_0.095_166.913))] dark:[--progress-fill:var(--zui-progress-emerald-fill-dark,oklch(76.5%_0.177_163.223))]",
  indigo:
    "[--progress-fill:var(--zui-progress-indigo-fill,oklch(39.8%_0.195_277.366))] dark:[--progress-fill:var(--zui-progress-indigo-fill-dark,oklch(67.3%_0.182_276.935))]",
  purple:
    "[--progress-fill:var(--zui-progress-purple-fill,oklch(43.8%_0.218_303.724))] dark:[--progress-fill:var(--zui-progress-purple-fill-dark,oklch(71.4%_0.203_305.504))]",
  pink: "[--progress-fill:var(--zui-progress-pink-fill,oklch(45.9%_0.187_3.815))] dark:[--progress-fill:var(--zui-progress-pink-fill-dark,oklch(71.8%_0.202_349.761))]",
  rose: "[--progress-fill:var(--zui-progress-rose-fill,oklch(45.5%_0.188_13.697))] dark:[--progress-fill:var(--zui-progress-rose-fill-dark,oklch(71.2%_0.194_13.428))]",
  sky: "[--progress-fill:var(--zui-progress-sky-fill,oklch(44.3%_0.11_240.79))] dark:[--progress-fill:var(--zui-progress-sky-fill-dark,oklch(74.6%_0.16_232.661))]",
  teal: "[--progress-fill:var(--zui-progress-teal-fill,oklch(43.7%_0.078_188.216))] dark:[--progress-fill:var(--zui-progress-teal-fill-dark,oklch(77.7%_0.152_181.912))]",
  yellow:
    "[--progress-fill:var(--zui-progress-yellow-fill,oklch(47.6%_0.114_61.907))] dark:[--progress-fill:var(--zui-progress-yellow-fill-dark,oklch(85.2%_0.199_91.936))]",
  orange:
    "[--progress-fill:var(--zui-progress-orange-fill,oklch(47%_0.157_37.304))] dark:[--progress-fill:var(--zui-progress-orange-fill-dark,oklch(75%_0.183_55.934))]",
  outline:
    "[--progress-fill:var(--zui-progress-outline-fill,oklch(52%_0.105_223.128))] dark:[--progress-fill:var(--zui-progress-outline-fill-dark,oklch(86.5%_0.127_207.078))]",
  ghost:
    "[--progress-fill:var(--zui-progress-ghost-fill,oklch(27.9%_0.041_260.031))] dark:[--progress-fill:var(--zui-progress-ghost-fill-dark,oklch(92.9%_0.013_255.508))]",
  glass:
    "[--progress-fill:var(--zui-progress-glass-fill,oklch(20.8%_0.042_265.755))] dark:[--progress-fill:var(--zui-progress-glass-fill-dark,#ffffff)]",
  "gradient-blue":
    "[--progress-fill:var(--zui-progress-gradient-blue-fill,linear-gradient(90deg,oklch(62.3%_0.214_259.815),oklch(62.7%_0.265_303.9)))] dark:[--progress-fill:var(--zui-progress-gradient-blue-fill-dark,linear-gradient(90deg,oklch(62.3%_0.214_259.815),oklch(62.7%_0.265_303.9)))]",
  "gradient-green":
    "[--progress-fill:var(--zui-progress-gradient-green-fill,linear-gradient(90deg,oklch(72.3%_0.219_149.579),oklch(76.8%_0.233_130.85)))] dark:[--progress-fill:var(--zui-progress-gradient-green-fill-dark,linear-gradient(90deg,oklch(72.3%_0.219_149.579),oklch(76.8%_0.233_130.85)))]",
  "gradient-red":
    "[--progress-fill:var(--zui-progress-gradient-red-fill,linear-gradient(90deg,oklch(63.7%_0.237_25.331),oklch(65.6%_0.241_354.308)))] dark:[--progress-fill:var(--zui-progress-gradient-red-fill-dark,linear-gradient(90deg,oklch(63.7%_0.237_25.331),oklch(65.6%_0.241_354.308)))]",
  "gradient-yellow":
    "[--progress-fill:var(--zui-progress-gradient-yellow-fill,linear-gradient(90deg,oklch(79.5%_0.184_86.047),oklch(70.5%_0.213_47.604)))] dark:[--progress-fill:var(--zui-progress-gradient-yellow-fill-dark,linear-gradient(90deg,oklch(79.5%_0.184_86.047),oklch(70.5%_0.213_47.604)))]",
  "gradient-purple":
    "[--progress-fill:var(--zui-progress-gradient-purple-fill,linear-gradient(90deg,oklch(62.7%_0.265_303.9),oklch(65.6%_0.241_354.308)))] dark:[--progress-fill:var(--zui-progress-gradient-purple-fill-dark,linear-gradient(90deg,oklch(62.7%_0.265_303.9),oklch(65.6%_0.241_354.308)))]",
  "gradient-teal":
    "[--progress-fill:var(--zui-progress-gradient-teal-fill,linear-gradient(90deg,oklch(70.4%_0.14_182.503),oklch(71.5%_0.143_215.221)))] dark:[--progress-fill:var(--zui-progress-gradient-teal-fill-dark,linear-gradient(90deg,oklch(70.4%_0.14_182.503),oklch(71.5%_0.143_215.221)))]",
  "gradient-indigo":
    "[--progress-fill:var(--zui-progress-gradient-indigo-fill,linear-gradient(90deg,oklch(58.5%_0.233_277.117),oklch(62.7%_0.265_303.9)))] dark:[--progress-fill:var(--zui-progress-gradient-indigo-fill-dark,linear-gradient(90deg,oklch(58.5%_0.233_277.117),oklch(62.7%_0.265_303.9)))]",
  "gradient-pink":
    "[--progress-fill:var(--zui-progress-gradient-pink-fill,linear-gradient(90deg,oklch(65.6%_0.241_354.308),oklch(64.5%_0.246_16.439)))] dark:[--progress-fill:var(--zui-progress-gradient-pink-fill-dark,linear-gradient(90deg,oklch(65.6%_0.241_354.308),oklch(64.5%_0.246_16.439)))]",
  "gradient-orange":
    "[--progress-fill:var(--zui-progress-gradient-orange-fill,linear-gradient(90deg,oklch(70.5%_0.213_47.604),oklch(63.7%_0.237_25.331)))] dark:[--progress-fill:var(--zui-progress-gradient-orange-fill-dark,linear-gradient(90deg,oklch(70.5%_0.213_47.604),oklch(63.7%_0.237_25.331)))]",
} as const;

export const zuiProgressSizes = {
  xs: "text-[0.65rem]",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
} as const;

export const zuiProgressShapes = {
  flat: "rounded-none",
  rounded: "rounded-md",
  pill: "rounded-full",
} as const;

export const zuiProgressBoolean = {
  true: "",
  false: "",
} as const;

export const zuiProgressTrackBase =
  "relative w-full overflow-hidden bg-[var(--zui-progress-track-bg,#0000001a)] dark:bg-[var(--zui-progress-track-bg-dark,#ffffff1a)]";

export const zuiProgressTrackSizes = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
  xl: "h-4",
} as const;

export const zuiProgressBarBase = "h-full w-full origin-left rounded-[inherit]";

export const zuiProgressBarStriped = {
  true: "[background:var(--zui-progress-bar-bg-striped,repeating-linear-gradient(135deg,rgba(255,255,255,0.28)_0,rgba(255,255,255,0.28)_10px,transparent_10px,transparent_20px)),var(--progress-fill)] dark:[background:var(--zui-progress-bar-bg-striped-dark,repeating-linear-gradient(135deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_10px,transparent_10px,transparent_20px)),var(--progress-fill)]",
  false: "[background:var(--progress-fill)]",
} as const;
