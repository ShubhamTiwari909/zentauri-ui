import { act, cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ScrollExpand } from "./index";
import { zuiScrollExpandAppearances } from "../../design-system/scroll-expand";

let frames: Map<number, FrameRequestCallback>;
let frameId: number;
let time: number;
let reduced: boolean;
let mediaListeners: Set<() => void>;
let trackTop: number;
let observers: IntersectionObserverCallback[];

function flush(limit = 400) {
  act(() => {
    for (let count = 0; frames.size && count < limit; count++) {
      const pending = [...frames.values()];
      frames.clear();
      time += 16.67;
      pending.forEach((callback) => callback(time));
    }
  });
}
function frame() {
  act(() => {
    const pending = [...frames.values()];
    frames.clear();
    time += 16.67;
    pending.forEach((callback) => callback(time));
  });
}
function scrollWindowTo(top: number) {
  trackTop = -top;
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

const section = () =>
  document.querySelector<HTMLElement>('[data-slot="scroll-expand"]')!;
const slot = (name: string) =>
  section().querySelector<HTMLElement>(`[data-slot="scroll-expand-${name}"]`)!;

beforeEach(() => {
  frames = new Map();
  frameId = 0;
  time = 0;
  reduced = false;
  mediaListeners = new Set();
  trackTop = 0;
  observers = [];
  vi.stubGlobal(
    "requestAnimationFrame",
    vi.fn((callback: FrameRequestCallback) => {
      frames.set(++frameId, callback);
      return frameId;
    }),
  );
  vi.stubGlobal(
    "cancelAnimationFrame",
    vi.fn((id: number) => frames.delete(id)),
  );
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query) =>
      ({
        media: query,
        get matches() {
          return query.includes("reduced-motion") ? reduced : false;
        },
        addEventListener: (_: string, callback: () => void) =>
          mediaListeners.add(callback),
        removeEventListener: (_: string, callback: () => void) =>
          mediaListeners.delete(callback),
      }) as unknown as MediaQueryList,
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = () => [];
      constructor(callback: IntersectionObserverCallback) {
        observers.push(callback);
      }
    },
  );
  // A 500px stage; the expansion spans 1.2 × 500 = 600px of scroll.
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(500);
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    () => ({ top: trackTop, left: 0, width: 800, height: 1000 }) as DOMRect,
  );
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() =>
    Promise.resolve(),
  );
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const renderDefault = (
  props: Partial<Parameters<typeof ScrollExpand>[0]> = {},
) =>
  render(
    <ScrollExpand
      src="/photo.jpg"
      alt="Mountains at dawn"
      title="Built to scale"
      hint="Scroll to expand"
      {...props}
    >
      <p>Every pixel</p>
      <a href="#next">Continue</a>
    </ScrollExpand>,
  );

describe("ScrollExpand", () => {
  it("renders a section labelled by its heading, with the resting frame", () => {
    renderDefault({ level: 1 });
    const region = screen.getByRole("region", { name: "Built to scale" });
    expect(region).toBe(section());
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Built to scale",
    );
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Mountains at dawn");
    expect(slot("frame").style.clipPath).toBe(
      "inset(21.000% 29.000% round calc(var(--_se-radius, 24px) * 1.0000))",
    );
    expect(slot("media").style.transform).toBe("scale(1.3500)");
    expect(slot("hint")).toHaveAttribute("aria-hidden", "true");
    expect(section()).toHaveAttribute("data-state", "resting");
  });

  it("sizes the scroll track in CSS from distance and hold", () => {
    renderDefault({ distance: 2, hold: 0.5 });
    expect(slot("track").style.height).toBe("calc(var(--_se-stage) * 3.5)");
  });

  it("keeps hidden overlay content out of reach until it is visible", () => {
    renderDefault({ smoothing: 0 });
    expect(slot("overlay").inert).toBe(true);
    expect(slot("overlay").style.pointerEvents).toBe("none");
    scrollWindowTo(600);
    flush();
    expect(slot("overlay").inert).toBe(false);
    expect(slot("overlay").style.pointerEvents).toBe("");
  });

  it("opens the frame, lifts the title and reveals the overlay as the page scrolls", () => {
    renderDefault({ smoothing: 0 });
    scrollWindowTo(300);
    flush();
    expect(section()).toHaveAttribute("data-state", "expanding");
    // Half-way: smoothstep(0.5) = 0.5 → a 71% × 79% frame at half radius.
    expect(slot("frame").style.clipPath).toBe(
      "inset(10.500% 14.500% round calc(var(--_se-radius, 24px) * 0.5000))",
    );
    expect(slot("media").style.transform).toBe("scale(1.1750)");
    expect(Number(slot("hint").style.opacity)).toBe(0);
    expect(Number(slot("title").style.opacity)).toBeGreaterThan(0);
    expect(Number(slot("title").style.opacity)).toBeLessThan(1);
    expect(Number(slot("overlay").style.opacity)).toBe(0);

    scrollWindowTo(900);
    flush();
    expect(section()).toHaveAttribute("data-state", "expanded");
    expect(slot("frame").style.clipPath).toBe(
      "inset(0.000% 0.000% round calc(var(--_se-radius, 24px) * 0.0000))",
    );
    expect(Number(slot("title").style.opacity)).toBe(0);
    expect(Number(slot("overlay").style.opacity)).toBe(1);
    expect(Number(slot("scrim").style.opacity)).toBe(1);

    scrollWindowTo(0);
    flush();
    expect(section()).toHaveAttribute("data-state", "resting");
    expect(Number(slot("title").style.opacity)).toBe(1);
  });

  it("follows a scrolling ancestor, not just the window", () => {
    const { container } = renderDefault({ smoothing: 0 });
    trackTop = -600;
    act(() => {
      container.dispatchEvent(new Event("scroll"));
    });
    flush();
    expect(section()).toHaveAttribute("data-state", "expanded");
  });

  it("follows the scroll with time-based smoothing", () => {
    renderDefault({ smoothing: 200 });
    scrollWindowTo(600);
    frame();
    const first = Number(slot("scrim").style.opacity);
    expect(first).toBeGreaterThan(0);
    expect(first).toBeLessThan(1);
    flush();
    expect(Number(slot("scrim").style.opacity)).toBe(1);
    expect(frames.size).toBe(0);
  });

  it("starts at the current scroll position after a reload mid-page", () => {
    trackTop = -900;
    renderDefault();
    expect(section()).toHaveAttribute("data-state", "expanded");
    expect(frames.size).toBe(0);
  });

  it("can be its own focusable scroll container", () => {
    renderDefault({ scroller: "self", smoothing: 0 });
    expect(section()).toHaveAttribute("tabindex", "0");
    expect(section()).toHaveAttribute("data-scroller", "self");
    act(() => {
      section().scrollTop = 600;
      section().dispatchEvent(new Event("scroll"));
    });
    flush();
    expect(section()).toHaveAttribute("data-state", "expanded");
    // The page scroll no longer drives it.
    scrollWindowTo(0);
    flush();
    expect(section()).toHaveAttribute("data-state", "expanded");
  });

  it("shows the expanded composition without scroll-linked motion for reduced motion", () => {
    reduced = true;
    renderDefault();
    expect(section()).toHaveAttribute("data-motion", "reduced");
    expect(section()).toHaveAttribute("data-state", "expanded");
    expect(slot("frame").style.clipPath).toBe("");
    expect(slot("media").style.transform).toBe("");
    expect(Number(slot("title").style.opacity)).toBe(1);
    expect(slot("overlay").inert).toBe(false);
    expect(slot("track").className).toContain(
      "motion-reduce:h-[var(--_se-stage)]!",
    );
  });

  it("switches to the static composition when reduced motion turns on", () => {
    renderDefault({ smoothing: 0 });
    reduced = true;
    act(() => mediaListeners.forEach((listener) => listener()));
    expect(section()).toHaveAttribute("data-state", "expanded");
    expect(slot("overlay").inert).toBe(false);
  });

  it("plays a muted looping video only while on screen", () => {
    const play = vi.mocked(HTMLMediaElement.prototype.play);
    const pause = vi.mocked(HTMLMediaElement.prototype.pause);
    render(
      <ScrollExpand src="/clip.mp4" mediaType="video" poster="/poster.jpg" />,
    );
    const video = section().querySelector("video")!;
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video).toHaveAttribute("poster", "/poster.jpg");
    expect(play).not.toHaveBeenCalled();
    act(() =>
      observers.forEach((callback) =>
        callback(
          [{ isIntersecting: true } as IntersectionObserverEntry],
          {} as IntersectionObserver,
        ),
      ),
    );
    expect(play).toHaveBeenCalled();
    reduced = true;
    act(() => mediaListeners.forEach((listener) => listener()));
    expect(pause).toHaveBeenCalled();
  });

  it.each(Object.keys(zuiScrollExpandAppearances))(
    "applies the %s appearance tokens",
    (appearance) => {
      renderDefault({
        appearance: appearance as keyof typeof zuiScrollExpandAppearances,
      });
      expect(section().className).toContain(
        "[--_se-scrim:var(--zui-scroll-expand-",
      );
      expect(section().className).toContain("dark:[--_se-fg:");
    },
  );

  it("forwards refs, classes and an explicit label", () => {
    const ref = createRef<HTMLElement>();
    render(
      <ScrollExpand
        ref={ref}
        src="/photo.jpg"
        title="Hidden name"
        aria-label="Feature tour"
        className="my-12"
      />,
    );
    expect(ref.current).toBe(section());
    expect(section()).toHaveClass("my-12");
    expect(section()).toHaveAccessibleName("Feature tour");
    expect(section()).not.toHaveAttribute("aria-labelledby");
  });

  it("renders without a title, hint or overlay", () => {
    render(<ScrollExpand src="/photo.jpg" />);
    expect(section().querySelector("h2")).toBeNull();
    expect(
      section().querySelector('[data-slot="scroll-expand-overlay"]'),
    ).toBeNull();
    expect(screen.getByRole("presentation")).toHaveAttribute("alt", "");
  });

  it("stops listening after unmount", () => {
    const { unmount } = renderDefault();
    unmount();
    scrollWindowTo(300);
    expect(frames.size).toBe(0);
  });
});
