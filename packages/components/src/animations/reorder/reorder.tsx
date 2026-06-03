"use client";

import { createMotionAnimation } from "../shared";

import { reorderPreset } from "./presets";

export const Reorder = createMotionAnimation(
  "Reorder",
  "animation-reorder",
  reorderPreset,
);
