import type { OTPInputProps } from "@zentauri-ui/zentauri-components/ui/otp-input";

export type OTPInputDemoProps = Partial<
  Pick<
    OTPInputProps,
    "allowedCharacters" | "appearance" | "length" | "separatorEvery" | "size"
  >
> & {
  errorMessage?: boolean;
};
