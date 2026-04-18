import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useToggle } from "./useToggle";

describe("useToggle", () => {
  it("should default to false", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it("should respect initial true", () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it("should flip via toggle", () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
  });

  it("should set absolute value via set", () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => {
      result.current[2](true);
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[2](false);
    });
    expect(result.current[0]).toBe(false);
  });
});
