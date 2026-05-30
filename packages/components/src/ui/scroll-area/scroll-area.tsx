"use client";

import { cn } from "../../lib/utils";

import type { ScrollAreaProps } from "./types";
import { scrollAreaVariants } from "./variants";

export function ScrollArea(props: ScrollAreaProps) {
  const {
    appearance,
    children,
    className,
    orientation,
    ref,
    role,
    scrollbar,
    shadow,
    size,
    tabIndex,
    viewportClassName,
    ...rest
  } = props;
  const ariaLabel = rest["aria-label"];
  const ariaLabelledBy = rest["aria-labelledby"];
  const isNamedRegion =
    role === "region" ||
    ariaLabel !== undefined ||
    ariaLabelledBy !== undefined;

  return (
    <div
      ref={ref}
      data-orientation={orientation ?? "vertical"}
      data-scrollbar={scrollbar ?? "auto"}
      data-slot="scroll-area"
      role={
        role ??
        (ariaLabel !== undefined || ariaLabelledBy !== undefined
          ? "region"
          : undefined)
      }
      tabIndex={tabIndex ?? (isNamedRegion ? 0 : undefined)}
      className={cn(
        scrollAreaVariants({
          appearance,
          orientation,
          scrollbar,
          shadow,
          size,
        }),
        className,
      )}
      {...rest}
    >
      <div data-slot="scroll-area-viewport" className={viewportClassName}>
        {children}
      </div>
    </div>
  );
}

ScrollArea.displayName = "ScrollArea";
