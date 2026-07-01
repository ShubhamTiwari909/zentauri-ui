import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type { LogViewerDemoProps } from "./types";

export function logViewerSnippet(opts: LogViewerDemoProps): string {
  const {
    dataset,
    appearance,
    size,
    showHeader,
    showSummary,
    enableSearch,
    enableClipboard,
    animation = "none",
  } = opts;

  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const headerAttr = showHeader ? "" : " showHeader={false}";
  const summaryAttr = showSummary ? "" : " showSummary={false}";
  const searchAttr = enableSearch ? "" : " enableSearch={false}";
  const clipboardAttr = enableClipboard ? "" : " enableClipboard={false}";

  const lead = variantLeadComment(
    `dataset · ${dataset}, appearance · ${appearance}, size · ${size}${
      animation !== "none" ? `, animation · ${animation}` : ""
    }`,
  );

  if (animation !== "none") {
    return `import { LogViewerAnimated } from "@zentauri-ui/zentauri-components/ui/log-viewer/animated";\n\n${lead}<LogViewerAnimated\n  entries={entries}${appearanceAttr}${sizeAttr}${headerAttr}${summaryAttr}${searchAttr}${clipboardAttr}\n  animation="${animation}"\n/>`;
  }

  return `import { LogViewer } from "@zentauri-ui/zentauri-components/ui/log-viewer";\n\n${lead}<LogViewer entries={entries}${appearanceAttr}${sizeAttr}${headerAttr}${summaryAttr}${searchAttr}${clipboardAttr} />`;
}
