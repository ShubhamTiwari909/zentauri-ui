import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { usePrevious } from "./usePrevious";

describe("usePrevious", () => {
  it("should return undefined on first render", () => {
    const { result } = renderHook(() => usePrevious(1));
    expect(result.current).toBeUndefined();
  });

  it("should return the previous value after an update", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => usePrevious(value),
      { initialProps: { value: 1 } },
    );
    rerender({ value: 2 });
    expect(result.current).toBe(1);
    rerender({ value: 3 });
    expect(result.current).toBe(2);
  });

  it("should track non-primitive values", () => {
    const a = { id: "a" };
    const b = { id: "b" };
    const { result, rerender } = renderHook(
      ({ value }: { value: object }) => usePrevious(value),
      { initialProps: { value: a } },
    );
    rerender({ value: b });
    expect(result.current).toBe(a);
  });
});
