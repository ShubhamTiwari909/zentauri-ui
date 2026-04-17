import type { DrawerContentProps } from "@zentauri-ui/zentauri-components/ui/drawer";

export const DRAWER_CODE_EXAMPLES_SECTION_CLASS =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

export const DRAWER_TRIGGER_CLASS = "rounded-lg px-3 py-1.5 text-sm";

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
