"use client";

import { createMotionAnimation } from "../shared";

import { flipInPreset } from "./presets";

export const FlipIn = createMotionAnimation(
  "FlipIn",
  "animation-flip-in",
  flipInPreset,
);
