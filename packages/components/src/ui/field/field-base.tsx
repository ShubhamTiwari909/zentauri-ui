"use client";

import { useId } from "react";
import { cn } from "../../lib/utils";
import {
  zuiFieldDescription,
  zuiFieldError,
  zuiFieldLabel,
  zuiFieldsetBase,
} from "../../design-system/field";
import { fieldVariants } from "./variants";
import type { FieldProps, FieldsetProps } from "./types";

export function FieldBase({
  label,
  description,
  error,
  required,
  invalid,
  controlId,
  children,
  appearance,
  size,
  className,
  ref,
  ...rest
}: FieldProps) {
  const generatedId = useId();
  const id = controlId ?? generatedId;
  const descriptionId = description != null ? `${id}-description` : undefined;
  const errorId = error != null ? `${id}-error` : undefined;
  const control = {
    id,
    "aria-invalid": invalid || error != null ? true : undefined,
    "aria-describedby":
      [descriptionId, errorId].filter(Boolean).join(" ") || undefined,
    "aria-required": required || undefined,
  } as const;

  return (
    <div
      ref={ref}
      data-slot="field"
      data-invalid={control["aria-invalid"] || undefined}
      className={cn(fieldVariants({ appearance, size }), className)}
      {...rest}
    >
      {label != null && (
        <label data-slot="field-label" className={zuiFieldLabel} htmlFor={id}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      )}
      {typeof children === "function" ? children(control) : children}
      {description != null && (
        <p
          data-slot="field-description"
          id={descriptionId}
          className={zuiFieldDescription}
        >
          {description}
        </p>
      )}
      {error != null && (
        <p data-slot="field-error" id={errorId} className={zuiFieldError}>
          {error}
        </p>
      )}
    </div>
  );
}

export function FieldsetBase({
  legend,
  description,
  className,
  children,
  ref,
  ...rest
}: FieldsetProps) {
  return (
    <fieldset
      ref={ref}
      data-slot="fieldset"
      className={cn(zuiFieldsetBase, className)}
      {...rest}
    >
      <legend data-slot="fieldset-legend" className={zuiFieldLabel}>
        {legend}
      </legend>
      {description != null && (
        <p data-slot="fieldset-description" className={zuiFieldDescription}>
          {description}
        </p>
      )}
      {children}
    </fieldset>
  );
}
