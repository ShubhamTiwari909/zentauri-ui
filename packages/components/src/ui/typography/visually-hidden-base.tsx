import { createElement, type ReactElement } from "react";
import { cn } from "../../lib/utils";
import {
  zuiTypographyVisuallyHiddenBase,
  zuiTypographyVisuallyHiddenFocusable,
} from "../../design-system/typography";
import type { VisuallyHiddenProps } from "./types";

export const VisuallyHiddenBase = ({
  as = "span",
  focusable = false,
  className,
  children,
  ...props
}: VisuallyHiddenProps): ReactElement =>
  createElement(
    as,
    {
      ...props,
      "data-slot": "typography-visually-hidden",
      className: cn(
        zuiTypographyVisuallyHiddenBase,
        focusable && zuiTypographyVisuallyHiddenFocusable,
        className,
      ),
    },
    children,
  );
VisuallyHiddenBase.displayName = "VisuallyHidden";
