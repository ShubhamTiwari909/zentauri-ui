"use client";

import { createMotionAnimation } from "../shared";

import { hoverScalePreset } from "./presets";

export const HoverScale = createMotionAnimation(
  "HoverScale",
  "animation-hover-scale",
  hoverScalePreset,
);
