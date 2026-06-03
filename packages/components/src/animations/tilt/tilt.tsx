"use client";

import { createMotionAnimation } from "../shared";

import { tiltPreset } from "./presets";

export const Tilt = createMotionAnimation("Tilt", "animation-tilt", tiltPreset);
