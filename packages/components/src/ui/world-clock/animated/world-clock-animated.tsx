"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { WorldClockBase } from "../world-clock-base";

import type { WorldClockAnimatedProps } from "./types";
import {
  worldClockAnimationVariants,
  worldClockTransition,
} from "./animations";

export function WorldClockAnimated({
  animation = "fade",
  ...baseProps
}: WorldClockAnimatedProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = useMemo(
    () => worldClockAnimationVariants[animation],
    [animation],
  );

  if (prefersReducedMotion) {
    return <WorldClockBase {...baseProps} />;
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        data-slot="world-clock-animated"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={worldClockTransition}
      >
        <WorldClockBase {...baseProps} />
      </motion.div>
    </AnimatePresence>
  );
}

WorldClockAnimated.displayName = "WorldClockAnimated";
