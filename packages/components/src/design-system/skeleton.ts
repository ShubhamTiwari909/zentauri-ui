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
  blue: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-blue-shimmer-start,var(--zui-color-blue,#2563eb1a)),var(--zui-skeleton-blue-shimmer-mid,var(--zui-color-blue,#2563eb6b)),var(--zui-skeleton-blue-shimmer-end,var(--zui-color-blue,#2563eb1a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-blue-shimmer-start-dark,var(--zui-color-blue-dark,#3b82f61f)),var(--zui-skeleton-blue-shimmer-mid-dark,var(--zui-color-blue-dark,#3b82f67a)),var(--zui-skeleton-blue-shimmer-end-dark,var(--zui-color-blue-dark,#3b82f61f)))]`,
  cyan: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-cyan-shimmer-start,var(--zui-color-cyan,#0891b21a)),var(--zui-skeleton-cyan-shimmer-mid,var(--zui-color-cyan,#0891b26b)),var(--zui-skeleton-cyan-shimmer-end,var(--zui-color-cyan,#0891b21a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-cyan-shimmer-start-dark,var(--zui-color-cyan-dark,#22d3ee1f)),var(--zui-skeleton-cyan-shimmer-mid-dark,var(--zui-color-cyan-dark,#22d3ee7a)),var(--zui-skeleton-cyan-shimmer-end-dark,var(--zui-color-cyan-dark,#22d3ee1f)))]`,
  green: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-green-shimmer-start,var(--zui-color-green,#16a34a1a)),var(--zui-skeleton-green-shimmer-mid,var(--zui-color-green,#16a34a6b)),var(--zui-skeleton-green-shimmer-end,var(--zui-color-green,#16a34a1a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-green-shimmer-start-dark,var(--zui-color-green-dark,#22c55e1f)),var(--zui-skeleton-green-shimmer-mid-dark,var(--zui-color-green-dark,#22c55e7a)),var(--zui-skeleton-green-shimmer-end-dark,var(--zui-color-green-dark,#22c55e1f)))]`,
  lime: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-lime-shimmer-start,var(--zui-color-lime,#65a30d1a)),var(--zui-skeleton-lime-shimmer-mid,var(--zui-color-lime,#65a30d6b)),var(--zui-skeleton-lime-shimmer-end,var(--zui-color-lime,#65a30d1a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-lime-shimmer-start-dark,var(--zui-color-lime-dark,#a3e6351f)),var(--zui-skeleton-lime-shimmer-mid-dark,var(--zui-color-lime-dark,#a3e6357a)),var(--zui-skeleton-lime-shimmer-end-dark,var(--zui-color-lime-dark,#a3e6351f)))]`,
  mint: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-mint-shimmer-start,var(--zui-color-mint,#10b9811a)),var(--zui-skeleton-mint-shimmer-mid,var(--zui-color-mint,#10b9816b)),var(--zui-skeleton-mint-shimmer-end,var(--zui-color-mint,#10b9811a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-mint-shimmer-start-dark,var(--zui-color-mint-dark,#6ee7b71f)),var(--zui-skeleton-mint-shimmer-mid-dark,var(--zui-color-mint-dark,#6ee7b77a)),var(--zui-skeleton-mint-shimmer-end-dark,var(--zui-color-mint-dark,#6ee7b71f)))]`,
  ocean: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-ocean-shimmer-start,var(--zui-color-ocean,#0284c71a)),var(--zui-skeleton-ocean-shimmer-mid,var(--zui-color-ocean,#0284c76b)),var(--zui-skeleton-ocean-shimmer-end,var(--zui-color-ocean,#0284c71a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-ocean-shimmer-start-dark,var(--zui-color-ocean-dark,#38bdf81f)),var(--zui-skeleton-ocean-shimmer-mid-dark,var(--zui-color-ocean-dark,#38bdf87a)),var(--zui-skeleton-ocean-shimmer-end-dark,var(--zui-color-ocean-dark,#38bdf81f)))]`,
  sapphire: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-sapphire-shimmer-start,var(--zui-color-sapphire,#1d4ed81a)),var(--zui-skeleton-sapphire-shimmer-mid,var(--zui-color-sapphire,#1d4ed86b)),var(--zui-skeleton-sapphire-shimmer-end,var(--zui-color-sapphire,#1d4ed81a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-sapphire-shimmer-start-dark,var(--zui-color-sapphire-dark,#60a5fa1f)),var(--zui-skeleton-sapphire-shimmer-mid-dark,var(--zui-color-sapphire-dark,#60a5fa7a)),var(--zui-skeleton-sapphire-shimmer-end-dark,var(--zui-color-sapphire-dark,#60a5fa1f)))]`,
  lavender: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-lavender-shimmer-start,var(--zui-color-lavender,#8b5cf61a)),var(--zui-skeleton-lavender-shimmer-mid,var(--zui-color-lavender,#8b5cf66b)),var(--zui-skeleton-lavender-shimmer-end,var(--zui-color-lavender,#8b5cf61a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-lavender-shimmer-start-dark,var(--zui-color-lavender-dark,#a78bfa1f)),var(--zui-skeleton-lavender-shimmer-mid-dark,var(--zui-color-lavender-dark,#a78bfa7a)),var(--zui-skeleton-lavender-shimmer-end-dark,var(--zui-color-lavender-dark,#a78bfa1f)))]`,
  ruby: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-ruby-shimmer-start,var(--zui-color-ruby,#be123c1a)),var(--zui-skeleton-ruby-shimmer-mid,var(--zui-color-ruby,#be123c6b)),var(--zui-skeleton-ruby-shimmer-end,var(--zui-color-ruby,#be123c1a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-ruby-shimmer-start-dark,var(--zui-color-ruby-dark,#fb71851f)),var(--zui-skeleton-ruby-shimmer-mid-dark,var(--zui-color-ruby-dark,#fb71857a)),var(--zui-skeleton-ruby-shimmer-end-dark,var(--zui-color-ruby-dark,#fb71851f)))]`,
  red: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-red-shimmer-start,var(--zui-color-red,#dc26261a)),var(--zui-skeleton-red-shimmer-mid,var(--zui-color-red,#dc26266b)),var(--zui-skeleton-red-shimmer-end,var(--zui-color-red,#dc26261a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-red-shimmer-start-dark,var(--zui-color-red-dark,#ef44441f)),var(--zui-skeleton-red-shimmer-mid-dark,var(--zui-color-red-dark,#ef44447a)),var(--zui-skeleton-red-shimmer-end-dark,var(--zui-color-red-dark,#ef44441f)))]`,
  slate: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-slate-shimmer-start,var(--zui-color-slate,#4755691a)),var(--zui-skeleton-slate-shimmer-mid,var(--zui-color-slate,#4755696b)),var(--zui-skeleton-slate-shimmer-end,var(--zui-color-slate,#4755691a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-slate-shimmer-start-dark,var(--zui-color-slate-dark,#64748b1f)),var(--zui-skeleton-slate-shimmer-mid-dark,var(--zui-color-slate-dark,#64748b7a)),var(--zui-skeleton-slate-shimmer-end-dark,var(--zui-color-slate-dark,#64748b1f)))]`,
  zinc: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-zinc-shimmer-start,var(--zui-color-zinc,#52525b1a)),var(--zui-skeleton-zinc-shimmer-mid,var(--zui-color-zinc,#52525b6b)),var(--zui-skeleton-zinc-shimmer-end,var(--zui-color-zinc,#52525b1a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-zinc-shimmer-start-dark,var(--zui-color-zinc-dark,#71717a1f)),var(--zui-skeleton-zinc-shimmer-mid-dark,var(--zui-color-zinc-dark,#71717a7a)),var(--zui-skeleton-zinc-shimmer-end-dark,var(--zui-color-zinc-dark,#71717a1f)))]`,
  stone: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-stone-shimmer-start,var(--zui-color-stone,#57534e1a)),var(--zui-skeleton-stone-shimmer-mid,var(--zui-color-stone,#57534e6b)),var(--zui-skeleton-stone-shimmer-end,var(--zui-color-stone,#57534e1a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-stone-shimmer-start-dark,var(--zui-color-stone-dark,#78716c1f)),var(--zui-skeleton-stone-shimmer-mid-dark,var(--zui-color-stone-dark,#78716c7a)),var(--zui-skeleton-stone-shimmer-end-dark,var(--zui-color-stone-dark,#78716c1f)))]`,
  royal: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-royal-shimmer-start,var(--zui-color-royal,#4338ca1a)),var(--zui-skeleton-royal-shimmer-mid,var(--zui-color-royal,#4338ca6b)),var(--zui-skeleton-royal-shimmer-end,var(--zui-color-royal,#4338ca1a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-royal-shimmer-start-dark,var(--zui-color-royal-dark,#818cf81f)),var(--zui-skeleton-royal-shimmer-mid-dark,var(--zui-color-royal-dark,#818cf87a)),var(--zui-skeleton-royal-shimmer-end-dark,var(--zui-color-royal-dark,#818cf81f)))]`,
  electric: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-electric-shimmer-start,var(--zui-color-electric,#0ea5e91a)),var(--zui-skeleton-electric-shimmer-mid,var(--zui-color-electric,#0ea5e96b)),var(--zui-skeleton-electric-shimmer-end,var(--zui-color-electric,#0ea5e91a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-electric-shimmer-start-dark,var(--zui-color-electric-dark,#38bdf81f)),var(--zui-skeleton-electric-shimmer-mid-dark,var(--zui-color-electric-dark,#38bdf87a)),var(--zui-skeleton-electric-shimmer-end-dark,var(--zui-color-electric-dark,#38bdf81f)))]`,
  forest: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-forest-shimmer-start,var(--zui-color-forest,#1665341a)),var(--zui-skeleton-forest-shimmer-mid,var(--zui-color-forest,#1665346b)),var(--zui-skeleton-forest-shimmer-end,var(--zui-color-forest,#1665341a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-forest-shimmer-start-dark,var(--zui-color-forest-dark,#4ade801f)),var(--zui-skeleton-forest-shimmer-mid-dark,var(--zui-color-forest-dark,#4ade807a)),var(--zui-skeleton-forest-shimmer-end-dark,var(--zui-color-forest-dark,#4ade801f)))]`,
  sunset: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-sunset-shimmer-start,var(--zui-color-sunset,#ea580c1a)),var(--zui-skeleton-sunset-shimmer-mid,var(--zui-color-sunset,#ea580c6b)),var(--zui-skeleton-sunset-shimmer-end,var(--zui-color-sunset,#ea580c1a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-sunset-shimmer-start-dark,var(--zui-color-sunset-dark,#fb923c1f)),var(--zui-skeleton-sunset-shimmer-mid-dark,var(--zui-color-sunset-dark,#fb923c7a)),var(--zui-skeleton-sunset-shimmer-end-dark,var(--zui-color-sunset-dark,#fb923c1f)))]`,
  magenta: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-magenta-shimmer-start,var(--zui-color-magenta,#c026d31a)),var(--zui-skeleton-magenta-shimmer-mid,var(--zui-color-magenta,#c026d36b)),var(--zui-skeleton-magenta-shimmer-end,var(--zui-color-magenta,#c026d31a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-magenta-shimmer-start-dark,var(--zui-color-magenta-dark,#e879f91f)),var(--zui-skeleton-magenta-shimmer-mid-dark,var(--zui-color-magenta-dark,#e879f97a)),var(--zui-skeleton-magenta-shimmer-end-dark,var(--zui-color-magenta-dark,#e879f91f)))]`,
  crimson: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-crimson-shimmer-start,var(--zui-color-crimson,#b91c1c1a)),var(--zui-skeleton-crimson-shimmer-mid,var(--zui-color-crimson,#b91c1c6b)),var(--zui-skeleton-crimson-shimmer-end,var(--zui-color-crimson,#b91c1c1a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-crimson-shimmer-start-dark,var(--zui-color-crimson-dark,#f871711f)),var(--zui-skeleton-crimson-shimmer-mid-dark,var(--zui-color-crimson-dark,#f871717a)),var(--zui-skeleton-crimson-shimmer-end-dark,var(--zui-color-crimson-dark,#f871711f)))]`,
  aqua: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-aqua-shimmer-start,var(--zui-color-aqua,#0f766e1a)),var(--zui-skeleton-aqua-shimmer-mid,var(--zui-color-aqua,#0f766e6b)),var(--zui-skeleton-aqua-shimmer-end,var(--zui-color-aqua,#0f766e1a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-aqua-shimmer-start-dark,var(--zui-color-aqua-dark,#2dd4bf1f)),var(--zui-skeleton-aqua-shimmer-mid-dark,var(--zui-color-aqua-dark,#2dd4bf7a)),var(--zui-skeleton-aqua-shimmer-end-dark,var(--zui-color-aqua-dark,#2dd4bf1f)))]`,
  plum: `${shimmerLayer} [background-image:linear-gradient(90deg,var(--zui-skeleton-plum-shimmer-start,var(--zui-color-plum,#7e22ce1a)),var(--zui-skeleton-plum-shimmer-mid,var(--zui-color-plum,#7e22ce6b)),var(--zui-skeleton-plum-shimmer-end,var(--zui-color-plum,#7e22ce1a)))] dark:[background-image:linear-gradient(90deg,var(--zui-skeleton-plum-shimmer-start-dark,var(--zui-color-plum-dark,#c084fc1f)),var(--zui-skeleton-plum-shimmer-mid-dark,var(--zui-color-plum-dark,#c084fc7a)),var(--zui-skeleton-plum-shimmer-end-dark,var(--zui-color-plum-dark,#c084fc1f)))]`,
} as const;

export type ZuiSkeletonShimmerTone =
  keyof typeof zuiSkeletonShimmerGradientClasses;

export const zuiSkeletonBase =
  "relative overflow-hidden bg-[var(--zui-skeleton-bg,var(--zui-surface-muted,#0000001a))] dark:bg-[var(--zui-skeleton-bg-dark,var(--zui-surface-muted-dark,#ffffff1a))] text-[color:var(--zui-skeleton-fg,var(--zui-fg,transparent))] dark:text-[color:var(--zui-skeleton-fg-dark,var(--zui-fg-dark,transparent))]";

export const zuiSkeletonAppearances = {
  default:
    "bg-[var(--zui-skeleton-default-bg,var(--zui-surface-muted,#0000001a))] dark:bg-[var(--zui-skeleton-default-bg-dark,var(--zui-surface-muted-dark,#ffffff1a))]",
  subtle:
    "bg-[var(--zui-skeleton-subtle-bg,var(--zui-surface-muted,#00000012))] dark:bg-[var(--zui-skeleton-subtle-bg-dark,var(--zui-surface-muted-dark,#ffffff12))]",
  muted:
    "bg-[var(--zui-skeleton-muted-bg,var(--zui-fg-muted,oklch(92.9%_0.013_255.508_/_0.8)))] dark:bg-[var(--zui-skeleton-muted-bg-dark,var(--zui-fg-muted-dark,oklch(27.9%_0.041_260.031_/_0.8)))]",
  sky: "bg-[var(--zui-skeleton-sky-bg,color-mix(in_oklch,var(--zui-color-sky,oklch(68.5%_0.169_237.323))_10%,transparent))] dark:bg-[var(--zui-skeleton-sky-bg-dark,color-mix(in_oklch,var(--zui-color-sky-dark,oklch(68.5%_0.169_237.323))_18%,transparent))]",
  rose: "bg-[var(--zui-skeleton-rose-bg,color-mix(in_oklch,var(--zui-color-rose,oklch(64.5%_0.246_16.439))_10%,transparent))] dark:bg-[var(--zui-skeleton-rose-bg-dark,color-mix(in_oklch,var(--zui-color-rose-dark,oklch(64.5%_0.246_16.439))_18%,transparent))]",
  purple:
    "bg-[var(--zui-skeleton-purple-bg,color-mix(in_oklch,var(--zui-color-purple,oklch(62.7%_0.265_303.9))_10%,transparent))] dark:bg-[var(--zui-skeleton-purple-bg-dark,color-mix(in_oklch,var(--zui-color-purple-dark,oklch(62.7%_0.265_303.9))_18%,transparent))]",
  pink: "bg-[var(--zui-skeleton-pink-bg,color-mix(in_oklch,var(--zui-color-pink,oklch(65.6%_0.241_354.308))_10%,transparent))] dark:bg-[var(--zui-skeleton-pink-bg-dark,color-mix(in_oklch,var(--zui-color-pink-dark,oklch(65.6%_0.241_354.308))_18%,transparent))]",
  orange:
    "bg-[var(--zui-skeleton-orange-bg,color-mix(in_oklch,var(--zui-color-orange,oklch(70.5%_0.213_47.604))_10%,transparent))] dark:bg-[var(--zui-skeleton-orange-bg-dark,color-mix(in_oklch,var(--zui-color-orange-dark,oklch(70.5%_0.213_47.604))_18%,transparent))]",
  yellow:
    "bg-[var(--zui-skeleton-yellow-bg,color-mix(in_oklch,var(--zui-color-yellow,oklch(79.5%_0.184_86.047))_10%,transparent))] dark:bg-[var(--zui-skeleton-yellow-bg-dark,color-mix(in_oklch,var(--zui-color-yellow-dark,oklch(79.5%_0.184_86.047))_18%,transparent))]",
  teal: "bg-[var(--zui-skeleton-teal-bg,color-mix(in_oklch,var(--zui-color-teal,oklch(70.4%_0.14_182.503))_10%,transparent))] dark:bg-[var(--zui-skeleton-teal-bg-dark,color-mix(in_oklch,var(--zui-color-teal-dark,oklch(70.4%_0.14_182.503))_18%,transparent))]",
  indigo:
    "bg-[var(--zui-skeleton-indigo-bg,color-mix(in_oklch,var(--zui-color-indigo,oklch(58.5%_0.233_277.117))_10%,transparent))] dark:bg-[var(--zui-skeleton-indigo-bg-dark,color-mix(in_oklch,var(--zui-color-indigo-dark,oklch(58.5%_0.233_277.117))_18%,transparent))]",
  emerald:
    "bg-[var(--zui-skeleton-emerald-bg,color-mix(in_oklch,var(--zui-color-emerald,oklch(69.6%_0.17_162.48))_10%,transparent))] dark:bg-[var(--zui-skeleton-emerald-bg-dark,color-mix(in_oklch,var(--zui-color-emerald-dark,oklch(69.6%_0.17_162.48))_18%,transparent))]",
  gray: "bg-[var(--zui-skeleton-gray-bg,color-mix(in_oklch,var(--zui-color-gray,oklch(55.1%_0.027_264.364))_10%,transparent))] dark:bg-[var(--zui-skeleton-gray-bg-dark,color-mix(in_oklch,var(--zui-color-gray-dark,oklch(55.1%_0.027_264.364))_18%,transparent))]",
  amber:
    "bg-[var(--zui-skeleton-amber-bg,color-mix(in_oklch,var(--zui-color-amber,oklch(76.9%_0.188_70.08))_10%,transparent))] dark:bg-[var(--zui-skeleton-amber-bg-dark,color-mix(in_oklch,var(--zui-color-amber-dark,oklch(76.9%_0.188_70.08))_18%,transparent))]",
  violet:
    "bg-[var(--zui-skeleton-violet-bg,color-mix(in_oklch,var(--zui-color-violet,oklch(60.6%_0.25_292.717))_10%,transparent))] dark:bg-[var(--zui-skeleton-violet-bg-dark,color-mix(in_oklch,var(--zui-color-violet-dark,oklch(60.6%_0.25_292.717))_18%,transparent))]",
  "gradient-blue":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-blue-from,var(--zui-color-blue,oklch(42.4%_0.199_265.638)))] dark:from-[var(--zui-skeleton-gradient-blue-from-dark,var(--zui-color-blue-dark,oklch(54.6%_0.245_262.881)))] to-[var(--zui-skeleton-gradient-blue-to,var(--zui-color-purple,oklch(43.8%_0.218_303.724)))] dark:to-[var(--zui-skeleton-gradient-blue-to-dark,var(--zui-color-purple-dark,oklch(55.8%_0.288_302.321)))]",
  "gradient-green":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-green-from,var(--zui-color-green,oklch(44.8%_0.119_151.328)))] dark:from-[var(--zui-skeleton-gradient-green-from-dark,var(--zui-color-green-dark,oklch(62.7%_0.194_149.214)))] to-[var(--zui-skeleton-gradient-green-to,var(--zui-color-lime,oklch(45.3%_0.124_130.933)))] dark:to-[var(--zui-skeleton-gradient-green-to-dark,var(--zui-color-lime-dark,oklch(64.8%_0.2_131.684)))]",
  "gradient-red":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-red-from,var(--zui-color-red,oklch(44.4%_0.177_26.899)))] dark:from-[var(--zui-skeleton-gradient-red-from-dark,var(--zui-color-red-dark,oklch(57.7%_0.245_27.325)))] to-[var(--zui-skeleton-gradient-red-to,var(--zui-color-pink,oklch(45.9%_0.187_3.815)))] dark:to-[var(--zui-skeleton-gradient-red-to-dark,var(--zui-color-pink-dark,oklch(59.2%_0.249_0.584)))]",
  "gradient-yellow":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-yellow-from,var(--zui-color-yellow,oklch(47.6%_0.114_61.907)))] dark:from-[var(--zui-skeleton-gradient-yellow-from-dark,var(--zui-color-yellow-dark,oklch(68.1%_0.162_75.834)))] to-[var(--zui-skeleton-gradient-yellow-to,var(--zui-color-orange,oklch(47%_0.157_37.304)))] dark:to-[var(--zui-skeleton-gradient-yellow-to-dark,var(--zui-color-orange-dark,oklch(64.6%_0.222_41.116)))]",
  "gradient-purple":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-purple-from,var(--zui-color-purple,oklch(43.8%_0.218_303.724)))] dark:from-[var(--zui-skeleton-gradient-purple-from-dark,var(--zui-color-purple-dark,oklch(55.8%_0.288_302.321)))] to-[var(--zui-skeleton-gradient-purple-to,var(--zui-color-pink,oklch(45.9%_0.187_3.815)))] dark:to-[var(--zui-skeleton-gradient-purple-to-dark,var(--zui-color-pink-dark,oklch(59.2%_0.249_0.584)))]",
  "gradient-teal":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-teal-from,var(--zui-color-teal,oklch(43.7%_0.078_188.216)))] dark:from-[var(--zui-skeleton-gradient-teal-from-dark,var(--zui-color-teal-dark,oklch(60%_0.118_184.704)))] to-[var(--zui-skeleton-gradient-teal-to,var(--zui-color-cyan,oklch(45%_0.085_224.283)))] dark:to-[var(--zui-skeleton-gradient-teal-to-dark,var(--zui-color-cyan-dark,oklch(60.9%_0.126_221.723)))]",
  "gradient-indigo":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-indigo-from,var(--zui-color-indigo,oklch(39.8%_0.195_277.366)))] dark:from-[var(--zui-skeleton-gradient-indigo-from-dark,var(--zui-color-indigo-dark,oklch(51.1%_0.262_276.966)))] to-[var(--zui-skeleton-gradient-indigo-to,var(--zui-color-purple,oklch(43.8%_0.218_303.724)))] dark:to-[var(--zui-skeleton-gradient-indigo-to-dark,var(--zui-color-purple-dark,oklch(55.8%_0.288_302.321)))]",
  "gradient-pink":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-pink-from,var(--zui-color-pink,oklch(45.9%_0.187_3.815)))] dark:from-[var(--zui-skeleton-gradient-pink-from-dark,var(--zui-color-pink-dark,oklch(59.2%_0.249_0.584)))] to-[var(--zui-skeleton-gradient-pink-to,var(--zui-color-rose,oklch(45.5%_0.188_13.697)))] dark:to-[var(--zui-skeleton-gradient-pink-to-dark,var(--zui-color-rose-dark,oklch(58.6%_0.253_17.585)))]",
  "gradient-orange":
    "bg-linear-to-r from-[var(--zui-skeleton-gradient-orange-from,var(--zui-color-orange,oklch(47%_0.157_37.304)))] dark:from-[var(--zui-skeleton-gradient-orange-from-dark,var(--zui-color-orange-dark,oklch(64.6%_0.222_41.116)))] to-[var(--zui-skeleton-gradient-orange-to,var(--zui-color-red,oklch(44.4%_0.177_26.899)))] dark:to-[var(--zui-skeleton-gradient-orange-to-dark,var(--zui-color-red-dark,oklch(57.7%_0.245_27.325)))]",
  blue: "bg-[var(--zui-skeleton-blue-bg,color-mix(in_oklch,var(--zui-color-blue,#2563eb)_10%,transparent))] dark:bg-[var(--zui-skeleton-blue-bg-dark,color-mix(in_oklch,var(--zui-color-blue-dark,#3b82f6)_18%,transparent))]",
  cyan: "bg-[var(--zui-skeleton-cyan-bg,color-mix(in_oklch,var(--zui-color-cyan,#0891b2)_10%,transparent))] dark:bg-[var(--zui-skeleton-cyan-bg-dark,color-mix(in_oklch,var(--zui-color-cyan-dark,#22d3ee)_18%,transparent))]",
  green:
    "bg-[var(--zui-skeleton-green-bg,color-mix(in_oklch,var(--zui-color-green,#16a34a)_10%,transparent))] dark:bg-[var(--zui-skeleton-green-bg-dark,color-mix(in_oklch,var(--zui-color-green-dark,#22c55e)_18%,transparent))]",
  lime: "bg-[var(--zui-skeleton-lime-bg,color-mix(in_oklch,var(--zui-color-lime,#65a30d)_10%,transparent))] dark:bg-[var(--zui-skeleton-lime-bg-dark,color-mix(in_oklch,var(--zui-color-lime-dark,#a3e635)_18%,transparent))]",
  mint: "bg-[var(--zui-skeleton-mint-bg,color-mix(in_oklch,var(--zui-color-mint,#10b981)_10%,transparent))] dark:bg-[var(--zui-skeleton-mint-bg-dark,color-mix(in_oklch,var(--zui-color-mint-dark,#6ee7b7)_18%,transparent))]",
  ocean:
    "bg-[var(--zui-skeleton-ocean-bg,color-mix(in_oklch,var(--zui-color-ocean,#0284c7)_10%,transparent))] dark:bg-[var(--zui-skeleton-ocean-bg-dark,color-mix(in_oklch,var(--zui-color-ocean-dark,#38bdf8)_18%,transparent))]",
  sapphire:
    "bg-[var(--zui-skeleton-sapphire-bg,color-mix(in_oklch,var(--zui-color-sapphire,#1d4ed8)_10%,transparent))] dark:bg-[var(--zui-skeleton-sapphire-bg-dark,color-mix(in_oklch,var(--zui-color-sapphire-dark,#60a5fa)_18%,transparent))]",
  lavender:
    "bg-[var(--zui-skeleton-lavender-bg,color-mix(in_oklch,var(--zui-color-lavender,#8b5cf6)_10%,transparent))] dark:bg-[var(--zui-skeleton-lavender-bg-dark,color-mix(in_oklch,var(--zui-color-lavender-dark,#a78bfa)_18%,transparent))]",
  ruby: "bg-[var(--zui-skeleton-ruby-bg,color-mix(in_oklch,var(--zui-color-ruby,#be123c)_10%,transparent))] dark:bg-[var(--zui-skeleton-ruby-bg-dark,color-mix(in_oklch,var(--zui-color-ruby-dark,#fb7185)_18%,transparent))]",
  red: "bg-[var(--zui-skeleton-red-bg,color-mix(in_oklch,var(--zui-color-red,#dc2626)_10%,transparent))] dark:bg-[var(--zui-skeleton-red-bg-dark,color-mix(in_oklch,var(--zui-color-red-dark,#ef4444)_18%,transparent))]",
  slate:
    "bg-[var(--zui-skeleton-slate-bg,color-mix(in_oklch,var(--zui-color-slate,#475569)_10%,transparent))] dark:bg-[var(--zui-skeleton-slate-bg-dark,color-mix(in_oklch,var(--zui-color-slate-dark,#64748b)_18%,transparent))]",
  zinc: "bg-[var(--zui-skeleton-zinc-bg,color-mix(in_oklch,var(--zui-color-zinc,#52525b)_10%,transparent))] dark:bg-[var(--zui-skeleton-zinc-bg-dark,color-mix(in_oklch,var(--zui-color-zinc-dark,#71717a)_18%,transparent))]",
  stone:
    "bg-[var(--zui-skeleton-stone-bg,color-mix(in_oklch,var(--zui-color-stone,#57534e)_10%,transparent))] dark:bg-[var(--zui-skeleton-stone-bg-dark,color-mix(in_oklch,var(--zui-color-stone-dark,#78716c)_18%,transparent))]",
  royal:
    "bg-[var(--zui-skeleton-royal-bg,color-mix(in_oklch,var(--zui-color-royal,#4338ca)_10%,transparent))] dark:bg-[var(--zui-skeleton-royal-bg-dark,color-mix(in_oklch,var(--zui-color-royal-dark,#818cf8)_18%,transparent))]",
  electric:
    "bg-[var(--zui-skeleton-electric-bg,color-mix(in_oklch,var(--zui-color-electric,#0ea5e9)_10%,transparent))] dark:bg-[var(--zui-skeleton-electric-bg-dark,color-mix(in_oklch,var(--zui-color-electric-dark,#38bdf8)_18%,transparent))]",
  forest:
    "bg-[var(--zui-skeleton-forest-bg,color-mix(in_oklch,var(--zui-color-forest,#166534)_10%,transparent))] dark:bg-[var(--zui-skeleton-forest-bg-dark,color-mix(in_oklch,var(--zui-color-forest-dark,#4ade80)_18%,transparent))]",
  sunset:
    "bg-[var(--zui-skeleton-sunset-bg,color-mix(in_oklch,var(--zui-color-sunset,#ea580c)_10%,transparent))] dark:bg-[var(--zui-skeleton-sunset-bg-dark,color-mix(in_oklch,var(--zui-color-sunset-dark,#fb923c)_18%,transparent))]",
  magenta:
    "bg-[var(--zui-skeleton-magenta-bg,color-mix(in_oklch,var(--zui-color-magenta,#c026d3)_10%,transparent))] dark:bg-[var(--zui-skeleton-magenta-bg-dark,color-mix(in_oklch,var(--zui-color-magenta-dark,#e879f9)_18%,transparent))]",
  crimson:
    "bg-[var(--zui-skeleton-crimson-bg,color-mix(in_oklch,var(--zui-color-crimson,#b91c1c)_10%,transparent))] dark:bg-[var(--zui-skeleton-crimson-bg-dark,color-mix(in_oklch,var(--zui-color-crimson-dark,#f87171)_18%,transparent))]",
  aqua: "bg-[var(--zui-skeleton-aqua-bg,color-mix(in_oklch,var(--zui-color-aqua,#0f766e)_10%,transparent))] dark:bg-[var(--zui-skeleton-aqua-bg-dark,color-mix(in_oklch,var(--zui-color-aqua-dark,#2dd4bf)_18%,transparent))]",
  plum: "bg-[var(--zui-skeleton-plum-bg,color-mix(in_oklch,var(--zui-color-plum,#7e22ce)_10%,transparent))] dark:bg-[var(--zui-skeleton-plum-bg-dark,color-mix(in_oklch,var(--zui-color-plum-dark,#c084fc)_18%,transparent))]",
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
