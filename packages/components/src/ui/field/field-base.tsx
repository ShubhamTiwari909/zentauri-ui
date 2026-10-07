"use client";

import {
  cloneElement,
  createContext,
  Fragment,
  isValidElement,
  useContext,
  useId,
} from "react";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { zuiFieldErrorIconBase } from "../../design-system/field";
import type {
  FormProps,
  FieldProps,
  FieldControlProps,
  FieldControlAttributes,
  FieldLabelProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldGroupProps,
  FieldLegendProps,
} from "./types";
import {
  fieldVariants,
  fieldContentVariants,
  fieldLabelVariants,
  fieldDescriptionVariants,
  fieldErrorVariants,
  formVariants,
  fieldGroupVariants,
  fieldLegendVariants,
} from "./variants";

const FieldContext = createContext<FieldControlAttributes | null>(null);
const hasContent = (value: ReactNode) =>
  value != null && typeof value !== "boolean";
function mergeIds(...values: (string | undefined)[]) {
  const ids = values.flatMap(
    (value) => value?.split(/\s+/).filter(Boolean) ?? [],
  );
  return ids.length ? [...new Set(ids)].join(" ") : undefined;
}

/** Use inside Field when a custom control needs explicit props instead of cloning. */
export function useFieldControl({
  native = true,
}: { native?: boolean } = {}): FieldControlAttributes {
  const context = useContext(FieldContext);
  if (!context)
    throw new Error(
      "FieldControl and useFieldControl must be used inside Field.",
    );
  return native
    ? context
    : {
        ...context,
        required: undefined,
        "aria-required": context.required || undefined,
      };
}

export function FormBase({ className, ...props }: FormProps) {
  return (
    <form
      {...props}
      data-slot="form"
      className={cn(formVariants(), className)}
    />
  );
}

export function FieldBase({
  controlId,
  label,
  description,
  error,
  invalid,
  disabled,
  required,
  appearance,
  size,
  orientation,
  children,
  className,
  ...props
}: FieldProps) {
  const generatedId = useId();
  const id = controlId ?? `zui-field-${generatedId}`;
  const labelId = hasContent(label) ? `${id}-label` : undefined;
  const descriptionId = hasContent(description)
    ? `${id}-description`
    : undefined;
  const errorId = hasContent(error) ? `${id}-error` : undefined;
  const isInvalid = invalid ?? hasContent(error);
  const effectiveOrientation = labelId
    ? (orientation ?? "vertical")
    : "vertical";
  const control: FieldControlAttributes = {
    id,
    disabled,
    required,
    "aria-labelledby": labelId,
    "aria-describedby": mergeIds(descriptionId, errorId),
    "aria-invalid": isInvalid || undefined,
  };
  return (
    <FieldContext.Provider value={control}>
      <div
        {...props}
        data-slot="field"
        data-invalid={isInvalid ? "true" : undefined}
        data-disabled={disabled ? "true" : undefined}
        data-required={required ? "true" : undefined}
        data-orientation={effectiveOrientation}
        className={cn(
          fieldVariants({
            appearance,
            size,
            orientation: effectiveOrientation,
          }),
          className,
        )}
      >
        {hasContent(label) && (
          <FieldLabelBase id={labelId} htmlFor={id} required={required}>
            {label}
          </FieldLabelBase>
        )}
        <div data-slot="field-content" className={fieldContentVariants()}>
          {typeof children === "function" ? children(control) : children}
          {descriptionId && (
            <FieldDescriptionBase id={descriptionId}>
              {description}
            </FieldDescriptionBase>
          )}
          {errorId && <FieldErrorBase id={errorId}>{error}</FieldErrorBase>}
        </div>
      </div>
    </FieldContext.Provider>
  );
}

export function FieldControlBase({
  children,
  native = true,
}: FieldControlProps) {
  const control = useFieldControl({ native });
  if (
    !isValidElement<Record<string, unknown>>(children) ||
    children.type === Fragment
  ) {
    throw new Error(
      "FieldControl expects one control element, not a fragment or text.",
    );
  }
  const child = children.props;
  // Only wiring is replaced; cloneElement retains the child's ref, handlers and value props.
  return cloneElement(children, {
    ...control,
    disabled: control.disabled || child.disabled,
    required: native ? control.required || child.required : undefined,
    "aria-required": native
      ? child["aria-required"]
      : control["aria-required"] || child["aria-required"],
    "aria-invalid": control["aria-invalid"] ?? child["aria-invalid"],
    "aria-labelledby":
      child["aria-labelledby"] ??
      (child["aria-label"] != null ? undefined : control["aria-labelledby"]),
    "aria-describedby": mergeIds(
      child["aria-describedby"] as string | undefined,
      control["aria-describedby"],
    ),
  });
}

export function FieldLabelBase({
  className,
  required,
  children,
  htmlFor,
  ...props
}: FieldLabelProps) {
  const context = useContext(FieldContext);
  const showRequired = required ?? context?.required;
  return (
    <label
      {...props}
      htmlFor={htmlFor ?? context?.id}
      data-slot="field-label"
      className={cn(fieldLabelVariants(), className)}
    >
      {children}
      {showRequired && <span aria-hidden="true">*</span>}
    </label>
  );
}
export function FieldDescriptionBase({
  className,
  ...props
}: FieldDescriptionProps) {
  return (
    <p
      {...props}
      data-slot="field-description"
      className={cn(fieldDescriptionVariants(), className)}
    />
  );
}
export function FieldErrorBase({
  className,
  children,
  role,
  ...props
}: FieldErrorProps) {
  if (!hasContent(children)) return null;
  return (
    <p
      {...props}
      role={role}
      data-slot="field-error"
      className={cn(fieldErrorVariants(), className)}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={zuiFieldErrorIconBase}
      >
        <circle cx="10" cy="10" r="8" />
        <path d="M10 5.5v5M10 14v.5" />
      </svg>
      <span>{children}</span>
    </p>
  );
}
export function FieldGroupBase({
  className,
  legend,
  description,
  children,
  "aria-describedby": describedBy,
  ...props
}: FieldGroupProps) {
  const id = useId();
  const descriptionId = hasContent(description)
    ? `zui-field-group-${id}-description`
    : undefined;
  return (
    <fieldset
      {...props}
      data-slot="field-group"
      aria-describedby={mergeIds(describedBy, descriptionId)}
      className={cn(fieldGroupVariants(), className)}
    >
      {hasContent(legend) && <FieldLegendBase>{legend}</FieldLegendBase>}
      {descriptionId && (
        <FieldDescriptionBase id={descriptionId}>
          {description}
        </FieldDescriptionBase>
      )}
      {children}
    </fieldset>
  );
}
export function FieldLegendBase({ className, ...props }: FieldLegendProps) {
  return (
    <legend
      {...props}
      data-slot="field-legend"
      className={cn(fieldLegendVariants(), className)}
    />
  );
}
