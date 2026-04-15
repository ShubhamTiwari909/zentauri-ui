"use client";

import { motion } from "framer-motion";

import { cn } from "../../lib/utils";

import { dividerAnimationPresets } from "./animations";
import type { DividerProps } from "./types";
import {
  dividerLabelVariants,
  dividerLineVariants,
  dividerToneVariants,
  dividerVariants,
} from "./variants";

export function Divider(props: DividerProps) {
  const {
    className,
    appearance,
    orientation,
    size,
    animation = "none",
    label,
    children,
    ref,
    ...rest
  } = props;
  const motionProps = dividerAnimationPresets[animation];
  const slot = label ?? children;

  if (!slot) {
    return (
      <motion.div
        ref={ref}
        data-slot="divider"
        role="separator"
        aria-orientation={orientation === "vertical" ? "vertical" : "horizontal"}
        className={cn(
          dividerToneVariants({ appearance }),
          orientation === "horizontal"
            ? "flex w-full min-h-px flex-row items-stretch"
            : "flex h-full min-h-8 w-auto min-w-0 flex-col items-stretch self-stretch",
          className,
        )}
        initial={animation === "none" ? false : undefined}
        {...motionProps}
        {...rest}
      >
        <span className={cn(dividerLineVariants({ orientation, size }))} aria-hidden />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      data-slot="divider"
      role="separator"
      aria-orientation={orientation === "vertical" ? "vertical" : "horizontal"}
      className={cn(dividerVariants({ appearance, orientation, size }), className)}
      initial={animation === "none" ? false : undefined}
      {...motionProps}
      {...rest}
    >
      <span
        className={cn(dividerLineVariants({ orientation, size }))}
        aria-hidden
      />
      <span data-slot="divider-label" className={dividerLabelVariants()}>
        {slot}
      </span>
      <span
        className={cn(dividerLineVariants({ orientation, size }))}
        aria-hidden
      />
    </motion.div>
  );
}

Divider.displayName = "Divider";
