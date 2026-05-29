import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { OTPInputDemoProps } from "./otp-input-code-examples.types";

export function otpInputSnippet(opts: OTPInputDemoProps): string {
  const { allowedCharacters, appearance, length, separatorEvery, size } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const allowedAttr =
    allowedCharacters === undefined
      ? ""
      : ` allowedCharacters="${allowedCharacters}"`;
  const lengthAttr = length === undefined ? "" : ` length={${length}}`;
  const separatorAttr =
    separatorEvery === undefined ? "" : ` separatorEvery={${separatorEvery}}`;

  return `${variantLeadComment(
    `appearance · ${appearance}, size · ${size}${allowedCharacters ? `, ${allowedCharacters}` : ""}`,
  )}<OTPInput
  label="${allowedCharacters === "alphanumeric" ? "Invite code" : "One-time code"}"
  hint="Paste the code or type one cell at a time."${appearanceAttr}${sizeAttr}${allowedAttr}${lengthAttr}${separatorAttr}
/>`;
}

export function otpInputValidationSnippet(): string {
  return `${variantLeadComment("validation state")}<OTPInput
  label="One-time code"
  appearance="error"
  errorMessage="The code has expired. Request a new one."
  onComplete={(value) => verify(value)}
/>`;
}
