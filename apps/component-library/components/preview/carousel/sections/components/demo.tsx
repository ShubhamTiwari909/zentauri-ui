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

  const slides = buildCarouselSlides(slideCount, {
    height: orientation === "vertical" ? "h-full" : "h-52",
    clearArrows: arrows === "inside" ? orientation : undefined,
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
