"use client";

import { createMotionAnimation } from "../shared";

import { shakePreset } from "./presets";

export const Shake = createMotionAnimation(
  "Shake",
  "animation-shake",
  shakePreset,
);
