"use client";

export { PackageInstallCommand } from "./package-install-command";
export {
  buildInstallCommand,
  PACKAGE_MANAGERS,
  PackageInstallCommandCode,
  PackageInstallCommandTabs,
} from "./package-install-command-base";
export type {
  PackageInstallCommandBaseProps,
  PackageInstallCommandLabels,
  PackageInstallCommandProps,
  PackageInstallCommandVariantProps,
  PackageManager,
  PackageManagerConfig,
} from "./types";
export {
  packageInstallCommandActionVariants,
  packageInstallCommandBodyVariants,
  packageInstallCommandCodeVariants,
  packageInstallCommandTabVariants,
  packageInstallCommandTabsVariants,
  packageInstallCommandVariants,
} from "./variants";
