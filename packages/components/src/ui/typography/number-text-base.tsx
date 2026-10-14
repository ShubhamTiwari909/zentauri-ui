import { createElement, type ReactElement } from "react";
import { getCachedNumberFormat } from "../../hooks/useNumberFormat";
import { cn } from "../../lib/utils";
import {
  numberTextVariants,
  typographyStyleVariants,
  typographyFontVariants,
} from "./variants";
import type { NumberTextProps } from "./types";

export const NumberTextBase = ({
  as = "span",
  value,
  locale = "en-US",
  formatOptions,
  partClassNames,
  size,
  tone,
  numeric,
  font,
  align,
  weight,
  leading,
  tracking,
  wrap,
  measure,
  className,
  ...props
}: NumberTextProps): ReactElement => {
  if (typeof value !== "number" && typeof value !== "bigint")
    throw new TypeError("NumberText value must be a number or bigint");
  const formatter = getCachedNumberFormat(locale, formatOptions);
  const children = partClassNames
    ? formatter.formatToParts(value).map((part, index) => (
        <span
          key={`${part.type}-${index}`}
          data-number-part={part.type}
          className={partClassNames[part.type]}
        >
          {part.value}
        </span>
      ))
    : formatter.format(value);
  return createElement(
    as,
    {
      ...props,
      "data-slot": "typography-number-text",
      className: cn(
        numberTextVariants({ size, tone, numeric }),
        typographyFontVariants({ font }),
        typographyStyleVariants({
          align,
          weight,
          leading,
          tracking,
          wrap,
          measure,
        }),
        className,
      ),
    },
    children,
  );
};
NumberTextBase.displayName = "NumberText";
