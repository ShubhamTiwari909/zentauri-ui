import { Divider } from "@zentauri-ui/zentauri-components/ui/divider";

import type { DividerDemoProps } from "./divider-code-examples.types";

export function DividerDemo({
  appearance,
  orientation,
  size,
  withLabel,
}: DividerDemoProps) {
  const wrapClass =
    orientation === "vertical"
      ? "flex h-24 items-stretch justify-center"
      : "w-full max-w-md";
  return (
    <div className={wrapClass}>
      <Divider
        appearance={appearance}
        orientation={orientation}
        size={size}
        label={withLabel ? "Section" : undefined}
      />
    </div>
  );
}
