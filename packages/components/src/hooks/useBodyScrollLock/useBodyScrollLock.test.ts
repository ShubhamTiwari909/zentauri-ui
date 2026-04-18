import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { useBodyScrollLock } from "./useBodyScrollLock";

describe("useBodyScrollLock", () => {
  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("should not change overflow when locked is false", () => {
    document.body.style.overflow = "auto";
    const { unmount } = renderHook(() => useBodyScrollLock(false));
    expect(document.body.style.overflow).toBe("auto");
    unmount();
  });

  it("should set overflow hidden while locked and restore on unmount", () => {
    document.body.style.overflow = "scroll";
    const { unmount } = renderHook(() => useBodyScrollLock(true));
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("scroll");
  });

  it("should ref-count nested locks and restore only after last release", () => {
    document.body.style.overflow = "";
    const first = renderHook(() => useBodyScrollLock(true));
    expect(document.body.style.overflow).toBe("hidden");
    const second = renderHook(() => useBodyScrollLock(true));
    expect(document.body.style.overflow).toBe("hidden");
    first.unmount();
    expect(document.body.style.overflow).toBe("hidden");
    second.unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("should release lock when locked toggles from true to false", () => {
    document.body.style.overflow = "visible";
    const { rerender, unmount } = renderHook(
      ({ locked }: { locked: boolean }) => useBodyScrollLock(locked),
      { initialProps: { locked: true } },
    );
    expect(document.body.style.overflow).toBe("hidden");
    act(() => {
      rerender({ locked: false });
    });
    expect(document.body.style.overflow).toBe("visible");
    unmount();
  });
});
