import { cn } from "../../lib/utils";
import { zuiTypographySmallBase } from "../../design-system/typography";
import type { SmallProps } from "./types";
import { typographyToneVariants } from "./variants";

export const SmallBase = ({ tone, className, ...props }: SmallProps) => (
  <small
    data-slot="typography-small"
    className={cn(
      zuiTypographySmallBase,
      tone !== undefined && typographyToneVariants({ tone }),
      className,
    )}
    {...props}
  />
);
SmallBase.displayName = "Small";
