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
  blue: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-blue-shimmer-start,#2563eb1a),var(--zui-skeleton-blue-shimmer-mid,#2563eb6b),var(--zui-skeleton-blue-shimmer-end,#2563eb1a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-blue-shimmer-start-dark,#3b82f61f),var(--zui-skeleton-blue-shimmer-mid-dark,#3b82f67a),var(--zui-skeleton-blue-shimmer-end-dark,#3b82f61f))]`,
  cyan: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-cyan-shimmer-start,#0891b21a),var(--zui-skeleton-cyan-shimmer-mid,#0891b26b),var(--zui-skeleton-cyan-shimmer-end,#0891b21a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-cyan-shimmer-start-dark,#22d3ee1f),var(--zui-skeleton-cyan-shimmer-mid-dark,#22d3ee7a),var(--zui-skeleton-cyan-shimmer-end-dark,#22d3ee1f))]`,
  green: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-green-shimmer-start,#16a34a1a),var(--zui-skeleton-green-shimmer-mid,#16a34a6b),var(--zui-skeleton-green-shimmer-end,#16a34a1a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-green-shimmer-start-dark,#22c55e1f),var(--zui-skeleton-green-shimmer-mid-dark,#22c55e7a),var(--zui-skeleton-green-shimmer-end-dark,#22c55e1f))]`,
  lime: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-lime-shimmer-start,#65a30d1a),var(--zui-skeleton-lime-shimmer-mid,#65a30d6b),var(--zui-skeleton-lime-shimmer-end,#65a30d1a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-lime-shimmer-start-dark,#a3e6351f),var(--zui-skeleton-lime-shimmer-mid-dark,#a3e6357a),var(--zui-skeleton-lime-shimmer-end-dark,#a3e6351f))]`,
  mint: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-mint-shimmer-start,#10b9811a),var(--zui-skeleton-mint-shimmer-mid,#10b9816b),var(--zui-skeleton-mint-shimmer-end,#10b9811a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-mint-shimmer-start-dark,#6ee7b71f),var(--zui-skeleton-mint-shimmer-mid-dark,#6ee7b77a),var(--zui-skeleton-mint-shimmer-end-dark,#6ee7b71f))]`,
  ocean: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-ocean-shimmer-start,#0284c71a),var(--zui-skeleton-ocean-shimmer-mid,#0284c76b),var(--zui-skeleton-ocean-shimmer-end,#0284c71a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-ocean-shimmer-start-dark,#38bdf81f),var(--zui-skeleton-ocean-shimmer-mid-dark,#38bdf87a),var(--zui-skeleton-ocean-shimmer-end-dark,#38bdf81f))]`,
  sapphire: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-sapphire-shimmer-start,#1d4ed81a),var(--zui-skeleton-sapphire-shimmer-mid,#1d4ed86b),var(--zui-skeleton-sapphire-shimmer-end,#1d4ed81a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-sapphire-shimmer-start-dark,#60a5fa1f),var(--zui-skeleton-sapphire-shimmer-mid-dark,#60a5fa7a),var(--zui-skeleton-sapphire-shimmer-end-dark,#60a5fa1f))]`,
  lavender: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-lavender-shimmer-start,#8b5cf61a),var(--zui-skeleton-lavender-shimmer-mid,#8b5cf66b),var(--zui-skeleton-lavender-shimmer-end,#8b5cf61a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-lavender-shimmer-start-dark,#a78bfa1f),var(--zui-skeleton-lavender-shimmer-mid-dark,#a78bfa7a),var(--zui-skeleton-lavender-shimmer-end-dark,#a78bfa1f))]`,
  ruby: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-ruby-shimmer-start,#be123c1a),var(--zui-skeleton-ruby-shimmer-mid,#be123c6b),var(--zui-skeleton-ruby-shimmer-end,#be123c1a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-ruby-shimmer-start-dark,#fb71851f),var(--zui-skeleton-ruby-shimmer-mid-dark,#fb71857a),var(--zui-skeleton-ruby-shimmer-end-dark,#fb71851f))]`,
  red: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-red-shimmer-start,#dc26261a),var(--zui-skeleton-red-shimmer-mid,#dc26266b),var(--zui-skeleton-red-shimmer-end,#dc26261a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-red-shimmer-start-dark,#ef44441f),var(--zui-skeleton-red-shimmer-mid-dark,#ef44447a),var(--zui-skeleton-red-shimmer-end-dark,#ef44441f))]`,
  slate: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-slate-shimmer-start,#4755691a),var(--zui-skeleton-slate-shimmer-mid,#4755696b),var(--zui-skeleton-slate-shimmer-end,#4755691a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-slate-shimmer-start-dark,#64748b1f),var(--zui-skeleton-slate-shimmer-mid-dark,#64748b7a),var(--zui-skeleton-slate-shimmer-end-dark,#64748b1f))]`,
  zinc: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-zinc-shimmer-start,#52525b1a),var(--zui-skeleton-zinc-shimmer-mid,#52525b6b),var(--zui-skeleton-zinc-shimmer-end,#52525b1a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-zinc-shimmer-start-dark,#71717a1f),var(--zui-skeleton-zinc-shimmer-mid-dark,#71717a7a),var(--zui-skeleton-zinc-shimmer-end-dark,#71717a1f))]`,
  stone: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-stone-shimmer-start,#57534e1a),var(--zui-skeleton-stone-shimmer-mid,#57534e6b),var(--zui-skeleton-stone-shimmer-end,#57534e1a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-stone-shimmer-start-dark,#78716c1f),var(--zui-skeleton-stone-shimmer-mid-dark,#78716c7a),var(--zui-skeleton-stone-shimmer-end-dark,#78716c1f))]`,
  royal: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-royal-shimmer-start,#4338ca1a),var(--zui-skeleton-royal-shimmer-mid,#4338ca6b),var(--zui-skeleton-royal-shimmer-end,#4338ca1a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-royal-shimmer-start-dark,#818cf81f),var(--zui-skeleton-royal-shimmer-mid-dark,#818cf87a),var(--zui-skeleton-royal-shimmer-end-dark,#818cf81f))]`,
  electric: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-electric-shimmer-start,#0ea5e91a),var(--zui-skeleton-electric-shimmer-mid,#0ea5e96b),var(--zui-skeleton-electric-shimmer-end,#0ea5e91a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-electric-shimmer-start-dark,#38bdf81f),var(--zui-skeleton-electric-shimmer-mid-dark,#38bdf87a),var(--zui-skeleton-electric-shimmer-end-dark,#38bdf81f))]`,
  forest: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-forest-shimmer-start,#1665341a),var(--zui-skeleton-forest-shimmer-mid,#1665346b),var(--zui-skeleton-forest-shimmer-end,#1665341a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-forest-shimmer-start-dark,#4ade801f),var(--zui-skeleton-forest-shimmer-mid-dark,#4ade807a),var(--zui-skeleton-forest-shimmer-end-dark,#4ade801f))]`,
  sunset: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-sunset-shimmer-start,#ea580c1a),var(--zui-skeleton-sunset-shimmer-mid,#ea580c6b),var(--zui-skeleton-sunset-shimmer-end,#ea580c1a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-sunset-shimmer-start-dark,#fb923c1f),var(--zui-skeleton-sunset-shimmer-mid-dark,#fb923c7a),var(--zui-skeleton-sunset-shimmer-end-dark,#fb923c1f))]`,
  magenta: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-magenta-shimmer-start,#c026d31a),var(--zui-skeleton-magenta-shimmer-mid,#c026d36b),var(--zui-skeleton-magenta-shimmer-end,#c026d31a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-magenta-shimmer-start-dark,#e879f91f),var(--zui-skeleton-magenta-shimmer-mid-dark,#e879f97a),var(--zui-skeleton-magenta-shimmer-end-dark,#e879f91f))]`,
  crimson: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-crimson-shimmer-start,#b91c1c1a),var(--zui-skeleton-crimson-shimmer-mid,#b91c1c6b),var(--zui-skeleton-crimson-shimmer-end,#b91c1c1a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-crimson-shimmer-start-dark,#f871711f),var(--zui-skeleton-crimson-shimmer-mid-dark,#f871717a),var(--zui-skeleton-crimson-shimmer-end-dark,#f871711f))]`,
  aqua: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-aqua-shimmer-start,#0f766e1a),var(--zui-skeleton-aqua-shimmer-mid,#0f766e6b),var(--zui-skeleton-aqua-shimmer-end,#0f766e1a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-aqua-shimmer-start-dark,#2dd4bf1f),var(--zui-skeleton-aqua-shimmer-mid-dark,#2dd4bf7a),var(--zui-skeleton-aqua-shimmer-end-dark,#2dd4bf1f))]`,
  plum: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-plum-shimmer-start,#7e22ce1a),var(--zui-skeleton-plum-shimmer-mid,#7e22ce6b),var(--zui-skeleton-plum-shimmer-end,#7e22ce1a))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-plum-shimmer-start-dark,#c084fc1f),var(--zui-skeleton-plum-shimmer-mid-dark,#c084fc7a),var(--zui-skeleton-plum-shimmer-end-dark,#c084fc1f))]`,
} as const;

export type ZuiSkeletonShimmerTone =
  keyof typeof zuiSkeletonShimmerGradientClasses;

export const zuiSkeletonBase =
  "relative overflow-hidden bg-[var(--zui-skeleton-bg,#0000001a)] dark:bg-[var(--zui-skeleton-bg-dark,#ffffff1a)] text-[color:var(--zui-skeleton-fg,transparent)] dark:text-[color:var(--zui-skeleton-fg-dark,transparent)]";

export const zuiSkeletonAppearances = {
  default:
    "bg-[var(--zui-skeleton-default-bg,#0000001a)] dark:bg-[var(--zui-skeleton-default-bg-dark,#ffffff1a)]",
  subtle:
    "bg-[var(--zui-skeleton-subtle-bg,#00000012)] dark:bg-[var(--zui-skeleton-subtle-bg-dark,#ffffff12)]",
  muted:
    "bg-[var(--zui-skeleton-muted-bg,oklch(92.9%_0.013_255.508_/_0.8))] dark:bg-[var(--zui-skeleton-muted-bg-dark,oklch(27.9%_0.041_260.031_/_0.8))]",
  sky: "bg-[var(--zui-skeleton-sky-bg,oklch(68.5%_0.169_237.323_/_0.1))] dark:bg-[var(--zui-skeleton-sky-bg-dark,oklch(68.5%_0.169_237.323_/_0.1))]",
  rose: "bg-[var(--zui-skeleton-rose-bg,oklch(64.5%_0.246_16.439_/_0.1))] dark:bg-[var(--zui-skeleton-rose-bg-dark,oklch(64.5%_0.246_16.439_/_0.1))]",
  purple:
    "bg-[var(--zui-skeleton-purple-bg,oklch(62.7%_0.265_303.9_/_0.1))] dark:bg-[var(--zui-skeleton-purple-bg-dark,oklch(62.7%_0.265_303.9_/_0.1))]",
  pink: "bg-[var(--zui-skeleton-pink-bg,oklch(65.6%_0.241_354.308_/_0.1))] dark:bg-[var(--zui-skeleton-pink-bg-dark,oklch(65.6%_0.241_354.308_/_0.1))]",
  orange:
    "bg-[var(--zui-skeleton-orange-bg,oklch(70.5%_0.213_47.604_/_0.1))] dark:bg-[var(--zui-skeleton-orange-bg-dark,oklch(70.5%_0.213_47.604_/_0.1))]",
  yellow:
    "bg-[var(--zui-skeleton-yellow-bg,oklch(79.5%_0.184_86.047_/_0.1))] dark:bg-[var(--zui-skeleton-yellow-bg-dark,oklch(79.5%_0.184_86.047_/_0.1))]",
  teal: "bg-[var(--zui-skeleton-teal-bg,oklch(70.4%_0.14_182.503_/_0.1))] dark:bg-[var(--zui-skeleton-teal-bg-dark,oklch(70.4%_0.14_182.503_/_0.1))]",
  indigo:
    "bg-[var(--zui-skeleton-indigo-bg,oklch(58.5%_0.233_277.117_/_0.1))] dark:bg-[var(--zui-skeleton-indigo-bg-dark,oklch(58.5%_0.233_277.117_/_0.1))]",
  emerald:
    "bg-[var(--zui-skeleton-emerald-bg,oklch(69.6%_0.17_162.48_/_0.1))] dark:bg-[var(--zui-skeleton-emerald-bg-dark,oklch(69.6%_0.17_162.48_/_0.1))]",
  gray: "bg-[var(--zui-skeleton-gray-bg,oklch(55.1%_0.027_264.364_/_0.1))] dark:bg-[var(--zui-skeleton-gray-bg-dark,oklch(55.1%_0.027_264.364_/_0.1))]",
  amber:
    "bg-[var(--zui-skeleton-amber-bg,oklch(76.9%_0.188_70.08_/_0.1))] dark:bg-[var(--zui-skeleton-amber-bg-dark,oklch(76.9%_0.188_70.08_/_0.1))]",
  violet:
    "bg-[var(--zui-skeleton-violet-bg,oklch(60.6%_0.25_292.717_/_0.1))] dark:bg-[var(--zui-skeleton-violet-bg-dark,oklch(60.6%_0.25_292.717_/_0.1))]",
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
  blue: "bg-[var(--zui-skeleton-blue-bg,#2563eb)] dark:bg-[var(--zui-skeleton-blue-bg-dark,#3b82f6)]",
  cyan: "bg-[var(--zui-skeleton-cyan-bg,#0891b2)] dark:bg-[var(--zui-skeleton-cyan-bg-dark,#22d3ee)]",
  green:
    "bg-[var(--zui-skeleton-green-bg,#16a34a)] dark:bg-[var(--zui-skeleton-green-bg-dark,#22c55e)]",
  lime: "bg-[var(--zui-skeleton-lime-bg,#65a30d)] dark:bg-[var(--zui-skeleton-lime-bg-dark,#a3e635)]",
  mint: "bg-[var(--zui-skeleton-mint-bg,#10b981)] dark:bg-[var(--zui-skeleton-mint-bg-dark,#6ee7b7)]",
  ocean:
    "bg-[var(--zui-skeleton-ocean-bg,#0284c7)] dark:bg-[var(--zui-skeleton-ocean-bg-dark,#38bdf8)]",
  sapphire:
    "bg-[var(--zui-skeleton-sapphire-bg,#1d4ed8)] dark:bg-[var(--zui-skeleton-sapphire-bg-dark,#60a5fa)]",
  lavender:
    "bg-[var(--zui-skeleton-lavender-bg,#8b5cf6)] dark:bg-[var(--zui-skeleton-lavender-bg-dark,#a78bfa)]",
  ruby: "bg-[var(--zui-skeleton-ruby-bg,#be123c)] dark:bg-[var(--zui-skeleton-ruby-bg-dark,#fb7185)]",
  red: "bg-[var(--zui-skeleton-red-bg,#dc2626)] dark:bg-[var(--zui-skeleton-red-bg-dark,#ef4444)]",
  slate:
    "bg-[var(--zui-skeleton-slate-bg,#475569)] dark:bg-[var(--zui-skeleton-slate-bg-dark,#64748b)]",
  zinc: "bg-[var(--zui-skeleton-zinc-bg,#52525b)] dark:bg-[var(--zui-skeleton-zinc-bg-dark,#71717a)]",
  stone:
    "bg-[var(--zui-skeleton-stone-bg,#57534e)] dark:bg-[var(--zui-skeleton-stone-bg-dark,#78716c)]",
  royal:
    "bg-[var(--zui-skeleton-royal-bg,#4338ca)] dark:bg-[var(--zui-skeleton-royal-bg-dark,#818cf8)]",
  electric:
    "bg-[var(--zui-skeleton-electric-bg,#0ea5e9)] dark:bg-[var(--zui-skeleton-electric-bg-dark,#38bdf8)]",
  forest:
    "bg-[var(--zui-skeleton-forest-bg,#166534)] dark:bg-[var(--zui-skeleton-forest-bg-dark,#4ade80)]",
  sunset:
    "bg-[var(--zui-skeleton-sunset-bg,#ea580c)] dark:bg-[var(--zui-skeleton-sunset-bg-dark,#fb923c)]",
  magenta:
    "bg-[var(--zui-skeleton-magenta-bg,#c026d3)] dark:bg-[var(--zui-skeleton-magenta-bg-dark,#e879f9)]",
  crimson:
    "bg-[var(--zui-skeleton-crimson-bg,#b91c1c)] dark:bg-[var(--zui-skeleton-crimson-bg-dark,#f87171)]",
  aqua: "bg-[var(--zui-skeleton-aqua-bg,#0f766e)] dark:bg-[var(--zui-skeleton-aqua-bg-dark,#2dd4bf)]",
  plum: "bg-[var(--zui-skeleton-plum-bg,#7e22ce)] dark:bg-[var(--zui-skeleton-plum-bg-dark,#c084fc)]",
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
  blue: "",
  cyan: "",
  green: "",
  lime: "",
  mint: "",
  ocean: "",
  sapphire: "",
  lavender: "",
  ruby: "",
  red: "",
  slate: "",
  zinc: "",
  stone: "",
  royal: "",
  electric: "",
  forest: "",
  sunset: "",
  magenta: "",
  crimson: "",
  aqua: "",
  plum: "",
} as const;

export const zuiSkeletonTextLineBase = "block w-full";

export const zuiSkeletonTextLineSizes = {
  sm: "h-2.5",
  md: "h-3",
  lg: "h-4",
} as const;
