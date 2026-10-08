import type { ToolbarProps } from "@zentauri-ui/zentauri-components/ui/toolbar";
export const TOOLBAR_APPEARANCES = [
  "default",
  "subtle",
  "contrast",
  "glass",
  "blue",
  "cyan",
  "green",
  "lime",
  "emerald",
  "indigo",
  "purple",
  "pink",
  "rose",
  "sky",
  "teal",
  "yellow",
  "orange",
  "red",
  "slate",
  "gray",
  "zinc",
  "gradient-blue",
  "gradient-green",
  "gradient-purple",
  "gradient-orange",
  "gradient-pink",
] as const satisfies readonly NonNullable<ToolbarProps["appearance"]>[];
export type ToolbarOptions = {
  appearance: NonNullable<ToolbarProps["appearance"]>;
  orientation: "horizontal" | "vertical";
  size: "sm" | "md" | "lg";
  dir: "ltr" | "rtl";
  loop: boolean;
  wrap: boolean;
  disabled: boolean;
  disableExport: boolean;
};
export const TOOLBAR_DEFAULT_OPTIONS: ToolbarOptions = {
  appearance: "subtle",
  orientation: "horizontal",
  size: "md",
  dir: "ltr",
  loop: true,
  wrap: true,
  disabled: false,
  disableExport: false,
};
