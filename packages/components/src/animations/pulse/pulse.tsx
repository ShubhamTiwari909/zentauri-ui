"use client";

import { createMotionAnimation } from "../shared";

import { pulsePreset } from "./presets";

export const Pulse = createMotionAnimation(
  "Pulse",
  "animation-pulse",
  pulsePreset,
);
