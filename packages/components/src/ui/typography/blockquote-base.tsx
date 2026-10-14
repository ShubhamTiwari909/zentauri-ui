import {
  zuiTypographyBlockquoteBase,
  zuiTypographyBlockquoteContent,
  zuiTypographyBlockquoteAttribution,
} from "../../design-system/typography";
import { cn } from "../../lib/utils";

import type { BlockquoteProps } from "./types";
import { typographyToneVariants } from "./variants";

export const BlockquoteBase = (props: BlockquoteProps) => {
  const { tone, attribution, className, children, ref, ...rest } = props;

  return (
    <blockquote
      ref={ref}
      data-slot="typography-blockquote"
      className={cn(
        typographyToneVariants({ tone }),
        zuiTypographyBlockquoteBase,
        className,
      )}
      {...rest}
    >
      <div className={zuiTypographyBlockquoteContent}>{children}</div>
      {attribution ? (
        <footer className={zuiTypographyBlockquoteAttribution}>
          <cite>{attribution}</cite>
        </footer>
      ) : null}
    </blockquote>
  );
};

BlockquoteBase.displayName = "Blockquote";
