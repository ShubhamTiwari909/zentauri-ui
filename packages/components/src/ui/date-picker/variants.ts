import { cva } from "class-variance-authority";

import {
  zuiDatePickerClearButton,
  zuiDatePickerContent,
  zuiDatePickerIcon,
  zuiDatePickerTriggerAppearances,
  zuiDatePickerTriggerBase,
  zuiDatePickerTriggerSizes,
} from "../../design-system/date-picker";

export const datePickerTriggerVariants = cva([...zuiDatePickerTriggerBase], {
  variants: {
    appearance: zuiDatePickerTriggerAppearances,
    size: zuiDatePickerTriggerSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const datePickerIconVariants = cva(zuiDatePickerIcon);

export const datePickerClearButtonVariants = cva(zuiDatePickerClearButton);

export const datePickerContentVariants = cva(zuiDatePickerContent);
