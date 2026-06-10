import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useKeyPress } from "./useKeyPress";

function dispatchKey(type: "keydown" | "keyup", key: string) {
  window.dispatchEvent(new KeyboardEvent(type, { key }));
}

describe("useKeyPress", () => {
  it("should be false initially", () => {
    const { result } = renderHook(() => useKeyPress("k"));
    expect(result.current).toBe(false);
  });

  it("should track keydown and keyup for the target key", () => {
    const { result } = renderHook(() => useKeyPress("k"));
    act(() => {
      dispatchKey("keydown", "k");
    });
    expect(result.current).toBe(true);
    act(() => {
      dispatchKey("keyup", "k");
    });
    expect(result.current).toBe(false);
  });

  it("should ignore other keys", () => {
    const { result } = renderHook(() => useKeyPress("k"));
    act(() => {
      dispatchKey("keydown", "j");
    });
    expect(result.current).toBe(false);
  });

  it("should match case-insensitively", () => {
    const { result } = renderHook(() => useKeyPress("escape"));
    act(() => {
      dispatchKey("keydown", "Escape");
    });
    expect(result.current).toBe(true);
  });

  it("should accept an array of keys", () => {
    const { result } = renderHook(() => useKeyPress(["ArrowUp", "ArrowDown"]));
    act(() => {
      dispatchKey("keydown", "ArrowDown");
    });
    expect(result.current).toBe(true);
    act(() => {
      dispatchKey("keyup", "ArrowDown");
    });
    expect(result.current).toBe(false);
  });

  it("should clear on window blur", () => {
    const { result } = renderHook(() => useKeyPress("k"));
    act(() => {
      dispatchKey("keydown", "k");
    });
    expect(result.current).toBe(true);
    act(() => {
      window.dispatchEvent(new Event("blur"));
    });
    expect(result.current).toBe(false);
  });
});
