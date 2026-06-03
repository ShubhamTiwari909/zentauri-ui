"use client";

import { createMotionAnimation } from "../shared";

import { fadeOutPreset } from "./presets";

export const FadeOut = createMotionAnimation(
  "FadeOut",
  "animation-fade-out",
  fadeOutPreset,
);
