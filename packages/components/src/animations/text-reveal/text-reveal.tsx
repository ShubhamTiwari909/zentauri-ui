"use client";

import { createMotionAnimation } from "../shared";

import { textRevealPreset } from "./presets";

export const TextReveal = createMotionAnimation(
  "TextReveal",
  "animation-text-reveal",
  textRevealPreset,
);
