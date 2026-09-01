import type { CircularMenuProps } from "@zentauri-ui/zentauri-components/ui/circular-menu";
import type { CircularMenuAnimation } from "@zentauri-ui/zentauri-components/ui/circular-menu/animated";

export type CircularMenuAppearanceOption = NonNullable<
  CircularMenuProps["appearance"]
>;
export type CircularMenuSizeOption = NonNullable<CircularMenuProps["size"]>;
export type CircularMenuTriggerOption = NonNullable<
  CircularMenuProps["trigger"]
>;
export type CircularMenuLabelPlacementOption = NonNullable<
  CircularMenuProps["labelPlacement"]
>;
export type CircularMenuItemRotationOption = NonNullable<
  CircularMenuProps["itemRotation"]
>;

export type CircularMenuDemoProps = {
  appearance: CircularMenuAppearanceOption;
  size: CircularMenuSizeOption;
  trigger: CircularMenuTriggerOption;
  labelPlacement: CircularMenuLabelPlacementOption;
  itemRotation: CircularMenuItemRotationOption;
  animation: CircularMenuAnimation;
  itemCount: number;
  radius: number;
  startAngle: number;
  sweep: number;
  spin: boolean;
  showSpokes: boolean;
  disabled: boolean;
};
