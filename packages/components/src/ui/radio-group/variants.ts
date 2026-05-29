import { cva } from "class-variance-authority";

import {
  zuiRadioGroupAppearances,
  zuiRadioGroupControlBase,
  zuiRadioGroupIndicatorBase,
  zuiRadioGroupItemBase,
  zuiRadioGroupOrientations,
  zuiRadioGroupRootBase,
  zuiRadioGroupSizes,
} from "../../design-system/radio-group";

export const radioGroupRootVariants = cva(zuiRadioGroupRootBase, {
  variants: {
    orientation: zuiRadioGroupOrientations,
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export const radioGroupItemVariants = cva(zuiRadioGroupItemBase, {
  variants: {
    size: {
      sm: zuiRadioGroupSizes.sm.item,
      md: zuiRadioGroupSizes.md.item,
      lg: zuiRadioGroupSizes.lg.item,
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const radioGroupControlVariants = cva(zuiRadioGroupControlBase, {
  variants: {
    appearance: zuiRadioGroupAppearances,
    size: {
      sm: zuiRadioGroupSizes.sm.control,
      md: zuiRadioGroupSizes.md.control,
      lg: zuiRadioGroupSizes.lg.control,
    },
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const radioGroupIndicatorVariants = cva(zuiRadioGroupIndicatorBase, {
  variants: {
    size: {
      sm: zuiRadioGroupSizes.sm.indicator,
      md: zuiRadioGroupSizes.md.indicator,
      lg: zuiRadioGroupSizes.lg.indicator,
    },
  },
  defaultVariants: {
    size: "md",
  },
});
