export const zuiSpinnerBase = "inline-flex items-center justify-center";

export const zuiSpinnerAppearances = {
  default:
    "text-[color:var(--zui-spinner-default-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-spinner-default-fg-dark,oklch(98.4%_0.003_247.858))]",
  secondary:
    "text-[color:var(--zui-spinner-secondary-fg,oklch(44.6%_0.043_257.281))] dark:text-[color:var(--zui-spinner-secondary-fg-dark,oklch(86.9%_0.022_252.894))]",
  destructive:
    "text-[color:var(--zui-spinner-destructive-fg,oklch(58.6%_0.253_17.585))] dark:text-[color:var(--zui-spinner-destructive-fg-dark,oklch(71.2%_0.194_13.428))]",
  ghost:
    "text-[color:var(--zui-spinner-ghost-fg,oklch(44.6%_0.043_257.281))] dark:text-[color:var(--zui-spinner-ghost-fg-dark,oklch(86.9%_0.022_252.894))]",
  emerald:
    "text-[color:var(--zui-spinner-emerald-fg,oklch(59.6%_0.145_163.225))] dark:text-[color:var(--zui-spinner-emerald-fg-dark,oklch(76.5%_0.177_163.223))]",
  indigo:
    "text-[color:var(--zui-spinner-indigo-fg,oklch(51.1%_0.262_276.966))] dark:text-[color:var(--zui-spinner-indigo-fg-dark,oklch(67.3%_0.182_276.935))]",
  purple:
    "text-[color:var(--zui-spinner-purple-fg,oklch(55.8%_0.288_302.321))] dark:text-[color:var(--zui-spinner-purple-fg-dark,oklch(71.4%_0.203_305.504))]",
  pink: "text-[color:var(--zui-spinner-pink-fg,oklch(59.2%_0.249_0.584))] dark:text-[color:var(--zui-spinner-pink-fg-dark,oklch(71.8%_0.202_349.761))]",
  rose: "text-[color:var(--zui-spinner-rose-fg,oklch(58.6%_0.253_17.585))] dark:text-[color:var(--zui-spinner-rose-fg-dark,oklch(71.2%_0.194_13.428))]",
  sky: "text-[color:var(--zui-spinner-sky-fg,oklch(58.8%_0.158_241.966))] dark:text-[color:var(--zui-spinner-sky-fg-dark,oklch(74.6%_0.16_232.661))]",
  teal: "text-[color:var(--zui-spinner-teal-fg,oklch(60%_0.118_184.704))] dark:text-[color:var(--zui-spinner-teal-fg-dark,oklch(77.7%_0.152_181.912))]",
  yellow:
    "text-[color:var(--zui-spinner-yellow-fg,oklch(68.1%_0.162_75.834))] dark:text-[color:var(--zui-spinner-yellow-fg-dark,oklch(85.2%_0.199_91.936))]",
  orange:
    "text-[color:var(--zui-spinner-orange-fg,oklch(64.6%_0.222_41.116))] dark:text-[color:var(--zui-spinner-orange-fg-dark,oklch(75%_0.183_55.934))]",
  "gradient-blue":
    "text-[color:var(--zui-spinner-gradient-blue-fg,oklch(54.6%_0.245_262.881))] dark:text-[color:var(--zui-spinner-gradient-blue-fg-dark,oklch(70.7%_0.165_254.624))]",
  "gradient-green":
    "text-[color:var(--zui-spinner-gradient-green-fg,oklch(62.7%_0.194_149.214))] dark:text-[color:var(--zui-spinner-gradient-green-fg-dark,oklch(79.2%_0.209_151.711))]",
  "gradient-red":
    "text-[color:var(--zui-spinner-gradient-red-fg,oklch(57.7%_0.245_27.325))] dark:text-[color:var(--zui-spinner-gradient-red-fg-dark,oklch(70.4%_0.191_22.216))]",
  "gradient-yellow":
    "text-[color:var(--zui-spinner-gradient-yellow-fg,oklch(68.1%_0.162_75.834))] dark:text-[color:var(--zui-spinner-gradient-yellow-fg-dark,oklch(85.2%_0.199_91.936))]",
  "gradient-purple":
    "text-[color:var(--zui-spinner-gradient-purple-fg,oklch(55.8%_0.288_302.321))] dark:text-[color:var(--zui-spinner-gradient-purple-fg-dark,oklch(71.4%_0.203_305.504))]",
  "gradient-teal":
    "text-[color:var(--zui-spinner-gradient-teal-fg,oklch(60%_0.118_184.704))] dark:text-[color:var(--zui-spinner-gradient-teal-fg-dark,oklch(77.7%_0.152_181.912))]",
  "gradient-indigo":
    "text-[color:var(--zui-spinner-gradient-indigo-fg,oklch(51.1%_0.262_276.966))] dark:text-[color:var(--zui-spinner-gradient-indigo-fg-dark,oklch(67.3%_0.182_276.935))]",
  "gradient-pink":
    "text-[color:var(--zui-spinner-gradient-pink-fg,oklch(59.2%_0.249_0.584))] dark:text-[color:var(--zui-spinner-gradient-pink-fg-dark,oklch(71.8%_0.202_349.761))]",
  "gradient-orange":
    "text-[color:var(--zui-spinner-gradient-orange-fg,oklch(64.6%_0.222_41.116))] dark:text-[color:var(--zui-spinner-gradient-orange-fg-dark,oklch(75%_0.183_55.934))]",
} as const;

export const zuiSpinnerSizes = {
  xs: "size-3",
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-10",
} as const;

export const zuiSpinnerVariants = {
  ring: "",
  dots: "",
  pulse: "",
  bars: "",
} as const;
