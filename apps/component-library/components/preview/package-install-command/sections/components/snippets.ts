import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type { PackageInstallCommandDemoProps } from "./types";

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
    return `import { PackageInstallCommandAnimated } from "@zentauri-ui/zentauri-components/ui/package-install-command/animated";\n\n${lead}<PackageInstallCommandAnimated\n  package="${dataset}"${appearanceAttr}${sizeAttr}${clipboardAttr}\n  animation="${animation}"\n/>`;
  }

  return `import { PackageInstallCommand } from "@zentauri-ui/zentauri-components/ui/package-install-command";\n\n${lead}<PackageInstallCommand package="${dataset}"${appearanceAttr}${sizeAttr}${clipboardAttr} />`;
}
