"use client";

import { Carousel } from "@zentauri-ui/zentauri-components/ui/carousel";
import { Carousel as CarouselAnimated } from "@zentauri-ui/zentauri-components/ui/carousel/animated";

import { buildCarouselSlides } from "./slides";

/**
 * Stacked rather than side by side: the hero's showcase column is narrow, and a
 * two-up track needs the full width to stay legible.
 */
export function CarouselHeroShowcase() {
  return (
    <div className="flex flex-col gap-4">
      <CarouselAnimated
        aria-label="Product areas"
        appearance="gradient-blue"
        animation="bouncy"
        frame="card"
        counter
        loop
      >
        {buildCarouselSlides(4, { height: "h-36", clearArrows: "horizontal" })}
      </CarouselAnimated>

      <Carousel
        aria-label="Release notes"
        appearance="emerald"
        slidesPerView={2}
        arrows={false}
        frame="bordered"
        progress
        loop
      >
        {buildCarouselSlides(5, { height: "h-24", compact: true })}
      </Carousel>
    </div>
  );
}
