import { HttpRequestViewer } from "@zentauri-ui/zentauri-components/ui/http-request-viewer";
import { HttpRequestViewerAnimated } from "@zentauri-ui/zentauri-components/ui/http-request-viewer/animated";
import { HTTP_REQUEST_VIEWER_DATASETS } from "./data";
import type { HttpRequestViewerDemoProps } from "./types";

export function HttpRequestViewerDemo(props: HttpRequestViewerDemoProps) {
  const { dataset, appearance, size, animation = "none" } = props;
  const request = HTTP_REQUEST_VIEWER_DATASETS[dataset];

  if (animation === "none") {
    return (
      <HttpRequestViewer {...request} appearance={appearance} size={size} />
    );
  }
  return (
    <HttpRequestViewerAnimated
      {...request}
      appearance={appearance}
      size={size}
      animation={animation}
    />
  );
}
