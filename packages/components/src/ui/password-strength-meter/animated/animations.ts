import { PasswordStrengthMeterAnimationPresets } from "./types";

export const passwordStrengthMeterAnimationPresets: PasswordStrengthMeterAnimationPresets =
  {
    none: {},
    shimmer: {
      animate: { backgroundPosition: ["0% 0%", "100% 0%"] },
      transition: { repeat: Infinity, duration: 1.2, ease: "linear" },
    },
  };
