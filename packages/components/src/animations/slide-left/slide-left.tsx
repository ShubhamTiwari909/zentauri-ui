"use client";

import { createMotionAnimation } from "../shared";

import { slideLeftPreset } from "./presets";

export const SlideLeft = createMotionAnimation(
  "SlideLeft",
  "animation-slide-left",
  slideLeftPreset,
);
