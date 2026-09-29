import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import type { inputGroupVariants } from "./variants";

export type InputGroupProps = ComponentPropsWithRef<"div"> &
  VariantProps<typeof inputGroupVariants> & { disabled?: boolean };
export type InputGroupInputProps = Omit<ComponentPropsWithRef<"input">, "size">;
export type InputGroupAddonProps = ComponentPropsWithRef<"span">;
export type InputGroupActionProps = ComponentPropsWithRef<"button">;
