"use client";

import { createMotionAnimation } from "../shared";

import { skeletonShimmerPreset } from "./presets";

export const SkeletonShimmer = createMotionAnimation(
  "SkeletonShimmer",
  "animation-skeleton-shimmer",
  skeletonShimmerPreset,
);
