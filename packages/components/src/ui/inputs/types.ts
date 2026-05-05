import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { inputVariants } from "./variants";

export type InputSharedProps = Omit<VariantProps<typeof inputVariants>, "as"> & {
  errorMessage?: string;
  hint?: ReactNode;
  label?: ReactNode;
};

export type InputProps =
  | (InputSharedProps &
      Omit<ComponentPropsWithRef<"input">, "size" | "as"> & {
        as?: "input" | "file" | "checkbox" | "radio";
      })
  | (InputSharedProps &
      Omit<ComponentPropsWithRef<"textarea">, "size" | "as"> & {
        as: "textarea";
      });
