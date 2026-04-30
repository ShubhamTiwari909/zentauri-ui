import { forwardRef } from "react";

import { cn } from "../../lib/utils";

import type { BlockquoteProps } from "./types";
import { typographyToneVariants } from "./variants";

export const BlockquoteBase = (props: BlockquoteProps) => {
  const {
    tone,
    attribution,
    className,
    children,
    ref,
    ...rest
  } = props;

  return (
    <blockquote
      ref={ref}
      data-slot="typography-blockquote"
      className={cn(
        typographyToneVariants({ tone }),
        "border-l-4 py-1 pl-4 italic",
        className,
      )}
      {...rest}
    >
      <div className="space-y-2 leading-relaxed">{children}</div>
      {attribution ? (
        <footer className="mt-3 text-sm not-italic">
          <cite>{attribution}</cite>
        </footer>
      ) : null}
    </blockquote>
  );
};

BlockquoteBase.displayName = "Blockquote";
