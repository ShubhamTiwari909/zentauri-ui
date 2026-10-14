import { cva } from "class-variance-authority";

import {
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
