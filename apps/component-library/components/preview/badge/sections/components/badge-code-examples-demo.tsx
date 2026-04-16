import { Badge } from "@zentauri-ui/zentauri-components/ui/badge";

import type { BadgeDemoProps } from "./badge-code-examples.types";

export function BadgeDemo({ appearance, size, shape }: BadgeDemoProps) {
  if (shape === "dot") {
    return (
      <Badge
        appearance={appearance}
        size={size}
        shape={shape}
        animation="none"
        aria-label="Status active"
      />
    );
  }
  return (
    <Badge appearance={appearance} size={size} shape={shape} animation="none">
      Featured
    </Badge>
  );
}
