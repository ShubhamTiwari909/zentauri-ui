import { ToggleAnimated } from "@zentauri-ui/zentauri-components/ui/toggle/animated";

import type { ToggleDemoProps } from "./types";

export function ToggleDemo({ appearance, size, thumbColor }: ToggleDemoProps) {
  return (
    <ToggleAnimated
      appearance={appearance}
      size={size}
      thumbColor={thumbColor}
      defaultChecked
      animation="spring"
      aria-label="Demo toggle"
    />
  );
}
