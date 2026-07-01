import type { PackageInstallCommandBaseProps } from "@zentauri-ui/zentauri-components/ui/package-install-command";
import type { PackageInstallCommandAnimation } from "@zentauri-ui/zentauri-components/ui/package-install-command/animated";

export const PACKAGE_INSTALL_COMMAND_APPEARANCES = [
  "default",
  "subtle",
  "contrast",
  "glass",
] as const satisfies readonly NonNullable<
  PackageInstallCommandBaseProps["appearance"]
>[];

export const PACKAGE_INSTALL_COMMAND_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<
  PackageInstallCommandBaseProps["size"]
>[];

export const PACKAGE_INSTALL_COMMAND_ANIMATIONS = [
  "none",
  "fade",
  "slide",
] as const satisfies readonly PackageInstallCommandAnimation[];

export const PACKAGE_INSTALL_COMMAND_DATASETS = {
  "zentauri-components": {
    package: "@zentauri-ui/zentauri-components",
  },
  "react react-dom": {
    package: "react react-dom",
  },
  "framer-motion": {
    package: "framer-motion",
  },
  "react-icons": {
    package: "react-icons",
  },
} as const;

export const PACKAGE_INSTALL_COMMAND_DATASET_KEYS = Object.keys(
  PACKAGE_INSTALL_COMMAND_DATASETS,
) as readonly (keyof typeof PACKAGE_INSTALL_COMMAND_DATASETS)[];
