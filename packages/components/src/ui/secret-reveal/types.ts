import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { secretRevealVariants } from "./variants";

export type SecretRevealVariantProps = VariantProps<
  typeof secretRevealVariants
>;

export type SecretRevealBaseProps = SecretRevealVariantProps &
  ComponentPropsWithRef<"div"> & {
    value?: string;
    children?: ReactNode;
    label?: ReactNode;
    labelPosition?: "top" | "side";
    initiallyRevealed?: boolean;
    onVisibilityChange?: (revealed: boolean) => void;
    muteChar?: string;
  };

export type SecretRevealProps = SecretRevealBaseProps;
