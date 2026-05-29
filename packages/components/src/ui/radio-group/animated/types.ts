import type { RadioGroupItemProps, RadioGroupProps } from "../types";
import type { radioGroupAnimationPresets } from "./animations";

export type RadioGroupAnimation = keyof typeof radioGroupAnimationPresets;
export type RadioGroupAnimationPresets = typeof radioGroupAnimationPresets;

export type RadioGroupAnimatedProps = RadioGroupProps & {
  animation?: RadioGroupAnimation;
};

export type RadioGroupItemAnimatedProps = RadioGroupItemProps & {
  animation?: RadioGroupAnimation;
};
