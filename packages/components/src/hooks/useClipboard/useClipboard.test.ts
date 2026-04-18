import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useClipboard } from "./useClipboard";

describe("useClipboard", () => {
  const originalClipboard = navigator.clipboard;

  beforeEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      writable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      writable: true,
      value: originalClipboard,
    });
    vi.useRealTimers();
  });

  it("should copy text and set copied true", async () => {
    const { result } = renderHook(() => useClipboard(0));
    await act(async () => {
      const ok = await result.current.copy("hello");
      expect(ok).toBe(true);
    });
    expect(result.current.copied).toBe(true);
    expect(result.current.error).toBeUndefined();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("hello");
  });

  it("should clear copied after resetDelay with fake timers", async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useClipboard(1000));
    await act(async () => {
      await result.current.copy("x");
    });
    expect(result.current.copied).toBe(true);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.copied).toBe(false);
  });

  it("should keep copied true when resetDelay is 0", async () => {
    const { result } = renderHook(() => useClipboard(0));
    await act(async () => {
      await result.current.copy("y");
    });
    expect(result.current.copied).toBe(true);
  });

  it("should set error when clipboard API is missing", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      writable: true,
      value: undefined,
    });
    const { result } = renderHook(() => useClipboard());
    await act(async () => {
      const ok = await result.current.copy("z");
      expect(ok).toBe(false);
    });
    expect(result.current.error?.message).toBe("Clipboard API is not available");
    expect(result.current.copied).toBe(false);
  });

  it("should set error when writeText rejects", async () => {
    vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(
      new Error("denied"),
    );
    const { result } = renderHook(() => useClipboard());
    await act(async () => {
      const ok = await result.current.copy("a");
      expect(ok).toBe(false);
    });
    expect(result.current.error?.message).toBe("denied");
  });

  it("should reset copied error and pending timeout", async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useClipboard(5000));
    await act(async () => {
      await result.current.copy("b");
    });
    act(() => {
      result.current.reset();
    });
    expect(result.current.copied).toBe(false);
    expect(result.current.error).toBeUndefined();
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current.copied).toBe(false);
  });
});
