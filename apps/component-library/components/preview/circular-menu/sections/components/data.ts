import type { CircularMenuProps } from "@zentauri-ui/zentauri-components/ui/circular-menu";

export const CIRCULAR_MENU_APPEARANCES = [
  "default",
  "primary",
  "secondary",
  "success",
  "destructive",
  "warning",
  "info",
  "blue",
  "violet",
  "emerald",
  "amber",
  "rose",
  "slate",
  "zinc",
  "gradient-blue",
  "gradient-violet",
  "gradient-rose",
  "glass",
] as const satisfies readonly NonNullable<CircularMenuProps["appearance"]>[];

export const CIRCULAR_MENU_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<CircularMenuProps["size"]>[];

export const CIRCULAR_MENU_TRIGGERS = [
  "click",
  "hover",
  "always",
] as const satisfies readonly NonNullable<CircularMenuProps["trigger"]>[];

export const CIRCULAR_MENU_LABEL_PLACEMENTS = [
  "tooltip",
  "outside",
  "inside",
  "none",
] as const satisfies readonly NonNullable<
  CircularMenuProps["labelPlacement"]
>[];

export const CIRCULAR_MENU_ITEM_ROTATIONS = [
  "upright",
  "follow",
] as const satisfies readonly NonNullable<CircularMenuProps["itemRotation"]>[];

export const CIRCULAR_MENU_ANIMATIONS = [
  "none",
  "fade",
  "scale",
  "pop",
  "spiral",
] as const;

/** Arc presets: full ring, half circle, and a quarter fan. */
export const CIRCULAR_MENU_SWEEPS = ["360", "180", "90"] as const;

export const CIRCULAR_MENU_ITEM_COUNTS = [
  "3",
  "4",
  "5",
  "6",
  "8",
  "10",
  "12",
] as const;

export const CIRCULAR_MENU_RADII = ["80", "110", "132", "160", "200"] as const;
