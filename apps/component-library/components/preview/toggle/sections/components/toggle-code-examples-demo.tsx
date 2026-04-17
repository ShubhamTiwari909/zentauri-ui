import { Toggle } from "@zentauri-ui/zentauri-components/ui/toggle";

import type { ToggleDemoProps } from "./toggle-code-examples.types";

export function ToggleDemo({ appearance, size }: ToggleDemoProps) {
  return (
    <Toggle
      appearance={appearance}
      size={size}
      defaultChecked
      animation="spring"
      aria-label="Demo toggle"
    />
  );
}
