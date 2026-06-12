import { cva } from "class-variance-authority";

import {
  zuiSkeletonAnimations,
  zuiSkeletonAppearances,
  zuiSkeletonBase,
  zuiSkeletonRounded,
  zuiSkeletonShimmerGradientClasses,
  zuiSkeletonShimmerTones,
  zuiSkeletonSizes,
  zuiSkeletonTextLineBase,
  zuiSkeletonTextLineSizes,
  type ZuiSkeletonShimmerTone,
} from "../../design-system/skeleton";

export const skeletonShimmerGradientClasses = zuiSkeletonShimmerGradientClasses;
export type SkeletonShimmerTone = ZuiSkeletonShimmerTone;

export const skeletonVariants = cva(zuiSkeletonBase, {
  variants: {
    appearance: zuiSkeletonAppearances,
    size: zuiSkeletonSizes,
    rounded: zuiSkeletonRounded,
    animation: zuiSkeletonAnimations,
    shimmerTone: zuiSkeletonShimmerTones,
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
      animation: "shimmer",
      shimmerTone: "blue",
      class: skeletonShimmerGradientClasses.blue,
    },
    {
      animation: "shimmer",
      shimmerTone: "cyan",
      class: skeletonShimmerGradientClasses.cyan,
    },
    {
      animation: "shimmer",
      shimmerTone: "green",
      class: skeletonShimmerGradientClasses.green,
    },
    {
      animation: "shimmer",
      shimmerTone: "lime",
      class: skeletonShimmerGradientClasses.lime,
    },
    {
      animation: "shimmer",
      shimmerTone: "mint",
      class: skeletonShimmerGradientClasses.mint,
    },
    {
      animation: "shimmer",
      shimmerTone: "ocean",
      class: skeletonShimmerGradientClasses.ocean,
    },
    {
      animation: "shimmer",
      shimmerTone: "sapphire",
      class: skeletonShimmerGradientClasses.sapphire,
    },
    {
      animation: "shimmer",
      shimmerTone: "lavender",
      class: skeletonShimmerGradientClasses.lavender,
    },
    {
      animation: "shimmer",
      shimmerTone: "ruby",
      class: skeletonShimmerGradientClasses.ruby,
    },
    {
      animation: "shimmer",
      shimmerTone: "red",
      class: skeletonShimmerGradientClasses.red,
    },
    {
      animation: "shimmer",
      shimmerTone: "slate",
      class: skeletonShimmerGradientClasses.slate,
    },
    {
      animation: "shimmer",
      shimmerTone: "zinc",
      class: skeletonShimmerGradientClasses.zinc,
    },
    {
      animation: "shimmer",
      shimmerTone: "stone",
      class: skeletonShimmerGradientClasses.stone,
    },
    {
      animation: "shimmer",
      shimmerTone: "royal",
      class: skeletonShimmerGradientClasses.royal,
    },
    {
      animation: "shimmer",
      shimmerTone: "electric",
      class: skeletonShimmerGradientClasses.electric,
    },
    {
      animation: "shimmer",
      shimmerTone: "forest",
      class: skeletonShimmerGradientClasses.forest,
    },
    {
      animation: "shimmer",
      shimmerTone: "sunset",
      class: skeletonShimmerGradientClasses.sunset,
    },
    {
      animation: "shimmer",
      shimmerTone: "magenta",
      class: skeletonShimmerGradientClasses.magenta,
    },
    {
      animation: "shimmer",
      shimmerTone: "crimson",
      class: skeletonShimmerGradientClasses.crimson,
    },
    {
      animation: "shimmer",
      shimmerTone: "aqua",
      class: skeletonShimmerGradientClasses.aqua,
    },
    {
      animation: "shimmer",
      shimmerTone: "plum",
      class: skeletonShimmerGradientClasses.plum,
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
});

export const skeletonTextLineVariants = cva(zuiSkeletonTextLineBase, {
  variants: {
    size: zuiSkeletonTextLineSizes,
  },
  defaultVariants: { size: "md" },
});
