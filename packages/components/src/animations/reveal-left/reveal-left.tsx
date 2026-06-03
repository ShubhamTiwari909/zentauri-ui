"use client";

import { createMotionAnimation } from "../shared";

import { revealLeftPreset } from "./presets";

export const RevealLeft = createMotionAnimation(
  "RevealLeft",
  "animation-reveal-left",
  revealLeftPreset,
);
