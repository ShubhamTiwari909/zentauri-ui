"use client";

import { createMotionAnimation } from "../shared";

import { hoverLiftPreset } from "./presets";

export const HoverLift = createMotionAnimation(
  "HoverLift",
  "animation-hover-lift",
  hoverLiftPreset,
);
