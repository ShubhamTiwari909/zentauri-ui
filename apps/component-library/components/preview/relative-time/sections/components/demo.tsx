import { useMemo } from "react";
import { RelativeTime } from "@zentauri-ui/zentauri-components/ui/relative-time";

import type { RelativeTimeDemoProps } from "./types";

export function RelativeTimeDemo({
  appearance,
  size,
  live,
}: RelativeTimeDemoProps) {
  const targetDate = useMemo(() => Date.now() - 120000, []);
  return (
    <RelativeTime
      appearance={appearance}
      size={size}
      date={targetDate}
      live={live}
      withTooltip
    />
  );
}
