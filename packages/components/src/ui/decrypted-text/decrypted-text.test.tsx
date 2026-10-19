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
import { DecryptedText } from "./index";
import { zuiDecryptedTextAppearances } from "../../design-system/decrypted-text";

let frames: Map<number, FrameRequestCallback>;
let frameId: number;
let time: number;
let reduced: boolean;
let mediaListeners: Set<() => void>;
let observers: {
  callback: IntersectionObserverCallback;
  disconnect: ReturnType<typeof vi.fn>;
}[];

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
const flush = () => advance(60_000);

function intersect(isIntersecting = true) {
  act(() => {
    observers.forEach(({ callback }) =>
      callback(
        [{ isIntersecting } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      ),
    );
  });
}

const root = () =>
  document.querySelector<HTMLElement>('[data-slot="decrypted-text"]')!;
const letters = () =>
  Array.from(
    root().querySelectorAll<HTMLElement>('[data-slot="decrypted-text-letter"]'),
  );
const scrambledFlags = () =>
  letters().map((letter) => letter.hasAttribute("data-scrambled"));
const glyphOf = (letter: HTMLElement) =>
  letter.querySelector<HTMLElement>('[data-slot="decrypted-text-glyph"]')!;

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
  // "W" is twice as wide as every other glyph.
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    () =>
      ({
        font: "",
        measureText: (char: string) => ({ width: char === "W" ? 20 : 10 }),
      }) as unknown as CanvasRenderingContext2D,
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("DecryptedText", () => {
  it("keeps the real text readable to assistive tech", () => {
    render(<DecryptedText as="h2">Access granted</DecryptedText>);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveAccessibleName("Access granted");
    expect(heading.querySelector(".sr-only")).toHaveTextContent(
      "Access granted",
    );
    expect(
      heading.querySelector('[data-slot="decrypted-text-visual"]'),
    ).toHaveAttribute("aria-hidden", "true");
  });

  it("renders deterministic scrambled HTML on the server", () => {
    const first = renderToString(<DecryptedText>Hello world</DecryptedText>);
    const second = renderToString(<DecryptedText>Hello world</DecryptedText>);
    expect(first).toBe(second);
    expect(first).toContain("data-scrambled");
    const hover = renderToString(
      <DecryptedText trigger="hover">Hello world</DecryptedText>,
    );
    expect(hover).not.toContain("data-scrambled");
  });

  it("groups letters into words and preserves spacing", () => {
    render(<DecryptedText>{"Two  words"}</DecryptedText>);
    const words = root().querySelectorAll('[data-slot="decrypted-text-word"]');
    expect(words).toHaveLength(2);
    expect(letters()).toHaveLength(8);
    expect(
      root().querySelector('[data-slot="decrypted-text-visual"]')!.textContent,
    ).toContain("  ");
  });

  it("renders the requested element and falls back to a span", () => {
    const ref = createRef<HTMLElement>();
    const { rerender } = render(
      <DecryptedText ref={ref} as="p" className="font-mono">
        Text
      </DecryptedText>,
    );
    expect(ref.current?.tagName).toBe("P");
    expect(root()).toHaveClass("font-mono");
    rerender(
      <DecryptedText as={"marquee" as unknown as "span"}>Text</DecryptedText>,
    );
    expect(root().tagName).toBe("SPAN");
  });

  it.each(Object.keys(zuiDecryptedTextAppearances))(
    "applies the %s glyph colour",
    (appearance) => {
      render(
        <DecryptedText
          appearance={appearance as keyof typeof zuiDecryptedTextAppearances}
        >
          Tone
        </DecryptedText>,
      );
      expect(root().className).toContain("--zui-decrypted-text-");
      expect(root().className).toContain("dark:[--_dt-glyph:");
    },
  );

  it("waits until the text is in view, then decodes from the start", () => {
    const onComplete = vi.fn();
    render(<DecryptedText onComplete={onComplete}>abc</DecryptedText>);
    expect(root()).toHaveAttribute("data-state", "scrambled");
    expect(scrambledFlags()).toEqual([true, true, true]);
    advance(500);
    expect(scrambledFlags()).toEqual([true, true, true]);

    intersect();
    expect(root()).toHaveAttribute("data-state", "decoding");
    advance(60);
    expect(scrambledFlags()).toEqual([false, true, true]);
    flush();
    expect(scrambledFlags()).toEqual([false, false, false]);
    expect(root()).toHaveAttribute("data-state", "resolved");
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(observers[0]!.disconnect).toHaveBeenCalled();
  });

  it.each([
    ["end", [true, true, false]],
    ["center", [true, false, true]],
  ] as const)("resolves the %s letter first", (order, expected) => {
    render(
      <DecryptedText trigger="mount" order={order}>
        abc
      </DecryptedText>,
    );
    advance(60);
    expect(scrambledFlags()).toEqual(expected);
  });

  it("resolves every letter in a random order", () => {
    render(
      <DecryptedText trigger="mount" order="random">
        abcdef
      </DecryptedText>,
    );
    advance(60);
    expect(scrambledFlags().filter((flag) => !flag)).toHaveLength(1);
    flush();
    expect(scrambledFlags().every((flag) => !flag)).toBe(true);
  });

  it("scrambles everything, then resolves together", () => {
    render(
      <DecryptedText trigger="mount" order="together" iterations={4} speed={50}>
        abcd
      </DecryptedText>,
    );
    advance(160);
    expect(scrambledFlags()).toEqual([true, true, true, true]);
    advance(60);
    expect(scrambledFlags()).toEqual([false, false, false, false]);
  });

  it("cycles glyphs from the pool while scrambled", () => {
    render(
      <DecryptedText trigger="mount" characters="XYZ" order="end">
        aaaa
      </DecryptedText>,
    );
    advance(60);
    expect("XYZ").toContain(glyphOf(letters()[0]!).textContent);
  });

  it("can scramble with only the letters in the text", () => {
    render(
      <DecryptedText trigger="mount" useOriginalChars order="end">
        mmnn
      </DecryptedText>,
    );
    advance(60);
    expect("mn").toContain(glyphOf(letters()[0]!).textContent);
  });

  it("squeezes glyphs wider than the real letter so the line keeps its width", () => {
    render(
      <DecryptedText trigger="mount" characters="W" order="end">
        ab
      </DecryptedText>,
    );
    expect(glyphOf(letters()[0]!).style.scale).toBe("0.500 1");
    flush();
  });

  it("waits for the delay before the first step", () => {
    render(
      <DecryptedText trigger="mount" delay={300}>
        ab
      </DecryptedText>,
    );
    advance(250);
    expect(scrambledFlags()).toEqual([true, true]);
    advance(150);
    expect(scrambledFlags()).toEqual([false, true]);
  });

  it("starts plain for hover and decodes on pointer or keyboard focus", () => {
    const onComplete = vi.fn();
    render(
      <DecryptedText trigger="hover" onComplete={onComplete}>
        ab
      </DecryptedText>,
    );
    expect(root()).toHaveAttribute("data-state", "resolved");
    expect(scrambledFlags()).toEqual([false, false]);
    expect(onComplete).not.toHaveBeenCalled();

    fireEvent.pointerEnter(root());
    expect(scrambledFlags()).toEqual([true, true]);
    flush();
    expect(onComplete).toHaveBeenCalledTimes(1);

    fireEvent.focusIn(root());
    expect(root()).toHaveAttribute("data-state", "decoding");
    flush();
    expect(onComplete).toHaveBeenCalledTimes(2);
  });

  it("follows the hover and focus of an enclosing link", () => {
    render(
      <a href="#docs">
        <DecryptedText trigger="hover">Read the docs</DecryptedText>
      </a>,
    );
    const link = screen.getByRole("link", { name: "Read the docs" });
    act(() => link.focus());
    expect(root()).toHaveAttribute("data-state", "decoding");
    flush();
    fireEvent.pointerEnter(link);
    expect(root()).toHaveAttribute("data-state", "decoding");
  });

  it("shows the final text at once for reduced motion", () => {
    reduced = true;
    const onComplete = vi.fn();
    render(<DecryptedText onComplete={onComplete}>Calm</DecryptedText>);
    expect(scrambledFlags()).toEqual([false, false, false, false]);
    expect(root()).toHaveAttribute("data-state", "resolved");
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(observers).toHaveLength(0);

    fireEvent.pointerEnter(root());
    expect(frames.size).toBe(0);
  });

  it("resolves immediately when reduced motion turns on mid-decode", () => {
    render(<DecryptedText trigger="mount">Switch</DecryptedText>);
    advance(60);
    reduced = true;
    act(() => mediaListeners.forEach((listener) => listener()));
    expect(scrambledFlags().every((flag) => !flag)).toBe(true);
    expect(root()).toHaveAttribute("data-state", "resolved");
    expect(frames.size).toBe(0);
  });

  it("rolls letters in with the flip effect", () => {
    const animate = vi.fn();
    Element.prototype.animate = animate as unknown as Element["animate"];
    render(
      <DecryptedText trigger="mount" effect="flip">
        ab
      </DecryptedText>,
    );
    expect(letters()[0]!.className).toContain("inline-block");
    advance(60);
    expect(animate).toHaveBeenCalledTimes(1);
    expect(animate.mock.instances[0]).toBe(letters()[0]);
    delete (Element.prototype as Partial<Element>).animate;
  });

  it("fades scrambled glyphs in place with the fade effect", () => {
    render(
      <DecryptedText trigger="mount" effect="fade">
        ab
      </DecryptedText>,
    );
    expect(glyphOf(letters()[0]!).className).toContain("opacity-45");
    expect(letters()[0]!.firstElementChild!.className).toContain(
      "transition-opacity",
    );
  });

  it("restarts when the text changes", () => {
    const { rerender } = render(
      <DecryptedText trigger="mount">First</DecryptedText>,
    );
    flush();
    rerender(<DecryptedText trigger="mount">Second</DecryptedText>);
    expect(root()).toHaveAttribute("data-state", "decoding");
    expect(root().querySelector(".sr-only")).toHaveTextContent("Second");
  });

  it("cleans up frames, observers and listeners on unmount", () => {
    const { unmount } = render(
      <DecryptedText trigger="hover">Bye</DecryptedText>,
    );
    const node = root();
    fireEvent.pointerEnter(node);
    expect(frames.size).toBeGreaterThan(0);
    unmount();
    expect(frames.size).toBe(0);
    fireEvent.pointerEnter(node);
    expect(frames.size).toBe(0);
  });
});
