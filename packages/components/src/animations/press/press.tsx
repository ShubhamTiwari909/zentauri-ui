"use client";

import { createMotionAnimation } from "../shared";

import { pressPreset } from "./presets";

export const Press = createMotionAnimation(
  "Press",
  "animation-press",
  pressPreset,
);
