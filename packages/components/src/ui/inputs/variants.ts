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
    {
      as: "file",
      appearance: "blue",
      class: zuiInputFileAppearances.blue,
    },
    {
      as: "file",
      appearance: "cyan",
      class: zuiInputFileAppearances.cyan,
    },
    {
      as: "file",
      appearance: "green",
      class: zuiInputFileAppearances.green,
    },
    {
      as: "file",
      appearance: "lime",
      class: zuiInputFileAppearances.lime,
    },
    {
      as: "file",
      appearance: "mint",
      class: zuiInputFileAppearances.mint,
    },
    {
      as: "file",
      appearance: "ocean",
      class: zuiInputFileAppearances.ocean,
    },
    {
      as: "file",
      appearance: "sapphire",
      class: zuiInputFileAppearances.sapphire,
    },
    {
      as: "file",
      appearance: "lavender",
      class: zuiInputFileAppearances.lavender,
    },
    {
      as: "file",
      appearance: "ruby",
      class: zuiInputFileAppearances.ruby,
    },
    {
      as: "file",
      appearance: "red",
      class: zuiInputFileAppearances.red,
    },
    {
      as: "file",
      appearance: "slate",
      class: zuiInputFileAppearances.slate,
    },
    {
      as: "file",
      appearance: "zinc",
      class: zuiInputFileAppearances.zinc,
    },
    {
      as: "file",
      appearance: "stone",
      class: zuiInputFileAppearances.stone,
    },
    {
      as: "file",
      appearance: "royal",
      class: zuiInputFileAppearances.royal,
    },
    {
      as: "file",
      appearance: "electric",
      class: zuiInputFileAppearances.electric,
    },
    {
      as: "file",
      appearance: "forest",
      class: zuiInputFileAppearances.forest,
    },
    {
      as: "file",
      appearance: "sunset",
      class: zuiInputFileAppearances.sunset,
    },
    {
      as: "file",
      appearance: "magenta",
      class: zuiInputFileAppearances.magenta,
    },
    {
      as: "file",
      appearance: "crimson",
      class: zuiInputFileAppearances.crimson,
    },
    {
      as: "file",
      appearance: "aqua",
      class: zuiInputFileAppearances.aqua,
    },
    {
      as: "file",
      appearance: "plum",
      class: zuiInputFileAppearances.plum,
    },
    {
      as: "file",
      appearance: "orange",
      class: zuiInputFileAppearances.orange,
    },
    {
      as: "checkbox",
      appearance: "blue",
      class: zuiInputCheckboxAppearances.blue,
    },
    {
      as: "checkbox",
      appearance: "cyan",
      class: zuiInputCheckboxAppearances.cyan,
    },
    {
      as: "checkbox",
      appearance: "green",
      class: zuiInputCheckboxAppearances.green,
    },
    {
      as: "checkbox",
      appearance: "lime",
      class: zuiInputCheckboxAppearances.lime,
    },
    {
      as: "checkbox",
      appearance: "mint",
      class: zuiInputCheckboxAppearances.mint,
    },
    {
      as: "checkbox",
      appearance: "ocean",
      class: zuiInputCheckboxAppearances.ocean,
    },
    {
      as: "checkbox",
      appearance: "sapphire",
      class: zuiInputCheckboxAppearances.sapphire,
    },
    {
      as: "checkbox",
      appearance: "lavender",
      class: zuiInputCheckboxAppearances.lavender,
    },
    {
      as: "checkbox",
      appearance: "ruby",
      class: zuiInputCheckboxAppearances.ruby,
    },
    {
      as: "checkbox",
      appearance: "red",
      class: zuiInputCheckboxAppearances.red,
    },
    {
      as: "checkbox",
      appearance: "slate",
      class: zuiInputCheckboxAppearances.slate,
    },
    {
      as: "checkbox",
      appearance: "zinc",
      class: zuiInputCheckboxAppearances.zinc,
    },
    {
      as: "checkbox",
      appearance: "stone",
      class: zuiInputCheckboxAppearances.stone,
    },
    {
      as: "checkbox",
      appearance: "royal",
      class: zuiInputCheckboxAppearances.royal,
    },
    {
      as: "checkbox",
      appearance: "electric",
      class: zuiInputCheckboxAppearances.electric,
    },
    {
      as: "checkbox",
      appearance: "forest",
      class: zuiInputCheckboxAppearances.forest,
    },
    {
      as: "checkbox",
      appearance: "sunset",
      class: zuiInputCheckboxAppearances.sunset,
    },
    {
      as: "checkbox",
      appearance: "magenta",
      class: zuiInputCheckboxAppearances.magenta,
    },
    {
      as: "checkbox",
      appearance: "crimson",
      class: zuiInputCheckboxAppearances.crimson,
    },
    {
      as: "checkbox",
      appearance: "aqua",
      class: zuiInputCheckboxAppearances.aqua,
    },
    {
      as: "checkbox",
      appearance: "plum",
      class: zuiInputCheckboxAppearances.plum,
    },
    {
      as: "checkbox",
      appearance: "orange",
      class: zuiInputCheckboxAppearances.orange,
    },
    {
      as: "radio",
      appearance: "blue",
      class: zuiInputRadioAppearances.blue,
    },
    {
      as: "radio",
      appearance: "cyan",
      class: zuiInputRadioAppearances.cyan,
    },
    {
      as: "radio",
      appearance: "green",
      class: zuiInputRadioAppearances.green,
    },
    {
      as: "radio",
      appearance: "lime",
      class: zuiInputRadioAppearances.lime,
    },
    {
      as: "radio",
      appearance: "mint",
      class: zuiInputRadioAppearances.mint,
    },
    {
      as: "radio",
      appearance: "ocean",
      class: zuiInputRadioAppearances.ocean,
    },
    {
      as: "radio",
      appearance: "sapphire",
      class: zuiInputRadioAppearances.sapphire,
    },
    {
      as: "radio",
      appearance: "lavender",
      class: zuiInputRadioAppearances.lavender,
    },
    {
      as: "radio",
      appearance: "ruby",
      class: zuiInputRadioAppearances.ruby,
    },
    {
      as: "radio",
      appearance: "red",
      class: zuiInputRadioAppearances.red,
    },
    {
      as: "radio",
      appearance: "slate",
      class: zuiInputRadioAppearances.slate,
    },
    {
      as: "radio",
      appearance: "zinc",
      class: zuiInputRadioAppearances.zinc,
    },
    {
      as: "radio",
      appearance: "stone",
      class: zuiInputRadioAppearances.stone,
    },
    {
      as: "radio",
      appearance: "royal",
      class: zuiInputRadioAppearances.royal,
    },
    {
      as: "radio",
      appearance: "electric",
      class: zuiInputRadioAppearances.electric,
    },
    {
      as: "radio",
      appearance: "forest",
      class: zuiInputRadioAppearances.forest,
    },
    {
      as: "radio",
      appearance: "sunset",
      class: zuiInputRadioAppearances.sunset,
    },
    {
      as: "radio",
      appearance: "magenta",
      class: zuiInputRadioAppearances.magenta,
    },
    {
      as: "radio",
      appearance: "crimson",
      class: zuiInputRadioAppearances.crimson,
    },
    {
      as: "radio",
      appearance: "aqua",
      class: zuiInputRadioAppearances.aqua,
    },
    {
      as: "radio",
      appearance: "plum",
      class: zuiInputRadioAppearances.plum,
    },
    {
      as: "radio",
      appearance: "orange",
      class: zuiInputRadioAppearances.orange,
    },
    {
      as: "date",
      appearance: "blue",
      class: zuiInputDateAppearances.blue,
    },
    {
      as: "date",
      appearance: "cyan",
      class: zuiInputDateAppearances.cyan,
    },
    {
      as: "date",
      appearance: "green",
      class: zuiInputDateAppearances.green,
    },
    {
      as: "date",
      appearance: "lime",
      class: zuiInputDateAppearances.lime,
    },
    {
      as: "date",
      appearance: "mint",
      class: zuiInputDateAppearances.mint,
    },
    {
      as: "date",
      appearance: "ocean",
      class: zuiInputDateAppearances.ocean,
    },
    {
      as: "date",
      appearance: "sapphire",
      class: zuiInputDateAppearances.sapphire,
    },
    {
      as: "date",
      appearance: "lavender",
      class: zuiInputDateAppearances.lavender,
    },
    {
      as: "date",
      appearance: "ruby",
      class: zuiInputDateAppearances.ruby,
    },
    {
      as: "date",
      appearance: "red",
      class: zuiInputDateAppearances.red,
    },
    {
      as: "date",
      appearance: "slate",
      class: zuiInputDateAppearances.slate,
    },
    {
      as: "date",
      appearance: "zinc",
      class: zuiInputDateAppearances.zinc,
    },
    {
      as: "date",
      appearance: "stone",
      class: zuiInputDateAppearances.stone,
    },
    {
      as: "date",
      appearance: "royal",
      class: zuiInputDateAppearances.royal,
    },
    {
      as: "date",
      appearance: "electric",
      class: zuiInputDateAppearances.electric,
    },
    {
      as: "date",
      appearance: "forest",
      class: zuiInputDateAppearances.forest,
    },
    {
      as: "date",
      appearance: "sunset",
      class: zuiInputDateAppearances.sunset,
    },
    {
      as: "date",
      appearance: "magenta",
      class: zuiInputDateAppearances.magenta,
    },
    {
      as: "date",
      appearance: "crimson",
      class: zuiInputDateAppearances.crimson,
    },
    {
      as: "date",
      appearance: "aqua",
      class: zuiInputDateAppearances.aqua,
    },
    {
      as: "date",
      appearance: "plum",
      class: zuiInputDateAppearances.plum,
    },
  ],
});
