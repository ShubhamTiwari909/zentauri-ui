"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { cn } from "../../../lib/utils";

import {
  typingIndicatorDotDelays,
  typingIndicatorDotVariants,
  typingIndicatorDotsVariants,
  typingIndicatorLabelVariants,
  typingIndicatorVariants,
} from "../variants";

import { typingIndicatorAnimationPresets } from "./animations";
import type { TypingIndicatorAnimatedProps } from "./types";

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
        repeat: Infinity,
        repeatType: "reverse" as const,
        ...preset.transition,
      })),
    [dots, preset.transition],
  );

  return (
    <span
      ref={ref}
      data-slot="typing-indicator"
      className={cn(typingIndicatorVariants({ size }), className)}
      {...rest}
    >
      {label && labelPosition === "before" && (
        <span
          data-slot="typing-indicator-label"
          className={typingIndicatorLabelVariants({ size })}
        >
          {label}
        </span>
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
              typingIndicatorDotDelays[i % typingIndicatorDotDelays.length],
            )}
            initial="initial"
            animate="animate"
            variants={preset.variants}
            transition={dotTransitionOverrides[i]}
          />
        ))}
      </span>
      {label && labelPosition === "after" && (
        <span
          data-slot="typing-indicator-label"
          className={typingIndicatorLabelVariants({ size })}
        >
          {label}
        </span>
      )}
    </span>
  );
}

TypingIndicatorAnimated.displayName = "TypingIndicatorAnimated";
