import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

import type { inputVariants } from "./variants";

export type InputSharedProps = Omit<VariantProps<typeof inputVariants>, "as"> & {
  errorMessage?: string;
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
