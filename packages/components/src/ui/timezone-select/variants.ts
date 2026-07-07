import { cva } from "class-variance-authority";

import {
  zuiTimezoneSelectAppearances,
  zuiTimezoneSelectBase,
  zuiTimezoneSelectSizes,
  zuiTimezoneSelectDropdownBase,
  zuiTimezoneSelectSearchBase,
  zuiTimezoneSelectOptionBase,
  zuiTimezoneSelectOptionAppearances,
  zuiTimezoneSelectGroupLabelBase,
  zuiTimezoneSelectOffsetChipBase,
  zuiTimezoneSelectTimeBase,
} from "../../design-system/timezone-select";

export const timezoneSelectVariants = cva(zuiTimezoneSelectBase, {
  variants: {
    appearance: zuiTimezoneSelectAppearances,
    size: zuiTimezoneSelectSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const timezoneSelectDropdownVariants = cva(
  zuiTimezoneSelectDropdownBase,
);

export const timezoneSelectSearchVariants = cva(zuiTimezoneSelectSearchBase);

export const timezoneSelectOptionVariants = cva(zuiTimezoneSelectOptionBase, {
  variants: {
    state: zuiTimezoneSelectOptionAppearances,
  },
  defaultVariants: {
    state: "default",
  },
});

export const timezoneSelectGroupLabelVariants = cva(
  zuiTimezoneSelectGroupLabelBase,
);

export const timezoneSelectOffsetChipVariants = cva(
  zuiTimezoneSelectOffsetChipBase,
);

export const timezoneSelectTimeVariants = cva(zuiTimezoneSelectTimeBase);
