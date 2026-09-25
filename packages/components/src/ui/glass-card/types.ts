import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import type { glassCardVariants } from "./variants";

export interface GlassCardProps
  extends ComponentPropsWithRef<"div">, VariantProps<typeof glassCardVariants> {
  /** Maximum tilt in degrees. Clamped to 0–30. @default 12 */
  intensity?: number;
  /** Perspective distance in pixels. Clamped to 200–3000. @default 1000 */
  perspective?: number;
  /** Scale while hovered. Clamped to 1–1.15. @default 1.02 */
  scale?: number;
  /** Show the pointer-following light. @default true */
  glare?: boolean;
  /** Glare opacity, from 0 to 1. @default 0.15 */
  glareIntensity?: number;
  /** Show a soft ambient glow behind the surface. @default false */
  glow?: boolean;
  /** Glow opacity, from 0 to 1. @default 0.2 */
  glowIntensity?: number;
  /** Content lift in pixels. Clamped to 0–60. @default 20 */
  depth?: number;
  /** Opt into gentle floating while visible on a fine-pointer device. @default false */
  floating?: boolean;
  /** Disable effects that move; child controls remain usable. @default false */
  disabled?: boolean;
  /** Enable pointer tilt and floating. @default true */
  interactive?: boolean;
  /** Force motion off. OS reduced-motion preferences always take precedence. @default false */
  reducedMotion?: boolean;
}
export type GlassCardContentProps = ComponentPropsWithRef<"div">;
