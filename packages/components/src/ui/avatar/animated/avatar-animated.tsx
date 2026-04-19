"use client";

import { motion } from "framer-motion";

import { avatarAnimationPresets } from "./animations";
import { AvatarBase } from "../avatar-base";
import type { AvatarAnimatedProps } from "./types";

export function AvatarAnimated({
  animation = "none",
  ...props
}: AvatarAnimatedProps) {
  const motionProps = avatarAnimationPresets[animation];

  return (
    <AvatarBase
      as={motion.span}
      initial={animation === "none" ? false : undefined}
      {...motionProps}
      {...props}
    />
  );
}

AvatarAnimated.displayName = "AvatarAnimated";
