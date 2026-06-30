import type { HttpRequestViewerProps } from "@zentauri-ui/zentauri-components/ui/http-request-viewer";
import type { HttpRequestViewerAnimation } from "@zentauri-ui/zentauri-components/ui/http-request-viewer/animated";

import type { HTTP_REQUEST_VIEWER_DATASET_KEYS } from "./data";

export type HttpRequestViewerAppearance = NonNullable<
  HttpRequestViewerProps["appearance"]
>;
export type HttpRequestViewerSize = NonNullable<HttpRequestViewerProps["size"]>;
export type HttpRequestViewerDatasetKey =
  (typeof HTTP_REQUEST_VIEWER_DATASET_KEYS)[number];

export type HttpRequestViewerDemoProps = {
  dataset: HttpRequestViewerDatasetKey;
  appearance: HttpRequestViewerAppearance;
  size: HttpRequestViewerSize;
  animation?: HttpRequestViewerAnimation;
};
