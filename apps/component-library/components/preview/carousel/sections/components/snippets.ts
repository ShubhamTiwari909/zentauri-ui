import { variantLeadComment } from "@/components/common/variant-code-prefix";

import { CAROUSEL_SLIDE_DATA } from "./slide-data";
import type { CarouselDemoProps } from "./types";

/** Renders `slideCount` panels, cycling the pool like `buildCarouselSlides`. */
function carouselSlidesSnippet(slideCount: number, indent = "  "): string {
  return Array.from({ length: slideCount }, (_, index) => {
    const slide = CAROUSEL_SLIDE_DATA[index % CAROUSEL_SLIDE_DATA.length];
    return `${indent}<Panel label="${slide.label}" tint="${slide.tint}" />`;
  }).join("\n");
}

/** Builds the playground snippet, omitting every attribute left at its default. */
export function carouselSnippet(opts: CarouselDemoProps): string {
  const {
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
  } = opts;

  const isAnimated = animation !== "none" || reveal !== "none";
  const importPath = isAnimated
    ? "@zentauri-ui/zentauri-components/ui/carousel/animated"
    : "@zentauri-ui/zentauri-components/ui/carousel";

  const attributes = [
    appearance === "default" ? "" : `\n  appearance="${appearance}"`,
    size === "md" ? "" : `\n  size="${size}"`,
    orientation === "horizontal" ? "" : `\n  orientation="${orientation}"`,
    frame === "none" ? "" : `\n  frame="${frame}"`,
    slidesPerView === 1 ? "" : `\n  slidesPerView={${slidesPerView}}`,
    arrows === "inside"
      ? ""
      : `\n  arrows={${arrows === "off" ? "false" : `"${arrows}"`}}`,
    dots ? "" : "\n  dots={false}",
    counter ? "\n  counter" : "",
    progress ? "\n  progress" : "",
    loop ? "\n  loop" : "",
    draggable ? "" : "\n  draggable={false}",
    autoPlay ? "\n  autoPlay" : "",
    disabled ? "\n  disabled" : "",
    isAnimated && animation !== "glide" ? `\n  animation="${animation}"` : "",
    isAnimated && reveal !== "none" ? `\n  reveal="${reveal}"` : "",
  ].join("");

  const lead = variantLeadComment(
    `appearance · ${appearance}, size · ${size}, orientation · ${orientation}, slides · ${slideCount}, per view · ${slidesPerView}, animation · ${animation}, reveal · ${reveal}`,
  );

  return `import { Carousel } from "${importPath}";

${lead}<Carousel aria-label="Product areas"${attributes}
>
${carouselSlidesSnippet(slideCount)}
</Carousel>`;
}

export function carouselMultiSlideSnippet(): string {
  return `import { Carousel } from "@zentauri-ui/zentauri-components/ui/carousel";

<Carousel aria-label="Product areas" slidesPerView={3} loop counter>
${carouselSlidesSnippet(6)}
</Carousel>`;
}

export function carouselVerticalSnippet(): string {
  return `import { Carousel } from "@zentauri-ui/zentauri-components/ui/carousel";

// A vertical track needs a definite height before percentage slide sizes can
// resolve. The viewport ships one via --zui-carousel-vertical-height (18rem);
// override it with the token or a plain className.
<Carousel
  aria-label="Changelog"
  orientation="vertical"
  appearance="emerald"
  frame="bordered"
  counter
>
${carouselSlidesSnippet(4)}
</Carousel>`;
}

export function carouselAutoPlaySnippet(): string {
  return `import { Carousel } from "@zentauri-ui/zentauri-components/ui/carousel";

// Auto-play always wraps, pauses on hover and on focus, and opts out
// completely under prefers-reduced-motion.
<Carousel
  aria-label="Highlights"
  appearance="gradient-purple"
  autoPlay
  autoPlayInterval={2500}
  progress
  loop
>
${carouselSlidesSnippet(4)}
</Carousel>`;
}

export function carouselCompoundSnippet(): string {
  return `import { Carousel } from "@zentauri-ui/zentauri-components/ui/carousel";

// slideCount keeps the dots correct on the very first (server) render;
// Carousel.Content also reports it once mounted.
<Carousel.Root aria-label="Product areas" slideCount={4} appearance="sky" loop>
  <Carousel.Viewport frame="card">
    <Carousel.Content>
      <Carousel.Item>
        <Panel label="Analytics" />
      </Carousel.Item>
      <Carousel.Item>
        <Panel label="Releases" />
      </Carousel.Item>
      <Carousel.Item>
        <Panel label="Incidents" />
      </Carousel.Item>
      <Carousel.Item>
        <Panel label="Billing" />
      </Carousel.Item>
    </Carousel.Content>
  </Carousel.Viewport>

  <Carousel.Progress />

  <Carousel.Controls>
    <Carousel.Previous />
    <Carousel.Dots className="grow" />
    <Carousel.Counter />
    <Carousel.Next />
  </Carousel.Controls>
</Carousel.Root>`;
}

export function carouselControlledSnippet(): string {
  return `import { useState } from "react";
import { Carousel } from "@zentauri-ui/zentauri-components/ui/carousel";

const [index, setIndex] = useState(0);

<>
  <Carousel
    aria-label="Steps"
    index={index}
    onIndexChange={setIndex}
    arrows={false}
    dots={false}
  >
${carouselSlidesSnippet(4, "    ")}
  </Carousel>

  <p>Showing step {index + 1}</p>
</>`;
}
