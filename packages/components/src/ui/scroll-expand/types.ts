import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";
import type { scrollExpandVariants } from "./variants";

export type ScrollExpandMediaType = "image" | "video";
/**
 * `window` follows the page, or any scrolling ancestor. `self` makes the
 * component its own focusable scroll container; give it a height.
 * With `window`, no ancestor between the section and the scroller may set
 * `overflow: hidden | auto | scroll`, or the stage cannot pin (use `overflow-clip`).
 */
export type ScrollExpandScroller = "window" | "self";
export type ScrollExpandLevel = 1 | 2 | 3 | 4 | 5 | 6;
/** `resting` before scrolling, `expanding` mid-way, `expanded` at full bleed. */
export type ScrollExpandState = "resting" | "expanding" | "expanded";

export type ScrollExpandVariantProps = VariantProps<
  typeof scrollExpandVariants
>;
export type ScrollExpandAppearance = NonNullable<
  ScrollExpandVariantProps["appearance"]
>;

export interface ScrollExpandProps
  extends
    Omit<ComponentPropsWithRef<"section">, "title">,
    ScrollExpandVariantProps {
  /** Image or video shown inside the frame. */
  src: string;
  /** Kind of media `src` points to. Videos are muted, looped, and only play on screen. @default "image" */
  mediaType?: ScrollExpandMediaType;
  /** Poster frame shown while a video loads. */
  poster?: string;
  /** Alternative text for an image. Leave empty when the image is decorative. @default "" */
  alt?: string;
  /** Headline over the resting frame. It lifts away as the media takes over and labels the section. */
  title?: ReactNode;
  /** Heading level of `title`. @default 2 */
  level?: ScrollExpandLevel;
  /** Small cue under the resting frame that fades as scrolling begins. Hidden from assistive tech. */
  hint?: ReactNode;
  /** Content revealed over the media at full bleed. It is inert until visible. */
  children?: ReactNode;
  /** Frame width before expanding, as a percentage of the stage. Clamped to 10–100. @default 42 */
  startWidth?: number;
  /** Frame height before expanding, as a percentage of the stage. Clamped to 10–100. @default 58 */
  startHeight?: number;
  /** Media zoom at rest; it eases to 1 as the frame opens. Clamped to 1–3. @default 1.35 */
  zoom?: number;
  /** Scroll length of the expansion, in stage heights. Clamped to 0.2–5. @default 1.2 */
  distance?: number;
  /** Extra scroll held at full bleed before the section releases, in stage heights. Clamped to 0–5. @default 0.35 */
  hold?: number;
  /** Follow time in milliseconds. 0 locks the frame to the scroll position. Clamped to 0–1000. @default 100 */
  smoothing?: number;
}
