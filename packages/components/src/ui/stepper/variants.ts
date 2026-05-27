import { cva } from "class-variance-authority";

import {
  zuiStepperBase,
  zuiStepperIndicatorAppearances,
  zuiStepperIndicatorBase,
  zuiStepperIndicatorSizes,
  zuiStepperItemBase,
  zuiStepperItemOrientations,
  zuiStepperOrientations,
} from "../../design-system/stepper";

export const stepperVariants = cva(zuiStepperBase, {
  variants: {
    orientation: zuiStepperOrientations,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const stepperItemVariants = cva(zuiStepperItemBase, {
  variants: {
    orientation: zuiStepperItemOrientations,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const stepperIndicatorVariants = cva(zuiStepperIndicatorBase, {
  variants: {
    appearance: zuiStepperIndicatorAppearances,
    size: zuiStepperIndicatorSizes,
  },
  defaultVariants: {
    appearance: "upcoming",
    size: "md",
  },
});
