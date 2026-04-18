import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { useSessionStorage } from "./useSessionStorage";

const keyPrefix = "zt-test-sessionstorage";

async function flushEffects() {
  await act(async () => {
    await Promise.resolve();
  });
}

describe("useSessionStorage", () => {
  afterEach(() => {
    sessionStorage.clear();
  });

  it("should apply stored value from sessionStorage after mount", async () => {
    const key = `${keyPrefix}-hydrate`;
    sessionStorage.setItem(key, JSON.stringify("stored"));
    const { result } = renderHook(() =>
      useSessionStorage(key, "initial"),
    );
    await flushEffects();
    expect(result.current[0]).toBe("stored");
  });

  it("should persist setValue to sessionStorage", async () => {
    const key = `${keyPrefix}-persist`;
    const { result } = renderHook(() =>
      useSessionStorage(key, { n: 0 }),
    );
    await flushEffects();
    act(() => {
      result.current[1]({ n: 3 });
    });
    expect(sessionStorage.getItem(key)).toBe(JSON.stringify({ n: 3 }));
    expect(result.current[0]).toEqual({ n: 3 });
  });

  it("should remove and reset to initialValue", async () => {
    const key = `${keyPrefix}-remove`;
    sessionStorage.setItem(key, JSON.stringify(42));
    const { result } = renderHook(() => useSessionStorage(key, 0));
    await flushEffects();
    expect(result.current[0]).toBe(42);
    act(() => {
      result.current[2]();
    });
    expect(sessionStorage.getItem(key)).toBeNull();
    expect(result.current[0]).toBe(0);
  });
});
