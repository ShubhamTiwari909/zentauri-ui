"use client";

import { createMotionAnimation } from "../shared";

import { magneticPreset } from "./presets";

export const Magnetic = createMotionAnimation(
  "Magnetic",
  "animation-magnetic",
  magneticPreset,
);
