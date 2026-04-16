import { cva } from "class-variance-authority";

const shimmerLayer =
  "[background-size:220%_100%] [background-repeat:no-repeat] [background-position:100%_0%]";

export const skeletonShimmerGradientClasses = {
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

export type SkeletonShimmerTone = keyof typeof skeletonShimmerGradientClasses;

export const skeletonVariants = cva(
  "relative overflow-hidden bg-white/10 text-transparent",
  {
    variants: {
      appearance: {
        default: "bg-white/10",
        subtle: "bg-white/[0.07]",
        muted: "bg-slate-800/80",
        sky: "bg-sky-500/10",
        rose: "bg-rose-500/10",
        purple: "bg-purple-500/10",
        pink: "bg-pink-500/10",
        orange: "bg-orange-500/10",
        yellow: "bg-yellow-500/10",
        teal: "bg-teal-500/10",
        indigo: "bg-indigo-500/10",
        emerald: "bg-emerald-500/10",
        gray: "bg-gray-500/10",
        amber: "bg-amber-500/10",
        violet: "bg-violet-500/10",
        "gradient-blue": "bg-gradient-to-r from-blue-600 to-purple-600",
        "gradient-green": "bg-gradient-to-r from-green-600 to-lime-600",
        "gradient-red": "bg-gradient-to-r from-red-600 to-pink-600",
        "gradient-yellow": "bg-gradient-to-r from-yellow-600 to-orange-600",
        "gradient-purple": "bg-gradient-to-r from-purple-600 to-pink-600",
        "gradient-teal": "bg-gradient-to-r from-teal-600 to-cyan-600",
        "gradient-indigo": "bg-gradient-to-r from-indigo-600 to-purple-600",
        "gradient-pink": "bg-gradient-to-r from-pink-600 to-rose-600",
        "gradient-orange": "bg-gradient-to-r from-orange-600 to-red-600",
      },
      size: {
        sm: "min-h-3",
        md: "min-h-4",
        lg: "min-h-6",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
      animation: {
        none: "",
        shimmer: "",
        pulse: "",
      },
      shimmerTone: {
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
      },
    },
    compoundVariants: [
      {
        animation: "shimmer",
        shimmerTone: "default",
        class: skeletonShimmerGradientClasses.default,
      },
      {
        animation: "shimmer",
        shimmerTone: "muted",
        class: skeletonShimmerGradientClasses.subtle,
      },
      {
        animation: "shimmer",
        shimmerTone: "subtle",
        class: skeletonShimmerGradientClasses.subtle,
      },
      {
        animation: "shimmer",
        shimmerTone: "sky",
        class: skeletonShimmerGradientClasses.sky,
      },
      {
        animation: "shimmer",
        shimmerTone: "rose",
        class: skeletonShimmerGradientClasses.rose,
      },
      {
        animation: "shimmer",
        shimmerTone: "purple",
        class: skeletonShimmerGradientClasses.purple,
      },
      {
        animation: "shimmer",
        shimmerTone: "pink",
        class: skeletonShimmerGradientClasses.pink,
      },
      {
        animation: "shimmer",
        shimmerTone: "orange",
        class: skeletonShimmerGradientClasses.orange,
      },
      {
        animation: "shimmer",
        shimmerTone: "yellow",
        class: skeletonShimmerGradientClasses.yellow,
      },
      {
        animation: "shimmer",
        shimmerTone: "teal",
        class: skeletonShimmerGradientClasses.teal,
      },
      {
        animation: "shimmer",
        shimmerTone: "indigo",
        class: skeletonShimmerGradientClasses.indigo,
      },
      {
        animation: "shimmer",
        shimmerTone: "emerald",
        class: skeletonShimmerGradientClasses.emerald,
      },
      {
        animation: "shimmer",
        shimmerTone: "gray",
        class: skeletonShimmerGradientClasses.gray,
      },
      {
        animation: "shimmer",
        shimmerTone: "amber",
        class: skeletonShimmerGradientClasses.amber,
      },
      {
        animation: "shimmer",
        shimmerTone: "violet",
        class: skeletonShimmerGradientClasses.violet,
      },
      {
        animation: "shimmer",
        shimmerTone: "gradient-blue",
        class: skeletonShimmerGradientClasses["gradient-blue"],
      },
      {
        animation: "shimmer",
        shimmerTone: "gradient-green",
        class: skeletonShimmerGradientClasses["gradient-green"],
      },
      {
        animation: "shimmer",
        shimmerTone: "gradient-red",
        class: skeletonShimmerGradientClasses["gradient-red"],
      },
      {
        animation: "shimmer",
        shimmerTone: "gradient-yellow",
        class: skeletonShimmerGradientClasses["gradient-yellow"],
      },
      {
        animation: "shimmer",
        shimmerTone: "gradient-purple",
        class: skeletonShimmerGradientClasses["gradient-purple"],
      },
      {
        animation: "shimmer",
        shimmerTone: "gradient-teal",
        class: skeletonShimmerGradientClasses["gradient-teal"],
      },
      {
        animation: "shimmer",
        shimmerTone: "gradient-indigo",
        class: skeletonShimmerGradientClasses["gradient-indigo"],
      },
      {
        animation: "shimmer",
        shimmerTone: "gradient-pink",
        class: skeletonShimmerGradientClasses["gradient-pink"],
      },
      {
        animation: "shimmer",
        shimmerTone: "gradient-orange",
        class: skeletonShimmerGradientClasses["gradient-orange"],
      },
      {
        animation: "pulse",
        class: "",
      },
    ],
    defaultVariants: {
      appearance: "default",
      size: "md",
      rounded: "md",
      animation: "shimmer",
      shimmerTone: "default",
    },
  },
);

export const skeletonTextLineVariants = cva("block w-full", {
  variants: {
    size: {
      sm: "h-2.5",
      md: "h-3",
      lg: "h-4",
    },
  },
  defaultVariants: { size: "md" },
});
