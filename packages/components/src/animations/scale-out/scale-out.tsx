"use client";

import { createMotionAnimation } from "../shared";

import { scaleOutPreset } from "./presets";

export const ScaleOut = createMotionAnimation(
  "ScaleOut",
  "animation-scale-out",
  scaleOutPreset,
);
