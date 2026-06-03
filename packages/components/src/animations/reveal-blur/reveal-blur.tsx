"use client";

import { createMotionAnimation } from "../shared";

import { revealBlurPreset } from "./presets";

export const RevealBlur = createMotionAnimation(
  "RevealBlur",
  "animation-reveal-blur",
  revealBlurPreset,
);
