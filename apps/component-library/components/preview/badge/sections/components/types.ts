import type { BadgeProps } from "@zentauri-ui/zentauri-components/ui/badge";

export type BadgeAppearance = NonNullable<BadgeProps["appearance"]>;
export type BadgeSize = NonNullable<BadgeProps["size"]>;
export type BadgeShape = NonNullable<BadgeProps["shape"]>;

export type BadgeDemoProps = {
  appearance: BadgeAppearance;
  size: BadgeSize;
  shape: BadgeShape;
};
