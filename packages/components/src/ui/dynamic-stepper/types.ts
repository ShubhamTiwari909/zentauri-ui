import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { buttonVariants } from "../buttons/variants";
import type {
  DynamicStepperIndicatorToneAppearance,
  dynamicStepperIndicatorVariants,
  dynamicStepperRootVariants,
} from "./variants";

export type DynamicStepperOrientation = NonNullable<
  VariantProps<typeof dynamicStepperRootVariants>["orientation"]
>;

export type DynamicStepperIndicatorSize = NonNullable<
  VariantProps<typeof dynamicStepperIndicatorVariants>["size"]
>;

export type { DynamicStepperIndicatorToneAppearance };

export type DynamicStepperStep = {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  indicator?: ReactNode;
};

export type DynamicStepperButtonAppearance = NonNullable<
  VariantProps<typeof buttonVariants>["appearance"]
>;

export type DynamicStepperButtonSize = NonNullable<
  VariantProps<typeof buttonVariants>["size"]
>;

export type UseDynamicStepperParams = {
  stepCount: number;
  /** Controlled active step index (0-based). */
  activeStep?: number;
  /** Initial step when uncontrolled. Clamped to `[0, stepCount - 1]`. */
  defaultActiveStep?: number;
  onActiveStepChange?: (step: number) => void;
  /** Fires after a successful move from the previous button with the new index. */
  onPrevious?: (nextStep: number) => void;
  /** Fires after a successful move from the next button with the new index. */
  onNext?: (nextStep: number) => void;
};

export type UseDynamicStepperResult = {
  /** Active step index (0-based), clamped to valid range. */
  activeStep: number;
  setActiveStep: (next: number | ((prev: number) => number)) => void;
  goPrevious: () => void;
  goNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  stepCount: number;
};

export type DynamicStepperProps = Omit<
  ComponentPropsWithRef<"div">,
  "children"
> & {
  steps: DynamicStepperStep[];
  orientation?: DynamicStepperOrientation;
  /** Passed to Previous / Next `Button` components. */
  buttonAppearance?: DynamicStepperButtonAppearance;
  /** Passed to Previous / Next `Button` components. */
  buttonSize?: DynamicStepperButtonSize;
  /** Indicator + text scale inside the mapper. */
  indicatorSize?: DynamicStepperIndicatorSize;
  /** Tone for completed steps (non-gradient button palette). @defaultValue emerald */
  indicatorCompleteAppearance?: DynamicStepperIndicatorToneAppearance;
  /** Tone for the active step. @defaultValue violet */
  indicatorCurrentAppearance?: DynamicStepperIndicatorToneAppearance;
  /** Tone for upcoming steps. @defaultValue outline */
  indicatorUpcomingAppearance?: DynamicStepperIndicatorToneAppearance;
  activeStep?: number;
  defaultActiveStep?: number;
  onActiveStepChange?: (step: number) => void;
  onPrevious?: (nextStep: number) => void;
  onNext?: (nextStep: number) => void;
  prevLabel?: ReactNode;
  nextLabel?: ReactNode;
};
