import type { ToggleProps } from "@zentauri-ui/zentauri-components/ui";

export type ToggleAppearance = NonNullable<ToggleProps["appearance"]>;
export type ToggleSize = NonNullable<ToggleProps["size"]>;

export type ToggleDemoProps = {
  appearance: ToggleAppearance;
  size: ToggleSize;
};
