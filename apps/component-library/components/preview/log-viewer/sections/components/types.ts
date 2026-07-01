import type { LogViewerProps } from "@zentauri-ui/zentauri-components/ui/log-viewer";
import type { LogViewerAnimation } from "@zentauri-ui/zentauri-components/ui/log-viewer/animated";

import type { LOG_VIEWER_DATASET_KEYS } from "./data";

export type LogViewerAppearance = NonNullable<LogViewerProps["appearance"]>;
export type LogViewerSize = NonNullable<LogViewerProps["size"]>;
export type LogViewerDatasetKey = (typeof LOG_VIEWER_DATASET_KEYS)[number];

export type LogViewerDemoProps = {
  dataset: LogViewerDatasetKey;
  appearance: LogViewerAppearance;
  size: LogViewerSize;
  showHeader: boolean;
  showSummary: boolean;
  enableSearch: boolean;
  enableClipboard: boolean;
  animation?: LogViewerAnimation;
};
