"use client";

import { createMotionAnimation } from "../shared";

import { fadeUpPreset } from "./presets";

export const FadeUp = createMotionAnimation(
  "FadeUp",
  "animation-fade-up",
  fadeUpPreset,
);
