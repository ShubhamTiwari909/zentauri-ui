import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useLocalStorage } from "./useLocalStorage";

const keyPrefix = "zt-test-localstorage";

describe("useLocalStorage", () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("should read existing JSON value on mount", () => {
    const key = `${keyPrefix}-read`;
    localStorage.setItem(key, JSON.stringify({ count: 2 }));
    const { result } = renderHook(() =>
      useLocalStorage(key, { count: 0 }),
    );
    const value = result.current[0];
    expect(value).toEqual({ count: 2 });
  });

  it("should fall back to initialValue when key missing", () => {
    const key = `${keyPrefix}-missing`;
    const { result } = renderHook(() =>
      useLocalStorage(key, { count: 0 }),
    );
    const value = result.current[0];
    expect(value).toEqual({ count: 0 });
  });

  it("should persist setValue and support functional updates", () => {
    const key = `${keyPrefix}-set`;
    const { result } = renderHook(() =>
      useLocalStorage(key, { count: 0 }),
    );
    act(() => {
      result.current[1]({ count: 5 });
    });
    expect(result.current[0]).toEqual({ count: 5 });
    expect(localStorage.getItem(key)).toBe(JSON.stringify({ count: 5 }));
    act(() => {
      result.current[1]((previous) => ({ count: previous.count + 1 }));
    });
    expect(result.current[0]).toEqual({ count: 6 });
  });

  it("should remove key and reset to initialValue", () => {
    const key = `${keyPrefix}-remove`;
    localStorage.setItem(key, JSON.stringify({ ok: true }));
    const { result } = renderHook(() =>
      useLocalStorage(key, { ok: false }),
    );
    const remove = result.current[2];
    act(() => {
      remove();
    });
    expect(localStorage.getItem(key)).toBeNull();
    expect(result.current[0]).toEqual({ ok: false });
  });

  it("should reconcile when storage event fires for same key", () => {
    const key = `${keyPrefix}-storage`;
    const { result } = renderHook(() =>
      useLocalStorage(key, { v: 0 }),
    );
    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue: JSON.stringify({ v: 99 }),
          storageArea: window.localStorage,
        }),
      );
    });
    const value= result.current[0];
    expect(value).toEqual({ v: 99 });
  });

  it("should reset to initial when storage event clears key", () => {
    const key = `${keyPrefix}-cleared`;
    localStorage.setItem(key, JSON.stringify({ v: 1 }));
    const { result } = renderHook(() =>
      useLocalStorage(key, { v: 0 }),
    );
    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue: null,
          storageArea: window.localStorage,
        }),
      );
    });
    const value= result.current[0];
    expect(value).toEqual({ v: 0 });
  });
});
