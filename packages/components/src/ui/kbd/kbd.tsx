// kbd.tsx — default static entry (no framer-motion)
import { KbdBase } from "./kbd-base";
import type { KbdProps } from "./types";

export function Kbd(props: KbdProps) {
  return <KbdBase {...props} />;
}

Kbd.displayName = "Kbd";
