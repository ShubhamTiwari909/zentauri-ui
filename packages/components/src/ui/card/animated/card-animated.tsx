"use client";

import { motion } from "framer-motion";

import { cardAnimationPresets } from "./animations";
import { CardBase } from "../card-base";
import type { CardBaseProps } from "../types";
import type { CardAnimatedProps } from "./types";

export function CardAnimated({
  animation = "none",
  ...props
}: CardAnimatedProps) {
  const motionProps = cardAnimationPresets[animation];

  return (
    <CardBase
      {...({
        as: motion.article,
        initial: false,
        ...motionProps,
        ...props,
      } as CardBaseProps)}
    />
  );
}

CardAnimated.displayName = "CardAnimated";
