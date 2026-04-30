import { forwardRef } from "react";

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
          "rounded-md border border-white/10 bg-white/6 px-1.5 py-0.5 font-mono text-[0.925em] font-normal",
          className,
        )}
        {...rest}
      >
        {children}
      </code>
    );
};

InlineCodeBase.displayName = "InlineCode";
