"use client";

import { motion } from "framer-motion";

import { dividerAnimationPresets } from "./animations";
import type { DividerAnimatedProps } from "./types";
import { DividerBase } from "../divider-base";

export const DividerAnimated = (props: DividerAnimatedProps) => {
  const { animation = "none", ...rest } = props;
  const motionProps = dividerAnimationPresets[animation];

  return (
    <DividerBase
      {...props}
      as={motion.div}
      initial={animation === "none" ? false : undefined}
      {...motionProps}
      {...(rest as Record<string, unknown>)}
    />
  );
};

DividerAnimated.displayName = "DividerAnimated";
