import { JsonViewer } from "@zentauri-ui/zentauri-components/ui/json-viewer";
import { JsonViewerAnimated } from "@zentauri-ui/zentauri-components/ui/json-viewer/animated";
import { JSON_VIEWER_DATASETS } from "./data";
import type { JsonViewerDemoProps } from "./types";

export function JsonViewerDemo(props: JsonViewerDemoProps) {
  const { dataset, appearance, size, showToolbar, animation = "none" } = props;
  const data = JSON_VIEWER_DATASETS[dataset];

  if (animation === "none") {
    return (
      <JsonViewer
        data={data}
        appearance={appearance}
        size={size}
        showToolbar={showToolbar}
      />
    );
  }
  return (
    <JsonViewerAnimated
      data={data}
      appearance={appearance}
      size={size}
      showToolbar={showToolbar}
      animation={animation}
    />
  );
}
