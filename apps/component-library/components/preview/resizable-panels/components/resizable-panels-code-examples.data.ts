import type {
  ResizablePanelsAppearance,
  ResizablePanelsOrientation,
} from "@zentauri-ui/zentauri-components/ui/resizable-panels";
export const PANEL_APPEARANCES = [
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
] as const satisfies readonly ResizablePanelsAppearance[];
export type PanelsOptions = {
  orientation: ResizablePanelsOrientation;
  appearance: ResizablePanelsAppearance;
  handleAppearance: ResizablePanelsAppearance;
  handleSize: "sm" | "md" | "lg";
  padding: "none" | "sm" | "md" | "lg";
  direction: "ltr" | "rtl";
  collapsible: boolean;
  disabled: boolean;
  minSize: number;
  maxSize: number;
  keyboardStep: number;
};
export const PANELS_DEFAULT_OPTIONS: PanelsOptions = {
  orientation: "horizontal",
  appearance: "subtle",
  handleAppearance: "blue",
  handleSize: "md",
  padding: "md",
  direction: "ltr",
  collapsible: true,
  disabled: false,
  minSize: 20,
  maxSize: 80,
  keyboardStep: 2,
};
