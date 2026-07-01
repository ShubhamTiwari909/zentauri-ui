import type { Ref } from "react";

import type { PackageInstallCommandBaseProps } from "../types";
import type { PackageInstallCommandAnimation } from "./animations";

export type { PackageInstallCommandAnimation };

export type PackageInstallCommandAnimatedProps =
  PackageInstallCommandBaseProps & {
    animation?: PackageInstallCommandAnimation;
    ref?: Ref<HTMLDivElement>;
  };
