const shimmerLayer =
  "[background-size:220%_100%] [background-repeat:no-repeat] [background-position:100%_0%]";

export const zuiSkeletonShimmerGradientClasses = {
  default: `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,255,255,0.22),rgba(255,255,255,0.04))]`,
  subtle: `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(255,255,255,0.03),rgba(255,255,255,0.14),rgba(255,255,255,0.03))]`,
  muted: `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.1),rgba(255,255,255,0.02))]`,
  sky: `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(56,189,248,0.1),rgba(56,189,248,0.42),rgba(56,189,248,0.1))]`,
  rose: `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(251,113,133,0.1),rgba(251,113,133,0.42),rgba(251,113,133,0.1))]`,
  purple: `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(192,132,252,0.1),rgba(192,132,252,0.42),rgba(192,132,252,0.1))]`,
  pink: `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(244,114,182,0.1),rgba(244,114,182,0.42),rgba(244,114,182,0.1))]`,
  orange: `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(251,146,60,0.1),rgba(251,146,60,0.42),rgba(251,146,60,0.1))]`,
  yellow: `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(250,204,21,0.12),rgba(250,204,21,0.4),rgba(250,204,21,0.12))]`,
  teal: `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(45,212,191,0.1),rgba(45,212,191,0.42),rgba(45,212,191,0.1))]`,
  indigo: `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(129,140,248,0.1),rgba(129,140,248,0.42),rgba(129,140,248,0.1))]`,
  emerald: `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(52,211,153,0.1),rgba(52,211,153,0.42),rgba(52,211,153,0.1))]`,
  gray: `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(161,161,170,0.1),rgba(161,161,170,0.38),rgba(161,161,170,0.1))]`,
  amber: `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(251,191,36,0.12),rgba(251,191,36,0.42),rgba(251,191,36,0.12))]`,
  violet: `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(167,139,250,0.1),rgba(167,139,250,0.42),rgba(167,139,250,0.1))]`,
  "gradient-blue": `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(100,149,237,0.1),rgba(100,149,237,0.42),rgba(100,149,237,0.1))]`,
  "gradient-green": `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(52,211,153,0.1),rgba(52,211,153,0.42),rgba(52,211,153,0.1))]`,
  "gradient-red": `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(239,68,68,0.1),rgba(239,68,68,0.42),rgba(239,68,68,0.1))]`,
  "gradient-yellow": `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(250,204,21,0.12),rgba(250,204,21,0.42),rgba(250,204,21,0.12))]`,
  "gradient-purple": `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(167,139,250,0.1),rgba(167,139,250,0.42),rgba(167,139,250,0.1))]`,
  "gradient-teal": `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(45,212,191,0.1),rgba(45,212,191,0.42),rgba(45,212,191,0.1))]`,
  "gradient-indigo": `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(129,140,248,0.1),rgba(129,140,248,0.42),rgba(129,140,248,0.1))]`,
  "gradient-pink": `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(244,114,182,0.1),rgba(244,114,182,0.42),rgba(244,114,182,0.1))]`,
  "gradient-orange": `${shimmerLayer} [background-image:linear-gradient(90deg,rgba(251,146,60,0.1),rgba(251,146,60,0.42),rgba(251,146,60,0.1))]`,
} as const;

export type ZuiSkeletonShimmerTone =
  keyof typeof zuiSkeletonShimmerGradientClasses;

export const zuiSkeletonBase =
  "relative overflow-hidden bg-[var(--zui-skeleton-bg,#0000001a)] dark:bg-[var(--zui-skeleton-bg-dark,#ffffff1a)] text-[color:var(--zui-skeleton-fg,transparent)]";

export const zuiSkeletonAppearances = {
  default:
    "bg-[var(--zui-skeleton-default-bg,#0000001a)] dark:bg-[var(--zui-skeleton-default-bg-dark,#ffffff1a)]",
  subtle:
    "bg-[var(--zui-skeleton-subtle-bg,#00000012)] dark:bg-[var(--zui-skeleton-subtle-bg-dark,#ffffff12)]",
  muted:
    "bg-[var(--zui-skeleton-muted-bg,oklch(92.9%_0.013_255.508_/_0.8))] dark:bg-[var(--zui-skeleton-muted-bg-dark,oklch(27.9%_0.041_260.031_/_0.8))]",
  sky: "bg-[var(--zui-skeleton-sky-bg,oklch(68.5%_0.169_237.323_/_0.1))]",
  rose: "bg-[var(--zui-skeleton-rose-bg,oklch(64.5%_0.246_16.439_/_0.1))]",
  purple: "bg-[var(--zui-skeleton-purple-bg,oklch(62.7%_0.265_303.9_/_0.1))]",
  pink: "bg-[var(--zui-skeleton-pink-bg,oklch(65.6%_0.241_354.308_/_0.1))]",
  orange: "bg-[var(--zui-skeleton-orange-bg,oklch(70.5%_0.213_47.604_/_0.1))]",
  yellow: "bg-[var(--zui-skeleton-yellow-bg,oklch(79.5%_0.184_86.047_/_0.1))]",
  teal: "bg-[var(--zui-skeleton-teal-bg,oklch(70.4%_0.14_182.503_/_0.1))]",
  indigo: "bg-[var(--zui-skeleton-indigo-bg,oklch(58.5%_0.233_277.117_/_0.1))]",
  emerald: "bg-[var(--zui-skeleton-emerald-bg,oklch(69.6%_0.17_162.48_/_0.1))]",
  gray: "bg-[var(--zui-skeleton-gray-bg,oklch(55.1%_0.027_264.364_/_0.1))]",
  amber: "bg-[var(--zui-skeleton-amber-bg,oklch(76.9%_0.188_70.08_/_0.1))]",
  violet: "bg-[var(--zui-skeleton-violet-bg,oklch(60.6%_0.25_292.717_/_0.1))]",
  "gradient-blue":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-blue-from,oklch(42.4%_0.199_265.638))] dark:from-[var(--zui-skeleton-gradient-blue-from-dark,oklch(54.6%_0.245_262.881))] to-[var(--zui-skeleton-gradient-blue-to,oklch(43.8%_0.218_303.724))] dark:to-[var(--zui-skeleton-gradient-blue-to-dark,oklch(55.8%_0.288_302.321))]",
  "gradient-green":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-green-from,oklch(44.8%_0.119_151.328))] dark:from-[var(--zui-skeleton-gradient-green-from-dark,oklch(62.7%_0.194_149.214))] to-[var(--zui-skeleton-gradient-green-to,oklch(45.3%_0.124_130.933))] dark:to-[var(--zui-skeleton-gradient-green-to-dark,oklch(64.8%_0.2_131.684))]",
  "gradient-red":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-red-from,oklch(44.4%_0.177_26.899))] dark:from-[var(--zui-skeleton-gradient-red-from-dark,oklch(57.7%_0.245_27.325))] to-[var(--zui-skeleton-gradient-red-to,oklch(45.9%_0.187_3.815))] dark:to-[var(--zui-skeleton-gradient-red-to-dark,oklch(59.2%_0.249_0.584))]",
  "gradient-yellow":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-yellow-from,oklch(47.6%_0.114_61.907))] dark:from-[var(--zui-skeleton-gradient-yellow-from-dark,oklch(68.1%_0.162_75.834))] to-[var(--zui-skeleton-gradient-yellow-to,oklch(47%_0.157_37.304))] dark:to-[var(--zui-skeleton-gradient-yellow-to-dark,oklch(64.6%_0.222_41.116))]",
  "gradient-purple":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-purple-from,oklch(43.8%_0.218_303.724))] dark:from-[var(--zui-skeleton-gradient-purple-from-dark,oklch(55.8%_0.288_302.321))] to-[var(--zui-skeleton-gradient-purple-to,oklch(45.9%_0.187_3.815))] dark:to-[var(--zui-skeleton-gradient-purple-to-dark,oklch(59.2%_0.249_0.584))]",
  "gradient-teal":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-teal-from,oklch(43.7%_0.078_188.216))] dark:from-[var(--zui-skeleton-gradient-teal-from-dark,oklch(60%_0.118_184.704))] to-[var(--zui-skeleton-gradient-teal-to,oklch(45%_0.085_224.283))] dark:to-[var(--zui-skeleton-gradient-teal-to-dark,oklch(60.9%_0.126_221.723))]",
  "gradient-indigo":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-indigo-from,oklch(39.8%_0.195_277.366))] dark:from-[var(--zui-skeleton-gradient-indigo-from-dark,oklch(51.1%_0.262_276.966))] to-[var(--zui-skeleton-gradient-indigo-to,oklch(43.8%_0.218_303.724))] dark:to-[var(--zui-skeleton-gradient-indigo-to-dark,oklch(55.8%_0.288_302.321))]",
  "gradient-pink":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-pink-from,oklch(45.9%_0.187_3.815))] dark:from-[var(--zui-skeleton-gradient-pink-from-dark,oklch(59.2%_0.249_0.584))] to-[var(--zui-skeleton-gradient-pink-to,oklch(45.5%_0.188_13.697))] dark:to-[var(--zui-skeleton-gradient-pink-to-dark,oklch(58.6%_0.253_17.585))]",
  "gradient-orange":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-orange-from,oklch(47%_0.157_37.304))] dark:from-[var(--zui-skeleton-gradient-orange-from-dark,oklch(64.6%_0.222_41.116))] to-[var(--zui-skeleton-gradient-orange-to,oklch(44.4%_0.177_26.899))] dark:to-[var(--zui-skeleton-gradient-orange-to-dark,oklch(57.7%_0.245_27.325))]",
} as const;

export const zuiSkeletonSizes = {
  sm: "min-h-3",
  md: "min-h-4",
  lg: "min-h-6",
} as const;

export const zuiSkeletonRounded = {
  none: "rounded-none",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  full: "rounded-full",
} as const;

export const zuiSkeletonAnimations = {
  none: "",
  shimmer: "",
  pulse: "",
} as const;

export const zuiSkeletonShimmerTones = {
  default: "",
  subtle: "",
  muted: "",
  sky: "",
  rose: "",
  purple: "",
  pink: "",
  orange: "",
  yellow: "",
  teal: "",
  indigo: "",
  emerald: "",
  gray: "",
  amber: "",
  violet: "",
  "gradient-blue": "",
  "gradient-green": "",
  "gradient-red": "",
  "gradient-yellow": "",
  "gradient-purple": "",
  "gradient-teal": "",
  "gradient-indigo": "",
  "gradient-pink": "",
  "gradient-orange": "",
} as const;

export const zuiSkeletonTextLineBase = "block w-full";

export const zuiSkeletonTextLineSizes = {
  sm: "h-2.5",
  md: "h-3",
  lg: "h-4",
} as const;
