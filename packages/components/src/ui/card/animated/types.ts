import type { CardBaseProps } from "../types";

export type CardAnimation = "none" | "lift" | "glow" | "tilt";

export type CardAnimatedProps = Omit<CardBaseProps, "as"> & {
  animation?: CardAnimation;
};

