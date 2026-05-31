import { VariantProps } from "class-variance-authority";
import { MotionProps } from "framer-motion";
import { RefObject } from "react";
import { animatedNumberAppearance } from "./variants";

type MotionTransitionWithoutDelay = Omit<
  NonNullable<MotionProps["transition"]>,
  "delay"
> & {
  delay?: never;
};

export type MotionPropsWithoutTransitionDelay = Omit<
  MotionProps,
  "transition"
> & {
  transition?: MotionTransitionWithoutDelay;
};

export type AnimatedNumberProps = MotionPropsWithoutTransitionDelay & {
  number: number;
  wrapperClassName?: string;
  className?: string;
  ref?: RefObject<HTMLDivElement>;
  appearance?: VariantProps<typeof animatedNumberAppearance>["appearance"];
  size?: VariantProps<typeof animatedNumberAppearance>["size"];
  type?: "up" | "down" | "scaleUp" | "scaleDown" | "rotateX" | "rotateY" | "skewX" | "skewY" | "fade";
  delayInSecond?: number;
  transition?: MotionProps["transition"];
};

export type AnimatedNumberCounterProps = MotionProps & {
  number: number;
  className?: string;
  ref?: RefObject<HTMLParagraphElement>;
  appearance?: VariantProps<typeof animatedNumberAppearance>["appearance"];
  size?: VariantProps<typeof animatedNumberAppearance>["size"];
  duration?: number;
};
