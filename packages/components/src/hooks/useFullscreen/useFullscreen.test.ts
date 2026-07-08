import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useFullscreen } from "./useFullscreen";

type FullscreenStub = {
  setElement: (element: Element | null) => void;
  teardown: () => void;
};

function installFullscreenStub(
  options: { webkit?: boolean; enabled?: boolean } = {},
): FullscreenStub {
  const { webkit = false, enabled = true } = options;
  let fsElement: Element | null = null;

  const doc = document as unknown as Record<string, unknown>;
  const originalFullscreenElement = Object.getOwnPropertyDescriptor(
    document,
    "fullscreenElement",
  );
  const originalWebkitFullscreenElement = Object.getOwnPropertyDescriptor(
    document,
    "webkitFullscreenElement",
  );
  const originalFullscreenEnabled = Object.getOwnPropertyDescriptor(
    document,
    "fullscreenEnabled",
  );
  const originalWebkitFullscreenEnabled = Object.getOwnPropertyDescriptor(
    document,
    "webkitFullscreenEnabled",
  );
  const originalRequestFullscreen = HTMLElement.prototype.requestFullscreen;
  const originalWebkitRequestFullscreen = (
    HTMLElement.prototype as unknown as Record<string, unknown>
  ).webkitRequestFullscreen;
  const originalExitFullscreen = document.exitFullscreen;
  const originalWebkitExitFullscreen = doc.webkitExitFullscreen;

  Object.defineProperty(
    document,
    webkit ? "webkitFullscreenElement" : "fullscreenElement",
    {
      get: () => fsElement,
      configurable: true,
    },
  );
  Object.defineProperty(
    document,
    webkit ? "webkitFullscreenEnabled" : "fullscreenEnabled",
    {
      get: () => enabled,
      configurable: true,
    },
  );

  if (webkit) {
    delete (HTMLElement.prototype as unknown as Record<string, unknown>)
      .requestFullscreen;
    (
      HTMLElement.prototype as unknown as Record<string, unknown>
    ).webkitRequestFullscreen = function webkitRequestFullscreen(
      this: HTMLElement,
    ) {
      fsElement = this;
      document.dispatchEvent(new Event("webkitfullscreenchange"));
      return undefined;
    };
    delete (doc as Record<string, unknown>).exitFullscreen;
    doc.webkitExitFullscreen = vi.fn(() => {
      fsElement = null;
      document.dispatchEvent(new Event("webkitfullscreenchange"));
      return undefined;
    });
  } else {
    HTMLElement.prototype.requestFullscreen = vi.fn(function (
      this: HTMLElement,
    ) {
      fsElement = this;
      document.dispatchEvent(new Event("fullscreenchange"));
      return Promise.resolve();
    });
    document.exitFullscreen = vi.fn(() => {
      fsElement = null;
      document.dispatchEvent(new Event("fullscreenchange"));
      return Promise.resolve();
    });
  }

  return {
    setElement: (element: Element | null) => {
      fsElement = element;
    },
    teardown: () => {
      if (originalFullscreenElement) {
        Object.defineProperty(
          document,
          "fullscreenElement",
          originalFullscreenElement,
        );
      } else {
        delete doc.fullscreenElement;
      }
      if (originalWebkitFullscreenElement) {
        Object.defineProperty(
          document,
          "webkitFullscreenElement",
          originalWebkitFullscreenElement,
        );
      } else {
        delete doc.webkitFullscreenElement;
      }
      if (originalFullscreenEnabled) {
        Object.defineProperty(
          document,
          "fullscreenEnabled",
          originalFullscreenEnabled,
        );
      } else {
        delete doc.fullscreenEnabled;
      }
      if (originalWebkitFullscreenEnabled) {
        Object.defineProperty(
          document,
          "webkitFullscreenEnabled",
          originalWebkitFullscreenEnabled,
        );
      } else {
        delete doc.webkitFullscreenEnabled;
      }
      HTMLElement.prototype.requestFullscreen = originalRequestFullscreen;
      if (originalWebkitRequestFullscreen === undefined) {
        delete (HTMLElement.prototype as unknown as Record<string, unknown>)
          .webkitRequestFullscreen;
      } else {
        (
          HTMLElement.prototype as unknown as Record<string, unknown>
        ).webkitRequestFullscreen = originalWebkitRequestFullscreen;
      }
      document.exitFullscreen = originalExitFullscreen;
      if (originalWebkitExitFullscreen === undefined) {
        delete doc.webkitExitFullscreen;
      } else {
        doc.webkitExitFullscreen = originalWebkitExitFullscreen;
      }
    },
  };
}

describe("useFullscreen", () => {
  let stub: FullscreenStub | null = null;

  afterEach(() => {
    stub?.teardown();
    stub = null;
    vi.restoreAllMocks();
  });

  it("reports isSupported once the stub is installed", async () => {
    stub = installFullscreenStub();
    const { result } = renderHook(() => useFullscreen());
    await act(async () => {});
    expect(result.current.isSupported).toBe(true);
  });

  it("reports isSupported false when fullscreenEnabled is false", async () => {
    stub = installFullscreenStub({ enabled: false });
    const { result } = renderHook(() => useFullscreen());
    await act(async () => {});
    expect(result.current.isSupported).toBe(false);
  });

  it("enter() requests fullscreen on the ref target, not documentElement", async () => {
    stub = installFullscreenStub();
    const div = document.createElement("div");
    document.body.appendChild(div);
    const ref = { current: div };

    const { result } = renderHook(() => useFullscreen(ref));
    await act(async () => {
      await result.current.enter();
    });

    expect(HTMLElement.prototype.requestFullscreen).toHaveBeenCalledTimes(1);
    expect(result.current.isFullscreen).toBe(true);
    expect(result.current.fullscreenElement).toBe(div);
    document.body.removeChild(div);
  });

  it("without a target, requests fullscreen on document.documentElement", async () => {
    stub = installFullscreenStub();
    const spy = vi.spyOn(document.documentElement, "requestFullscreen");

    const { result } = renderHook(() => useFullscreen());
    await act(async () => {
      await result.current.enter();
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(result.current.isFullscreen).toBe(true);
  });

  it("exit() clears isFullscreen and toggle() round-trips", async () => {
    stub = installFullscreenStub();
    const { result } = renderHook(() => useFullscreen());

    await act(async () => {
      await result.current.enter();
    });
    expect(result.current.isFullscreen).toBe(true);

    await act(async () => {
      await result.current.exit();
    });
    expect(result.current.isFullscreen).toBe(false);

    await act(async () => {
      await result.current.toggle();
    });
    expect(result.current.isFullscreen).toBe(true);

    await act(async () => {
      await result.current.toggle();
    });
    expect(result.current.isFullscreen).toBe(false);
  });

  it("reflects an external exit (Esc key) without any hook call", async () => {
    stub = installFullscreenStub();
    const { result } = renderHook(() => useFullscreen());

    await act(async () => {
      await result.current.enter();
    });
    expect(result.current.isFullscreen).toBe(true);

    act(() => {
      stub?.setElement(null);
      document.dispatchEvent(new Event("fullscreenchange"));
    });

    expect(result.current.isFullscreen).toBe(false);
  });

  it("reports fullscreenElement for another element without flipping isFullscreen for ours", async () => {
    stub = installFullscreenStub();
    const other = document.createElement("div");
    document.body.appendChild(other);

    const { result } = renderHook(() => useFullscreen());

    act(() => {
      stub?.setElement(other);
      document.dispatchEvent(new Event("fullscreenchange"));
    });

    expect(result.current.isFullscreen).toBe(false);
    expect(result.current.fullscreenElement).toBe(other);
    document.body.removeChild(other);
  });

  it("rejects, calls onError, and keeps isFullscreen false when requestFullscreen rejects", async () => {
    stub = installFullscreenStub();
    const failure = new Error("denied");
    HTMLElement.prototype.requestFullscreen = vi.fn(() =>
      Promise.reject(failure),
    );
    const onError = vi.fn();

    const { result } = renderHook(() => useFullscreen(undefined, { onError }));

    await act(async () => {
      await expect(result.current.enter()).rejects.toThrow("denied");
    });

    expect(onError).toHaveBeenCalledWith(failure);
    expect(result.current.isFullscreen).toBe(false);
  });

  it("works through the WebKit-prefixed API", async () => {
    stub = installFullscreenStub({ webkit: true });
    const { result } = renderHook(() => useFullscreen());
    await act(async () => {});
    expect(result.current.isSupported).toBe(true);

    await act(async () => {
      await result.current.enter();
    });
    expect(result.current.isFullscreen).toBe(true);

    await act(async () => {
      await result.current.exit();
    });
    expect(result.current.isFullscreen).toBe(false);
  });

  it("fires onEnter/onExit exactly once per transition", async () => {
    stub = installFullscreenStub();
    const onEnter = vi.fn();
    const onExit = vi.fn();
    const { result } = renderHook(() =>
      useFullscreen(undefined, { onEnter, onExit }),
    );

    await act(async () => {
      await result.current.enter();
    });
    await act(async () => {
      await result.current.enter();
    });
    expect(onEnter).toHaveBeenCalledTimes(1);

    await act(async () => {
      await result.current.exit();
    });
    await act(async () => {
      await result.current.exit();
    });
    expect(onExit).toHaveBeenCalledTimes(1);
  });

  it("removes listeners on unmount", () => {
    stub = installFullscreenStub();
    const addSpy = vi.spyOn(document, "addEventListener");
    const removeSpy = vi.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() => useFullscreen());
    const addedEvents = addSpy.mock.calls.map((call) => call[0]);
    unmount();

    expect(() =>
      document.dispatchEvent(new Event("fullscreenchange")),
    ).not.toThrow();

    for (const eventName of addedEvents) {
      expect(removeSpy).toHaveBeenCalledWith(
        eventName,
        expect.any(Function),
        expect.anything(),
      );
    }
  });
});
