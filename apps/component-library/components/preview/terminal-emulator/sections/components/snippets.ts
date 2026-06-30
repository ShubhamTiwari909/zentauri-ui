import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type { TerminalEmulatorDemoProps } from "./types";

export function terminalEmulatorSnippet(
  opts: TerminalEmulatorDemoProps,
): string {
  const { dataset, appearance, size, showHeader, animation = "none" } = opts;

  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const headerAttr = showHeader ? "" : " showHeader={false}";

  const lead = variantLeadComment(
    `session · ${dataset}, appearance · ${appearance}, size · ${size}${
      animation !== "none" ? `, animation · ${animation}` : ""
    }`,
  );

  if (animation !== "none") {
    return `import { TerminalEmulatorAnimated } from "@zentauri-ui/zentauri-components/ui/terminal-emulator/animated";\n\n${lead}<TerminalEmulatorAnimated\n  lines={lines}${appearanceAttr}${sizeAttr}${headerAttr}\n  animation="${animation}"\n/>`;
  }

  return `import { TerminalEmulator } from "@zentauri-ui/zentauri-components/ui/terminal-emulator";\n\n${lead}<TerminalEmulator lines={lines}${appearanceAttr}${sizeAttr}${headerAttr} />`;
}
