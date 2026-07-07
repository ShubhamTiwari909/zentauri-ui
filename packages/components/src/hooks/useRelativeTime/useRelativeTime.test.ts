import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useRelativeTime } from "./useRelativeTime";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("useRelativeTime", () => {
  it('returns "now" for very recent dates', () => {
    const now = Date.now();
    const { result } = renderHook(() => useRelativeTime(now));
    expect(result.current.unit).toBe("just-now");
  });

  it('returns "in 1 minute" for a date 1 minute in the future', () => {
    const future = Date.now() + 60_000;
    const { result } = renderHook(() =>
      useRelativeTime(future, { locale: "en-US" }),
    );
    expect(result.current.text).toBe("in 1 minute");
    expect(result.current.unit).toBe("minute");
  });

  it('returns "1 minute ago" for a date 1 minute in the past', () => {
    const past = Date.now() - 60_000;
    const { result } = renderHook(() =>
      useRelativeTime(past, { locale: "en-US" }),
    );
    expect(result.current.text).toBe("1 minute ago");
    expect(result.current.unit).toBe("minute");
  });

  it("uses short style", () => {
    const past = Date.now() - 60_000;
    const { result } = renderHook(() =>
      useRelativeTime(past, { locale: "en-US", style: "short" }),
    );
    expect(result.current.text).toBe("1 min. ago");
  });

  it("transitions from seconds to minutes at the boundary", () => {
    const past = Date.now() - 55_000;
    const { result } = renderHook(() =>
      useRelativeTime(past, {
        locale: "en-US",
        live: true,
        justNowThresholdMs: 0,
      }),
    );
    expect(result.current.unit).toBe("second");

    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(result.current.unit).toBe("second");

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.unit).toBe("minute");
    expect(result.current.text).toBe("1 minute ago");
  });

  it("supports justNowLabel override", () => {
    const now = Date.now();
    const { result } = renderHook(() =>
      useRelativeTime(now, { justNowLabel: "just now!" }),
    );
    expect(result.current.text).toBe("just now!");
  });

  it("absoluteAfter switches to absolute format", () => {
    const farPast = Date.now() - 100 * 86_400_000;
    const { result } = renderHook(() =>
      useRelativeTime(farPast, {
        locale: "en-US",
        absoluteAfter: { unit: "month", count: 2 },
        absoluteFormatOptions: { dateStyle: "medium" },
      }),
    );
    expect(result.current.unit).toBe("absolute");
  });

  it("live: false renders once without timers", () => {
    const past = Date.now() - 5000;
    const { result } = renderHook(() =>
      useRelativeTime(past, { locale: "en-US", live: false }),
    );
    expect(result.current.unit).toBe("just-now");
  });

  it("isoString is valid", () => {
    const d = new Date("2025-01-15T10:00:00Z");
    const { result } = renderHook(() => useRelativeTime(d, { live: false }));
    expect(result.current.isoString).toBe(d.toISOString());
  });

  it("handles numeric:always for past dates", () => {
    const past = Date.now() - 86_400_000 * 2;
    const { result } = renderHook(() =>
      useRelativeTime(past, {
        locale: "en-US",
        numeric: "always",
      }),
    );
    expect(result.current.text).toContain("2 days ago");
  });

  it("handles string date input", () => {
    const past = new Date(Date.now() - 3600_000).toISOString();
    const { result } = renderHook(() =>
      useRelativeTime(past, { locale: "en-US", live: false }),
    );
    expect(result.current.unit).toBe("hour");
  });
});
