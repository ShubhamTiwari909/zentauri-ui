import { cva } from "class-variance-authority";

import {
  zuiWizardAppearances,
  zuiWizardBase,
  zuiWizardContentBase,
  zuiWizardHeaderBase,
  zuiWizardHeaderSizes,
  zuiWizardNavigationBase,
  zuiWizardNavigationSizes,
  zuiWizardSizes,
} from "../../design-system/wizard";

export const wizardVariants = cva(zuiWizardBase, {
  variants: {
    appearance: zuiWizardAppearances,
    size: zuiWizardSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const wizardHeaderVariants = cva(zuiWizardHeaderBase, {
  variants: {
    size: zuiWizardHeaderSizes,
  },
  defaultVariants: { size: "md" },
});

export const wizardContentVariants = cva(zuiWizardContentBase);

export const wizardNavigationVariants = cva(zuiWizardNavigationBase, {
  variants: {
    size: zuiWizardNavigationSizes,
  },
  defaultVariants: { size: "md" },
});
