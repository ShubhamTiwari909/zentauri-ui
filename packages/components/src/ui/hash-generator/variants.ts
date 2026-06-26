import { cva } from "class-variance-authority";

import {
  zuiHashGeneratorAppearances,
  zuiHashGeneratorBase,
  zuiHashGeneratorHeaderBase,
  zuiHashGeneratorInputBase,
  zuiHashGeneratorLabelBase,
  zuiHashGeneratorOutputBase,
  zuiHashGeneratorOutputTextBase,
  zuiHashGeneratorSizes,
} from "../../design-system/hash-generator";

export const hashGeneratorVariants = cva(zuiHashGeneratorBase, {
  variants: {
    appearance: zuiHashGeneratorAppearances,
    size: zuiHashGeneratorSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const hashGeneratorHeaderVariants = cva(zuiHashGeneratorHeaderBase);
export const hashGeneratorLabelVariants = cva(zuiHashGeneratorLabelBase);
export const hashGeneratorInputVariants = cva(zuiHashGeneratorInputBase);
export const hashGeneratorOutputVariants = cva(zuiHashGeneratorOutputBase);
export const hashGeneratorOutputTextVariants = cva(
  zuiHashGeneratorOutputTextBase,
);
