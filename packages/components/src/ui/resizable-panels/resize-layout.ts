import type { ResizablePanelProps } from "./types";

export type PanelConstraint = {
  id: string;
  min: number;
  max: number;
  collapsible: boolean;
  collapsed: number;
};
const epsilon = 0.000001;
export const sameSizes = (a: readonly number[], b: readonly number[]) =>
  a.length === b.length && a.every((n, i) => Math.abs(n - b[i]!) < epsilon);

export function panelConstraint(props: ResizablePanelProps): PanelConstraint {
  const {
    id,
    minSize = 10,
    maxSize = 100,
    collapsible = false,
    collapsedSize = 0,
  } = props;
  if (
    !id ||
    ![minSize, maxSize, collapsedSize].every(Number.isFinite) ||
    minSize < 0 ||
    maxSize > 100 ||
    minSize > maxSize ||
    collapsedSize < 0 ||
    collapsedSize > minSize
  )
    throw new Error(
      "ResizablePanel requires an id and finite sizes: 0 <= collapsedSize <= minSize <= maxSize <= 100.",
    );
  return {
    id,
    min: minSize,
    max: maxSize,
    collapsible,
    collapsed: collapsedSize,
  };
}

export function normalizeSizes(
  panels: readonly PanelConstraint[],
  values?: readonly number[],
): number[] {
  if (!panels.length) return [];
  if (new Set(panels.map((p) => p.id)).size !== panels.length)
    throw new Error("ResizablePanel ids must be unique within their group.");
  if (
    panels.reduce((s, p) => s + p.min, 0) > 100 + epsilon ||
    panels.reduce((s, p) => s + p.max, 0) < 100 - epsilon
  )
    throw new Error(
      "ResizablePanels constraints are infeasible: expanded minima must total <= 100 and maxima >= 100.",
    );
  const input = panels.map((_, i) =>
    Number.isFinite(values?.[i]) && values![i]! >= 0
      ? values![i]!
      : 100 / panels.length,
  );
  const collapsed = panels.map(
    (p, i) => p.collapsible && input[i]! < (p.min + p.collapsed) / 2,
  );
  // Reopen collapsed panes if their neighbours cannot absorb the remaining space.
  for (
    let i = 0;
    i < panels.length &&
    panels.reduce((s, p, j) => s + (collapsed[j] ? p.collapsed : p.max), 0) <
      100 - epsilon;
    i++
  )
    collapsed[i] = false;
  const limits = panels.map((p, i) =>
    collapsed[i] ? { min: p.collapsed, max: p.collapsed } : p,
  );
  const result = input.map((n, i) =>
    Math.min(limits[i]!.max, Math.max(limits[i]!.min, n)),
  );
  for (let pass = 0; pass <= panels.length; pass++) {
    const delta = 100 - result.reduce((a, b) => a + b, 0);
    if (Math.abs(delta) < epsilon) break;
    const free = limits.map((p, i) =>
      delta > 0 ? result[i]! < p.max - epsilon : result[i]! > p.min + epsilon,
    );
    const count = free.filter(Boolean).length;
    if (!count) break;
    for (let i = 0; i < result.length; i++)
      if (free[i])
        result[i] = Math.min(
          limits[i]!.max,
          Math.max(limits[i]!.min, result[i]! + delta / count),
        );
  }
  return result;
}

type Interval = readonly [number, number];
function intervals(p: PanelConstraint): Interval[] {
  return p.collapsible
    ? [
        [p.min, p.max],
        [p.collapsed, p.collapsed],
      ]
    : [[p.min, p.max]];
}
export function resizeIntervals(
  panels: readonly PanelConstraint[],
  sizes: readonly number[],
  index: number,
): Interval[] {
  const a = panels[index],
    b = panels[index + 1];
  if (!a || !b) return [];
  const total = sizes[index]! + sizes[index + 1]!;
  const result: Interval[] = [];
  for (const [aMin, aMax] of intervals(a))
    for (const [bMin, bMax] of intervals(b)) {
      const min = Math.max(aMin, total - bMax),
        max = Math.min(aMax, total - bMin);
      if (min <= max + epsilon) result.push([min, max]);
    }
  return result;
}
export function resizePair(
  panels: readonly PanelConstraint[],
  sizes: readonly number[],
  index: number,
  desired: number,
): number[] {
  const valid = resizeIntervals(panels, sizes, index);
  if (!valid.length || !Number.isFinite(desired)) return [...sizes];
  const options = valid.map(([min, max]) =>
    Math.max(min, Math.min(max, desired)),
  );
  const nearest = options.reduce((a, b) =>
    Math.abs(desired - b) < Math.abs(desired - a) ? b : a,
  );
  const result = [...sizes];
  result[index] = nearest;
  result[index + 1] = sizes[index]! + sizes[index + 1]! - nearest;
  return result;
}
