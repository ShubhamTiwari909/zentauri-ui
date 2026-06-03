"use client";

import { createMotionAnimation } from "../shared";

import { slideUpPreset } from "./presets";

export const SlideUp = createMotionAnimation(
  "SlideUp",
  "animation-slide-up",
  slideUpPreset,
);
