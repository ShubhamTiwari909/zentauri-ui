"use client";

import { createMotionAnimation } from "../shared";

import { slideRightPreset } from "./presets";

export const SlideRight = createMotionAnimation(
  "SlideRight",
  "animation-slide-right",
  slideRightPreset,
);
