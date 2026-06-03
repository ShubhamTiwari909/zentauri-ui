"use client";

import { createMotionAnimation } from "../shared";

import { bouncePreset } from "./presets";

export const Bounce = createMotionAnimation(
  "Bounce",
  "animation-bounce",
  bouncePreset,
);
