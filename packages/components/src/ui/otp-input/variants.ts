import { cva } from "class-variance-authority";

import {
  zuiOtpAppearances,
  zuiOtpCellBase,
  zuiOtpSizes,
} from "../../design-system/otp-input";

export const otpInputCellVariants = cva(zuiOtpCellBase, {
  variants: {
    appearance: zuiOtpAppearances,
    size: zuiOtpSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});
