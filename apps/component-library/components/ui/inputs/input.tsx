"use client";

import { useId } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { inputAnimationPresets } from "./animations";
import type { InputProps } from "./types";
import { inputVariants } from "./variants";

export const Input = (props: InputProps) => {
  const generatedId = useId();
  const {
    className,
    appearance,
    size,
    animation = "none",
    ring = true,
    ref,
    "aria-invalid": ariaInvalidProp,
    errorMessage,
    id,
    ...rest
  } = props;

  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const motionProps = inputAnimationPresets[animation];

  const ariaInvalid =
    ariaInvalidProp !== undefined
      ? ariaInvalidProp
      : appearance === "error"
        ? true
        : undefined;

  return (
    <div className="w-full">
      <motion.input
        ref={ref}
        id={inputId}
        data-slot="input"
        className={cn(inputVariants({ appearance, size, ring }), className)}
        initial={false}
        aria-invalid={ariaInvalid}
        aria-describedby={errorMessage && appearance === "error" ? errorId : undefined}
        {...motionProps}
        {...rest}
      />
      {errorMessage && appearance === "error" && (
        <p
          id={errorId}
          className="text-sm text-rose-500 mt-2 pl-4 wrap-break-word"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

Input.displayName = "Input";