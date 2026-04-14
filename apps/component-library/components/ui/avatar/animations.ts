import type { HTMLMotionProps } from "framer-motion";

import type { AvatarAnimation } from "./types";

type AvatarPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "transition" | "whileHover"
>;

export type AvatarAnimationPresets = Record<
  AvatarAnimation,
  AvatarPresetMotionProps
>;

export const avatarAnimationPresets: AvatarAnimationPresets = {
  none: {},
  pop: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 420, damping: 24 },
  },
  "ring-pulse": {
    whileHover: { boxShadow: "0 0 0 6px rgba(148,163,184,0.25)" },
    transition: { duration: 0.35, ease: "easeOut" },
  },
};
