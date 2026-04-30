import type { VariantProps } from "class-variance-authority";
import type {
  ComponentProps,
  HTMLAttributes,
  RefObject,
} from "react";

import type {
  textSizeVariants,
  typographyToneVariants,
  unorderedListMarkerVariants,
} from "./variants";

export type TypographyTone = NonNullable<
  VariantProps<typeof typographyToneVariants>["tone"]
>;

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = Omit<
  ComponentProps<"h1">,
  "color"
> & {
  level: HeadingLevel;
  /** Visual scale; defaults to `level`. */
  displayLevel?: HeadingLevel;
  tone?: TypographyTone;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  ref?: RefObject<HTMLHeadingElement>;
};

export type TextElement = "p" | "span" | "div" | "label";

export type TextProps = Omit<HTMLAttributes<HTMLElement>, "color"> & {
  as?: TextElement;
  size?: NonNullable<VariantProps<typeof textSizeVariants>["size"]>;
  tone?: TypographyTone;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  highlight?: boolean;
};

export type UnorderedMarker = NonNullable<
  VariantProps<typeof unorderedListMarkerVariants>["marker"]
>;

export type ListProps =
  | (Omit<ComponentProps<"ul">, "color"> & {
      ordered?: false;
      marker?: UnorderedMarker;
      tone?: TypographyTone;
    })
  | (Omit<ComponentProps<"ol">, "color"> & {
      ordered: true;
      marker?: undefined;
      tone?: TypographyTone;
    });

export type ListItemProps = ComponentProps<"li"> & {
  ref?: RefObject<HTMLLIElement>;
};

export type BlockquoteProps = ComponentProps<"blockquote"> & {
  tone?: TypographyTone;
  /** Attribution label shown in a footer (distinct from the HTML `cite` URL attribute). */
  attribution?: string;
  ref?: RefObject<HTMLQuoteElement>;
};

export type InlineCodeProps = Omit<
  ComponentProps<"code">,
  "color"
> & {
  tone?: TypographyTone;
};

export type CodeBlockProps = Omit<
  ComponentProps<"pre">,
  "color"
> & {
  tone?: TypographyTone;
  /** Hint for stacked highlighting stacks / aria-labels. */
  language?: string;
  ref?: RefObject<HTMLPreElement>;
};
