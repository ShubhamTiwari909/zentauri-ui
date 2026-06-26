import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useHash } from "./useHash";

vi.stubGlobal("crypto", {
  subtle: {
    digest: vi.fn().mockResolvedValue(new Uint8Array([1, 2, 3, 4]).buffer),
  },
});

describe("useHash", () => {
  it("should return empty hash for empty input", () => {
    const { result } = renderHook(() => useHash(""));
    expect(result.current.hash).toBe("");
    expect(result.current.isHashing).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("should compute hash for non-empty input", async () => {
    const { result } = renderHook(() => useHash("hello"));
    await vi.waitFor(() => {
      expect(result.current.hash).toBe("01020304");
    });
    expect(result.current.isHashing).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("should recompute when algorithm changes", async () => {
    const { result, rerender } = renderHook(
      ({ input, algo }: { input: string; algo: "sha256" | "sha512" }) =>
        useHash(input, algo),
      { initialProps: { input: "hello", algo: "sha256" } },
    );
    await vi.waitFor(() => {
      expect(result.current.hash).toBe("01020304");
    });
    rerender({ input: "hello", algo: "sha512" });
    expect(result.current.isHashing).toBe(true);
  });

  it("should recompute when input changes", async () => {
    const { result, rerender } = renderHook(
      ({ input }: { input: string }) => useHash(input),
      { initialProps: { input: "hello" } },
    );
    await vi.waitFor(() => {
      expect(result.current.hash).toBe("01020304");
    });
    rerender({ input: "world" });
    expect(result.current.isHashing).toBe(true);
  });

  it("should call recompute on demand", async () => {
    const { result } = renderHook(() => useHash("hello"));
    await vi.waitFor(() => {
      expect(result.current.hash).toBe("01020304");
    });
    act(() => {
      result.current.recompute();
    });
    expect(result.current.isHashing).toBe(true);
  });

  it("should clear hash when input becomes empty", async () => {
    const { result, rerender } = renderHook(
      ({ input }: { input: string }) => useHash(input),
      { initialProps: { input: "hello" } },
    );
    await vi.waitFor(() => {
      expect(result.current.hash).toBe("01020304");
    });
    rerender({ input: "" });
    expect(result.current.hash).toBe("");
    expect(result.current.isHashing).toBe(false);
  });
});
