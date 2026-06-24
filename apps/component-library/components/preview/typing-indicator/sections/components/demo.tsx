import { TypingIndicator } from "@zentauri-ui/zentauri-components/ui/typing-indicator";
import { TypingIndicatorAnimated } from "@zentauri-ui/zentauri-components/ui/typing-indicator/animated";

import type { TypingIndicatorDemoProps } from "./types";

export function TypingIndicatorDemo({
  appearance,
  size,
  dots = 3,
  label,
  animation = "none",
}: TypingIndicatorDemoProps) {
  if (animation === "none") {
    return (
      <TypingIndicator
        appearance={appearance}
        size={size}
        dots={dots}
        label={label}
      />
    );
  }
  return (
    <TypingIndicatorAnimated
      appearance={appearance}
      size={size}
      dots={dots}
      label={label}
      animation={animation}
    />
  );
}
