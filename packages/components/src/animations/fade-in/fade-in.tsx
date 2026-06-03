"use client";

import { createMotionAnimation } from "../shared";

import { fadeInPreset } from "./presets";

export const FadeIn = createMotionAnimation(
  "FadeIn",
  "animation-fade-in",
  fadeInPreset,
);
