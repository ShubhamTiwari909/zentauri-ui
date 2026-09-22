import type { ImageCompareProps } from "@zentauri-ui/zentauri-components/ui/image-compare";

export type ImageCompareAppearance = NonNullable<
  ImageCompareProps["appearance"]
>;
export type ImageCompareSize = NonNullable<ImageCompareProps["size"]>;
export type ImageCompareRadius = NonNullable<ImageCompareProps["radius"]>;

export type ImageCompareDemoProps = {
  appearance: ImageCompareAppearance;
  size: ImageCompareSize;
  radius: ImageCompareRadius;
  defaultPosition: number;
};
