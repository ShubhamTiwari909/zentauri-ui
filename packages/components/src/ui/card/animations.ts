import type { HTMLMotionProps } from "framer-motion";

import type { CardAnimation } from "./types";

type CardPresetMotionProps = Pick<
  HTMLMotionProps<"article">,
  "style" | "transition" | "whileHover" | "whileTap"
>;

export type CardAnimationPresets = Record<CardAnimation, CardPresetMotionProps>;

export const cardAnimationPresets: CardAnimationPresets = {
  none: {},
  lift: {
    whileHover: { y: -4, scale: 1.01 },
    whileTap: { y: 0, scale: 0.995 },
    transition: { type: "spring", stiffness: 380, damping: 26 },
  },
  glow: {
    whileHover: {
      boxShadow:
        "0 0 0 1px rgba(255,255,255,0.18), 0 22px 48px rgba(15,23,42,0.45)",
    },
    transition: { duration: 0.22, ease: "easeOut" },
  },
  tilt: {
    whileHover: { rotateX: 4, rotateY: -4, scale: 1.01 },
    whileTap: { rotateX: 0, rotateY: 0, scale: 0.99 },
    transition: { type: "spring", stiffness: 280, damping: 22 },
    style: { transformStyle: "preserve-3d" },
  },
};
