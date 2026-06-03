"use client";

import { createMotionAnimation } from "../shared";

import { blurInPreset } from "./presets";

export const BlurIn = createMotionAnimation(
  "BlurIn",
  "animation-blur-in",
  blurInPreset,
);
