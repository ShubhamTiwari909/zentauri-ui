"use client";

import { motion } from "framer-motion";

import { badgeAnimationPresets } from "./animations";
import { BadgeBase } from "../badge-base";
import type { BadgeBaseProps } from "../types";
import type { BadgeAnimatedProps } from "./types";

export function BadgeAnimated({
  animation = "none",
  ...props
}: BadgeAnimatedProps) {
  const motionProps = badgeAnimationPresets[animation];

  return (
    <BadgeBase
      {...({
        as: motion.span,
        initial: animation === "none" ? false : undefined,
        ...motionProps,
        ...props,
      } as BadgeBaseProps)}
    />
  );
}

BadgeAnimated.displayName = "BadgeAnimated";
