// divider.tsx — default static entry (no framer-motion)
import { DividerBase } from "./divider-base";
import type { DividerProps } from "./types";

export function Divider(props: DividerProps) {
  return <DividerBase {...props} />;
}

Divider.displayName = "Divider";
