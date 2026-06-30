import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type { ApiResponseViewerDemoProps } from "./types";

export function apiResponseViewerSnippet(
  opts: ApiResponseViewerDemoProps,
): string {
  const { dataset, appearance, size, animation = "none" } = opts;

  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;

  const lead = variantLeadComment(
    `response · ${dataset}, appearance · ${appearance}, size · ${size}${
      animation !== "none" ? `, animation · ${animation}` : ""
    }`,
  );

  if (animation !== "none") {
    return `import { ApiResponseViewerAnimated } from "@zentauri-ui/zentauri-components/ui/api-response-viewer/animated";\n\n${lead}<ApiResponseViewerAnimated\n  status={response.status}\n  method={response.method}\n  url={response.url}\n  headers={response.headers}\n  body={response.body}${appearanceAttr}${sizeAttr}\n  animation="${animation}"\n/>`;
  }

  return `import { ApiResponseViewer } from "@zentauri-ui/zentauri-components/ui/api-response-viewer";\n\n${lead}<ApiResponseViewer\n  status={response.status}\n  method={response.method}\n  url={response.url}\n  headers={response.headers}\n  body={response.body}${appearanceAttr}${sizeAttr}\n/>`;
}
