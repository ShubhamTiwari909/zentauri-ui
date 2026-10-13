import { cn } from "../../lib/utils";
import { zuiTypographyEmphasisBase } from "../../design-system/typography";
import type { EmphasisProps } from "./types";
import { typographyToneVariants } from "./variants";

export const EmphasisBase = ({ tone, className, ...props }: EmphasisProps) => (
  <em
    data-slot="typography-emphasis"
    className={cn(
      zuiTypographyEmphasisBase,
      tone !== undefined && typographyToneVariants({ tone }),
      className,
    )}
    {...props}
  />
);
EmphasisBase.displayName = "Emphasis";
