import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import type {
  headingDisplayVariants,
  textSizeVariants,
  textPresetVariants,
  typographyToneVariants,
  typographyStyleVariants,
  typographyFontVariants,
  unorderedListMarkerVariants,
} from "./variants";

export type TypographyTone = NonNullable<
  VariantProps<typeof typographyToneVariants>["tone"]
>;
type StyleVariants = VariantProps<typeof typographyStyleVariants>;
export type TypographyControls = {
  align?: NonNullable<StyleVariants["align"]>;
  weight?: NonNullable<StyleVariants["weight"]>;
  leading?: NonNullable<StyleVariants["leading"]>;
  tracking?: NonNullable<StyleVariants["tracking"]>;
  wrap?: NonNullable<StyleVariants["wrap"]>;
  measure?: NonNullable<StyleVariants["measure"]>;
};
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingProps = Omit<ComponentPropsWithRef<"h1">, "color"> &
  TypographyControls & {
    level: HeadingLevel;
    /** Visual scale; defaults to level. Does not change the semantic heading tag. */
    displayLevel?: HeadingLevel;
    /** Marketing display size. Takes precedence over displayLevel. */
    displaySize?: NonNullable<
      VariantProps<typeof headingDisplayVariants>["size"]
    >;
    /** Fluid sizing is opt-in; default retains the existing responsive scale. */
    scale?: "default" | "fluid";
    tone?: TypographyTone;
    /** Explicit weight takes precedence over bold. */
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
  };
export type TextElement = "p" | "span" | "div" | "label";
type TextNativeProps =
  | (Omit<ComponentPropsWithRef<"p">, "color"> & { as?: "p" })
  | (Omit<ComponentPropsWithRef<"span">, "color"> & { as: "span" })
  | (Omit<ComponentPropsWithRef<"div">, "color"> & { as: "div" })
  | (Omit<ComponentPropsWithRef<"label">, "color"> & { as: "label" });
export type TextProps = TextNativeProps &
  TypographyControls & {
    size?: NonNullable<VariantProps<typeof textSizeVariants>["size"]>;
    preset?: NonNullable<VariantProps<typeof textPresetVariants>["preset"]>;
    font?: NonNullable<VariantProps<typeof typographyFontVariants>["font"]>;
    numeric?: NonNullable<
      VariantProps<typeof typographyFontVariants>["numeric"]
    >;
    tone?: TypographyTone;
    /** Explicit weight, then a preset's weight, take precedence over bold. */
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    /** Visual highlighting only; use semantic emphasis for importance. */
    highlight?: boolean;
  };
export type UnorderedMarker = NonNullable<
  VariantProps<typeof unorderedListMarkerVariants>["marker"]
>;
export type ListProps =
  | (Omit<ComponentPropsWithRef<"ul">, "color"> & {
      ordered?: false;
      marker?: UnorderedMarker;
      tone?: TypographyTone;
    })
  | (Omit<ComponentPropsWithRef<"ol">, "color"> & {
      ordered: true;
      marker?: undefined;
      tone?: TypographyTone;
    });
export type ListItemProps = ComponentPropsWithRef<"li">;
export type BlockquoteProps = ComponentPropsWithRef<"blockquote"> & {
  tone?: TypographyTone;
  /** Attribution label; distinct from the native cite URL attribute. */
  attribution?: string;
};
export type InlineCodeProps = Omit<ComponentPropsWithRef<"code">, "color"> & {
  tone?: TypographyTone;
};
export type CodeBlockProps = Omit<ComponentPropsWithRef<"pre">, "color"> & {
  tone?: TypographyTone;
  language?: string;
};
export type StrongProps = Omit<ComponentPropsWithRef<"strong">, "color"> & {
  tone?: TypographyTone;
};
export type EmphasisProps = Omit<ComponentPropsWithRef<"em">, "color"> & {
  tone?: TypographyTone;
};
export type SmallProps = Omit<ComponentPropsWithRef<"small">, "color"> & {
  tone?: TypographyTone;
};
export type VisuallyHiddenProps = (
  | (ComponentPropsWithRef<"span"> & { as?: "span" })
  | (ComponentPropsWithRef<"div"> & { as: "div" })
) & {
  /** Reveal on focus-within, for example when containing a skip-link anchor. */
  focusable?: boolean;
};
