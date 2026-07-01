import { cva } from "class-variance-authority";

import {
  zuiPackageInstallCommandActionBase,
  zuiPackageInstallCommandAppearances,
  zuiPackageInstallCommandBase,
  zuiPackageInstallCommandBodyBase,
  zuiPackageInstallCommandCode,
  zuiPackageInstallCommandSizes,
  zuiPackageInstallCommandTabBase,
  zuiPackageInstallCommandTabStates,
  zuiPackageInstallCommandTabsBase,
} from "../../design-system/package-install-command";

export const packageInstallCommandVariants = cva(zuiPackageInstallCommandBase, {
  variants: {
    appearance: zuiPackageInstallCommandAppearances,
    size: zuiPackageInstallCommandSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const packageInstallCommandTabsVariants = cva(
  zuiPackageInstallCommandTabsBase,
);

export const packageInstallCommandTabVariants = cva(
  zuiPackageInstallCommandTabBase,
  {
    variants: {
      state: zuiPackageInstallCommandTabStates,
    },
    defaultVariants: {
      state: "inactive",
    },
  },
);

export const packageInstallCommandBodyVariants = cva(
  zuiPackageInstallCommandBodyBase,
);

export const packageInstallCommandCodeVariants = cva(
  zuiPackageInstallCommandCode,
);

export const packageInstallCommandActionVariants = cva(
  zuiPackageInstallCommandActionBase,
);
