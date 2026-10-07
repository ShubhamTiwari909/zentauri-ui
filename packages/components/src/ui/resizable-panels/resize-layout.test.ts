import { describe, expect, it } from "vitest";
import {
  normalizeSizes,
  panelConstraint,
  resizeIntervals,
  resizePair,
  sameSizes,
} from "./resize-layout";
const panel = (id: string, extra = {}) => panelConstraint({ id, ...extra });
describe("ResizablePanels sizing", () => {
  it("supports empty groups and single panes", () => {
    expect(normalizeSizes([])).toEqual([]);
    expect(normalizeSizes([panel("a")])).toEqual([100]);
  });
  it("normalizes defaults, non-finite values, and sums within constraints", () => {
    const panels = [panel("a", { minSize: 20, maxSize: 40 }), panel("b")];
    expect(normalizeSizes(panels)).toEqual([40, 60]);
    expect(normalizeSizes(panels, [NaN, -1])).toEqual([40, 60]);
    expect(normalizeSizes(panels, [0, 0])).toEqual([40, 60]);
    expect(normalizeSizes(panels, [30, 70])).toEqual([30, 70]);
  });
  it.each([
    { minSize: -1 },
    { maxSize: 101 },
    { minSize: 60, maxSize: 20 },
    { minSize: Infinity },
    { collapsedSize: -1 },
    { collapsedSize: 30, minSize: 20 },
  ])("rejects invalid panel constraints %j", (values) => {
    expect(() => panel("a", values)).toThrow("finite sizes");
  });
  it("rejects empty or duplicate identities and infeasible expanded limits", () => {
    expect(() => panel("")).toThrow();
    expect(() => normalizeSizes([panel("a"), panel("a")])).toThrow("unique");
    expect(() =>
      normalizeSizes([
        panel("a", { minSize: 60 }),
        panel("b", { minSize: 60 }),
      ]),
    ).toThrow("infeasible");
    expect(() =>
      normalizeSizes([
        panel("a", { maxSize: 40 }),
        panel("b", { maxSize: 40 }),
      ]),
    ).toThrow("infeasible");
  });
  it("preserves collapsed defaults when other panes can absorb the remainder", () => {
    expect(
      normalizeSizes(
        [panel("a", { collapsible: true, minSize: 20 }), panel("b")],
        [0, 100],
      ),
    ).toEqual([0, 100]);
    expect(
      normalizeSizes(
        [
          panel("a", { collapsible: true, minSize: 20 }),
          panel("b", { maxSize: 70 }),
        ],
        [0, 100],
      ),
    ).toEqual([30, 70]);
  });
  it("resizes only the adjacent pair and conserves total size", () => {
    const panels = [panel("a"), panel("b"), panel("c")];
    expect(resizePair(panels, [30, 30, 40], 0, 45)).toEqual([45, 15, 40]);
    expect(resizePair(panels, [30, 30, 40], 1, 100)).toEqual([30, 60, 10]);
  });
  it("combines both panes' bounds", () => {
    const panels = [
      panel("a", { minSize: 25, maxSize: 60 }),
      panel("b", { minSize: 30, maxSize: 50 }),
    ];
    expect(resizeIntervals(panels, [50, 50], 0)).toEqual([[50, 60]]);
    expect(resizePair(panels, [50, 50], 0, 0)).toEqual([50, 50]);
    expect(resizePair(panels, [50, 50], 0, 100)).toEqual([60, 40]);
  });
  it("snaps around collapsed gaps on either side", () => {
    const panels = [
      panel("a", { collapsible: true, minSize: 20 }),
      panel("b", { collapsible: true, minSize: 20 }),
    ];
    expect(resizePair(panels, [50, 50], 0, 9)).toEqual([0, 100]);
    expect(resizePair(panels, [50, 50], 0, 11)).toEqual([20, 80]);
    expect(resizePair(panels, [50, 50], 0, 91)).toEqual([100, 0]);
  });
  it("supports nonzero collapsed rails and blocks infeasible collapse", () => {
    const panels = [
      panel("a", { collapsible: true, collapsedSize: 5, minSize: 20 }),
      panel("b", { maxSize: 95 }),
    ];
    expect(resizePair(panels, [30, 70], 0, 5)).toEqual([5, 95]);
    expect(
      resizePair([panels[0]!, panel("b", { maxSize: 80 })], [30, 70], 0, 5),
    ).toEqual([20, 80]);
  });
  it("ignores invalid targets, missing pairs, and tiny floating-point drift", () => {
    const panels = [panel("a"), panel("b")];
    expect(resizePair(panels, [50, 50], 0, NaN)).toEqual([50, 50]);
    expect(resizePair(panels, [50, 50], 1, 20)).toEqual([50, 50]);
    expect(sameSizes([50, 50], [50.00000001, 50])).toBe(true);
    expect(sameSizes([50, 50], [50])).toBe(false);
  });
});
