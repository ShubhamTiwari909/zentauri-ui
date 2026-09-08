"use client";

import { Children, isValidElement, useContext } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import type { MotionStyle } from "framer-motion";

import { useIsomorphicLayoutEffect } from "../../../hooks/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { cn } from "../../../lib/utils";

import {
  CAROUSEL_GAP_FALLBACK,
  CarouselContent,
  CarouselControls,
  CarouselCounter,
  CarouselDots,
  CarouselItem,
  CarouselItemIndexContext,
  CarouselNext,
  CarouselPrevious,
  CarouselProgress,
  CarouselRoot,
  CarouselViewport,
  useCarouselContext,
} from "../carousel-base";
import { carouselItemVariants, carouselTrackVariants } from "../variants";

import {
  carouselRevealPresets,
  carouselTrackSpringPresets,
} from "./animations";
import type {
  CarouselAnimatedProps,
  CarouselContentAnimatedProps,
  CarouselItemAnimatedProps,
} from "./types";

const STEP = `(var(--carousel-item-size) + var(--carousel-gap, ${CAROUSEL_GAP_FALLBACK}))`;

/**
 * Static transform expressions whose only moving parts are two custom
 * properties Motion writes each frame.
 *
 * Handing the arithmetic to CSS — instead of interpolating a `calc()` string in
 * JS — means the browser resolves the percentage in `--carousel-item-size`
 * against the live track box, so a springing track and a resting one agree on
 * where every slide starts.
 */
const MOTION_TRANSFORMS = {
  horizontal: `translateX(calc(var(--carousel-motion-index, 0) * ${STEP} + var(--carousel-motion-drag, 0) * 1px))`,
  vertical: `translateY(calc(var(--carousel-motion-index, 0) * ${STEP} + var(--carousel-motion-drag, 0) * 1px))`,
} as const;

/**
 * Motion-driven track.
 *
 * Only the slide index is animated; it is folded back into the very same
 * `calc()` the static entry writes to `--carousel-offset`, so a spring can
 * overshoot and settle without ever inventing its own idea of where a slide
 * begins. The live drag distance rides along as a plain pixel offset.
 */
export function CarouselContentAnimated({
  className,
  children,
  animation = "glide",
  ref,
  ...rest
}: CarouselContentAnimatedProps) {
  const {
    index,
    orientation,
    isDragging,
    isAutoPlaying,
    dragOffset,
    reportSlideCount,
    scrollTo,
    viewportId,
  } = useCarouselContext();
  const prefersReducedMotion = usePrefersReducedMotion();

  const isInstant = animation === "none" || prefersReducedMotion;
  // One long-lived value per axis input keeps the template's subscriptions
  // stable: swapping the source when `prefers-reduced-motion` resolves would
  // silently orphan the chain that writes the transform.
  const negativeIndex = useMotionValue(-index);
  const drag = useMotionValue(dragOffset);

  useIsomorphicLayoutEffect(() => {
    if (isInstant) {
      negativeIndex.set(-index);
      return;
    }
    const controls = animate(
      negativeIndex,
      -index,
      carouselTrackSpringPresets[
        animation as Exclude<typeof animation, "none">
      ],
    );
    return () => controls.stop();
  }, [animation, index, isInstant, negativeIndex]);

  useIsomorphicLayoutEffect(() => {
    drag.set(dragOffset);
  }, [drag, dragOffset]);

  const slides = Children.toArray(children);

  useIsomorphicLayoutEffect(() => {
    reportSlideCount(slides.length);
  }, [reportSlideCount, slides.length]);

  // Custom properties are outside `CSSProperties`, so the motion-value style
  // has to be asserted rather than inferred.
  const trackStyle = {
    "--carousel-motion-index": negativeIndex,
    "--carousel-motion-drag": drag,
    transform: MOTION_TRANSFORMS[orientation],
  } as unknown as MotionStyle;

  return (
    <motion.div
      ref={ref}
      id={viewportId}
      data-slot="carousel-content"
      data-dragging={isDragging}
      aria-live={isAutoPlaying ? "off" : "polite"}
      // The transform is written every frame by Motion, so the CSS transition
      // the static track relies on has to step aside.
      className={cn(
        carouselTrackVariants({ orientation }),
        "transition-none",
        className,
      )}
      style={trackStyle}
      onFocusCapture={(event) => {
        const slide = (event.target as HTMLElement).closest?.(
          '[data-slot="carousel-item"]',
        );
        const slideIndex = Number(slide?.getAttribute("data-index"));
        if (Number.isInteger(slideIndex)) scrollTo(slideIndex);
      }}
      {...rest}
    >
      {slides.map((slide, position) => (
        <CarouselItemIndexContext.Provider
          key={(isValidElement(slide) ? slide.key : null) ?? position}
          value={position}
        >
          {slide}
        </CarouselItemIndexContext.Provider>
      ))}
    </motion.div>
  );
}

CarouselContentAnimated.displayName = "CarouselContentAnimated";

/** Slide that de-emphasises itself while it sits outside the active window. */
export function CarouselItemAnimated({
  className,
  index: indexProp,
  reveal = "none",
  children,
  ref,
  ...rest
}: CarouselItemAnimatedProps) {
  const { slideCount, isSlideVisible } = useCarouselContext();
  const inheritedIndex = useContext(CarouselItemIndexContext);
  const prefersReducedMotion = usePrefersReducedMotion();
  const position = indexProp ?? inheritedIndex ?? 0;
  const isVisible = isSlideVisible(position);

  const preset = carouselRevealPresets[prefersReducedMotion ? "none" : reveal];

  return (
    <motion.div
      ref={ref}
      data-slot="carousel-item"
      data-index={position}
      data-active={isVisible}
      role="group"
      aria-roledescription="slide"
      aria-label={`${position + 1} of ${Math.max(slideCount, position + 1)}`}
      aria-hidden={isVisible ? undefined : true}
      className={cn(carouselItemVariants(), className)}
      animate={preset.states[isVisible ? "active" : "inactive"]}
      transition={preset.transition}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

CarouselItemAnimated.displayName = "CarouselItemAnimated";

function toAnimatedSlides(
  children: CarouselAnimatedProps["children"],
  reveal: CarouselAnimatedProps["reveal"],
) {
  return Children.toArray(children).map((slide) => {
    const key = (isValidElement(slide) ? slide.key : null) ?? undefined;
    if (
      isValidElement(slide) &&
      (slide.type === CarouselItemAnimated || slide.type === CarouselItem)
    ) {
      return slide;
    }
    return (
      <CarouselItemAnimated key={key} reveal={reveal}>
        {slide}
      </CarouselItemAnimated>
    );
  });
}

function CarouselAnimatedImpl({
  children,
  frame,
  animation = "glide",
  reveal = "none",
  arrows = "inside",
  dots = true,
  counter = false,
  progress = false,
  previousLabel = "Previous slide",
  nextLabel = "Next slide",
  ref,
  ...rest
}: CarouselAnimatedProps) {
  const slides = toAnimatedSlides(children, reveal);
  const showControlsRow = dots || counter || arrows === "outside";

  return (
    <CarouselRoot ref={ref} slideCount={slides.length} {...rest}>
      <CarouselViewport frame={frame}>
        <CarouselContentAnimated animation={animation}>
          {slides}
        </CarouselContentAnimated>
        {arrows === "inside" && (
          <>
            <CarouselPrevious placement="inside" aria-label={previousLabel} />
            <CarouselNext placement="inside" aria-label={nextLabel} />
          </>
        )}
      </CarouselViewport>
      {progress && <CarouselProgress />}
      {showControlsRow && (
        <CarouselControls>
          {arrows === "outside" && (
            <CarouselPrevious aria-label={previousLabel} />
          )}
          {dots && <CarouselDots className="grow" />}
          {counter && <CarouselCounter />}
          {arrows === "outside" && <CarouselNext aria-label={nextLabel} />}
        </CarouselControls>
      )}
    </CarouselRoot>
  );
}

CarouselAnimatedImpl.displayName = "Carousel";

export const Carousel = Object.assign(CarouselAnimatedImpl, {
  Root: CarouselRoot,
  Viewport: CarouselViewport,
  Content: CarouselContentAnimated,
  StaticContent: CarouselContent,
  Item: CarouselItemAnimated,
  StaticItem: CarouselItem,
  Controls: CarouselControls,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  Dots: CarouselDots,
  Counter: CarouselCounter,
  Progress: CarouselProgress,
});
