import { PasswordStrengthMeterBase } from "./password-strength-meter-base";
import type { PasswordStrengthMeterProps } from "./types";

export const PasswordStrengthMeter = (props: PasswordStrengthMeterProps) => {
  return <PasswordStrengthMeterBase {...props} />;
};

PasswordStrengthMeter.displayName = "PasswordStrengthMeter";
