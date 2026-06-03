"use client";

import { createMotionAnimation } from "../shared";

import { slideDownPreset } from "./presets";

export const SlideDown = createMotionAnimation(
  "SlideDown",
  "animation-slide-down",
  slideDownPreset,
);
