"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { RelativeTimeBase } from "../relative-time-base";

import type { RelativeTimeAnimatedProps } from "./types";
import {
  relativeTimeAnimationVariants,
  relativeTimeTransition,
} from "./animations";

export function RelativeTimeAnimated({
  animation = "fade",
  ...baseProps
}: RelativeTimeAnimatedProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = useMemo(
    () => relativeTimeAnimationVariants[animation],
    [animation],
  );

  const text = baseProps.date
    ? new Date(baseProps.date).toISOString()
    : undefined;

  if (prefersReducedMotion) {
    return <RelativeTimeBase {...baseProps} />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.time
        key={text}
        data-slot="relative-time-animated"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={relativeTimeTransition}
      >
        <RelativeTimeBase {...baseProps} />
      </motion.time>
    </AnimatePresence>
  );
}

RelativeTimeAnimated.displayName = "RelativeTimeAnimated";
