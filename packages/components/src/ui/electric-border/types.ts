import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import type { electricBorderVariants } from "./variants";

export type ElectricBorderAppearance = NonNullable<
  VariantProps<typeof electricBorderVariants>["appearance"]
>;

export interface ElectricBorderProps
  extends
    ComponentPropsWithRef<"div">,
    VariantProps<typeof electricBorderVariants> {
  /** Enable animation. False retains a static rim and usable content. @default true */
  active?: boolean;
  /** Enable fine-pointer surges and click/keyboard activation pulses. @default true */
  interactive?: boolean;
  /** Animation rate, clamped to 0–3. Zero renders a static rim. @default 1 */
  speed?: number;
  /** Strand displacement, clamped to 0–2. Zero keeps a smooth perimeter. @default 1 */
  intensity?: number;
  /** Stroke thickness in CSS pixels, clamped to 0.5–4. @default 1.5 */
  thickness?: number;
  /** Uniform corner radius in CSS pixels, clamped to 0–9999 and fitted to the box. @default 24 */
  radius?: number;
  /** Show the soft glow around the current and static rim. @default true */
  glow?: boolean;
  /** Show up to two short-lived arcs outside the perimeter. @default true */
  sparks?: boolean;
  /** Reveal the current around the perimeter on activation. @default true */
  intro?: boolean;
  /** Force a static rim. System reduced-motion preferences always take precedence. @default false */
  reducedMotion?: boolean;
}
