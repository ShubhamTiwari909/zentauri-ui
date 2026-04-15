"use client";

import { motion } from "framer-motion";
import { HiXMark } from "react-icons/hi2";

import { cn } from "../../lib/utils";

import { badgeAnimationPresets } from "./animations";
import type { BadgeProps } from "./types";
import { badgeCloseButtonVariants, badgeVariants } from "./variants";

export function Badge(props: BadgeProps) {
  const {
    className,
    appearance,
    size,
    shape,
    animation = "none",
    closable = false,
    onClose,
    closeLabel = "Remove",
    children,
    ref,
    "aria-label": ariaLabel,
    ...rest
  } = props;
  const motionProps = badgeAnimationPresets[animation];
  const isDot = shape === "dot";
  const resolvedAriaLabel =
    ariaLabel ?? (isDot ? "Status indicator" : undefined);

  return (
    <motion.span
      ref={ref}
      role="status"
      data-slot="badge"
      aria-label={resolvedAriaLabel}
      className={cn(badgeVariants({ appearance, size, shape }), className)}
      initial={animation === "none" ? false : undefined}
      {...motionProps}
      {...rest}
    >
      {!isDot ? children : null}
      {closable ? (
        <button
          type="button"
          data-slot="badge-close"
          aria-label={closeLabel}
          onClick={onClose}
          className={badgeCloseButtonVariants({ size })}
        >
          <HiXMark className="size-3.5" aria-hidden />
        </button>
      ) : null}
    </motion.span>
  );
}

Badge.displayName = "Badge";
