import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type { HttpRequestViewerDemoProps } from "./types";

export function httpRequestViewerSnippet(
  opts: HttpRequestViewerDemoProps,
): string {
  const { dataset, appearance, size, animation = "none" } = opts;

  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;

  const lead = variantLeadComment(
    `request · ${dataset}, appearance · ${appearance}, size · ${size}${
      animation !== "none" ? `, animation · ${animation}` : ""
    }`,
  );

  if (animation !== "none") {
    return `import { HttpRequestViewerAnimated } from "@zentauri-ui/zentauri-components/ui/http-request-viewer/animated";\n\n${lead}<HttpRequestViewerAnimated\n  method={request.method}\n  url={request.url}\n  headers={request.headers}\n  query={request.query}\n  body={request.body}${appearanceAttr}${sizeAttr}\n  animation="${animation}"\n/>`;
  }

  return `import { HttpRequestViewer } from "@zentauri-ui/zentauri-components/ui/http-request-viewer";\n\n${lead}<HttpRequestViewer\n  method={request.method}\n  url={request.url}\n  headers={request.headers}\n  query={request.query}\n  body={request.body}${appearanceAttr}${sizeAttr}\n/>`;
}
