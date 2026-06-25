"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { cn } from "../../../lib/utils";

import {
  typingIndicatorDotVariants,
  typingIndicatorDotsVariants,
  typingIndicatorVariants,
} from "../variants";

import { typingIndicatorAnimationPresets } from "./animations";
import type { TypingIndicatorAnimatedProps } from "./types";
import { TypingIndicatorLabel } from "../typing-indicator-base";

export function TypingIndicatorAnimated({
  appearance,
  size,
  dots = 3,
  label,
  labelPosition = "before",
  animation = "bounce",
  className,
  ref,
  ...rest
}: TypingIndicatorAnimatedProps) {
  const preset = typingIndicatorAnimationPresets[animation];

  const dotTransitionOverrides = useMemo(
    () =>
      Array.from({ length: dots }).map((_, i) => ({
        delay: i * 0.12,
        ...(animation !== "none"
          ? { repeat: Infinity, repeatType: "reverse" as const }
          : {}),
        ...preset.transition,
      })),
    [dots, animation, preset.transition],
  );

  return (
    <span
      ref={ref}
      data-slot="typing-indicator"
      className={cn(typingIndicatorVariants({ size }), className)}
      {...rest}
    >
      {label && labelPosition === "before" && (
        <TypingIndicatorLabel size={size}>{label}</TypingIndicatorLabel>
      )}
      <span
        data-slot="typing-indicator-dots"
        className={typingIndicatorDotsVariants({ size })}
      >
        {Array.from({ length: dots }).map((_, i) => (
          <motion.span
            key={i}
            data-slot="typing-indicator-dot"
            className={cn(
              typingIndicatorDotVariants({ appearance, size }),
              "animate-none",
            )}
            initial="initial"
            animate="animate"
            variants={preset.variants}
            transition={dotTransitionOverrides[i]}
          />
        ))}
      </span>
      {label && labelPosition === "after" && (
        <TypingIndicatorLabel size={size}>{label}</TypingIndicatorLabel>
      )}
    </span>
  );
}

TypingIndicatorAnimated.displayName = "TypingIndicatorAnimated";
