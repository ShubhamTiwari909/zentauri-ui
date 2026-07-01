import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type { ConsoleViewerDemoProps } from "./types";

export function consoleViewerSnippet(opts: ConsoleViewerDemoProps): string {
  const {
    dataset,
    appearance,
    size,
    enableFilter,
    enableClear,
    enableClipboard,
    enableCollapseAll,
    animation = "none",
  } = opts;

  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const filterAttr = enableFilter ? "" : " enableFilter={false}";
  const clearAttr = enableClear ? "" : " enableClear={false}";
  const clipboardAttr = enableClipboard ? "" : " enableClipboard={false}";
  const collapseAttr = enableCollapseAll ? "" : " enableCollapseAll={false}";

  const lead = variantLeadComment(
    `session · ${dataset}, appearance · ${appearance}, size · ${size}${
      animation !== "none" ? `, animation · ${animation}` : ""
    }`,
  );

  if (animation !== "none") {
    return `import { ConsoleViewerAnimated } from "@zentauri-ui/zentauri-components/ui/console-viewer/animated";\n\n${lead}<ConsoleViewerAnimated\n  entries={entries}${appearanceAttr}${sizeAttr}${filterAttr}${clearAttr}${clipboardAttr}${collapseAttr}\n  animation="${animation}"\n/>`;
  }

  return `import { ConsoleViewer } from "@zentauri-ui/zentauri-components/ui/console-viewer";\n\n${lead}<ConsoleViewer entries={entries}${appearanceAttr}${sizeAttr}${filterAttr}${clearAttr}${clipboardAttr}${collapseAttr} />`;
}
