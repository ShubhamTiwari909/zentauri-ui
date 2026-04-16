import type { SkeletonProps } from "@zentauri-ui/zentauri-components/ui";

export type SkeletonAppearance = NonNullable<SkeletonProps["appearance"]>;
export type SkeletonSize = NonNullable<SkeletonProps["size"]>;
export type SkeletonRounded = NonNullable<SkeletonProps["rounded"]>;
export type SkeletonAnimation = NonNullable<SkeletonProps["animation"]>;
export type SkeletonShimmerTone = NonNullable<SkeletonProps["shimmerTone"]>;

export type SkeletonDemoProps = {
  appearance: SkeletonAppearance;
  size: SkeletonSize;
  rounded: SkeletonRounded;
  animation: SkeletonAnimation;
  shimmerTone: SkeletonShimmerTone;
};
