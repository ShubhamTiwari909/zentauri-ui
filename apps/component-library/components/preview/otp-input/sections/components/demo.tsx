"use client";

import { OTPInput } from "@zentauri-ui/zentauri-components/ui/otp-input";

import type { OTPInputDemoProps } from "./types";

export function OTPInputDemo({
  allowedCharacters,
  appearance,
  errorMessage,
  length,
  separatorEvery,
  size,
}: OTPInputDemoProps) {
  return (
    <OTPInput
      allowedCharacters={allowedCharacters}
      appearance={appearance}
      defaultValue={allowedCharacters === "alphanumeric" ? "A7Z9" : "482"}
      errorMessage={
        errorMessage ? "The code has expired. Request a new one." : undefined
      }
      hint="Try typing or pasting into the first cell."
      label={
        allowedCharacters === "alphanumeric" ? "Invite code" : "One-time code"
      }
      length={length}
      separatorEvery={separatorEvery}
      size={size}
    />
  );
}
