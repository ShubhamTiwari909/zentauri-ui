"use client";

import { createMotionAnimation } from "../shared";

import { progressPreset } from "./presets";

export const Progress = createMotionAnimation(
  "Progress",
  "animation-progress",
  progressPreset,
);
