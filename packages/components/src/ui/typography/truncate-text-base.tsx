import { createElement, type ReactElement } from "react";
import { cn } from "../../lib/utils";
import { truncateTextVariants } from "./variants";
import type { TruncateTextProps } from "./types";

export const TruncateTextBase = ({
  as = "span",
  lines = 1,
  className,
  style,
  children,
  ...props
}: TruncateTextProps): ReactElement => {
  if (!Number.isInteger(lines) || lines < 1)
    throw new RangeError("lines must be a positive integer");
  return createElement(
    as,
    {
      ...props,
      "data-slot": "typography-truncate-text",
      className: cn(
        truncateTextVariants({ mode: lines === 1 ? "single" : "multiple" }),
        className,
      ),
      style: { ...style, WebkitLineClamp: lines > 1 ? lines : undefined },
    },
    children,
  );
};
TruncateTextBase.displayName = "TruncateText";
