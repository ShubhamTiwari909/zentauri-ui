import type { JsonViewerProps } from "@zentauri-ui/zentauri-components/ui/json-viewer";
import type { JsonViewerAnimation } from "@zentauri-ui/zentauri-components/ui/json-viewer/animated";

import type { JSON_VIEWER_DATASET_KEYS } from "./data";

export type JsonViewerAppearance = NonNullable<JsonViewerProps["appearance"]>;
export type JsonViewerSize = NonNullable<JsonViewerProps["size"]>;
export type JsonViewerDatasetKey = (typeof JSON_VIEWER_DATASET_KEYS)[number];

export type JsonViewerDemoProps = {
  dataset: JsonViewerDatasetKey;
  appearance: JsonViewerAppearance;
  size: JsonViewerSize;
  showToolbar: boolean;
  animation?: JsonViewerAnimation;
};
