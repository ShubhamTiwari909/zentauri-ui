import { cn } from "../../lib/utils";
import { zuiTypographyMarkBase } from "../../design-system/typography";
import type { MarkProps } from "./types";

export const MarkBase = ({ className, ...props }: MarkProps) => (
  <mark
    {...props}
    data-slot="typography-mark"
    className={cn(zuiTypographyMarkBase, className)}
  />
);
MarkBase.displayName = "Mark";
