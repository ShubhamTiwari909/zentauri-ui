import { cva } from "class-variance-authority";

import {
  zuiInputAppearances,
  zuiInputAs,
  zuiInputBase,
  zuiInputCheckboxAppearances,
  zuiInputCheckboxSizes,
  zuiInputDateAppearances,
  zuiInputFileAppearances,
  zuiInputFileSizes,
  zuiInputRadioAppearances,
  zuiInputRadioSizes,
  zuiInputRing,
  zuiInputSizes,
  zuiInputTextareaSizes,
} from "../../design-system/inputs";

export const inputVariants = cva(zuiInputBase, {
  variants: {
    as: zuiInputAs,
    appearance: zuiInputAppearances,
    size: zuiInputSizes,
    ring: zuiInputRing,
  },
  defaultVariants: {
    as: "input",
    appearance: "default",
    size: "md",
    ring: true,
  },
  compoundVariants: [
    {
      as: "textarea",
      size: "sm",
      class: zuiInputTextareaSizes.sm,
    },
    {
      as: "textarea",
      size: "md",
      class: zuiInputTextareaSizes.md,
    },
    {
      as: "textarea",
      size: "lg",
      class: zuiInputTextareaSizes.lg,
    },
    {
      as: "file",
      size: "sm",
      class: zuiInputFileSizes.sm,
    },
    {
      as: "file",
      size: "md",
      class: zuiInputFileSizes.md,
    },
    {
      as: "file",
      size: "lg",
      class: zuiInputFileSizes.lg,
    },
    {
      as: "file",
      appearance: "default",
      class: zuiInputFileAppearances.default,
    },
    {
      as: "file",
      appearance: "warning",
      class: zuiInputFileAppearances.warning,
    },
    {
      as: "file",
      appearance: "error",
      class: zuiInputFileAppearances.error,
    },
    {
      as: "file",
      appearance: "success",
      class: zuiInputFileAppearances.success,
    },
    {
      as: "file",
      appearance: "info",
      class: zuiInputFileAppearances.info,
    },
    {
      as: "file",
      appearance: "violet",
      class: zuiInputFileAppearances.violet,
    },
    {
      as: "file",
      appearance: "amber",
      class: zuiInputFileAppearances.amber,
    },
    {
      as: "file",
      appearance: "pink",
      class: zuiInputFileAppearances.pink,
    },
    {
      as: "file",
      appearance: "indigo",
      class: zuiInputFileAppearances.indigo,
    },
    {
      as: "checkbox",
      size: "sm",
      class: zuiInputCheckboxSizes.sm,
    },
    {
      as: "checkbox",
      size: "md",
      class: zuiInputCheckboxSizes.md,
    },
    {
      as: "checkbox",
      size: "lg",
      class: zuiInputCheckboxSizes.lg,
    },
    {
      as: "radio",
      size: "sm",
      class: zuiInputRadioSizes.sm,
    },
    {
      as: "radio",
      size: "md",
      class: zuiInputRadioSizes.md,
    },
    {
      as: "radio",
      size: "lg",
      class: zuiInputRadioSizes.lg,
    },
    {
      as: "checkbox",
      appearance: "default",
      class: zuiInputCheckboxAppearances.default,
    },
    {
      as: "checkbox",
      appearance: "warning",
      class: zuiInputCheckboxAppearances.warning,
    },
    {
      as: "checkbox",
      appearance: "error",
      class: zuiInputCheckboxAppearances.error,
    },
    {
      as: "checkbox",
      appearance: "success",
      class: zuiInputCheckboxAppearances.success,
    },
    {
      as: "checkbox",
      appearance: "info",
      class: zuiInputCheckboxAppearances.info,
    },
    {
      as: "checkbox",
      appearance: "violet",
      class: zuiInputCheckboxAppearances.violet,
    },
    {
      as: "checkbox",
      appearance: "amber",
      class: zuiInputCheckboxAppearances.amber,
    },
    {
      as: "checkbox",
      appearance: "pink",
      class: zuiInputCheckboxAppearances.pink,
    },
    {
      as: "checkbox",
      appearance: "indigo",
      class: zuiInputCheckboxAppearances.indigo,
    },
    {
      as: "radio",
      appearance: "default",
      class: zuiInputRadioAppearances.default,
    },
    {
      as: "radio",
      appearance: "warning",
      class: zuiInputRadioAppearances.warning,
    },
    {
      as: "radio",
      appearance: "error",
      class: zuiInputRadioAppearances.error,
    },
    {
      as: "radio",
      appearance: "success",
      class: zuiInputRadioAppearances.success,
    },
    {
      as: "radio",
      appearance: "info",
      class: zuiInputRadioAppearances.info,
    },
    {
      as: "radio",
      appearance: "violet",
      class: zuiInputRadioAppearances.violet,
    },
    {
      as: "radio",
      appearance: "amber",
      class: zuiInputRadioAppearances.amber,
    },
    {
      as: "radio",
      appearance: "pink",
      class: zuiInputRadioAppearances.pink,
    },
    {
      as: "radio",
      appearance: "indigo",
      class: zuiInputRadioAppearances.indigo,
    },
    {
      as: "date",
      appearance: "default",
      class: zuiInputDateAppearances.default,
    },
    {
      as: "date",
      appearance: "warning",
      class: zuiInputDateAppearances.warning,
    },
    {
      as: "date",
      appearance: "error",
      class: zuiInputDateAppearances.error,
    },
    {
      as: "date",
      appearance: "success",
      class: zuiInputDateAppearances.success,
    },
    {
      as: "date",
      appearance: "info",
      class: zuiInputDateAppearances.info,
    },
    {
      as: "date",
      appearance: "violet",
      class: zuiInputDateAppearances.violet,
    },
    {
      as: "date",
      appearance: "amber",
      class: zuiInputDateAppearances.amber,
    },
    {
      as: "date",
      appearance: "pink",
      class: zuiInputDateAppearances.pink,
    },
    {
      as: "date",
      appearance: "indigo",
      class: zuiInputDateAppearances.indigo,
    },
    {
      as: "date",
      appearance: "orange",
      class: zuiInputDateAppearances.orange,
    },
  ],
});
