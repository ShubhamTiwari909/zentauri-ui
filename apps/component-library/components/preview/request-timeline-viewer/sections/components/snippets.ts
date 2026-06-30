import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type { RequestTimelineViewerDemoProps } from "./types";

export function requestTimelineViewerSnippet(
  opts: RequestTimelineViewerDemoProps,
): string {
  const { dataset, appearance, size, showLegend, animation = "none" } = opts;

  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const legendAttr = showLegend ? "" : " showLegend={false}";

  const lead = variantLeadComment(
    `dataset · ${dataset}, appearance · ${appearance}, size · ${size}${
      animation !== "none" ? `, animation · ${animation}` : ""
    }`,
  );

  if (animation !== "none") {
    return `import { RequestTimelineViewerAnimated } from "@zentauri-ui/zentauri-components/ui/request-timeline-viewer/animated";\n\n${lead}<RequestTimelineViewerAnimated\n  phases={phases}${appearanceAttr}${sizeAttr}${legendAttr}\n  animation="${animation}"\n/>`;
  }

  return `import { RequestTimelineViewer } from "@zentauri-ui/zentauri-components/ui/request-timeline-viewer";\n\n${lead}<RequestTimelineViewer phases={phases}${appearanceAttr}${sizeAttr}${legendAttr} />`;
}
