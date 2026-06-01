import type { OTPInputProps } from "@zentauri-ui/zentauri-components/ui/otp-input";

export const OTP_INPUT_APPEARANCES = [
  "default",
  "outline",
  "glass",
  "success",
  "error",
  "warning",
  "info",
  "violet",
  "amber",
  "pink",
  "indigo",
  "orange",
] as const satisfies readonly NonNullable<OTPInputProps["appearance"]>[];

export const OTP_INPUT_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<OTPInputProps["size"]>[];
