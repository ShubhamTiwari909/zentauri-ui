import { cn } from "../../lib/utils";
import { zuiTypographyStrongBase } from "../../design-system/typography";
import type { StrongProps } from "./types";
import { typographyToneVariants } from "./variants";

export const StrongBase = ({ tone, className, ...props }: StrongProps) => (
  <strong
    data-slot="typography-strong"
    className={cn(
      zuiTypographyStrongBase,
      tone !== undefined && typographyToneVariants({ tone }),
      className,
    )}
    {...props}
  />
);
StrongBase.displayName = "Strong";
