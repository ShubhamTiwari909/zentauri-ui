import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useControllableState } from "./useControllableState";

describe("useControllableState", () => {
  it("should use internal state when uncontrolled", () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 1 }),
    );
    expect(result.current[0]).toBe(1);
    act(() => {
      result.current[1](2);
    });
    expect(result.current[0]).toBe(2);
  });

  it("should follow value prop when controlled", () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) =>
        useControllableState({ value, defaultValue: 0, onChange }),
      { initialProps: { value: 5 } },
    );
    expect(result.current[0]).toBe(5);
    act(() => {
      result.current[1](9);
    });
    expect(result.current[0]).toBe(5);
    expect(onChange).toHaveBeenCalledWith(9);
    rerender({ value: 9 });
    expect(result.current[0]).toBe(9);
  });

  it("should call onChange with functional updater using current controlled value", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllableState({
        value: 10,
        defaultValue: 0,
        onChange,
      }),
    );
    act(() => {
      result.current[1]((previous) => previous + 1);
    });
    expect(onChange).toHaveBeenCalledWith(11);
  });

  it("should apply functional updater in uncontrolled mode", () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 3 }),
    );
    act(() => {
      result.current[1]((previous) => previous * 2);
    });
    expect(result.current[0]).toBe(6);
  });
});
