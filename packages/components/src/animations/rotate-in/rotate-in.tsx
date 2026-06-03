"use client";

import { createMotionAnimation } from "../shared";

import { rotateInPreset } from "./presets";

export const RotateIn = createMotionAnimation(
  "RotateIn",
  "animation-rotate-in",
  rotateInPreset,
);
