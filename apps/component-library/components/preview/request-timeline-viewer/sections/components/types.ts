import type { RequestTimelineViewerProps } from "@zentauri-ui/zentauri-components/ui/request-timeline-viewer";
import type { RequestTimelineViewerAnimation } from "@zentauri-ui/zentauri-components/ui/request-timeline-viewer/animated";

import type { REQUEST_TIMELINE_VIEWER_DATASET_KEYS } from "./data";

export type RequestTimelineViewerAppearance = NonNullable<
  RequestTimelineViewerProps["appearance"]
>;
export type RequestTimelineViewerSize = NonNullable<
  RequestTimelineViewerProps["size"]
>;
export type RequestTimelineViewerDatasetKey =
  (typeof REQUEST_TIMELINE_VIEWER_DATASET_KEYS)[number];

export type RequestTimelineViewerDemoProps = {
  dataset: RequestTimelineViewerDatasetKey;
  appearance: RequestTimelineViewerAppearance;
  size: RequestTimelineViewerSize;
  showLegend: boolean;
  animation?: RequestTimelineViewerAnimation;
};
