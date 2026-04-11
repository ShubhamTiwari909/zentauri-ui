"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { inputAnimationPresets } from "./animations";
import type { InputProps } from "./types";
import { inputVariants } from "./variants";

export const Input = (props: InputProps) => {
  const {
    className,
    appearance,
    size,
    animation = "none",
    ring = true,
    ref,
    "aria-invalid": ariaInvalidProp,
    errorMessage,
    ...rest
  } = props;
  const motionProps = inputAnimationPresets[animation];

  const ariaInvalid =
    ariaInvalidProp !== undefined
      ? ariaInvalidProp
      : appearance === "error"
        ? true
        : undefined;

  return (
    <div>
      <motion.input
        ref={ref}
        data-slot="input"
        className={cn(inputVariants({ appearance, size, ring }), className)}
        initial={false}
        aria-invalid={ariaInvalid}
        {...motionProps}
        {...rest}
      />
      {errorMessage && appearance === "error" && <p className="text-sm text-red-500 mt-2 pl-4 wrap-anywhere">{errorMessage}</p>}
    </div>
  );
};

Input.displayName = "Input";
