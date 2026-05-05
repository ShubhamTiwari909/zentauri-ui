"use client";

import { useId } from "react";

import { cn } from "../../lib/utils";

import type { InputProps } from "./types";
import { inputVariants } from "./variants";

function mergeDescribedByIds(
  user: string | undefined,
  ...generated: (string | undefined)[]
): string | undefined {
  const ids = [
    ...(user ?? "").split(/\s+/).filter(Boolean),
    ...generated.filter((id): id is string => Boolean(id)),
  ];
  const unique = [...new Set(ids)];
  return unique.length > 0 ? unique.join(" ") : undefined;
}

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
      hint,
      label,
      id,
      as,
      "aria-describedby": ariaDescribedByUser,
      ...rest
    } = props;

    const controlId = id ?? generatedId;
    const errorId = `${controlId}-error`;
    const hintId = `${controlId}-hint`;
    const ariaInvalid =
      ariaInvalidProp !== undefined
        ? ariaInvalidProp
        : appearance === "error"
          ? true
          : undefined;

    const describedBy = mergeDescribedByIds(
      ariaDescribedByUser,
      hint !== undefined ? hintId : undefined,
      errorMessage && appearance === "error" ? errorId : undefined,
    );

    return (
      <>
        {label !== undefined && (
          <label
            htmlFor={controlId}
            className="mb-1 block text-sm font-medium text-slate-200"
          >
            {label}
          </label>
        )}
        {hint !== undefined && (
          <p id={hintId} className="mb-1 text-xs text-slate-400">
            {hint}
          </p>
        )}
        <textarea
          ref={ref}
          id={controlId}
          data-slot="input"
          className={cn(
            inputVariants({ appearance, size, ring, as }),
            className,
          )}
          aria-invalid={ariaInvalid}
          aria-describedby={describedBy}
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
    hint,
    label,
    id,
    as,
    "aria-describedby": ariaDescribedByUser,
    ...rest
  } = props;

  const controlId = id ?? generatedId;
  const errorId = `${controlId}-error`;
  const hintId = `${controlId}-hint`;
  const ariaInvalid =
    ariaInvalidProp !== undefined
      ? ariaInvalidProp
      : appearance === "error"
        ? true
        : undefined;

  const describedBy = mergeDescribedByIds(
    ariaDescribedByUser,
    hint !== undefined ? hintId : undefined,
    errorMessage && appearance === "error" ? errorId : undefined,
  );

  return (
    <>
      {label !== undefined && (
        <label
          htmlFor={controlId}
          className="mb-1 block text-sm font-medium text-slate-200"
        >
          {label}
        </label>
      )}
      {hint !== undefined && (
        <p id={hintId} className="mb-1 text-xs text-slate-400">
          {hint}
        </p>
      )}
      <input
        ref={ref}
        id={controlId}
        data-slot="input"
        className={cn(
          inputVariants({ appearance, size, ring, as: as ?? "input" }),
          className,
        )}
        aria-invalid={ariaInvalid}
        aria-describedby={describedBy}
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
