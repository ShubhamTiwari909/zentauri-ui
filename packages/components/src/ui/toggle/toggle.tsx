// toggle.tsx — default static entry (no framer-motion)
import { ToggleBase } from "./toggle-base";
import type { ToggleProps } from "./types";

export function Toggle(props: ToggleProps) {
  return <ToggleBase {...props} />;
}

Toggle.displayName = "Toggle";
