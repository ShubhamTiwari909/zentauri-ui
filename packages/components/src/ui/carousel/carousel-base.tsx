"use client";

import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  FocusEvent as ReactFocusEvent,
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  Ref,
  RefObject,
} from "react";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { clamp, cn } from "../../lib/utils";

import type {
  CarouselContentProps,
  CarouselContextValue,
  CarouselControlProps,
  CarouselControlsProps,
  CarouselCounterProps,
  CarouselCssProperties,
  CarouselDotsProps,
  CarouselItemProps,
  CarouselOrientation,
  CarouselProgressProps,
  CarouselProps,
  CarouselRootProps,
  CarouselViewportProps,
} from "./types";
import {
  carouselControlVariants,
  carouselControlsVariants,
  carouselCounterVariants,
  carouselDotVariants,
  carouselDotsVariants,
  carouselItemVariants,
  carouselProgressBarVariants,
  carouselProgressVariants,
  carouselTrackVariants,
  carouselVariants,
  carouselViewportVariants,
} from "./variants";

const CarouselContext = createContext<CarouselContextValue | null>(null);

export const useCarouselContext = (): CarouselContextValue => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel components must be used within Carousel.Root");
  }
  return context;
};

/**
 * Position handed down by `Carousel.Content` so a slide never has to be told
 * its own index. `Carousel.Item` still accepts an `index` override for slides
 * rendered outside a `Carousel.Content`.
 */
export const CarouselItemIndexContext = createContext<number | null>(null);

export const CAROUSEL_GAP_FALLBACK = "0.75rem";

function composeRefs<T>(
  ...refs: (Ref<T> | undefined)[]
): (node: T | null) => void {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as RefObject<T | null>).current = node;
    }
  };
}

/**
 * Exact slide width for a given `slidesPerView`.
 *
 * The percentage resolves against the track, whose main-axis size equals the
 * viewport's, so subtracting the gaps that sit *between* visible slides yields
 * a width that tiles the viewport with no rounding drift.
 */
export function slideSizeExpression(slidesPerView: number): string {
  if (slidesPerView <= 1) return "100%";
  return `calc((100% - ${slidesPerView - 1} * var(--carousel-gap, ${CAROUSEL_GAP_FALLBACK})) / ${slidesPerView})`;
}

/** One slide plus the gap that follows it — the distance between rest positions. */
export function trackOffsetExpression(index: number, dragPx: number): string {
  const step = `(var(--carousel-item-size) + var(--carousel-gap, ${CAROUSEL_GAP_FALLBACK}))`;
  return `calc(${-index} * ${step} + ${dragPx}px)`;
}

type DragState = {
  pointerId: number;
  origin: number;
  delta: number;
};

export function CarouselRoot({
  appearance = "default",
  size = "md",
  orientation = "horizontal",
  slidesPerView = 1,
  index,
  defaultIndex = 0,
  onIndexChange,
  loop = false,
  draggable = true,
  dragThreshold = 0.2,
  autoPlay = false,
  autoPlayInterval = 4000,
  pauseOnHover = true,
  pauseOnFocus = true,
  disabled = false,
  slideCount: slideCountProp,
  className,
  style,
  children,
  ref,
  ...rest
}: CarouselRootProps) {
  const generatedId = useId();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [reportedCount, setReportedCount] = useState(0);
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  // The gesture lives in a ref, not in state: pointerdown, pointermove, and
  // pointerup can all arrive inside one task, and a handler reading a render
  // closure would then settle against a stale distance. State mirrors the ref
  // purely so the offset re-renders.
  const dragRef = useRef<DragState | null>(null);
  const [dragView, setDragView] = useState<DragState | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const slideCount = slideCountProp ?? reportedCount;
  const slidesPerViewResolved = Math.max(1, Math.floor(slidesPerView));
  const maxIndex = Math.max(0, slideCount - slidesPerViewResolved);
  const pageCount = maxIndex + 1;

  const isControlled = index !== undefined;
  const activeIndex = clamp(isControlled ? index : internalIndex, 0, maxIndex);

  const setIndex = useCallback(
    (next: number) => {
      if (!isControlled) setInternalIndex(next);
      if (next !== activeIndex) onIndexChange?.(next);
    },
    [activeIndex, isControlled, onIndexChange],
  );

  const scrollTo = useCallback(
    (target: number) => {
      if (disabled) return;
      if (maxIndex <= 0) {
        setIndex(0);
        return;
      }
      const next = loop
        ? ((target % pageCount) + pageCount) % pageCount
        : clamp(target, 0, maxIndex);
      setIndex(next);
    },
    [disabled, loop, maxIndex, pageCount, setIndex],
  );

  const scrollPrevious = useCallback(() => {
    scrollTo(activeIndex - 1);
  }, [activeIndex, scrollTo]);

  const scrollNext = useCallback(() => {
    scrollTo(activeIndex + 1);
  }, [activeIndex, scrollTo]);

  const isScrollable = slideCount > slidesPerViewResolved;
  const canScrollPrevious =
    !disabled && (loop ? isScrollable : activeIndex > 0);
  const canScrollNext =
    !disabled && (loop ? isScrollable : activeIndex < maxIndex);

  const isSlideVisible = useCallback(
    (slideIndex: number) =>
      slideIndex >= activeIndex &&
      slideIndex < activeIndex + slidesPerViewResolved,
    [activeIndex, slidesPerViewResolved],
  );

  const reportSlideCount = useCallback((count: number) => {
    setReportedCount(count);
  }, []);

  const registerViewport = useCallback((node: HTMLDivElement | null) => {
    viewportRef.current = node;
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      const previousKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
      const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";

      if (event.key === previousKey || event.key === "PageUp") {
        event.preventDefault();
        scrollPrevious();
        return;
      }
      if (event.key === nextKey || event.key === "PageDown") {
        event.preventDefault();
        scrollNext();
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        scrollTo(0);
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        scrollTo(maxIndex);
      }
    },
    [disabled, maxIndex, orientation, scrollNext, scrollPrevious, scrollTo],
  );

  const axisPoint = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) =>
      orientation === "vertical" ? event.clientY : event.clientX,
    [orientation],
  );

  /** Main-axis distance between two rest positions, in pixels. */
  const stepSize = useCallback(() => {
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const axisSize = orientation === "vertical" ? rect.height : rect.width;
    return axisSize > 0 ? axisSize / slidesPerViewResolved : 0;
  }, [orientation, slidesPerViewResolved]);

  const startDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!draggable || disabled || !isScrollable) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      event.currentTarget.setPointerCapture?.(event.pointerId);
      const gesture: DragState = {
        pointerId: event.pointerId,
        origin: axisPoint(event),
        delta: 0,
      };
      dragRef.current = gesture;
      setDragView(gesture);
    },
    [axisPoint, disabled, draggable, isScrollable],
  );

  const updateDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const gesture = dragRef.current;
      if (!gesture || gesture.pointerId !== event.pointerId) return;
      const raw = axisPoint(event) - gesture.origin;
      // Rubber-band the ends so a non-looping carousel signals the boundary
      // instead of tracking the pointer into empty space.
      const atStart = activeIndex === 0 && raw > 0;
      const atEnd = activeIndex === maxIndex && raw < 0;
      const resisted = !loop && (atStart || atEnd) ? raw * 0.35 : raw;
      const moved: DragState = { ...gesture, delta: resisted };
      dragRef.current = moved;
      setDragView(moved);
    },
    [activeIndex, axisPoint, loop, maxIndex],
  );

  const settleDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>, commit: boolean) => {
      const gesture = dragRef.current;
      if (!gesture || gesture.pointerId !== event.pointerId) return;
      event.currentTarget.releasePointerCapture?.(event.pointerId);
      dragRef.current = null;
      setDragView(null);
      if (!commit) return;

      const step = stepSize();
      if (step <= 0) return;
      const travelled = Math.abs(gesture.delta) / step;
      if (travelled < dragThreshold) return;

      // A long flick crosses more than one slide, so commit proportionally.
      const steps = Math.max(1, Math.round(travelled));
      scrollTo(activeIndex + (gesture.delta < 0 ? steps : -steps));
    },
    [activeIndex, dragThreshold, scrollTo, stepSize],
  );

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => settleDrag(event, true),
    [settleDrag],
  );

  const cancelDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => settleDrag(event, false),
    [settleDrag],
  );

  const isDragging = dragView !== null;
  const dragOffset = dragView?.delta ?? 0;

  // Auto-play always wraps, otherwise it would stop dead after one pass on a
  // non-looping carousel. `prefers-reduced-motion` opts out entirely.
  const isAutoPlaying =
    autoPlay &&
    !disabled &&
    !prefersReducedMotion &&
    isScrollable &&
    !isDragging &&
    !(pauseOnHover && isHovered) &&
    !(pauseOnFocus && isFocusWithin);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(
      () => {
        scrollTo(activeIndex + 1 > maxIndex ? 0 : activeIndex + 1);
      },
      Math.max(1, autoPlayInterval),
    );
    return () => clearInterval(timer);
  }, [activeIndex, autoPlayInterval, isAutoPlaying, maxIndex, scrollTo]);

  const contextValue = useMemo<CarouselContextValue>(
    () => ({
      index: activeIndex,
      slideCount,
      slidesPerView: slidesPerViewResolved,
      pageCount,
      maxIndex,
      orientation,
      appearance,
      size,
      loop,
      disabled,
      draggable,
      isDragging,
      dragOffset,
      canScrollPrevious,
      canScrollNext,
      isAutoPlaying,
      viewportId: `${generatedId}zentauri-carousel-content`,
      viewportRef,
      scrollTo,
      scrollPrevious,
      scrollNext,
      isSlideVisible,
      reportSlideCount,
      registerViewport,
      handleKeyDown,
      startDrag,
      updateDrag,
      endDrag,
      cancelDrag,
    }),
    [
      activeIndex,
      appearance,
      canScrollNext,
      canScrollPrevious,
      cancelDrag,
      disabled,
      dragOffset,
      draggable,
      endDrag,
      generatedId,
      handleKeyDown,
      isAutoPlaying,
      isDragging,
      isSlideVisible,
      loop,
      maxIndex,
      orientation,
      pageCount,
      registerViewport,
      reportSlideCount,
      scrollNext,
      scrollPrevious,
      scrollTo,
      size,
      slideCount,
      slidesPerViewResolved,
      startDrag,
      updateDrag,
    ],
  );

  const cssVariables: CarouselCssProperties = {
    "--carousel-slides": slidesPerViewResolved,
    "--carousel-item-size": slideSizeExpression(slidesPerViewResolved),
    "--carousel-offset": trackOffsetExpression(activeIndex, dragOffset),
    "--carousel-progress": `${(Math.min(activeIndex + 1, pageCount) / pageCount) * 100}%`,
  };

  const hasLabel =
    rest["aria-label"] !== undefined || rest["aria-labelledby"] !== undefined;

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        ref={ref}
        data-slot="carousel"
        data-orientation={orientation}
        data-dragging={isDragging}
        data-disabled={disabled ? "true" : undefined}
        role="region"
        aria-roledescription="carousel"
        aria-label={hasLabel ? undefined : "Carousel"}
        className={cn(carouselVariants({ appearance, size }), className)}
        style={{ ...cssVariables, ...style }}
        onPointerEnter={pauseOnHover ? () => setIsHovered(true) : undefined}
        onPointerLeave={pauseOnHover ? () => setIsHovered(false) : undefined}
        onFocusCapture={pauseOnFocus ? () => setIsFocusWithin(true) : undefined}
        onBlurCapture={
          pauseOnFocus
            ? (event: ReactFocusEvent<HTMLDivElement>) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setIsFocusWithin(false);
                }
              }
            : undefined
        }
        {...rest}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

CarouselRoot.displayName = "CarouselRoot";

export function CarouselViewport({
  className,
  frame,
  children,
  onKeyDown,
  ref,
  ...rest
}: CarouselViewportProps) {
  const {
    orientation,
    draggable,
    isDragging,
    handleKeyDown,
    registerViewport,
    startDrag,
    updateDrag,
    endDrag,
    cancelDrag,
    disabled,
  } = useCarouselContext();

  return (
    <div
      ref={composeRefs(registerViewport, ref)}
      data-slot="carousel-viewport"
      data-orientation={orientation}
      data-dragging={isDragging}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        carouselViewportVariants({
          frame,
          orientation,
          drag: draggable ? orientation : "none",
        }),
        className,
      )}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented) handleKeyDown(event);
      }}
      onPointerDown={draggable ? startDrag : undefined}
      onPointerMove={draggable ? updateDrag : undefined}
      onPointerUp={draggable ? endDrag : undefined}
      onPointerCancel={draggable ? cancelDrag : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}

CarouselViewport.displayName = "CarouselViewport";

export function CarouselContent({
  className,
  children,
  ref,
  ...rest
}: CarouselContentProps) {
  const {
    orientation,
    isDragging,
    isAutoPlaying,
    reportSlideCount,
    scrollTo,
    viewportId,
  } = useCarouselContext();

  const slides = Children.toArray(children);

  useEffect(() => {
    reportSlideCount(slides.length);
  }, [reportSlideCount, slides.length]);

  return (
    <div
      ref={ref}
      id={viewportId}
      data-slot="carousel-content"
      data-dragging={isDragging}
      // A live region would fight an auto-rotating carousel, so announcements
      // are reserved for user-driven moves.
      aria-live={isAutoPlaying ? "off" : "polite"}
      className={cn(carouselTrackVariants({ orientation }), className)}
      onFocusCapture={(event) => {
        // Tabbing into an off-screen slide brings it into view, so focus never
        // lands somewhere the viewport is clipping.
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
    </div>
  );
}

CarouselContent.displayName = "CarouselContent";

export function CarouselItem({
  className,
  index: indexProp,
  children,
  ref,
  ...rest
}: CarouselItemProps) {
  const { slideCount, isSlideVisible } = useCarouselContext();
  const inheritedIndex = useContext(CarouselItemIndexContext);
  const position = indexProp ?? inheritedIndex ?? 0;
  const isVisible = isSlideVisible(position);

  return (
    <div
      ref={ref}
      data-slot="carousel-item"
      data-index={position}
      data-active={isVisible}
      role="group"
      aria-roledescription="slide"
      aria-label={`${position + 1} of ${Math.max(slideCount, position + 1)}`}
      aria-hidden={isVisible ? undefined : true}
      className={cn(carouselItemVariants(), className)}
      {...rest}
    >
      {children}
    </div>
  );
}

CarouselItem.displayName = "CarouselItem";

export function CarouselControls({
  className,
  children,
  ref,
  ...rest
}: CarouselControlsProps) {
  return (
    <div
      ref={ref}
      data-slot="carousel-controls"
      className={cn(carouselControlsVariants(), className)}
      {...rest}
    >
      {children}
    </div>
  );
}

CarouselControls.displayName = "CarouselControls";

function ChevronIcon({
  orientation,
  side,
}: {
  orientation: CarouselOrientation;
  side: "previous" | "next";
}) {
  const rotation =
    orientation === "vertical"
      ? side === "previous"
        ? "rotate-90"
        : "-rotate-90"
      : side === "previous"
        ? "rotate-0"
        : "rotate-180";

  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn("size-[45%]", rotation)}
    >
      <path
        d="M10 3L5 8L10 13"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function useControlPosition(
  placement: "inside" | "outside",
  side: "previous" | "next",
) {
  const { orientation } = useCarouselContext();
  if (placement === "outside") return "outside" as const;
  return `inside-${orientation}-${side}` as const;
}

export function CarouselPrevious({
  className,
  placement = "outside",
  children,
  onClick,
  ref,
  ...rest
}: CarouselControlProps) {
  const { orientation, canScrollPrevious, scrollPrevious, viewportId } =
    useCarouselContext();
  const position = useControlPosition(placement, "previous");

  return (
    <button
      ref={ref}
      type="button"
      data-slot="carousel-previous"
      aria-label={rest["aria-label"] ?? "Previous slide"}
      aria-controls={viewportId}
      disabled={rest.disabled ?? !canScrollPrevious}
      className={cn(carouselControlVariants({ position }), className)}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) scrollPrevious();
      }}
    >
      {children ?? <ChevronIcon orientation={orientation} side="previous" />}
    </button>
  );
}

CarouselPrevious.displayName = "CarouselPrevious";

export function CarouselNext({
  className,
  placement = "outside",
  children,
  onClick,
  ref,
  ...rest
}: CarouselControlProps) {
  const { orientation, canScrollNext, scrollNext, viewportId } =
    useCarouselContext();
  const position = useControlPosition(placement, "next");

  return (
    <button
      ref={ref}
      type="button"
      data-slot="carousel-next"
      aria-label={rest["aria-label"] ?? "Next slide"}
      aria-controls={viewportId}
      disabled={rest.disabled ?? !canScrollNext}
      className={cn(carouselControlVariants({ position }), className)}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) scrollNext();
      }}
    >
      {children ?? <ChevronIcon orientation={orientation} side="next" />}
    </button>
  );
}

CarouselNext.displayName = "CarouselNext";

export function CarouselDots({
  className,
  dotLabel,
  ref,
  ...rest
}: CarouselDotsProps) {
  const {
    index,
    pageCount,
    orientation,
    size,
    disabled,
    scrollTo,
    viewportId,
  } = useCarouselContext();

  return (
    <div
      ref={ref}
      data-slot="carousel-dots"
      role="group"
      aria-label={rest["aria-label"] ?? "Choose slide"}
      className={cn(carouselDotsVariants({ orientation }), className)}
      {...rest}
    >
      {Array.from({ length: pageCount }, (_, position) => {
        const isActive = position === index;
        return (
          <button
            key={position}
            type="button"
            data-slot="carousel-dot"
            data-index={position}
            data-active={isActive}
            aria-label={
              dotLabel?.(position + 1, pageCount) ??
              `Go to slide ${position + 1}`
            }
            aria-current={isActive ? "true" : undefined}
            aria-controls={viewportId}
            disabled={disabled}
            onClick={() => scrollTo(position)}
            className={carouselDotVariants({ size })}
          />
        );
      })}
    </div>
  );
}

CarouselDots.displayName = "CarouselDots";

export function CarouselCounter({
  className,
  format,
  ref,
  ...rest
}: CarouselCounterProps) {
  const { index, pageCount } = useCarouselContext();
  const current = Math.min(index + 1, pageCount);

  return (
    <div
      ref={ref}
      data-slot="carousel-counter"
      aria-live="polite"
      className={cn(carouselCounterVariants(), className)}
      {...rest}
    >
      {format?.(current, pageCount) ?? `${current} / ${pageCount}`}
    </div>
  );
}

CarouselCounter.displayName = "CarouselCounter";

export function CarouselProgress({
  className,
  ref,
  ...rest
}: CarouselProgressProps) {
  const { index, pageCount } = useCarouselContext();

  return (
    <div
      ref={ref}
      data-slot="carousel-progress"
      role="progressbar"
      aria-label={rest["aria-label"] ?? "Carousel progress"}
      aria-valuemin={1}
      aria-valuemax={pageCount}
      aria-valuenow={Math.min(index + 1, pageCount)}
      className={cn(carouselProgressVariants(), className)}
      {...rest}
    >
      <div
        data-slot="carousel-progress-bar"
        className={carouselProgressBarVariants()}
      />
    </div>
  );
}

CarouselProgress.displayName = "CarouselProgress";

/** Wrap bare children so `<Carousel>` can take plain nodes as slides. */
export function toCarouselSlides(children: CarouselProps["children"]) {
  return Children.toArray(children).map((slide) =>
    isValidElement(slide) && slide.type === CarouselItem ? (
      slide
    ) : (
      <CarouselItem
        key={(isValidElement(slide) ? slide.key : null) ?? undefined}
      >
        {slide}
      </CarouselItem>
    ),
  );
}

function CarouselImpl({
  children,
  frame,
  arrows = "inside",
  dots = true,
  counter = false,
  progress = false,
  previousLabel = "Previous slide",
  nextLabel = "Next slide",
  ref,
  ...rest
}: CarouselProps) {
  const slides = toCarouselSlides(children);
  const showControlsRow = dots || counter || arrows === "outside";

  return (
    <CarouselRoot ref={ref} slideCount={slides.length} {...rest}>
      <CarouselViewport frame={frame}>
        <CarouselContent>{slides}</CarouselContent>
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

CarouselImpl.displayName = "Carousel";

export const Carousel = Object.assign(CarouselImpl, {
  Root: CarouselRoot,
  Viewport: CarouselViewport,
  Content: CarouselContent,
  Item: CarouselItem,
  Controls: CarouselControls,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  Dots: CarouselDots,
  Counter: CarouselCounter,
  Progress: CarouselProgress,
});
