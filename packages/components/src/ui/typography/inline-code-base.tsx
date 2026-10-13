import { zuiTypographyInlineCodeBase } from "../../design-system/typography";
import { cn } from "../../lib/utils";

import type { InlineCodeProps } from "./types";
import { typographyToneVariants } from "./variants";

export const InlineCodeBase = (props: InlineCodeProps) => {
  const { tone, className, children, ref, ...rest } = props;

  return (
    <code
      ref={ref}
      data-slot="typography-inline-code"
      className={cn(
        typographyToneVariants({ tone }),
        zuiTypographyInlineCodeBase,
        className,
      )}
      {...rest}
    >
      {children}
    </code>
  );
};

InlineCodeBase.displayName = "InlineCode";
