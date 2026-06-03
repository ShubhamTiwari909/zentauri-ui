"use client";

import { createMotionAnimation } from "../shared";

import { scaleInPreset } from "./presets";

export const ScaleIn = createMotionAnimation(
  "ScaleIn",
  "animation-scale-in",
  scaleInPreset,
);
