import { cva } from "class-variance-authority";

import {
  zuiTypographyNumberBase,
  zuiTypographyNumberSizes,
  zuiTypographyNumberNumerics,
  zuiTypographyNumberTones,
  zuiTypographyTruncateModes,
  zuiHeadingBase,
  zuiHeadingLevels,
  zuiHeadingFluidLevels,
  zuiHeadingDisplaySizes,
  zuiHeadingFluidDisplaySizes,
  zuiOrderedListBase,
  zuiTextSizes,
  zuiTypographyTextPresets,
  zuiTypographyTones,
  zuiUnorderedListBase,
  zuiUnorderedMarkers,
  zuiTypographyAlignments,
  zuiTypographyWeights,
  zuiTypographyLeadings,
  zuiTypographyTrackings,
  zuiTypographyWraps,
  zuiTypographyMeasures,
  zuiTypographyFonts,
  zuiTypographyNumerics,
  zuiTypographyProseBase,
  zuiTypographyProseSizes,
  zuiTypographyReadableTones,
  zuiTypographyLinkBase,
  zuiTypographyLinkTones,
  zuiTypographyLinkUnderlines,
  zuiTypographyDescriptionBase,
  zuiTypographyDescriptionLayouts,
  zuiTypographyDescriptionSizes,
  zuiTypographyDescriptionSeparators,
} from "../../design-system/typography";

export const typographyToneVariants = cva("", {
  variants: { tone: zuiTypographyTones },
  defaultVariants: { tone: "default" },
});
export const headingLevelVariants = cva(zuiHeadingBase, {
  variants: { level: zuiHeadingLevels },
});
export const headingFluidVariants = cva("", {
  variants: { level: zuiHeadingFluidLevels },
});
export const headingDisplayVariants = cva("", {
  variants: { size: zuiHeadingDisplaySizes },
});
export const headingFluidDisplayVariants = cva("", {
  variants: { size: zuiHeadingFluidDisplaySizes },
});
export const textSizeVariants = cva("", {
  variants: { size: zuiTextSizes },
  defaultVariants: { size: "base" },
});
export const textPresetVariants = cva("", {
  variants: { preset: zuiTypographyTextPresets },
  defaultVariants: { preset: "body" },
});
export const typographyStyleVariants = cva("", {
  variants: {
    align: zuiTypographyAlignments,
    weight: zuiTypographyWeights,
    leading: zuiTypographyLeadings,
    tracking: zuiTypographyTrackings,
    wrap: zuiTypographyWraps,
    measure: zuiTypographyMeasures,
  },
});
export const typographyFontVariants = cva("", {
  variants: { font: zuiTypographyFonts, numeric: zuiTypographyNumerics },
});
export const unorderedListMarkerVariants = cva(zuiUnorderedListBase, {
  variants: { marker: zuiUnorderedMarkers },
  defaultVariants: { marker: "disc" },
});
export const orderedListVariants = cva(zuiOrderedListBase);

export const proseVariants = cva(zuiTypographyProseBase, {
  variants: {
    size: zuiTypographyProseSizes,
    measure: zuiTypographyMeasures,
    tone: zuiTypographyReadableTones,
  },
  defaultVariants: { size: "base", measure: "readable", tone: "default" },
});
export const textLinkVariants = cva(zuiTypographyLinkBase, {
  variants: {
    tone: zuiTypographyLinkTones,
    underline: zuiTypographyLinkUnderlines,
  },
  defaultVariants: { tone: "primary", underline: "always" },
});
export const descriptionListVariants = cva(zuiTypographyDescriptionBase, {
  variants: {
    layout: zuiTypographyDescriptionLayouts,
    size: zuiTypographyDescriptionSizes,
    tone: zuiTypographyReadableTones,
    separators: zuiTypographyDescriptionSeparators,
  },
  defaultVariants: {
    layout: "responsive",
    size: "base",
    tone: "default",
    separators: false,
  },
});

export const truncateTextVariants = cva("", {
  variants: { mode: zuiTypographyTruncateModes },
  defaultVariants: { mode: "single" },
});

export const numberTextVariants = cva(zuiTypographyNumberBase, {
  variants: {
    size: zuiTypographyNumberSizes,
    numeric: zuiTypographyNumberNumerics,
    tone: zuiTypographyNumberTones,
  },
  defaultVariants: { size: "base", numeric: "tabular", tone: "default" },
});
