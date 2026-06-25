import type { PasswordStrengthMeterProps } from "@zentauri-ui/zentauri-components/ui/password-strength-meter";

export type PasswordStrengthMeterAppearance = NonNullable<
  PasswordStrengthMeterProps["appearance"]
>;
export type PasswordStrengthMeterSize = NonNullable<
  PasswordStrengthMeterProps["size"]
>;
export type PasswordStrengthMeterShape = NonNullable<
  PasswordStrengthMeterProps["shape"]
>;

export type PasswordStrengthMeterDemoProps = {
  appearance: PasswordStrengthMeterAppearance;
  size: PasswordStrengthMeterSize;
  shape: PasswordStrengthMeterShape;
  animated: boolean;
  segmented: boolean;
};
