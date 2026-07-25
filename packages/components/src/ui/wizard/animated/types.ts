import type { WizardAnimation } from "./animations";
import type { WizardBaseProps, WizardContentProps } from "../types";

export type WizardAnimatedProps = WizardBaseProps;

export type WizardContentAnimatedProps = WizardContentProps & {
  animation?: WizardAnimation;
};
