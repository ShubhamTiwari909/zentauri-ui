import type { DrawerContentProps } from "@zentauri-ui/zentauri-components/ui/drawer";

export type DrawerDemoSide = NonNullable<DrawerContentProps["side"]>;
export type DrawerDemoSize = NonNullable<DrawerContentProps["size"]>;
export type DrawerDemoAppearance = NonNullable<DrawerContentProps["appearance"]>;

export type DrawerDemoProps = {
  side: DrawerDemoSide;
  size: DrawerDemoSize;
  appearance: DrawerDemoAppearance;
  label: string;
};
