import { cn } from "../../lib/utils";

import type { TextProps } from "./types";
import { textSizeVariants, typographyToneVariants } from "./variants";

export const TextBase = (props: TextProps) => {
    const {
      as = "p",
      size = "base",
      tone,
      bold,
      italic,
      underline,
      strikethrough,
      highlight,
      className,
      children,
      ...rest
    } = props;

    const Component = as;

    return (
      <Component
        data-slot="typography-text"
        className={cn(
          typographyToneVariants({ tone }),
          textSizeVariants({ size }),
          bold && "font-semibold",
          italic && "italic",
          underline && "underline underline-offset-2",
          strikethrough && "line-through",
          highlight && "rounded bg-amber-400/15 px-0.5",
          className,
        )}
        {...rest}
      >
        {children}
      </Component>
    );
};

TextBase.displayName = "Text";
