import type { ApiResponseViewerProps } from "@zentauri-ui/zentauri-components/ui/api-response-viewer";
import type { ApiResponseViewerAnimation } from "@zentauri-ui/zentauri-components/ui/api-response-viewer/animated";

import type { API_RESPONSE_VIEWER_DATASET_KEYS } from "./data";

export type ApiResponseViewerAppearance = NonNullable<
  ApiResponseViewerProps["appearance"]
>;
export type ApiResponseViewerSize = NonNullable<ApiResponseViewerProps["size"]>;
export type ApiResponseViewerDatasetKey =
  (typeof API_RESPONSE_VIEWER_DATASET_KEYS)[number];

export type ApiResponseViewerDemoProps = {
  dataset: ApiResponseViewerDatasetKey;
  appearance: ApiResponseViewerAppearance;
  size: ApiResponseViewerSize;
  animation?: ApiResponseViewerAnimation;
};
