"use client";

import { createMotionAnimation } from "../shared";

import { pingPreset } from "./presets";

export const Ping = createMotionAnimation("Ping", "animation-ping", pingPreset);
