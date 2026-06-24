"use client";

import { cn } from "../../lib/utils";

import type { TypingIndicatorBaseProps } from "./types";
import {
  typingIndicatorDotDelays,
  typingIndicatorDotVariants,
  typingIndicatorDotsVariants,
  typingIndicatorLabelVariants,
  typingIndicatorVariants,
} from "./variants";

export function TypingIndicatorBase({
  appearance,
  size,
  dots = 3,
  label,
  labelPosition = "before",
  className,
  ref,
  ...rest
}: TypingIndicatorBaseProps) {
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
          <span
            key={i}
            data-slot="typing-indicator-dot"
            className={cn(
              typingIndicatorDotVariants({ appearance, size }),
              typingIndicatorDotDelays[i % typingIndicatorDotDelays.length],
            )}
          />
        ))}
      </span>
      {label && labelPosition === "after" && (
        <TypingIndicatorLabel size={size}>{label}</TypingIndicatorLabel>
      )}
    </span>
  );
}

TypingIndicatorBase.displayName = "TypingIndicator";

function TypingIndicatorLabel({
  size,
  children,
}: {
  size?: TypingIndicatorBaseProps["size"];
  children: React.ReactNode;
}) {
  return (
    <span
      data-slot="typing-indicator-label"
      className={typingIndicatorLabelVariants({ size })}
    >
      {children}
    </span>
  );
}

TypingIndicatorLabel.displayName = "TypingIndicatorLabel";
