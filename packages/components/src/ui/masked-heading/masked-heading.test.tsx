import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MaskedHeading } from "./index";
import {
  zuiMaskedHeadingAppearances,
  zuiMaskedHeadingSizes,
} from "../../design-system/masked-heading";

let frames: Map<number, FrameRequestCallback>;
let frameId: number;
let time: number;
let reduced: boolean;
let mediaListeners: Set<() => void>;
let observers: {
  callback: IntersectionObserverCallback;
  disconnect: ReturnType<typeof vi.fn>;
}[];

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

function advance(ms: number) {
  act(() => {
    const end = time + ms;
    while (frames.size && time < end) {
      const pending = [...frames.values()];
      frames.clear();
      time += 16.67;
      pending.forEach((callback) => callback(time));
    }
  });
}

function intersect(ratio: number) {
  act(() => {
    observers.forEach(({ callback }) =>
      callback(
        [
          {
            isIntersecting: ratio > 0,
            intersectionRatio: ratio,
            intersectionRect: { height: ratio * 100 } as DOMRectReadOnly,
            rootBounds: { height: 800 } as DOMRectReadOnly,
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      ),
    );
  });
}

const heading = () => screen.getByRole("heading");
const slot = (name: string) =>
  heading().querySelector<HTMLElement>(`[data-slot="${name}"]`);
const clipTexts = () =>
  Array.from(heading().querySelectorAll<SVGTextElement>("clipPath text"));

beforeEach(() => {
  frames = new Map();
  frameId = 0;
  time = 0;
  reduced = false;
  mediaListeners = new Set();
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
      disconnect = vi.fn();
      observe = vi.fn();
      unobserve = vi.fn();
      takeRecords = () => [];
      constructor(callback: IntersectionObserverCallback) {
        observers.push({ callback, disconnect: this.disconnect });
      }
    },
  );
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() =>
    Promise.resolve(),
  );
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  // jsdom reports heading sizes in em; browsers always compute pixels.
  const computed = window.getComputedStyle.bind(window);
  vi.spyOn(window, "getComputedStyle").mockImplementation((element) => {
    const style = computed(element);
    return new Proxy(style, {
      get: (target, key) =>
        key === "fontSize" ? "16px" : Reflect.get(target, key, target),
    });
  });
});

afterEach(() => {
  // Unmount while media and frame mocks are still installed.
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("MaskedHeading", () => {
  it("renders a semantic h2 whose accessible name is the copy", () => {
    render(<MaskedHeading>Designed in the details</MaskedHeading>);
    expect(heading().tagName).toBe("H2");
    expect(heading()).toHaveAccessibleName("Designed in the details");
    expect(heading()).toHaveAttribute("data-slot", "masked-heading");
    expect(
      heading().querySelectorAll('[data-slot="masked-heading-word"]'),
    ).toHaveLength(4);
  });

  it("renders the requested level and falls back to h2 for invalid levels", () => {
    const { rerender } = render(
      <MaskedHeading level={1}>Hello world</MaskedHeading>,
    );
    expect(heading().tagName).toBe("H1");
    rerender(
      <MaskedHeading level={9 as unknown as 1}>Hello world</MaskedHeading>,
    );
    expect(heading().tagName).toBe("H2");
  });

  it("forwards refs and merges className and HTML attributes", () => {
    const ref = createRef<HTMLHeadingElement>();
    render(
      <MaskedHeading ref={ref} id="hero" className="mx-auto">
        Hello
      </MaskedHeading>,
    );
    expect(ref.current).toBe(heading());
    expect(heading()).toHaveAttribute("id", "hero");
    expect(heading()).toHaveClass("mx-auto");
  });

  it("collapses extra whitespace and handles empty copy", () => {
    const { rerender } = render(
      <MaskedHeading>{"  Two   words  "}</MaskedHeading>,
    );
    expect(heading()).toHaveAccessibleName("Two words");
    rerender(<MaskedHeading>{""}</MaskedHeading>);
    expect(heading()).toHaveAccessibleName("");
    expect(
      heading().querySelectorAll('[data-slot="masked-heading-word"]'),
    ).toHaveLength(0);
  });

  it("writes the copy into the server HTML only once", () => {
    const html = renderToString(<MaskedHeading>Unique headline</MaskedHeading>);
    expect(html.match(/Unique/g)).toHaveLength(1);
  });

  it.each(Object.keys(zuiMaskedHeadingAppearances))(
    "applies the %s appearance mesh",
    (appearance) => {
      render(
        <MaskedHeading
          appearance={appearance as keyof typeof zuiMaskedHeadingAppearances}
        >
          Mesh
        </MaskedHeading>,
      );
      expect(heading().className).toContain(
        `--zui-masked-heading-${appearance}-mesh`,
      );
      expect(slot("masked-heading-mesh")).toBeInTheDocument();
    },
  );

  it.each(Object.keys(zuiMaskedHeadingSizes))("applies the %s size", (size) => {
    render(
      <MaskedHeading size={size as keyof typeof zuiMaskedHeadingSizes}>
        Size
      </MaskedHeading>,
    );
    expect(heading().className).toContain(`--zui-masked-heading-${size}-size`);
  });

  it("lets a consumer font-size class win in both themes", () => {
    render(<MaskedHeading className="text-2xl">Override</MaskedHeading>);
    expect(heading()).toHaveClass("text-2xl");
    expect(heading().className).not.toContain("text-[length:");
    // Theme pairs only assign private variables, never a competing utility.
    expect(heading().className).not.toMatch(/dark:text-\[length:/);
  });

  it("applies alignment and the optional outline", () => {
    render(
      <MaskedHeading align="center" outline>
        Outlined
      </MaskedHeading>,
    );
    expect(heading()).toHaveClass("text-center");
    expect(slot("masked-heading-text")?.className).toContain(
      "--zui-masked-heading-outline",
    );
  });

  it("keeps every decorative layer hidden from assistive tech", () => {
    render(<MaskedHeading src="/photo.jpg">Photo</MaskedHeading>);
    const image = heading().querySelector("img")!;
    expect(image).toHaveAttribute("alt", "");
    expect(slot("masked-heading-reveal")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(heading().querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(slot("masked-heading-reveal")?.className).toContain(
      "pointer-events-none",
    );
  });

  it("plays a muted looping video and pauses it for reduced motion", () => {
    const play = vi.mocked(HTMLMediaElement.prototype.play);
    const pause = vi.mocked(HTMLMediaElement.prototype.pause);
    const { unmount } = render(
      <MaskedHeading src="/clip.mp4" mediaType="video" trigger="mount">
        Video
      </MaskedHeading>,
    );
    const element = heading().querySelector("video")!;
    expect(element.muted).toBe(true);
    expect(element.loop).toBe(true);
    // Playback waits until the heading is on screen.
    expect(play).not.toHaveBeenCalled();
    intersect(1);
    expect(play).toHaveBeenCalled();
    intersect(0);
    expect(pause).toHaveBeenCalled();
    unmount();

    reduced = true;
    play.mockClear();
    pause.mockClear();
    render(
      <MaskedHeading src="/clip.mp4" mediaType="video" trigger="mount">
        Video
      </MaskedHeading>,
    );
    intersect(1);
    expect(play).not.toHaveBeenCalled();
    expect(pause).toHaveBeenCalled();
  });

  it("rises each word out of its line mask and reports completion once", () => {
    const onRevealComplete = vi.fn();
    render(
      <MaskedHeading trigger="mount" onRevealComplete={onRevealComplete}>
        Two words
      </MaskedHeading>,
    );
    const [first, second] = clipTexts();
    expect(heading()).toHaveAttribute("data-measured");
    expect(heading()).toHaveAttribute("data-state", "revealing");
    expect(first).toHaveTextContent("Two");
    // Hidden below its band: baseline (0.5em bleed = 8px) + 1.32em.
    expect(first).toHaveAttribute("y", "29.12");
    expect(first).toHaveAttribute(
      "clip-path",
      expect.stringMatching(/^url\(#zui-mh-.*-band-0\)$/),
    );

    advance(400);
    const firstY = Number(first!.getAttribute("y"));
    const secondY = Number(second!.getAttribute("y"));
    expect(firstY).toBeLessThan(29.12);
    // Staggered: the second word trails the first.
    expect(secondY).toBeGreaterThan(firstY);

    flush();
    expect(first).toHaveAttribute("y", "8.00");
    expect(second).toHaveAttribute("y", "8.00");
    expect(heading()).toHaveAttribute("data-state", "revealed");
    expect(onRevealComplete).toHaveBeenCalledTimes(1);
  });

  it("waits for the heading to scroll into view", () => {
    render(<MaskedHeading>In view</MaskedHeading>);
    expect(heading()).toHaveAttribute("data-state", "hidden");
    intersect(0.1);
    expect(heading()).toHaveAttribute("data-state", "hidden");
    intersect(0.5);
    expect(heading()).toHaveAttribute("data-state", "revealing");
    flush();
    expect(heading()).toHaveAttribute("data-state", "revealed");
  });

  it("wipes the media layer in from the inline start", () => {
    render(
      <MaskedHeading reveal="wipe" trigger="mount" drift={0}>
        Wipe
      </MaskedHeading>,
    );
    const layer = slot("masked-heading-reveal")!;
    expect(layer.style.clipPath).toBe("inset(0 100.00% 0 0)");
    advance(500);
    expect(layer.style.clipPath).toMatch(/^inset\(0 \d+\.\d+% 0 0\)$/);
    flush();
    expect(layer.style.clipPath).toBe("");
  });

  it("fades and settles the media layer", () => {
    render(
      <MaskedHeading reveal="fade" trigger="mount" drift={0}>
        Fade
      </MaskedHeading>,
    );
    const layer = slot("masked-heading-reveal")!;
    expect(Number(layer.style.opacity)).toBe(0);
    expect(layer.style.transform).toBe("scale(1.0600)");
    flush();
    expect(layer.style.opacity).toBe("");
    expect(layer.style.transform).toBe("");
  });

  it("skips the entrance for reveal none", () => {
    const onRevealComplete = vi.fn();
    render(
      <MaskedHeading reveal="none" onRevealComplete={onRevealComplete}>
        Static
      </MaskedHeading>,
    );
    expect(heading()).toHaveAttribute("data-state", "revealed");
    expect(clipTexts()[0]).toHaveAttribute("y", "8.00");
    expect(onRevealComplete).toHaveBeenCalledTimes(1);
  });

  it("shows the final state without motion for reduced motion", () => {
    reduced = true;
    const onRevealComplete = vi.fn();
    render(
      <MaskedHeading trigger="mount" onRevealComplete={onRevealComplete}>
        Calm
      </MaskedHeading>,
    );
    expect(heading()).toHaveAttribute("data-state", "revealed");
    expect(clipTexts()[0]).toHaveAttribute("y", "8.00");
    flush();
    expect(frames.size).toBe(0);
    fireEvent.pointerMove(heading(), {
      clientX: 10,
      clientY: 10,
      pointerType: "mouse",
      isPrimary: true,
    });
    expect(frames.size).toBe(0);
    expect(onRevealComplete).toHaveBeenCalledTimes(1);
  });

  it("finishes an entrance in progress when reduced motion turns on", () => {
    render(<MaskedHeading trigger="mount">Switch</MaskedHeading>);
    advance(100);
    reduced = true;
    act(() => mediaListeners.forEach((listener) => listener()));
    expect(heading()).toHaveAttribute("data-state", "revealed");
    expect(clipTexts()[0]).toHaveAttribute("y", "8.00");
  });

  it("slides the media against a mouse but ignores touch", () => {
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(200);
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(100);
    render(
      <MaskedHeading reveal="none" drift={0} parallax={20}>
        Parallax
      </MaskedHeading>,
    );
    vi.spyOn(heading(), "getBoundingClientRect").mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 100,
    } as DOMRect);
    const media = slot("masked-heading-media")!;
    flush();
    const resting = media.style.transform;

    fireEvent.pointerMove(heading(), {
      clientX: 200,
      clientY: 100,
      pointerType: "touch",
      isPrimary: true,
    });
    flush();
    expect(media.style.transform).toBe(resting);

    fireEvent.pointerMove(heading(), {
      clientX: 200,
      clientY: 100,
      pointerType: "mouse",
      isPrimary: true,
    });
    flush();
    expect(media.style.transform).not.toBe(resting);

    fireEvent.pointerLeave(heading(), { pointerType: "mouse" });
    flush();
    expect(media.style.transform).toBe(resting);
  });

  it("replays the entrance when the copy changes", () => {
    const { rerender } = render(
      <MaskedHeading trigger="mount">First</MaskedHeading>,
    );
    flush();
    expect(heading()).toHaveAttribute("data-state", "revealed");
    rerender(<MaskedHeading trigger="mount">Second</MaskedHeading>);
    expect(heading()).toHaveAttribute("data-state", "revealing");
    expect(clipTexts()[0]).toHaveTextContent("Second");
  });

  it("cleans up frames, observers and listeners on unmount", () => {
    const { unmount } = render(
      <MaskedHeading trigger="mount">Cleanup</MaskedHeading>,
    );
    const node = heading();
    expect(frames.size).toBeGreaterThan(0);
    unmount();
    expect(frames.size).toBe(0);
    observers.forEach(({ disconnect }) =>
      expect(disconnect).toHaveBeenCalled(),
    );
    expect(node).not.toHaveAttribute("data-measured");
    fireEvent.pointerMove(node, {
      clientX: 1,
      clientY: 1,
      pointerType: "mouse",
      isPrimary: true,
    });
    expect(frames.size).toBe(0);
  });
});
