"use client";

import { useState } from "react";

import { Carousel } from "@zentauri-ui/zentauri-components/ui/carousel";

import { buildCarouselSlides } from "./slides";

export function CarouselMultiSlideDemo() {
  return (
    <Carousel aria-label="Product areas" slidesPerView={3} loop counter>
      {buildCarouselSlides(6, { height: "h-40", clearArrows: "horizontal" })}
    </Carousel>
  );
}

export function CarouselVerticalDemo() {
  return (
    <Carousel
      aria-label="Changelog"
      orientation="vertical"
      appearance="emerald"
      frame="bordered"
      counter
    >
      {buildCarouselSlides(4, { height: "h-full", clearArrows: "vertical" })}
    </Carousel>
  );
}

export function CarouselAutoPlayDemo() {
  return (
    <Carousel
      aria-label="Highlights"
      appearance="gradient-purple"
      autoPlay
      autoPlayInterval={2500}
      progress
      loop
    >
      {buildCarouselSlides(4, { height: "h-40", clearArrows: "horizontal" })}
    </Carousel>
  );
}

export function CarouselCompoundDemo() {
  const slides = buildCarouselSlides(4, {
    height: "h-40",
    clearArrows: "horizontal",
  });

  return (
    <Carousel.Root
      aria-label="Product areas"
      slideCount={slides.length}
      appearance="sky"
      loop
    >
      <Carousel.Viewport frame="card">
        <Carousel.Content>
          {slides.map((slide, index) => (
            <Carousel.Item key={index}>{slide}</Carousel.Item>
          ))}
        </Carousel.Content>
      </Carousel.Viewport>

      <Carousel.Progress />

      <Carousel.Controls>
        <Carousel.Previous />
        <Carousel.Dots className="grow" />
        <Carousel.Counter />
        <Carousel.Next />
      </Carousel.Controls>
    </Carousel.Root>
  );
}

export function CarouselControlledDemo() {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <Carousel
        aria-label="Steps"
        index={index}
        onIndexChange={setIndex}
        arrows={false}
        dots={false}
      >
        {buildCarouselSlides(4, { height: "h-40" })}
      </Carousel>

      <div className="flex flex-wrap items-center gap-2">
        {buildCarouselSlides(4).map((_, step) => (
          <button
            key={step}
            type="button"
            onClick={() => setIndex(step)}
            aria-pressed={step === index}
            className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
              step === index
                ? "border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20"
            }`}
          >
            Step {step + 1}
          </button>
        ))}
        <p className="ml-1 text-sm text-slate-600 dark:text-slate-400">
          Showing step {index + 1}
        </p>
      </div>
    </div>
  );
}
