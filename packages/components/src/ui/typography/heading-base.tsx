import { cn } from "../../lib/utils";
import {
  zuiTypographyItalic,
  zuiTypographyHeadingUnderline,
  zuiTypographyStrikethrough,
} from "../../design-system/typography";
import type { HeadingProps } from "./types";
import {
  headingLevelVariants,
  headingFluidVariants,
  headingDisplayVariants,
  headingFluidDisplayVariants,
  typographyToneVariants,
  typographyStyleVariants,
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
    displaySize,
    scale = "default",
    tone,
    bold,
    italic,
    underline,
    strikethrough,
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
  const Tag = HEADING_TAGS[level];
  const visualLevel = displayLevel ?? level;
  return (
    <Tag
      ref={ref}
      data-slot="typography-heading"
      data-level={level}
      className={cn(
        typographyToneVariants({ tone }),
        headingLevelVariants({ level: visualLevel }),
        scale === "fluid" && headingFluidVariants({ level: visualLevel }),
        displaySize && headingDisplayVariants({ size: displaySize }),
        displaySize &&
          scale === "fluid" &&
          headingFluidDisplayVariants({ size: displaySize }),
        typographyStyleVariants({
          align,
          weight: weight ?? (bold ? "bold" : undefined),
          leading,
          tracking,
          wrap,
          measure,
        }),
        italic && zuiTypographyItalic,
        underline && zuiTypographyHeadingUnderline,
        strikethrough && zuiTypographyStrikethrough,
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};
HeadingBase.displayName = "Heading";
