import type {
  BentoGridAnimation,
  BentoGridItemProps,
  BentoGridProps,
  BentoGridSpan,
} from "@zentauri-ui/zentauri-components/ui/bento-grid";

export const BENTO_GRID_APPEARANCES = [
  "default",
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
] as const satisfies readonly NonNullable<BentoGridItemProps["appearance"]>[];

export const BENTO_GRID_SPANS = [
  "1x1",
  "2x1",
  "1x2",
  "2x2",
  "featured",
] as const satisfies readonly BentoGridSpan[];

export const BENTO_GRID_GAPS = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<BentoGridProps["gap"]>[];

export const BENTO_GRID_ANIMATIONS = [
  "none",
  "reflow",
  "bento",
  "morph",
] as const satisfies readonly BentoGridAnimation[];

export const BENTO_GRID_COLS = ["3", "4", "5"] as const;

/** Single source of truth for the demo grid's filler tiles — the live demo and
 * the generated code snippet both render from this list. */
export const BENTO_GRID_FILLER_ITEMS = [
  { id: "b", title: "Sessions", appearance: "default" },
  { id: "c", title: "Conversion", appearance: "glass" },
  { id: "d", title: "Churn", appearance: "default" },
  { id: "e", title: "Signups", appearance: "glass" },
  { id: "f", title: "NPS", appearance: "default" },
] as const satisfies readonly {
  id: string;
  title: string;
  appearance: NonNullable<BentoGridItemProps["appearance"]>;
}[];
