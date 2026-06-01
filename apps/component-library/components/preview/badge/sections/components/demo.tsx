import { Badge } from "@zentauri-ui/zentauri-components/ui/badge";

import type { BadgeDemoProps } from "./types";

export function BadgeDemo({ appearance, size, shape }: BadgeDemoProps) {
  if (shape === "dot") {
    return (
      <Badge
        appearance={appearance}
        size={size}
        shape={shape}
        aria-label="Status active"
      />
    );
  }
  return (
    <Badge appearance={appearance} size={size} shape={shape}>
      Featured
    </Badge>
  );
}
