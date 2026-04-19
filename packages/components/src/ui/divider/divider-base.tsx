"use client";

import { cn } from "../../lib/utils";

import type { DividerBaseProps } from "./types";
import {
  dividerLabelVariants,
  dividerLineVariants,
  dividerToneVariants,
  dividerVariants,
} from "./variants";


export function DividerBase({
  className,
  appearance,
  orientation,
  size,
  label,
  children,
  ref,
  as: Wrapper = "div",
  ...rest
}: DividerBaseProps) {
  const slot = label ?? children;

  if (!slot) {
    return (
      <Wrapper
        ref={ref}
        data-slot="divider"
        role="separator"
        aria-orientation={
          orientation === "vertical" ? "vertical" : "horizontal"
        }
        className={cn(
          dividerToneVariants({ appearance }),
          orientation === "horizontal"
            ? "flex w-full min-h-px flex-row items-stretch"
            : "flex h-full min-h-8 w-auto min-w-0 flex-col items-stretch self-stretch",
          className,
        )}
        {...rest}
      >
        <span
          className={cn(dividerLineVariants({ orientation, size }))}
          aria-hidden
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper
      ref={ref}
      data-slot="divider"
      role="separator"
      aria-orientation={orientation === "vertical" ? "vertical" : "horizontal"}
      className={cn(
        dividerVariants({ appearance, orientation, size }),
        className,
      )}
      {...rest}
    >
      <span
        className={cn(dividerLineVariants({ orientation, size }))}
        aria-hidden
      />
      <span data-slot="divider-label" className={dividerLabelVariants()}>
        {slot}
      </span>
      <span
        className={cn(dividerLineVariants({ orientation, size }))}
        aria-hidden
      />
    </Wrapper>
  );
}

DividerBase.displayName = "Divider";
