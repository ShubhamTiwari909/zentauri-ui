"use client";

import { motion } from "framer-motion";
import { emptyStateAnimationPresets } from "./animations";
import type { EmptyStateAnimatedProps } from "./types";
import {
  EmptyStateBase,
} from "../empty-state-base";

export function EmptyStateAnimated(props: EmptyStateAnimatedProps) {
  const { animation = "none" } = props;
  const motionProps = emptyStateAnimationPresets[animation];
  return (
    <EmptyStateBase
      as={motion.section}
      initial={animation === "none" ? false : undefined}
      {...motionProps}
      {...props}
    />
  );
}

EmptyStateAnimated.displayName = "EmptyState";