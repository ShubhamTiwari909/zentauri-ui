"use client";

import { useId } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { inputAnimationPresets } from "./animations";
import type { InputProps } from "./types";
import { inputVariants } from "./variants";

export const Input = (props: InputProps) => {
  const generatedId = useId();

  if (props.as === "textarea") {
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
      as,
      ...rest
    } = props;

    const controlId = id ?? generatedId;
    const errorId = `${controlId}-error`;
    const motionProps = inputAnimationPresets[animation];
    const ariaInvalid =
      ariaInvalidProp !== undefined
        ? ariaInvalidProp
        : appearance === "error"
          ? true
          : undefined;

    return (
      <>
        <motion.textarea
          ref={ref}
          id={controlId}
          data-slot="input"
          className={cn(
            inputVariants({ appearance, size, ring, as }),
            className,
          )}
          initial={false}
          aria-invalid={ariaInvalid}
          aria-describedby={
            errorMessage && appearance === "error" ? errorId : undefined
          }
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
      </>
    );
  }

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
    as,
    ...rest
  } = props;

  const controlId = id ?? generatedId;
  const errorId = `${controlId}-error`;
  const motionProps = inputAnimationPresets[animation];
  const ariaInvalid =
    ariaInvalidProp !== undefined
      ? ariaInvalidProp
      : appearance === "error"
        ? true
        : undefined;

  return (
    <>
      <motion.input
        ref={ref}
        id={controlId}
        data-slot="input"
        className={cn(
          inputVariants({ appearance, size, ring, as: as ?? "input" }),
          className,
        )}
        initial={false}
        aria-invalid={ariaInvalid}
        aria-describedby={
          errorMessage && appearance === "error" ? errorId : undefined
        }
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
    </>
  );
};

Input.displayName = "Input";
