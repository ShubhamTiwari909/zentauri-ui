import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// motion-dom's frame loop captures `requestAnimationFrame` at module
// evaluation time, so the mock has to land before framer-motion — a
// transitive import of the animated entry below — is first imported.
const { rafCallbacks } = vi.hoisted(() => {
  const callbacks: FrameRequestCallback[] = [];
  let nextId = 1;
  Object.defineProperty(globalThis, "requestAnimationFrame", {
    writable: true,
    configurable: true,
    value: (callback: FrameRequestCallback) => {
      callbacks.push(callback);
      return nextId++;
    },
  });
  Object.defineProperty(globalThis, "cancelAnimationFrame", {
    writable: true,
    configurable: true,
    value: () => {},
  });
  return { rafCallbacks: callbacks };
});

import { Carousel, carouselTrackSpringPresets } from "./animated";

function pumpFrames(count = 8) {
  let time = 0;
  for (let frame = 0; frame < count; frame += 1) {
    time += 16;
    rafCallbacks.shift()?.(time);
  }
}

function renderSlides(count: number) {
  return Array.from({ length: count }, (_, index) => (
    <div key={index}>Slide {index + 1}</div>
  ));
}

function track(container: HTMLElement) {
  return container.querySelector(
    '[data-slot="carousel-content"]',
  ) as HTMLElement;
}

function trackTransform(container: HTMLElement) {
  return track(container).style.transform;
}

/** The value Motion writes each frame; CSS folds it into the transform. */
function motionIndex(container: HTMLElement) {
  return track(container).style.getPropertyValue("--carousel-motion-index");
}

describe("Carousel (animated)", () => {
  it("should set displayName", () => {
    expect(Carousel.displayName).toBe("Carousel");
  });

  it("should render the same slots as the static entry", () => {
    const { container } = render(<Carousel>{renderSlides(3)}</Carousel>);
    expect(container.querySelector('[data-slot="carousel"]')).toBeTruthy();
    expect(
      container.querySelector('[data-slot="carousel-viewport"]'),
    ).toBeTruthy();
    expect(
      container.querySelectorAll('[data-slot="carousel-item"]'),
    ).toHaveLength(3);
    expect(
      container.querySelectorAll('[data-slot="carousel-dot"]'),
    ).toHaveLength(3);
  });

  it("should drive the track with the shared slide-size arithmetic", () => {
    const { container } = render(<Carousel>{renderSlides(3)}</Carousel>);
    expect(trackTransform(container)).toContain("var(--carousel-item-size)");
    expect(trackTransform(container)).toContain("translateX");
  });

  it("should translate along the block axis when orientation is vertical", () => {
    const { container } = render(
      <Carousel orientation="vertical">{renderSlides(3)}</Carousel>,
    );
    expect(trackTransform(container)).toContain("translateY");
  });

  it("should move the track when the index advances", () => {
    const { container } = render(<Carousel>{renderSlides(3)}</Carousel>);
    expect(motionIndex(container)).toBe("0");

    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    pumpFrames();

    expect(motionIndex(container)).toBe("-1");
  });

  it("should settle on an exact slide boundary", () => {
    const { container } = render(<Carousel>{renderSlides(4)}</Carousel>);
    fireEvent.click(screen.getByRole("button", { name: "Go to slide 4" }));
    pumpFrames(240);
    // Whatever the spring did on the way, the rest position is a whole slide.
    expect(motionIndex(container)).toBe("-3");
  });

  it("should keep the root offset variable in sync for CSS consumers", () => {
    const { container } = render(<Carousel>{renderSlides(3)}</Carousel>);
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    const root = container.querySelector(
      '[data-slot="carousel"]',
    ) as HTMLElement;
    expect(root.style.getPropertyValue("--carousel-offset")).toContain("-1 *");
  });

  it("should mark slides outside the active window inactive", () => {
    const { container } = render(
      <Carousel reveal="scale">{renderSlides(3)}</Carousel>,
    );
    const items = container.querySelectorAll('[data-slot="carousel-item"]');
    expect(items[0]).toHaveAttribute("data-active", "true");
    expect(items[1]).toHaveAttribute("data-active", "false");
  });

  it("should expose the track spring presets", () => {
    expect(Object.keys(carouselTrackSpringPresets)).toEqual([
      "glide",
      "smooth",
      "snappy",
      "bouncy",
    ]);
  });

  it("should expose compound primitives", () => {
    const { container } = render(
      <Carousel.Root slideCount={2}>
        <Carousel.Viewport>
          <Carousel.Content animation="bouncy">
            <Carousel.Item reveal="blur">One</Carousel.Item>
            <Carousel.Item reveal="blur">Two</Carousel.Item>
          </Carousel.Content>
        </Carousel.Viewport>
        <Carousel.Controls>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel.Controls>
      </Carousel.Root>,
    );

    expect(
      container.querySelectorAll('[data-slot="carousel-item"]'),
    ).toHaveLength(2);
    expect(trackTransform(container)).toContain("translateX");
  });
});
