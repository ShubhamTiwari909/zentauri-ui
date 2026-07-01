import type { PackageInstallCommandBaseProps } from "@zentauri-ui/zentauri-components/ui/package-install-command";
import type { PackageInstallCommandAnimation } from "@zentauri-ui/zentauri-components/ui/package-install-command/animated";

import type { PACKAGE_INSTALL_COMMAND_DATASET_KEYS } from "./data";

export type PackageInstallCommandAppearance = NonNullable<
  PackageInstallCommandBaseProps["appearance"]
>;
export type PackageInstallCommandSize = NonNullable<
  PackageInstallCommandBaseProps["size"]
>;
export type PackageInstallCommandDatasetKey =
  (typeof PACKAGE_INSTALL_COMMAND_DATASET_KEYS)[number];

export type PackageInstallCommandDemoProps = {
  dataset: PackageInstallCommandDatasetKey;
  appearance: PackageInstallCommandAppearance;
  size: PackageInstallCommandSize;
  enableClipboard: boolean;
  animation?: PackageInstallCommandAnimation;
};
