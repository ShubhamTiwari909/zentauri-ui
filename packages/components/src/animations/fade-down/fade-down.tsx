"use client";

import { createMotionAnimation } from "../shared";

import { fadeDownPreset } from "./presets";

export const FadeDown = createMotionAnimation(
  "FadeDown",
  "animation-fade-down",
  fadeDownPreset,
);
