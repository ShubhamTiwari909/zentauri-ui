import { act, render, renderHook } from "@testing-library/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  expectTypeOf,
  it,
  vi,
} from "vitest";
import { useDebouncedCallback } from "./useDebouncedCallback";

describe("useDebouncedCallback", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("accepts calls from a child layout effect during initial commit", () => {
    const callback = vi.fn();
    function Child({ schedule }: { schedule: () => void }) {
      useLayoutEffect(() => schedule(), [schedule]);
      return null;
    }
    function Parent() {
      const { debouncedCallback, isPending } = useDebouncedCallback(
        callback,
        50,
      );
      return (
        <>
          <span>{isPending ? "pending" : "idle"}</span>
          <Child schedule={debouncedCallback} />
        </>
      );
    }
    const { getByText } = render(<Parent />);
    expect(getByText("pending")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(50));
    expect(callback).toHaveBeenCalledExactlyOnceWith();
    expect(getByText("idle")).toBeInTheDocument();
  });

  it("starts idle and does not schedule work during render", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 100));
    expect(result.current.isPending).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
    act(() => vi.advanceTimersByTime(100));
    expect(callback).not.toHaveBeenCalled();
  });

  it("runs once on the trailing edge with the latest argument tuple", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 100));
    act(() => result.current.debouncedCallback("first", 1));
    expect(result.current.isPending).toBe(true);
    act(() => vi.advanceTimersByTime(80));
    act(() => result.current.debouncedCallback("latest", 2));
    act(() => vi.advanceTimersByTime(99));
    expect(callback).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1));
    expect(callback).toHaveBeenCalledExactlyOnceWith("latest", 2);
    expect(result.current.isPending).toBe(false);
  });

  it("supports a callback with no arguments", () => {
    const callback = vi.fn(() => "done");
    const { result } = renderHook(() => useDebouncedCallback(callback, 20));
    act(() => result.current.debouncedCallback());
    act(() => vi.advanceTimersByTime(20));
    expect(callback).toHaveBeenCalledExactlyOnceWith();
  });

  it("cancels without invoking and can schedule again", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 50));
    act(() => result.current.debouncedCallback("discard"));
    act(() => result.current.cancel());
    expect(result.current.isPending).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
    act(() => vi.advanceTimersByTime(50));
    expect(callback).not.toHaveBeenCalled();
    act(() => result.current.debouncedCallback("keep"));
    act(() => vi.advanceTimersByTime(50));
    expect(callback).toHaveBeenCalledExactlyOnceWith("keep");
  });

  it("flushes immediately, returns the result and clears the old timer", () => {
    const callback = vi.fn((value: number) => value * 2);
    const { result } = renderHook(() => useDebouncedCallback(callback, 50));
    act(() => result.current.debouncedCallback(6));
    let returned: number | undefined;
    act(() => {
      returned = result.current.flush();
    });
    expect(returned).toBe(12);
    expect(result.current.isPending).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
    act(() => vi.advanceTimersByTime(100));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("makes idle or repeated cancel/flush calls safe no-ops", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 50));
    act(() => {
      result.current.cancel();
      result.current.cancel();
      expect(result.current.flush()).toBeUndefined();
      expect(result.current.flush()).toBeUndefined();
    });
    expect(callback).not.toHaveBeenCalled();
    expect(result.current.isPending).toBe(false);
  });

  it("does not flush cancelled work", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 50));
    act(() => {
      result.current.debouncedCallback("discard");
      result.current.cancel();
      expect(result.current.flush()).toBeUndefined();
    });
    expect(callback).not.toHaveBeenCalled();
  });

  it("uses the latest committed callback without restarting the deadline", () => {
    const first = vi.fn();
    const latest = vi.fn();
    const { result, rerender } = renderHook(
      ({ callback }) => useDebouncedCallback(callback, 100),
      { initialProps: { callback: first } },
    );
    act(() => result.current.debouncedCallback("value"));
    act(() => vi.advanceTimersByTime(80));
    rerender({ callback: latest });
    act(() => vi.advanceTimersByTime(20));
    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledExactlyOnceWith("value");
  });

  it("uses the latest callback when manually flushed", () => {
    const first = vi.fn();
    const latest = vi.fn();
    const { result, rerender } = renderHook(
      ({ callback }) => useDebouncedCallback(callback, 100),
      { initialProps: { callback: first } },
    );
    act(() => result.current.debouncedCallback("value"));
    rerender({ callback: latest });
    act(() => {
      result.current.flush();
    });
    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledExactlyOnceWith("value");
  });

  it("keeps all controls stable across pending, callback and delay changes", () => {
    const { result, rerender } = renderHook(
      ({ delay }) => useDebouncedCallback(() => delay, delay),
      { initialProps: { delay: 100 } },
    );
    const controls = result.current;
    act(() => result.current.debouncedCallback());
    rerender({ delay: 200 });
    expect(result.current.debouncedCallback).toBe(controls.debouncedCallback);
    expect(result.current.cancel).toBe(controls.cancel);
    expect(result.current.flush).toBe(controls.flush);
    act(() => {
      result.current.flush();
    });
    expect(result.current.debouncedCallback).toBe(controls.debouncedCallback);
  });

  it("applies changed delays only to future calls", () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(
      ({ delay }) => useDebouncedCallback(callback, delay),
      { initialProps: { delay: 100 } },
    );
    act(() => result.current.debouncedCallback("old deadline"));
    act(() => vi.advanceTimersByTime(50));
    rerender({ delay: 200 });
    act(() => vi.advanceTimersByTime(50));
    expect(callback).toHaveBeenCalledExactlyOnceWith("old deadline");
    act(() => result.current.debouncedCallback("new deadline"));
    act(() => vi.advanceTimersByTime(199));
    expect(callback).toHaveBeenCalledTimes(1);
    act(() => vi.advanceTimersByTime(1));
    expect(callback).toHaveBeenLastCalledWith("new deadline");
  });

  it("uses a changed delay when a newer call replaces scheduled work", () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(
      ({ delay }) => useDebouncedCallback(callback, delay),
      { initialProps: { delay: 100 } },
    );
    act(() => result.current.debouncedCallback("old"));
    rerender({ delay: 30 });
    act(() => result.current.debouncedCallback("new"));
    act(() => vi.advanceTimersByTime(30));
    expect(callback).toHaveBeenCalledExactlyOnceWith("new");
    act(() => vi.advanceTimersByTime(100));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("defers a zero-delay call instead of invoking synchronously", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 0));
    act(() => result.current.debouncedCallback());
    expect(callback).not.toHaveBeenCalled();
    expect(result.current.isPending).toBe(true);
    act(() => vi.advanceTimersByTime(0));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("clears scheduled work on unmount and ignores retained controls", () => {
    const callback = vi.fn();
    const { result, unmount } = renderHook(() =>
      useDebouncedCallback(callback, 100),
    );
    const controls = result.current;
    act(() => controls.debouncedCallback("pending"));
    unmount();
    expect(vi.getTimerCount()).toBe(0);
    act(() => {
      controls.debouncedCallback("after unmount");
      controls.cancel();
      expect(controls.flush()).toBeUndefined();
      vi.advanceTimersByTime(100);
    });
    expect(callback).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("works with StrictMode effect replay without duplicate invocation", () => {
    const callback = vi.fn();
    const { result, unmount } = renderHook(
      () => useDebouncedCallback(callback, 50),
      { reactStrictMode: true },
    );
    act(() => result.current.debouncedCallback("once"));
    act(() => vi.advanceTimersByTime(50));
    expect(callback).toHaveBeenCalledExactlyOnceWith("once");
    act(() => result.current.debouncedCallback("discard"));
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("allows reentrant scheduling and keeps the new cycle pending", () => {
    const callback: (value: string) => void = vi.fn((value: string) => {
      if (value === "first") result.current.debouncedCallback("second");
    });
    const { result } = renderHook(() => useDebouncedCallback(callback, 50));
    act(() => result.current.debouncedCallback("first"));
    act(() => {
      result.current.flush();
    });
    expect(callback).toHaveBeenCalledExactlyOnceWith("first");
    expect(result.current.isPending).toBe(true);
    expect(vi.getTimerCount()).toBe(1);
    act(() => vi.advanceTimersByTime(50));
    expect(callback).toHaveBeenLastCalledWith("second");
    expect(result.current.isPending).toBe(false);
  });

  it("clears pending state when StrictMode discards mount-effect work", () => {
    const callback = vi.fn();
    const { result } = renderHook(
      () => {
        const controls = useDebouncedCallback(callback, 50);
        const scheduled = useRef(false);
        useEffect(() => {
          if (!scheduled.current) {
            scheduled.current = true;
            controls.debouncedCallback();
          }
        }, [controls.debouncedCallback]);
        return controls;
      },
      { reactStrictMode: true },
    );
    expect(result.current.isPending).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
    act(() => vi.advanceTimersByTime(50));
    expect(callback).not.toHaveBeenCalled();
  });

  it("clears pending work even when the callback throws", () => {
    const error = new Error("failed");
    const { result } = renderHook(() =>
      useDebouncedCallback(() => {
        throw error;
      }, 50),
    );
    act(() => result.current.debouncedCallback());
    act(() => {
      expect(() => result.current.flush()).toThrow(error);
    });
    expect(result.current.isPending).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
    expect(result.current.flush()).toBeUndefined();
  });

  it("returns async results from flush and tracks only the timer", async () => {
    let resolve!: (value: string) => void;
    const promise = new Promise<string>((done) => {
      resolve = done;
    });
    const { result } = renderHook(() =>
      useDebouncedCallback(() => promise, 50),
    );
    act(() => result.current.debouncedCallback());
    let returned: Promise<string> | undefined;
    act(() => {
      returned = result.current.flush();
    });
    expect(returned).toBe(promise);
    expect(result.current.isPending).toBe(false);
    resolve("saved");
    await expect(returned).resolves.toBe("saved");
  });

  it("keeps independent instances isolated", () => {
    const first = vi.fn();
    const second = vi.fn();
    const { result } = renderHook(() => ({
      first: useDebouncedCallback(first, 50),
      second: useDebouncedCallback(second, 100),
    }));
    act(() => {
      result.current.first.debouncedCallback("a");
      result.current.second.debouncedCallback("b");
      result.current.first.cancel();
    });
    act(() => vi.advanceTimersByTime(100));
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledExactlyOnceWith("b");
  });

  it("infers callback arguments and the flush result", () => {
    const { result } = renderHook(() =>
      useDebouncedCallback(
        (label: string, count: number) => `${label}:${count}`,
        50,
      ),
    );
    expectTypeOf(result.current.debouncedCallback).toEqualTypeOf<
      (label: string, count: number) => void
    >();
    expectTypeOf(result.current.flush()).toEqualTypeOf<string | undefined>();
  });

  it("rejects delays outside the native timer range", () => {
    for (const delay of [-1, NaN, Infinity, 2_147_483_648]) {
      expect(() =>
        renderHook(() => useDebouncedCallback(() => {}, delay)),
      ).toThrow(RangeError);
    }
  });

  it("renders idle on the server without scheduling or invoking work", () => {
    const callback = vi.fn();
    function ServerPreview() {
      const { isPending } = useDebouncedCallback(callback, 50);
      return <span>{isPending ? "pending" : "idle"}</span>;
    }
    expect(renderToString(<ServerPreview />)).toBe("<span>idle</span>");
    expect(callback).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });
});
