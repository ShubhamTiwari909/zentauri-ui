// copy-button.tsx — default static entry (no framer-motion)
import { CopyButtonBase } from "./copy-button-base";
import type { CopyButtonProps } from "./types";

export function CopyButton(props: CopyButtonProps) {
  return <CopyButtonBase {...props} />;
}

CopyButton.displayName = "CopyButton";
