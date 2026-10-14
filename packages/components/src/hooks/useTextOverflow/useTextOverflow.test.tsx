import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useTextOverflow } from "./useTextOverflow";

let node: HTMLDivElement;
let scrollWidth = 130;
let scrollHeight = 20;
let resize: ResizeObserverCallback;
const disconnect = vi.fn();
function attach() {
  node = document.createElement("div");
  node.style.width = "100px";
  node.textContent = "Measure me";
  document.body.append(node);
  Object.defineProperties(node, {
    scrollWidth: { get: () => scrollWidth },
    clientWidth: { get: () => 100 },
    scrollHeight: { get: () => scrollHeight },
    clientHeight: { get: () => 20 },
  });
  vi.spyOn(node, "getBoundingClientRect").mockReturnValue({
    width: 100,
  } as DOMRect);
  return node;
}
afterEach(() => {
  node?.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  scrollWidth = 130;
  scrollHeight = 20;
  disconnect.mockClear();
});

describe("useTextOverflow", () => {
  it("does not measure during render and supports conditional mounting", async () => {
    const { result } = renderHook(() => useTextOverflow());
    expect(result.current.hasMeasured).toBe(false);
    act(() => {
      result.current.ref(attach());
    });
    await waitFor(() => expect(result.current.isOverflowing).toBe(true));
    act(() => {
      result.current.ref(null);
    });
    expect(result.current.hasMeasured).toBe(false);
  });
  it("remeasures on resize and disconnects on unmount", async () => {
    vi.stubGlobal(
      "ResizeObserver",
      class {
        constructor(callback: ResizeObserverCallback) {
          resize = callback;
        }
        observe() {}
        disconnect = disconnect;
      },
    );
    const { result, unmount } = renderHook(() => useTextOverflow());
    act(() => {
      result.current.ref(attach());
    });
    await waitFor(() => expect(result.current.isOverflowing).toBe(true));
    scrollWidth = 100;
    act(() => {
      resize([], {} as ResizeObserver);
    });
    await waitFor(() => expect(result.current.isOverflowing).toBe(false));
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });
  it("supports axes, tolerance, keys and explicit remeasurement", async () => {
    const { result, rerender } = renderHook(
      ({ axis, key }) => useTextOverflow({ axis, measurementKey: key }),
      {
        initialProps: {
          axis: "horizontal" as "horizontal" | "vertical",
          key: 1,
        },
      },
    );
    scrollWidth = 101;
    act(() => {
      result.current.ref(attach());
    });
    await waitFor(() => expect(result.current.hasMeasured).toBe(true));
    expect(result.current.isOverflowing).toBe(false);
    scrollHeight = 50;
    rerender({ axis: "vertical", key: 2 });
    await waitFor(() => expect(result.current.isOverflowing).toBe(true));
    scrollHeight = 20;
    act(() => result.current.remeasure());
    await waitFor(() => expect(result.current.isOverflowing).toBe(false));
  });
  it("resets when disabled and remeasures after enabling", async () => {
    const { result, rerender } = renderHook(
      ({ enabled }) => useTextOverflow({ enabled }),
      { initialProps: { enabled: true } },
    );
    act(() => {
      result.current.ref(attach());
    });
    await waitFor(() => expect(result.current.isOverflowing).toBe(true));
    rerender({ enabled: false });
    expect(result.current.isOverflowing).toBe(false);
    expect(result.current.hasMeasured).toBe(false);
    scrollWidth = 100;
    rerender({ enabled: true });
    await waitFor(() => expect(result.current.isOverflowing).toBe(false));
  });
  it("falls back to window resize without ResizeObserver", async () => {
    vi.stubGlobal("ResizeObserver", undefined);
    const { result } = renderHook(() => useTextOverflow());
    act(() => {
      result.current.ref(attach());
    });
    await waitFor(() => expect(result.current.isOverflowing).toBe(true));
    scrollWidth = 100;
    act(() => window.dispatchEvent(new Event("resize")));
    await waitFor(() => expect(result.current.isOverflowing).toBe(false));
  });
  it("remeasures text mutations and fonts, and removes font listeners", async () => {
    const fonts = new EventTarget();
    Object.defineProperty(fonts, "ready", { value: Promise.resolve(fonts) });
    const original = Object.getOwnPropertyDescriptor(document, "fonts");
    Object.defineProperty(document, "fonts", {
      configurable: true,
      value: fonts,
    });
    const remove = vi.spyOn(fonts, "removeEventListener");
    try {
      const { result, unmount } = renderHook(() => useTextOverflow());
      act(() => {
        result.current.ref(attach());
      });
      await waitFor(() => expect(result.current.isOverflowing).toBe(true));
      scrollWidth = 100;
      node.textContent = "Short";
      await waitFor(() => expect(result.current.isOverflowing).toBe(false));
      scrollWidth = 130;
      act(() => fonts.dispatchEvent(new Event("loadingdone")));
      await waitFor(() => expect(result.current.isOverflowing).toBe(true));
      unmount();
      expect(remove).toHaveBeenCalledWith("loadingdone", expect.any(Function));
    } finally {
      if (original) Object.defineProperty(document, "fonts", original);
      else Reflect.deleteProperty(document, "fonts");
    }
  });
  it("uses a text-only inaccessible copy and removes it after a collapsed measurement", async () => {
    const append = vi.spyOn(document.body, "append");
    const { result } = renderHook(() => useTextOverflow({ lines: 2 }));
    act(() => {
      const element = attach();
      element.id = "original";
      element.innerHTML = '<a href="#target">Text</a>';
      result.current.ref(element);
    });
    await waitFor(() => expect(result.current.hasMeasured).toBe(true));
    const copy = append.mock.calls
      .map((call) => call[0])
      .find(
        (element) =>
          element instanceof HTMLElement &&
          element.getAttribute("aria-hidden") === "true",
      ) as HTMLElement;
    expect(copy).toBeDefined();
    expect(copy.id).toBe("");
    expect(copy.querySelector("a")).toBeNull();
    expect(copy.textContent).toBe("Text");
    expect(copy.inert).toBe(true);
    expect(copy.isConnected).toBe(false);
  });
  it("validates constraints", () => {
    expect(() => renderHook(() => useTextOverflow({ lines: 0 }))).toThrow(
      RangeError,
    );
    expect(() => renderHook(() => useTextOverflow({ tolerance: -1 }))).toThrow(
      RangeError,
    );
  });
});

it("invalidates a changed measurement key before its next frame", () => {
  const frames: FrameRequestCallback[] = [];
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    frames.push(callback);
    return frames.length;
  });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  const { result, rerender } = renderHook(
    ({ key }) => useTextOverflow({ measurementKey: key }),
    { initialProps: { key: "long" } },
  );
  act(() => result.current.ref(attach()));
  act(() => frames.splice(0).forEach((callback) => callback(0)));
  expect(result.current.isOverflowing).toBe(true);
  scrollWidth = 100;
  rerender({ key: "short" });
  expect(result.current.hasMeasured).toBe(false);
  expect(result.current.isOverflowing).toBe(false);
  act(() => frames.splice(0).forEach((callback) => callback(1)));
  expect(result.current.hasMeasured).toBe(true);
  expect(result.current.isOverflowing).toBe(false);
});

it("reuses collapsed results for unchanged styling but measures again after fonts load", async () => {
  const fonts = new EventTarget();
  Object.defineProperty(fonts, "ready", { value: new Promise(() => {}) });
  const original = Object.getOwnPropertyDescriptor(document, "fonts");
  Object.defineProperty(document, "fonts", {
    configurable: true,
    value: fonts,
  });
  const frames: FrameRequestCallback[] = [];
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    frames.push(callback);
    return frames.length;
  });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  const append = vi.spyOn(document.body, "append");
  try {
    const { result } = renderHook(() => useTextOverflow({ lines: 2 }));
    act(() => result.current.ref(attach()));
    act(() => frames.splice(0).forEach((callback) => callback(0)));
    const captures = () =>
      append.mock.calls.filter(
        ([element]) =>
          element instanceof HTMLElement &&
          element.getAttribute("aria-hidden") === "true",
      ).length;
    const first = captures();
    expect(first).toBe(1);
    act(() => {
      window.dispatchEvent(new Event("resize"));
      frames.splice(0).forEach((callback) => callback(1));
    });
    expect(captures()).toBe(first);
    act(() => {
      node.style.color = "red";
    });
    await act(async () => {});
    act(() => frames.splice(0).forEach((callback) => callback(1)));
    expect(captures()).toBe(first);
    act(() => {
      fonts.dispatchEvent(new Event("loadingdone"));
      frames.splice(0).forEach((callback) => callback(2));
    });
    expect(captures()).toBe(first + 1);
    act(() => (node.style.writingMode = "vertical-rl"));
    await act(async () => {});
    act(() => frames.splice(0).forEach((callback) => callback(3)));
    expect(captures()).toBe(first + 2);
  } finally {
    if (original) Object.defineProperty(document, "fonts", original);
    else Reflect.deleteProperty(document, "fonts");
  }
});
