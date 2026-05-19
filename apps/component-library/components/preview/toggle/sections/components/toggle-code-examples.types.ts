import type { ToggleProps, ToggleThumbVariantProps } from "@zentauri-ui/zentauri-components/ui/toggle";

export type ToggleAppearance = NonNullable<ToggleProps["appearance"]>;
export type ToggleSize = NonNullable<ToggleProps["size"]>;

export type ToggleDemoProps = {
  appearance: ToggleAppearance;
  size: ToggleSize;
  thumbColor: ToggleThumbVariantProps["thumbColor"];
};
