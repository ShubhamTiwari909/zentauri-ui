"use client";

import { Carousel } from "@zentauri-ui/zentauri-components/ui/carousel";
import { Carousel as CarouselAnimated } from "@zentauri-ui/zentauri-components/ui/carousel/animated";

import { buildCarouselSlides } from "./slides";
import type { CarouselDemoProps } from "./types";

/**
 * Renders the static entry until an animation or reveal is picked, which is
 * exactly the import the generated snippet switches to.
 */
export function CarouselDemo({
  appearance,
  size,
  orientation,
  frame,
  animation,
  reveal,
  arrows,
  slideCount,
  slidesPerView,
  loop,
  draggable,
  autoPlay,
  dots,
  counter,
  progress,
  disabled,
}: CarouselDemoProps) {
  const shared = {
    "aria-label": "Product areas",
    appearance,
    size,
    orientation,
    frame,
    slidesPerView,
    loop,
    draggable,
    autoPlay,
    dots,
    counter,
    progress,
    disabled,
    arrows: arrows === "off" ? (false as const) : arrows,
  };

  // A vertical track showing several slides at once leaves each one ~90px
  // tall, which the 56px top-and-bottom arrow clearance would swallow whole.
  // Those panels go compact and skip the clearance instead of being clipped.
  const isTightVertical = orientation === "vertical" && slidesPerView > 1;
  const slides = buildCarouselSlides(slideCount, {
    height: orientation === "vertical" ? "h-full" : "h-52",
    compact: isTightVertical,
    clearArrows:
      arrows === "inside" && !isTightVertical ? orientation : undefined,
  });

  if (animation === "none" && reveal === "none") {
    return <Carousel {...shared}>{slides}</Carousel>;
  }

  return (
    <CarouselAnimated {...shared} animation={animation} reveal={reveal}>
      {slides}
    </CarouselAnimated>
  );
}
