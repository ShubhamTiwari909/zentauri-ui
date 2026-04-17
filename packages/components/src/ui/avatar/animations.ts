import type { HTMLMotionProps } from "framer-motion";

export type AvatarAnimation = "none" | "subtle";

export type AvatarAnimationPresets = Record<
  AvatarAnimation,
  Pick<
    HTMLMotionProps<"span">,
    "whileHover" | "whileTap" | "transition" | "initial"
  >
>;

export const avatarAnimationPresets: AvatarAnimationPresets = {
  none: { initial: false },
  subtle: {
    initial: false,
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 420, damping: 28 },
  },
};
