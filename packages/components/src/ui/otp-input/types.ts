import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { otpInputCellVariants } from "./variants";

export type OTPInputAllowedCharacters = "numeric" | "alphanumeric";

export type OTPInputCellVariantProps = VariantProps<
  typeof otpInputCellVariants
>;

export type OTPInputProps = OTPInputCellVariantProps &
  Omit<
    ComponentPropsWithRef<"div">,
    "defaultValue" | "dir" | "onChange" | "children"
  > & {
    allowedCharacters?: OTPInputAllowedCharacters;
    autoFocus?: boolean;
    cellClassName?: string;
    defaultValue?: string;
    disabled?: boolean;
    errorMessage?: ReactNode;
    hint?: ReactNode;
    label?: ReactNode;
    length?: number;
    mask?: boolean;
    name?: string;
    onComplete?: (value: string) => void;
    onValueChange?: (value: string) => void;
    separatorEvery?: number;
    value?: string;
  };
