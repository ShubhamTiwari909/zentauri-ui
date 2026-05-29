"use client";

import {
  type ClipboardEvent,
  type KeyboardEvent,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  zuiOtpCellsBase,
  zuiOtpErrorBase,
  zuiOtpHintBase,
  zuiOtpLabelBase,
  zuiOtpRootBase,
  zuiOtpSeparatorBase,
} from "../../design-system/otp-input";
import { cn } from "../../lib/utils";

import type { OTPInputAllowedCharacters, OTPInputProps } from "./types";
import { otpInputCellVariants } from "./variants";

function clampLength(length: number): number {
  return Number.isFinite(length) ? Math.max(1, Math.min(12, length)) : 6;
}

function sanitizeValue(
  value: string,
  allowedCharacters: OTPInputAllowedCharacters,
  maxLength: number,
): string {
  const pattern = allowedCharacters === "numeric" ? /[0-9]/g : /[a-zA-Z0-9]/g;
  return (value.match(pattern) ?? []).join("").slice(0, maxLength);
}

function valueToCells(value: string, length: number): string[] {
  return Array.from({ length }, (_, index) => {
    const c = value[index] ?? "\x00";
    return c === "\x00" ? "" : c;
  });
}

function cellsToInternal(cells: string[], length: number): string {
  return Array.from({ length }, (_, i) => cells[i] || "\x00").join("");
}

export function OTPInput(props: OTPInputProps) {
  const {
    allowedCharacters = "numeric",
    appearance,
    autoFocus,
    cellClassName,
    className,
    defaultValue = "",
    disabled,
    errorMessage,
    hint,
    id,
    label,
    length = 6,
    mask,
    name,
    onComplete,
    onValueChange,
    ref,
    separatorEvery,
    size,
    value,
    ...rest
  } = props;
  const generatedId = useId();
  const rootId = id ?? generatedId;
  const resolvedLength = clampLength(length);
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(() => {
    const clean = sanitizeValue(
      defaultValue,
      allowedCharacters,
      resolvedLength,
    );
    return clean.padEnd(resolvedLength, "\x00");
  });
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const cells = useMemo(
    () =>
      isControlled
        ? valueToCells(
            sanitizeValue(
              value ?? "",
              allowedCharacters,
              resolvedLength,
            ).padEnd(resolvedLength, "\x00"),
            resolvedLength,
          )
        : Array.from({ length: resolvedLength }, (_, index) => {
            const c = uncontrolledValue[index] ?? "\x00";
            return c === "\x00" ? "" : sanitizeValue(c, allowedCharacters, 1);
          }),
    [allowedCharacters, isControlled, resolvedLength, uncontrolledValue, value],
  );
  const sanitizedValue = cells.filter(Boolean).join("");
  const labelId = `${rootId}-label`;
  const hintId = `${rootId}-hint`;
  const errorId = `${rootId}-error`;
  const describedBy = [
    hint !== undefined ? hintId : undefined,
    errorMessage !== undefined ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  const commitValue = useCallback(
    (nextCells: string[]) => {
      if (!isControlled) {
        setUncontrolledValue(cellsToInternal(nextCells, resolvedLength));
      }
      const next = nextCells.filter(Boolean).join("").slice(0, resolvedLength);
      onValueChange?.(next);
      if (next.length === resolvedLength) {
        onComplete?.(next);
      }
    },
    [isControlled, onComplete, onValueChange, resolvedLength],
  );

  const focusCell = useCallback(
    (index: number) => {
      const target =
        inputRefs.current[Math.max(0, Math.min(index, resolvedLength - 1))];
      target?.focus();
      target?.select();
    },
    [resolvedLength],
  );

  const updateAtIndex = useCallback(
    (index: number, nextChars: string, isPaste = false) => {
      let chars: string | undefined = sanitizeValue(
        nextChars,
        allowedCharacters,
        resolvedLength,
      );

      // Detect single-char overwrite: browser gives "existingChar + typedChar"
      if (
        !isPaste &&
        chars &&
        chars.length === 2 &&
        chars[0] === (cells[index] ?? "")
      ) {
        chars = chars[1];
      }

      if (!chars?.length || (!isPaste && chars === cells[index])) {
        return;
      }

      const nextCells = [...cells];

      chars.split("").forEach((char, offset) => {
        const targetIndex = index + offset;
        if (targetIndex < resolvedLength) {
          nextCells[targetIndex] = char;
        }
      });

      commitValue(nextCells);
      focusCell(
        Math.min(index + Math.max(chars.length, 1), resolvedLength - 1),
      );
    },
    [allowedCharacters, cells, commitValue, focusCell, resolvedLength],
  );

  const clearAtIndex = useCallback(
    (index: number) => {
      const nextCells = [...cells];
      nextCells[index] = "";
      commitValue(nextCells);
    },
    [cells, commitValue],
  );

  const handlePaste = useCallback(
    (event: ClipboardEvent<HTMLInputElement>, index: number) => {
      event.preventDefault();
      updateAtIndex(index, event.clipboardData.getData("text"), true);
    },
    [updateAtIndex],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>, index: number) => {
      if (event.key === "Backspace") {
        event.preventDefault();
        if (cells[index]) {
          clearAtIndex(index);
          return;
        }
        clearAtIndex(Math.max(index - 1, 0));
        focusCell(index - 1);
        return;
      }

      if (event.key === "Delete") {
        event.preventDefault();
        clearAtIndex(index);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        focusCell(index - 1);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        focusCell(index + 1);
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        focusCell(0);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        focusCell(resolvedLength - 1);
      }
    },
    [cells, clearAtIndex, focusCell, resolvedLength],
  );

  return (
    <div
      ref={ref}
      id={rootId}
      role="group"
      aria-labelledby={label !== undefined ? labelId : undefined}
      aria-describedby={describedBy || undefined}
      aria-invalid={errorMessage !== undefined ? true : undefined}
      className={cn(zuiOtpRootBase, className)}
      data-disabled={disabled ? "true" : undefined}
      data-slot="otp-input"
      {...rest}
    >
      {label !== undefined && (
        <p id={labelId} className={zuiOtpLabelBase}>
          {label}
        </p>
      )}
      {hint !== undefined && (
        <p id={hintId} className={zuiOtpHintBase}>
          {hint}
        </p>
      )}
      <div className={zuiOtpCellsBase} data-slot="otp-input-cells">
        {cells.map((char, index) => (
          <span
            key={`${rootId}-${index}`}
            className="contents"
            data-slot="otp-input-cell-wrapper"
          >
            <input
              ref={(node) => {
                inputRefs.current[index] = node;
              }}
              aria-label={`Digit ${index + 1} of ${resolvedLength}`}
              autoComplete={index === 0 ? "one-time-code" : "off"}
              autoFocus={autoFocus && index === 0}
              className={cn(
                otpInputCellVariants({ appearance, size }),
                cellClassName,
              )}
              data-slot="otp-input-cell"
              disabled={disabled}
              inputMode={allowedCharacters === "numeric" ? "numeric" : "text"}
              maxLength={resolvedLength}
              onChange={(event) =>
                updateAtIndex(index, event.currentTarget.value, false)
              }
              onFocus={(event) => event.currentTarget.select()}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onPaste={(event) => handlePaste(event, index)}
              pattern={
                allowedCharacters === "numeric" ? "[0-9]*" : "[A-Za-z0-9]*"
              }
              type={mask ? "password" : "text"}
              value={char}
            />
            {separatorEvery &&
              separatorEvery > 0 &&
              index < resolvedLength - 1 &&
              (index + 1) % separatorEvery === 0 && (
                <span
                  aria-hidden="true"
                  className={zuiOtpSeparatorBase}
                  data-slot="otp-input-separator"
                />
              )}
          </span>
        ))}
      </div>
      {name !== undefined && (
        <input
          type="hidden"
          name={name}
          value={sanitizedValue}
          disabled={disabled}
        />
      )}
      {errorMessage !== undefined && (
        <p id={errorId} className={zuiOtpErrorBase}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

OTPInput.displayName = "OTPInput";
