"use client";

import { createMotionAnimation } from "../shared";

import { revealDownPreset } from "./presets";

export const RevealDown = createMotionAnimation(
  "RevealDown",
  "animation-reveal-down",
  revealDownPreset,
);
