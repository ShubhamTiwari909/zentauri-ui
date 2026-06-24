import { CodeDiff } from "@zentauri-ui/zentauri-components/ui/code-diff";

import type { CodeDiffDemoProps } from "./types";

export function CodeDiffDemo({
  oldCode,
  newCode,
  viewType,
  size,
  showLineNumbers,
  showGutterMarkers,
}: CodeDiffDemoProps) {
  return (
    <CodeDiff
      oldCode={oldCode}
      newCode={newCode}
      viewType={viewType}
      size={size}
      showLineNumbers={showLineNumbers}
      showGutterMarkers={showGutterMarkers}
    />
  );
}
