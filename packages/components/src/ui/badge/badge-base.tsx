"use client";

import { HiXMark } from "react-icons/hi2";

import { cn } from "../../lib/utils";

import type { BadgeBaseProps } from "./types";
import { badgeCloseButtonVariants, badgeVariants } from "./variants";

export function BadgeBase({
  className,
  appearance,
  size,
  shape,
  closable = false,
  onClose,
  closeLabel = "Remove",
  children,
  ref,
  "aria-label": ariaLabel,
  as: Wrapper = "span",
  ...rest
}: BadgeBaseProps) {
  const isDot = shape === "dot";
  const resolvedAriaLabel =
    ariaLabel ?? (isDot ? "Status indicator" : undefined);

  return (
    <Wrapper
      ref={ref}
      role="status"
      data-slot="badge"
      aria-label={resolvedAriaLabel}
      className={cn(badgeVariants({ appearance, size, shape }), className)}
      {...rest}
    >
      {!isDot ? children : null}
      {closable ? (
        <button
          type="button"
          data-slot="badge-close"
          aria-label={closeLabel}
          onClick={onClose}
          className={badgeCloseButtonVariants({ size })}
        >
          <HiXMark className="size-3.5" aria-hidden />
        </button>
      ) : null}
    </Wrapper>
  );
}

BadgeBase.displayName = "Badge";
