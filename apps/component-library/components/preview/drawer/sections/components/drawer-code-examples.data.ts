import type { DrawerContentProps } from "@zentauri-ui/zentauri-components/ui/drawer";

export { PREVIEW_SECTION_CLASS as DRAWER_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const DRAWER_SIDES = [
  "left",
  "right",
  "top",
  "bottom",
] as const satisfies readonly NonNullable<DrawerContentProps["side"]>[];

export const DRAWER_SIZES = [
  "sm",
  "md",
  "lg",
  "xl",
  "full",
] as const satisfies readonly NonNullable<DrawerContentProps["size"]>[];

export const DRAWER_APPEARANCES = [
  "default",
  "glass",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
  "gray",
  "amber",
  "violet",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly NonNullable<DrawerContentProps["appearance"]>[];
