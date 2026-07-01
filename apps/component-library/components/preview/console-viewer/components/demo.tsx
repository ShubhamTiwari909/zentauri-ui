import { ConsoleViewer } from "@zentauri-ui/zentauri-components/ui/console-viewer";
import { ConsoleViewerAnimated } from "@zentauri-ui/zentauri-components/ui/console-viewer/animated";
import { CONSOLE_VIEWER_DATASETS } from "./data";
import type { ConsoleViewerDemoProps } from "./types";

export function ConsoleViewerDemo(props: ConsoleViewerDemoProps) {
  const {
    dataset,
    appearance,
    size,
    enableFilter,
    enableClear,
    enableClipboard,
    enableCollapseAll,
    animation = "none",
  } = props;
  const entries = [...CONSOLE_VIEWER_DATASETS[dataset]];

  if (animation === "none") {
    return (
      <ConsoleViewer
        entries={entries}
        appearance={appearance}
        size={size}
        enableFilter={enableFilter}
        enableClear={enableClear}
        enableClipboard={enableClipboard}
        enableCollapseAll={enableCollapseAll}
      />
    );
  }
  return (
    <ConsoleViewerAnimated
      entries={entries}
      appearance={appearance}
      size={size}
      enableFilter={enableFilter}
      enableClear={enableClear}
      enableClipboard={enableClipboard}
      enableCollapseAll={enableCollapseAll}
      animation={animation}
    />
  );
}
