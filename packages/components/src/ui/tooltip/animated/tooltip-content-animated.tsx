"use client";

import { motion } from "framer-motion";

import { cn } from "../../../lib/utils";

import { tooltipAnimationPresets } from "./animations";
import type { TooltipContentAnimatedProps } from "./types";
import { tooltipVariants } from "../variants";
import { useTooltip } from "../tooltip-base";

export const TooltipContentAnimated = ({
  children,
  className,
  variant,
  size,
  width,
  animation = "none",
}: TooltipContentAnimatedProps) => {
  const { open, position } = useTooltip();

  if (!open) return null;

  const positionStyles = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const motionProps = tooltipAnimationPresets[animation];

  return (
    <motion.div
      data-open={open}
      role="tooltip"
      {...motionProps}
      className={cn(
        tooltipVariants({ variant, size, width }),
        positionStyles[position],
        className,
      )}
    >
      {children}
    </motion.div>
  );
};
