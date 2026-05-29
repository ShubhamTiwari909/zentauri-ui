import type { CheckboxProps } from "../types";
import type { checkboxAnimationPresets } from "./animations";

export type CheckboxAnimation = keyof typeof checkboxAnimationPresets;
export type CheckboxAnimationPresets = typeof checkboxAnimationPresets;

export type CheckboxAnimatedProps = CheckboxProps & {
  animation?: CheckboxAnimation;
};
