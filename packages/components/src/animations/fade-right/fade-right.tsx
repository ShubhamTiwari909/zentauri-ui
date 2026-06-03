"use client";

import { createMotionAnimation } from "../shared";

import { fadeRightPreset } from "./presets";

export const FadeRight = createMotionAnimation(
  "FadeRight",
  "animation-fade-right",
  fadeRightPreset,
);
