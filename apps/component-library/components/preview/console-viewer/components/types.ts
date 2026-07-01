import type { ConsoleViewerProps } from "@zentauri-ui/zentauri-components/ui/console-viewer";
import type { ConsoleViewerAnimation } from "@zentauri-ui/zentauri-components/ui/console-viewer/animated";

import type { CONSOLE_VIEWER_DATASET_KEYS } from "./data";

export type ConsoleViewerAppearance = NonNullable<
  ConsoleViewerProps["appearance"]
>;
export type ConsoleViewerSize = NonNullable<ConsoleViewerProps["size"]>;
export type ConsoleViewerDatasetKey =
  (typeof CONSOLE_VIEWER_DATASET_KEYS)[number];

export type ConsoleViewerDemoProps = {
  dataset: ConsoleViewerDatasetKey;
  appearance: ConsoleViewerAppearance;
  size: ConsoleViewerSize;
  enableFilter: boolean;
  enableClear: boolean;
  enableClipboard: boolean;
  enableCollapseAll: boolean;
  animation?: ConsoleViewerAnimation;
};
