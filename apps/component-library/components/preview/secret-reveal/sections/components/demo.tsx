import { SecretReveal } from "@zentauri-ui/zentauri-components/ui/secret-reveal";
import { SecretRevealAnimated } from "@zentauri-ui/zentauri-components/ui/secret-reveal/animated";

import type { SecretRevealDemoProps } from "./types";

export function SecretRevealDemo({
  appearance,
  size,
  value = "sk-abc123def456",
  label,
  animation = "none",
  initiallyRevealed,
}: SecretRevealDemoProps) {
  if (animation === "none") {
    return (
      <SecretReveal
        appearance={appearance}
        size={size}
        value={value}
        label={label}
        initiallyRevealed={initiallyRevealed}
      />
    );
  }
  return (
    <SecretRevealAnimated
      appearance={appearance}
      size={size}
      value={value}
      label={label}
      animation={animation}
      initiallyRevealed={initiallyRevealed}
    />
  );
}
