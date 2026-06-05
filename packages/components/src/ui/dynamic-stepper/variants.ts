import { cva } from "class-variance-authority";

import {
  zuiDynamicStepperIndicatorBase,
  zuiDynamicStepperIndicatorSizes,
  zuiDynamicStepperIndicatorToneClasses,
  zuiDynamicStepperItemBase,
  zuiDynamicStepperItemOrientations,
  zuiDynamicStepperMapperBase,
  zuiDynamicStepperMapperOrientations,
  zuiDynamicStepperRootBase,
  zuiDynamicStepperRootOrientations,
  type ZuiDynamicStepperIndicatorSemanticState,
  type ZuiDynamicStepperIndicatorToneAppearance,
} from "../../design-system/dynamic-stepper";

export type DynamicStepperIndicatorToneAppearance =
  ZuiDynamicStepperIndicatorToneAppearance;

export type DynamicStepperIndicatorSemanticState =
  ZuiDynamicStepperIndicatorSemanticState;

export function dynamicStepperIndicatorToneClass(
  state: DynamicStepperIndicatorSemanticState,
  tone: DynamicStepperIndicatorToneAppearance,
) {
  return zuiDynamicStepperIndicatorToneClasses[tone][state];
}

export const dynamicStepperRootVariants = cva(zuiDynamicStepperRootBase, {
  variants: {
    orientation: zuiDynamicStepperRootOrientations,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const dynamicStepperMapperVariants = cva(zuiDynamicStepperMapperBase, {
  variants: {
    orientation: zuiDynamicStepperMapperOrientations,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const dynamicStepperItemVariants = cva(zuiDynamicStepperItemBase, {
  variants: {
    orientation: zuiDynamicStepperItemOrientations,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const dynamicStepperIndicatorVariants = cva(
  zuiDynamicStepperIndicatorBase,
  {
    variants: {
      size: zuiDynamicStepperIndicatorSizes,
    },
    defaultVariants: {
      size: "md",
    },
  },
);
