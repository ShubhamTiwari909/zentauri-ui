import { ToggleAnimated } from "@zentauri-ui/zentauri-components/ui/toggle/animated";

import type { ToggleDemoProps } from "./toggle-code-examples.types";

export function ToggleDemo({ appearance, size }: ToggleDemoProps) {
  return (
    <ToggleAnimated
      appearance={appearance}
      size={size}
      defaultChecked
      animation="spring"
      aria-label="Demo toggle"
    />
  );
}
