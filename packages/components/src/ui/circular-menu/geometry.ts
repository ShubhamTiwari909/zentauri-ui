/**
 * Ring geometry for the circular menu.
 *
 * Kept free of React and Tailwind so the layout math is unit-testable on its
 * own, and so consumers can build custom radial layouts from the same solver
 * (both helpers are re-exported from the component entry).
 */

/** Degrees per radian conversion factor. */
const DEG_TO_RAD = Math.PI / 180;

export type CircularMenuDirection = "clockwise" | "counterclockwise";

export type CircularMenuPosition = {
  /** Zero-based ring index, in source order. */
  index: number;
  /** Resolved angle in degrees. `0` points at 12 o'clock. */
  angle: number;
  /** Horizontal offset from the ring center, in pixels. */
  x: number;
  /** Vertical offset from the ring center, in pixels. Negative points up. */
  y: number;
};

export type CircularMenuLayout = {
  count: number;
  radius: number;
  /** Angle of the first item, in degrees. `0` = 12 o'clock, positive = clockwise. */
  startAngle?: number;
  /** Arc covered by the items, in degrees. `360` (or more) closes the ring. */
  sweep?: number;
  direction?: CircularMenuDirection;
};

/**
 * Default metrics per size variant.
 *
 * These live here rather than in `src/design-system/circular-menu.ts` because
 * the solver needs them as numbers: item offsets are computed in JS and written
 * to the DOM as pixel custom properties. `circular-menu.test.tsx` asserts that
 * the trigger size in the design-system size tokens stays in step with this
 * table.
 */
export const CIRCULAR_MENU_SIZE_METRICS = {
  sm: { radius: 96, itemSize: 32, triggerSize: 48 },
  md: { radius: 132, itemSize: 40, triggerSize: 64 },
  lg: { radius: 180, itemSize: 52, triggerSize: 80 },
} as const;

export type CircularMenuSizeMetrics =
  (typeof CIRCULAR_MENU_SIZE_METRICS)[keyof typeof CIRCULAR_MENU_SIZE_METRICS];

/**
 * Solve item positions on a circle or arc.
 *
 * A closed ring (`sweep >= 360`) divides the arc by `count` so the first and
 * last item do not land on the same spot. An open arc divides by `count - 1`
 * instead, which places the endpoints exactly on the arc ends.
 *
 * @param layout Ring description: item count, radius, start angle, sweep, direction.
 * @returns One position per item, in source order.
 */
export function getCircularMenuPositions({
  count,
  radius,
  startAngle = 0,
  sweep = 360,
  direction = "clockwise",
}: CircularMenuLayout): CircularMenuPosition[] {
  if (count <= 0) {
    return [];
  }

  const closed = Math.abs(sweep) >= 360;
  const span = closed ? 360 : sweep;
  const step = count === 1 ? 0 : closed ? span / count : span / (count - 1);
  const sign = direction === "counterclockwise" ? -1 : 1;

  return Array.from({ length: count }, (_, index) => {
    const angle = startAngle + sign * step * index;
    const radians = angle * DEG_TO_RAD;
    return {
      index,
      angle,
      x: Math.sin(radians) * radius,
      // Screen y grows downward, so negate to keep 0deg at 12 o'clock.
      y: -Math.cos(radians) * radius,
    };
  });
}

/**
 * Smallest square box that fits the ring plus one item disc of overhang.
 *
 * @param radius Ring radius in pixels.
 * @param itemSize Item diameter in pixels.
 * @returns Box edge length in pixels.
 */
export function getCircularMenuBoxSize(radius: number, itemSize: number) {
  return Math.ceil(2 * (radius + itemSize / 2));
}
