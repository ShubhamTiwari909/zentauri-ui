// Original, bounded SVG geometry. No browser APIs or reference implementation code.
import { clamp } from "../../lib/utils";

const TAU = Math.PI * 2;
export type EdgePoint = {
  x: number;
  y: number;
  nx: number;
  ny: number;
  u: number;
};
export type Perimeter = { points: EdgePoint[]; length: number };

export function safeNumber(
  value: number,
  fallback: number,
  min: number,
  max: number,
) {
  return clamp(Number.isFinite(value) ? value : fallback, min, max);
}

export function createPerimeter(
  width: number,
  height: number,
  radius: number,
): Perimeter {
  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  )
    return { points: [], length: 0 };
  const r = safeNumber(radius, 24, 0, Math.min(width, height) / 2);
  const horizontal = width - 2 * r;
  const vertical = height - 2 * r;
  const arc = (Math.PI * r) / 2;
  const segments = [
    horizontal,
    arc,
    vertical,
    arc,
    horizontal,
    arc,
    vertical,
    arc,
  ];
  const length = segments.reduce((sum, value) => sum + value, 0);
  const count = clamp(Math.ceil(length / 5), 48, 320);
  const points: EdgePoint[] = [];
  for (let i = 0; i < count; i++) {
    const u = i / count;
    // Start the closed path at the middle of the top edge.
    let distance = (u * length + horizontal / 2) % length;
    let side = 0;
    while (side < 7 && (segments[side] === 0 || distance >= segments[side]!)) {
      distance -= segments[side]!;
      side++;
    }
    const fraction = segments[side]! > 0 ? distance / segments[side]! : 0;
    if (side % 2 === 0) {
      const straight = [
        { x: r + distance, y: 0, nx: 0, ny: -1 },
        { x: width, y: r + distance, nx: 1, ny: 0 },
        { x: width - r - distance, y: height, nx: 0, ny: 1 },
        { x: 0, y: height - r - distance, nx: -1, ny: 0 },
      ][side / 2]!;
      points.push({ ...straight, u });
    } else {
      const corner = (side - 1) / 2;
      const angle = ((-1 + corner + fraction) * Math.PI) / 2;
      const nx = Math.cos(angle),
        ny = Math.sin(angle);
      const cx = corner < 2 ? width - r : r;
      const cy = corner === 0 || corner === 3 ? r : height - r;
      points.push({ x: cx + nx * r, y: cy + ny * r, nx, ny, u });
    }
  }
  return { points, length };
}

export function nearestPoint(points: EdgePoint[], x: number, y: number) {
  let nearest = points[0];
  let distance = Infinity;
  for (const point of points) {
    const squared = (point.x - x) ** 2 + (point.y - y) ** 2;
    if (squared < distance) {
      nearest = point;
      distance = squared;
    }
  }
  return nearest;
}

export type CurrentField = {
  time: number;
  intensity: number;
  pointer: { x: number; y: number; strength: number };
  pulse: { origin: number; progress: number } | null;
};

export function strandPath(
  points: EdgePoint[],
  strand: number,
  field: CurrentField,
) {
  if (!points.length) return "";
  const { time, intensity, pointer, pulse } = field;
  const seed = strand * 2.17;
  const path = points.map((point, index) => {
    const phase = point.u * TAU;
    // Periodic spatial frequencies meet at the seam; continuous time avoids frame-to-frame flashes.
    const noise =
      Math.sin(phase * 17 + time * 2.3 + seed) * 0.45 +
      Math.sin(phase * 41 - time * 3.7 + seed * 2) * 0.3 +
      Math.sin(phase * 79 + time * 5.1 + seed) * 0.17 +
      Math.sin(phase * 113 - time * 7.4 + seed) * 0.08;
    const distance = (point.x - pointer.x) ** 2 + (point.y - pointer.y) ** 2;
    const local = pointer.strength * Math.exp(-distance / (75 * 75));
    let impulse = 0;
    if (pulse) {
      const location = (pulse.origin + pulse.progress) % 1;
      const delta = Math.abs(point.u - location);
      const wrapped = Math.min(delta, 1 - delta);
      impulse = Math.exp(-((wrapped / 0.07) ** 2)) * (1 - pulse.progress) * 7;
    }
    const displacement = (noise * (2.8 + local * 5) + impulse) * intensity;
    return `${index ? "L" : "M"}${(point.x + point.nx * displacement).toFixed(2)},${(point.y + point.ny * displacement).toFixed(2)}`;
  });
  return `${path.join(" ")} Z`;
}

export function sparkPath(
  points: EdgePoint[],
  origin: number,
  progress: number,
  intensity: number,
) {
  if (!points.length || progress <= 0 || progress >= 1 || intensity <= 0)
    return "";
  const start = Math.floor((((origin % 1) + 1) % 1) * points.length);
  const span = Math.max(3, Math.round(points.length * 0.045));
  const parts: string[] = [];
  for (let i = 0; i <= 16; i++) {
    const point =
      points[(start + Math.round((i / 16) * span)) % points.length]!;
    const height =
      Math.sin((i / 16) * Math.PI) *
      Math.sin(progress * Math.PI) *
      23 *
      intensity;
    parts.push(
      `${i ? "L" : "M"}${(point.x + point.nx * height).toFixed(2)},${(point.y + point.ny * height).toFixed(2)}`,
    );
  }
  return parts.join(" ");
}
