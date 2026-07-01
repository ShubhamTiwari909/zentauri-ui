import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type { PackageInstallCommandDemoProps } from "./types";
import { PACKAGE_INSTALL_COMMAND_DATASETS } from "./data";

export function packageInstallCommandSnippet(
  opts: PackageInstallCommandDemoProps,
): string {
  const {
    dataset,
    appearance,
    size,
    enableClipboard,
    animation = "none",
  } = opts;

  const packageValue =
    PACKAGE_INSTALL_COMMAND_DATASETS[dataset]?.package ?? dataset;

  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const clipboardAttr = enableClipboard ? "" : " enableClipboard={false}";

  const lead = variantLeadComment(
    `package · ${dataset}, appearance · ${appearance}, size · ${size}${
      animation !== "none" ? `, animation · ${animation}` : ""
    }`,
  );

  if (animation !== "none") {
    return `import { PackageInstallCommandAnimated } from "@zentauri-ui/zentauri-components/ui/package-install-command/animated";\n\n${lead}<PackageInstallCommandAnimated\n  packageName="${packageValue}"${appearanceAttr}${sizeAttr}${clipboardAttr}\n  animation="${animation}"\n/>`;
  }

  return `import { PackageInstallCommand } from "@zentauri-ui/zentauri-components/ui/package-install-command";\n\n${lead}<PackageInstallCommand packageName="${packageValue}"${appearanceAttr}${sizeAttr}${clipboardAttr} />`;
}
