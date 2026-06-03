"use client";

import { createMotionAnimation } from "../shared";

import { blurOutPreset } from "./presets";

export const BlurOut = createMotionAnimation(
  "BlurOut",
  "animation-blur-out",
  blurOutPreset,
);
