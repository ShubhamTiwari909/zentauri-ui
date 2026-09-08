import type { VariantProps } from "class-variance-authority";
import type {
  ComponentPropsWithRef,
  CSSProperties,
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  RefObject,
} from "react";

import type { zuiCarouselAppearances } from "../../design-system/carousel";

import type { carouselVariants, carouselViewportVariants } from "./variants";

export type CarouselVariantProps = VariantProps<typeof carouselVariants>;

export type CarouselAppearance = keyof typeof zuiCarouselAppearances;

export type CarouselSize = NonNullable<CarouselVariantProps["size"]>;

export type CarouselOrientation = "horizontal" | "vertical";

export type CarouselFrame = NonNullable<
  VariantProps<typeof carouselViewportVariants>["frame"]
>;

/** Where `Carousel.Previous` / `Carousel.Next` sit relative to the viewport. */
export type CarouselControlPlacement = "inside" | "outside";

export type CarouselControlSide = "previous" | "next";

/**
 * Inline custom properties the root writes for its descendants.
 *
 * `--carousel-item-size` and `--carousel-offset` are computed rather than
 * tokenized because both fold the runtime slide index and `slidesPerView` into
 * a percentage `calc()`, which is what keeps every rest position exactly on a
 * slide boundary without measuring the DOM.
 */
export type CarouselCssProperties = CSSProperties & {
  "--carousel-slides"?: number;
  "--carousel-item-size"?: string;
  "--carousel-offset"?: string;
  "--carousel-progress"?: string;
};

export type CarouselRootProps = Omit<
  ComponentPropsWithRef<"div">,
  "children" | "defaultValue" | "onChange"
> & {
  appearance?: CarouselAppearance;
  size?: CarouselSize;
  orientation?: CarouselOrientation;
  /** Number of slides visible at one rest position. Defaults to 1. */
  slidesPerView?: number;
  /** Controlled rest position, clamped to `0 … slideCount - slidesPerView`. */
  index?: number;
  /** Initial rest position when uncontrolled. Defaults to 0. */
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Wrap around at both ends instead of stopping. Defaults to false. */
  loop?: boolean;
  /** Enable pointer dragging on the viewport. Defaults to true. */
  draggable?: boolean;
  /**
   * Fraction of one slide step a drag must cover to advance on release.
   * Defaults to 0.2.
   */
  dragThreshold?: number;
  /** Advance on a timer. Suppressed under `prefers-reduced-motion`. */
  autoPlay?: boolean;
  /** Milliseconds between auto-advances. Defaults to 4000. */
  autoPlayInterval?: number;
  /** Pause auto-play while the pointer is over the carousel. Defaults to true. */
  pauseOnHover?: boolean;
  /** Pause auto-play while focus is inside the carousel. Defaults to true. */
  pauseOnFocus?: boolean;
  /** Block navigation from every source and dim the controls. */
  disabled?: boolean;
  /**
   * Slide count override.
   *
   * `Carousel.Content` reports the number of children it renders, so this is
   * only needed when slides are rendered outside of a `Carousel.Content`.
   */
  slideCount?: number;
  children?: ReactNode;
};

export type CarouselProps = Omit<CarouselRootProps, "children"> & {
  /** Slides. Children that are not already a `Carousel.Item` are wrapped in one. */
  children?: ReactNode;
  /** Surface treatment applied to the viewport. Defaults to `"none"`. */
  frame?: CarouselFrame;
  /** Previous/next buttons, and where they sit. Defaults to `"inside"`. */
  arrows?: false | CarouselControlPlacement;
  /** Render the indicator dots. Defaults to true. */
  dots?: boolean;
  /** Render the `current / total` counter. Defaults to false. */
  counter?: boolean;
  /** Render the progress bar. Defaults to false. */
  progress?: boolean;
  /** Accessible name for the previous button. Defaults to `"Previous slide"`. */
  previousLabel?: string;
  /** Accessible name for the next button. Defaults to `"Next slide"`. */
  nextLabel?: string;
};

export type CarouselViewportProps = Omit<
  ComponentPropsWithRef<"div">,
  "onKeyDown"
> & {
  frame?: CarouselFrame;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
};

export type CarouselContentProps = ComponentPropsWithRef<"div">;

export type CarouselItemProps = ComponentPropsWithRef<"div"> & {
  /** Position override. Normally supplied by `Carousel.Content`. */
  index?: number;
};

export type CarouselControlsProps = ComponentPropsWithRef<"div">;

export type CarouselControlProps = ComponentPropsWithRef<"button"> & {
  placement?: CarouselControlPlacement;
};

export type CarouselDotsProps = Omit<
  ComponentPropsWithRef<"div">,
  "children"
> & {
  /** Accessible name for a single dot. Defaults to `Go to slide {n}`. */
  dotLabel?: (position: number, total: number) => string;
};

export type CarouselCounterProps = Omit<
  ComponentPropsWithRef<"div">,
  "children"
> & {
  /** Defaults to `{current} / {total}`. */
  format?: (current: number, total: number) => string;
};

export type CarouselProgressProps = ComponentPropsWithRef<"div">;

export type CarouselContextValue = {
  index: number;
  slideCount: number;
  slidesPerView: number;
  /** Number of rest positions: `maxIndex + 1`. */
  pageCount: number;
  maxIndex: number;
  orientation: CarouselOrientation;
  appearance: CarouselAppearance;
  size: CarouselSize;
  loop: boolean;
  disabled: boolean;
  draggable: boolean;
  isDragging: boolean;
  /** Live pointer-drag distance along the main axis, in pixels. */
  dragOffset: number;
  canScrollPrevious: boolean;
  canScrollNext: boolean;
  isAutoPlaying: boolean;
  viewportId: string;
  viewportRef: RefObject<HTMLDivElement | null>;
  scrollTo: (index: number) => void;
  scrollPrevious: () => void;
  scrollNext: () => void;
  isSlideVisible: (index: number) => boolean;
  reportSlideCount: (count: number) => void;
  registerViewport: (node: HTMLDivElement | null) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  startDrag: (event: ReactPointerEvent<HTMLDivElement>) => void;
  updateDrag: (event: ReactPointerEvent<HTMLDivElement>) => void;
  endDrag: (event: ReactPointerEvent<HTMLDivElement>) => void;
  cancelDrag: (event: ReactPointerEvent<HTMLDivElement>) => void;
};

export type CarouselRef = HTMLDivElement;
