import { Gauge } from "@zentauri-ui/zentauri-components/ui/gauge";

import type { GaugeDemoProps } from "./types";

export function GaugeDemo(props: GaugeDemoProps) {
  return (
    <div className="flex min-h-52 items-center justify-center">
      <Gauge {...props} label="Completion" />
    </div>
  );
}
