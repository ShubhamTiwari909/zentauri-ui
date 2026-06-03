"use client";

import { createMotionAnimation } from "../shared";

import { parallaxPreset } from "./presets";

export const Parallax = createMotionAnimation(
  "Parallax",
  "animation-parallax",
  parallaxPreset,
);
