"use client";

import { createMotionAnimation } from "../shared";

import { fadeLeftPreset } from "./presets";

export const FadeLeft = createMotionAnimation(
  "FadeLeft",
  "animation-fade-left",
  fadeLeftPreset,
);
