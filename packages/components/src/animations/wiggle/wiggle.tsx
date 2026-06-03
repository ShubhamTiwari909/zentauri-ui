"use client";

import { createMotionAnimation } from "../shared";

import { wigglePreset } from "./presets";

export const Wiggle = createMotionAnimation(
  "Wiggle",
  "animation-wiggle",
  wigglePreset,
);
