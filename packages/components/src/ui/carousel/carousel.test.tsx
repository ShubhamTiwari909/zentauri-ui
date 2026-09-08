import { createRef } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Carousel } from "./carousel";

function renderSlides(count: number) {
  return Array.from({ length: count }, (_, index) => (
    <div key={index}>Slide {index + 1}</div>
  ));
}

/** The offset/size custom properties are `calc()` strings, so read them raw. */
function cssVar(element: Element | null, name: string) {
  return (element as HTMLElement | null)?.style.getPropertyValue(name) ?? "";
}

function mockViewportSize(viewport: Element, size: number) {
  viewport.getBoundingClientRect = vi.fn(() => ({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: size,
    bottom: size,
    width: size,
    height: size,
    toJSON: () => ({}),
  }));
}

describe("Carousel", () => {
  beforeEach(() => {
    HTMLElement.prototype.setPointerCapture = vi.fn();
    HTMLElement.prototype.releasePointerCapture = vi.fn();
  });

  it("should set displayName", () => {
    expect(Carousel.displayName).toBe("Carousel");
  });

  it("should stamp data-slot on the root container", () => {
    const { container } = render(<Carousel>{renderSlides(3)}</Carousel>);
    expect(container.querySelector('[data-slot="carousel"]')).toBeTruthy();
  });

  it("should render the viewport, track, and one item per child", () => {
    const { container } = render(<Carousel>{renderSlides(3)}</Carousel>);
    expect(
      container.querySelector('[data-slot="carousel-viewport"]'),
    ).toBeTruthy();
    expect(
      container.querySelector('[data-slot="carousel-content"]'),
    ).toBeTruthy();
    expect(
      container.querySelectorAll('[data-slot="carousel-item"]'),
    ).toHaveLength(3);
  });

  it("should forward refs to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Carousel ref={ref}>{renderSlides(2)}</Carousel>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("carousel");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <Carousel className="custom-class">{renderSlides(2)}</Carousel>,
    );
    expect(
      container.querySelector('[data-slot="carousel"]')?.className,
    ).toMatch(/custom-class/);
  });

  it("should expose the carousel landmark and a default accessible name", () => {
    render(<Carousel>{renderSlides(2)}</Carousel>);
    const region = screen.getByRole("region");
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
    expect(region).toHaveAttribute("aria-label", "Carousel");
  });

  it("should keep a caller-supplied accessible name", () => {
    render(<Carousel aria-label="Featured work">{renderSlides(2)}</Carousel>);
    expect(screen.getByRole("region")).toHaveAttribute(
      "aria-label",
      "Featured work",
    );
  });

  it("should label every slide with its position", () => {
    const { container } = render(<Carousel>{renderSlides(3)}</Carousel>);
    const items = container.querySelectorAll('[data-slot="carousel-item"]');
    expect(items[0]).toHaveAttribute("aria-label", "1 of 3");
    expect(items[2]).toHaveAttribute("aria-label", "3 of 3");
  });

  it("should hide slides outside the active window from assistive tech", () => {
    const { container } = render(<Carousel>{renderSlides(3)}</Carousel>);
    const items = container.querySelectorAll('[data-slot="carousel-item"]');
    expect(items[0]).toHaveAttribute("data-active", "true");
    expect(items[0]).not.toHaveAttribute("aria-hidden");
    expect(items[1]).toHaveAttribute("aria-hidden", "true");
  });

  it("should disable the previous control on the first slide", () => {
    render(<Carousel>{renderSlides(3)}</Carousel>);
    expect(
      screen.getByRole("button", { name: "Previous slide" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Next slide" }),
    ).not.toBeDisabled();
  });

  it("should advance the track offset when next is clicked", () => {
    const onIndexChange = vi.fn();
    const { container } = render(
      <Carousel onIndexChange={onIndexChange}>{renderSlides(3)}</Carousel>,
    );
    const root = container.querySelector('[data-slot="carousel"]');
    expect(cssVar(root, "--carousel-offset")).toContain("0 *");

    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));

    expect(onIndexChange).toHaveBeenCalledWith(1);
    expect(cssVar(root, "--carousel-offset")).toContain("-1 *");
  });

  it("should stop at the last slide when loop is off", () => {
    render(<Carousel>{renderSlides(2)}</Carousel>);
    const next = screen.getByRole("button", { name: "Next slide" });
    fireEvent.click(next);
    expect(next).toBeDisabled();
  });

  it("should wrap in both directions when loop is on", () => {
    const onIndexChange = vi.fn();
    render(
      <Carousel loop onIndexChange={onIndexChange}>
        {renderSlides(3)}
      </Carousel>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));
    expect(onIndexChange).toHaveBeenLastCalledWith(2);
  });

  it("should render one dot per rest position and mark the active one", () => {
    const { container } = render(<Carousel>{renderSlides(4)}</Carousel>);
    const dots = container.querySelectorAll('[data-slot="carousel-dot"]');
    expect(dots).toHaveLength(4);
    expect(dots[0]).toHaveAttribute("data-active", "true");
    expect(dots[0]).toHaveAttribute("aria-current", "true");
  });

  it("should jump to the slide a dot points at", () => {
    const { container } = render(<Carousel>{renderSlides(4)}</Carousel>);
    fireEvent.click(screen.getByRole("button", { name: "Go to slide 3" }));
    const dots = container.querySelectorAll('[data-slot="carousel-dot"]');
    expect(dots[2]).toHaveAttribute("data-active", "true");
    expect(
      cssVar(
        container.querySelector('[data-slot="carousel"]'),
        "--carousel-offset",
      ),
    ).toContain("-2 *");
  });

  it("should navigate with the arrow keys, Home, and End", () => {
    const { container } = render(<Carousel>{renderSlides(4)}</Carousel>);
    const viewport = container.querySelector(
      '[data-slot="carousel-viewport"]',
    ) as HTMLElement;
    const root = container.querySelector('[data-slot="carousel"]');

    fireEvent.keyDown(viewport, { key: "ArrowRight" });
    expect(cssVar(root, "--carousel-offset")).toContain("-1 *");

    fireEvent.keyDown(viewport, { key: "End" });
    expect(cssVar(root, "--carousel-offset")).toContain("-3 *");

    fireEvent.keyDown(viewport, { key: "Home" });
    expect(cssVar(root, "--carousel-offset")).toContain("0 *");

    fireEvent.keyDown(viewport, { key: "ArrowLeft" });
    expect(cssVar(root, "--carousel-offset")).toContain("0 *");
  });

  it("should use the vertical axis keys when orientation is vertical", () => {
    const { container } = render(
      <Carousel orientation="vertical">{renderSlides(3)}</Carousel>,
    );
    const viewport = container.querySelector(
      '[data-slot="carousel-viewport"]',
    ) as HTMLElement;
    const root = container.querySelector('[data-slot="carousel"]');

    fireEvent.keyDown(viewport, { key: "ArrowRight" });
    expect(cssVar(root, "--carousel-offset")).toContain("0 *");

    fireEvent.keyDown(viewport, { key: "ArrowDown" });
    expect(cssVar(root, "--carousel-offset")).toContain("-1 *");
    expect(root).toHaveAttribute("data-orientation", "vertical");
  });

  it("should size slides and rest positions from slidesPerView", () => {
    const { container } = render(
      <Carousel slidesPerView={2}>{renderSlides(4)}</Carousel>,
    );
    const root = container.querySelector('[data-slot="carousel"]');
    expect(cssVar(root, "--carousel-slides")).toBe("2");
    expect(cssVar(root, "--carousel-item-size")).toContain("/ 2");
    // 4 slides two at a time leaves three rest positions, not four.
    expect(
      container.querySelectorAll('[data-slot="carousel-dot"]'),
    ).toHaveLength(3);
  });

  it("should treat every visible slide as active when slidesPerView > 1", () => {
    const { container } = render(
      <Carousel slidesPerView={2}>{renderSlides(4)}</Carousel>,
    );
    const items = container.querySelectorAll('[data-slot="carousel-item"]');
    expect(items[0]).toHaveAttribute("data-active", "true");
    expect(items[1]).toHaveAttribute("data-active", "true");
    expect(items[2]).toHaveAttribute("data-active", "false");
  });

  it("should respect a controlled index", () => {
    const onIndexChange = vi.fn();
    const { container, rerender } = render(
      <Carousel index={1} onIndexChange={onIndexChange}>
        {renderSlides(3)}
      </Carousel>,
    );
    const root = container.querySelector('[data-slot="carousel"]');
    expect(cssVar(root, "--carousel-offset")).toContain("-1 *");

    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(onIndexChange).toHaveBeenCalledWith(2);
    expect(cssVar(root, "--carousel-offset")).toContain("-1 *");

    rerender(
      <Carousel index={2} onIndexChange={onIndexChange}>
        {renderSlides(3)}
      </Carousel>,
    );
    expect(cssVar(root, "--carousel-offset")).toContain("-2 *");
  });

  it("should render the counter and progress bar on request", () => {
    render(
      <Carousel counter progress>
        {renderSlides(3)}
      </Carousel>,
    );
    expect(screen.getByText("1 / 3")).toBeTruthy();
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("aria-valuenow", "1");
    expect(progress).toHaveAttribute("aria-valuemax", "3");
  });

  it("should block every navigation source when disabled", () => {
    const { container } = render(
      <Carousel disabled counter>
        {renderSlides(3)}
      </Carousel>,
    );
    expect(screen.getByRole("button", { name: "Next slide" })).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Go to slide 2" }),
    ).toBeDisabled();

    const viewport = container.querySelector(
      '[data-slot="carousel-viewport"]',
    ) as HTMLElement;
    expect(viewport).toHaveAttribute("tabindex", "-1");

    fireEvent.keyDown(viewport, { key: "ArrowRight" });
    expect(
      cssVar(
        container.querySelector('[data-slot="carousel"]'),
        "--carousel-offset",
      ),
    ).toContain("0 *");
  });

  it("should advance after a drag that clears the threshold", () => {
    const { container } = render(<Carousel>{renderSlides(3)}</Carousel>);
    const viewport = container.querySelector(
      '[data-slot="carousel-viewport"]',
    ) as HTMLElement;
    const root = container.querySelector('[data-slot="carousel"]');
    mockViewportSize(viewport, 300);

    fireEvent.pointerDown(viewport, { clientX: 250, pointerId: 1 });
    fireEvent.pointerMove(viewport, { clientX: 100, pointerId: 1 });
    expect(root).toHaveAttribute("data-dragging", "true");

    fireEvent.pointerUp(viewport, { clientX: 100, pointerId: 1 });
    expect(root).toHaveAttribute("data-dragging", "false");
    expect(cssVar(root, "--carousel-offset")).toContain("-1 *");
  });

  it("should advance when the whole gesture arrives in one flush", () => {
    // `fireEvent` flushes React between calls, which hides a handler that
    // settles against its render closure instead of the live gesture. Dispatch
    // all three events inside a single act() so only one flush happens.
    const { container } = render(<Carousel>{renderSlides(3)}</Carousel>);
    const viewport = container.querySelector(
      '[data-slot="carousel-viewport"]',
    ) as HTMLElement;
    const root = container.querySelector('[data-slot="carousel"]');
    mockViewportSize(viewport, 300);

    const pointer = {
      bubbles: true,
      pointerId: 1,
      pointerType: "mouse",
      button: 0,
      isPrimary: true,
    };

    act(() => {
      viewport.dispatchEvent(
        new PointerEvent("pointerdown", { ...pointer, clientX: 250 }),
      );
      viewport.dispatchEvent(
        new PointerEvent("pointermove", { ...pointer, clientX: 100 }),
      );
      viewport.dispatchEvent(
        new PointerEvent("pointerup", { ...pointer, clientX: 100 }),
      );
    });

    expect(cssVar(root, "--carousel-offset")).toContain("-1 *");
  });

  it("should snap back after a drag that falls short of the threshold", () => {
    const { container } = render(<Carousel>{renderSlides(3)}</Carousel>);
    const viewport = container.querySelector(
      '[data-slot="carousel-viewport"]',
    ) as HTMLElement;
    const root = container.querySelector('[data-slot="carousel"]');
    mockViewportSize(viewport, 300);

    fireEvent.pointerDown(viewport, { clientX: 250, pointerId: 1 });
    fireEvent.pointerMove(viewport, { clientX: 230, pointerId: 1 });
    fireEvent.pointerUp(viewport, { clientX: 230, pointerId: 1 });

    expect(cssVar(root, "--carousel-offset")).toContain("0 *");
  });

  it("should not drag when draggable is off", () => {
    const { container } = render(
      <Carousel draggable={false}>{renderSlides(3)}</Carousel>,
    );
    const viewport = container.querySelector(
      '[data-slot="carousel-viewport"]',
    ) as HTMLElement;
    mockViewportSize(viewport, 300);

    fireEvent.pointerDown(viewport, { clientX: 250, pointerId: 1 });
    fireEvent.pointerMove(viewport, { clientX: 100, pointerId: 1 });
    fireEvent.pointerUp(viewport, { clientX: 100, pointerId: 1 });

    expect(
      cssVar(
        container.querySelector('[data-slot="carousel"]'),
        "--carousel-offset",
      ),
    ).toContain("0 *");
  });

  it("should auto-advance and wrap while auto-play is running", () => {
    // The shared test setup answers every media query with `matches: true`,
    // which would otherwise suppress auto-play via prefers-reduced-motion.
    // It installs its own `vi.fn()`, so swap the property rather than spying:
    // `mockRestore` would strip the setup's implementation for later files.
    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: vi.fn(
        (query: string) =>
          ({
            media: query,
            matches: false,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
          }) as unknown as MediaQueryList,
      ),
    });
    vi.useFakeTimers();

    try {
      const { container } = render(
        <Carousel autoPlay autoPlayInterval={1000} pauseOnHover={false}>
          {renderSlides(2)}
        </Carousel>,
      );
      const root = container.querySelector('[data-slot="carousel"]');

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(cssVar(root, "--carousel-offset")).toContain("-1 *");

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(cssVar(root, "--carousel-offset")).toContain("0 *");
    } finally {
      vi.useRealTimers();
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        configurable: true,
        value: originalMatchMedia,
      });
    }
  });

  it("should not auto-advance when reduced motion is preferred", () => {
    vi.useFakeTimers();
    try {
      const { container } = render(
        <Carousel autoPlay autoPlayInterval={1000}>
          {renderSlides(2)}
        </Carousel>,
      );
      act(() => {
        vi.advanceTimersByTime(5000);
      });
      expect(
        cssVar(
          container.querySelector('[data-slot="carousel"]'),
          "--carousel-offset",
        ),
      ).toContain("0 *");
    } finally {
      vi.useRealTimers();
    }
  });

  it("should expose compound primitives", () => {
    const { container } = render(
      <Carousel.Root slideCount={3} appearance="blue" size="lg">
        <Carousel.Viewport frame="card">
          <Carousel.Content>
            <Carousel.Item>One</Carousel.Item>
            <Carousel.Item>Two</Carousel.Item>
            <Carousel.Item>Three</Carousel.Item>
          </Carousel.Content>
        </Carousel.Viewport>
        <Carousel.Progress />
        <Carousel.Controls>
          <Carousel.Previous />
          <Carousel.Dots />
          <Carousel.Counter
            format={(current, total) => `${current} of ${total}`}
          />
          <Carousel.Next />
        </Carousel.Controls>
      </Carousel.Root>,
    );

    expect(
      container.querySelectorAll('[data-slot="carousel-item"]'),
    ).toHaveLength(3);
    expect(
      container.querySelector('[data-slot="carousel-controls"]'),
    ).toBeTruthy();
    expect(screen.getByText("1 of 3")).toBeTruthy();
    expect(
      container.querySelectorAll('[data-slot="carousel-dot"]'),
    ).toHaveLength(3);
  });

  it("should throw when a part is rendered outside the root", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() => render(<Carousel.Next />)).toThrow(
      /must be used within Carousel.Root/,
    );
    consoleError.mockRestore();
  });
});
