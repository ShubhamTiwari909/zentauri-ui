"use client";

import { createMotionAnimation } from "../shared";

import { popInPreset } from "./presets";

export const PopIn = createMotionAnimation(
  "PopIn",
  "animation-pop-in",
  popInPreset,
);
