import { ApiResponseViewer } from "@zentauri-ui/zentauri-components/ui/api-response-viewer";
import { ApiResponseViewerAnimated } from "@zentauri-ui/zentauri-components/ui/api-response-viewer/animated";
import { API_RESPONSE_VIEWER_DATASETS } from "./data";
import type { ApiResponseViewerDemoProps } from "./types";

export function ApiResponseViewerDemo(props: ApiResponseViewerDemoProps) {
  const { dataset, appearance, size, animation = "none" } = props;
  const response = API_RESPONSE_VIEWER_DATASETS[dataset];

  if (animation === "none") {
    return (
      <ApiResponseViewer {...response} appearance={appearance} size={size} />
    );
  }
  return (
    <ApiResponseViewerAnimated
      {...response}
      appearance={appearance}
      size={size}
      animation={animation}
    />
  );
}
