import { RelativeTime } from "@zentauri-ui/zentauri-components/ui/relative-time";

import type { RelativeTimeDemoProps } from "./types";

export function RelativeTimeDemo({
  appearance,
  size,
  live,
}: RelativeTimeDemoProps) {
  return (
    <RelativeTime
      appearance={appearance}
      size={size}
      date={Date.now() - 180000}
      live={live}
      withTooltip
    />
  );
}
