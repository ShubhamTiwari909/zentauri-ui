import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";

import type { imageCompareVariants } from "./variants";

export type ImageCompareVariantProps = VariantProps<
  typeof imageCompareVariants
>;

export type ImageCompareCssProperties = CSSProperties & {
  "--image-compare-position"?: string;
};

export type ImageCompareBaseProps = Omit<
  ComponentPropsWithRef<"div">,
  "children" | "onChange" | "onKeyDown"
> & {
  before: ReactNode;
  after: ReactNode;
  position?: number;
  defaultPosition?: number;
  onPositionChange?: (position: number) => void;
  step?: number;
  beforeLabel?: ReactNode;
  afterLabel?: ReactNode;
  separatorLabel?: string;
  appearance?: ImageCompareVariantProps["appearance"];
  size?: ImageCompareVariantProps["size"];
  radius?: ImageCompareVariantProps["radius"];
  disabled?: boolean;
};

export type ImageCompareProps = ImageCompareBaseProps;
