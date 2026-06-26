import { cva } from "class-variance-authority";

import {
  zuiPasswordStrengthMeterAppearances,
  zuiPasswordStrengthMeterBarBase,
  zuiPasswordStrengthMeterBarSegmented,
  zuiPasswordStrengthMeterBase,
  zuiPasswordStrengthMeterShapes,
  zuiPasswordStrengthMeterSizes,
  zuiPasswordStrengthMeterTrackBase,
  zuiPasswordStrengthMeterTrackSizes,
} from "../../design-system/password-strength-meter";

export const passwordStrengthMeterVariants = cva(zuiPasswordStrengthMeterBase, {
  variants: {
    appearance: zuiPasswordStrengthMeterAppearances,
    size: zuiPasswordStrengthMeterSizes,
    shape: zuiPasswordStrengthMeterShapes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
    shape: "rounded",
  },
});

export const passwordStrengthMeterTrackVariants = cva(
  zuiPasswordStrengthMeterTrackBase,
  {
    variants: {
      size: zuiPasswordStrengthMeterTrackSizes,
      shape: zuiPasswordStrengthMeterShapes,
    },
    defaultVariants: {
      size: "md",
      shape: "rounded",
    },
  },
);

export const passwordStrengthMeterBarVariants = cva(
  zuiPasswordStrengthMeterBarBase,
  {
    variants: {
      segmented: zuiPasswordStrengthMeterBarSegmented,
    },
    defaultVariants: { segmented: false },
  },
);
