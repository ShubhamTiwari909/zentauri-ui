import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useNetworkStatus } from "./useNetworkStatus";

describe("useNetworkStatus", () => {
  const originalOnLine = navigator.onLine;

  afterEach(() => {
    Object.defineProperty(navigator, "onLine", {
      configurable: true,
      writable: true,
      value: originalOnLine,
    });
  });

  it("should reflect navigator.onLine initially", () => {
    Object.defineProperty(navigator, "onLine", {
      configurable: true,
      writable: true,
      value: true,
    });
    const { result } = renderHook(() => useNetworkStatus());
    expect(result.current).toBe(true);
  });

  it("should update on offline and online window events", () => {
    Object.defineProperty(navigator, "onLine", {
      configurable: true,
      writable: true,
      value: true,
    });
    const { result } = renderHook(() => useNetworkStatus());
    act(() => {
      Object.defineProperty(navigator, "onLine", {
        configurable: true,
        writable: true,
        value: false,
      });
      window.dispatchEvent(new Event("offline"));
    });
    expect(result.current).toBe(false);
    act(() => {
      Object.defineProperty(navigator, "onLine", {
        configurable: true,
        writable: true,
        value: true,
      });
      window.dispatchEvent(new Event("online"));
    });
    expect(result.current).toBe(true);
  });
});
