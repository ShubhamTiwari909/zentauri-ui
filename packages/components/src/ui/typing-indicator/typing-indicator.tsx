// typing-indicator.tsx — default static entry (no framer-motion)
import { TypingIndicatorBase } from "./typing-indicator-base";
import type { TypingIndicatorProps } from "./types";

export function TypingIndicator(props: TypingIndicatorProps) {
  return <TypingIndicatorBase {...props} />;
}

TypingIndicator.displayName = "TypingIndicator";
