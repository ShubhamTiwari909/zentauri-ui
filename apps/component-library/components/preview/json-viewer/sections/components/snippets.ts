import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type { JsonViewerDemoProps } from "./types";

export function jsonViewerSnippet(opts: JsonViewerDemoProps): string {
  const { dataset, appearance, size, showToolbar, animation = "none" } = opts;

  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const toolbarAttr = showToolbar ? "" : " showToolbar={false}";

  const lead = variantLeadComment(
    `dataset · ${dataset}, appearance · ${appearance}, size · ${size}${
      animation !== "none" ? `, animation · ${animation}` : ""
    }`,
  );

  if (animation !== "none") {
    return `import { JsonViewerAnimated } from "@zentauri-ui/zentauri-components/ui/json-viewer/animated";\n\n${lead}<JsonViewerAnimated\n  data={data}${appearanceAttr}${sizeAttr}${toolbarAttr}\n  animation="${animation}"\n/>`;
  }

  return `import { JsonViewer } from "@zentauri-ui/zentauri-components/ui/json-viewer";\n\n${lead}<JsonViewer data={data}${appearanceAttr}${sizeAttr}${toolbarAttr} />`;
}
