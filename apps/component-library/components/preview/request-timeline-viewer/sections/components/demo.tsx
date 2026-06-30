import { RequestTimelineViewer } from "@zentauri-ui/zentauri-components/ui/request-timeline-viewer";
import { RequestTimelineViewerAnimated } from "@zentauri-ui/zentauri-components/ui/request-timeline-viewer/animated";
import { REQUEST_TIMELINE_VIEWER_DATASETS } from "./data";
import type { RequestTimelineViewerDemoProps } from "./types";

export function RequestTimelineViewerDemo(
  props: RequestTimelineViewerDemoProps,
) {
  const { dataset, appearance, size, showLegend, animation = "none" } = props;
  const phases = REQUEST_TIMELINE_VIEWER_DATASETS[dataset];

  if (animation === "none") {
    return (
      <RequestTimelineViewer
        phases={phases}
        appearance={appearance}
        size={size}
        showLegend={showLegend}
      />
    );
  }
  return (
    <RequestTimelineViewerAnimated
      phases={phases}
      appearance={appearance}
      size={size}
      showLegend={showLegend}
      animation={animation}
    />
  );
}
