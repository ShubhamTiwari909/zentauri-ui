"use client";

import { createMotionAnimation } from "../shared";

import { flipPreset } from "./presets";

export const Flip = createMotionAnimation("Flip", "animation-flip", flipPreset);
