import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import type { maskedHeadingVariants } from "./variants";

/** Entrance style. `rise` lifts each word out of its own line mask. */
export type MaskedHeadingReveal = "rise" | "wipe" | "fade" | "none";
/** When the entrance runs: on mount, or once a quarter of the heading is visible. */
export type MaskedHeadingTrigger = "mount" | "view";
export type MaskedHeadingMediaType = "image" | "video";
export type MaskedHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type MaskedHeadingVariantProps = VariantProps<
  typeof maskedHeadingVariants
>;
export type MaskedHeadingAppearance = NonNullable<
  MaskedHeadingVariantProps["appearance"]
>;
export type MaskedHeadingSize = NonNullable<MaskedHeadingVariantProps["size"]>;
export type MaskedHeadingAlign = NonNullable<
  MaskedHeadingVariantProps["align"]
>;

export interface MaskedHeadingProps
  extends
    Omit<ComponentPropsWithRef<"h2">, "children">,
    MaskedHeadingVariantProps {
  /** Heading copy. Split into words for the reveal; stays readable to assistive tech. */
  children: string;
  /** Heading level, rendered as `h1`–`h6`. @default 2 */
  level?: MaskedHeadingLevel;
  /** Image or video shown through the letters. Without it, the appearance's gradient mesh shows. */
  src?: string;
  /** Kind of media `src` points to. Videos are muted, looped and paused for reduced motion. @default "image" */
  mediaType?: MaskedHeadingMediaType;
  /** Poster frame shown while a video loads. */
  poster?: string;
  /** Entrance style. @default "rise" */
  reveal?: MaskedHeadingReveal;
  /** When the entrance runs. @default "view" */
  trigger?: MaskedHeadingTrigger;
  /** Entrance duration in milliseconds. Clamped to 0–10000. @default 1100 */
  duration?: number;
  /** Delay between words in milliseconds for `rise`. Clamped to 0–1000. @default 90 */
  stagger?: number;
  /** Delay before the entrance starts, in milliseconds. Clamped to 0–10000. @default 0 */
  delay?: number;
  /** How far the media slides under the letters as a mouse or pen moves, in px. 0 disables it. Clamped to 0–120. @default 24 */
  parallax?: number;
  /** Amplitude of the slow idle drift of the media, in px. 0 holds it still. Clamped to 0–120. @default 16 */
  drift?: number;
  /** Stroke every letter so its shape is visible before the media arrives. @default false */
  outline?: boolean;
  /** Called once when the entrance finishes, or immediately when it is skipped. */
  onRevealComplete?: () => void;
}
