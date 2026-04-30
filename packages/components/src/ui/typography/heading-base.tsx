import { forwardRef } from "react";

import { cn } from "../../lib/utils";

import type { HeadingProps } from "./types";
import {
  headingLevelVariants,
  typographyToneVariants,
} from "./variants";

const HEADING_TAGS = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export const HeadingBase = (props: HeadingProps) => {
    const {
      level,
      displayLevel,
      tone,
      bold,
      italic,
      underline,
      strikethrough,
      ref,
      className,
      children,
      ...rest
    } = props;

    const Tag = HEADING_TAGS[level];
    const scale = displayLevel ?? level;

    return (
      <Tag
        ref={ref}
        data-slot="typography-heading"
        data-level={level}
        className={cn(
          typographyToneVariants({ tone }),
          headingLevelVariants({ level: scale }),
          bold && "font-bold",
          italic && "italic",
          underline && "underline underline-offset-4",
          strikethrough && "line-through",
          className,
        )}
        {...rest}
      >
        {children}
      </Tag>
    );
};

HeadingBase.displayName = "Heading";
