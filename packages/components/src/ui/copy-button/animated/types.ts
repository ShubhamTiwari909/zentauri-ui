import type { Transition } from "framer-motion";

import type { CopyButtonProps } from "../types";

export type CopyButtonAnimation = "swap" | "pop" | "fade";

export type CopyButtonAnimatedProps = CopyButtonProps & {
  animation?: CopyButtonAnimation;
};

export type CopyButtonAnimationPreset = {
  initial: { opacity: number; scale: number; rotate: number };
  animate: { opacity: number; scale: number; rotate: number };
  exit: { opacity: number; scale: number; rotate: number };
  transition: Transition;
};

export type CopyButtonAnimationPresets = Record<
  CopyButtonAnimation,
  CopyButtonAnimationPreset
>;
