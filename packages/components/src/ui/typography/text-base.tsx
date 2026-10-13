import { createElement, type ReactElement } from "react";
import { cn } from "../../lib/utils";
import {
  zuiTextBase,
  zuiTypographyItalic,
  zuiTypographyTextUnderline,
  zuiTypographyStrikethrough,
  zuiTypographyHighlight,
} from "../../design-system/typography";
import type { TextProps } from "./types";
import {
  textSizeVariants,
  textPresetVariants,
  typographyToneVariants,
  typographyStyleVariants,
  typographyFontVariants,
} from "./variants";

export const TextBase = (props: TextProps): ReactElement => {
  const {
    as = "p",
    size,
    preset = "body",
    font,
    numeric,
    tone,
    bold,
    italic,
    underline,
    strikethrough,
    highlight,
    align,
    weight,
    leading,
    tracking,
    wrap,
    measure,
    ref,
    className,
    children,
    ...rest
  } = props;
  const resolvedSize =
    size ??
    (preset === "lead"
      ? "lg"
      : preset === "caption"
        ? "sm"
        : preset === "overline"
          ? "xs"
          : "base");
  return createElement(
    as,
    {
      ...rest,
      ref,
      "data-slot": "typography-text",
      className: cn(
        zuiTextBase,
        typographyToneVariants({ tone }),
        textSizeVariants({ size: resolvedSize }),
        textPresetVariants({ preset }),
        typographyFontVariants({ font, numeric }),
        typographyStyleVariants({
          align,
          weight:
            weight ??
            (preset === "overline" ? undefined : bold ? "semibold" : undefined),
          leading,
          tracking,
          wrap,
          measure,
        }),
        italic && zuiTypographyItalic,
        underline && zuiTypographyTextUnderline,
        strikethrough && zuiTypographyStrikethrough,
        highlight && zuiTypographyHighlight,
        className,
      ),
    },
    children,
  );
};
TextBase.displayName = "Text";
