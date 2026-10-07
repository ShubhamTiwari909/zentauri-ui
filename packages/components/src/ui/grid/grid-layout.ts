import type { CSSProperties } from "react";
import {
  zuiGridGapValues,
  zuiGridGapDarkValues,
  zuiGridMinItemWidth,
  zuiGridMinItemWidthDark,
} from "../../design-system/grid";
import type {
  GridBreakpoint,
  GridGap,
  GridItemProps,
  GridLayout,
  GridProps,
  GridResponsiveValue,
} from "./types";

export const gridBreakpoints: readonly GridBreakpoint[] = [
  "base",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
];
export type GridLayoutMap = Record<GridBreakpoint, GridLayout>;
type GridStyle = CSSProperties & Record<string, string | number | undefined>;
const defaultLayout: GridLayout = { mode: "fixed", columns: 1 };
const warned = new Set<string>();
export function warnGrid(message: string) {
  // NODE_ENV is provided by the consuming bundler, independently of Turbo tasks.
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  if (process.env.NODE_ENV !== "production" && !warned.has(message)) {
    warned.add(message);
    console.warn(`[Grid] ${message}`);
  }
}

export function resolveGridResponsive<T>(
  value: GridResponsiveValue<T> | undefined,
  fallback: T,
): Record<GridBreakpoint, T> {
  const result = {} as Record<GridBreakpoint, T>;
  const map =
    value !== null && typeof value === "object" && !("mode" in value)
      ? (value as Partial<Record<GridBreakpoint, T>>)
      : undefined;
  if (map) {
    if (map.base == null)
      warnGrid("Responsive maps require base; using the default.");
    if (
      Object.keys(map).some(
        (key) => !gridBreakpoints.includes(key as GridBreakpoint),
      )
    )
      warnGrid("Unknown breakpoint keys were ignored.");
  }
  let current = map ? fallback : (value ?? (fallback as T));
  for (const bp of gridBreakpoints) {
    if (map?.[bp] != null) current = map[bp] as T;
    result[bp] = current as T;
  }
  return result;
}

function positiveInteger(value: unknown, fallback: number, message: string) {
  if (typeof value === "number" && Number.isInteger(value) && value > 0)
    return value;
  warnGrid(message);
  return fallback;
}

function gridStart(value: unknown, message: string): number | "auto" {
  if (
    value === "auto" ||
    (typeof value === "number" && Number.isInteger(value) && value > 0)
  )
    return value;
  warnGrid(message);
  return "auto";
}

/** The convenience API accepts simple names and rectangular regions, not arbitrary CSS syntax. */
export function gridAreaNames(
  areas: readonly string[] | undefined,
): string[] | null {
  if (areas === undefined) return [];
  if (
    !Array.isArray(areas) ||
    !areas.length ||
    areas.some((row) => typeof row !== "string" || !row.trim())
  )
    return null;
  const matrix: string[][] = areas.map((row: string) =>
    row.trim().split(/\s+/),
  );
  if (matrix.some((row) => row.length !== matrix[0]!.length)) return null;
  const names = [...new Set(matrix.flat().filter((name) => name !== "."))];
  if (
    names.some(
      (name) =>
        !/^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(name) ||
        [
          "auto",
          "span",
          "initial",
          "inherit",
          "unset",
          "revert",
          "revert-layer",
        ].includes(name),
    )
  )
    return null;
  for (const name of names) {
    const points = matrix.flatMap((row, r) =>
      row.flatMap((cell, c) => (cell === name ? [[r, c]] : [])),
    );
    const rows = points.map((point) => point[0]!);
    const cols = points.map((point) => point[1]!);
    for (let r = Math.min(...rows); r <= Math.max(...rows); r++) {
      for (let c = Math.min(...cols); c <= Math.max(...cols); c++)
        if (matrix[r]![c] !== name) return null;
    }
  }
  return names;
}

export function normalizeGridLayout(value: GridLayout): GridLayout {
  if (!value || typeof value !== "object") {
    warnGrid("Invalid layout; using one column.");
    return defaultLayout;
  }
  if (value.mode === "fixed") {
    const columns = positiveInteger(
      value.columns,
      1,
      "Fixed columns must be positive integers.",
    );
    if (columns > 24)
      warnGrid(
        "Fixed columns were clamped to 24; use custom templates for larger grids.",
      );
    return { mode: "fixed", columns: Math.min(columns, 24) };
  }
  if (value.mode === "auto") {
    let width = value.minItemWidth;
    if (
      width !== undefined &&
      !(typeof width === "number"
        ? Number.isFinite(width) && width > 0
        : typeof width === "string" && width.trim().length > 0)
    ) {
      warnGrid("Invalid minimum item width; using the themed default.");
      width = undefined;
    }
    return {
      mode: "auto",
      minItemWidth: width,
      repeat: value.repeat === "fill" ? "fill" : "fit",
    };
  }
  if (
    value.mode === "custom" &&
    typeof value.columns === "string" &&
    value.columns.trim()
  ) {
    const names = gridAreaNames(value.areas);
    if (names === null) warnGrid("Invalid area matrix; areas were ignored.");
    return {
      mode: "custom",
      columns: value.columns,
      rows:
        typeof value.rows === "string" && value.rows.trim()
          ? value.rows
          : undefined,
      areas: names === null ? undefined : value.areas,
    };
  }
  warnGrid("Invalid layout; using one column.");
  return defaultLayout;
}

export function resolveGridLayouts(
  layout: GridProps["layout"],
  stackOnMobile = false,
): GridLayoutMap {
  const map = resolveGridResponsive(layout, defaultLayout);
  for (const bp of gridBreakpoints) map[bp] = normalizeGridLayout(map[bp]);
  // Resolve inheritance first: sm must restore the declared base layout.
  if (stackOnMobile) map.base = defaultLayout;
  return map;
}

function columnsTemplate(layout: GridLayout, dark: boolean): string {
  if (layout.mode === "fixed")
    return `repeat(${layout.columns}, minmax(0, 1fr))`;
  if (layout.mode === "custom") return layout.columns;
  const width =
    typeof layout.minItemWidth === "number"
      ? `${layout.minItemWidth}px`
      : (layout.minItemWidth ??
        (dark ? zuiGridMinItemWidthDark : zuiGridMinItemWidth));
  return `repeat(auto-${layout.repeat === "fill" ? "fill" : "fit"}, minmax(min(${width}, 100%), 1fr))`;
}
function gapToken(gap: GridGap, dark: boolean) {
  if (!Object.hasOwn(zuiGridGapValues, gap)) {
    warnGrid("Unknown gap; using md.");
    gap = "md";
  }
  return (dark ? zuiGridGapDarkValues : zuiGridGapValues)[gap];
}

export function gridRootStyle(
  layouts: GridLayoutMap,
  props: Pick<GridProps, "gap" | "rowGap" | "columnGap" | "autoRows">,
): GridStyle {
  const gaps = resolveGridResponsive<GridGap>(props.gap, "md");
  const rows =
    props.rowGap === undefined
      ? gaps
      : resolveGridResponsive<GridGap>(props.rowGap, "md");
  const cols =
    props.columnGap === undefined
      ? gaps
      : resolveGridResponsive<GridGap>(props.columnGap, "md");
  const style: GridStyle = { gridAutoRows: props.autoRows ?? "auto" };
  for (const bp of gridBreakpoints) {
    const layout = layouts[bp];
    style[`--_zui-grid-columns-${bp}`] = columnsTemplate(layout, false);
    style[`--_zui-grid-columns-${bp}-dark`] = columnsTemplate(layout, true);
    style[`--_zui-grid-rows-${bp}`] =
      layout.mode === "custom" ? (layout.rows ?? "none") : "none";
    style[`--_zui-grid-areas-${bp}`] =
      layout.mode === "custom" && layout.areas?.length
        ? layout.areas.map((row) => `"${row.trim()}"`).join(" ")
        : "none";
    for (const dark of [false, true]) {
      const suffix = dark ? "-dark" : "";
      style[`--_zui-grid-column-gap-${bp}${suffix}`] = gapToken(cols[bp], dark);
      style[`--_zui-grid-row-gap-${bp}${suffix}`] = gapToken(rows[bp], dark);
    }
  }
  return style;
}

export function gridItemStyle(
  layouts: GridLayoutMap,
  props: Pick<
    GridItemProps,
    "colSpan" | "rowSpan" | "columnStart" | "rowStart" | "area"
  >,
  stackOnMobile = false,
): GridStyle {
  const spans = resolveGridResponsive(props.colSpan, 1);
  const rowSpans = resolveGridResponsive(props.rowSpan, 1);
  const starts = resolveGridResponsive(props.columnStart, "auto");
  const rowStarts = resolveGridResponsive(props.rowStart, "auto");
  const areas = resolveGridResponsive(props.area, "auto");
  const style: GridStyle = {};
  for (const bp of gridBreakpoints) {
    if (bp === "base" && stackOnMobile) {
      style["--_zui-grid-item-column-start-base"] = "auto";
      style["--_zui-grid-item-column-end-base"] = "span 1";
      style["--_zui-grid-item-row-start-base"] = "auto";
      style["--_zui-grid-item-row-end-base"] = "span 1";
      continue;
    }
    const layout = layouts[bp];
    let span =
      spans[bp] === "full"
        ? "full"
        : positiveInteger(
            spans[bp],
            1,
            "Column spans must be positive integers or full.",
          );
    let start = gridStart(
      starts[bp],
      "Column starts must be positive integers or auto.",
    );
    if (layout.mode === "auto") {
      if ((span !== "full" && span !== 1) || start !== "auto")
        warnGrid(
          "Auto layouts support ordinary or full-width items; column starts and wider numeric spans were reset.",
        );
      if (span !== "full") span = 1;
      start = "auto";
    } else if (layout.mode === "fixed") {
      if (start !== "auto") start = Math.min(start as number, layout.columns);
      if (span !== "full")
        span = Math.min(
          span as number,
          start === "auto"
            ? layout.columns
            : layout.columns - (start as number) + 1,
        );
    }
    const rowSpan = positiveInteger(
      rowSpans[bp],
      1,
      "Row spans must be positive integers.",
    );
    const rowStart = gridStart(
      rowStarts[bp],
      "Row starts must be positive integers or auto.",
    );
    const area = areas[bp];
    const named =
      area !== "auto" &&
      layout.mode === "custom" &&
      gridAreaNames(layout.areas)?.includes(area);
    if (area !== "auto" && layout.mode === "custom" && !named)
      warnGrid(
        "Item area is absent from the custom layout; using normal placement.",
      );
    // Set all four longhands: grid-area would reset spans in CSS's declaration order.
    style[`--_zui-grid-item-column-start-${bp}`] = named
      ? area
      : span === "full"
        ? "1"
        : String(start);
    style[`--_zui-grid-item-column-end-${bp}`] = named
      ? area
      : span === "full"
        ? "-1"
        : `span ${span}`;
    style[`--_zui-grid-item-row-start-${bp}`] = named ? area : String(rowStart);
    style[`--_zui-grid-item-row-end-${bp}`] = named ? area : `span ${rowSpan}`;
  }
  return style;
}
