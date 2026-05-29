"use client";

import { motion } from "framer-motion";

import { cn } from "../../../lib/utils";

import { popoverAnimationPresets } from "./animations";
import type { PopoverContentAnimatedProps } from "./types";
import { sideAlignClass, usePopover } from "../popover-base";
import { popoverContentVariants } from "../variants";

export const PopoverContentAnimated = ({
  children,
  className,
  variant,
  size,
  width,
  side = "bottom",
  align = "center",
  role = "dialog",
  animation = "none",
  onDrag: _onDrag,
  onDragStart: _onDragStart,
  onDragEnd: _onDragEnd,
  onAnimationStart: _onAnimationStart,
  ...props
}: PopoverContentAnimatedProps) => {
  const { open, contentId, contentRef } = usePopover();

  if (!open) {
    return null;
  }

  const motionProps = popoverAnimationPresets[animation];

  return (
    <motion.div
      ref={contentRef}
      id={contentId}
      data-open={open}
      role={role}
      tabIndex={-1}
      {...motionProps}
      className={cn(
        popoverContentVariants({ variant, size, width }),
        sideAlignClass(side, align),
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
