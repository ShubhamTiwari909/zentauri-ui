import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { packageInstallCommandVariants } from "./variants";

export type PackageInstallCommandVariantProps = VariantProps<
  typeof packageInstallCommandVariants
>;

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export interface PackageManagerConfig {
  name: PackageManager;
  command: string;
  icon: string;
}

export interface PackageInstallCommandLabels {
  copy?: ReactNode;
  copied?: ReactNode;
}

export type PackageInstallCommandBaseProps = VariantProps<
  typeof packageInstallCommandVariants
> &
  Omit<ComponentPropsWithRef<"div">, "children"> & {
    /** Package name(s) to install, e.g. "react" or "react react-dom". */
    packageName: string;
    /** Currently selected package manager. */
    defaultManager?: PackageManager;
    /** Show a copy button that copies the install command. */
    enableClipboard?: boolean;
    /** Override default copy labels. */
    labels?: PackageInstallCommandLabels;
  };

export type PackageInstallCommandProps = PackageInstallCommandBaseProps;
