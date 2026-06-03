"use client";

import { createMotionAnimation } from "../shared";

import { revealUpPreset } from "./presets";

export const RevealUp = createMotionAnimation(
  "RevealUp",
  "animation-reveal-up",
  revealUpPreset,
);
