import { LogViewer } from "@zentauri-ui/zentauri-components/ui/log-viewer";
import { LogViewerAnimated } from "@zentauri-ui/zentauri-components/ui/log-viewer/animated";
import { LOG_VIEWER_DATASETS } from "./data";
import type { LogViewerDemoProps } from "./types";

export function LogViewerDemo(props: LogViewerDemoProps) {
  const {
    dataset,
    appearance,
    size,
    showHeader,
    showSummary,
    enableSearch,
    enableClipboard,
    animation = "none",
  } = props;
  const entries = [...LOG_VIEWER_DATASETS[dataset]];

  const commonProps = {
    entries,
    appearance,
    size,
    showHeader,
    showSummary,
    enableSearch,
    enableClipboard,
  };

  if (animation === "none") {
    return <LogViewer {...commonProps} />;
  }
  return <LogViewerAnimated {...commonProps} animation={animation} />;
}
