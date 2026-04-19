import type { AvatarBaseProps } from "../types";
import { HTMLMotionProps } from "framer-motion";

export type AvatarAnimatedProps = Omit<AvatarBaseProps, "as"> & {
  animation?: AvatarAnimation;
};

export type AvatarAnimationPresets = Record<
  AvatarAnimation,
  Pick<
    HTMLMotionProps<"span">,
    "whileHover" | "whileTap" | "transition" | "initial"
  >
>;

export type AvatarAnimation = "none" | "subtle";
