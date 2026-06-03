"use client";

import { createMotionAnimation } from "../shared";

import { floatPreset } from "./presets";

export const Float = createMotionAnimation(
  "Float",
  "animation-float",
  floatPreset,
);
