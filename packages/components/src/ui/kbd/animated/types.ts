import type { HTMLMotionProps } from "framer-motion";

import type { KbdBaseProps } from "../types";

export type KbdAnimation = "none" | "press" | "pop";

export type KbdAnimatedProps = Omit<KbdBaseProps, "as"> & {
  animation?: KbdAnimation;
};

type KbdPresetMotionProps = Pick<
  HTMLMotionProps<"span">,
  "transition" | "whileHover" | "whileTap" | "animate" | "initial"
>;

export type KbdAnimationPresets = Record<KbdAnimation, KbdPresetMotionProps>;
