// badge.tsx — default static entry (no framer-motion)
import { BadgeBase } from "./badge-base";
import type { BadgeProps } from "./types";

export function Badge(props: BadgeProps) {
  return <BadgeBase {...props} />;
}

Badge.displayName = "Badge";
