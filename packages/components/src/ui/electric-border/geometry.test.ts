import { describe, expect, it } from "vitest";
import {
  createPerimeter,
  nearestPoint,
  sparkPath,
  strandPath,
} from "./geometry";

describe("electric border geometry", () => {
  for (const [width, height, radius] of [
    [320, 160, 24],
    [1, 1, 9999],
    [180, 180, 90],
    [300, 60, 0],
  ]) {
    it(`fits the ${width}×${height} perimeter without escaping or losing unit normals`, () => {
      const { points, length } = createPerimeter(width!, height!, radius!);
      expect(length).toBeGreaterThan(0);
      expect(points[0]?.x).toBeCloseTo(width! / 2);
      expect(points[0]?.y).toBeCloseTo(0);
      for (const { x, y, nx, ny } of points) {
        expect(x).toBeGreaterThanOrEqual(-0.00001);
        expect(x).toBeLessThanOrEqual(width! + 0.00001);
        expect(y).toBeGreaterThanOrEqual(-0.00001);
        expect(y).toBeLessThanOrEqual(height! + 0.00001);
        expect(nx * nx + ny * ny).toBeCloseTo(1);
      }
    });
  }
  it("bounds work for very large surfaces and handles missing or invalid dimensions", () => {
    expect(
      createPerimeter(100000, 100000, 24).points.length,
    ).toBeLessThanOrEqual(320);
    for (const [width, height] of [
      [0, 10],
      [-1, 20],
      [NaN, 10],
      [10, Infinity],
    ]) {
      expect(createPerimeter(width!, height!, 24).points).toEqual([]);
    }
    expect(nearestPoint([], 0, 0)).toBeUndefined();
    expect(sparkPath([], 0, 0.5, 1)).toBe("");
    expect(
      strandPath([], 0, {
        time: 0,
        intensity: 1,
        pointer: { x: 0, y: 0, strength: 0 },
        pulse: null,
      }),
    ).toBe("");
  });
  it("keeps intensity zero stable across time and interaction, with no sparks", () => {
    const { points } = createPerimeter(320, 160, 24);
    const base = {
      intensity: 0,
      pointer: { x: 100, y: 0, strength: 1 },
      pulse: { origin: 0.2, progress: 0.5 },
    };
    const a = strandPath(points, 0, { ...base, time: 0 });
    expect(strandPath(points, 0, { ...base, time: 400 })).toBe(a);
    expect(a).toMatch(/^M.* Z$/);
    expect(sparkPath(points, 0, 0.5, 0)).toBe("");
  });
  it("locates interaction origins on the perimeter and expires short-lived arcs", () => {
    const { points } = createPerimeter(320, 160, 24);
    const nearest = nearestPoint(points, 160, -1)!;
    expect(nearest.x).toBeCloseTo(160);
    expect(nearest.y).toBeCloseTo(0);
    expect(sparkPath(points, 0.5, 0.5, 1)).toMatch(/^M/);
    expect(sparkPath(points, 0.5, 0, 1)).toBe("");
    expect(sparkPath(points, 0.5, 1, 1)).toBe("");
  });
});
