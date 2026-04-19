"use client";

import { useId } from "react";

import { cn } from "../../lib/utils";

import type { InputProps } from "./types";
import { inputVariants } from "./variants";

export const InputBase = (props: InputProps) => {
  const generatedId = useId();

  if (props.as === "textarea") {
    const {
      className,
      appearance,
      size,
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
    const ariaInvalid =
      ariaInvalidProp !== undefined
        ? ariaInvalidProp
        : appearance === "error"
          ? true
          : undefined;

    return (
      <>
        <textarea
          ref={ref}
          id={controlId}
          data-slot="input"
          className={cn(
            inputVariants({ appearance, size, ring, as }),
            className,
          )}
          aria-invalid={ariaInvalid}
          aria-describedby={
            errorMessage && appearance === "error" ? errorId : undefined
          }
          {...rest}
        />
        {errorMessage && appearance === "error" && (
          <p
            id={errorId}
            className="mt-2 pl-4 text-sm text-rose-500 wrap-break-word"
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
  const ariaInvalid =
    ariaInvalidProp !== undefined
      ? ariaInvalidProp
      : appearance === "error"
        ? true
        : undefined;

  return (
    <>
      <input
        ref={ref}
        id={controlId}
        data-slot="input"
        className={cn(
          inputVariants({ appearance, size, ring, as: as ?? "input" }),
          className,
        )}
        aria-invalid={ariaInvalid}
        aria-describedby={
          errorMessage && appearance === "error" ? errorId : undefined
        }
        {...rest}
      />
      {errorMessage && appearance === "error" && (
        <p
          id={errorId}
          className="mt-2 pl-4 text-sm text-rose-500 wrap-break-word"
        >
          {errorMessage}
        </p>
      )}
    </>
  );
};

InputBase.displayName = "Input";
