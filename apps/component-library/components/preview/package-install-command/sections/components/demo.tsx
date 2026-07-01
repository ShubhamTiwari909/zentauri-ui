import { PackageInstallCommand } from "@zentauri-ui/zentauri-components/ui/package-install-command";
import { PackageInstallCommandAnimated } from "@zentauri-ui/zentauri-components/ui/package-install-command/animated";
import { PACKAGE_INSTALL_COMMAND_DATASETS } from "./data";
import type { PackageInstallCommandDemoProps } from "./types";

export function PackageInstallCommandDemo(
  props: PackageInstallCommandDemoProps,
) {
  const {
    dataset,
    appearance,
    size,
    enableClipboard,
    animation = "none",
  } = props;
  const { package: pkg } = PACKAGE_INSTALL_COMMAND_DATASETS[dataset];

  if (animation === "none") {
    return (
      <PackageInstallCommand
        package={pkg}
        appearance={appearance}
        size={size}
        enableClipboard={enableClipboard}
      />
    );
  }

  return (
    <PackageInstallCommandAnimated
      package={pkg}
      appearance={appearance}
      size={size}
      enableClipboard={enableClipboard}
      animation={animation}
    />
  );
}
