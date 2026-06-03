"use client";

import { motion } from "framer-motion";

import { KbdBase } from "../kbd-base";
import type { KbdBaseProps } from "../types";

import { kbdAnimationPresets } from "./animations";
import type { KbdAnimatedProps } from "./types";

export function KbdAnimated({
  animation = "none",
  ...props
}: KbdAnimatedProps) {
  const motionProps = kbdAnimationPresets[animation];

  return (
    <KbdBase
      {...({
        as: motion.span,
        initial: animation === "none" ? false : undefined,
        ...motionProps,
        ...props,
      } as KbdBaseProps)}
    />
  );
}

KbdAnimated.displayName = "KbdAnimated";
