import { createElement, type ReactElement } from "react";
import { cn } from "../../lib/utils";
import type { ProseProps } from "./types";
import { proseVariants } from "./variants";

export const ProseBase = ({
  as = "div",
  size,
  measure,
  tone,
  className,
  children,
  ...props
}: ProseProps): ReactElement =>
  createElement(
    as,
    {
      ...props,
      "data-slot": "typography-prose",
      className: cn(proseVariants({ size, measure, tone }), className),
    },
    children,
  );
ProseBase.displayName = "Prose";
