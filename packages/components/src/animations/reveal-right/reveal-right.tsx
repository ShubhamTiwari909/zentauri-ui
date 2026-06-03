"use client";

import { createMotionAnimation } from "../shared";

import { revealRightPreset } from "./presets";

export const RevealRight = createMotionAnimation(
  "RevealRight",
  "animation-reveal-right",
  revealRightPreset,
);
