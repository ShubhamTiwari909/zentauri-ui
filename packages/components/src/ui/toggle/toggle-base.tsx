"use client";

import { useCallback, useId, useState, type ReactNode } from "react";

import { cn } from "../../lib/utils";

import type { ToggleProps } from "./types";
import { toggleThumbVariants, toggleTrackVariants } from "./variants";

export function hasToggleLabelChildren(node: ReactNode): boolean {
  if (node === undefined || node === null) {
    return false;
  }
  if (typeof node === "boolean") {
    return false;
  }
  if (typeof node === "string") {
    return node.trim().length > 0;
  }
  if (typeof node === "number") {
    return true;
  }
  if (Array.isArray(node)) {
    return node.some(hasToggleLabelChildren);
  }
  return true;
}

export function ToggleBase(props: ToggleProps) {
  const {
    className,
    size,
    appearance,
    checked,
    defaultChecked = false,
    onCheckedChange,
    disabled,
    ref,
    "aria-label": ariaLabelProp,
    children,
    thumbColor,
    ...rest
  } = props;
  const toggleLabelId = useId();
  const isControlled = checked !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const resolved = isControlled ? Boolean(checked) : uncontrolled;

  const setChecked = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolled(next);
      }
      onCheckedChange?.(next);
    },
    [isControlled, onCheckedChange],
  );

  const thumbShiftPx = size === "sm" ? 16 : size === "lg" ? 24 : 20;
  const labeledByChildren = hasToggleLabelChildren(children);
  const labeling = labeledByChildren
    ? {
        "aria-labelledby": toggleLabelId,
      }
    : {
        "aria-label": ariaLabelProp ?? "Toggle",
      };

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      data-slot="toggle"
      aria-checked={resolved}
      data-state={resolved ? "checked" : "unchecked"}
      disabled={disabled}
      className={cn(toggleTrackVariants({ size, appearance }), className)}
      {...labeling}
      onClick={() => {
        if (!disabled) {
          setChecked(!resolved);
        }
      }}
      {...rest}
    >
      <span className="sr-only" id={labeledByChildren ? toggleLabelId : undefined}>{children}</span>
      <span
        className={cn(
          toggleThumbVariants({ size, thumbColor }),
          "absolute top-1/2 -translate-y-1/2 transition-[transform] duration-200 ease-out",
        )}
        style={{ transform: `translateX(${resolved ? thumbShiftPx : 0}px)` }}
      />
    </button>
  );
}

ToggleBase.displayName = "Toggle";
