// split-button.tsx — default static entry (no framer-motion)
import { SplitButtonBase } from "./split-button-base";
import type { SplitButtonProps } from "./types";

export const SplitButton = (props: SplitButtonProps) => {
  return <SplitButtonBase {...props} />;
};

SplitButton.displayName = "SplitButton";
