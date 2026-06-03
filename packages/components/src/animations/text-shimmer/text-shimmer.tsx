"use client";

import { createMotionAnimation } from "../shared";

import { textShimmerPreset } from "./presets";

export const TextShimmer = createMotionAnimation(
  "TextShimmer",
  "animation-text-shimmer",
  textShimmerPreset,
);
