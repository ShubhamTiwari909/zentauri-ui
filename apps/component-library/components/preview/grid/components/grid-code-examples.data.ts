import type {
  GridAppearance,
  GridGap,
  GridLayout,
  GridProps,
  GridSpan,
} from "@zentauri-ui/zentauri-components/ui/grid";

export const GRID_APPEARANCES = [
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
] as const satisfies readonly GridAppearance[];
export const GRID_GAPS = [
  "none",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
] as const satisfies readonly GridGap[];

export type GridPlaygroundOptions = {
  mode: "fixed" | "fit" | "fill" | "custom";
  preset: "none" | "dashboard" | "collection";
  columns: number;
  stackOnMobile: boolean;
  minWidth: number;
  gap: GridGap;
  rowGap: GridGap | "inherit";
  columnGap: GridGap | "inherit";
  appearance: GridAppearance;
  padding: "none" | "sm" | "md" | "lg";
  span: GridSpan;
  rowSpan: number;
  columnStart: number | "auto";
  alignItems: "start" | "center" | "end" | "stretch";
};
export const GRID_DEFAULT_OPTIONS: GridPlaygroundOptions = {
  mode: "fixed",
  preset: "none",
  columns: 3,
  stackOnMobile: true,
  minWidth: 200,
  gap: "md",
  rowGap: "inherit",
  columnGap: "inherit",
  appearance: "blue",
  padding: "md",
  span: 1,
  rowSpan: 1,
  columnStart: "auto",
  alignItems: "stretch",
};
export function gridPlaygroundLayout(
  options: GridPlaygroundOptions,
): NonNullable<GridProps["layout"]> {
  if (options.preset === "dashboard")
    return {
      base: { mode: "fixed", columns: 1 },
      md: { mode: "fixed", columns: 3 },
      xl: { mode: "fixed", columns: 6 },
    };
  if (options.preset === "collection")
    return {
      base: { mode: "fixed", columns: 1 },
      sm: { mode: "fixed", columns: 2 },
      lg: { mode: "fixed", columns: 4 },
    };
  if (options.mode === "fixed")
    return { mode: "fixed", columns: options.columns };
  if (options.mode === "custom")
    return {
      mode: "custom",
      columns: "minmax(0, 2fr) minmax(0, 1fr)",
      areas: ["main aside", "footer footer"],
    };
  return { mode: "auto", minItemWidth: options.minWidth, repeat: options.mode };
}

export const GRID_DASHBOARD_LAYOUT = {
  base: { mode: "fixed", columns: 1 },
  md: { mode: "fixed", columns: 6 },
  xl: { mode: "fixed", columns: 12 },
} as const satisfies GridProps["layout"];
export const GRID_AREA_LAYOUT = {
  base: {
    mode: "custom",
    columns: "minmax(0, 1fr)",
    areas: ["main", "aside", "footer"],
  },
  lg: {
    mode: "custom",
    columns: "minmax(0, 2fr) minmax(0, 1fr)",
    areas: ["main aside", "footer footer"],
  },
} as const satisfies GridProps["layout"];
export const GRID_AUTO_LAYOUT = {
  mode: "auto",
  minItemWidth: "16rem",
  repeat: "fit",
} as const satisfies GridLayout;
